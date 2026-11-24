# Notes for Claude

This repo is the coded design system and pages for the UXTeam website.

**Read [LLM.md](LLM.md) completely before planning, writing, designing or building anything.** It is the full brief. The non-negotiables are repeated in [AGENTS.md](AGENTS.md).

## Writing copy for a page

When a page has no content file, or you need any fact about UXTeam:

1. Read `docs/BRAND-GUIDE.md` for positioning, voice, page rules and claims rules. It wins on tone and framing.
2. Read `knowledge/uxteam-website-knowledge.txt` for facts taken from the live site (ux.team): company and contact details, services, clients, success stories, testimonials, FAQs and numbers.
3. Only use numbers listed as safe in its section 10, never copy anything from its section 12, and leave visible `[confirm …]` placeholders instead of inventing facts.

House style for copy: sentence case, American spelling, no em dashes, main CTA "Book a Discovery Call".

## Building

Plan new pages with the `uxteam-page-strategy` skill and review them with `uxteam-creative-review` (both in `.claude/skills/`). Start new pages from `src/starters/`, follow LLM.md sections 15 and 16, run `npm run build` and `npm run check`, and add a line to `CHANGELOG.md` for every change.
