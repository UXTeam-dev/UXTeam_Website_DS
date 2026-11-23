# UXTeam knowledge base (from the live website)

Everything UXTeam says about itself on **https://ux.team** today, collected so new pages can be written from real facts instead of invented copy.

- Captured: **23 Nov 2026**, by crawling every URL in the site's sitemap (38 URLs: 9 main pages, 16 success stories, 13 empty category archives) in a headless browser, scrolling each page fully and including text hidden in carousels, tabs and accordions.
- Scope: text content only. Visual rules live in [../docs/DESIGN-RULES.md](../docs/DESIGN-RULES.md) and the Figma file.

---

## Read this first: which source wins

There are two sources of truth for copy, and they do not say the same thing.

| Source | What it is | Use it for |
|---|---|---|
| [../docs/BRAND-GUIDE.md](../docs/BRAND-GUIDE.md) | The **new** positioning (Chintan, 28 Oct 2026): B2B-first studio, hired for judgment, white label as a secondary channel | **Voice, positioning, page jobs, claims rules.** It wins whenever the two disagree. |
| This folder | What the **current live site** says: agency-first, white-label design partner | **Facts:** clients, projects, testimonials, services detail, FAQs, numbers, processes, contact details |

The live site is written for **agencies buying white-label design capacity**. The redesign (this repo) moves to **B2B leaders hiring UXTeam directly**, with agencies on their own pages. So:

1. Take **facts, proof and detail** from here.
2. Take **tone, framing and page structure** from the brand guide.
3. Agency wording from the live site ("your agency", "white-label by default", "pre-sales collaboration") belongs only on white-label and agency pages.
4. Before reusing any number, check [07-numbers-and-claims.md](07-numbers-and-claims.md). Some live numbers are not on the brand guide's approved list.

---

## Files

| File | What is in it |
|---|---|
| [01-company-and-contact.md](01-company-and-contact.md) | Company facts, offices, contact routes, social links, navigation, sitemap, the contact form, the thank-you flow, the founder CTA, privacy policy summary |
| [02-positioning-and-messaging.md](02-positioning-and-messaging.md) | Headlines, the "About UXTeam" boilerplates, differentiators, comparison tables, process, outcomes, recurring phrases and how the live voice compares with the brand guide |
| [03-services.md](03-services.md) | The four capability pages in full detail: stats, selected work, capability lists, comparisons, support points, frameworks, engagement models |
| [04-success-stories.md](04-success-stories.md) | All 16 success stories: client, contact, location, industry, engagement, challenge, what UXTeam did, outcomes, quote. Plus the portfolio projects shown on service pages |
| [05-testimonials.md](05-testimonials.md) | Every client quote, verbatim, with name, role, company and where it appears |
| [06-faqs.md](06-faqs.md) | Every FAQ on the site, grouped by topic, with a consolidated set of standard answers |
| [07-numbers-and-claims.md](07-numbers-and-claims.md) | Every number on the site, where it appears, and whether the brand guide lets us use it |
| [08-content-issues.md](08-content-issues.md) | Errors, drafts left live, duplicates and inconsistencies found on the live site. Do not copy these |
| [09-writing-new-pages.md](09-writing-new-pages.md) | How to use this folder to write a page that has no content file, with ready-made blocks |
| [source/](source/) | Verbatim text of every page, one file per page, for exact wording |

---

## Keeping it current

When the live site changes, re-crawl it and update the affected files here in the same change, then add a line to [../CHANGELOG.md](../CHANGELOG.md). The `source/` files are a snapshot: never edit them by hand, replace them.
