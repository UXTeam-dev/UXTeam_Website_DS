# CSS and class guide (mandatory)

**Every page and every line of CSS in this repo follows this guide. `npm run check` enforces it, and a page that fails the check is not done.** It applies to every person and every AI tool (Claude, Codex, Cursor, Gemini, Copilot or any other).

The goal: a page built here can be pasted into WordPress **as it is**, with no `<style>` block to remove, because it uses only the stylesheet the developers already run on the live site.

---

## 1. The system in one minute

The live site (new.ux.team) runs on the Salient WordPress theme. The developers built it like this:

| Part of the page | Where it lives in WordPress | Where it lives in this repo |
|---|---|---|
| Header | Salient's own header | not in the repo (the preview shows a stand-in) |
| Page body | one Salient **Raw HTML** element per page | `src/pages/<page>.html` → `dist/wordpress/<page>.html` |
| Booking card ("Book a Discovery Call") and footer | the **footer global section**, on every page | `src/global/footer-global.html` |
| All CSS | **Salient > Custom CSS**, one file in PARTs A to R | `src/css/uxteam-site.css` (byte for byte copy) |
| New CSS written here | added after PART V | `src/css/parts/part-<letter>-<scope>.css` → `dist/css/uxteam-site-additions.css` |

**The developers' files are the source of truth.** `uxteam-site.css`, `homepage.html`, `what-we-do.html` and `footer-global.html` are copies of what the developers handed over (25 Nov 2026). `npm run check` fails if any of them is edited (fingerprints in `src/css/source.lock.json`).

**The class list is generated, never written by hand.** `npm run classes` reads the stylesheet and writes [CLASS-REGISTRY.md](CLASS-REGISTRY.md) and `docs/classes.json`. A page may use only classes in that list.

## 2. One stylesheet, no page CSS

1. **No `<style>` blocks, no `style=""` attributes, no `<link rel="stylesheet">`** in any page or partial. Not even "just for now".
2. **No classes from anywhere else.** Not Tailwind, not Bootstrap (`btn`, `row`, `col-*`), not the old `ux-` system, not invented names.
3. **No Salient element classes** in a page body (`nectar-*`, `wpb_*`, `vc_*`, `sub-title`, `container`, `row-bg`). PARTs I, J, K and O restyle those, but Salient adds them, so they never appear in a Raw HTML body.
4. If something cannot be built from existing classes, add a new PART (section 5). The page then uses the new classes like any other.

## 3. Page structure

### 3.1 The wrapper

The page body is one element: the wrapper. Everything goes inside it.

```html
<div class="uxt-home">            <!-- homepage -->
<div class="uxt-home uxt-wwd">    <!-- What we do -->
<div class="uxt-home uxt-about">  <!-- About -->
<div class="uxt-home uxt-<key>">  <!-- any new page -->
```

- Always `uxt-home` first: most section styles (PART C, G, H) only work inside it, and every inner page reuses them.
- Then the page key, a short lowercase word (`uxt-wwd`, `uxt-about`, `uxt-industry`). The page's own PART is scoped to it.
- Start from `src/starters/page.html`.

### 3.2 What never goes in a page

- **The header.** Salient renders it. PART O hides it on scroll down.
- **The booking card and the footer.** They come from the footer global section on every page. A button that should open the booking card links to `#book-call`. Never add a second booking card and never use `id="book-call"` in a page.
- **`<header>`, `<footer>`, `<main>`, `<html>`, `<head>`, `<body>`.** The page is a fragment.

### 3.3 Scoped classes

Each class in the registry shows where it works:

- **anywhere**: PART B classes (`uxt-h1`, `uxt-p`, `uxt-button`, `uxt-full`, `uxt-container`, `uxt-section`, `uxt-heading`).
- **inside `.uxt-home`**: homepage section classes (`uxt-hero`, `uxt-story-card`, `uxt-faq-item`). Fine on every page, because every wrapper starts with `uxt-home`.
- **inside `.uxt-wwd`** or **`.uxt-about`**: classes that belong to one page. Use them on another page only by moving the styles into a shared PART (section 5.4), never by copying the wrapper class onto a different page.

## 4. Existing elements and their classes

Use exactly these. The partials in `src/partials/` produce the developers' markup; copy them and change only text, links and images.

| Element | Classes | Partial |
|---|---|---|
| Full width band | `uxt-full uxt-section` + a section name (`uxt-outcomes`) | any section partial |
| Content box (1200 wide, 120 side padding) | `uxt-container` | any section partial |
| Section heading block | `uxt-heading` > `uxt-subheading underline-sky-blue` + `uxt-h2` | `elements/heading.html`, `elements/heading-intro.html` |
| White text on dark | add `uxt-white` to the text class; eyebrow uses `underline-white` | `heading.html` with `white="uxt-white" underline="white"` |
| H1 | `uxt-h1` (one per page, in the hero) | starter |
| H2, H3 | `uxt-h2`, `uxt-h3`, `uxt-h3-sm` | |
| Body text | `uxt-p` (20), `uxt-p uxt-p-lg` (26), `uxt-p uxt-p-sm` (18), `uxt-p uxt-p-xs` (16) | |
| Label, accent | `uxt-label` (16 semibold), `uxt-accent` (Besley 18) | |
| Hero (dark, centered) | `uxt-full uxt-section uxt-hero` > `uxt-container` > `uxt-hero-content` | `sections/hero.html` |
| Trusted by logo strip | `uxt-logos` (fixed) | `sections/logos.html` |
| Button | `uxt-button` + one type, see 4.3 | `elements/button.html` |
| Outcome cards | `uxt-outcomes`, `uxt-case-grid`, `uxt-case-card` + `uxt-case-green` or `uxt-case-purple` | `sections/outcomes.html` |
| Story cards (featured + grid) | `uxt-stories`, `uxt-story-feature`, `uxt-story-grid`, `uxt-story-card` | `sections/stories.html` |
| Approach columns + stats | `uxt-approach`, `uxt-approach-grid`, `uxt-stats`, `uxt-stat-item` | `sections/approach-stats.html` |
| Services (dark band) | `uxt-services`, `uxt-service-groups`, `uxt-service-row`, `uxt-service-card` | `sections/services.html` |
| Process steps | `uxt-process`, `uxt-steps`, `uxt-step`, `uxt-step-icon` | `sections/process.html` |
| Industries (expanding) | `uxt-industries`, `uxt-industry-list`, `uxt-industry` | `sections/industries.html` |
| Ways to work (3 columns) | `uxt-engage`, `uxt-engage-grid`, `uxt-engage-item` | `sections/engage.html` |
| Insight cards | `uxt-insights`, `uxt-insight-grid`, `uxt-insight-card` | `sections/insights.html` |
| FAQ | `uxt-faq`, `uxt-faq-grid`, `uxt-faq-col`, `uxt-faq-list`, `uxt-faq-item` | `sections/faq.html`, `elements/faq-item.html` |
| Capabilities, sticky tabs (What we do only) | `uxt-wwd-cap`, `uxt-cap-*` | `sections/capabilities.html` + `capabilities-script.html` |
| Why columns with icons (What we do only) | `uxt-wwd-why`, `uxt-why-grid`, `uxt-why-item`, `uxt-why-icon` | `sections/why.html` |
| Centered button under a section (What we do only) | `uxt-wwd-center` | `elements/center-cta.html` |
| About page sections | `uxt-about-*` | markup not in the repo yet ([OPEN-ITEMS](OPEN-ITEMS.md)) |

### 4.1 Old Salient classes are never used

PART A is the theme's old CSS (`heading-1`, `font-18`, `btn-1` and about 300 more). It stays live so old pages keep working, but **no new page uses it**. The registry lists these classes under "Not allowed" and the check fails on them. Use the PART B class for the same thing.

### 4.2 Text and headings

- The tag sets the outline, the class sets the look: every `h1` to `h6` has one of `uxt-h1`, `uxt-h2`, `uxt-h3`, `uxt-h3-sm` (an `h4` that looks like H3 Small is `<h4 class="uxt-h3-sm">`).
- **Exactly one H1 per page,** in the hero.
- **Every H1 and H2 has an eyebrow right above it:** `<p class="uxt-subheading underline-sky-blue">` (light) or `underline-white uxt-white` (dark). Write one if the content has none.
- No font sizes, colors or weights on text: the classes carry the responsive sizes (H1 90/64/44, H2 50/40/32, H3 30/26/22, H3 Small 25/22/20, Body 26/22/18 and 20/18/17; tablet up to 999px, mobile up to 767px).

### 4.3 Buttons

The developers' button (Figma CTA / 01 Arrow Glide). One base class, one type:

| Type | Light background | Dark background |
|---|---|---|
| Primary | `uxt-button uxt-button-primary` | `+ uxt-button-dark` |
| Secondary (link) | `uxt-button uxt-button-secondary` | `+ uxt-button-dark` |
| Secondary subtle | | `uxt-button uxt-button-subtle` (dark only) |
| Glass | | `uxt-button uxt-button-glass` (dark only) |
| Icon only | `uxt-button uxt-button-icon` | `+ uxt-button-dark` |

```html
<a href="#book-call" class="uxt-button uxt-button-primary">
  <span class="uxt-button-label">Book a Discovery Call</span>
  <span class="uxt-button-circle">
    <svg class="uxt-button-arrow" …/>   <!-- two arrows, always -->
    <svg class="uxt-button-arrow" …/>
  </span>
</a>
```

- Always the two arrow SVGs (they make the glide). Use `partials/elements/button.html` rather than typing it.
- **A card that is a link** carries the button as a `<span aria-hidden="true">` (`elements/button-in-card.html` or `button-icon.html`) and the card gets `uxt-button-trigger`, so hovering the card plays the glide. Never a link inside a link.
- An icon only button that is a link needs `aria-label`.
- `uxt-btn`, `uxt-link` and `uxt-arrow*` are an older button style still in PART B. Not used on any page; the check rejects them.

### 4.4 Fixed blocks

The logo strip (`sections/logos.html`) is included exactly as it is: same logos, same order, auto scrolling. The check compares it with the partial. The booking card and footer (section 3.2) are never in a page.

### 4.5 Icons and graphics

Icons are inline SVG with `fill="currentColor"` or `stroke="currentColor"`. Place Phosphor Light icons with `<!-- @icon name size="32" class="uxt-…" -->` (find names with `npm run icon -- <word>`; custom icons with `set="custom"`). The class on the icon must be a registry class. Which icon or graphic goes where: [GRAPHICS.md](GRAPHICS.md).

### 4.6 Scripts

A page may carry only the approved scripts in `src/partials/*-script.html` (today: the What we do capabilities script). The FAQ toggle and the header on scroll are site wide scripts the developers run. New behaviour is a request to the developers, never a `<script>` in a page.

## 5. New classes: the developers' way

Add CSS only when no existing class can carry the design. Then write it exactly as the developers write theirs.

### 5.1 Naming

- **`uxt-` prefix, lowercase, hyphens:** `uxt-<block>`, `uxt-<block>-<part>`. Pattern `^uxt-[a-z0-9]+(-[a-z0-9]+)*$`.
- **Page classes start with the page key:** `uxt-industry-grid`, `uxt-industry-card` on the industry page, as the developers did with `uxt-wwd-cap` and `uxt-about-hero`.
- **Variants are a second class,** never a modifier suffix: `uxt-case-card uxt-case-green`, `uxt-button uxt-button-dark`.
- **States are `is-*` or `has-*`:** `is-active`, `is-expanded`, `has-fit`.
- **No BEM** (`__`, `--`), no camelCase, no numbers for meaning (`uxt-card2`), no generic names (`uxt-box`, `uxt-wrapper`).
- Name for what it is (`uxt-industry-proof`), not how it looks (`uxt-blue-box`).

### 5.2 One file per PART

- `src/css/parts/part-<letter>-<scope>.css`, for example `part-s-industry.css`.
- Letters continue after the developers' last one: **S, T, U…** (the check rejects a letter already used).
- Import it in `src/css/uxteam-site-additions.css`: `@import "parts/part-s-industry.css";`

### 5.3 The PART header

Every part starts like the developers' parts:

```css
/* =====================================================================
   PART S | INDUSTRY PAGE  (Figma 2651:5337)
   HTML: src/pages/industry-b2b-saas-ai.html, wrapped in
         <div class="uxt-home uxt-industry">
   Scope: .uxt-industry
   Reuses the homepage styles (Part C). This part adds only what is new.
   ===================================================================== */
```

Required: the letter, a name, the Figma node, `HTML:` (where the markup is) and `Scope:`.

### 5.4 Scope

- **`Scope: .uxt-<key>`** (normal): every selector starts with the page wrapper, `.uxt-industry .uxt-industry-card { … }`. The part cannot change any other page.
- **`Scope: global`** (rare): a new element meant for many pages. It may only style **new** classes; it never restyles a class from `uxteam-site.css`. Agree it with the developers first.
- **Never change an existing class's look for everyone.** To adjust an existing section on one page, scope it: `.uxt-industry .uxt-process { … }`.
- Classes only: no IDs, no bare tags at the start of a selector.

### 5.5 Values

- **Colours:** `var(--uxt-color-heading)`, `--uxt-color-body`, `--uxt-color-navy`, `--uxt-color-border`, `--uxt-color-peach`, or a hex that PART B to R already uses. The check rejects any other hex.
- **Fonts:** only `var(--uxt-font-aeonik)`, `var(--uxt-font-manrope)`, `var(--uxt-font-besley)`.
- **Text sizes come from PART B classes.** Set a font size only for a kind of text the type table does not have (the check warns).
- **`!important`** is how the developers beat Salient's own CSS. Use it the same way on layout properties that Salient also sets; it is not an error.
- **Radius, borders, spacing:** reuse values from the closest developer section: cards 8px radius with `1px solid var(--uxt-color-border)`, section spacing from `uxt-section` (110px top and bottom, never a new padding), grid gaps 16, 20, 24, 32 or 40px.

### 5.6 Breakpoints

Only the site's: `max-width: 1280px`, `1024px`, `999px`, `767px` (fine tuning `450px`, `375px`), `min-width: 768px`, `1025px`, and `prefers-reduced-motion: reduce`. Text already switches at 999 and 767.

### 5.7 Steps

1. Check [CLASS-REGISTRY.md](CLASS-REGISTRY.md) once more: is there a class for this already?
2. Write the part (5.1 to 5.6) and import it.
3. `npm run classes`, `npm run build`, `npm run check`.
4. Add the part to the handover list in `CHANGELOG.md`.

## 6. Content inside the markup

### 6.1 Copy

House style: sentence case for copy, Title Case only where the developers use it (button labels such as "Book a Discovery Call", "Read Story"), American spelling, **no em or en dashes**. Copy rules: `docs/BRAND-GUIDE.md` and LLM.md sections 3 to 5.

### 6.2 Images

- Every `<img>` has `alt` (empty `alt=""` for decoration).
- Images live in the WordPress media library: `src="/wp-content/uploads/<year>/<month>/<file>"`. A new image that is not uploaded yet keeps a clear name and goes on the handover list. The preview loads them from new.ux.team.
- Never a real client mockup or screenshot that was not provided; leave a labeled placeholder and list it.
- Icons and graphics are SVG, never PNG or JPG.

### 6.3 Calls to action

The main CTA is **"Book a Discovery Call"** linking to `#book-call`. Never "Contact Us", "Get a Quote", "Get Started", "Click Here" or "Submit".

## 7. Handover to the developers

For every finished page, hand over:

1. `dist/wordpress/<page>.html`: paste into one Salient Raw HTML element. Nothing to remove.
2. `dist/css/uxteam-site-additions.css`, if the page added a PART: paste at the end of Salient > Custom CSS, after PART R.
3. The list of new images to upload, with their intended paths.
4. Anything that needs a script.

When the developers confirm a new PART is live, they send back their updated `uxteam-site.css` (section 8). The part then moves out of `src/css/parts/` and the additions file is empty again.

## 8. Syncing a new version from the developers

Only when the developers send updated files:

1. Replace the file in `src/` with theirs (CSS, page bodies or footer global section).
2. Update its fingerprint in `src/css/source.lock.json` and the `received` date.
3. Delete any part in `src/css/parts/` that is now inside `uxteam-site.css`.
4. `npm run classes`, `npm run build`, `npm run check`, add a line to `CHANGELOG.md`.

Never edit their files to make a page work. Write a new PART instead.

## 9. The old ux- system

Before the developers' CSS existed, this repo had its own `ux-` system (BEM classes, tokens). It now lives in `legacy/` and is **not used for new pages**. It still builds (`npm run legacy:build`) so its pages and demos can be looked at while they are converted.

Its designs that have no `uxt-` version yet (listing and detail pages, the About sections, the graphics kit, the UX Audit demo) are converted one at a time: each becomes a section in `src/partials/sections/` with a new PART, following this guide. Until then, use them only as visual references.

| Old (legacy) | Use now |
|---|---|
| `ux-btn ux-btn--primary` | `uxt-button uxt-button-primary` |
| `ux-section-header`, `ux-eyebrow` | `uxt-heading`, `uxt-subheading underline-…` |
| `ux-h1`, `ux-h2`, `ux-body-l` | `uxt-h1`, `uxt-h2`, `uxt-p uxt-p-lg` |
| `ux-container`, `ux-section` | `uxt-container`, `uxt-full uxt-section` |
| `sections/logo-marquee` | `partials/sections/logos.html` |
| `sections/page-end` (booking + footer) | footer global section (not in the page) |
| `components/faq` | `partials/sections/faq.html` |
| `sections/process`, `sections/engagement`, `sections/services` | `partials/sections/process.html`, `engage.html`, `services.html` |
| `var(--ux-*)` tokens | `var(--uxt-*)` and PART B values |
