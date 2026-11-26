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
| Booking card version by page type | The footer global section has only "Skip the layers, talk to the founder."; inner pages should show "Let's talk about what you're building." (LLM.md 15.5) | Previews switch it (`scripts/preview-shell.mjs`); live shows the homepage version everywhere |
| Booking card overlapping the footer by 40px on the live site | LLM.md 9.1, 16.5; the developers' CSS has no overlap rule outside Salient's wrappers | Previews add it (`scripts/preview-shell.mjs`); confirm it on new.ux.team |

## White label page (`src/pages/white-label.html`)

| Item | Where | Until then |
|---|---|---|
| Typical start time for a new partnership | Fix row 2, comparison table (Time to start), FAQ "How fast can you start?" | Visible `[confirm X] days` |
| Design only, or design and build? | FAQ "Do you build websites, or design only?" | Visible `[confirm with Chintan: …]` at the end of the answer |
| Review of every comparison table cell | Comparison table (draft positioning in the page copy) | Shown as written in the copy; not final |
| White label UX audit sample report | "See a Sample Report" link in the UX audits card | `href="#"` |
| Agency partner count: copy says [75]+, approved fact is 50+ | Hero trust line | "The design team behind 50+ agencies." |
| Agency partner logos that agreed to be shown, and their label | Under the hero | The standard trusted-by marquee and label, unchanged (LLM.md 12.5) |
| Testimonials 1 and 2 and the partnership story card (placeholders in the copy) | Partnership stories | Not on the page; the approved stories section (E2M video, Squaircle, Section, RBBI) carries the proof |
| Four ways to partner vs the three ways to work rule | Ways to partner | Built as four, as the copy says (agency channel); confirm |
| Three service visuals, 518 x 518 | Service cards | Drawn illustrative scenes (`partials/graphics/wl-scene-*.html`); swap for approved work samples if wanted |
| Five process icons `wl-*.svg` to upload, or keep inline | Process | Inlined SVG in the page body |
| Links: `/how-we-work/`, `/success-story/` | Closing buttons | As written; confirm the URLs |
| Install the CSS sync (GitHub key, Actions on, plugin in WordPress) | So CSS changed in WordPress reaches the repo automatically: docs/WORDPRESS-CSS-SYNC.md | Developers send the CSS back by hand |
| Put the updated `uxteam-site.css` live (PART T shared helpers and PART U White label are merged into it) | Salient > Custom CSS: replace the whole file | Until then the White label page's new sections are unstyled |

## Waiting for files

| Item | Where it goes | Until then |
|---|---|---|
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
