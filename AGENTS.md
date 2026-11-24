# Instructions for AI agents

This repo is the coded design system and pages for the UXTeam website.

**Before doing anything, read [LLM.md](LLM.md) completely.** It holds the business, brand voice, design rules, craft rules, section library, page blueprints and the process to follow. Then follow its four steps: pick the approach, read the repo, share a plan that maps every section to a repo file, and review your work before handing it over.

## Non-negotiables

1. Build pages from the repo, never from scratch. Pages are `<!-- @include ... -->` partials plus content. No `<style>`, no inline styles (CSS variables like `--ux-*` only), no hex colors outside `src/tokens/tokens.json`.
2. The header, booking card and footer are fixed includes (`sections/site-header`, `sections/booking-cta`, `sections/site-footer`). Never redesign them or change their navigation, links or copy.
3. Every button is the Arrow Glide partial (`components/button/_button.html`).
4. Heroes use an existing hero section, have one CTA, and a dark hero fades to white.
5. Reuse the matching section first (process, engagement, FAQ, story cards, services, industries), whole, with its approved copy and labels. Never merge two approved sections. Items of equal weight (the seven services) get the same treatment. New sections only for content nothing existing can carry.
6. Cards: radius 8, 1px Steel border, no shadow. At most one Warm Glow and one Deep Navy band per page. Fixed section spacing.
7. Copy follows `docs/BRAND-GUIDE.md`; facts come from `knowledge/uxteam-website-knowledge.txt`. Never invent claims. No em dashes.
8. Start new pages from `src/starters/` and keep the `ux-page-type` comment correct; it decides the hero and booking card (LLM.md 15.5). Edit `src/`, never `dist/`.
9. After building, run `npm run build` and `npm run check`, fix every error, and compare with `reference/pages/`. If you cannot run or preview, say so.
10. Plan new pages with `skills/uxteam-page-strategy/SKILL.md` and review work with `skills/uxteam-creative-review/SKILL.md`. General design skills may only be used for usability, accessibility and performance checks, never for style, color, font or layout choices.
11. Every new section or element goes into the repo with its library entry, docs and a `CHANGELOG.md` line.
