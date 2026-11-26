# UXTeam Website

This is where the pages of the UXTeam website (new.ux.team) are designed, built and checked before they go live.

A repo (short for repository) is a shared folder of files that keeps a full history of every change.

The live site runs on WordPress with the Salient theme. This repo holds a copy of the site's styles and page code, the rules for building new pages, and the brand and content material that pages are written from. When a page is ready here, the developers paste it into WordPress as it is.

You don't need to install anything or know how to code to look around. Start with the sections below.

---

## See the pages

| What you want to see | Where |
|---|---|
| The live site | [new.ux.team](https://new.ux.team) |
| The approved designs, as images | [reference/pages/](reference/pages/) (click any file to view it) |
| Every graphic and illustration, as images | [reference/graphics/](reference/graphics/) |
| The original designs | [Figma file: UXTeam Website 2026](https://www.figma.com/design/9JQFLWC1KBelhUEaEZ6I1C) (needs Figma access) |
| A built page from this repo | [confirm: preview links go here once GitHub Pages is turned on]. Until then, a developer can open them (see "For developers" below) |

## Page status

| Page | Status | See it |
|---|---|---|
| Homepage | Live, built by the developers | [new.ux.team](https://new.ux.team) · [approved design](reference/pages/homepage-desktop.webp) |
| What we do | Live, built by the developers | [new.ux.team/what-we-do](https://new.ux.team/what-we-do/) |
| About us | Its styles are live. Its page code is still to come from the developers [confirm] | [approved design](reference/pages/about-desktop.webp) |
| White label | Built, waiting for review and launch [confirm] | [Shareable preview](dist/share/white-label.html) (on that page, click **Download raw file**, then open it in your browser) |
| B2B SaaS and AI industry page | Planned | No approved screenshot in the repo yet |
| Success stories (listing and detail) | Designed, to be rebuilt in the current system | [listing](reference/pages/success-stories-desktop.webp) · [detail](reference/pages/success-story-detail-desktop.webp) |
| Insights (listing and detail) | Designed, to be rebuilt in the current system | [listing](reference/pages/insights-desktop.webp) · [detail](reference/pages/insights-detail-desktop.webp) |

[confirm the status of each page]. What is still pending or waiting for a file: [docs/OPEN-ITEMS.md](docs/OPEN-ITEMS.md).

## What's in this repo

| Folder or file | What it is | Who it's for |
|---|---|---|
| [docs/](docs/) | Guides: brand, graphics, building pages, handover to WordPress. Its README says which guide is for whom | Everyone |
| [knowledge/](knowledge/) | Every fact the current ux.team site says: services, clients, success stories, testimonials, FAQs | Copywriters, marketing |
| [reference/](reference/) | Screenshots of approved designs and graphics, to compare built pages against | Designers, reviewers |
| [assets/](assets/) | Icons, illustrations, photos, client logos and fonts | Designers, developers |
| [src/](src/) | The page code and styles that get edited | Developers |
| [dist/](dist/) | Created automatically from `src/` by the build. Never edited by hand. It holds the files for WordPress and the page previews | Developers |
| [scripts/](scripts/) | The tools that build and check the pages | Developers |
| [tools/](tools/) | A WordPress plugin that sends every CSS change made in WordPress to this repo. Setup: [docs/WORDPRESS-CSS-SYNC.md](docs/WORDPRESS-CSS-SYNC.md) | Site admin |
| [skills/](skills/) | Step-by-step methods for planning and reviewing a page | AI tools, people planning a page |
| [legacy/](legacy/) | The repo's first, older system. Kept only as a visual reference | Nobody, for new work |
| [CHANGELOG.md](CHANGELOG.md) | Every change made to the repo, newest first | Everyone |
| `LLM.md`, `AGENTS.md`, `CLAUDE.md` | Instructions for AI tools (Claude, Codex, Cursor, Copilot). People can skip these | AI tools |

## Who should read what

| You are | Start with |
|---|---|
| **Marketing or writing copy** | [docs/BRAND-GUIDE.md](docs/BRAND-GUIDE.md) for tone and positioning, then [knowledge/](knowledge/) for facts |
| **A designer** | [reference/](reference/), then [docs/GRAPHICS.md](docs/GRAPHICS.md) for icons and illustrations |
| **Checking progress** | "Page status" above, [docs/OPEN-ITEMS.md](docs/OPEN-ITEMS.md) and [CHANGELOG.md](CHANGELOG.md) |
| **A developer** | "For developers" below, then [docs/CSS-GUIDE.md](docs/CSS-GUIDE.md) (mandatory) |
| **Using an AI tool** | Nothing to do: the tool reads [LLM.md](LLM.md) and [docs/CSS-GUIDE.md](docs/CSS-GUIDE.md) on its own, through [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md) |

## Words you'll see

| Word | Meaning |
|---|---|
| **Salient** | The WordPress theme the live site uses |
| **Raw HTML element** | The box in WordPress that each page's code is pasted into |
| **Custom CSS** | The one place in WordPress where all of the site's styles live |
| **PART** | One labeled chunk of the styles, such as PART C for the homepage. The developers' PARTs run from A to S. The ones written here (T, U and on) are added to the same file |
| **Class** | A name in the page code, such as `uxt-button`, that tells the page which style to use. Allowed names: [docs/CLASS-REGISTRY.md](docs/CLASS-REGISTRY.md) |
| **Section** or **partial** | A ready-made block of a page, such as the FAQ or the process steps, that new pages reuse |
| **Build** | A command that turns the code in `src/` into finished files in `dist/` |
| **Check** | A command that tests every page against the rules and lists anything that breaks them |
| **Preview** | A full page you can open in a browser to review it before it goes live |
| **Repo** | Short for repository: a shared folder of files with a full history of changes |
| **Branch** | A separate working copy of the repo. `main` is the official one; other branches hold work in progress |
| **Legacy** | The old, retired system, kept for reference only |
| **Figma node** | A number such as 1968:7235 that points to one frame in the Figma file |

---

## For developers

### Quick start

You need [Node.js](https://nodejs.org) 18 or newer. Nothing else is installed.

```bash
npm run build     # builds dist/
npm run classes   # rebuilds the class registry (after any CSS change)
npm run check     # the mandatory check for pages and CSS (run after build)
npm run serve     # http://localhost:4321/preview/homepage.html
npm run dev       # build, check, then serve
```

**Class and CSS rules (mandatory): [docs/CSS-GUIDE.md](docs/CSS-GUIDE.md).** Every class a page may use: [docs/CLASS-REGISTRY.md](docs/CLASS-REGISTRY.md).

### How the live site is put together

| On the site | In WordPress | In this repo |
|---|---|---|
| Header | Salient's header | not in the repo |
| Page body | one Raw HTML element | `src/pages/<page>.html` → `dist/wordpress/<page>.html` |
| Booking card and footer | footer global section | `src/global/footer-global.html` |
| CSS | Salient > Custom CSS (PART A to R) | `src/css/uxteam-site.css`, a byte for byte copy |
| New CSS | a PART of ours in the same file (now T and U; next V) | `src/css/uxteam-site.css` → `dist/css/uxteam-site.css` |

### Folders in detail

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

### Building a page

1. Copy `src/starters/page.html` to `src/pages/<page>.html` and set the wrapper: `<div class="uxt-home uxt-<key>">`.
2. Add sections with includes, then change only text, links and images:

   ```html
   <!-- @include partials/sections/process.html -->
   <!-- @include partials/elements/button.html type="primary" label="Book a Discovery Call" href="#book-call" -->
   ```

   Paths are relative to `src/`. `{{name|default}}` in a partial is filled from the attributes.
3. Need something no class covers? Add it to a PART of ours in `src/css/uxteam-site.css` (CSS-GUIDE section 5), then `npm run css:accept` and `npm run classes`.
4. `npm run build && npm run check`, then review `dist/preview/<page>.html` at 1440, 768 and 375.
5. Hand over `dist/wordpress/<page>.html` and, if any CSS changed, the whole `dist/css/uxteam-site.css` (CSS-GUIDE section 7).

### Naming (the developers' convention)

- `uxt-` prefix, lowercase, hyphens: `uxt-<block>-<part>` (`uxt-story-card`, `uxt-faq-item`).
- Page classes start with the page key: `uxt-wwd-cap`, `uxt-about-hero`.
- Variants are a second class (`uxt-case-card uxt-case-green`); states are `is-*` and `has-*`.
- No BEM, no camelCase. Full rules: CSS-GUIDE section 5.

### Docs

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
