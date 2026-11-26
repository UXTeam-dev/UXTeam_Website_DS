# Instructions for AI agents

This repo is the coded design system and pages for the UXTeam website.

**First, make sure you are on the latest `main`, and that no "CSS changed in WordPress" pull request is waiting** (if one is, ask the person to merge it first; docs/WORDPRESS-CSS-SYNC.md) (`git fetch origin && git checkout main && git pull`). If `LLM.md`, `docs/CSS-GUIDE.md` or `skills/` is missing, your copy is out of date: update before doing anything.

**Then read [LLM.md](LLM.md) completely, and [docs/CSS-GUIDE.md](docs/CSS-GUIDE.md) before writing any markup or CSS.** LLM.md holds the business, brand voice, design rules, craft rules, section library, page blueprints and the process to follow. CSS-GUIDE.md holds the mandatory class and CSS rules. Then follow LLM.md's steps: make sure the repo is current, pick the approach, read the repo, share a plan that maps every section to a repo file, and review your work before handing it over.

## Non-negotiables

1. **Only the developers' classes, only their stylesheet.** Pages use only classes in `docs/CLASS-REGISTRY.md` (from `src/css/uxteam-site.css`, the live Salient CSS). No `<style>`, no `style=""`, no linked stylesheets, no invented, Bootstrap, Salient (`nectar-*`, `wpb_*`), PART A (`heading-1`, `font-18`) or old `ux-` classes. A page built here pastes into WordPress as it is.
2. **New CSS only as a new PART, the developers' way** (CSS-GUIDE section 5): `src/css/parts/part-<letter>-<scope>.css`, the PART header, every selector scoped to the page wrapper, classes named `uxt-<page key>-<part>` with flat hyphens (no BEM), variants as a second class, states `is-*`/`has-*`, site colours, fonts and breakpoints only. Then `npm run classes`.
3. **Never edit the developers' files:** `src/css/uxteam-site.css`, `src/pages/homepage.html`, `src/pages/what-we-do.html`, `src/global/footer-global.html`. The check fingerprints them.
4. **A page is the wrapper `<div class="uxt-home uxt-<key>">` with everything inside it,** built by copying sections from `src/partials/` and changing only text, links and images. Start from `src/starters/page.html`.
5. **The header, booking card and footer are global, never in a page.** Buttons that book a call link to `#book-call`.
6. **Every button is the developers' Arrow Glide** (`uxt-button` + one type, two arrow SVGs, `partials/elements/button.html`). A card that is a link carries it as a `<span aria-hidden="true">` and gets `uxt-button-trigger`, so hovering the card plays the glide.
7. Heroes use the existing hero, have one CTA, and a dark hero fades to white.
8. Reuse the matching section first (process, engagement, FAQ, story cards, services, industries), whole, with its approved copy and labels. Never merge two approved sections. Items of equal weight get the same treatment. New sections only for content nothing existing can carry.
9. Cards: white, radius 8, 1px Steel border, no shadow, **no gradient fill**, and never a gradient surface on a gradient background. At most one Warm Glow and one Deep Navy band per page.
10. Copy follows `docs/BRAND-GUIDE.md`; facts come from `knowledge/uxteam-website-knowledge.txt`. Never invent claims. No em dashes. Main CTA "Book a Discovery Call".
11. After building, run `npm run build` and `npm run check`, fix every error, and compare the preview (`dist/preview/`) with `reference/pages/`. If you cannot run or preview, say so.
12. Plan new pages with `skills/uxteam-page-strategy/SKILL.md` and review work with `skills/uxteam-creative-review/SKILL.md`. General design skills may only be used for usability, accessibility and performance checks, never for style, color, font or layout choices.
13. Stay inside the task: a page task does not edit shared files, add new mechanisms, fill open items, or publish anything outside the repo (LLM.md 16.4). No AI generated imagery.
14. Every new section or element goes into the repo with its partial, its PART if any, docs and a `CHANGELOG.md` line.
15. Every H1 and H2 has an eyebrow (`uxt-subheading` with `underline-sky-blue` or `underline-white`) right above it. If the content document has none, write one.
16. Icons and graphics are SVG, never PNG, JPG, WebP or data images. Icons start from Phosphor Light (find with `npm run icon -- <word>`, place with `<!-- @icon name size="32" class="uxt-…" -->`); curate custom ones in the same line style when a section needs more character (docs/GRAPHICS.md 4.5). Never add real client mockups or screenshots, and never generate images: put a labeled placeholder (`partials/elements/placeholder.html`) and list it.
17. The trusted-by logo strip is always `partials/sections/logos.html` as it is (auto scrolling). Never a static logo row.
18. Process and approach sections show the process (icons, numbers, steps, simple cards, an SVG diagram), never a mockup or screenshot.
19. Brainstorm content heavy sections before building (LLM.md 12.7): one idea per section, two or three composition options, cut what repeats.
20. "You" and "use your judgment" mean whichever AI tool is building the page. Make the call yourself, following LLM.md.
21. Read copy in place at 1440, 768 and 375; break lines at phrase boundaries, no lone last word (LLM.md 5.4).
22. Scripts only from the approved `*-script.html` partials. New behaviour is a request to the developers.
23. To give the person a page to view or send, run `npm run share -- <page>` and hand over `dist/share/<page>.html` (LLM.md 16.6). It has the real header, the right booking card, the footer overlap and correctly sized logos. Never hand-build a preview file.
