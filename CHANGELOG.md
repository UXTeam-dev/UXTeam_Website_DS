# Changelog

Newest first. One entry per change that reaches GitHub. Name the Figma node when there is one.

## 1.9.0 · 24 Nov 2026

Graphics guide and kit, from the Figma Graphics board (`2638:6786`):
- New `docs/GRAPHICS.md`: six graphic families (process icons, line icons on tiles and meta icons, spot illustrations, product scenes, mini scenes, image boxes for real images), which section gets which, the shared visual language, a recipe and step by step guide for drawing new ones, and a checklist.
- New assets: six spot illustrations and a template (`assets/graphics/spot/`), four 32px line icons and a template (`assets/icons/line/`).
- New component `components/graphic`: icon tiles (tint and Navy), meta list, spot panel and topic tile (with `.ux-topic-grid`), scene frame and mini scene, image box placeholders in the standard ratios. Coded examples: the Conversion Optimization product scene and the Trust and Transparency mini scene, both inline SVG. Shown in the library under Graphics.
- Tokens for graphics only: `color.graphic` (signal and UI drawing colors), `shadow.scene-frame`, `shadow.scene-card`, `gradient.g6-icon-tile`, `gradient.scene-mini`.
- `reference/graphics/`: screenshots of every graphic on the board.
- LLM.md (non-negotiable 17, Step 2, sections 1, 8.6, 13.6, 14), AGENTS.md and both skills point to the guide. `npm run check` now also requires SVG in `assets/graphics`, flags scenes inside a band, scenes in process sections, and image box placeholders left on a page.

## 1.8.0 · 24 Nov 2026

From reviewing an AI built B2B SaaS and AI page:
- Process icons are now SVG (`assets/icons/process/*.svg`, from Figma node 1968:7685) and the Facebook share icon is SVG. The PNG versions are removed.
- New hard rules in LLM.md (non-negotiables 15 to 19, sections 8.3 to 8.6, 12.5, 12.7, 13.6 to 13.10, 18, 19): no gradient fills on content cards and never a gradient on a gradient; an eyebrow on every section header; icons and graphics are SVG only; the trusted-by strip is always the logo marquee include; process and approach sections show the process, never a mockup; content heavy sections are brainstormed before they are built (new 12.7, required in the Step 3 plan).
- AGENTS.md, the page strategy skill (new step 4A, section brainstorm) and the creative review skill carry the same rules. LLM.md 19.3 failures 44 to 50.
- `npm run check` now flags: "Trusted by" without the marquee and static logo rows; section headers without an eyebrow; G6 cards off the detail page; gradient surfaces inside a gradient band; non-SVG icons in pages and in `assets/icons`; gradient backgrounds on cards in new CSS; mockups in process or approach sections; the process combined with other content; sections over 150 words.

## 1.7.0 · 24 Nov 2026

From reviewing a second AI built What we do page and the steps its tool recorded:
- LLM.md Step 0: work from the latest `main` and confirm LLM.md, AGENTS.md, skills and the check exist (the tool had worked from an old copy without them). AGENTS.md, CLAUDE.md and the page strategy skill say the same.
- LLM.md Step 1: ask when inputs disagree; "start fresh" means a fresh page in the same system.
- LLM.md 8.6: no AI generated imagery; Mist is never a full section background.
- LLM.md 16.4 "Stay inside the scope of the task": no edits to shared files, no new mechanisms, no filling open items, no outside publishing, no button classes on cards.
- LLM.md 19.3: failures 31 to 43. Quality bar and creative review skill check scope too.
- `npm run check` now flags left aligned section intros outside detail pages, button classes on cards or tiles, rewritten approved labels (logo strip, FAQ heading, process copy) and full Mist sections.

## 1.6.0 · 24 Nov 2026

Repo review and refinement:
- Every page and starter declares its type (`<!-- ux-page-type: ... -->`). `npm run check` now checks that the hero and booking card match the type (LLM.md 15.5).
- New starter `src/starters/hub-page.html` for pages that present the whole offer (display hero, logo strip, homepage booking card).
- LLM.md: non-negotiables now include reusing approved sections whole, equal treatment for equal items, and page type; display H1 rule, hero sub length, typical weights, band guidance, CTA band tint and the High section checklist aligned with the What we do blueprint; section 12 reordered; reference file names corrected to WebP; Do and Don't numbered 19.1 and 19.2; live What we do page added to the order of truth.
- `reference/README.md` and `docs/FIGMA-MAP.md` list approved live references. README, HOW-TO-ADD, COMPONENTS, AGENTS and the page strategy skill updated to match.

## 1.5.0 · 24 Nov 2026

From comparing an AI built What we do page with the live approved one (new.ux.team/what-we-do):
- LLM.md 12.5 "Reuse approved sections exactly" and 12.6 "Items of equal weight get equal treatment".
- LLM.md 15.4 blueprint for the What we do hub page and 15.5 table of which hero and booking card each page type uses. Page rules moved to 15.6.
- LLM.md section 11: one Primary pill per section close; at most one Primary and one link per card.
- LLM.md 19.3: failures 17 to 30 from the comparison. House style: short label titles have no full stop.
- Section library: capability stack and why grid with icons listed as to build.
- `npm run check` now warns about section level Secondary links or action pairs, and story cards in two or four column grids; band counting only reads class attributes.
- Both skills check page type, reuse of approved sections and parity of equal items.

## 1.4.1 · 24 Nov 2026

- Moved the skills to a tool-neutral `skills/` folder at the repo root, with `skills/README.md`, so Codex, Cursor and other tools use them too. `.claude/skills/` now only holds pointer files for Claude Code.

## 1.4.0 · 24 Nov 2026

- Added two skills in `.claude/skills/`: `uxteam-page-strategy` (business framing, story, section weights, content brief) and `uxteam-creative-review` (creative direction for High weight sections, scored review with ranked fixes). LLM.md, AGENTS.md and CLAUDE.md point to them.
- Added web quality standards to LLM.md (13.12): accessibility, tap targets, readability, performance, motion, forms, navigation. Outside design skills may only be used for these checks, never for style choices.
- Added a "Skip to content" link to the header; every page's `<main>` now has `id="main"`, and `npm run check` checks it.
- Removed `docs/DESIGN-RULES.md`. LLM.md is now the only rulebook; links point to its sections 8 to 13.

## 1.3.0 · 24 Nov 2026

- Added `LLM.md`, the full brief for AI tools: business, voice, claims, process (approach, read the repo, plan, review), business value weighting, design rules, fixed spacing, craft rules, section library, page blueprints, quality bar and failures seen before.
- Added `AGENTS.md` and updated `CLAUDE.md` so AI tools find LLM.md automatically.
- Added `npm run check` (`scripts/check.mjs`): flags custom styles, hex colors, missing or rewritten header, footer and booking card, buttons without the Arrow Glide arrow, more than one hero CTA, too many bands, wrong section padding, missing alt text and copy rule breaks.
- Added starter files for new pages in `src/starters/`.
- Added screenshots of every approved page in `reference/pages/`, and reference folders with notes for the outcomes, featured story, services and industry sections.
- Replaced inline styles in pages with named classes so every page passes the check. Removed an em dash from the Insights article.
- Brand guide note now says hyphens are fine and em dashes are never used.

## 1.2.0 · 23 Nov 2026

- Added `knowledge/uxteam-website-knowledge.txt`, one text file with everything the live site (ux.team) says, organized by topic: company facts and contact, site structure, positioning, process, the four capability pages, all 16 success stories, portfolio projects, testimonials, numbers with their approval status, FAQs, and issues found on the live site.
- Added `CLAUDE.md` pointing to the brand guide and the knowledge file for page copy.

## 1.1.0 · 23 Nov 2026

- Added `docs/BRAND-GUIDE.md`, a text version of the Positioning and Brand Guide for Page Designers (Chintan, 28 Oct 2026), with a short guide for planning pages that have no content file.

## 1.0.0 · 23 Nov 2026

First release of the coded design system.

- Tokens from Figma variables and the Design System Guideline, generated into CSS variables with tablet and mobile values (`src/tokens/tokens.json`).
- Base: fonts (Manrope and Besley included, Aeonik pending), reset, typography, grid and section spacing.
- Components: button (Arrow Glide), eyebrow, section header, chips, form field, stats, logo tile, social link, person, story card, blog card, outcome card, video card, service card, industry card, FAQ, table of contents, detail page blocks.
- Sections: header (dark and light), footer, booking card (homepage and inner versions), home hero with logo marquee, listing hero, case study hero, article hero, light hero, outcomes, featured story, approach, services, process, engagement, filter bar, detail layout, article body, related row, logo grid, story split, team, beliefs.
- Pages: Homepage, Success Stories listing, Success Story detail (Squaircle) with tablet and mobile; Insights listing, Insights detail and About Us on desktop.
- Interactions from the Figma prototypes: CTA arrow glide, card hovers, FAQ accordion, industry card expand, sticky TOC with scroll spy, logo marquee, video play, filter chips, booking form check.
- Component library page, build script, local server and docs.
