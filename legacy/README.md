# Legacy: the old ux- system

This folder holds the repo's first design system (BEM `ux-` classes, tokens, its own CSS and JS), built before the developers shared the live site's stylesheet. **It is not used for new pages.** New pages use the developers' `uxt-` system: see `../docs/CSS-GUIDE.md`.

It is kept because it still holds approved designs that have no `uxt-` version yet (listing and detail pages, About, the graphics kit, the UX Audit demo). Use it as a visual reference only; never copy its classes or CSS into `src/`. `npm run check` fails if a `ux-` class appears outside this folder.

```bash
npm run legacy:build    # builds legacy/dist from legacy/src
npm run legacy:check
npm run legacy:bundle -- demos/ux-audit.html
```

Shared assets (icons, graphics, fonts, logos) stay in `../assets/`. The old component field list is `docs/COMPONENTS.md` here.
