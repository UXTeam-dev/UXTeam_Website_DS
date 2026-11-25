#!/usr/bin/env node
/**
 * Bundle one built page into a single self-contained HTML file: the CSS and
 * JS are inlined, and every font, image and icon it uses becomes a data URI.
 * Use it to share a page as one file (email, preview, review in a browser).
 *
 *   npm run build
 *   npm run bundle -- demos/ux-audit.html            -> bundles/ux-audit.html
 *   npm run bundle -- pages/index.html out/home.html
 *
 * Only fonts that the CSS actually references are embedded. Unused CSS is
 * kept (the design system CSS is small). The bundle is a snapshot: rebuild
 * and bundle again after any change.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const [input, outArg] = process.argv.slice(2);
if (!input) {
  console.log('Usage: npm run bundle -- <path inside dist, e.g. demos/ux-audit.html> [output file]');
  process.exit(1);
}
const pagePath = join(DIST, input);
if (!existsSync(pagePath)) {
  console.error(`${pagePath} not found. Run npm run build first.`);
  process.exit(1);
}

const MIME = {
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon',
};
const cache = new Map();
let missing = 0;
function dataUri(file) {
  if (cache.has(file)) return cache.get(file);
  if (!existsSync(file)) {
    if (!cache.has(`missing:${file}`)) { console.warn(`  not found, left out: ${file.replace(ROOT + '/', '')}`); missing += 1; }
    cache.set(`missing:${file}`, null);
    return null;
  }
  const type = MIME[extname(file).toLowerCase()] || 'application/octet-stream';
  const uri = `data:${type};base64,${readFileSync(file).toString('base64')}`;
  cache.set(file, uri);
  return uri;
}
const isLocal = (url) => url && !/^(data:|https?:|mailto:|tel:|#|\/\/)/i.test(url);

const pageDir = dirname(pagePath);
let html = readFileSync(pagePath, 'utf8');

// 1. Stylesheets: inline, with url() resolved against the CSS file
html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (tag, href) => {
  if (!isLocal(href)) return tag;
  const cssPath = resolve(pageDir, href);
  const css = readFileSync(cssPath, 'utf8').replace(/url\((['"]?)([^'")]+)\1\)/g, (m, q, url) => {
    if (!isLocal(url)) return m;
    const uri = dataUri(resolve(dirname(cssPath), url.split(/[?#]/)[0]));
    return uri ? `url("${uri}")` : m;
  });
  // A font file that is not in the repo (Aeonik, licensed): drop its url() so
  // the browser does not request a missing file; local() still applies.
  const cleaned = css.replace(/,\s*url\((['"]?)\.\.?\/[^'")]+\.woff2?\1\)\s*format\([^)]*\)/g, '');
  return `<style>\n${cleaned}\n</style>`;
});

// 2. Font preloads are not needed once fonts are inlined
html = html.replace(/<link\b[^>]*rel="preload"[^>]*>\n?/g, '');

// 3. Scripts: inline
html = html.replace(/<script\b([^>]*)src="([^"]+)"([^>]*)><\/script>/g, (tag, a, src) => {
  if (!isLocal(src)) return tag;
  const js = readFileSync(resolve(pageDir, src), 'utf8').replace(/<\/script/gi, '<\\/script');
  return `<script>\n${js}\n</script>`;
});

// 4. Images and other src attributes
html = html.replace(/(<(?:img|source|video|audio)\b[^>]*?\s)(src|poster)="([^"]+)"/g, (m, pre, attr, url) => {
  if (!isLocal(url)) return m;
  const uri = dataUri(resolve(pageDir, url.split(/[?#]/)[0]));
  return uri ? `${pre}${attr}="${uri}"` : m;
});
html = html.replace(/\ssrcset="([^"]+)"/g, (m, set) => {
  const parts = set.split(',').map((p) => {
    const [url, size] = p.trim().split(/\s+/);
    if (!isLocal(url)) return p.trim();
    const uri = dataUri(resolve(pageDir, url));
    return uri ? `${uri}${size ? ` ${size}` : ''}` : p.trim();
  });
  return ` srcset="${parts.join(', ')}"`;
});

// 5. Inline style url() (for example background images set in markup)
html = html.replace(/url\((['"]?)(\.\.?\/[^'")]+)\1\)/g, (m, q, url) => {
  const uri = dataUri(resolve(pageDir, url));
  return uri ? `url("${uri}")` : m;
});

const out = outArg ? resolve(outArg) : join(ROOT, 'bundles', basename(input));
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
const kb = Math.round(Buffer.byteLength(html) / 1024);
const inlined = [...cache.values()].filter(Boolean).length;
console.log(`Bundled ${input} -> ${out.replace(ROOT + '/', '')} (${kb} KB, ${inlined} assets inlined${missing ? `, ${missing} not found` : ''})`);
if (missing) console.log('Files not found are left out. Aeonik is licensed and not in the repo yet (docs/OPEN-ITEMS.md): the page uses Aeonik if it is installed on the computer, otherwise a fallback font.');
