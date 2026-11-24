# UXTeam Website Design System

The coded version of the **UXTeam Website 2026** Figma file. It holds the design tokens, components, sections and finished pages. Everything is plain **HTML, CSS and JavaScript**: no framework and no dependencies, so it moves straight into WordPress.

- Figma file: [UXTeam Website 2026](https://www.figma.com/design/9JQFLWC1KBelhUEaEZ6I1C)
- Sources used: **Final Design Pages** (1231:508) and **Assets & Components** (1231:897)
- Rules followed: **Design System Guideline** (2351:577)

---

## Quick start

You need [Node.js](https://nodejs.org) 18 or newer. Nothing else is installed.

```bash
npm run build     # builds everything into dist/
npm run serve     # opens dist/ at http://localhost:4321
npm run dev       # build, then serve
```

Then open:

| URL | What it is |
|---|---|
| `http://localhost:4321/` | Start page with links to everything |
| `/library/` | Component library: tokens, components and sections |
| `/pages/index.html` | Homepage (desktop, tablet, mobile) |
| `/pages/success-stories.html` | Success Stories listing (desktop, tablet, mobile) |
| `/pages/success-story-squaircle.html` | Success Story detail (desktop, tablet, mobile) |
| `/pages/insights.html` | Insights listing |
| `/pages/insight-content-strategy.html` | Insights detail (article) |
| `/pages/about.html` | About Us |

> **Developers:** take the files in `dist/`. They are complete, ready pages with one CSS file and one JS file.

---

## How it is organised

The system is built in layers. Each layer only uses the layers above it.

```
tokens  →  base  →  components  →  sections  →  pages
(values)   (reset,   (small parts:  (full width   (sections
            type,     button, card,  blocks:       put in
            grid)     FAQ item)      hero, footer) order)
```

```
UXTeam_Website_DS/
├── README.md               You are here
├── package.json            npm run build / serve / dev
├── docs/                   How to work with the system (start with HOW-TO-ADD.md)
├── knowledge/              uxteam-website-knowledge.txt: everything the live ux.team site says
├── scripts/
│   ├── build.mjs           Builds dist/ (tokens, CSS, JS, HTML includes, assets)
│   └── serve.mjs           Tiny local server for dist/
├── assets/                 Shared files used by every page
│   ├── fonts/              Aeonik (licensed, add files), Manrope, Besley
│   ├── icons/              SVG and PNG icons
│   ├── images/             WebP photos and covers, grouped by page or use
│   └── logos/              UXTeam logos and clients/ logos
├── src/
│   ├── tokens/
│   │   ├── tokens.json     ★ Single source of truth for colors, type, spacing
│   │   └── tokens.css      Generated from tokens.json. Do not edit
│   ├── base/               Fonts, reset, typography classes, layout and grid
│   ├── components/         One folder per component (CSS, JS, HTML partials)
│   ├── sections/           One folder per section (CSS, JS, HTML partials)
│   ├── templates/          <head> and <script> partials shared by all pages
│   ├── pages/              The pages, built from includes
│   ├── library/            The component library page
│   ├── js/
│   │   ├── core.js         Tiny loader: UXTeam.register(name, init)
│   │   └── manifest.json   Order in which JS files are bundled
│   ├── uxteam.css          Lists every CSS file in order (@import)
│   └── index.html          Start page of dist/
└── dist/                   Build output. Generated, do not edit
```

### Inside a component or section folder

```
src/components/faq/
├── faq.css        Styles. The header comment says what it is and its Figma node
├── faq.js         Behaviour (only if it needs any)
├── faq.html       Ready demo markup you can copy
└── _item.html     Partial (starts with _) that pages include with parameters
```

---

## Building a page with includes

Pages are short because they include partials. The build replaces each include with the partial's HTML.

```html
<!-- @include sections/site-header/site-header.html theme="light" cta="ux-btn--primary" -->

<!-- @include components/story-card/_story-card.html
     logo="rbbi.png" logo-w="57" logo-h="57" logo-alt="RBBi"
     title="Helping a Creative Agency Scale Design Delivery"
     meta="Digital Experience Agency" place="Dubai" -->
```

- Paths are relative to `src/`.
- Inside a partial, `{{name}}` is replaced by the value you pass, and `{{name|default}}` falls back to `default`.
- Partials can include other partials.

Full parameter lists for every partial are in [docs/COMPONENTS.md](docs/COMPONENTS.md).

---

## Naming

- Every class starts with `ux-` so nothing clashes with WordPress themes or plugins.
- BEM style: `ux-block`, `ux-block__part`, `ux-block--variant`. State classes: `is-open`, `is-active`, `is-visible`.
- Every token is a CSS variable starting with `--ux-`, for example `var(--ux-navy)`, `var(--ux-fs-h2)`.
- JS hooks use `data-ux-*` attributes, never style classes.

## Responsive

| Breakpoint | Width | Design frame | Side margin |
|---|---|---|---|
| Desktop | 1200 and up | 1440 | 120 (content 1200) |
| Tablet | 768 to 1199 | 768 | 30 |
| Mobile | up to 767 | 375 | 15 |

Font sizes and the page margin change automatically through the tokens. Section specific changes sit at the bottom of each section's CSS.

---

## Docs

| File | Read it when |
|---|---|
| [knowledge/uxteam-website-knowledge.txt](knowledge/uxteam-website-knowledge.txt) | You need facts for a page: company details, services, clients, success stories, testimonials, FAQs, numbers (collected from the live ux.team site) |
| [docs/BRAND-GUIDE.md](docs/BRAND-GUIDE.md) | You write or plan copy for a page, especially one with no content file (positioning, audience, offer, voice, page rules, claims) |
| [docs/HOW-TO-ADD.md](docs/HOW-TO-ADD.md) | You add a component, section or page (step by step checklist) |
| [docs/DESIGN-RULES.md](docs/DESIGN-RULES.md) | You design or build anything new (the Guideline rules in code terms) |
| [docs/COMPONENTS.md](docs/COMPONENTS.md) | You need a partial's parameters or a class name |
| [docs/FIGMA-MAP.md](docs/FIGMA-MAP.md) | You want to find the Figma node behind a file, or the file behind a node |
| [docs/WORDPRESS.md](docs/WORDPRESS.md) | You move pages into WordPress |
| [docs/OPEN-ITEMS.md](docs/OPEN-ITEMS.md) | You want to know what is still a placeholder or pending |
| [CHANGELOG.md](CHANGELOG.md) | You want to see what changed and when |

## The one rule for keeping this repo alive

**Every new section or element designed in Figma is added here, in the same change.** Build it as a component or section folder, add it to the library page, list it in `docs/COMPONENTS.md` and `docs/FIGMA-MAP.md`, note it in `CHANGELOG.md`, then commit and push. The checklist is in [docs/HOW-TO-ADD.md](docs/HOW-TO-ADD.md).
