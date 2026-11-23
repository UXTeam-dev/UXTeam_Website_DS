# Design rules

The rules from the **Design System Guideline** page in Figma (2351:577), written for code. The Figma page is the source of truth. If the two ever disagree, Figma wins and this file gets updated.

## Grid and layout

| Rule | In code |
|---|---|
| Desktop frame 1440, 12 columns, 30 gutter, content 1200 from x120 to x1320 | `.ux-container` |
| 2 up: 585 + 30 + 585 | `.ux-grid.ux-grid--2` |
| 3 up: 380 each | `.ux-grid.ux-grid--3` |
| Detail pages: TOC rail 210, content column 810 | `.ux-detail` |
| Booking card and industries row are 1204 wide, 2px outside the grid | built into those sections |
| Card gap is 30 by default, 24 or 32 only where needed | `.ux-grid` (30), `--gap-24`, `--gap-32` |
| Section intros (eyebrow + H2) are centered. Cards, columns and article text are left aligned | `.ux-section-header`, `--start` to left align |

## Spacing

| Rule | In code |
|---|---|
| Sections have 80, 100 or 120 top and bottom padding and touch each other (0 gap) | `.ux-section--pt-80/100/120`, `--pb-80/100/120` |
| The space between two sections is one section's bottom padding plus the next one's top padding | pick values for rhythm, for example 100 + 120 |
| Eyebrow to title: 10 | `.ux-section-header` gap |
| Title to content: 50 to 70 | `.ux-section__head` (50), `--60`, `--40` |
| Inner page hero starts 100 below the header (188 to 192 from the top) | the hero sections |
| No spacer elements. Gaps come from padding and gap | never add empty divs for space |

Section padding shrinks on smaller screens: 120 becomes 90 on tablet and 60 on mobile, 100 becomes 80 and 56, 80 becomes 64 and 48.

## Type

- Three fonts only: **Aeonik** (headings), **Manrope** (body, labels), **Besley** (eyebrows and accents).
- Eyebrows are always Besley, uppercase, with the 2px Sky line under them, matching the text width.
- Inner page H1s are Aeonik Medium 64. The homepage 90 display H1 is a one page decision.
- The G4 gradient highlight in a heading is optional and only for words that need attention: `.ux-highlight`.
- Key numbers may use bigger Besley sizes than the text styles.
- Never use Besley for headings or body copy.

## Color and gradients

- Use only the color tokens. Never flat black or new background colors.
- Gradients are transitions around dark sections, and backgrounds only for important sections.
- One Warm Glow band (`.ux-bg-warm-glow`) and one dark navy band (`.ux-bg-deep-navy`) at most on long pages. Never stack two dark bands.
- Never use G4 for large areas. Never put body text in Aqua or Peach on white.
- Text contrast at least 4.5 to 1, including grey text and captions.

## Shape and depth

- Cards are flat: white, 1px Steel border, radius 8, no shadow.
- Use hairlines (`.ux-hairline`) to structure text heavy layouts before adding boxes.
- The only effects are the glass play button and soft shadows on device mockups. No drop shadows on cards, buttons or sections.

## Buttons and CTAs

- Buttons only come from **CTA / 01 Arrow Glide**: `.ux-btn` with `--primary`, `--secondary`, `--glass`, `--subtle` or `--icon`, plus `--on-dark` on dark surfaces.
- Every CTA is a pill with an arrow circle, or a text link with an arrow circle. No square or outline buttons.
- "Book a Discovery Call" is the main action on every page, in title case.
- One main CTA per screen. Primary is for the hero and the booking form. Secondary links belong to a card or column.
- Never "Contact us" or "Get a quote". No exclamation marks.

## Pages

- Every page ends with the booking card and footer, except the Insights listing and detail (footer only, on purpose).
- The header can be dark or light: `theme="dark"` or `theme="light"`.
- When the header is dark, the first block after the hero overlaps the gradient fade.
- Open each section with an eyebrow and a short H2.
- Use the text from the content file. Do not write new page copy.
- Every answer, definition and number lives in the page HTML as real text.

## Motion

All timings come from the Figma prototypes. Everything respects `prefers-reduced-motion`.

| Element | Timing |
|---|---|
| CTA arrow glide | 350ms ease out |
| Blog card, service card, social icons | 300ms ease out (dissolve) |
| Industry cards | 450ms ease in out |
| FAQ open and close | 420ms height, 300ms answer fade and icon change |
| Logo marquee | continuous loop, pauses on hover |

## Responsive

- Tablet frame 768 with a 30 side margin, mobile 375 with 15. Header is 70 high on both.
- Every hover has a tap or keyboard equivalent.
- On tablet and mobile the detail page TOC becomes a floating menu at the bottom of the screen.
- Tables scroll inside their own container on mobile; timelines stack.
