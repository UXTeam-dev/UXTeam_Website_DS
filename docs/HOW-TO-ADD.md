# How to add things

> AI agents: read [LLM.md](../LLM.md) first. It is the full brief, and its section 0 sets the order of work.

Use this every time something new is designed in Figma. Reuse first, build new only when nothing fits.

## Before you build: reuse check

For each new section of a page, in this order:

1. **Understand the content and copy** first. What is the section trying to say? If the page has no content file, plan the copy from [BRAND-GUIDE.md](BRAND-GUIDE.md) and get it signed off.
2. **Find an existing section** that fits it (see the library page and [COMPONENTS.md](COMPONENTS.md)). If one fits, use it as is.
3. **Adapt an existing section** with a modifier class if it is close.
4. **Build a new one** only if neither works: first the composition of elements, then the section design, using existing tokens and components.

Fonts, colors, spacing and components never change. Only the composition can be new.

---

## Add a component

A component is a small part used inside sections: a button, a card, a FAQ item.

1. Create `src/components/<name>/`.
2. Add `<name>.css`. Start it with a header comment:
   ```css
   /* ==========================================================================
      Pricing card (Figma 1234:567, Assets & Components)
      One line on what it is, where it is used, its sizes and states.
      ========================================================================== */
   ```
3. Use only tokens (`var(--ux-…)`) for colors, type and spacing. If a value is new and will be reused, add it to `src/tokens/tokens.json` first.
4. Class names: `ux-<name>`, `ux-<name>__part`, `ux-<name>--variant`.
5. If it is used more than once with different content, add a partial `_<name>.html` with `{{param|default}}` placeholders and a header comment listing the parameters.
6. If it needs behaviour, add `<name>.js`:
   ```js
   UXTeam.register('pricing-card', function () {
     document.querySelectorAll('[data-ux-pricing]').forEach(function (el) { /* … */ });
   });
   ```
   Then add the path to `src/js/manifest.json`.
7. Add `@import url("components/<name>/<name>.css");` to `src/uxteam.css` in the components block.
8. Add a demo block to `src/library/index.html`.
9. Do the "Finish" steps below.

## Add a section

A section is a full width block of a page: a hero, a services band, the footer.

Same steps as a component, but in `src/sections/<name>/`, and import it in the sections block of `src/uxteam.css`. Inside, use `ux-container` for the 1200 content width and the section padding classes:

```html
<section class="ux-section ux-section--pt-100 ux-section--pb-120" aria-labelledby="x-title">
  <div class="ux-container">
    <header class="ux-section-header">
      <span class="ux-eyebrow">Eyebrow</span>
      <h2 class="ux-h2 ux-section-header__title" id="x-title">Short H2</h2>
    </header>
    <!-- content -->
  </div>
</section>
```

Add tablet and mobile rules at the bottom of the CSS file inside `@media (max-width: 1199px)` and `@media (max-width: 767px)`.

## Add a page

1. Copy the closest starter from `src/starters/` to `src/pages/<page-name>.html` (hub, dark hero, light hero or detail page). Keep its `ux-page-type` comment correct: it tells `npm run check` which hero and booking card the page must use (LLM.md 15.5).
2. The header comment names the Figma frame and its tablet and mobile frames.
3. Include `templates/_head.html` with a `title` and `description`, then the header, sections, booking card (if the page has one) and footer, then `templates/_scripts.html`.
4. Put new images in `assets/images/<page or group>/` as WebP. Logos stay PNG or SVG.
5. Add a link to the page in `src/index.html`.
6. Do the "Finish" steps below.

## Change a token

Edit `src/tokens/tokens.json`, then run `npm run build`. Never edit `tokens.css` by hand. Responsive values are arrays: `[desktop, tablet, mobile]`.

---

## Finish (every time)

- [ ] `npm run build` runs without errors.
- [ ] `npm run check` reports no errors. Warnings are fixed or explained.
- [ ] Checked in the browser at 1440, 768 and 375 against Figma. No sideways scroll.
- [ ] Hover, focus and keyboard work. Motion respects reduced motion.
- [ ] Added to `src/library/index.html`.
- [ ] Listed in [COMPONENTS.md](COMPONENTS.md) and [FIGMA-MAP.md](FIGMA-MAP.md).
- [ ] Any placeholder copy or pending item noted in [OPEN-ITEMS.md](OPEN-ITEMS.md).
- [ ] Entry added to `CHANGELOG.md`.
- [ ] Committed and pushed to GitHub, with a message that names the Figma node.
