# Components and sections

Every reusable piece, where it lives, and how to use it. See them all rendered at `/library/` after `npm run build`.

Include a partial with `<!-- @include path key="value" -->` (paths from `src/`). Parameters with a default are optional.

---

## Base classes (src/base)

| Class | What it does |
|---|---|
| `.ux-container` | 1200 content width with the page margin (120 / 30 / 15) |
| `.ux-container--narrow` | Narrower column for text heavy blocks |
| `.ux-section` + `--pt-80/100/120/160/40/0`, `--pb-80/100/120/180/40/0` | Section with top and bottom padding |
| `.ux-section__head`, `--40`, `--60` | Space between a section header and its content (50 by default) |
| `.ux-grid` + `--2`, `--3`, `--4`, `--gap-24`, `--gap-32` | Card grids, gap 30 by default, collapse on tablet and mobile |
| `.ux-stack` (set `--ux-stack-gap`) | Vertical stack with an even gap |
| `.ux-center`, `.ux-hairline` | Center a row, 1px divider |
| `.ux-mt-40`, `.ux-mt-48` | Space above a closing row under a grid (a button row, a second grid) |
| `.ux-bg-warm-glow`, `.ux-bg-deep-navy`, `.ux-bg-hero-light` | Section backgrounds |
| `.ux-h1-display`, `.ux-h1`, `.ux-h2`, `.ux-h2-related`, `.ux-h3`, `.ux-h3-small` | Headings |
| `.ux-body-26/20/18/16`, `.ux-label`, `.ux-accent`, `.ux-prose` | Body text, labels, Besley accent, long form text |
| `.ux-highlight` | G4 gradient on a word inside a heading |
| `.ux-sr-only` | Visually hidden, read by screen readers |

---

## Components (src/components)

### Button: `button/`
Figma "CTA / 01 Arrow Glide" (1271:70). All variants: `button/button.html`.

```html
<!-- @include components/button/_button.html class="ux-btn--primary" label="Book a Discovery Call" href="#book" -->
```
| Param | Default | Notes |
|---|---|---|
| `class` | none | `ux-btn--primary`, `--secondary`, `--glass`, `--subtle`, `--icon`, add `ux-btn--on-dark` on dark surfaces |
| `label` | Book a Discovery Call | |
| `href` | #book | |

### Eyebrow: `eyebrow/`
`<span class="ux-eyebrow">Measured results</span>`. Add `ux-eyebrow--on-dark` on dark backgrounds.

### Section header: `section-header/`
`.ux-section-header` with `.ux-eyebrow`, `.ux-h2.ux-section-header__title` and optional `.ux-section-header__intro`. Variants `--on-dark`, `--start` (left aligned), `--gap-16`. Intro variants `__intro--narrow` (760 wide), `__intro--flush` (no top margin).

### Story card: `story-card/`
```html
<!-- @include components/story-card/_story-card.html logo="rbbi.png" logo-w="57" logo-h="57" logo-alt="RBBi" title="…" meta="Digital Experience Agency" place="Dubai" href="success-story-squaircle.html" -->
```
| Param | Default | Notes |
|---|---|---|
| `logo` | required | File in `assets/logos/clients/` |
| `logo-w`, `logo-h`, `logo-alt` | required | Logo size and alt text |
| `title`, `meta`, `place` | required | |
| `href` | # | |
| `mod` | none | `ux-story-card--compact` for the 25px title (D2C list) |

### Blog card: `blog-card/`
```html
<!-- @include components/blog-card/_blog-card.html category="CRO" date="18 Sep 26" title="…" image="ux-audit-findings" -->
```
`image` is a WebP file name (no extension) in `assets/images/insights/`. `category` also feeds the filter bar. `href` defaults to `#`.

### FAQ: `faq/`
Wrap items in `<div class="ux-faq" data-ux-faq>`. One item open at a time. Two column homepage layout: `faq/faq.html`. Single column: add `ux-faq--single`.
```html
<!-- @include components/faq/_item.html q="What is UXTeam?" a="A UX-led design studio for B2B teams." open="is-open" -->
```
`a` defaults to "Add answer here." (the Figma placeholder). `open="is-open"` opens it on load.

### Person: `person/`
```html
<!-- @include components/person/_person.html name="Saravanan Vijayakumar" photo="saravanan-vijayakumar" linkedin="https://…" role1="Founder and CEO," role2="…" role3="USA · India" mod="ux-person--on-dark" -->
```
`photo` is a WebP name in `assets/images/people/`.

### Q&A card: `detail-blocks/`
`<!-- @include components/detail-blocks/_qa-card.html q="…" a="…" -->`. The same folder holds the detail page blocks: key value list (`.ux-kv`), stat strip, gradient cards (`.ux-g-card`), numbered rows, quote, about block, author and share.

### Other components

| Folder | Classes | Notes |
|---|---|---|
| `stat/` | `.ux-stats`, `.ux-stat` | `stat/stat.html` is the 08+ / 50+ / 450+ row |
| `chip/` | `.ux-chip-row`, `.ux-chip`, `.ux-tag`, `.ux-icon-tag` | Active: `.is-active` or `aria-pressed="true"` |
| `form-field/` | `.ux-field`, `__label`, `__input`, `__error` | Used in the booking form |
| `logo-tile/` | `.ux-logo-tile` | White tile for client logos |
| `social-link/` | `.ux-social` | 40px circles in the footer |
| `outcome-card/` | `.ux-outcome-card` | Set `--band` (brand gradient) and `--mock-*` (mockup position) |
| `video-card/` | `.ux-video-card`, `.ux-play` | `data-video` (MP4 URL) or `data-embed` (YouTube or Vimeo embed URL) |
| `service-card/` | `.ux-service-card`, `.ux-service-stack` | Dark service rows |
| `industry-card/` | `.ux-industry` | `industry-card/industry-card.html`, opens on hover or focus |
| `toc/` | `.ux-toc`, `.ux-section-menu` | Sticky rail on desktop, floating bottom menu on tablet and mobile |

---

## Sections (src/sections)

| Section | Include or class | Params |
|---|---|---|
| Site header | `sections/site-header/site-header.html` | `theme` dark or light, `cta` ux-btn--glass or ux-btn--primary, `bordered` (pass empty on the homepage) |
| Site footer | `sections/site-footer/site-footer.html` | none |
| Booking card, inner pages | `sections/booking-cta/booking-cta.html` | `mod` (ux-booking--flush removes the top padding) |
| Booking card, homepage and hub pages | `sections/booking-cta/booking-cta-home.html` | `mod`. Which version a page uses: LLM.md 15.5 |
| Featured story (video) | `sections/featured-story/featured-story.html` | none |
| Outcomes | `sections/outcomes/outcomes.html` | none |
| Services | `sections/services/services.html` | none |
| Process | `sections/process/process.html` | none |
| Engagement models | `sections/engagement/engagement.html` | none |
| Logo marquee | `sections/logo-marquee/logo-marquee.html` | none |
| Home hero | `.ux-hero-home` | see `pages/index.html` |
| Listing hero | `.ux-hero-listing` | set `--ux-hero-bg-height` for the gradient height |
| Case study hero | `.ux-hero-case` | see `pages/success-story-squaircle.html` |
| Article hero | `.ux-hero-article` | see `pages/insight-content-strategy.html` |
| Light hero | `.ux-hero-light` | see `pages/about.html` |
| Filter bar | `.ux-filter-bar` + chips with `data-filter` | see `pages/insights.html` |
| Approach (principles) | `.ux-principles`, `.ux-principle` | `--home` for homepage offsets |
| Detail layout | `.ux-detail-section`, `.ux-detail` | TOC rail + 810 content column |
| Article body | `.ux-article`, `__block`, `__text`, `__list`, `__figure`, `--framed` | |
| Related row | `.ux-related__title` + `.ux-grid--3` | |
| Logo grid + presence | `.ux-logo-grid`, `.ux-presence` | About |
| Story split | `.ux-story-split`, `.ux-founder-card` | About |
| Team | `.ux-team`, `.ux-leaders` | About |
| Beliefs | `.ux-beliefs` + `.ux-principles` | About |

## Templates (src/templates)

| File | Params |
|---|---|
| `_head.html` | `title`, `description` |
| `_scripts.html` | none |
