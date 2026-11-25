---
name: uxteam-creative-review
description: Creative judgment for the UXTeam website. Use when designing a High weight section (services, industries, outcomes, an offer's core value), and before handing over any page or section, to review it like a senior design director and rank the fixes.
---

# UXTeam creative direction and review

Two jobs: give a High weight section the right creative direction, and review finished work against UXTeam's standard. Read `LLM.md` sections 6, 8 to 13 and 19.3 first, and look at `reference/pages/` and the `reference/` folders in `src/sections/outcomes`, `src/sections/featured-story`, `src/sections/services` and `src/components/industry-card`. They show the level expected.

## Part A. Directing a High weight section

### A1. State the point
Write the business point in one sentence ("A visitor sees which of our seven services fits their problem, and what they get from it"). If you cannot, the section is not ready to design.

### A2. Take stock of the proof
List what can make the point visible: approved numbers, client names and logos, product screens, deliverable previews (an audit report page, a website, a dashboard), counts, a quote. A High section with no proof needs some, or its weight is wrong.

### A3. Pick a composition
Consider at least two of these on-brand patterns and choose one, with a reason:

| Pattern | Good for | Built from |
|---|---|---|
| Number-led | Results, scale, speed | Large Besley numbers with what they measure, hairlines |
| Mockup-led | Results: outcomes, stories, industries. **Never a process or approach section** | Device or browser frames, client brand bands (outcome cards) |
| Preview cards | Services, offers, deliverables | Cards with a preview of what the client gets, a short "included" list with icons, one text link |
| Grouped by buyer question | Several services or options | Question labels with stacked cards (services section) |
| Expanding or tabbed set | 4 to 7 parallel items with rich detail | Industry tiles, tabs, accordions; one open at a time |
| Diagram or timeline | Process, approach, how it works | SVG process icons, connector line, numbered steps, simple white cards |
| Comparison | Choosing between options | Hairline table with the UXTeam column highlighted |
| Quote-led | Trust, relationships | Besley italic quote, person, logo, result nearby |

Avoid repeating the composition of the section before or after it.

**Content heavy sections:** before picking, cut the content to one idea and sketch two or three compositions in words (LLM.md 12.7). A section that stacks several column groups, or another section's content (such as the full process), has not been designed yet.

### A4. Decide the details
- **Focal point:** the one thing seen first.
- **Hierarchy:** section heading, group title, item title, body, meta (LLM.md 13.3).
- **Surface:** white, Warm Glow or Deep Navy, within the band limits (section 10). Cards on any surface are white with a Steel border, or unfilled with a gradient stroke on Deep Navy. No gradient filled cards, and no gradient surface on a gradient (LLM.md 8.5).
- **Eyebrow:** every section header has one (LLM.md 8.4).
- **Visual anchor and icons:** what graphic carries the point (13.6). Pick the family with `docs/GRAPHICS.md`, draw it with that family's recipe, and compare it with `reference/graphics/`. SVG only. Utility icons are stock Phosphor Light placed with `@icon`; anchor icons (the main visual of a tile or card) are curated in the same line style with one G4 accent (docs/GRAPHICS.md 4.5). Would stock glyphs look generic here? Then curate. No client mockup or screenshot was added: each one is a labeled image box.
- **Interaction:** hover, focus and tap states, and what moves (13.12).
- **Tablet and mobile:** how it stacks, what stays visible.
- **Action:** at most one text link per item, and the screen's one main CTA if it belongs here.

### A5. Record it
When the section is approved, add `reference/desktop.webp` and a `NOTES.md` (business point, why it looks this way, what can vary, what must not change) to its folder.

## Part B. Reviewing a page or section

Review as a strict senior design director. No praise padding. Every issue gets a concrete fix.

### B1. Quick tests
- **Five second test:** looking at each screen for five seconds, is it clear what UXTeam offers here and what to do next?
- **Squint test:** blur your eyes. Is there one focal point per screen, and do the High sections stand out more than the Low ones?
- **Side by side:** put the page next to the closest file in `reference/pages/`. Does anything appear that exists on no approved page (a color, a card style, a button, a header)?

### B2. Score each area from 1 to 5

| Area | What a 5 looks like |
|---|---|
| Business clarity | The page's job, reader and action are obvious; proof sits next to claims |
| Brand fit | Only tokens, the three fonts in their roles, Arrow Glide buttons, radius 8, no shadows, no gradient filled cards, an eyebrow on every section, SVG icons, fixed header, booking card and footer |
| Emphasis by weight | High sections are the most designed and visual; Low sections are quiet |
| Hierarchy and readability | Group titles beat their content; no orphans; comfortable line lengths; one idea per section, nothing dumped |
| Rhythm and variety | No two neighbouring sections share a layout; bands within limits; smooth gradient transitions |
| Reuse and parity | Approved sections reused whole; equal items treated equally |
| Spacing | Matches LLM.md section 9 exactly |
| Visual anchors | The right graphic family for the section's job (docs/GRAPHICS.md), one family and size per section, drawn to its recipe so it matches `reference/graphics/` |
| Craft details | Everything in LLM.md 13.1 to 13.11 holds |
| Copy | Voice, claims and facts follow LLM.md 3 and 4 |
| Quality | Web standards in LLM.md 13.12; `npm run check` passes |

### B3. Check reuse, parity and scope
- Every approved section that appears (process, partnerships, outcomes, logo strip, FAQ) matches the approved version: same copy, labels, structure and layout (LLM.md 12.5). The trusted-by logos are the logo marquee include, never a static row.
- Process and approach sections show the process (icons, numbers, steps, cards, a diagram), never a mockup or screenshot.
- Every set of parallel items has one treatment; nothing is featured or split off on its own (LLM.md 12.6).
- The hero and booking card match the page type (LLM.md 15.5).
- If an approved or live version of this page exists, compare section by section: order, emphasis, visuals, actions.
- Only the files the task needed were changed; no shared files, new mechanisms, filled open items or outside deployments (LLM.md 16.4).
- No AI generated imagery; section intros centered except on detail pages; no full Mist bands.

### B4. Check the known failures
Go through every row of LLM.md 19.3. Any match is an automatic issue.

### B5. Output

```
Verdict: Ready / Needs changes / Start again

Scores: Business clarity 4 · Brand fit 2 · Emphasis 3 · Hierarchy 4 · Rhythm 3 · Reuse 3 · Spacing 2 · Anchors 2 · Craft 3 · Copy 4 · Quality 4

Fixes, most important first
1. <where> · <what is wrong> · <the fix> · <rule it breaks>
2. …

Quick wins
- …

Not checked (and why)
- …
```

A page is Ready only when no area scores below 4 and nothing from 19.3 is present.
