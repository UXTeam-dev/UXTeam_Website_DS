# New CSS parts

**Not used now.** New CSS goes straight into `../uxteam-site.css`, in a PART of ours (docs/CSS-GUIDE.md 5.2). This folder is only for a part the developers ask to receive as a separate file.

One file per new PART, written the way the developers write `uxteam-site.css`. Full rules: `docs/CSS-GUIDE.md` sections 5 and 6.

- File name: `part-<letter>-<scope>.css`, continuing the developers' letters after the last one in `uxteam-site.css` (now U), so V, W…
- Starts with the PART header comment (letter, name, Figma node, scope, markup file).
- Add it to `../uxteam-site-additions.css` with `@import "parts/part-<letter>-<scope>.css";`.
- Run `npm run classes` so the registry picks up the new classes, then `npm run check`.

Never edit `../uxteam-site.css` here. It is the developers' live file; a new version comes only from them (`docs/CSS-GUIDE.md` section 8).
