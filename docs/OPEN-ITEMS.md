# Open items

Things that are placeholders, pending a decision, or waiting for a file. Remove a line when it is done.

## Waiting for files

| Item | Where it goes | Until then |
|---|---|---|
| Aeonik font files (Regular and Medium, woff2) | `assets/fonts/aeonik/Aeonik-Regular.woff2`, `Aeonik-Medium.woff2` | Headings fall back to Helvetica Neue or Arial |
| Featured story video (Brent Weaver, E2M) | `data-video` (MP4 URL) or `data-embed` (YouTube or Vimeo URL) in `sections/featured-story/featured-story.html` | The play button shows the still only |
| Calendly booking link | `data-calendly` on the booking form, `sections/booking-cta/_form.html` | Submitting shows a short confirmation message |
| LinkedIn URLs for people | `linkedin` param on the person partial, author box on the article | Links point to `#` |
| Real links for cards and nav | `href` params | Links point to `#` |

## Placeholder copy (as in Figma)

- FAQ answers: only "Can you share results and client work?" (homepage) and "What is UXTeam?" (About) have answers. The rest show the Figma placeholder "Add answer here."
- Homepage outcomes: both cards carry the same headline and numbers in Figma, and the 3motionAI name is still waiting for approval.
- Article "Mapping User Flows" reuses the landing page audit image in Figma; the Google Analytics screen capture is still to come.

## Not built yet

- A CTA band for mid-page prompts with an action (rules in LLM.md 13.9).
- A comparison table section (rules in LLM.md 13.8).
- The capability stack from the live What we do page (sticky tabs, stacked capability cards with deliverable visuals, AI design card with four sub areas, closing CTA band). Spec in LLM.md 15.4.
- The why grid with icons from the live What we do page (four hairline columns with outline icons).
- A What we do page in this repo, built from the two sections above and the existing ones.

## To confirm

- Hub pages (What we do) use the homepage booking card ("Skip the layers, talk to the founder."), as on the live page. LLM.md 15.5 now says so.

## Copy to review

`npm run check` warns about avoided words in approved Figma copy: "synergy" and "solutions" on the Insights article, "solutions" on the Squaircle success story. Confirm with Chintan whether to keep or change them.

## Not designed yet

- Tablet and mobile frames for Insights listing, Insights detail and About. They currently follow the rules of the designed pages (same breakpoints, the detail page TOC becomes the floating bottom menu).
- Header navigation dropdowns (carets are ready as buttons).
- Nav will change later; it is built as designed for now.

## Decisions made while building

- Success Story detail, tablet and mobile: the TOC moves to a floating menu at the bottom of the screen (Figma shows it at the top, to be updated).
- Success Story detail hero, tablet and mobile: in Figma the person's role text fades into the white end of the gradient. In code the gradient is stretched to the hero so the text stays on Slate and readable.
- Insights detail hero title uses 40 on tablet and 32 on mobile, matching the Success Story detail frames.
