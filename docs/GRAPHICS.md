# Graphics guide

How UXTeam uses icons, illustrations and product scenes, where each kind goes, and how to draw a new one that looks like it came from the same hand. Read this before you put any graphic or image on a page.

Source: Figma file "UXTeam Website 2026", **Graphics** board (node `2638:6786`). Screenshots of every graphic on that board are in `reference/graphics/`. Open the matching one before you draw.

> **Code note.** The drawing rules, families, sizes and colours in this guide are current. The markup examples (classes starting `ux-`, partials in `components/graphic/`) are from the old system in `legacy/`, which still shows every family live (`npm run legacy:build`, then `legacy/dist/library/index.html#graphics` and `legacy/dist/demos/ux-audit.html`). On a page today:
> - **Icons:** `<!-- @icon name size="32" class="uxt-…" -->` (the build inlines the SVG); the class comes from the registry or the page's PART.
> - **Image placeholders:** `<!-- @include partials/elements/placeholder.html label="…" ratio="uxt-placeholder-wide" -->` (PART T).
> - **Icon tiles, spot panels, topic tiles, scenes:** the first page that needs one builds it as a partial with a PART, using the look described here and the SVG files in `assets/` ([CSS-GUIDE.md](CSS-GUIDE.md) section 5). Copy the SVG drawings as they are; write new `uxt-` classes for the boxes around them.

---

## 1. Decide what the section needs

Ask one question first: **is this section explaining how we work, or showing what we deliver?**

| The section… | Use | Family |
|---|---|---|
| Walks through steps of a process | The five process icons, as they are | 1 |
| Lists principles, trust points, expectations, benefits, reasons to choose us | 32px line icons on soft tint tiles | 2 |
| Lists who it is for (audiences) on a detail page | 32px white icons on Navy tiles | 2 |
| Gives facts about a client (industries, location) | 24px Steel meta icons beside the words | 2 |
| Lets the reader pick a topic, service area or path (navigation tiles) | Spot illustrations on a Mist panel | 3 |
| Presents a service and what the client gets (High weight) | A drawn product scene, or an image box where client work is wanted | 4 or 6 |
| Shows the parts of one capability side by side (for example the four parts of AI design), or sample results | Mini scenes | 5 |
| States a few facts about the offer (days, steps, projects) | Numerals: Besley numbers with a unit and one line, no tile or icon (`sections/numbers-band`) | none |
| Shows client work, a result, an industry, a person or an article | An image box (placeholder) | 6 |

Then the hard limits:

- **How we work never gets a scene or a mockup.** Process, approach, method and principle sections use families 1 to 3 only.
- **What we deliver gets a drawn scene or a placeholder.** Services, capabilities, outcomes and industries use families 4 to 6.
- **Never add a real client mockup or screenshot, and never generate a real image.** Client work, results, people, photos and blog covers always go in a labeled image box (family 6). The team adds the real image later. Approved sections reused whole keep their existing images.
- **One family per section,** and one size of it. Do not mix tiles with spot illustrations, or scenes with icons, in the same section.
- **Everything drawn is SVG** (inline or an `.svg` file). Raster files already in the repo (photos, screenshots, client logos) stay where approved sections use them; do not add new ones.

---

## 2. The shared visual language

Every drawn graphic follows these rules, whatever its family.

| Property | Rule |
|---|---|
| Line | Navy `#0A1B33`, 1.5px, round caps and joins. White on Navy tiles. Steel `#6F7680`, 1.2px, for 24px meta icons only |
| Accent | The G4 pair, Aqua `#A9FBFF` to Peach `#FEDFBA`, diagonal from top left. **Exactly one accent shape per graphic**, on the shape that carries the idea (the bull's eye, the winning bar, the selected tile) |
| Contrast fills | Solid Navy for small dots and up to four tiles. Never large areas |
| Overlap | A shape in front of another is filled white so lines do not cross through it |
| Dashes | `4 4` for trend lines and paths |
| Shapes | Circles, rounded rectangles (radius 4 to 8), straight lines, simple arcs. Geometric, flat, front on |
| Never | Text inside icons or spot illustrations, people or faces, shading, 3D perspective, drop shadows, more than one accent, brand gradients other than G4, emoji, stock icon sets with a different stroke |
| Minimal | An icon is 2 to 4 strokes. A spot illustration is 3 to 9 shapes. If it needs more to be understood, the metaphor is wrong; pick a simpler one |

Scenes (families 4 and 5) are drawn UI, so they follow their own recipe in sections 6 and 7, but they keep the same restraint: one story, few elements, generous space.

---

## 3. Family 1: process icons (64px)

- **Where:** the process section only (`sections/process`, homepage "How we work"), and any page that reuses it.
- **Files:** `assets/icons/process/audit.svg`, `evidence.svg`, `journey.svg`, `build.svg`, `proof.svg`. Reference: `reference/graphics/process-icons.webp`.
- **Look:** 64 x 64, Navy 1.5 outline, one shape filled with G4 (the report, the top layer, the two journey dots, the cube faces, the gauge dot). Connected by Steel hairlines between steps.
- **Use them as they are.** They belong to the approved five steps. Do not reorder, recolor or add a sixth. If a page needs a different set of steps, draw new 64px icons with the same rules and the same single G4 fill.

## 4. Family 2: line icons (32px and 24px)

**Phosphor, Light weight, is the base icon set** (`assets/icons/phosphor/`, 1,512 icons, MIT). Designers use the Phosphor Figma file or plugin in Light, so names match. It is the starting point, not a limit: when a section needs icons with more character, curate custom ones in the same line style (4.5).

**Use Phosphor as it is** for utility icons, where quick recognition matters more than character: icons in tiles for trust points and benefits, meta icons beside facts, small lists, UI controls.

1. Search: `npm run icon -- <word>` (for example `npm run icon -- shield`). Brand logos are hidden.
2. Use it inline, so it takes the container's color: `<span class="ux-icon-tile"><!-- @icon shield-check size="32" --></span>`. Add `label="…"` only when the icon carries meaning on its own; otherwise it is hidden from screen readers.
3. Sizes: 32 in tiles, 24 for meta icons and inline with text. Light only: never Thin, Regular, Bold, Fill or Duotone, and never another icon library.
4. Never `<img src="…/phosphor/…">` (it renders black).

**Curate custom icons** when the icon is the visual anchor of a card or tile, when the set must say something specific to the page, or when a stock glyph would look generic (4.5).

The icons already in the repo from Figma (`assets/icons/line/`, `audience-*`, `industry-*`) are approved and stay where they are used.

### 4.1 Soft tint tile (light sections)

- **Where:** trust points, expectations ("How we treat every engagement"), benefits, reasons to choose UXTeam, what is included. Columns of 3 or 4 with a Steel hairline on top, or a short list.
- **Markup:** `<span class="ux-icon-tile"><!-- @icon target size="32" --></span>` (the tile sets Navy)
- **Look:** tile 56 x 56, radius 8, G6 tint (`--ux-gradient-g6-icon-tile`, `#B9F9FC` to `#FFEED9`); icon 32 Navy line, no fill. Tile sits 29px below the column's top hairline; title (Aeonik Medium 25) 16px below the tile; body Manrope 18.
- **Icons:** Phosphor Light. The four on the Figma board are also kept as files in `assets/icons/line/`. Reference: `reference/graphics/icon-tiles-tint-expectations.webp`.
- The tint tile is a small accent, not a card. It is the only tinted square allowed in a light section, and it is never larger than 60px.

### 4.2 Navy tile (audience lists on detail pages)

- **Where:** "Who this is for" on Success Story detail pages.
- **Markup:** `<span class="ux-icon-tile ux-icon-tile--navy"><!-- @icon buildings size="32" --></span>` (the tile sets white). The approved detail page keeps its `audience-*.svg` files.
- **Look:** 60 x 60, radius 7, Navy fill, white 32 line icon. Files: `assets/icons/audience-*.svg`. Reference: `reference/graphics/icon-tiles-navy-who-this-is-for.webp`.

### 4.3 Meta icons (24px)

- **Where:** beside short facts in a sentence row: a client's industries ("Healthcare, Fintech, Manufacturing"), a location, a format. Never in a tile, never as a feature list.
- **Markup:** `<ul class="ux-meta-list" role="list"><li><!-- @icon currency-circle-dollar size="24" class="ux-meta-icon" -->Fintech</li></ul>` (the class sets Steel)
- **Look:** 24 x 24, Steel, 1.2 line; label Manrope 20 Charcoal, 10px gap, 30px between items. Files: `assets/icons/industry-*.svg`. Reference: `reference/graphics/meta-icons-client-about.webp`.

### 4.4 Drawing a new line icon from scratch

1. Search Phosphor with two or three synonyms first; if it has the idea, curate from it (4.5). If nothing fits, copy `assets/icons/line/_template.svg` (32 x 32).
2. Pick the plainest metaphor for the word: person for "senior person", target for "one metric", line chart for "reports", shield for "NDA".
3. Draw it in 2 to 4 strokes inside x 4 to 28, y 4 to 28. Navy, 1.5, round caps and joins. One small solid dot at most.
4. No gradient in the icon; the tile carries the color. Save it in `assets/icons/line/<name>.svg` with an `aria-label`.
5. Check it beside the four existing icons at 100%: same weight, same optical size.

### 4.5 Curating custom icons

Some sections need icons made for them, not picked from a set. Example: "What we design for SaaS and AI companies" on the B2B SaaS and AI page (`reference/graphics/curated-spots-what-we-design.webp`). Each service tile has its own drawing built from a familiar icon idea (a magnifier over a page for UX audit, an app window with a sidebar for product design, a browser for websites, a grid for design systems, rising bars for conversion), recomposed and given the UXTeam accent. They read as one family with Phosphor, but they say exactly what each service is.

**When to curate**
- The icon is the main visual of a card or tile (service tiles, topic tiles, a High weight set).
- The set must carry the page's subject (SaaS, AI, events), and the stock glyphs would look generic or alike.
- Phosphor has the idea only as part of what you need (a page, but not a page being audited).
- Not for utility icons: trust points, meta facts, lists and controls stay stock Phosphor.

**How to curate**
1. **Start from the plainest familiar shape.** Find it in Phosphor (`npm run icon -- <word>`) or in the existing spot illustrations. Use it as a guide for proportions and metaphor.
2. **Redraw it as strokes, do not edit the Phosphor file.** Phosphor files are outlined shapes; a curated icon is drawn fresh with Navy 1.5 strokes, round caps and joins, so the weight matches at its size.
3. **Combine and simplify.** Join two ideas into one picture (page plus magnifier, window plus chart), cut every detail that does not help the idea, keep 3 to 9 shapes for a spot illustration and 2 to 5 strokes for a 32px icon.
4. **Add exactly one G4 accent** on the part that is the point (the lens, the hero block, the selected tile, the centre node). Up to four small solid Navy fills for rhythm. White fill where shapes overlap.
5. **Make the set consistent.** Same canvas, same optical size, same stroke, one accent each. Lay them side by side before you finish; none should look heavier, busier or larger than the rest.
6. **Save them.** Spot illustrations: `assets/graphics/spot/<name>.svg` (200 x 140, template `_template.svg`). 32px icons: `assets/icons/custom/<name>.svg` (template `assets/icons/line/_template.svg`). Add a comment line saying what it was curated from, and an `aria-label`.
7. **Use one approach per section.** Either every item in the set is stock Phosphor or every item is curated. Never mix the two in one row.

Curated examples in the repo: `ux-audit`, `product-app`, `website`, `ai-product` (from the B2B SaaS and AI page), and the six topic spots below.

## 5. Family 3: spot illustrations (topic tiles)

- **Where:** tiles that let the reader choose a direction: "Pick the problem you have today" (Insights topics), service areas on a hub page, categories. Always as a set of 3 or 6, one illustration per tile, all drawn the same way.
- **Markup:** `@include components/graphic/_topic-tile.html art="cro" title="CRO" text="…" href="…"` inside `<ul class="ux-topic-grid" role="list"><li>…</li></ul>`.
- **Look:** tile 380 x 350, white, 1px Steel, radius 8. Top 188px is a Mist panel (`.ux-spot`) with a hairline below it; the 200 x 140 drawing sits centered in it. Body: title Aeonik Medium 25 with a 24px Ink arrow circle on the right, one line of Manrope 18 below. Hover: the drawing scales to 1.04, the arrow nudges right. Reference: `reference/graphics/spot-illustrations-topic-tiles.webp`.
- **Files:** curated for B2B SaaS and AI: `ux-audit.svg` (magnifier over a report), `product-app.svg` (app window, sidebar, cards, chart), `website.svg` (browser with a hero block), `ai-product.svg` (connected nodes). Topic set: `assets/graphics/spot/ux-strategy.svg` (target and arrow), `cro.svg` (rising bars, the last one G4, dashed trend), `design-systems.svg` (3 x 3 grid, four corners Navy, centre G4), `ai-and-ux.svg` (connected nodes, centre G4), `agency-growth.svg` (stacked cards, front one G4), `white-label.svg` (two overlapping circles, one G4). Template: `assets/graphics/spot/_template.svg`.

### Drawing a new spot illustration

1. Copy `_template.svg` (200 x 140, transparent; the Mist comes from the panel).
2. Name the idea in two words, then find a geometric metaphor a reader gets in one glance: growth is rising bars, focus is a target, a system is a grid, connection is nodes, scale is stacked cards, partnership is overlapping circles, a journey is a dotted path between two dots, a check is a magnifier over a page.
3. Build it from 3 to 9 primitives inside x 30 to 170, y 10 to 130, optically centered.
4. Give exactly one shape the G4 fill: the part that is the point (the winning bar, the centre node). Up to four small solid Navy fills for rhythm.
5. Navy 1.5 strokes, round caps; white fill on shapes that overlap others; no text.
6. Give the gradient a unique id (`ux-spot-<name>-accent`). Save as `assets/graphics/spot/<name>.svg`.
7. Put it beside the six existing ones (library page): same density, same weight, nothing busier than the grid.

## 6. Family 4: product scenes (518 x 518)

- **Where:** the visual side of a service row ("UX Audit", "Conversion Optimization", "Design Systems" on the What we do page), and other High weight sections that present **what the client gets**. Never in process or approach sections.
- **Layout around it:** text column 528 wide on the left (title, intro, a checklist with arrow bullets, "Where it fits", one Primary plus one text link), scene 518 x 518 on the right, inside a 1200 white card with a 1px Steel border. Reference: `reference/graphics/service-row-ux-audit.webp`.
- **Two ways to make one:**
  - **Drawn scene (preferred when the service is a method):** UX Audit, Conversion Optimization, Design Systems, UX Strategy Workshop. Coded as one inline SVG. Example to copy: `src/components/graphic/_scene-cro.html`.
  - **Client work scene:** Product and App Design, Web and Marketing Design. In Figma these show real client screens in a frame. **Never add the client mockup:** use an image box (`.ux-image-box--scene`) whose label describes the screen and frame wanted, without naming a client. The team adds the image.

### Recipe for a drawn scene

| Layer | Spec |
|---|---|
| Panel | 518 x 518, radius 8, Navy `#0A1B33` |
| Glows | Two blurred circles: Sky `#A5ECFF` at 16% (r 160, top left, blur 70) and bright aqua `#00BFF2` at 16% (r 150, bottom right, blur 70). The UX Strategy Workshop is the one exception: a violet to lilac board (`reference/graphics/scene-ux-strategy-workshop.webp`) |
| Context layer | One of: a dark glass panel (white 4% fill, white 8% stroke, radius 14) holding a chart; or a light browser frame (white, radius 10 top corners, three `#E6EAEE` dots, Mist URL bar, shadow `--ux-shadow-scene-frame`) holding a simplified page |
| Simplified UI | Skeleton lines `#E6EAEE` radius 2.5, inputs with `#C9D3DC` borders radius 4.5, one Navy button, one Mist image placeholder. Real looking but generic: invented brand names (HALDEN), no real client marks |
| Evidence | The finding, marked once: a red dashed outline (`#E5484D`, 1.5, dash 5 4, 5% fill) around the problem and a pulsing marker dot (`#C62F35`, white ring) |
| Floating cards | 1 to 3 white cards, radius 12, shadow `--ux-shadow-scene-card`, overlapping the frame on the right or bottom. Each card is one step of the story: score, hypothesis, finding, result |
| Type | Card titles Aeonik Medium 14 to 16; body Manrope 9 to 12; labels in Besley caps with tracking (`UX AUDIT SCORE`). Classes: `ux-scene__h`, `ux-scene__b`, `ux-scene__bb`, `ux-scene__a` |
| Signal colors | Alert `#E5484D` / `#C62F35`, success `#40B924` with chip `#E4F5D4` and text `#22661A`, data `#00BFF2`. Tokens: `--ux-g-*`. Only inside scenes |
| Motion | At most the marker pulse (`.ux-scene__pulse`), off for reduced motion |

**The story inside a scene reads in three beats, left to right or top to bottom:** where it hurts (the frame with the flagged problem), why (a finding or hypothesis card), what changed (a score, a result, a decision). Examples from the board:

| Service | Beats |
|---|---|
| UX Audit | Score chip (62, Needs work) · store page with the hidden shipping cost flagged · findings card Surface, Journey, Behavior, Business with the last one highlighted |
| Conversion Optimization | Funnel chart with the biggest drop flagged · long sign up form flagged · Hypothesis card and A/B result card (variant B wins) |
| Design Systems | A prompt to a design agent · agent checklist connected to the design system · the generated pricing card selected on a canvas |
| UX Strategy Workshop | Board with Problem, Journey, Priorities columns · sticky notes with votes · collaborator cursors (Designer, Sales Lead, Product Owner) |

Numbers in a drawn scene are illustrative. Never use a real client name, logo or result in one, and say "Illustrative" in the `aria-label`.

### Building a new drawn scene

1. Copy `_scene-cro.html`, rename the ids (`ux-<name>-…`) so two scenes can share a page.
2. Write the three beats in words first. Cut anything that is not one of them.
3. Keep the panel, glows, shadows and type classes. Replace the context layer and cards.
4. Keep 20px minimum from the panel edges for anything that is not meant to bleed; let the browser frame bleed off the bottom or right edge, as on the board.
5. Write the `aria-label` as one sentence that says what the scene shows.
6. Compare at 100% with `reference/graphics/scene-*.webp`: same density, same contrast, nothing smaller than 8px text.

## 7. Family 5: mini scenes (257 x 200)

- **Where:** a row of four, under a High weight service that has distinct parts (AI Design for B2B Products: Agent Experience, Interface Design, Conversational Design, Trust and Transparency). Each sits above its title (Aeonik Medium 25) and two to three lines of Manrope 18. Reference: `reference/graphics/mini-scenes-ai-design.webp`.
- **Example to copy:** `src/components/graphic/_scene-mini-trust.html`.
- **Recipe:** 257 x 200, radius 8, base `--ux-gradient-scene-mini` (`#0F1F3D` to `#070D1C`); two blurred ellipses (blur 24) in one hue family, a large one bottom left at 70 to 80% and a small one top right at 40 to 55%; one white card (radius 12) centered with about 23px around it, showing the capability in a single moment (a plan with an approval, a chart with a copilot note, a voice orb with a waveform, a log of what the AI did with Undo).
- **Hues, one per card in a row:** violet `#6D5BF5` with blue `#3B82F6`; blue `#2E6BD8` with aqua `#00BFF2`; magenta `#B23FD0` with purple `#6D28D9`; teal `#0F9A96` with `#14B8A6`. Product accent inside cards: `#5B4BDB`. These hues belong to drawn product UI, never to the page.
- All four in a row share the same base, card size and type sizes; only the hue and the moment change.

## 8. Family 6: image boxes (placeholders)

**Rule: wherever a page needs a client mockup, a screenshot of client work, a photo or a blog cover, add a placeholder, never the image.** Do not copy client mockups from the repo, Figma or the live site into a new section, do not generate a picture, do not use stock, and do not draw a substitute. Put an image box that reserves the exact space and says what goes there. The team adds the real image later. Approved sections reused whole (outcomes, industry cards, story cards) keep their existing images; the rule is for anything new.



```html
<!-- @include partials/elements/placeholder.html label="Blog cover, 336 x 216: editorial 3D still life, one object, soft studio light" -->
```

(In the old system this was `.ux-image-box`. The ratio column below maps to `uxt-placeholder-square`, `-wide` (16:9), `-tall` (4:5) or the default 3:2; any other exact size goes in the page's PART.)

| Where | Size and ratio class | What the label describes | Reference |
|---|---|---|---|
| Outcome card, lower band | 585 x 283, `--outcome` | Real product on phones or a laptop over the client's brand gradient band | `image-outcome-cards.webp` |
| Industry card | 437 x 377 open, 224 x 377 closed, `--industry`, `--industry-narrow` | Real client screen in a phone or browser over an abstract colored backdrop | `image-industry-cards.webp` |
| Blog and insight cover | 336 x 216, radius 6, `--blog` | Editorial 3D still life: one object or scene, one dominant color, soft studio light, no text | `image-blog-covers.webp` |
| Service scene with client work | 518 x 518, radius 8, `--scene` | A dashboard, site or app screen in a browser, laptop or phone frame on a dark panel | `scene-product-app-*.webp`, `scene-web-marketing.webp` |
| People, founder, team | `--portrait` or as the component sets | Real photos with names; founder only in the booking section | Approved pages |
| Featured video still | `--wide` | Real still from the client video | Homepage |

The label is Besley 15 Steel, centered, and names the size and the content in a few words (for example "Service scene, 518 x 518: SaaS dashboard in a laptop frame on a dark panel"). No client names in the label. The team swaps the box for the image.

## 9. Gradients and graphics

The page rules (no gradient filled content cards, never a gradient on a gradient, LLM.md 8.5) govern surfaces and cards. Inside a graphic:

- The single G4 accent fill in icons and spot illustrations is allowed; it is what makes them UXTeam.
- The 56px tint tile is an icon accent, not a card.
- Scene and mini scene panels carry their own dark base and glows. They are images, so they may sit on white sections only, never on Warm Glow or Deep Navy bands.
- Cards inside scenes are white. Never put a gradient filled card inside a scene.

## 10. Checklist before you hand over

- [ ] The section's job decided the family (section 1). Process and approach sections have no scene or mockup.
- [ ] One family, one size per section; all items in a set drawn the same way.
- [ ] Utility icons are stock Phosphor Light inlined with `@icon`; anchor icons are curated in the same line style (4.5); one approach per section.
- [ ] Every drawn graphic is SVG with Navy 1.5 lines, one G4 accent at most, no text in icons or spot illustrations.
- [ ] New icons and spot illustrations sit beside the existing ones without standing out.
- [ ] Scenes tell three beats, use invented names, say "Illustrative" in the label, and sit on a white section.
- [ ] No client mockup, screenshot, photo or cover was added; each one is an image box with a clear label.
- [ ] Decorative graphics have `alt=""` or `aria-hidden`; scenes have one `role="img"` with an `aria-label`.

## 11. Files

| Path | What |
|---|---|
| `reference/graphics/*.webp` | Figma screenshots of every graphic on the board |
| `assets/icons/process/*.svg` | Family 1 |
| `assets/icons/phosphor/` | Family 2 source: Phosphor Light (1,512 icons), `catalog.json` for search, license, readme |
| `scripts/icon.mjs` | `npm run icon -- <word>`: find a Phosphor icon |
| `assets/icons/line/*.svg` | Family 2, the 32px icons from the Figma board, and the template for drawing or curating an icon |
| `assets/icons/custom/` | Curated 32px icons made for a section (4.5) |
| `assets/icons/audience-*.svg` | Family 2, white icons for Navy tiles |
| `assets/icons/industry-*.svg` | Family 2, 24px Steel meta icons |
| `assets/graphics/spot/*.svg` | Family 3 spot illustrations and template |
| `src/components/graphic/graphic.css` | Tiles, meta list, spot panel, topic tile, scene frame, image box |
| `src/components/graphic/_topic-tile.html` | Topic tile partial |
| `src/components/graphic/_scene-cro.html` | Drawn product scene example |
| `src/components/graphic/_scene-mini-trust.html` | Mini scene example |
| `src/components/graphic/_scene-ux-audit.html` | Product scene: UX Audit (score, flagged product page, findings from surface to business), from Figma `2638:17184`, photos redrawn |
| `src/components/graphic/_scene-mini-finding-*.html` | Mini scenes: four sample findings (checkout, sign up, pricing, AI source), one hue pair each |
| `src/tokens/tokens.json` (`color.graphic`, `shadow.scene-*`, `gradient.g6-icon-tile`, `gradient.scene-mini`) | Graphic only tokens |
