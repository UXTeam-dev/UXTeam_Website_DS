# Sections and elements

Every reusable piece of markup, where it works and how to use it. All of it is the developers' markup from the live site. Copy a section and change only text, links and images; keep every class and the structure. Class rules: [CSS-GUIDE.md](CSS-GUIDE.md). Every class: [CLASS-REGISTRY.md](CLASS-REGISTRY.md).

Include a partial with `<!-- @include partials/… key="value" -->` (paths from `src/`). Fields with a default are optional. Section partials have no fields: include them to get the exact live section, or copy the file's markup into the page and edit the content.

"Works inside" is the wrapper the styles need. Every page wrapper starts with `uxt-home`, so `.uxt-home` sections work on every page.

---

## Elements (`src/partials/elements/`)

| Partial | What it is | Fields |
|---|---|---|
| `button.html` | Arrow Glide button as a link | `type` primary, secondary, subtle, glass (default primary) · `mod` `uxt-button-dark` on dark backgrounds · `label` · `href` (default `#book-call`) |
| `button-in-card.html` | The same button as a `<span>` inside a card that is a link. The card gets `uxt-button-trigger` | `type` (default secondary) · `mod` · `label` |
| `button-icon.html` | Round arrow only, inside a card that is a link | `mod` `uxt-button-dark` or `uxt-button-diagonal` |
| `heading.html` | Section heading: eyebrow + H2 | `sub` · `title` · `underline` sky-blue or white · `white` `uxt-white` on dark |
| `heading-intro.html` | Section heading with an intro line | as above + `intro` · `size` `uxt-p-sm` for 18px |
| `faq-item.html`, `faq-item-open.html` | One FAQ question (closed, or the one that starts open) | `n` unique number · `q` · `a` |
| `center-cta.html` | Centered button under a section (What we do) | `label` · `href` |
| `placeholder.html` | Labeled image box where a client image will go (PART S) | `label` · `ratio` empty (3:2), `uxt-placeholder-square`, `-wide`, `-tall` |

Icons: `<!-- @icon name size="32" class="uxt-…" -->` inlines a Phosphor Light icon (`set="custom"` for `assets/icons/custom/`). Find names with `npm run icon -- <word>`.

## Sections (`src/partials/sections/`)

| Partial | Section | Works inside | Classes to know |
|---|---|---|---|
| `hero.html` | Dark display hero: H1, sub, one CTA, logo strip | `.uxt-home` | `uxt-hero`, `uxt-hero-content` |
| `logos.html` | Trusted by logo strip, auto scrolling. **Never edit** | `.uxt-home` | `uxt-logos`, `uxt-logos-track` |
| `outcomes.html` | Two outcome cards with metrics | `.uxt-home` | `uxt-case-card` + `uxt-case-green` or `uxt-case-purple` |
| `stories.html` | Featured video story + three story cards | `.uxt-home` | `uxt-story-feature`, `uxt-story-card` (a link, with `uxt-button-trigger`) |
| `approach-stats.html` | Three approach columns + stats row | `.uxt-home` | `uxt-approach-item`, `uxt-stat-item` |
| `services.html` | Grouped service list on the dark band | `.uxt-home` | `uxt-service-row`, `uxt-service-card`, `uxt-service-featured` |
| `process.html` | Process steps with icons | `.uxt-home` | `uxt-step`, `uxt-step-icon` |
| `industries.html` | Expanding industry rows | `.uxt-home` | `uxt-industry`, `uxt-industry-img` |
| `engage.html` | Three ways to work | `.uxt-home` | `uxt-engage-item` |
| `insights.html` | Three insight cards | `.uxt-home` | `uxt-insight-card` |
| `faq.html` | FAQ, two columns | `.uxt-home` | `uxt-faq-col`, `uxt-faq-item` (use `elements/faq-item.html`) |
| `capabilities.html` | Sticky tabs + stacked capability cards | `.uxt-wwd` only | `uxt-cap-tab`, `uxt-cap-card`. Needs `capabilities-script.html` once at the end of the page |
| `why.html` | Why choose UXTeam, four icon columns | `.uxt-wwd` only | `uxt-why-item`, `uxt-why-icon` |

A section that works only inside `.uxt-wwd` or `.uxt-about` is used on another page only after its styles move to a shared PART (CSS-GUIDE 5.4).

## Scripts (`src/partials/*-script.html`)

| Partial | What it is |
|---|---|
| `capabilities-script.html` | What we do sticky capability cards (`.uxt-wwd`) |
| `contact-form-script.html` | Contact page form (`#uxt-contact-form`): the booking card script with its selectors changed. For the developers to confirm |
| `contact-clock-script.html` | Contact page office clocks: turns the hands to each office's local time and updates the UTC offset. For the developers to confirm |

## Global (`src/global/`)

| File | What it is |
|---|---|
| `footer-global.html` | Booking card (`#book-call`, form and founder card) and the main footer. The developers' footer global section; never part of a page |

## Starter

`src/starters/page.html`: wrapper, hero with eyebrow, one section shell. Copy it to start a page.

## Not built as uxt- yet

Listing, case study, article and light heroes, the detail page kit, numbers band, expectations row, topic tiles, service row with scene, mini scenes, filter chips. Their designs and the old markup are in `legacy/` (old field list: `legacy/docs/COMPONENTS.md`). Each is built as a partial with a new PART the first time a page needs it (LLM.md section 14).
