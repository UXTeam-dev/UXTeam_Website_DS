# Changelog

Newest first. One entry per change that reaches GitHub. Name the Figma node when there is one.

## 2.3.0 · 27 Nov 2026

Contact page (`src/pages/contact.html`), on request:
- **What happens next** now shows three steps instead of the How we work process: Review and qualification, Strategy alignment call, Structured proposal (copy from the live Thank You page, in sentence case with "and" for "&"). Heading "How we'll move forward together". Same layout as How we work; three columns down to tablet, the icon rail on mobile (PART W).
- Three new 64px process icons in the house style, one G4 shape each: `assets/icons/process/review.svg`, `call.svg`, `proposal.svg` (inline on the page).
- Direct contact details section: not added (email and phone are not published).

## 2.2.0 · 27 Nov 2026

**New developer CSS synced** (`src/css/uxteam-site.css`, received 27 Nov 2026, fingerprint updated). It adds PART S (Insights), T (shared helpers, global sections), U (White label, transparent header) and V (Our work). Our PART S (`uxt-placeholder`, `uxt-nowrap`) is now inside their PART T, so `src/css/parts/part-s-shared.css` is removed. New parts continue at W.

**Contact page rebuilt from Figma "Contact Us · Design v1" (2771:18393)**, replacing the earlier coded draft (its PART T, offices partial and three step icons are removed). `src/pages/contact.html`, wrapper `uxt-home uxt-contact`:
- Light hero (About hero gradient, keeps `uxt-hero` for the transparent header): eyebrow, title, founder with three points, and the three-field form card.
- How we work: the approved process section, as it is.
- Our clients: logo grid (2 rows of 6) and global presence, About values.
- Success stories: DX Factor, RBBi, E2M cards with logos, About values; Read All Success Stories.
- FAQ: one column, seven questions, all open as in Figma.
- Closing card "Ready when you are" (G5), button to the hero form.
- **PART W (new, scoped to `.uxt-contact`)** and `src/partials/contact-form-script.html` (the booking card script with its selectors changed). Hooks `uxt-contact-form-wrap`, `uxt-contact-form-again`.
- For the developers: switch off the footer booking card on this page, add the form script, point the header button to `#contact-form`, upload the DX Factor and VORO logos (docs/OPEN-ITEMS.md).

Handover: `dist/wordpress/contact.html`, `dist/css/uxteam-site-additions.css` (PART W).

## 2.0.0 · 25 Nov 2026

**The repo now uses the developers' class system (`uxt-`), the same CSS that runs on new.ux.team.** Pages built here paste into a Salient Raw HTML element as they are, with no `<style>` block to remove.

- **Developers' files in, byte for byte:** `src/css/uxteam-site.css` (Salient Custom CSS, PART A to R), `src/pages/homepage.html`, `src/pages/what-we-do.html`, `src/global/footer-global.html`. Fingerprinted in `src/css/source.lock.json`; the check fails if any is edited.
- **Partials from their markup:** every homepage and What we do section in `src/partials/sections/`, and button, heading, FAQ item and centered CTA in `src/partials/elements/`. Verified: the homepage rebuilt from the section partials, and the button and FAQ partials, match the developers' markup exactly.
- **Starter:** `src/starters/page.html` (wrapper, hero with eyebrow, section shell).
- **New build:** `dist/wordpress/` (paste-ready bodies and the footer global section), `dist/preview/` (full pages for review), `dist/css/` (the live CSS and the additions). `@include` and `@icon` work as before.
- **Class registry:** `npm run classes` writes `docs/CLASS-REGISTRY.md` and `docs/classes.json` from the stylesheet: 241 `uxt-` classes with where each one works, the developers' unprefixed names, hooks (`src/css/hooks.json`), Salient element classes and 317 old PART A classes that are not allowed.
- **Mandatory guideline:** new `docs/CSS-GUIDE.md`: one stylesheet, page structure, every existing element and its classes, the developers' naming and PART conventions for new classes, handover and sync.
- **New `npm run check`:** fails on `<style>`, inline styles, linked stylesheets, unapproved scripts, classes outside the registry (with the reason: old ux-, PART A, Salient, unknown), scoped classes outside their wrapper, a missing or wrong wrapper, header, footer or booking card in a page, buttons without a type or the two arrows, headings without a text class, a missing eyebrow above an H1 or H2, eyebrows without an underline class, a changed logo strip, images without alt, duplicate ids, banned CTAs and dashes. For new PARTs: file name, letter, header (Figma, HTML, Scope), scope on every selector, naming (no BEM), page key prefix, palette colours, fonts and breakpoints. For the repo: developers' files unchanged, registry and build current, no ux- classes outside `legacy/`.
- **PART S (new, global, for the developers to agree):** `uxt-placeholder` image boxes (`partials/elements/placeholder.html`) and `uxt-nowrap`.
- **Old ux- system moved to `legacy/`** (src, dist, bundles, build, check and bundle scripts, COMPONENTS field list). It still builds with `npm run legacy:build` and stays a visual reference until its designs are converted.
- **Docs rewritten for the new system:** LLM.md (non-negotiables 1, 2, 4, 5, 13, 18, 22; sections 0, 1, 8.2, 9, 11, 12.4, 14, 15.4, 15.5, 16, 18, 19; failure 56), AGENTS.md, CLAUDE.md, README, COMPONENTS, HOW-TO-ADD, WORDPRESS, GRAPHICS (code note), FIGMA-MAP, OPEN-ITEMS (items needed from the developers), both skills.

Handover: `dist/css/uxteam-site-additions.css` holds PART S.

## 1.13.0 · 25 Nov 2026

UX Audit demo page, with one graphic family per section:
- New demo page `src/demos/ux-audit.html` (built to `dist/demos/`, checked like the approved pages; `src/demos/` is new and is not a source of truth). Sections: hero with the trusted strip (logos), what we audit (curated spot illustrations), at a glance (numerals on Deep Navy), inside the report (service row with the UX audit scene), sample findings (mini scenes), how we work (approved process, process icons), what we need (Phosphor icon tiles), FAQ, page end.
- New sections: `sections/service-row`, `sections/numbers-band`, `sections/expectations`; `.ux-scene-row` in `components/graphic`; `.ux-hero-listing--trusted` and `__trusted` for a trusted strip in a listing hero.
- New graphics: `_scene-ux-audit.html` (from Figma 2638:17184, photos redrawn as simple shapes) and four sample finding mini scenes.
- Fix: new grid lists use zero specificity resets, so the section head spacing (`.ux-section__head + *`) applies above them. Three topic tiles stay in one row on tablet.
- Aeonik `@font-face` now tries `local()` first, so headings use Aeonik where it is installed until the licensed files are added.
- New `npm run bundle -- <dist path>`: one self-contained HTML file in `bundles/` (CSS, JS, fonts and images inlined). `bundles/ux-audit.html` is committed for sharing.
- LLM.md (commands, section 14 rows), GRAPHICS.md, COMPONENTS.md and OPEN-ITEMS updated.

## 1.12.0 · 25 Nov 2026

From reviewing the two B2B SaaS and AI demo pages:
- **Header:** no bottom line on any page (`ux-header--bordered` and the `bordered` param removed). New scroll behavior: the bar scrolls away; scrolling up pins an Ink bar that slides in (white logo and nav, Glass CTA, soft shadow); scrolling down hides it; at the top the transparent bar returns. Works on light pages too.
- **Page end:** new global `sections/page-end/page-end.html` (booking card plus footer, fixed copy), placed after `</main>`. The card now overlaps the footer by 42px as in Figma; before, the card sat inside `<main>` and the footer outside it, so the overlap rule never applied on any page. All pages and starters switched. `:has()` fallback for older markup.
- **Card hover:** a global rule in `button.css` plays the Arrow Glide (and the Secondary underline) when a card that is a link, or a `.ux-hover-host`, is hovered or focused. The topic tile and the blog card now use the real Arrow Glide icon instead of their own arrows.
- **Hero eyebrow:** always above the H1. Added to Insights ("From the UXTeam studio") and the success story detail ("Success story"), and to the hub and detail starters.
- **Copy wrapping:** new LLM.md 5.4 (read copy in place, break at phrase boundaries, no lone last word, how to fix). Body text gets `text-wrap: pretty`; new `.ux-nowrap` helper.
- **Any AI tool:** LLM.md and AGENTS.md now say "you" and "use your judgment" mean whichever AI tool is building the page.
- LLM.md: non-negotiables 2 and 20 to 22, sections 5.4, 8.4, 11, 16.5, Step 4, quality bar, do's and don'ts, failures 51 to 55. AGENTS.md, both skills, COMPONENTS and HOW-TO-ADD updated.
- `npm run check` now flags: a hero without an eyebrow, arrows drawn outside the Arrow Glide component, a header line, the booking card included directly or inside `<main>`, and a booking card not directly followed by the footer. It also fixes the swapped home/inner booking messages.

## 1.11.0 · 25 Nov 2026

- Phosphor is the base icon set, not the only option. Utility icons (trust points, benefits, meta facts, lists, controls) use stock Phosphor Light; when a section needs icons with more character (the main visual of a tile or card), curate custom ones in the same line style with one G4 accent. One approach per section. New docs/GRAPHICS.md 4.5 (when and how to curate); LLM.md (non-negotiable 17, 8.6), AGENTS.md, both skills, the Phosphor readme and the line icon template updated.
- Four curated spot illustrations from the B2B SaaS and AI page ("What we design"): `ux-audit`, `product-app`, `website`, `ai-product` in `assets/graphics/spot/`. Reference: `reference/graphics/curated-spots-what-we-design.webp`. New folder `assets/icons/custom/` for curated 32px icons.

## 1.10.0 · 25 Nov 2026

- Phosphor icons (Light weight, `@phosphor-icons/core` 2.1.1, MIT) are now the UI icon set: 1,512 icons in `assets/icons/phosphor/light/`, with `catalog.json` (names, tags, categories), license and readme.
- `npm run icon -- <word>` finds an icon by name or tag (brand logos hidden unless `--brands`).
- New build directive `<!-- @icon name size="32" class="…" label="…" -->` inlines the icon so it takes its container's color. `.ux-icon-tile` sets Navy, `.ux-icon-tile--navy` white, `.ux-meta-icon` Steel. The build stops on an unknown icon name.
- Rule in LLM.md (non-negotiable 17, sections 1 and 8.6), AGENTS.md, docs/GRAPHICS.md (family 2), both skills and COMPONENTS: UI icons are Phosphor Light only; draw one only when Phosphor has nothing. The approved icons from Figma stay.
- `npm run check` flags Phosphor icons used as `<img>`; the asset check now flags raster files in `assets/icons` and `assets/graphics` (so the license, readme and catalog can live beside the icons).
- Library: Phosphor examples in the three icon containers.

## 1.9.1 · 24 Nov 2026

- New rule: never add real client mockups or screenshots to a page. Wherever one is needed, put a labeled image box placeholder; the team adds the image later. Approved sections reused whole keep their images. In LLM.md (non-negotiable 17, 8.6), AGENTS.md, docs/GRAPHICS.md (sections 1, 6, 8, 10), both skills and OPEN-ITEMS. The check's placeholder message now says this is expected.

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
