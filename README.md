# UXTeam Website

Pages and styles for the UXTeam website (new.ux.team), built the way the live site is built. The live site runs on the Salient WordPress theme; this repo holds the developers' stylesheet and page bodies, and builds new pages that paste straight into WordPress with no clean up.

- Figma file: [UXTeam Website 2026](https://www.figma.com/design/9JQFLWC1KBelhUEaEZ6I1C) (Final Design Pages 1231:508)
- **Class and CSS rules (mandatory): [docs/CSS-GUIDE.md](docs/CSS-GUIDE.md)**
- Every class a page may use: [docs/CLASS-REGISTRY.md](docs/CLASS-REGISTRY.md)

> **Working with an AI tool (Claude, Codex, Cursor, Copilot)?** It must read [LLM.md](LLM.md) and [docs/CSS-GUIDE.md](docs/CSS-GUIDE.md) first. [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md) point tools there automatically.

---

## Quick start

You need [Node.js](https://nodejs.org) 18 or newer. Nothing else is installed.

```bash
npm run build     # builds dist/
npm run classes   # rebuilds the class registry (after any CSS change)
npm run check     # the mandatory check for pages and CSS (run after build)
npm run serve     # http://localhost:4321/preview/homepage.html
npm run dev       # build, check, then serve
```

## How the live site is put together

| On the site | In WordPress | In this repo |
|---|---|---|
| Header | Salient's header | not in the repo |
| Page body | one Raw HTML element | `src/pages/<page>.html` → `dist/wordpress/<page>.html` |
| Booking card and footer | footer global section | `src/global/footer-global.html` |
| CSS | Salient > Custom CSS (PART A to R) | `src/css/uxteam-site.css`, a byte for byte copy |
| New CSS | added after the last PART (now U) | `src/css/parts/` → `dist/css/uxteam-site-additions.css` |

## Folders

```
├── LLM.md, AGENTS.md, CLAUDE.md   Brief and rules for AI tools
├── CHANGELOG.md                   Every change, newest first
├── docs/                          CSS-GUIDE (mandatory), CLASS-REGISTRY (generated), BRAND-GUIDE, GRAPHICS, COMPONENTS, HOW-TO-ADD, WORDPRESS, FIGMA-MAP, OPEN-ITEMS
├── knowledge/                     Facts from the live ux.team site
├── skills/                        Page strategy and creative review, for any AI tool
├── reference/                     Screenshots of approved pages and graphics
├── assets/                        Icons (Phosphor and custom SVG), graphics, fonts, logos
├── src/
│   ├── css/uxteam-site.css        The developers' live CSS. Never edited
│   ├── css/parts/                 New PARTs, written the developers' way
│   ├── css/hooks.json             Classes needed by markup or scripts that have no CSS
│   ├── css/source.lock.json       Fingerprints of the developers' files
│   ├── pages/                     Page bodies (homepage and what-we-do are the developers')
│   ├── global/footer-global.html  Booking card and footer
│   ├── partials/sections/         Every section of the developers' pages, ready to copy
│   ├── partials/elements/         Button, heading, FAQ item, placeholder
│   └── starters/page.html         Start every new page here
├── scripts/                       build, classes, check, serve, icon
├── dist/
│   ├── wordpress/                 Paste-ready page bodies and the footer global section
│   ├── preview/                   Full pages to review in a browser
│   └── css/                       uxteam-site.css and uxteam-site-additions.css
└── legacy/                        The old ux- system, kept as a visual reference only
```

## Building a page

1. Copy `src/starters/page.html` to `src/pages/<page>.html` and set the wrapper: `<div class="uxt-home uxt-<key>">`.
2. Add sections with includes, then change only text, links and images:

   ```html
   <!-- @include partials/sections/process.html -->
   <!-- @include partials/elements/button.html type="primary" label="Book a Discovery Call" href="#book-call" -->
   ```

   Paths are relative to `src/`. `{{name|default}}` in a partial is filled from the attributes.
3. Need something no class covers? Write a new PART (CSS-GUIDE section 5), then `npm run classes`.
4. `npm run build && npm run check`, then review `dist/preview/<page>.html` at 1440, 768 and 375.
5. Hand over `dist/wordpress/<page>.html` and, if it has any, `dist/css/uxteam-site-additions.css` (CSS-GUIDE section 7).

## Naming (the developers' convention)

- `uxt-` prefix, lowercase, hyphens: `uxt-<block>-<part>` (`uxt-story-card`, `uxt-faq-item`).
- Page classes start with the page key: `uxt-wwd-cap`, `uxt-about-hero`.
- Variants are a second class (`uxt-case-card uxt-case-green`); states are `is-*` and `has-*`.
- No BEM, no camelCase. Full rules: CSS-GUIDE section 5.

## Docs

| File | Read it when |
|---|---|
| [LLM.md](LLM.md) | You (or an AI tool) plan, write, design or build anything |
| [docs/CSS-GUIDE.md](docs/CSS-GUIDE.md) | You write any markup or CSS (mandatory) |
| [docs/CLASS-REGISTRY.md](docs/CLASS-REGISTRY.md) | You need a class, or want to know where it works |
| [docs/COMPONENTS.md](docs/COMPONENTS.md) | You need a partial and its fields |
| [docs/HOW-TO-ADD.md](docs/HOW-TO-ADD.md) | You add a section, element or page (checklist) |
| [docs/WORDPRESS.md](docs/WORDPRESS.md) | You hand a page to the developers |
| [docs/BRAND-GUIDE.md](docs/BRAND-GUIDE.md) and [knowledge/](knowledge/uxteam-website-knowledge.txt) | You write copy |
| [docs/GRAPHICS.md](docs/GRAPHICS.md) | You choose or draw an icon or graphic |
| [docs/OPEN-ITEMS.md](docs/OPEN-ITEMS.md) | You want to know what is pending |
| [CHANGELOG.md](CHANGELOG.md) | You want to see what changed |
