/**
 * npm run share -- <page>      (for example: npm run share -- white-label)
 *
 * Makes ONE self-contained HTML file of a built preview page, to view or send:
 * dist/share/<page>.html. It opens offline in any browser or file viewer.
 *
 *  - Starts from dist/preview/<page>.html (run npm run build first), so it has
 *    the real header and the right booking card version (scripts/preview-shell.mjs).
 *  - Images: the live site's images are swapped for the repo's copies
 *    (assets/share, assets/logos, assets/images), embedded in the file. No
 *    request to new.ux.team is needed.
 *  - Trusted-by logos: each logo is set to its approved size inside its tile
 *    (Figma, logo marquee), because the repo's logo files are not the padded
 *    2x tiles the live site uses. Never let them scale freely.
 *  - CSS: only the rules this page uses, minified. Fonts (Manrope, Besley)
 *    embedded at the end of the file, so a viewer that reads only the start
 *    of a large file still shows every section.
 * Nothing here goes to WordPress. The page body for WordPress is dist/wordpress/.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const page = (process.argv[2] || '').replace(/\.html$/, '');
if (!page) { console.error('Usage: npm run share -- <page>   e.g. npm run share -- white-label'); process.exit(1); }
const src = join(ROOT, 'dist', 'preview', `${page}.html`);
if (!existsSync(src)) { console.error(`${src} not found. Run npm run build first.`); process.exit(1); }

const LIVE = 'https://new.ux.team/wp-content/uploads/';
/* Live image -> repo copy. Add a line when a page uses a new live image. */
const IMAGES = {
  '2026/10/homepage_banner_logo01_2x.webp': 'assets/logos/clients/slaps.svg',
  '2026/10/homepage_banner_logo02_2x.webp': 'assets/share/rbbi.webp',
  '2026/10/homepage_banner_logo03_2x.webp': 'assets/logos/clients/section.svg',
  '2026/10/homepage_banner_logo04_2x.webp': 'assets/logos/clients/dxlive.svg',
  '2026/10/homepage_banner_logo05_2x.webp': 'assets/logos/clients/fwd.svg',
  '2026/10/homepage_banner_logo06_2x.webp': 'assets/logos/clients/trescon.svg',
  '2026/10/homepage_banner_logo07_2x.webp': 'assets/share/squaircle.webp',
  '2026/10/homepage_banner_logo08_2x.webp': 'assets/share/terrapinn.webp',
  '2026/10/homepage_banner_logo09_2x.webp': 'assets/logos/clients/e2m-mark.svg',
  '2026/10/homepage_banner_logo10_2x.webp': 'assets/share/altadx.webp',
  '2026/10/homepage_banner_logo11_2x.webp': 'assets/share/atomicnorth.webp',
  '2026/10/Brent-Weaver-CEO-Founder-img1.webp': 'assets/share/brent-weaver.webp',
  '2026/10/chintan_bhatt_founder_uxteam-web.webp': 'assets/share/chintan-bhatt.webp',
  '2026/10/e2m-homepage.svg': 'assets/logos/clients/e2m.svg',
  '2026/10/sqc-homepage.svg': 'assets/share/squaircle.webp',
  '2026/10/section-homepage.svg': 'assets/logos/clients/section.svg',
  '2026/10/rbbi-homepage.svg': 'assets/share/rbbi.webp',
  '2026/10/UX-Team-Gray-logo.svg': 'assets/logos/uxteam-logo-footer.svg',
  '2026/10/UX-Team-bg-shape.svg': 'assets/images/footer-wordmark.svg',
};
/* Approved logo sizes in the 187 x 80 marquee tile, in the partial's order
   (Figma; same as legacy/src/sections/logo-marquee). Mobile tiles are 70%. */
const LOGO_SIZES = [[103, 20], [48, 48], [107, 36], [41, 35], [69, 24], [110, 24], [52, 52], [148, 24], [44, 44], [113, 27], [148, 22]];
const FONTS = [['Manrope', 'manrope', '400', 'normal'], ['Manrope', 'manrope', '500', 'normal'], ['Manrope', 'manrope', '600', 'normal'],
  ['Besley', 'besley', '400', 'normal'], ['Besley', 'besley', '500', 'normal'], ['Besley', 'besley', '700', 'normal']];

const b64 = (p) => readFileSync(join(ROOT, p)).toString('base64');
const mime = (p) => ({ svg: 'image/svg+xml', webp: 'image/webp', png: 'image/png' })[p.split('.').pop()];
let html = readFileSync(src, 'utf8');

// 1. images
const missing = new Set();
html = html.replace(/https:\/\/new\.ux\.team\/wp-content\/uploads\/([^"')\s]+\.(?:webp|svg|png|jpe?g))/g, (m, rel) => {
  const local = IMAGES[rel];
  if (!local) { missing.add(rel); return m; }
  return `data:${mime(local)};base64,${b64(local)}`;
});

// 2. CSS: inline, keep only rules this page uses, minify
let css = ['uxteam-site.css', 'uxteam-site-additions.css'].map((f) => readFileSync(join(ROOT, 'dist', 'css', f), 'utf8')).join('\n');
css = css.replace(/@import url\([^)]*\);/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
const classes = new Set(); for (const m of html.matchAll(/class="([^"]*)"/g)) m[1].split(/\s+/).forEach((c) => classes.add(c));
const ids = new Set([...html.matchAll(/id="([^"]*)"/g)].map((m) => m[1]));
const used = (sel) => { const s = sel.replace(/::?[a-z-]+(\([^)]*\))?/g, ''); return [...s.matchAll(/\.([\w-]+)/g)].every((m) => classes.has(m[1])) && [...s.matchAll(/#([\w-]+)/g)].every((m) => ids.has(m[1])); };
function purge(text) {
  const out = []; let i = 0;
  while (i < text.length) {
    const j = text.indexOf('{', i); if (j < 0) break;
    const head = text.slice(i, j).trim(); let d = 1, k = j + 1;
    while (d && k < text.length) { if (text[k] === '{') d++; else if (text[k] === '}') d--; k++; }
    const body = text.slice(j + 1, k - 1);
    if (/^@(media|supports)/.test(head)) { const inner = purge(body); if (inner) out.push(`${head}{${inner}}`); }
    else if (head.startsWith('@')) out.push(`${head}{${body}}`);
    else { const sels = head.split(',').map((s) => s.trim()).filter((s) => s && used(s)); if (sels.length) out.push(`${sels.join(',')}{${body.trim()}}`); }
    i = k;
  }
  return out.join('');
}
css = purge(css).replace(/\s+/g, ' ').replace(/\s*([{};,>])\s*/g, '$1').replace(/;}/g, '}');
const logoCss = LOGO_SIZES.map(([w, h], i) => `.uxt-home .uxt-logos .uxt-logo-item:nth-child(${i + 1}) img{width:${w}px!important;height:${h}px!important;max-width:none;max-height:none;object-fit:contain}`).join('')
  + '.uxt-home .uxt-logos .uxt-logo-item.uxt-logo-raw{padding:14px 22px;background:#fff}'
  + `@media (max-width:767px){${LOGO_SIZES.map(([w, h], i) => `.uxt-home .uxt-logos .uxt-logo-item:nth-child(${i + 1}) img{width:${Math.round(w * 0.7)}px!important;height:${Math.round(h * 0.7)}px!important}`).join('')}}`;
html = html.replace(/<link rel="stylesheet" href="\.\.\/css\/uxteam-site\.css">\s*<link rel="stylesheet" href="\.\.\/css\/uxteam-site-additions\.css">/, `<style>${css}${logoCss}</style>`);

// 3. fonts at the end
const faces = FONTS.map(([fam, dir, w, st]) => `@font-face{font-family:'${fam}';font-style:${st};font-weight:${w};font-display:swap;src:url(data:font/woff2;base64,${b64(`assets/fonts/${dir}/${dir}-latin-${w}-${st}.woff2`)}) format('woff2')}`).join('');
html = html.replace('</body>', `<style>${faces}</style>\n</body>`).replace(/<title>(.*?) \| UXTeam preview<\/title>/, '<title>$1 | UXTeam</title>');

mkdirSync(join(ROOT, 'dist', 'share'), { recursive: true });
const out = join(ROOT, 'dist', 'share', `${page}.html`);
writeFileSync(out, html);
console.log(`Wrote dist/share/${page}.html (${Math.round(html.length / 1024)} KB).`);
if (missing.size) console.log(`Not embedded (still load from new.ux.team; add them to IMAGES in scripts/share.mjs):\n  ${[...missing].join('\n  ')}`);
