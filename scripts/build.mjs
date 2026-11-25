#!/usr/bin/env node
/*
 * UXTeam website build (uxt- system).
 *
 *   src/pages/<page>.html        -> dist/wordpress/<page>.html   paste into one Salient "Raw HTML" element
 *                                -> dist/preview/<page>.html     full page for review (not for WordPress)
 *   src/global/footer-global.html-> dist/wordpress/footer-global.html (the footer global section)
 *   src/css/uxteam-site.css      -> dist/css/uxteam-site.css     copied byte for byte (the live Custom CSS)
 *   src/css/uxteam-site-additions.css + src/css/parts/*.css
 *                                -> dist/css/uxteam-site-additions.css (new PARTs, appended after PART R)
 *
 * Includes: <!-- @include partials/sections/faq.html key="value" -->
 *   Paths are relative to src/. {{key|default}} placeholders are filled from the
 *   attributes. The doc comment at the top of a partial is not copied into the output.
 *
 * The preview is the only place this build adds anything that is not in the
 * page: the site header and booking card version (scripts/preview-shell.mjs), the footer global section, the two stylesheets and
 * a stand-in FAQ script (the live site has its own). Nothing from the preview
 * shell goes to WordPress.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync, copyFileSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as shell from './preview-shell.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');
const LIVE = 'https://new.ux.team';

/* ---------- includes ---------- */
const INCLUDE = /<!--\s*@include\s+([^\s]+)((?:\s+[\w-]+="[^"]*")*)\s*-->/g;
const DOC_COMMENT = /^\s*<!--(?![\s\S]*?@include)[\s\S]*?-->\s*\n?/;

function parseAttrs(s) {
  const out = {};
  for (const m of s.matchAll(/([\w-]+)="([^"]*)"/g)) out[m[1]] = m[2];
  return out;
}

export function expand(html, from = 'page', depth = 0) {
  if (depth > 10) throw new Error(`Includes nested too deep near ${from}`);
  return html.replace(INCLUDE, (_, path, attrs) => {
    const file = join(SRC, path);
    if (!existsSync(file)) throw new Error(`${from}: @include ${path} not found`);
    const params = parseAttrs(attrs);
    let body = readFileSync(file, 'utf8').replace(DOC_COMMENT, '');
    body = body.replace(/\{\{([\w-]+)(?:\|([^}]*))?\}\}/g, (m, k, d) => {
      if (k in params) return params[k];
      if (d !== undefined) return d;
      throw new Error(`${from}: ${path} needs ${k}="…"`);
    });
    // empty modifier slots leave a trailing space inside class=""; tidy it
    body = body.replace(/class="([^"]*)"/g, (m, c) => `class="${c.replace(/\s+/g, ' ').trim()}"`);
    return expand(body, path, depth + 1).trimEnd();
  }).replace(/<!--\s*@icon\b[^>]*-->/g, (m) => icons(m));
}

/* ---------- icons ----------
 * <!-- @icon shield-check size="32" class="uxt-industry-icon" label="NDA" -->
 * Inlines assets/icons/phosphor/light/<name>.svg (or assets/icons/custom/<name>.svg
 * with set="custom"). The icon takes the text colour (currentColor). Without
 * label it is hidden from screen readers. Find names: npm run icon -- <word>.
 * Rules: docs/GRAPHICS.md, family 2. The class must be in the registry.
 */
export function icons(html) {
  return html.replace(/<!--\s*@icon\s+([a-z0-9-]+)((?:\s+[\w-]+="[^"]*")*)\s*-->/g, (_, name, attrs) => {
    const p = parseAttrs(attrs);
    const dir = p.set === 'custom' ? join(ROOT, 'assets', 'icons', 'custom') : join(ROOT, 'assets', 'icons', 'phosphor', 'light');
    const file = join(dir, `${name}.svg`);
    if (!existsSync(file)) throw new Error(`@icon "${name}" not found in ${dir.slice(ROOT.length + 1)}. Search with: npm run icon -- ${name}`);
    const size = p.size || '24';
    const a11y = p.label ? `role="img" aria-label="${p.label}"` : 'aria-hidden="true" focusable="false"';
    const cls = p.class ? ` class="${p.class}"` : '';
    return readFileSync(file, 'utf8').trim().replace(/<\?xml[^>]*>\s*/, '').replace('<svg ', `<svg${cls} width="${size}" height="${size}" ${a11y} `);
  });
}

/* ---------- additions css ---------- */
function additions() {
  const manifest = readFileSync(join(SRC, 'css', 'uxteam-site-additions.css'), 'utf8');
  return manifest.replace(/@import\s+["']([^"']+)["'];?/g, (_, p) => {
    const f = join(SRC, 'css', p);
    if (!existsSync(f)) throw new Error(`uxteam-site-additions.css imports ${p}, which does not exist`);
    return readFileSync(f, 'utf8').trim();
  });
}

/* ---------- preview shell ---------- */
const forPreview = (html) => html.replace(/(["'(])\/wp-content\//g, `$1${LIVE}/wp-content/`);

const STANDIN_JS = `<!-- PREVIEW ONLY: stand-in FAQ toggle. The live site uses its own global script. -->
<script>
document.querySelectorAll('.uxt-faq-question').forEach(function (b) {
  b.addEventListener('click', function () {
    var item = b.closest('.uxt-faq-item'), panel = document.getElementById(b.getAttribute('aria-controls'));
    var open = b.getAttribute('aria-expanded') === 'true';
    b.setAttribute('aria-expanded', String(!open));
    item.classList.toggle('is-expanded', !open);
    if (panel) { if (open) panel.setAttribute('inert', ''); else panel.removeAttribute('inert'); }
  });
});
</script>`;

function previewDoc(title, body, footer) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | UXTeam preview</title>
<link rel="stylesheet" href="../css/uxteam-site.css">
<link rel="stylesheet" href="../css/uxteam-site-additions.css">
<style>${shell.CSS}</style>
</head>
<body>
${shell.header(ROOT)}
${forPreview(body)}
${forPreview(footer)}
${STANDIN_JS}
${shell.JS}
</body>
</html>
`;
}

/* ---------- build ---------- */
export function build({ quiet = false } = {}) {
  rmSync(DIST, { recursive: true, force: true });
  for (const d of ['wordpress', 'preview', 'css']) mkdirSync(join(DIST, d), { recursive: true });

  copyFileSync(join(SRC, 'css', 'uxteam-site.css'), join(DIST, 'css', 'uxteam-site.css'));
  writeFileSync(join(DIST, 'css', 'uxteam-site-additions.css'), additions() + '\n');

  const footer = expand(readFileSync(join(SRC, 'global', 'footer-global.html'), 'utf8'), 'footer-global.html');
  writeFileSync(join(DIST, 'wordpress', 'footer-global.html'), footer.trim() + '\n');

  const pages = readdirSync(join(SRC, 'pages')).filter((f) => f.endsWith('.html'));
  for (const f of pages) {
    const body = expand(readFileSync(join(SRC, 'pages', f), 'utf8'), f).trim() + '\n';
    writeFileSync(join(DIST, 'wordpress', f), body);
    const title = basename(f, '.html').replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
    writeFileSync(join(DIST, 'preview', f), previewDoc(title, body, shell.footerFor(f, footer)));
  }

  // starters build too, so a broken include in a starter is caught early
  const starters = join(SRC, 'starters');
  if (existsSync(starters)) {
    mkdirSync(join(DIST, 'starters'), { recursive: true });
    for (const f of readdirSync(starters).filter((x) => x.endsWith('.html'))) {
      writeFileSync(join(DIST, 'starters', f), expand(readFileSync(join(starters, f), 'utf8'), f).trim() + '\n');
    }
  }
  if (!quiet) console.log(`Built ${pages.length} pages into dist/wordpress and dist/preview, plus dist/css.`);
  return pages;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) build();
