# Outcomes (SL-20) · creative reference

**Figma:** homepage `1968:7516` (header) and `1968:7648` (cards). Screenshot: `desktop.webp`. Tablet and mobile: `reference/pages/homepage-tablet.webp` and `homepage-mobile.webp`.

**Business point:** UXTeam's work moves real metrics. This is the first proof a visitor sees after the hero.

**Why it looks this way**
- Two white cards, so each result gets room. The lower band carries the client's own brand gradient, which makes the result feel like the client's, not ours.
- The number leads: before and after (4.0% → 5.4%) set large, with what it measures beneath.
- A device mockup bleeds out of the band to show the real product behind the number.
- The cards sit right under the hero, overlapping where the dark fade turns white.

**What can vary**
- The client, logo, headline, metric, caption, band gradient (from the client's brand) and mockup.
- Mockup position, through the CSS variables on each card (`--mock-*`).

**What must not change**
- Two cards side by side on desktop, one column on tablet and mobile.
- White card, 1px Steel border, radius 8, no shadow.
- The metric always says what it measures and the period. Only approved results (LLM.md section 4).
- One text link per card ("Read Case").
