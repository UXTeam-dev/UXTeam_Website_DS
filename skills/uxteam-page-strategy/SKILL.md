---
name: uxteam-page-strategy
description: Plan a UXTeam website page from business value first. Use before designing or building any new page, or when rewriting a page's copy, especially when only a page name or outline is given and you must write the content.
---

# UXTeam page strategy

Turn a page request into a plan a designer or builder can follow: the page's job, the story, the weight of each section and the content for each section. This is Step 3 of `LLM.md` section 0. Nothing gets designed or built until this plan is shared.

## 1. Read first

Make sure you are on the latest `main` (LLM.md section 0, Step 0). If `LLM.md` or this skill's folder looks different from what you expect, update first.


- `LLM.md` sections 2 to 7 (business, voice, claims, content, weighting, storytelling).
- `docs/BRAND-GUIDE.md`, especially section 8 (page rules) and section 10 (claims).
- `knowledge/uxteam-website-knowledge.txt` for facts. Use only numbers its section 10 marks as safe, never copy from its section 12.
- The copy of the approved pages in `src/pages/`, so tone, facts and repeated answers match.

## 2. Find out what you were given

| Given | What you do |
|---|---|
| A content document | Follow it word for word. Only map it to sections, weight the sections, and flag copy that will not fit the layout or breaks a claims rule. Skip step 5 below. |
| A page name or outline only | Do every step below and write the content yourself. |

## 3. Frame the business problem

Answer each in one or two lines:

1. **Reader.** Which reader is this for (role, company type, situation)? Direct B2B leader or agency? (LLM.md 2.2)
2. **Decision.** What are they deciding when they land here?
3. **Beliefs.** What must they believe before they act? List 3 to 5 beliefs, for example "they understand my kind of product" or "the result is measured, not promised".
4. **Objections.** What would stop them? List 2 to 4.
5. **Job and action.** The page's one job and one main action (LLM.md 15.6 for known pages).
6. **Page type.** Hub, company, listing, detail or other inner page. This decides the hero, the booking card and the starter file (LLM.md 15.5, 16.3). If an approved or live version of the page exists (for example What we do, LLM.md 15.4), it is the blueprint.
7. **Pillars.** Which one or two pillars carry the page (AI and people, Outcomes, Experience)?
8. **Proof.** Which approved proof supports it (results, clients, quotes, facts)? Proof that is not approved stays out or becomes a marked placeholder.
9. **Journey.** Where do visitors arrive from, and where should they go next?

## 4. Build the story and weight the sections

1. Order the page answer first, then proof, then detail, then objections, then the ask (LLM.md 7.1).
2. Every belief from step 3 is earned by at least one section. Every objection is answered somewhere (often the FAQ).
3. Score each section with the four questions in LLM.md 6.1. Assign Low, Medium or High and the treatment (6.2).
4. Keep 2 to 3 High sections at most, never two heavy High sections back to back, and the main action right after the strongest one (6.4).
5. For each section, name the repo file you will use, or "new" with one line on why nothing existing fits.
6. Where the content matches an approved section (process, partnerships, outcomes, logo strip, FAQ), plan to reuse it whole with its approved copy and labels (LLM.md 12.5). Never merge two approved sections.
7. For a set of parallel items (services, industries, ways to work), plan one treatment for all of them (LLM.md 12.6).
8. Where the page shows trusted partners, plan the logo marquee include as it is (`sections/logo-marquee`). Never a static logo row.
9. For a process, approach, method or principles section, plan a visual that shows how the work happens (icons, numbers, steps, simple white cards, an SVG diagram). Never a mockup or screenshot there (LLM.md 13.6).

## 4A. Brainstorm content heavy sections (required)

Any section with more than one idea or more than about 80 words of content must be thought through before it is built (LLM.md 12.7). Do not pour every point of the content into columns. For each such section, write in the plan:

1. **The one idea**, in one sentence. If it takes two, split the section or cut one idea.
2. **Keep, cut, move:** which points prove the idea, which repeat another section (for example the full process), which the reader does not need here.
3. **Two or three compositions,** described in a line each, and the one you picked with the reason (reads in five seconds, differs from its neighbours, fits the weight).
4. **The trimmed content** written to that composition, within LLM.md 5.3.

A section brainstorm looks like this:

```
Section: Built to fit your product team (Medium)
Idea: We slot into how product teams already work, so design speeds them up.
Keep: tools, working alongside PMs and engineers, dev ready handoff. Cut: flexible engagement (ways to work covers it). Move: the process (its own section).
Options: A) three icon points under a centered intro  B) split, an SVG diagram of the sprint loop beside three lines  C) a numbered strip
Pick: A. The page already has a split section above; three short points read fastest.
```

## 5. Write the content (outline-only requests)

For each section write:

- **Eyebrow:** 2 to 4 words. Every section header has one, even when the content document gives none.
- **Heading:** short, often first person, answer first.
- **Subhead:** optional, one line.
- **Body or items:** specific, with names and numbers over adjectives. Match the item count to the section's content fit (LLM.md section 14).
- **Proof used:** which fact or result, and where it comes from.
- **Action:** only if this section carries the screen's one CTA.
- **Visual anchor idea:** for High sections, what makes the point visible (mockup, preview, numbers, icons, diagram).

Stay within the length limits in LLM.md 5.3. Reuse approved lines and facts exactly. Repeated answers (FAQ, numbers, terms) must match the other pages.

## 6. Check before sharing

- [ ] Voice: plain, specific, warm; no avoided words; no exclamation marks; no em dashes (LLM.md 3).
- [ ] Claims: every number says what, baseline and period; nothing from the not-approved list (LLM.md 4).
- [ ] Facts match the knowledge file and the other pages; anything missing is a visible `[confirm with Chintan]` placeholder.
- [ ] Exactly three ways to work; service labels exactly as in LLM.md 2.3.
- [ ] One CTA in the hero; booking card and footer standard.
- [ ] Every section has an eyebrow.
- [ ] Every content heavy section has its brainstorm (4A): one idea, what was cut, the composition picked.
- [ ] No mockup planned for a process or approach section; the trusted-by strip is the logo marquee.
- [ ] No gradient filled cards planned; icons and graphics planned as SVG.

## 7. Output

Share this in the conversation and wait for the person's go-ahead:

```
Page: <name>     Reader: <who>     Job: <one line>     Main action: <label>
Pillars: <one or two>     Proof: <list>

Beliefs to earn: 1. … 2. … 3. …
Objections to answer: 1. … 2. …

| # | Section | Weight (score) | Treatment | Repo file or new | Belief or objection it serves |
|---|---------|----------------|-----------|------------------|-------------------------------|

Content brief
<one block per section: eyebrow, heading, subhead, body or items, proof, action, visual anchor>

Section brainstorms (4A)
<one block per content heavy section: idea, keep/cut/move, options, pick>

Open questions and placeholders
- …
```
