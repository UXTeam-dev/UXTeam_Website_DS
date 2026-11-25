#!/usr/bin/env node
/**
 * Page check. Run after `npm run build`:  npm run check
 *
 * Reads every page in src/pages (source) and dist/pages (built, includes
 * resolved) and reports anything that breaks the non-negotiables in LLM.md.
 * Errors fail the check (exit code 1). Warnings need a fix or a reason.
 *
 * No dependencies. Checks are text based, so they catch the common
 * mistakes, not every possible one. Always compare visually as well.
 *
 * Opt outs, written as a comment anywhere in a page:
 *   <!-- ux-check: no-booking -->   page intentionally ends with the footer only
 */
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src', 'pages');
const DIST = join(ROOT, 'dist', 'pages');

const ALLOWED_PT = ['0', '40', '80', '100', '120', '160'];
const ALLOWED_PB = ['0', '80', '100', '120', '180'];
const AVOID_WORDS = ['unlock', 'leverage', 'synergy', 'cutting-edge', 'world-class', 'best-in-class', 'disrupt', 'revolutionize', 'seamless', 'solutions', 'pixel-perfect', 'guaranteed', 'rockstar'];
const BANNED_CTAS = ['contact us', 'get a quote'];

const results = [];

function visibleText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

function checkSource(name, src, report) {
  const noComments = src.replace(/<!--[\s\S]*?-->/g, (m) => ' '.repeat(m.length));

  // 1. No <style> blocks
  for (const m of noComments.matchAll(/<style\b/gi)) {
    report.error(`line ${lineOf(src, m.index)}: <style> block in a page. Put styles in a component or section CSS file.`);
  }

  // 2. Inline styles: CSS custom properties only, no hex colors
  for (const m of noComments.matchAll(/\sstyle="([^"]*)"/gi)) {
    const decls = m[1].split(';').map((d) => d.trim()).filter(Boolean);
    const bad = decls.filter((d) => !d.startsWith('--'));
    if (bad.length) report.error(`line ${lineOf(src, m.index)}: inline style "${bad.join('; ')}". Only CSS variables (--ux-*) are allowed inline. Use or add a class.`);
    if (/#[0-9a-f]{3,8}\b/i.test(m[1])) report.error(`line ${lineOf(src, m.index)}: hex color in a page. Use tokens from tokens.json.`);
  }

  // 3. Global sections come from includes
  if (!/@include\s+sections\/site-header\/site-header\.html/.test(src)) report.error('missing the header include (sections/site-header/site-header.html).');
  const pageEnd = src.match(/@include\s+sections\/page-end\/page-end\.html([^>]*?)-->/);
  const footerOnly = /@include\s+sections\/site-footer\/site-footer\.html/.test(src);
  const noBooking = /ux-check:\s*no-booking/.test(src);
  if (!pageEnd && !footerOnly) report.error('missing the page end. Close the page with <!-- @include sections/page-end/page-end.html --> after </main> (LLM.md 16.5).');
  if (/@include\s+sections\/booking-cta\/booking-cta(-home)?\.html/.test(src)) report.error('the booking card is included on its own. Use sections/page-end/page-end.html after </main>, so the card overlaps the footer (LLM.md 16.5).');
  if (pageEnd && src.indexOf(pageEnd[0]) < src.indexOf('</main>')) report.error('the page end is inside <main>. Put <!-- @include sections/page-end/page-end.html --> after </main> (LLM.md 16.5).');
  if (!pageEnd && !noBooking) report.error('no booking card. End with sections/page-end/page-end.html, or mark the page with <!-- ux-check: no-booking --> if it intentionally ends with the footer only.');
  // 3b. Page type decides the hero and the booking card (LLM.md 15.5)
  const TYPES = {
    home: { hero: ['ux-hero-home'], booking: 'home' },
    hub: { hero: ['ux-hero-home'], booking: 'home' },
    company: { hero: ['ux-hero-light'], booking: 'inner' },
    listing: { hero: ['ux-hero-listing'], booking: 'inner' },
    detail: { hero: ['ux-hero-case', 'ux-hero-article'], booking: 'inner' },
    inner: { hero: ['ux-hero-listing', 'ux-hero-light'], booking: 'inner' },
  };
  const typeMatch = src.match(/ux-page-type:\s*([a-z]+)/);
  if (!typeMatch) report.warn('no page type declared. Add <!-- ux-page-type: home|hub|company|listing|detail|inner --> at the top (LLM.md 15.5).');
  else if (!TYPES[typeMatch[1]]) report.error(`unknown page type "${typeMatch[1]}". Use home, hub, company, listing, detail or inner.`);
  else {
    const t = TYPES[typeMatch[1]];
    if (!t.hero.some((h) => new RegExp(`class="[^"]*\\b${h}\\b`).test(noComments))) report.error(`a ${typeMatch[1]} page uses the ${t.hero.join(' or ')} hero (LLM.md 15.5).`);
    const usesHome = !!pageEnd && /booking="booking-cta-home"/.test(pageEnd[1]);
    const usesInner = !!pageEnd && !usesHome;
    if (t.booking === 'home' && usesInner) report.error(`a ${typeMatch[1]} page needs the homepage booking card: page-end.html booking="booking-cta-home" (LLM.md 15.5).`);
    if (t.booking === 'inner' && usesHome) report.error(`a ${typeMatch[1]} page uses the inner booking card: drop booking="booking-cta-home" from page-end.html. The homepage version is for home and hub pages (LLM.md 15.5).`);
  }

  if (!/@include\s+templates\/_head\.html/.test(src)) report.error('missing templates/_head.html include.');
  if (!/@include\s+templates\/_scripts\.html/.test(src)) report.error('missing templates/_scripts.html include.');

  // 4. No hand written header, footer or booking card
  for (const [re, what] of [[/<footer\b/i, 'a <footer>'], [/class="[^"]*\bux-header\b/i, 'header markup'], [/class="[^"]*\bux-footer\b/i, 'footer markup'], [/class="[^"]*\bux-booking\b/i, 'booking card markup']]) {
    const m = noComments.match(re);
    if (m) report.error(`line ${lineOf(src, m.index)}: page contains ${what}. Use the include instead of writing it.`);
  }

  // 5. Class names follow the system
  for (const m of noComments.matchAll(/\sclass="([^"]*)"/gi)) {
    const bad = m[1].split(/\s+/).filter((c) => c && !/^(ux-|is-|js-)/.test(c));
    if (bad.length) report.error(`line ${lineOf(src, m.index)}: class "${bad.join(' ')}" is not part of the system (classes start with ux-).`);
  }

  // 6. Section padding values
  for (const m of noComments.matchAll(/ux-section--(pt|pb)-(\d+)/g)) {
    const allowed = m[1] === 'pt' ? ALLOWED_PT : ALLOWED_PB;
    if (!allowed.includes(m[2])) report.error(`line ${lineOf(src, m.index)}: ux-section--${m[1]}-${m[2]} is not an allowed section padding (LLM.md section 9).`);
  }
}

function checkBuilt(name, html, report) {
  const text = visibleText(html);
  const pageType = (html.match(/ux-page-type:\s*([a-z]+)/) || [, ''])[1];

  // 6b. Skip link target
  if (!/<main\b[^>]*\bid="main"/i.test(html)) report.error('<main> needs id="main" so the header\'s skip link works.');

  // 7. One H1
  const h1 = (html.match(/<h1\b/gi) || []).length;
  if (h1 !== 1) report.error(`${h1} <h1> elements. A page has exactly one.`);

  // 8. Buttons are the Arrow Glide component
  const btnTags = [...html.matchAll(/<(a|button)\b[^>]*class="([^"]*)"[^>]*>/gi)];
  for (const m of btnTags) {
    const classes = m[2].split(/\s+/);
    const isBtn = classes.includes('ux-btn');
    const looksLikeBtn = classes.some((c) => /(^|-)btn($|-)|button/i.test(c) && !c.startsWith('ux-btn') && !c.startsWith('ux-section-menu') && !c.startsWith('ux-faq') && !c.startsWith('ux-nav') && !c.startsWith('ux-header') && !c.startsWith('ux-chip') && !c.startsWith('ux-play') && !c.startsWith('ux-industry'));
    if (looksLikeBtn) report.error(`<${m[1]}> with class "${m[2]}" looks like a button but is not the Arrow Glide component (ux-btn).`);
    if (isBtn) {
      const close = html.indexOf(`</${m[1]}>`, m.index);
      const inner = html.slice(m.index, close);
      if (!inner.includes('ux-btn__icon')) report.error(`button "${visibleText(inner).trim().slice(0, 40)}" has no arrow circle. Use components/button/_button.html.`);
    }
  }

  // 9. One CTA in the hero
  const hero = html.match(/<section\b[^>]*class="[^"]*\bux-hero[^"]*"[\s\S]*?<\/section>/i);
  if (!hero) report.warn('no hero section found (ux-hero-*). Every page starts with an existing hero section.');
  else {
    // Main CTAs are pills (primary or glass). Text links inside a card that
    // overlaps the hero fade (featured story) belong to that card, not the hero.
    const pills = (hero[0].match(/class="[^"]*\bux-btn--(primary|glass)\b[^"]*"/g) || []).length;
    const heroText = hero[0].replace(/<article[\s\S]*?<\/article>/gi, '');
    const links = (heroText.match(/class="[^"]*\bux-btn--(secondary|subtle)\b[^"]*"/g) || []).length;
    if (pills + links > 1) report.error(`the hero has ${pills + links} CTAs. A hero has exactly one (LLM.md 13.1).`);
  }

  // 9b. Section level actions: one Primary, never a lone Secondary or a pair
  for (const m of html.matchAll(/<div class="[^"]*\bux-center\b[^"]*"[^>]*>([\s\S]*?)<\/div>/g)) {
    const block = m[1];
    const sec = (block.match(/ux-btn--secondary/g) || []).length;
    const all = (block.match(/class="ux-btn\b/g) || []).length;
    if (all > 1) report.warn('a section closes with more than one action. Use one Primary pill (LLM.md 11).');
    else if (sec) report.warn('a section closes with a Secondary text link. Section closing actions are one Primary pill; text links belong inside cards (LLM.md 11).');
  }

  // 9c. Story cards are three across
  for (const m of html.matchAll(/class="[^"]*\bux-grid--(2|4)\b[^"]*"/g)) {
    const next = html.slice(m.index, m.index + 1500);
    if (/ux-story-card\b/.test(next)) report.warn('story cards in a ' + m[1] + ' column grid. Story cards are always three across (LLM.md 12.5).');
  }

  // 9d. Section intros are centered except on detail pages (LLM.md 8.4, SL-04)
  if (pageType !== 'detail') {
    const starts = (html.match(/class="[^"]*\bux-section-header--start\b/g) || []).length;
    if (starts) report.warn(`${starts} left aligned section header(s). Section intros are centered except on detail pages (LLM.md 8.4).`);
  }

  // 9e. Button classes only on real CTAs, never on cards or tiles
  for (const m of html.matchAll(/<(a|button)\b[^>]*class="[^"]*\bux-btn\b[^"]*"[^>]*>([\s\S]*?)<\/\1>/g)) {
    const label = visibleText(m[2]).trim();
    if (/<h[1-6]\b|<p\b/.test(m[2]) || label.length > 60) { report.error(`"${label.slice(0, 40)}…" is a card or tile using the ux-btn classes. ux-btn is only for real CTAs (LLM.md 16.4).`); break; }
  }

  // 9f. Approved wording that has been rewritten before (LLM.md 12.5)
  const REWRITES = [
    [/Companies we(’|')ve worked with/i, 'the logo strip label is "Trusted by B2B companies worldwide"'],
    [/>\s*Frequently asked questions\s*</i, 'reuse the approved FAQ heading ("What we observe, think, and learn" on home and hub pages)'],
  ];
  for (const [re, fix] of REWRITES) if (re.test(html)) report.warn(`rewritten approved label: ${fix}.`);
  if (/ux-step__title/.test(html) && !/We walk your product as your buyers do/.test(html)) report.warn('the process section copy differs from the approved version. Reuse sections/process/process.html as it is (LLM.md 12.5).');

  // 9g. Trusted-by logos are the logo marquee (LLM.md 12.5)
  for (const m of html.matchAll(/<section\b[\s\S]*?<\/section>/gi)) {
    const sec = m[0];
    const trusted = /Trusted by B2B companies/i.test(visibleText(sec));
    const loose = sec.replace(/<article\b[\s\S]*?<\/article>/gi, '');
    const logos = [...loose.matchAll(/<img\b[^>]*>/gi)].filter((i) => /assets\/logos\/clients\//.test(i[0]) && !/__(logo|client)\b/.test(i[0])).length + (loose.match(/class="[^"]*\bux-logo-tile\b/g) || []).length;
    const inMarqueeOrGrid = /ux-marquee|ux-logo-grid/.test(sec);
    if (trusted && !/ux-marquee/.test(sec)) report.error('"Trusted by B2B companies worldwide" without the logo marquee. Use sections/logo-marquee as it is (LLM.md 12.5).');
    else if (logos >= 3 && !inMarqueeOrGrid) report.error('a row of client logos that is not the logo marquee. The trusted-by strip is sections/logo-marquee, as it is (LLM.md 12.5).');
  }

  // 9h. Every section header has an eyebrow (LLM.md 8.4). Detail page body blocks are exempt.
  if (pageType !== 'detail') {
    for (const m of html.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi)) {
      const cls = (m[1].match(/class="([^"]*)"/) || [, ''])[1];
      if (/ux-hero|ux-booking|ux-detail-section|ux-content-section|ux-article/.test(cls)) continue;
      const body = m[2];
      const h2 = body.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i);
      if (h2 && !/ux-eyebrow/.test(body.slice(0, h2.index + h2[0].length))) report.error(`section "${visibleText(h2[1]).trim().slice(0, 50)}" has no eyebrow. Every section header has one; write it if the content has none (LLM.md 8.4).`);
    }
  }

  // 9i. No gradient filled content cards, no gradient on a gradient (LLM.md 8.5)
  if (pageType !== 'detail' && /class="[^"]*\bux-g-card\b/.test(html)) report.error('G6 gradient cards (ux-g-card) outside the Success Story detail page. Content cards are white with a Steel border (LLM.md 8.5).');
  for (const m of html.matchAll(/<section\b[^>]*class="[^"]*\bux-bg-(warm-glow|deep-navy)\b[^"]*"[^>]*>([\s\S]*?)<\/section>/gi)) {
    if (/class="[^"]*\b(ux-g-card|ux-booking__card|ux-bg-warm-glow|ux-bg-deep-navy|ux-bg-hero-light)\b/.test(m[2])) report.error(`a gradient surface inside the ${m[1].replace('-', ' ')} band. Never a gradient on a gradient (LLM.md 8.5).`);
  }
  for (const m of html.matchAll(/<(div|article|li|aside)\b[^>]*class="[^"]*\bux-bg-(warm-glow|deep-navy|hero-light)\b[^"]*"/gi)) {
    report.error(`a ${m[2].replace('-', ' ')} gradient on a <${m[1]}>. Gradient backgrounds are for whole sections, never cards or panels (LLM.md 8.5).`);
  }

  // 9j. Icons and graphics are SVG (LLM.md 8.6)
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const src = (tag.match(/\ssrc="([^"]*)"/) || [, ''])[1];
    const isIconContext = /class="[^"]*(icon|graphic|illustration|diagram)/i.test(tag) || /assets\/icons\//.test(src);
    const isSvg = /\.svg(\?|#|$)/i.test(src) || /^data:image\/svg\+xml/i.test(src);
    if (isIconContext && !isSvg) report.error(`icon or graphic that is not SVG: ${tag.slice(0, 90)}… Icons and graphics are SVG (LLM.md 8.6).`);
  }

  // 9j2. Phosphor icons are inlined with @icon, never <img> (an image renders black)
  if (/<img\b[^>]*src="[^"]*icons\/phosphor\//i.test(html)) report.error('Phosphor icon used as <img>. Place it with <!-- @icon name size="32" --> so it takes the container color (docs/GRAPHICS.md family 2).');
  if (/<!--\s*@icon\b/.test(html)) report.error('unresolved @icon directive. Run npm run build.');

  // 9k. Process and approach sections show the process, not a mockup (LLM.md 13.6)
  for (const m of pageType === 'detail' ? [] : html.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/gi)) {
    const head = (m[1].match(/<header\b[^>]*ux-section-header[\s\S]*?<\/header>/i) || [''])[0];
    if (!head) continue;
    const headText = visibleText(head).toLowerCase();
    if (!/\b(process|approach|how we|how it works|method|principles|framework|steps|our way|designing)\b/.test(headText)) continue;
    const media = /<figure\b|class="[^"]*(mockup|device|phone|browser-frame|screen|ux-scene)[^"]*"|illustrative (product )?interface/i.test(m[1]);
    const rasterImg = [...m[1].matchAll(/<img\b[^>]*>/gi)].some((i) => !/\.svg|data:image\/svg/i.test(i[0]) && !/ux-btn|logo|founder|person/i.test(i[0]));
    if (media || rasterImg) report.warn(`"${headText.trim().slice(0, 50)}" reads as a process or approach section but holds a mockup or image. Show the process (icons, numbers, steps, cards, an SVG diagram), never a result (LLM.md 13.6).`);
  }

  // 9l. Content heavy sections need a composition, not a dump (LLM.md 12.7)
  for (const m of html.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi)) {
    const cls = (m[1].match(/class="([^"]*)"/) || [, ''])[1];
    if (/ux-hero|ux-booking|ux-detail|ux-content-section|ux-article/.test(cls)) continue;
    const body = m[2];
    if (/ux-faq|ux-story-card/.test(body)) continue;
    const words = visibleText(body).trim().split(/\s+/).length;
    const blocks = ['ux-step', 'ux-grid--4', 'ux-grid--3', 'ux-grid--2', 'ux-service', 'ux-engagement', 'ux-industry', 'ux-outcome-card', 'ux-stat'].filter((b) => new RegExp(`class="[^"]*\\b${b}\\b`).test(body));
    const title = visibleText((body.match(/<h2\b[\s\S]*?<\/h2>/i) || [''])[0]).trim().slice(0, 50);
    if (blocks.length >= 2 && blocks.includes('ux-step')) report.warn(`"${title}" combines the process steps with other content. One idea per section; give the process its own section (LLM.md 12.7).`);
    else if (words > 150 && !/ux-services|ux-approach|ux-beliefs/.test(cls)) report.warn(`"${title}" holds ${words} words. Brainstorm the composition and cut to one idea (LLM.md 12.7).`);
  }

  // 9p. Every hero has an eyebrow above the H1 (LLM.md 8.4); on articles the meta line is the eyebrow
  {
    const h1 = html.search(/<h1\b/);
    if (h1 > -1) {
      const before = html.slice(0, h1);
      const heroStart = before.lastIndexOf('<section');
      const head = heroStart > -1 ? before.slice(heroStart) : before.slice(-1500);
      if (!/class="[^"]*\b(ux-eyebrow|ux-hero-article__meta)\b/.test(head)) report.error('the hero has no eyebrow above the H1. Write one (2 to 6 words) if the content has none (LLM.md 8.4).');
    }
  }

  // 9q. Card arrows are the Arrow Glide icon, so the card hover plays its glide (LLM.md 11)
  for (const m of html.matchAll(/<svg\b([^>]*)>(?:(?!<\/svg>)[\s\S])*?M2\.5 8h11/g)) {
    if (!/class="[^"]*\bux-btn__arrow\b/.test(m[1])) { report.error('an arrow drawn outside the Arrow Glide component. Use <span class="ux-btn ux-btn--icon" aria-hidden="true"><!-- @include components/button/_icon.html --></span> so the card hover plays the glide (LLM.md 11).'); break; }
  }

  // 9r. No line under the header (LLM.md 16.5)
  if (/class="[^"]*\bux-header--bordered\b/.test(html)) report.error('ux-header--bordered: the header has no bottom line (LLM.md 16.5).');

  // 9o. The booking card sits directly above the footer, overlapping it (LLM.md 16.5)
  if (/<section\b[^>]*class="[^"]*\bux-booking\b/.test(html)) {
    const end = html.lastIndexOf('</section>', html.indexOf('<footer'));
    const between = html.slice(end + 10, html.indexOf('<footer')).replace(/<!--[\s\S]*?-->/g, '').trim();
    if (between) report.error('the booking card is not directly followed by the footer (found "' + between.slice(0, 20) + '"), so it cannot overlap it. Use sections/page-end/page-end.html after </main> (LLM.md 16.5).');
  }

  // 9m. Scenes are images: white sections only (docs/GRAPHICS.md 9)
  for (const m of html.matchAll(/<section\b[^>]*class="[^"]*\bux-bg-(warm-glow|deep-navy)\b[^"]*"[^>]*>([\s\S]*?)<\/section>/gi)) {
    if (/class="[^"]*\bux-scene\b/.test(m[2])) report.error(`a product scene inside the ${m[1].replace('-', ' ')} band. Scenes sit on white sections only (docs/GRAPHICS.md section 9).`);
  }
  // 9n. Image boxes are placeholders, never live
  if (/class="[^"]*\bux-image-box\b/.test(html)) report.warn(`${(html.match(/class="[^"]*\bux-image-box\b/g) || []).length} image placeholder(s). Expected: the team adds the images (docs/GRAPHICS.md section 8).`);

  // 10. Band limits
  const warm = (html.match(/class="[^"]*\bux-bg-warm-glow\b/g) || []).length;
  const navy = (html.match(/class="[^"]*\bux-bg-deep-navy\b/g) || []).length;
  const mist = (html.match(/<section\b[^>]*class="[^"]*\bux-bg-mist\b/g) || []).length;
  if (mist) report.warn('a full section on Mist. Mist is for small panels, not section backgrounds (LLM.md 8.6).');
  if (warm > 1) report.error(`${warm} Warm Glow bands. At most one per page.`);
  if (navy > 1) report.error(`${navy} Deep Navy bands. At most one per page.`);

  // 11. Images have alt text
  for (const m of html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/gi)) {
    report.error(`image without alt: ${m[0].slice(0, 80)}…`);
  }

  // 12. Copy rules
  if (text.includes('—')) report.error('em dash (—) in page copy. Use a comma, a period or restructure.');
  const lower = text.toLowerCase();
  for (const c of BANNED_CTAS) if (lower.includes(c)) report.error(`"${c}" in page copy. The main CTA is "Book a Discovery Call".`);
  for (const w of AVOID_WORDS) if (new RegExp(`\\b${w}\\b`, 'i').test(text)) report.warn(`avoided word "${w}" in page copy (LLM.md 3.2).`);
  if (/[A-Za-z]!(\s|$)/.test(text)) report.warn('exclamation mark in page copy.');
  if (/\[(x|confirm)[^\]]*\]/i.test(text)) report.warn('placeholder ([X] or [confirm ...]) in page copy. Fine in a draft, never live.');
}

// Repo level: icon files are SVG; no new gradient filled cards in CSS (LLM.md 8.5, 8.6)
const GRADIENT_CSS_ALLOWED = [
  'components/graphic', 'components/outcome-card', 'components/video-card', 'components/faq', 'components/detail-blocks', 'components/service-card',
  'sections/team', 'sections/story-split', 'sections/hero-', 'sections/site-footer', 'sections/booking-cta', 'base/', 'tokens/',
];
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}
async function checkRepo(report) {
  for (const dir of [join(ROOT, '..', 'assets', 'icons'), join(ROOT, '..', 'assets', 'graphics')]) {
    if (!existsSync(dir)) continue;
    for (const p of await walk(dir)) if (/\.(png|jpe?g|webp|gif|avif)$/i.test(p)) report.error(`${p.slice(ROOT.length + 1)} is not SVG. Icons and graphics are SVG (LLM.md 8.6, docs/GRAPHICS.md).`);
  }
  for (const p of (await walk(join(ROOT, 'src'))).filter((x) => x.endsWith('.css'))) {
    const rel = p.slice(join(ROOT, 'src').length + 1);
    if (GRADIENT_CSS_ALLOWED.some((a) => rel.startsWith(a))) continue;
    const css = await readFile(p, 'utf8');
    for (const m of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
      if (/background[^;]*(gradient|--ux-gradient)/.test(m[2]) && /card|tile|panel|item|box/i.test(m[1])) {
        report.error(`${rel}: "${m[1].trim().slice(0, 60)}" has a gradient background. Content cards are never gradient filled (LLM.md 8.5).`);
      }
    }
  }
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('dist/pages not found. Run `npm run build` first.');
    process.exit(1);
  }
  // Approved pages (src/pages) and demo pages (src/demos) get the same checks.
  const files = [];
  for (const dir of ['pages', 'demos']) {
    const from = join(ROOT, 'src', dir);
    if (!existsSync(from)) continue;
    for (const name of (await readdir(from)).filter((x) => x.endsWith('.html'))) files.push(dir === 'pages' ? name : `${dir}/${name}`);
  }
  let errors = 0;
  let warnings = 0;

  for (const f of files) {
    const issues = [];
    const report = {
      error: (msg) => issues.push(['ERROR', msg]),
      warn: (msg) => issues.push(['warn ', msg]),
    };
    const src = await readFile(f.includes('/') ? join(ROOT, 'src', f) : join(SRC, f), 'utf8');
    checkSource(f, src, report);
    const builtPath = f.includes('/') ? join(ROOT, 'dist', f) : join(DIST, f);
    if (existsSync(builtPath)) checkBuilt(f, await readFile(builtPath, 'utf8'), report);
    else report.error('not built. Run `npm run build`.');

    const e = issues.filter((i) => i[0] === 'ERROR').length;
    errors += e;
    warnings += issues.length - e;
    console.log(`${e ? '✗' : '✓'} ${f}${issues.length ? '' : '  all checks passed'}`);
    for (const [level, msg] of issues) console.log(`   ${level}  ${msg}`);
  }

  const repoIssues = [];
  await checkRepo({ error: (msg) => repoIssues.push(['ERROR', msg]), warn: (msg) => repoIssues.push(['warn ', msg]) });
  const re = repoIssues.filter((i) => i[0] === 'ERROR').length;
  errors += re;
  warnings += repoIssues.length - re;
  console.log(`${re ? '✗' : '✓'} repo assets and CSS${repoIssues.length ? '' : '  all checks passed'}`);
  for (const [level, msg] of repoIssues) console.log(`   ${level}  ${msg}`);

  console.log(`\n${files.length} pages, ${errors} errors, ${warnings} warnings.`);
  console.log('This check does not replace a visual comparison with reference/pages at 1440, 768 and 375.');
  process.exit(errors ? 1 : 0);
}

main();
