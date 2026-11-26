# Notes for Claude

This repo is the coded design system and pages for the UXTeam website.

**Work from the latest `main`** (if a "CSS changed in WordPress" pull request is open, ask the person to merge it first: docs/WORDPRESS-CSS-SYNC.md)**, then read [LLM.md](LLM.md) completely before planning, writing, designing or building anything.** It is the full brief. The non-negotiables are repeated in [AGENTS.md](AGENTS.md).

**Before any markup or CSS, read [docs/CSS-GUIDE.md](docs/CSS-GUIDE.md). It is mandatory.** Pages use only the developers' `uxt-` classes listed in [docs/CLASS-REGISTRY.md](docs/CLASS-REGISTRY.md): no `<style>` blocks, no inline styles, no invented classes. New CSS is a new PART in `src/css/parts/`, written the developers' way. Never edit the developers' files (`src/css/uxteam-site.css`, `src/pages/homepage.html`, `src/pages/what-we-do.html`, `src/global/footer-global.html`).

## Writing copy for a page

When a page has no content file, or you need any fact about UXTeam:

1. Read `docs/BRAND-GUIDE.md` for positioning, voice, page rules and claims rules. It wins on tone and framing.
2. Read `knowledge/uxteam-website-knowledge.txt` for facts taken from the live site (ux.team): company and contact details, services, clients, success stories, testimonials, FAQs and numbers.
3. Only use numbers listed as safe in its section 10, never copy anything from its section 12, and leave visible `[confirm …]` placeholders instead of inventing facts.

House style for copy: sentence case, American spelling, no em dashes, main CTA "Book a Discovery Call".

## Building

Plan new pages with the `uxteam-page-strategy` skill and review them with `uxteam-creative-review` (both in `skills/`; `.claude/skills/` only points there). Start new pages from `src/starters/page.html`, build sections from `src/partials/`, follow LLM.md sections 15 and 16, run `npm run classes` (after CSS changes), `npm run build` and `npm run check` until it passes, and add a line to `CHANGELOG.md` for every change. To give the person a file to view or share, run `npm run share -- <page>` and send `dist/share/<page>.html` (LLM.md 16.6); never assemble one by hand.
