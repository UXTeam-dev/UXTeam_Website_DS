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
  if (!/@include\s+sections\/site-footer\/site-footer\.html/.test(src)) report.error('missing the footer include (sections/site-footer/site-footer.html).');
  const noBooking = /ux-check:\s*no-booking/.test(src);
  if (!noBooking && !/@include\s+sections\/booking-cta\/booking-cta(-home)?\.html/.test(src)) {
    report.error('missing the booking card include (sections/booking-cta). Add it, or mark the page with <!-- ux-check: no-booking --> if it intentionally ends with the footer only.');
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

  // 10. Band limits
  const warm = (html.match(/\bux-bg-warm-glow\b/g) || []).length;
  const navy = (html.match(/\bux-bg-deep-navy\b/g) || []).length;
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

async function main() {
  if (!existsSync(DIST)) {
    console.error('dist/pages not found. Run `npm run build` first.');
    process.exit(1);
  }
  const files = (await readdir(SRC)).filter((f) => f.endsWith('.html'));
  let errors = 0;
  let warnings = 0;

  for (const f of files) {
    const issues = [];
    const report = {
      error: (msg) => issues.push(['ERROR', msg]),
      warn: (msg) => issues.push(['warn ', msg]),
    };
    const src = await readFile(join(SRC, f), 'utf8');
    checkSource(f, src, report);
    const builtPath = join(DIST, f);
    if (existsSync(builtPath)) checkBuilt(f, await readFile(builtPath, 'utf8'), report);
    else report.error('not built. Run `npm run build`.');

    const e = issues.filter((i) => i[0] === 'ERROR').length;
    errors += e;
    warnings += issues.length - e;
    console.log(`${e ? '✗' : '✓'} ${f}${issues.length ? '' : '  all checks passed'}`);
    for (const [level, msg] of issues) console.log(`   ${level}  ${msg}`);
  }

  console.log(`\n${files.length} pages, ${errors} errors, ${warnings} warnings.`);
  console.log('This check does not replace a visual comparison with reference/pages at 1440, 768 and 375.');
  process.exit(errors ? 1 : 0);
}

main();
