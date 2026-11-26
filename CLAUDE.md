# Notes for Claude

This repo is the coded design system and pages for the UXTeam website.

**Work from the latest `main`, then read [LLM.md](LLM.md) completely before planning, writing, designing or building anything.** It is the full brief. The non-negotiables are repeated in [AGENTS.md](AGENTS.md).

**Before any markup or CSS, read [docs/CSS-GUIDE.md](docs/CSS-GUIDE.md). It is mandatory.** Pages use only the developers' `uxt-` classes listed in [docs/CLASS-REGISTRY.md](docs/CLASS-REGISTRY.md): no `<style>` blocks, no inline styles, no invented classes. New CSS is a new PART in `src/css/parts/`, written the developers' way. Never edit the developers' files (`src/css/uxteam-site.css`, `src/pages/homepage.html`, `src/pages/what-we-do.html`, `src/global/footer-global.html`).

## Branch names

Name every new branch so anyone can tell what it holds from the name alone: `<type>/<what-it-changes>`, lowercase, words joined with hyphens, no random words or session ids.

- Types: `page/` (a new or changed page), `section/` (a section partial), `css/` (a new or changed PART), `content/` (copy, knowledge or brand text), `docs/` (guides and rules), `tooling/` (build, check, scripts, sync), `fix/` (a bug fix).
- Examples: `page/industry-b2b-saas-ai`, `page/white-label`, `css/part-t-shared-helpers`, `docs/branch-naming`, `fix/faq-toggle-mobile`.
- Always branch from the latest `main`, and keep one topic per branch.
- If the tool assigns its own branch name (for example a cloud session's `claude/<random>`) and cannot push anywhere else, say so at the start, and suggest a name in this style the person can rename the branch to on GitHub.

## Writing copy for a page

When a page has no content file, or you need any fact about UXTeam:

1. Read `docs/BRAND-GUIDE.md` for positioning, voice, page rules and claims rules. It wins on tone and framing.
2. Read `knowledge/uxteam-website-knowledge.txt` for facts taken from the live site (ux.team): company and contact details, services, clients, success stories, testimonials, FAQs and numbers.
3. Only use numbers listed as safe in its section 10, never copy anything from its section 12, and leave visible `[confirm …]` placeholders instead of inventing facts.

House style for copy: sentence case, American spelling, no em dashes, main CTA "Book a Discovery Call".

## Building

Plan new pages with the `uxteam-page-strategy` skill and review them with `uxteam-creative-review` (both in `skills/`; `.claude/skills/` only points there). Start new pages from `src/starters/page.html`, build sections from `src/partials/`, follow LLM.md sections 15 and 16, run `npm run classes` (after CSS changes), `npm run build` and `npm run check` until it passes, and add a line to `CHANGELOG.md` for every change.
