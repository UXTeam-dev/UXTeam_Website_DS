# How to add things

> AI agents: read [LLM.md](../LLM.md) first, and [CSS-GUIDE.md](CSS-GUIDE.md) before any markup or CSS. Both are mandatory.

Use this every time something new is designed in Figma. Reuse first, build new only when nothing fits.

## Before you build: reuse check

For each new section of a page, in this order:

1. **Understand the content and copy** first. What is the section trying to say? If the page has no content file, plan the copy from [BRAND-GUIDE.md](BRAND-GUIDE.md) and get it signed off.
2. **Find an existing section** in `src/partials/sections/` (list in [COMPONENTS.md](COMPONENTS.md) and LLM.md section 14). If one fits, copy it and change only text, links and images.
3. **Build it from existing classes** ([CLASS-REGISTRY.md](CLASS-REGISTRY.md)): PART B text, layout and button classes plus a homepage section's classes often cover a new layout.
4. **Add a new PART** only for what no class can carry.

Fonts, colours, spacing and the button never change. Only the composition can be new.

---

## Add a section or element

1. Write the markup in `src/partials/sections/<name>.html` (or `elements/<name>.html`). Start it with a doc comment: what it is, where it works (which wrapper), its fields as `{{key|default}}`. Use registry classes wherever they fit.
2. If it needs new styles, add `src/css/parts/part-<next letter>-<scope>.css`:

   ```css
   /* =====================================================================
      PART T | NUMBERS BAND  (Figma 2638:21550)
      HTML: src/partials/sections/numbers-band.html, inside
            <div class="uxt-home uxt-audit">
      Scope: .uxt-audit
      Reuses PART B text classes. This part adds only the band layout.
      ===================================================================== */

   .uxt-audit .uxt-audit-numbers {
       display: grid !important;
       grid-template-columns: repeat(4, 1fr) !important;
   }

   @media (max-width: 999px) {
       .uxt-audit .uxt-audit-numbers { grid-template-columns: repeat(2, 1fr) !important; }
   }
   ```

   Rules: CSS-GUIDE section 5 (naming, header, scope, colours, fonts, breakpoints).
3. Import it in `src/css/uxteam-site-additions.css`: `@import "parts/part-t-audit.css";`
4. `npm run classes` (adds the new classes to the registry).
5. Do the "Finish" steps below.

## Add a page

1. Copy `src/starters/page.html` to `src/pages/<page-name>.html`.
2. Set the header comment (page name, Figma frame) and the wrapper `<div class="uxt-home uxt-<key>">`.
3. Fill it with section includes (`<!-- @include partials/sections/… -->`). No header, booking card or footer: they are global.
4. Images go in the WordPress media library; use `/wp-content/uploads/<year>/<month>/<file>` paths and list new ones for the developers. Missing client images are placeholders (`partials/elements/placeholder.html`).
5. Do the "Finish" steps below.

## Sync a new version from the developers

CSS-GUIDE section 8: replace the file, update `src/css/source.lock.json`, remove parts that are now live, rebuild.

---

## Finish (every time)

- [ ] `npm run classes` (if CSS changed), `npm run build` and `npm run check` run with no errors. Warnings are fixed or explained.
- [ ] Checked `dist/preview/<page>.html` at 1440, 768 and 375 against Figma. No sideways scroll.
- [ ] Hover, focus and keyboard work. Motion respects reduced motion.
- [ ] Listed in [COMPONENTS.md](COMPONENTS.md) and [FIGMA-MAP.md](FIGMA-MAP.md).
- [ ] Placeholder copy, images or pending items noted in [OPEN-ITEMS.md](OPEN-ITEMS.md).
- [ ] Entry added to `CHANGELOG.md`, naming any new PART for the handover.
- [ ] Committed and pushed to GitHub, with a message that names the Figma node.
