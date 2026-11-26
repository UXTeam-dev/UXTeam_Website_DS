/**
 * node scripts/accept-live-css.mjs
 *
 * Accepts src/css/uxteam-site.css as the developers' current file: writes its
 * new fingerprint and today's date into src/css/source.lock.json (the sync
 * step in docs/CSS-GUIDE.md section 8). Run by the GitHub Action when the
 * WordPress plugin (tools/wordpress/uxteam-css-sync) sends the live CSS to
 * the wordpress-live branch; then npm run classes, build and check follow.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const lockPath = join(ROOT, 'src', 'css', 'source.lock.json');
const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
const file = 'src/css/uxteam-site.css';
const sha = createHash('sha256').update(readFileSync(join(ROOT, file))).digest('hex');
if (lock.files[file] === sha) {
  console.log(`${file} fingerprint already current.`);
} else {
  lock.files[file] = sha;
  lock.received = new Date().toISOString().slice(0, 10);
  writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
  console.log(`${file}: new fingerprint accepted (${lock.received}).`);
}
