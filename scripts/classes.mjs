#!/usr/bin/env node
/*
 * Builds the class registry: every class a page may use, and where it comes from.
 *
 *   reads   src/css/uxteam-site.css            the developers' live Custom CSS (PART A to R)
 *           src/css/parts/*.css                new PARTs written in this repo
 *           src/css/hooks.json                 classes the markup or scripts need that have no CSS
 *           src/pages, src/partials, src/global  to show where each class is used
 *   writes  docs/classes.json                  read by scripts/check.mjs
 *           docs/CLASS-REGISTRY.md             the human list (do not edit by hand)
 *
 * PART A is the old Salient CSS. Its classes are listed as "not allowed" so a
 * page can never pick them up, unless a later PART also styles them.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));

/* Split the developers' file into PARTs using their header blocks. */
function splitParts(css) {
  const lines = css.split(/\r?\n/);
  const heads = [];
  lines.forEach((l, i) => {
    const m = l.match(/^ {3}PART ([A-Z])(?:\s{2,}|\s*\|\s*)(.+)$/);
    if (m && i > 0 && /^\/\* =+/.test(lines[i - 1])) heads.push({ letter: m[1], title: m[2].trim(), line: i });
  });
  return heads.map((h, k) => ({
    ...h,
    css: lines.slice(h.line - 1, k + 1 < heads.length ? heads[k + 1].line - 1 : lines.length).join('\n'),
  }));
}

/* Every selector (and @media prelude) in a stylesheet. */
function selectors(css) {
  const clean = stripComments(css).replace(/url\([^)]*\)/g, 'url()').replace(/"[^"]*"|'[^']*'/g, '""');
  const out = [];
  let buf = '';
  let depth = 0;
  for (const ch of clean) {
    if (ch === '{') { out.push({ sel: buf.trim(), depth }); buf = ''; depth += 1; }
    else if (ch === '}') { buf = ''; depth = Math.max(0, depth - 1); }
    else if (ch === ';') { buf = ''; }
    else buf += ch;
  }
  return out.filter((s) => s.sel && !s.sel.startsWith('@'));
}

const CLASS_RE = /\.(-?[a-zA-Z_][\w-]*)/g;

function collect(css, source, into) {
  for (const { sel } of selectors(css)) {
    for (const one of sel.split(',')) {
      const s = one.trim();
      const classes = [...s.matchAll(CLASS_RE)].map((m) => m[1]);
      classes.forEach((c, i) => {
        const r = (into[c] ??= { sources: new Set(), selectors: [], leads: false, within: {} });
        r.sources.add(source);
        if (r.selectors.length < 3 && !r.selectors.includes(s)) r.selectors.push(s);
        // "leads": the class starts a selector, so it works without a wrapper
        const firstCompound = s.split(/[\s>+~]+/)[0];
        if (firstCompound.includes(`.${c}`)) r.leads = true;
        else {
          const lead = [...firstCompound.matchAll(CLASS_RE)][0]?.[1];
          if (lead) r.within[lead] = (r.within[lead] || 0) + 1;
        }
      });
    }
  }
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

export function buildRegistry() {
  const site = readFileSync(join(SRC, 'css', 'uxteam-site.css'), 'utf8');
  const parts = splitParts(site);
  const reg = {};
  const partA = {};
  for (const p of parts) collect(p.css, `PART ${p.letter}`, p.letter === 'A' ? partA : reg);

  const additions = walk(join(SRC, 'css', 'parts')).filter((f) => f.endsWith('.css'));
  const addParts = [];
  for (const f of additions) {
    const css = readFileSync(f, 'utf8');
    const m = css.match(/PART ([A-Z]{1,2})\s*\|\s*([^\n]+)/);
    const label = m ? `PART ${m[1]} (new)` : `${relative(ROOT, f)} (new)`;
    addParts.push({ file: relative(ROOT, f), label, title: m ? m[2].trim() : '' });
    collect(css, label, reg);
  }

  const hooksFile = join(SRC, 'css', 'hooks.json');
  const hookData = existsSync(hooksFile) ? JSON.parse(readFileSync(hooksFile, 'utf8')) : {};
  const hooks = hookData.hooks || {};
  const developerNames = hookData.developerNames || {};

  // where each class is used
  const used = {};
  const markup = [...walk(join(SRC, 'pages')), ...walk(join(SRC, 'partials')), ...walk(join(SRC, 'global')), ...walk(join(SRC, 'starters'))].filter((f) => f.endsWith('.html'));
  for (const f of markup) {
    const t = readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    for (const m of t.matchAll(/class="([^"]*)"/g)) for (const c of m[1].split(/\s+/).filter(Boolean)) {
      if (/[{}[\]]/.test(c)) continue; // placeholders in starters and partials
      (used[c] ??= new Set()).add(relative(SRC, f));
    }
  }

  // Page markup may use uxt- classes, is-/has- states, and the few unprefixed
  // names the developers chose (developerNames). Any other class a PART styles
  // belongs to Salient's own elements (nectar-*, wpb_*): "theme", not for pages.
  const allowed = {};
  const theme = {};
  for (const [c, r] of Object.entries(reg)) {
    // scopes: every wrapper the class is styled under. "global" when a selector starts with it.
    const scopes = r.leads ? [] : Object.entries(r.within).sort((a, b) => b[1] - a[1]).map(([k]) => `.${k}`);
    const preferred = scopes.includes('.uxt-home') ? '.uxt-home' : scopes[0];
    const entry = { kind: 'styled', sources: [...r.sources], scope: preferred || 'global', scopes, example: r.selectors[0], usedIn: [...(used[c] || [])].sort() };
    if (c.startsWith('uxt-') || /^(is|has)-/.test(c) || c in developerNames) allowed[c] = entry;
    else theme[c] = { ...entry, kind: 'theme' };
  }
  for (const [c, why] of Object.entries(hooks)) {
    if (!allowed[c]) allowed[c] = { kind: 'hook', sources: ['src/css/hooks.json'], scope: 'n/a', example: why, usedIn: [...(used[c] || [])].sort() };
  }
  const notAllowed = Object.keys(partA).filter((c) => !allowed[c] && !theme[c]).sort();

  for (const c of Object.keys(theme)) if (allowed[c]) delete theme[c];
  return { parts, addParts, allowed, notAllowed, hooks, theme, developerNames };
}

/* ---------- write ---------- */
function main() {
  const { parts, addParts, allowed, notAllowed, hooks, theme, developerNames } = buildRegistry();
  const names = Object.keys(allowed).sort();
  writeFileSync(join(ROOT, 'docs', 'classes.json'), JSON.stringify({
    note: 'Generated by npm run classes. Do not edit. Source: src/css/uxteam-site.css, src/css/parts, src/css/hooks.json.',
    allowed,
    theme: Object.fromEntries(Object.entries(theme).map(([c, r]) => [c, { sources: r.sources }])),
    notAllowed,
  }, null, 1) + '\n');

  const byPart = {};
  for (const c of names) for (const s of allowed[c].sources) (byPart[s] ??= []).push(c);
  const titles = Object.fromEntries(parts.map((p) => [`PART ${p.letter}`, p.title]));
  for (const a of addParts) titles[a.label] = `${a.title} (${a.file})`;

  const row = (c) => {
    const r = allowed[c];
    if (!r) return '';
    const used = r.usedIn.length ? r.usedIn.slice(0, 3).join(', ') + (r.usedIn.length > 3 ? ` +${r.usedIn.length - 3}` : '') : 'not used yet';
    return `| \`${c}\` | ${r.scope === 'global' ? 'anywhere' : `inside \`${r.scope}\``} | ${used} |`;
  };

  let md = `# Class registry

Generated by \`npm run classes\` from the developers' stylesheet. **Do not edit this file by hand.**

A page may use only the classes listed here (plus \`is-*\` and \`has-*\` state classes that a PART styles). \`npm run check\` fails on anything else. How to use them and how to add new ones: [CSS-GUIDE.md](CSS-GUIDE.md).

- ${names.filter((c) => allowed[c].kind === 'styled').length} styled classes and ${Object.keys(hooks).length} hooks you may use. Not for page markup: ${Object.keys(theme).length} Salient element classes that some PARTs restyle, and ${notAllowed.length} old Salient classes from PART A.
- "Works" says where the CSS applies. "inside \`.uxt-home\`" means the class only has an effect inside the page wrapper \`<div class="uxt-home …">\`.
- Source of truth: \`src/css/uxteam-site.css\` (the live Salient Custom CSS, PART A to R) and new PARTs in \`src/css/parts/\`.

`;
  const order = Object.keys(byPart).sort((a, b) => (a.length - b.length) || a.localeCompare(b));
  for (const p of order) {
    md += `## ${p}: ${titles[p] || ''}\n\n| Class | Works | Used in |\n|---|---|---|\n${byPart[p].map(row).join('\n')}\n\n`;
  }
  md += `## Hooks (no CSS, needed by markup or scripts)\n\n| Class | Why |\n|---|---|\n${Object.entries(hooks).map(([c, w]) => `| \`${c}\` | ${w} |`).join('\n')}\n\n`;
  md += `## Unprefixed names the developers chose\n\nAllowed because the developers' own markup uses them. New classes always start with \`uxt-\`.\n\n${Object.entries(developerNames).map(([c, w]) => `- \`${c}\`: ${w}`).join('\n')}\n\n`;
  md += `## Not for page markup: Salient element classes\n\nPARTs I, J, K and O restyle Salient's own elements (buttons, sub-titles, rows, the header). Those classes are added by Salient and WPBakery, never typed into a Raw HTML page body.\n\n${Object.keys(theme).sort().map((c) => `\`${c}\``).join(' ')}\n\n`;
  md += `## Not allowed: old Salient CSS (PART A only)\n\nThese come from the theme's old Custom CSS. They are kept so old pages still render, but new pages must never use them. Use the PART B classes instead (for example \`uxt-h2\`, not \`heading-2\`; \`uxt-p\`, not \`font-18\`).\n\n${notAllowed.map((c) => `\`${c}\``).join(' ')}\n`;
  writeFileSync(join(ROOT, 'docs', 'CLASS-REGISTRY.md'), md);
  console.log(`Registry: ${names.length} allowed classes, ${notAllowed.length} not allowed. Wrote docs/classes.json and docs/CLASS-REGISTRY.md.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
