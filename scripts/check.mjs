#!/usr/bin/env node
/*
 * npm run check: the gate every page and every new CSS PART must pass.
 * Rules are explained in docs/CSS-GUIDE.md (section numbers in the messages).
 *
 *   1. Pages (src/pages, src/starters): classes, structure, buttons, headings, copy.
 *   2. New CSS (src/css/parts): naming, PART header, scope, colours, breakpoints.
 *   3. Repo: the developers' files are untouched, the registry is current, the build is current.
 *
 * Exit code 1 on any error. Warnings do not fail the check but should be fixed.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { expand } from './build.mjs';
import { buildRegistry } from './classes.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const G = 'docs/CSS-GUIDE.md';

let errors = 0;
let warnings = 0;
const out = [];
const report = (file) => ({
  error: (m) => { errors += 1; out.push(`  ✗ ${file}: ${m}`); },
  warn: (m) => { warnings += 1; out.push(`  ! ${file}: ${m}`); },
});

const walk = (dir) => (existsSync(dir) ? readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; }) : []);
const noComments = (h) => h.replace(/<!--[\s\S]*?-->/g, '');
const norm = (s) => s.replace(/\s+/g, ' ').replace(/> </g, '><').trim();
const textOf = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');

/* Outer HTML of the element that starts at index i. */
function outer(html, i) {
  const tag = html.slice(i).match(/^<([a-z0-9]+)/i)[1].toLowerCase();
  const re = new RegExp(`<(/?)${tag}\\b[^>]*?(/?)>`, 'gi');
  re.lastIndex = i;
  let depth = 0;
  let m;
  while ((m = re.exec(html))) {
    if (m[2] === '/') continue;
    depth += m[1] ? -1 : 1;
    if (depth === 0) return html.slice(i, re.lastIndex);
  }
  return html.slice(i);
}
const elementsWithClass = (html, cls) => [...html.matchAll(new RegExp(`<[a-z0-9]+\\b[^>]*class="(?:[^"]*\\s)?${cls}(?:\\s[^"]*)?"[^>]*>`, 'gi'))].map((m) => outer(html, m.index));

/* ---------- registry ---------- */
const { allowed, notAllowed, theme, addParts } = buildRegistry();
const NOT_ALLOWED = new Set(notAllowed);
const THEME = new Set(Object.keys(theme));
const PAGE_WRAPPERS = new Set(['uxt-home', 'uxt-wwd', 'uxt-about']);
for (const p of walk(join(SRC, 'css', 'parts')).filter((f) => f.endsWith('.css'))) {
  const m = readFileSync(p, 'utf8').match(/Scope:\s*\.(uxt-[a-z0-9-]+)/);
  if (m) PAGE_WRAPPERS.add(m[1]);
}

// In uxteam-site.css but replaced by the uxt-button system the developers' pages use.
const RETIRED = Object.fromEntries(['uxt-btn', 'uxt-btn-navy', 'uxt-arrow', 'uxt-arrow-dark', 'uxt-arrow-navy', 'uxt-arrow-soft', 'uxt-arrow-white', 'uxt-link', 'uxt-link-navy', 'uxt-wrap']
  .map((c) => [c, 'the older button style in PART B. Use uxt-button with a type (partials/elements/button.html)']));
const BUTTON_TYPES = ['uxt-button-primary', 'uxt-button-secondary', 'uxt-button-subtle', 'uxt-button-glass', 'uxt-button-icon'];
const BANNED_CTAS = ['contact us', 'get a quote', 'get started', 'click here', 'submit'];
const APPROVED_SCRIPTS = walk(join(SRC, 'partials')).filter((f) => /-script\.html$/.test(f)).map((f) => norm(noComments(readFileSync(f, 'utf8'))));
const LOGOS = existsSync(join(SRC, 'partials/sections/logos.html')) ? norm(noComments(readFileSync(join(SRC, 'partials/sections/logos.html'), 'utf8'))) : '';

/* ---------- 1. pages ---------- */
const lock = JSON.parse(readFileSync(join(SRC, 'css', 'source.lock.json'), 'utf8'));
const DEV_FILES = new Set(Object.keys(lock.files));

function checkPage(file, html, { starter = false } = {}) {
  const r = report(file);
  // The developers' own pages are the reference for classes and structure. Where
  // one breaks a design rule, it is reported as a warning to raise with them.
  const design = DEV_FILES.has(file) ? (m) => r.warn(`${m} [developer file: raise with the developers]`) : r.error;
  const raw = noComments(html);
  const body = raw.replace(/<script[\s\S]*?<\/script>/g, '');
  const key = basename(file, '.html');

  // 1.1 no page-level CSS
  if (/<style\b/i.test(raw)) r.error(`has a <style> block. Pages use only uxteam-site.css; new styles go in a new PART in src/css/parts (${G} 2 and 5).`);
  if (/\sstyle="/i.test(body)) r.error(`has inline style="". Use registry classes, or add a class in a new PART (${G} 2).`);
  if (/<link\b[^>]*stylesheet/i.test(raw)) r.error(`links a stylesheet. The site has one stylesheet, set in Salient (${G} 2).`);

  // 1.2 scripts only from approved partials
  for (const m of raw.matchAll(/<script\b[\s\S]*?<\/script>/gi)) {
    if (!APPROVED_SCRIPTS.includes(norm(m[0]))) r.error(`has a <script> that is not one of the approved scripts in src/partials (*-script.html). New behaviour goes to the developers (${G} 4.6).`);
  }

  // 1.3 the page body is the wrapper, nothing else
  const first = body.trim().match(/^<div\b[^>]*class="([^"]*)"/);
  const wrapper = first ? first[1].split(/\s+/) : [];
  if (!first || wrapper[0] !== 'uxt-home') r.error(`must start with the page wrapper <div class="uxt-home …">, as the developers' pages do (${G} 3.1).`);
  else if (!starter && key !== 'homepage' && !wrapper.some((c) => c !== 'uxt-home' && /^uxt-[a-z0-9]+$/.test(c))) r.error(`wrapper needs a page key after uxt-home, for example <div class="uxt-home uxt-${key.split('-')[0]}"> (${G} 3.1).`);
  if (first && outer(body.trim(), 0).length < body.trim().length - 2) r.error(`has markup after the closing wrapper </div>. Everything goes inside the wrapper (${G} 3.1).`);
  if (/<(header|footer)\b/i.test(body) || /class="[^"]*\buxt-(cta|main-footer)\b/.test(body)) r.error(`contains a header, footer or the booking card. They come from Salient and the footer global section, never from the page (${G} 3.2).`);

  // 1.4 every class in the registry
  const seen = new Set();
  for (const m of body.matchAll(/class="([^"]*)"/g)) {
    for (const c of m[1].split(/\s+/).filter(Boolean)) {
      if (seen.has(c)) continue;
      seen.add(c);
      if (starter && /[[\]{}]/.test(c)) continue;
      if (RETIRED[c]) { r.error(`"${c}" is ${RETIRED[c]} (${G} 4.3).`); continue; }
      if (allowed[c]) {
        const scopes = (allowed[c].scopes || []).map((x) => x.replace(/^\./, ''));
        const wrappers = scopes.filter((x) => PAGE_WRAPPERS.has(x));
        if (scopes.length && wrappers.length === scopes.length && !wrappers.some((x) => wrapper.includes(x))) r.error(`"${c}" only works inside .${wrappers.join(' or .')}, and the wrapper is "${wrapper.join(' ')}" (${G} 3.3).`);
        continue;
      }
      if (/^ux-/.test(c)) r.error(`"${c}" is from the old ux- system (legacy/). Use the uxt- class for the same element: ${G} 4 (table).`);
      else if (NOT_ALLOWED.has(c)) r.error(`"${c}" is old Salient CSS (PART A). Never use it; use the PART B class (${G} 4.1).`);
      else if (THEME.has(c)) r.error(`"${c}" is a Salient element class. Salient adds it; never type it into a page (${G} 2).`);
      else if (/^uxt-/.test(c)) r.error(`"${c}" is not in the registry. Use an existing class, or add it in a new PART and run npm run classes (${G} 5).`);
      else r.error(`"${c}" is not a UXTeam class. Classes start with uxt- and come from the registry (${G} 5.1).`);
    }
  }

  // 1.5 buttons: the developers' exact structure
  for (const b of elementsWithClass(body, 'uxt-button')) {
    const cls = b.match(/class="([^"]*)"/)[1].split(/\s+/);
    const types = cls.filter((c) => BUTTON_TYPES.includes(c));
    const label = (b.match(/uxt-button-label">([^<]*)/) || [])[1];
    const name = label || 'icon button';
    if (types.length !== 1) r.error(`button "${name}" needs exactly one type: ${BUTTON_TYPES.join(', ')} (${G} 4.3).`);
    if ((b.match(/class="uxt-button-arrow"/g) || []).length !== 2 || !/uxt-button-circle/.test(b)) r.error(`button "${name}" must have the uxt-button-circle with two uxt-button-arrow SVGs. Use partials/elements/button.html (${G} 4.3).`);
    if (!types.includes('uxt-button-icon') && !label) r.error(`button has no <span class="uxt-button-label"> (${G} 4.3).`);
    if (types.includes('uxt-button-icon') && /^<a\b/.test(b) && !/^<a\b[^>]*aria-label="/.test(b)) r.error(`an icon only button link needs aria-label="…" (${G} 4.3).`);
    if (/^<a\b/.test(b) && /<a\b/.test(b.slice(2))) r.error(`button "${name}" has a link inside a link (${G} 4.3).`);
    if (/^<span\b/.test(b) && !/aria-hidden="true"/.test(b.slice(0, 200))) r.error(`button "${name}" is a <span> inside a card; it needs aria-hidden="true" and the card needs uxt-button-trigger (${G} 4.3).`);
    if (label && BANNED_CTAS.includes(label.trim().toLowerCase())) r.error(`button label "${label}". The main CTA is "Book a Discovery Call" (${G} 6.3).`);
  }
  for (const m of body.matchAll(/<(a|button)\b[^>]*class="([^"]*)"/g)) {
    if (/\b(btn|button|cta)\b/i.test(m[2]) && !/\buxt-/.test(m[2])) r.error(`a ${m[1] === "a" ? "link" : "button"} with class "${m[2]}". Buttons use the uxt-button markup (${G} 4.3).`);
  }

  // 1.6 headings
  const h1s = [...body.matchAll(/<h1\b([^>]*)>/g)];
  if (!starter && h1s.length !== 1) r.error(`has ${h1s.length} H1s. A page has exactly one, class uxt-h1 (${G} 4.2).`);
  for (const m of body.matchAll(/<(h[1-6])\b([^>]*)>/g)) {
    const c = (m[2].match(/class="([^"]*)"/) || [, ''])[1].split(/\s+/);
    if (!c.some((x) => /^uxt-h(1|2|3|3-sm)$/.test(x))) r.error(`<${m[1]}> has no text style class (uxt-h1, uxt-h2, uxt-h3, uxt-h3-sm). The tag sets the outline, the class sets the look (${G} 4.2).`);
  }
  for (const s of elementsWithClass(body, 'uxt-subheading')) {
    if (!/underline-(sky-blue|white)/.test(s.slice(0, 200))) r.error(`a uxt-subheading without underline-sky-blue or underline-white (${G} 4.2).`);
  }
  // eyebrow above every H1 and H2
  for (const m of body.matchAll(/<h([12])\b[^>]*>([\s\S]*?)<\/h\1>/g)) {
    const before = body.slice(Math.max(0, m.index - 400), m.index);
    if (!/class="[^"]*uxt-subheading[^"]*"[^>]*>[^<]*<\/p>\s*$/.test(before)) design(`"${textOf(m[2]).trim().slice(0, 40)}" (H${m[1]}) has no uxt-subheading eyebrow right above it. Every hero and section title has one (${G} 4.2).`);
  }

  // 1.7 fixed blocks
  if (/uxt-logos\b/.test(body)) {
    const logos = elementsWithClass(body, 'uxt-logos')[0];
    if (LOGOS && norm(logos) !== LOGOS) r.error(`the logo strip was changed. Include partials/sections/logos.html as it is (${G} 4.4).`);
  }

  // 1.8 images and ids
  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) r.error(`an <img> without alt="" (${G} 6.2).`);
    const src = (m[0].match(/src="([^"]*)"/) || [, ''])[1];
    if (!/^(\/wp-content\/uploads\/|https:\/\/new\.ux\.team\/wp-content\/uploads\/)/.test(src)) r.warn(`image "${src.slice(0, 60)}" is not in the WordPress media library (/wp-content/uploads/). Upload it, or mark it [confirm image] (${G} 6.2).`);
    if (/\.(png|jpe?g)$/i.test(src) && /icon|graphic|illustration/i.test(m[0])) r.error(`"${src}" is an icon or graphic as a raster image. Icons and graphics are SVG.`);
  }
  const ids = [...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  for (const id of new Set(ids)) if (ids.filter((x) => x === id).length > 1) r.error(`id "${id}" is used more than once.`);
  if (ids.includes('book-call')) r.error(`uses id="book-call". That id belongs to the booking card in the footer global section.`);

  // 1.9 copy
  const text = textOf(raw);
  if (/[—–]/.test(text)) r.error(`copy has an em or en dash. Use a comma, a period or rewrite (CLAUDE.md house style).`);
  const lower = text.toLowerCase();
  for (const c of ['contact us', 'get a quote']) if (lower.includes(c)) r.error(`"${c}" in copy. The main CTA is "Book a Discovery Call".`);
  if (!starter && /\[(confirm|placeholder|todo|image)/i.test(text)) r.warn(`has [confirm …] or [Image: …] placeholders still to fill. List them in docs/OPEN-ITEMS.md.`);
}

/* ---------- 2. new CSS parts ---------- */
const site = readFileSync(join(SRC, 'css', 'uxteam-site.css'), 'utf8');
const siteLetters = new Set([...site.matchAll(/^ {3}PART ([A-Z])\b/gm)].map((m) => m[1]));
const siteClasses = new Set([...site.replace(/\/\*[\s\S]*?\*\//g, '').replace(/url\([^)]*\)/g, '').matchAll(/\.(-?[a-zA-Z_][\w-]*)/g)].map((m) => m[1]));
// Palette: every hex PART B to R uses, plus the Figma support colours (LLM.md 8.2) not in the CSS yet.
const FIGMA_SUPPORT = ['#e4f0ff', '#acb5c2', '#516076', '#c1ccde', '#f6dba0', '#919c9f'];
const PALETTE = new Set([...[...site.slice(site.indexOf('PART B  UXTEAM')).matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((m) => m[0].toLowerCase()), ...FIGMA_SUPPORT]);
const BREAKPOINTS = new Set(['max-width: 1280px', 'max-width: 1024px', 'max-width: 999px', 'max-width: 767px', 'max-width: 450px', 'max-width: 375px', 'min-width: 768px', 'min-width: 1000px', 'min-width: 1025px', 'min-width: 1281px', 'prefers-reduced-motion: reduce']);
const NAME = /^uxt-[a-z0-9]+(-[a-z0-9]+)*$/;

function checkPart(file) {
  const r = report(relative(ROOT, file));
  const css = readFileSync(file, 'utf8');
  const fm = basename(file).match(/^part-([a-z]{1,2})-([a-z0-9-]+)\.css$/);
  if (!fm) return r.error(`file name must be part-<letter>-<scope>.css, for example part-s-industry.css (${G} 5.2).`);
  const letter = fm[1].toUpperCase();
  const head = css.match(/^\/\* =+\s*\n\s*PART ([A-Z]{1,2}) \| ([^\n]+)\n([\s\S]*?)=+ \*\//);
  if (!head) r.error(`must start with the PART header block, as in uxteam-site.css (${G} 5.3).`);
  else {
    if (head[1] !== letter) r.error(`header says PART ${head[1]} but the file name says ${letter}.`);
    if (!/Figma/i.test(head[2] + head[3])) r.error(`header must name the Figma node (${G} 5.3).`);
    if (!/Scope:/i.test(head[3])) r.error(`header needs a "Scope:" line (${G} 5.3).`);
    if (!/HTML:/i.test(head[3])) r.error(`header needs an "HTML:" line naming the page or partial (${G} 5.3).`);
  }
  if (siteLetters.has(letter)) r.error(`PART ${letter} already exists in uxteam-site.css. Use the next free letter (${G} 5.2).`);
  const scope = (css.match(/Scope:\s*\.(uxt-[a-z0-9-]+)/) || [])[1];
  const isGlobal = /Scope:\s*global/i.test(css);
  if (!scope && !isGlobal) r.error(`"Scope:" must be a page wrapper class (.uxt-<page>) or "global" (${G} 5.4).`);

  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/url\([^)]*\)/g, 'url()');
  if (/@import/.test(clean)) r.error(`has @import. Fonts and files are set up by the developers.`);
  if (/<style|<\/style/.test(clean)) r.error(`contains a <style> tag. Plain CSS only.`);

  // selectors
  let buf = '';
  const sels = [];
  for (const ch of clean) {
    if (ch === '{') { sels.push(buf.trim()); buf = ''; } else if (ch === '}' || ch === ';') buf = ''; else buf += ch;
  }
  for (const sel of sels) {
    if (sel.startsWith('@')) {
      if (sel.startsWith('@media')) for (const q of sel.matchAll(/\(([^()]+)\)/g)) if (!BREAKPOINTS.has(q[1].trim().replace(/\s+/g, ' '))) r.error(`breakpoint (${q[1].trim()}). Use the site's: max-width 1280, 1024, 999, 767 (fine tuning 450, 375), min-width 768, 1025 (${G} 5.6).`);
      continue;
    }
    if (/^(from|to|\d+%)/.test(sel)) continue; // keyframe steps
    for (const one of sel.split(',').map((s) => s.trim())) {
      if (/#[a-z]/i.test(one.replace(/\[[^\]]*\]/g, ''))) r.error(`"${one}" uses an id. Style classes only (${G} 5.4).`);
      const classes = [...one.matchAll(/\.(-?[a-zA-Z_][\w-]*)/g)].map((m) => m[1]);
      for (const c of classes) {
        if (/__|--/.test(c)) r.error(`".${c}" is BEM. The developers use flat hyphen names: uxt-block-part, variants as a second class (${G} 5.1).`);
        else if (!siteClasses.has(c) && !NAME.test(c) && !/^(is|has)-[a-z0-9-]+$/.test(c)) r.error(`".${c}" breaks the naming rule uxt-<block>-<part> (lowercase, hyphens) (${G} 5.1).`);
      }
      if (scope && !one.startsWith(`.${scope}`)) r.error(`"${one}" must start with .${scope}, so it cannot change other pages (${G} 5.4).`);
      if (isGlobal) for (const c of classes) if (siteClasses.has(c)) r.error(`"${one}" restyles .${c}, which uxteam-site.css owns. A global part may only style new classes (${G} 5.4).`);
      if (scope) {
        const key = scope.replace(/^uxt-/, '');
        const own = classes.filter((c) => !siteClasses.has(c) && c !== scope && !/^(is|has)-/.test(c));
        for (const c of own) if (!c.startsWith(`uxt-${key}-`)) r.error(`new class ".${c}" must start with the page key: uxt-${key}-… (${G} 5.1).`);
      }
    }
  }
  // values
  for (const m of clean.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) if (!PALETTE.has(m[0].toLowerCase())) r.error(`colour ${m[0]} is not in the palette. Use var(--uxt-color-…) or a colour from PART B (${G} 5.5).`);
  for (const m of clean.matchAll(/font-family\s*:\s*([^;}]+)/g)) if (!/^var\(--uxt-font-(aeonik|manrope|besley)\)/.test(m[1].trim())) r.error(`font-family "${m[1].trim()}". Use var(--uxt-font-aeonik), var(--uxt-font-manrope) or var(--uxt-font-besley) (${G} 5.5).`);
  for (const m of clean.matchAll(/font-size\s*:\s*([^;}]+)/g)) r.warn(`sets font-size (${m[1].trim()}). Text sizes come from the PART B classes; set a size only for a new kind of text the type table does not cover (${G} 5.5).`);
}

/* ---------- run ---------- */
const pages = walk(join(SRC, 'pages')).filter((f) => f.endsWith('.html'));
for (const f of pages) {
  const src = readFileSync(f, 'utf8');
  try { checkPage(relative(ROOT, f), expand(src, basename(f))); } catch (e) { report(relative(ROOT, f)).error(e.message); }
}
for (const f of walk(join(SRC, 'starters')).filter((x) => x.endsWith('.html'))) {
  try { checkPage(relative(ROOT, f), expand(readFileSync(f, 'utf8'), basename(f)), { starter: true }); } catch (e) { report(relative(ROOT, f)).error(e.message); }
}
for (const f of walk(join(SRC, 'css', 'parts')).filter((x) => x.endsWith('.css'))) checkPart(f);
const manifest = readFileSync(join(SRC, 'css', 'uxteam-site-additions.css'), 'utf8');
for (const f of walk(join(SRC, 'css', 'parts')).filter((x) => x.endsWith('.css'))) {
  if (!manifest.includes(`parts/${basename(f)}`)) report('src/css/uxteam-site-additions.css').error(`does not import parts/${basename(f)}.`);
}

/* 3. repo */
const repo = report('repo');
const sha = (p) => createHash('sha256').update(readFileSync(join(ROOT, p))).digest('hex');
for (const [p, h] of Object.entries(lock.files)) {
  if (!existsSync(join(ROOT, p))) repo.error(`${p} is missing.`);
  else if (sha(p) !== h) repo.error(`${p} differs from the version the developers handed over (${lock.received}). Never edit it; sync a new version as in ${G} 8.`);
}
const reg = JSON.parse(readFileSync(join(ROOT, 'docs', 'classes.json'), 'utf8'));
if (Object.keys(reg.allowed).sort().join() !== Object.keys(allowed).sort().join()) repo.error(`docs/classes.json is out of date. Run npm run classes.`);
for (const f of pages) {
  const built = join(ROOT, 'dist', 'wordpress', basename(f));
  if (!existsSync(built)) repo.error(`dist/wordpress/${basename(f)} is missing. Run npm run build.`);
  else if (readFileSync(built, 'utf8') !== expand(readFileSync(f, 'utf8'), basename(f)).trim() + '\n') repo.error(`dist/wordpress/${basename(f)} is out of date. Run npm run build.`);
}
for (const f of walk(join(SRC)).filter((x) => /\.(html|css)$/.test(x) && !/uxteam-site\.css$/.test(x))) {
  if (/(?:class="|\.)ux-[a-z]/.test(readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->|\/\*[\s\S]*?\*\//g, ''))) repo.error(`${relative(ROOT, f)} uses the old ux- system. It belongs in legacy/ only.`);
}

console.log(out.join('\n'));
console.log(`\n${pages.length} pages, ${addParts.length} new CSS parts: ${errors} errors, ${warnings} warnings.`);
if (errors) { console.log(`Fix every error before handing over. Rules: ${G}`); process.exit(1); }
