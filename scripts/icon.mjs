#!/usr/bin/env node
/**
 * Find a Phosphor icon by name, tag or category.
 *   npm run icon -- shield          (names and tags that contain "shield")
 *   npm run icon -- team people     (matches any of the words, best first)
 *   npm run icon -- figma --brands  (include brand logos, hidden by default)
 * Then use it in a page:  <!-- @icon <name> size="32" -->
 * Rules for which size and container: docs/GRAPHICS.md, family 2.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { icons, version } = JSON.parse(readFileSync(join(ROOT, 'assets/icons/phosphor/catalog.json'), 'utf8'));
const args = process.argv.slice(2);
const withBrands = args.includes('--brands');
const words = args.filter((w) => w !== '--brands').map((w) => w.toLowerCase()).filter(Boolean);
if (!words.length) {
  console.log('Usage: npm run icon -- <word> [more words]');
  process.exit(1);
}

// Brand logos (Slack, Figma, Microsoft Teams…) are not UI icons; hidden unless --brands.
const scored = icons
  .filter((i) => withBrands || !i.categories.includes('brands'))
  .map((i) => {
    let score = 0;
    const parts = i.name.split('-');
    for (const w of words) {
      const starts = (t) => t.split(/[\s-]+/).some((p) => p.startsWith(w));
      if (i.name === w) score += 10;
      else if (parts.includes(w)) score += 6;
      else if (parts.some((p) => p.startsWith(w))) score += 4;
      if (i.tags.includes(w)) score += 3;
      else if (i.tags.some(starts)) score += 1;
      if (i.categories.includes(w)) score += 1;
    }
    return { ...i, score };
  })
  .filter((i) => i.score > 0)
  .sort((a, b) => b.score - a.score || a.name.length - b.name.length)
  .slice(0, 25);

console.log(`Phosphor ${version}, Light. ${scored.length ? 'Best matches:' : 'No match. Try a plainer word or a synonym (growth: trend, chart; money: coins, currency).'}\n`);
for (const i of scored) console.log(`  ${i.name.padEnd(30)} ${i.tags.slice(0, 6).join(', ')}`);
if (scored.length) console.log(`\nUse: <!-- @icon ${scored[0].name} size="32" -->   File: assets/icons/phosphor/light/${scored[0].name}.svg`);
