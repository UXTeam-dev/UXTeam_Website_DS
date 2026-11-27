# Open items

Things that are placeholders, pending a decision, or waiting for a file. Remove a line when it is done.

## Needed from the developers

| Item | Why | Until then |
|---|---|---|
| `uxteam-about-us.html` (the About page body) | PART R (About) is live in the CSS, but its markup is not in the repo, so About sections cannot be reused | `uxt-about-*` classes are in the registry; build nothing on them until the markup arrives |
| The site wide scripts (FAQ toggle, header hide on scroll, anything else in the theme) | So previews behave like the live site and new pages rely only on what exists | The preview uses a stand-in FAQ script |
| Confirm the image paths in the footer global section (`UX-Team-Gray-logo.svg`, `UX-Team-bg-shape.svg`, `chintan_bhatt_founder_uxteam-web.webp`) | They came from a saved copy of the live page, so the folder `/wp-content/uploads/2026/10/` is a guess | Confirm in the WordPress media library |
| Aeonik font files, or confirmation the theme path `/wp-content/themes/salient/fonts/Aeonik/` stays | Previews outside WordPress fall back to Manrope | Headings show in Manrope in previews |
| What we do hero has no eyebrow above the H1 | LLM.md rule 20 (every hero has an eyebrow); `npm run check` warns on the developers' file | Raise with the developers; new pages must have one |
| Insights pages end with the footer only | The booking card is global; switching it off for Insights is a WordPress setting | Pages keep the global booking card |
| Contact page: switch off the footer global booking card | The Contact design (Figma 2771:18393) has its own form in the hero and its own closing card, then the footer | Pages keep the global booking card |
| Contact page form script (`src/partials/contact-form-script.html`) | The booking card script with only its selectors changed, for the hero form; posts to the same `uxt_discovery_call` action, then Calendly | Not live until the developers add it |
| Contact page header button | With the booking card off, the header's Book a Discovery Call (`#book-call`) needs to point to the hero form (`#contact-form`) on this page | Header link set by the developers |
| Agree PART W (Contact page) | New PART for `src/pages/contact.html` | In `dist/css/uxteam-site-additions.css`, not live yet |

## Waiting for files

| Item | Where it goes | Until then |
|---|---|---|
| Upload `assets/logos/clients/dxfactor.svg` and `voro-wordmark.svg` to `/wp-content/uploads/2026/11/` (or point to the files the About page already uses) | Contact page story card (DX Factor) and logo grid (VORO) | The paths in `src/pages/contact.html` assume 2026/11 |
| DX Factor success story link | Contact page story card | Links to `#` |
| Contact page step icons `assets/icons/process/review.svg`, `call.svg`, `proposal.svg` | Inline SVG in the page; upload them only if the developers prefer `<img>` as in the homepage How we work | Inline SVG works as it is |
| Featured story video (Brent Weaver, E2M) | The featured story in `src/partials/sections/stories.html` (the developers' markup) | The play button shows the still only |
| Calendly booking link | The booking form in the footer global section (developers) | As on the live site |
| LinkedIn URLs for people | Story and author links | Links point to `#` |
| Real links for cards | `href` on cards and buttons | Links point to `#` |

## Placeholder copy (as in Figma)


- FAQ answers: only "Can you share results and client work?" (homepage) and "What is UXTeam?" (About) have answers. The rest show the Figma placeholder "Add answer here."
- Homepage outcomes: both cards carry the same headline and numbers in Figma, and the 3motionAI name is still waiting for approval.
- Article "Mapping User Flows" reuses the landing page audit image in Figma; the Google Analytics screen capture is still to come.

## Not built as uxt- sections yet

Each is built as a partial with a new PART the first time a page needs it (LLM.md section 14, CSS-GUIDE section 5). Their designs live in Figma and in `legacy/` (the old ux- system).

- Listing, case study, article and light heroes; the detail page kit (TOC rail, content blocks, related row); filter chips.
- From the Figma Graphics board (`2638:6786`): service row with scene, mini scene row, expectations row, numbers band, topic tiles, icon tiles. Old versions in `legacy/src/demos/ux-audit.html`.
- A CTA band for mid-page prompts with an action (LLM.md 13.9) and a comparison table section (LLM.md 13.8).
- Pages from the old system still to convert: Success Stories listing and detail, Insights listing and article, About (waiting for the developers' markup), the UX Audit demo, the B2B SaaS and AI industry page.

## Images

- New sections never get real client mockups or screenshots, only labeled placeholders (`partials/elements/placeholder.html`, docs/GRAPHICS.md section 8). The team adds images later.

## To confirm

- The no gradient cards rule (LLM.md 8.5) keeps the G6 rows on the approved Success Story detail page as they are. Confirm, or switch them to white cards.
- The eyebrow rule (LLM.md 8.4) does not apply to detail pages, whose body blocks and "Other success stories" / "Other insights" rows have no eyebrow in Figma. Confirm, or add eyebrows there too.

## Copy to review

"Synergy" and "solutions" appear in approved Figma copy on the Insights article and the Squaircle success story (old system pages). Confirm with Chintan whether to keep or change them before those pages are converted.

## Not designed yet

- Tablet and mobile frames for Insights listing, Insights detail and About. They currently follow the rules of the designed pages (same breakpoints, the detail page TOC becomes the floating bottom menu).
- Header navigation dropdowns (carets are ready as buttons).
- Nav will change later; it is built as designed for now.

## Decisions made while building (old system pages, carry over when converting)

- Success Story detail, tablet and mobile: the TOC moves to a floating menu at the bottom of the screen (Figma shows it at the top, to be updated).
- Success Story detail hero, tablet and mobile: in Figma the person's role text fades into the white end of the gradient. In code the gradient is stretched to the hero so the text stays on Slate and readable.
- Insights detail hero title uses 40 on tablet and 32 on mobile, matching the Success Story detail frames.
