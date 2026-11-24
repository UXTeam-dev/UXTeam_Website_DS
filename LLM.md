# LLM.md · UXTeam Website Design System

**Read this whole file before you plan, write, design or build anything in this repo, then follow the four steps in section 0.** It is the single brief for any AI model, agent or tool working on the UXTeam website. It covers the business, the brand voice, the creative approach, the design rules, the coded system and the do's and don'ts.

If something here conflicts with a direct instruction from the person you are working with, follow the person and point out the conflict in one line.

---

## Non-negotiables (read these even if you read nothing else)

Breaking any of these means the page is wrong, however good it looks.

1. **Build pages from the repo, never from scratch.** A page is an assembly of existing partials (`<!-- @include ... -->`). No `<style>` blocks, no inline styles, no new CSS in a page file, no hex colors outside `tokens.json`.
2. **Global sections are fixed.** The header, the booking card and the footer always come from `sections/site-header`, `sections/booking-cta` and `sections/site-footer`. Never redesign them, never change their navigation, links or copy for a page.
3. **Header navigation is the site navigation** (What We Do, UXAudit, Work, About, Insights, Contact), never anchor links to the current page's sections.
4. **Every button is the Arrow Glide component** (`components/button/_button.html`): a pill or text link with an arrow circle. No plain pills, no underlined links as CTAs, no buttons without the arrow.
5. **A hero uses one of the existing hero sections, is centered, has one CTA, and a dark hero fades to white** (Hero Dusk). No flat dark blocks, no glow blobs, no left aligned hero unless the design says so.
6. **Reuse the matching section first.** Process or steps use the process section with icons. Ways to work use the engagement section. FAQ uses the FAQ component. Stories use story cards. Only content with no matching section gets a new design.
7. **Radius 8 on cards and boxes, 1px Steel borders, no square corners, no shadows.**
8. **At most one Warm Glow band and one Deep Navy band per page.** Every other section is white.
9. **Fixed spacing only** (section 9). Sections touch; padding does the spacing.
10. **High weight sections get a visual anchor** (graphic, mockup, icons, numbers, proof). A page made only of text rows is not finished.
11. **Facts, offers and copy follow the business rules:** exactly three ways to work (Audit, Project, Partnership); the strategy workshop is a service, not a way to work; no invented claims.
12. **Check your work against the approved pages** before saying it is done (section 18). If you cannot build or preview, say so.


## 0. Start here

**Do not write copy, design or code until you have finished Steps 1 to 3, in this order. Do not hand anything over until you have done Step 4.** Skipping them is the main reason pages come out generic, badly spaced or off brand.

### Step 1. Pick the approach

Before touching anything, settle four things and state them back to the person in a few lines:

| Decide | Options | How to decide |
|---|---|---|
| Task type | New page · New section · Change to an existing page or section · Fix | From the request |
| Where to design | **Figma first, then code** · **Code directly** | The person tells you each time. If they have not, ask before you start |
| Content | **Content document given** (follow it strictly) · **Only a page name or outline** (you write the copy) | From what was shared. See section 5 |
| Output | Figma frames · Coded page in the repo · Both | From the request |

Then say what you will produce, and what you need from the person, if anything.

### Step 2. Build your knowledge from the repo

Read before you plan. At minimum:

| Read | Why |
|---|---|
| This file, completely | Business, voice, rules, craft, process |
| `docs/BRAND-GUIDE.md` | Full positioning, offer, page rules and claims |
| `knowledge/uxteam-website-knowledge.txt` | Facts from the live ux.team site: company and contact details, services, clients, all success stories, testimonials, FAQs, numbers with their approval status |
| `docs/COMPONENTS.md` | Every component and section with its fields |
| The approved pages in `src/pages/` that are closest to your task | Tone, sentence length, spacing and composition already approved |
| The section folders you might reuse, in `src/sections/` and `src/components/`, including any `reference/` folder | How each one looks, works and what content fits |
| `docs/OPEN-ITEMS.md` | What is still a placeholder or not approved |
| `CHANGELOG.md` | What changed recently |

Also check, depending on the task:
- **Designing in Figma:** the approved frames on Final Design Pages and the components on Assets & Components (section 17).
- **Writing copy:** the copy on every approved page, so facts, numbers and repeated answers match.
- **Building a new section:** `src/tokens/tokens.json`, `src/base/layout.css` and one similar section's CSS.

### Step 3. Share your plan, then start

Before any design or build, share a short plan in the conversation:

1. The page's job, its reader and its single main action
2. The section list with business value weights and treatments (section 6.5)
3. **For every section, the repo file you will use** (for example `sections/process/process.html`). "New" is allowed only for content no existing section can carry, with one line on why
4. Any content changes, open questions or placeholders

Start once the plan is clear. For small changes and fixes, the plan can be one or two lines.

### Step 4. Review before you hand over

Before saying the work is done:

1. Run `npm run build`, then `npm run check`. Fix every error it reports. Treat warnings as things to justify or fix.
2. Screenshot the page at 1440, 768 and 375 and put it beside the closest approved page (`reference/pages/` holds screenshots of every approved page). Look for anything that does not appear on an approved page: a new color, a new card style, a different header or footer, a plain button, a flat hero. Remove it or justify it.
3. Go through section 19.3 (failures seen before) and confirm none of them is present.
4. Report what you checked and anything you could not check.

---

## 0A. How to use this file

### 0A.1 Order of truth

When two sources disagree, the higher one wins:

1. The person's instruction in the current conversation
2. An approved content document for the page (if one is given)
3. This file
4. `docs/BRAND-GUIDE.md` (full positioning and brand guide). It wins on tone, framing and claims
5. `knowledge/uxteam-website-knowledge.txt` (facts from the live site). It is the fact source, but the brand guide wins where they disagree
6. Approved Figma frames on **Final Design Pages**
7. The coded pages and sections in this repo
8. Your own judgment

### 0A.2 Approvals

All approvals happen in the conversation. When a design or page is ready for review, share the Figma link or a screenshot (desktop first, then tablet and mobile when built) and wait for feedback. Do not treat anything as approved until the person says so.

### 0A.3 Working with your tools

How you reach this repo changes what you can do. Work out which case you are in before Step 2.

| How you are connected | What to do |
|---|---|
| **The repo is cloned on your machine, with a terminal** | Read files directly. Run `npm run build`, then `npm run serve` and look at pages at http://localhost:4321. Take screenshots at 1440, 768 and 375 to check your work. Commit and push when done |
| **GitHub through an MCP server or the GitHub API (no terminal)** | Read files through the tool, starting with this file and the list in Step 2. Read source files in `src/`, never `dist/` (generated). You cannot build or preview: when you change files, change the source in `src/` only and tell the person the build and visual check still need to run. Use a branch and a pull request for changes unless told otherwise |
| **Only web access to the repo** | Read raw files from GitHub. Treat the repo as read only knowledge and deliver your output as files or designs for the person to add |
| **Figma through the Figma MCP** | File key `9JQFLWC1KBelhUEaEZ6I1C`. Read the approved frames and components before designing. Follow section 17. Share the frame link and a screenshot for review |
| **A browser tool** | Use it to view built pages or the live site and compare them with Figma. Never as a replacement for reading the source |

General rules for every tool:
- **Read before you write.** Never change a file you have not read in full.
- **Source, not output.** Edit `src/`, `docs/` and `assets/`. Never edit `dist/` or `src/tokens/tokens.css` by hand.
- **Keep the repo current.** Every new section or element goes in with its docs, library entry and changelog line (section 16.2).
- **Be honest about checks.** If you could not build, preview or compare with Figma, say so instead of saying the page is done.
- **Large files.** Built pages and the CSS bundle are long. Read the section files you need, not the whole bundle.

### 0A.4 Quick map of this file

| # | Section | Use it for |
|---|---|---|
| 0 | Start here | Approach, knowledge, plan, review. Always first |
| 1 | The repo | Where things live |
| 2 | The business | Who UXTeam is, who it serves, what it sells |
| 3 | Voice and copy | How UXTeam sounds |
| 4 | Claims and proof | What you may and may not say |
| 5 | Content | Content doc given vs outline only |
| 6 | Business value weightage | Deciding how much design each section gets |
| 7 | Storytelling and page rhythm | Ordering sections into a page |
| 8 | Design foundation | Grid, color, type, shape |
| 9 | Spacing | Fixed spacing rules |
| 10 | Color composition and backgrounds | Bands, gradients, light and dark |
| 11 | Buttons and calls to action | Which CTA goes where |
| 12 | Creative direction | Designing high value and new sections |
| 13 | Craft rules | Hero, line breaks, hierarchy, icons, tables, CTA bands |
| 14 | Section library | Every existing section and when to use it |
| 15 | Page blueprints | Templates for each page type |
| 16 | Building in the repo | Code structure and rules |
| 17 | Working in Figma | When the person asks for Figma |
| 18 | Quality bar | What done looks like |
| 19 | Do's and don'ts | The short list |
| 20 | Open items | What must not be published yet |

---

## 1. The repo

Plain HTML, CSS and JavaScript. No framework, no dependencies. Pages will later move into WordPress with the same code.

```
LLM.md                 This file (CLAUDE.md and AGENTS.md point here)
README.md              Human readable overview and quick start
docs/                  BRAND-GUIDE, DESIGN-RULES, COMPONENTS, FIGMA-MAP, HOW-TO-ADD, WORDPRESS, OPEN-ITEMS
knowledge/             uxteam-website-knowledge.txt: facts from the live ux.team site
reference/pages/       Screenshots of the approved Figma pages, for visual comparison
scripts/check.mjs      Automatic page check (npm run check)
assets/                fonts, icons, images (WebP), logos (PNG or SVG)
src/tokens/tokens.json Single source of truth for colors, type, spacing. tokens.css is generated
src/base/              reset, fonts, typography classes, layout, grid, section spacing
src/components/        small parts: button, cards, FAQ, chips, form field, person, TOC
src/sections/          full width blocks: header, footer, heroes, services, process, booking card
src/templates/         shared <head> and scripts
src/starters/          starter files for each page type. Copy one to start a new page
src/pages/             the pages, assembled from includes
src/library/           component library page (shows everything)
dist/                  build output, do not edit
```

Commands: `npm run build`, `npm run check` (page rules check, run after every build), `npm run serve` (http://localhost:4321), `npm run dev`.

Figma file: **UXTeam Website 2026**, key `9JQFLWC1KBelhUEaEZ6I1C`.
- Final Design Pages `1231:508` (approved pages, the only design source of truth)
- Assets & Components `1231:897` (components and interactions)
- Design System Guideline `2351:577` (rules)

---

## 2. The business

### 2.1 Positioning

UXTeam is a UX-led design studio for B2B teams that wants to be hired for judgment, not only execution. We find what is holding growth back, design the fix, build it, and measure the result.

**Boilerplate** (use as is for footers, profiles, press lines):

> UXTeam is a UX-led design studio for B2B teams. We start with the metric that matters, diagnose what is holding growth back, then design, build, test, and report the result. AI speeds the work. Senior people make the call.

**Homepage headline:** We design decisions, not just screens.

**The idea in four parts:**
- **B2B first.** Buyers are product, growth and marketing leaders at B2B companies. Consumer and D2C brands are a supporting audience, never the lead.
- **Judgment before production.** Diagnosis and strategy come first. Design and build follow.
- **AI-enabled, human-led.** AI handles first-pass analysis, drafts and audits at volume. People frame the problem, set priorities and own the recommendation.
- **Outcome-focused, not outcome-guaranteed.** We agree one metric at the start and report against it. We never promise results.

**What UXTeam is not:** a pixel factory, a generic AI design agency, or a cheap build-only vendor.

**The belief behind the whole site:** production is getting cheaper, and judgment is not.

### 2.2 Audience

**Best-fit buyer:** a B2B company with real revenue at stake and no strong in-house strategist.

**Primary reader:** product, growth and marketing leaders at B2B SaaS and AI, FinTech and insurance, real estate platforms and event platforms, in the USA, Canada, the UAE and wider Middle East, Southeast Asia and Australia.

**What they want:** a clear diagnosis of what is holding growth back; a senior person who understands the problem; a roadmap their team can act on; a measurable result, reported honestly.

**Secondary audiences:**
- Agencies that want a white label partner. Own pages, more practical tone: confidential, dependable, strategy plus capacity.
- Select consumer and D2C brands. One supporting page and an FAQ answer, never homepage space.

**Not a fit:** teams with strong internal UX and strategy who only want extra hands; build-only buyers shopping on price; single deliverables with no goal behind them.

**Write every direct-client page for one reader:** a B2B leader deciding whether to trust UXTeam with a business problem. Keep agency-to-agency language off those pages.

### 2.3 Services (labels are final, use them exactly)

| Service | What it does for the client | Usual way to work |
|---|---|---|
| UX audit | Finds what is costing pipeline and activation before a redesign | Standalone paid audit (UXAudit), or a small audit that opens a project |
| UX strategy workshop | A working session that ends in a prioritized roadmap tied to growth metrics | Scoped per client, often alongside a Project |
| Product and app design | Onboarding, dashboards and workflows users adopt | Project (opens with a small audit) or Partnership |
| Web and marketing design | Websites that turn demand into demos and trials, built in Webflow or WordPress | Project (opens with a small audit) |
| Conversion optimization | Demo, trial and sign-up funnels, tested and measured | Partnership |
| Design systems | One system for every team shipping the product | Project (opens with a small audit) |
| AI design for B2B products | AI agent experience, AI interface design, trust and transparency | Project (opens with a small audit) |

The UX strategy workshop has no fixed format. Describe it only as "a working session that ends in a prioritized roadmap". Never state a length or price.

### 2.4 Three ways to work (the order a buyer usually moves)

- **Audit: clarity before you commit.** For teams unsure what is holding growth back. Report in about 3 days after analytics access. Fixed fee, quoted after one call. The entry point, so it carries "Start here".
- **Project: a defined piece of work.** For a clear goal and scope (redesign, launch, build). Length varies by scope; no timeline is published. Every project opens with a small audit, as part of the project.
- **Partnership: ongoing design, backed by strategy.** For teams that need senior design and testing every month. Minimum term depends on the service and is agreed on the first call.

There are exactly **three** ways to work. The UX strategy workshop is a service (2.3), never a fourth way to work.

**Section line:** Hire our judgment, not just our hands.

White label is a secondary channel for agencies. It never leads the homepage and keeps its own pages and tone.

### 2.5 What we believe

1. **Start with the outcome, not the screen.** We agree the business metric before anyone opens a design file.
2. **Diagnose before you design.** The audit comes first, so decisions rest on evidence, not taste.
3. **Design and build together.** One team means nothing is lost between design and code.
4. **Test what ships.** Changes are measured against the agreed metric and reported honestly.
5. **Senior people lead.** Experienced judgment from day one, not a learning curve.

**AI:** talk about it openly and without hype. AI speeds first-pass analysis, drafts, variations and audits at volume. It does not replace judgment. Line to reuse: **We use AI. We don't outsource the decision.**

**Execution:** we sell it and we are good at it, but execution alone is not what clients hire us for. Contrast lines ("not just screens", "not just our hands") at most twice per page.

### 2.6 Messaging pillars (each page leans on one or two, with proof)

| Pillar | Headline | Supporting line |
|---|---|---|
| AI and people | AI speeds the work. People make the call. | AI handles first-pass analysis, drafts, and audits. Our people frame the problem and own the recommendation. |
| Outcomes | Outcomes before screens. | We agree the business metric first, diagnose what is blocking it, then design toward it and report against it. |
| Experience | Senior experts, led by 20+ years in design. | Experienced B2B designers and strategists lead the work, guided by a founder with 20+ years in design, so you get judgment from day one. |

**Supporting reasons (Why us):** Senior team only, no juniors learning on your product. Design and build together, in-house developers, nothing lost in handoff. Metrics agreed upfront, then reported against.

### 2.7 Company facts (keep identical everywhere)

- 8+ years in business (since January 2018)
- 3 locations: India, UAE, USA
- 50+ agency partners
- 450+ projects designed (covers B2B and B2C; never "450+ B2B projects")
- Founder: Chintan Bhatt, 20+ years **in design** (never "in UX")
- Offices: UAE (Dubai), India (Ahmedabad), USA (New Jersey). Addresses are in the footer section.
- Mutual NDA, full IP ownership, data used only for the project: true on every engagement

---

## 3. Voice and copy

UXTeam sounds like a **senior colleague who tells you the truth plainly**: warm, personal, specific, and sure of its judgment without being loud.

### 3.1 Six principles

1. **Plain and conversational.** Short sentences, common words, contractions (we're, you'll, don't).
2. **Confident, not loud.** Say what we do and what we measured. Never announce how good we are.
3. **Specific.** Numbers, names and examples beat adjectives.
4. **Personal.** Speak to one reader as "you". Name their situation before the fix: *You've got traffic. Let's find out why it isn't converting.* "We" for the team. "I" only where the founder speaks (booking section).
5. **Honest about limits.** Say what we don't do and don't promise.
6. **Warm and professional.** Friendly, never slang, never hype. No exclamation marks.

### 3.2 Say this, not that

| Say this | Not this |
|---|---|
| We find what is holding growth back. | We unlock explosive growth with cutting-edge AI. |
| We agree one metric and report against it. | We guarantee results. |
| Senior experts lead the work. | A world-class team of rockstar designers. |
| We use AI. We don't outsource the decision. | AI-powered everything. |
| Hire our judgment, not just our hands. | We are not like other agencies. |

**Prefer:** diagnose, decision, metric, outcome, judgment, senior, build, test, report, partner.
**Avoid:** unlock, leverage, synergy, cutting-edge, world-class, best-in-class, disrupt, revolutionize, seamless, solutions, pixel-perfect.

### 3.3 House style

- **Never use em dashes (—).** Hyphens in compound words are fine (UX-led, first-pass, sign-up).
- Write ranges with "to": "20 to 30%", "8 to 10 weeks".
- American spelling.
- No exclamation marks.
- Headings: short, sentence case, often first person ("Outcomes we've delivered").
- Section pattern: a 2 to 3 word eyebrow, a short heading, an optional one line subhead.
- Main CTA label is always **"Book a Discovery Call"** (title case). "Start with an audit" belongs to the audit offer. Never "Contact us" or "Get a quote".
- Card and column links follow the approved pages ("Read Story", "Read Case", "Learn More").
- Brand name is **UXTeam** in all copy. The domain stays ux.team.

---

## 4. Claims and proof

No claim goes live unless it is true on every project and we can show how we know.

1. **No guarantees.** Never "guaranteed" or "outcome-based pricing".
2. Every number names what it measures, the baseline and the period. Show absolute rates beside any relative lift.
3. Client names, logos, screens and figures need written approval. Under NDA, anonymize by sector and scale.
4. Placeholders like [X] or [confirm] never go live. In drafts, mark them clearly.
5. One source for each number. Same figure and wording everywhere.
6. "Senior" and "led by" must be true for every engagement.
7. Never publish an audit of a named company that did not ask for one.
8. Label anything illustrative as "Illustrative", with no client data.
9. Agency partner results stay private. White label work is confidential by default.

### 4.1 Approved proof

| Proof | Where it is safe | Note |
|---|---|---|
| VORO: agent sign-ups 4.0% to 5.4%, onboarding 21% to 30.7% | Case study, homepage, industry page | 4 week A/B test, about 600K visitors per variant. Numbers come from the homepage test. Say so. |
| AgentSelect: +20 to 30% lead generation | Case study, homepage | Measured after launch. Add timeframe when known. |
| Qwary: "UXTeam has been our design team from day one." | Success story | Published quote, no outcome number. |
| Company facts (section 2.7) | Why us, About, anywhere | Identical everywhere |

### 4.2 Not approved, do not publish

- 3motionAI name, results and screens (placeholder only, no name or figures)
- AI interface case study
- Partnership minimum terms per service
- UK as a client region

---

## 5. Content

### 5.1 When a content document is given

- Follow it **strictly**, word for word.
- Change copy only where it does not fit the website's layout (too long for a card, a heading that will not fit the design). Keep the meaning, make the smallest change, and list every change for the person.
- Content files are **content references, not layout references.** You decide the section design.
- If the document has its own CTA or footer copy, ignore it. The booking card and footer are standard on every page.
- If a section's content matches content already designed on another page (for example success story cards), reuse that exact designed section.
- Image notes in the document become image placeholders with a clear description of the intended visual.
- Flag any claim that breaks section 4 instead of publishing it.

### 5.2 When only a page name or outline is given

Generate the content yourself, in this order:

1. **Understand the business.** Re-read sections 2 to 4. Know who the page is for and what decision they are making.
   - **Facts** (company details, services, clients, stories, testimonials, FAQs) come from `knowledge/uxteam-website-knowledge.txt`. Use only the numbers its section 10 marks as safe, and never copy anything from its section 12 (issues on the live site).
   - The live site speaks to agencies. The new site speaks to B2B leaders first, so keep agency wording ("your agency", "white-label by default") on agency pages only.
   - If a fact is missing, leave a visible placeholder such as `[confirm with Chintan]`. Never invent it.
2. **Find the page's job and main action** in section 15.4 (page rules). If the page is not listed, define its job in one sentence and its single main action.
3. **Study what already exists.** Read the copy on the approved pages in `src/pages/` and the Figma Final Design Pages. Reuse their tone, sentence length, heading style and any matching content (facts, proof, service descriptions, FAQ answers). Repeated answers must match across pages.
4. **Plan the story** (section 7) and **score each section's business value** (section 6).
5. **Write section by section:** eyebrow, heading, optional subhead, body, actions, proof used.
6. **Check:** voice (section 3), claims (section 4), no em dashes, approved labels.
7. Share the content with the page design for review. Mark anything uncertain or invented as a placeholder.

### 5.3 Length limits that keep layouts intact

| Element | Limit |
|---|---|
| Eyebrow | 2 to 3 words |
| Section H2 | About 3 to 8 words, 1 to 2 lines at 1200 |
| Section intro | 1 line, about 20 words max |
| Card title (30px) | About 6 to 14 words |
| Blog card title (25px) | About 8 to 14 words |
| Card or column body | 1 to 3 short sentences |
| FAQ question | One line where possible, max 2 |
| FAQ answer | Answer first, 1 to 3 sentences |
| Hero H1 | About 4 to 10 words |
| Hero sub | 1 sentence |

---

## 6. Business value weightage

**Every page is planned from its business value first, then its sections.** Each section gets a weight, and the weight decides how much design it gets.

### 6.1 How to score a section

Ask four questions. Score each 0, 1 or 2.

| Question | 0 | 1 | 2 |
|---|---|---|---|
| Does it show what UXTeam sells or can do for this reader? | No | Partly | Directly |
| Does it prove it works (results, clients, capability)? | No | Indirectly | With real proof |
| Is it unique to UXTeam, not something every agency page has? | Generic | Partly | Distinctive |
| How close is it to the reader's decision or the main action? | Far | Supporting | Decisive |

**Total 0 to 3 = Low. 4 to 5 = Medium. 6 to 8 = High.**

The hero is always treated as High in importance, but uses one of the existing hero types unless the person asks for something new.

### 6.2 What each weight gets

| Weight | Design treatment |
|---|---|
| **Low** | Always an existing section, minimal. Hairlines, white background, no band, no new visuals. |
| **Medium** | An existing section, or an existing section with a variant. Only in rare cases, when it carries real proof, treat it like High. |
| **High** | First check if a creative existing section fits well. If not, create a new section that highlights the business point. May use a background band, imagery, mockups, illustration or interaction. Gets the most space on the page. |

### 6.3 Typical weights (starting point, score each page fresh)

| Section type | Typical weight | Existing section |
|---|---|---|
| Services offered | High | SL-32 grouped service list (dark) |
| Industry capabilities | High | SL-34 expanding industry cards |
| Outcomes and measured results | High | SL-20 outcome cards |
| Featured client story or video | High | SL-21 featured story |
| An offer's core value (for example what is inside the audit report) | High | New creative section |
| Success story grid | Medium | SL-22 story cards |
| Process or how it works | Medium | SL-33 process steps |
| Stats and company facts | Medium | SL-31 stats row |
| Team and leadership | Medium | Team section (About) |
| Client logos and presence | Medium | Logo grid or marquee |
| Ways to work with us | Low | SL-35 engagement models |
| Our approach, beliefs, principles | Low | SL-30 principles |
| FAQ | Low | SL-42 FAQ |
| Related items | Low | SL-60 related row |
| Author, share, legal, meta | Low | Existing blocks |

### 6.4 Page level limits

- At most **2 to 3 High sections** per page. If more score High, the page is trying to do too much; ask the person which matter most.
- Never put two High sections with heavy visuals back to back without a calmer section between them.
- The page's single main action must be reachable right after the strongest High section.

### 6.5 Write it down

Before designing, list the plan for the person in a short table:

| # | Section | Weight (score) | Treatment | Section used or new |
|---|---|---|---|---|

---

## 7. Storytelling and page rhythm

### 7.1 Narrative order (from the homepage, reuse its logic)

Claim → proof (results, partners) → why us (approach, stats) → what we do → how we work → who it's for → how to engage → thinking → objections (FAQ) → ask (booking).

Inner pages follow a shorter version: **answer first → proof → detail → objections → ask.**

### 7.2 Rules

- **Open with the point.** Every page and every section starts with its answer.
- **Proof near claims.** A claim without a number, a name or a quote gets one or gets cut.
- **One main call to action per screen.** Secondary links are text links.
- **No repetitive layouts.** Do not place two sections with the same structure back to back (two 3 up card grids in a row need a clear change of rhythm or a reason).
- **Smooth transitions.** Dark sections are entered and left through gradients, never hard edges (section 10).
- **Answers are real text.** Every answer, definition and number lives in the HTML, not in images or hidden tabs.
- **Long details** (prices, terms, NDA) live on How we work and are linked from other pages.

---

## 8. Design foundation

The look is **restrained and refined: senior, calm, exact.** Hairlines, generous whitespace, one accent gradient, no clip-art, no stock icons.

### 8.1 Grid

- Desktop canvas 1440, 12 columns, 120 margins, 30 gutter, **content width 1200** (x120 to x1320).
- 2 up: 585 + 30 + 585. 3 up: 380 each. Detail pages: TOC rail 210 + content column 810.
- Booking card and industries row are 1204 wide (2px outside the grid, intentional).
- Tablet: 768 frame, 30 side margin. Mobile: 375 frame, 15 side margin. Header 70 high on both.

### 8.2 Colors (tokens only, `var(--ux-*)`)

| Token | Hex | Use |
|---|---|---|
| navy | #0A1B33 | Headings, primary button on light, navy cards |
| ink | #0D1315 | Darkest stop of dark gradients, social circles, "Other ..." headings |
| slate | #5C6D85 | Middle stop of hero and footer gradients |
| charcoal | #081219 | Body text |
| steel | #6F7680 | 1px card borders, dividers, key labels |
| mist | #F2F3F8 | Soft panels (author box) |
| white | #FFFFFF | Page background, cards, text on dark |
| sky | #A5ECFF | 2px eyebrow underline |
| aqua | #A9FBFF | Gradient start, labels on navy |
| peach | #FEDFBA | Gradient end, numerals on navy |

Support tokens for specific uses: hero-sub #E4F0FF, stroke-soft #ACB5C2, stroke-tag #516076, stroke-menu #D8DADD, photo-bg #C1CCDE, author-bg #F6DBA0, toc-active #111111, logo-underline #919C9F.

**Never** flat black, never new background colors. Dark surfaces are always gradients built from ink, navy and slate.

### 8.3 Gradients

| Name | Use |
|---|---|
| G1 Hero Dusk | Dark hero background fading to white so the next block overlaps the fade |
| G2 Deep Navy | One important dark band per page (services) |
| G3 Footer | Footer only |
| G4 Aqua to Peach | The signature accent: highlight words, strokes, 4px rules, icons. **Never large areas** |
| G5 CTA Card | Booking card |
| G6 Detail Card | Soft gradient rows and cards on detail pages |
| G7 Warm Glow | One soft feature band per page |
| G8 Hero Light | Light hero version |

Client brand gradients appear only inside outcome cards (client band).

### 8.4 Type

Three fonts only:
- **Aeonik**: headings and buttons
- **Manrope**: body, nav, labels, forms
- **Besley**: eyebrows, meta lines, labels, numerals, stats, quotes, founder name, footer heads. **Never for headings or body.**

| Role | Spec |
|---|---|
| Homepage display H1 | Aeonik Regular 90 (64 tablet, 44 mobile). Homepage only |
| Inner page H1 | Aeonik Medium 64 |
| Section H2 | Aeonik Medium 50 (40, 32), Navy, centered for section intros |
| Card, step, column title | Aeonik Medium 30 (26, 22) |
| Small title (FAQ, blog card, detail cards) | Aeonik Medium 25 |
| Body | Manrope 20 (18, 17); 18 and 16 for dense cards |
| Eyebrow | Besley Medium 14, uppercase, +8% tracking, 2px Sky line matching the text width, 5 below |
| Meta and labels | Besley Medium 18 |
| Stats | Besley Bold 60 + Regular "+", label Aeonik Regular 30 |
| Quote | Besley Italic 28 |

- Headings: sentence case, -2% tracking.
- A **G4 gradient word** in a heading is optional, only for a word or short phrase that needs attention (`.ux-highlight`).
- Numbers may go bigger than the text styles in Besley for balance.

### 8.5 Shape and depth

- Cards: white, 1px Steel border, radius 8, **no shadow**.
- Radius 6 for images and logo tiles inside cards, 12 for navy stat strips, 4 for inputs, pill for buttons and chips.
- Prefer **hairlines** to structure text heavy layouts before adding boxes.
- On dark backgrounds, cards use gradient strokes, not fills.
- Only effects allowed: glass play button, soft shadows on device mockups.

### 8.6 Icons and imagery

- Icons: outline style, 24px grid, 1.5px stroke, current text color (Phosphor style). Process icons are provided in `assets/icons/process/`.
- Imagery: real, client-approved work over stock. One crop, one radius, one overlay per image set.
- Founder photo and name appear **only in the booking section**. Team pages use real photos with names.
- Product mockups (phones, laptops, browser frames) for outcomes and industries.
- Blog covers: editorial 3D style.
- Placeholders: describe the intended visual clearly in the placeholder.

---

## 9. Spacing (fixed)

Use only these values. Judgment is allowed **only inside a brand new section**, and even then only with values from the scale in 9.4.

### 9.1 Between sections

Sections touch each other (0 gap). Space comes from each section's own top and bottom padding: **80, 100 or 120.**

| Situation | Bottom of first | Top of next | Total |
|---|---|---|---|
| Light section to light section (default) | 120 | 100 | 220 |
| Light section into a Warm Glow band | 120 | 100 | 220 |
| Light section into the Deep Navy band | 120 | 160 (inside the band) | 280 |
| Out of the Deep Navy band into light | 180 (inside the band) | 160 | 340 |
| Two grids that belong together (second list of the same type) | 120 | 40 | 160 |
| Last section before the booking card | 100 | 0 | booking card brings its own space |
| Listing or detail page sections | 120 | 120 | 240 |
| Related items row | 120 | 120 | |
| Booking card into footer | card overlaps the footer top by 40, footer padding top 160 | | |

Responsive: 120 becomes 90 on tablet and 60 on mobile; 100 becomes 80 and 56; 80 becomes 64 and 48. The tokens handle this.

In code: `.ux-section--pt-0/40/80/100/120/160` and `.ux-section--pb-0/80/100/120/180`. 160 and 180 are only for the Deep Navy band and the section after it.

### 9.2 Hero

- Header 92 desktop, 70 tablet and mobile.
- Hero content starts 100 below the header (y 188 to 192).
- The first block after a dark hero overlaps the gradient fade (featured card, filter chips, cover image, outcome cards).

### 9.3 Inside sections

| Pair | Space |
|---|---|
| Eyebrow to heading | 10 |
| Heading to intro | 16 |
| Section header to card grid | 50 |
| Section header to text layouts | 60 to 70 |
| Card gap | 30 default; 24 Insights grid; 32 Success Stories grid |
| Detail page: content column top | 38 |
| Detail page: between content sections | 120 |
| Article sub sections | 64 |
| Heading to content block (detail) | 32 |
| Paragraph to paragraph | 16 |
| Stacked cards or rows | 16 to 24 (gradient rows 6) |

Card padding: story card 40/40/32/40, blog card 24, service card 34/43, Q&A card 36/32, gradient rows 36/32, navy stat strip 36/48, author box 32.

### 9.4 Scale for new sections

Only use: 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 100, 120.

### 9.5 Never

- Never use empty spacer elements or boxes to create space. Use padding and gap.
- Never pick section padding by eye. Use 9.1.

---

## 10. Color composition and backgrounds

- **Page background is white.** Most sections are white.
- **One Warm Glow band and one Deep Navy band at most** on a long page. Never two dark bands in a row.
- Gradients are **transitions**, not decoration: their job is to lead into and out of dark sections. A full gradient background is reserved for sections with real business weight (High). A Low section never gets a band; a stroke or hairline at most.
- Give the strongest band to the page's highest weight section (for example services on Deep Navy).
- **Header and hero:** dark (Hero Dusk, glass CTA) or light (light hero, primary CTA). Vary between pages so every page does not look the same.
- **A dark hero always fades fully to white before it ends.** No visible edge where the next section starts. See 13.1.
- On dark backgrounds, foreground elements must **blend in**: navy or glass cards, gradient strokes. A bright white strip on a dark fade looks wrong.
- Every page ends dark with the footer. The booking card floats across the white to dark boundary.
- Contrast at least 4.5 to 1 for all text, including grey text and captions. If a gradient makes text hard to read, adjust the gradient, not the text color.

---

## 11. Buttons and calls to action

Only from the **CTA / 01 Arrow Glide** component (`.ux-btn`). Every CTA is a pill with an arrow circle, or a text link with an arrow circle. No square or outline buttons.

| Type | Where |
|---|---|
| Glass (on dark) | Header only, dark header |
| Primary on dark | Dark hero |
| Primary on light | Light hero, booking form, light header, one closing action under a section where the design calls for it |
| Secondary (text link + circle) | Inside a card or column only |
| Secondary subtle | Inside dark cards |
| Icon (circle only) | Industry cards, blog cards |

- One main CTA per screen.
- **A hero has exactly one CTA.** See 13.1 for choosing it when the content gives two.
- **Only CTAs look like CTAs.** The arrow circle, pills and the Aeonik 17 link style are reserved for things you can click. See 13.5.
- A prompt with an action in the middle of a page ("Need something else?") becomes a CTA band, not loose text and a button. See 13.9.
- Label: "Book a Discovery Call". Audit offers: "Start with an audit".
- Interaction: arrow glide 350ms ease out. Card hovers 300ms. Industry cards 450ms. FAQ 420ms height, 300ms fade and icon change.

---

## 12. Creative direction

### 12.1 What makes a page feel like UXTeam

- **Calm confidence.** Large clear headings, lots of white space, few elements doing a lot.
- **Proof up front.** Numbers lead, set large, with what they measure and the test length beneath.
- **Structure through lines.** Hairlines, columns and rules instead of boxes everywhere.
- **One signature accent.** The Aqua to Peach gradient, used sparingly on words, strokes, rules and icons.
- **Serif contrast.** Besley for eyebrows, meta and numbers against Aeonik headlines.
- **Real work.** Client logos, product mockups, real team photos.
- **Depth through gradients, not shadows.** Dark bands fade in and out softly.

### 12.2 Designing a High weight section

1. **State the business point in one sentence.** For example: "We cover the industries this reader works in, with real project depth."
2. **Pick the proof** that makes the point visible: numbers, logos, mockups, counts, a quote.
3. **Look for an existing creative section** that fits (outcome cards, services list, industry cards, featured story). If one fits well, use it.
4. **If not, design new:**
   - Start from the content, then the composition, then the visual design.
   - Use the existing foundation only: tokens, type roles, grid, radius, CTA component.
   - You may experiment with existing gradients, compositions and visual elements (bands, mockups, gradient strokes, navy cards, expanding tiles, hairline grids, number-led layouts).
   - Give it one clear focal point. Avoid three ideas in one section.
   - Design hover, focus and tap states, and the tablet and mobile layout.
   - Keep it buildable as simple rows, columns and stacks (WordPress later).
5. **Check against the page:** does it break the rhythm, repeat a neighbour's layout, or add a third band? Fix that.
6. **Run the High section checklist** in 13.10. A High section built only from rows of text is not finished.

**Example, services.** Services carry the most business and conversion weight on most pages, so they are never a plain list. Each service should be easy to scan and feel tangible: its name, the outcome it gives the client, a visual of the deliverable (a website mockup, a product screen, a page of the audit report), what is included shown as a short checklist with icons, where it fits as a quieter note, and one text link. Present the services as a structured set (cards, tabs or an expanding row), not stacked paragraphs.

### 12.3 Designing Low and Medium sections

- Use existing sections as they are. Change content, not design.
- Keep them quiet: white background, hairlines, standard spacing.
- Their job is to support the High sections, not compete with them.

### 12.4 Creative references

Every creative (High weight) section in the repo keeps its reference next to its code:

```
src/sections/<name>/
  <name>.css, <name>.html, <name>.js
  reference/
    desktop.png     Figma export of the approved design
    tablet.png      (if designed)
    mobile.png      (if designed)
    NOTES.md        business point, why it looks this way, what can vary, what must not
```

Creative sections with references today: `src/sections/outcomes`, `src/sections/featured-story`, `src/sections/services`, `src/components/industry-card`. Full page screenshots of every approved page are in `reference/pages/` (see `reference/README.md`).

Study these before designing a new creative section. They show the level and the kind of creativity expected. When you add a new creative section, add its reference folder too.

---

## 13. Craft rules

These rules fix the details that make a page feel finished. They apply to every page, in Figma and in code.

### 13.1 Hero

- **One CTA only.** A hero has exactly one action. If the content gives two, keep the one that matches the page's main action (section 15.4), usually "Book a Discovery Call". The other destination is usually covered by the page itself (for example "See how it works" is just the next sections). If it is still needed, place it as a text link inside the section it belongs to.
- Trust lines and logo strips under the CTA are fine. They are not actions.
- **The dark gradient must reach white inside the hero.** Size the gradient to the real height of the hero content at every breakpoint. When content grows (longer copy, a logo strip, wrapping on mobile), extend the gradient. The section must never cut the gradient off.
- The section after a dark hero starts on white, or overlaps the fade with a card. Never start a tinted or banded section right under a dark hero.
- Check the fade at 1440, 768 and 375.

### 13.2 Line breaks and text shape

- **No orphans.** Never leave a single word alone on the last line of a heading, subhead, section intro or card title.
- Fix with the text width, not the font size: set a max width that suits the copy, use `text-wrap: balance` on headings and short intros and `text-wrap: pretty` on paragraphs, or add a line break that only applies on desktop.
- Two line headings break at a natural phrase, with lines of similar length.
- Section intros stay within about 760 wide.
- A fix at one width must not create an orphan at another. Check all three.

### 13.3 Hierarchy

- **A label that titles a group must be stronger than what is inside the group.** Column headers, group labels and list headings (for example "What gets in the way") are bigger, heavier or higher in contrast than the items beneath them. If the items use the 25 or 30 title style, the group title sits above that, or is a Besley label with a rule that clearly frames the group.
- Keep the order of levels clear: section heading, then group title, then item title, then body, then meta. Two neighbouring levels never share the same size and weight.
- Each section has one focal point.

### 13.4 Paired and multi-column layouts

- **Both sides of a pair match.** In two sided layouts (problem and fix, before and after, us and them), both sides use the same structure. If one side has a title and a supporting line, the other has both too. If not, both use one line. Adjust the content so they match.
- Columns in a row share the same element order, and their titles align.
- **Order follows length.** When a descriptor or serif line is short, it can sit above the title as a label. When it runs to two lines or more, use: title, then the Besley line, then the hairline, then the body. Use judgment so the most scannable element leads.
- Connectors between paired items stay quiet: a hairline, a plain arrow glyph in Steel, or a G4 rule.

### 13.5 Nothing looks like a CTA unless it is one

- The filled circle with an arrow, pill shapes and the Aeonik 17 link with a circle are CTA language. Use them only on things you can click.
- Decorative arrows, step markers and connectors never sit in a filled circle and never use the button colors.
- Everything clickable looks clickable. Everything else does not.

### 13.6 Icons and graphics

- Use icons where they carry meaning: process steps, services and capabilities, what is included, trust points, benefits, industries. Never as decoration.
- Not every section. On a typical page, 2 to 4 sections use icons or graphics, mostly the Medium and High ones.
- One icon style per page: outline, 24 grid, 1.5 stroke, current color. For steps, the 64px line icons with a G4 accent from `assets/icons/process`. Same size and treatment inside a section.
- Step by step content (how it works, how the partnership works) starts from the existing process section with icons (SL-33) before anything new is designed.
- Every High section has a visual anchor: an illustration, a product mockup, a preview of a deliverable, a diagram, a large number or an icon set. Graphics that show data are labeled "Illustrative".

### 13.7 Everything inside a section belongs to it

- Supporting elements (a confidentiality note, a guarantee, terms, a footnote) are designed as part of their section: same surface, same stroke and radius, on the same grid, placed as the closing row or a side column.
- A high contrast card (navy on light, white on dark) is used only when it is the section's focal point. A supporting note gets a quieter treatment: a row separated by a hairline, a G6 tint, a gradient stroke on dark, or an icon with text.

### 13.8 Tables

- Rows are separated by 1px hairlines. No full grid. Vertical lines only where columns truly need them.
- **The highlighted column** (UXTeam) gets a G6 fill and a 1px stroke around the whole column with radius 8, so it reads as one unit.
- Column headers and row labels use Besley Medium 18. Cell text is Manrope 16 to 18, short and parallel, never paragraphs.
- On mobile the table scrolls inside its own container with the first column fixed, or becomes one stacked card per row.

### 13.9 CTA bands inside a page

- When content ends a section with a question and an action (for example "Need something outside these three?"), give it a CTA band instead of loose text and a button.
- A CTA band sits inside the 1200 container: radius 8, a G5 or G6 tint on light pages (a navy card with a gradient stroke on dark), a heading in the 30 style, one line of body, one Primary button on the right (stacked under the text on mobile).
- At most 2 per page. Never directly above the booking card. It counts as that screen's one main CTA.

### 13.10 High section checklist

A High weight section is ready only when all of these are true:

- [ ] It makes its business point within a few seconds of looking at it.
- [ ] It has a visual anchor (13.6), not just text.
- [ ] Its composition differs from the sections around it.
- [ ] It gets more space and a stronger surface than Low sections (a band, gradient stroke cards or a tinted surface), within the band limits in section 10.
- [ ] It has clear hierarchy (13.3) and one main action at most.
- [ ] It is still fully on brand: tokens, type roles, radius, the CTA component.

### 13.11 Besley for labels

Besley is the voice of labels. Column headers, row labels, step numbers, group labels, meta lines and small descriptors use Besley (Medium 18, or the 14 uppercase eyebrow style). Titles and body stay in Aeonik and Manrope. Use judgment where a label also works as a title (13.3).

---

## 14. Section library

Code: `src/sections/<name>/` or `src/components/<name>/`. Figma refs are node IDs in the Figma file. Weight is the typical weight from section 6.

### Global

| Code | Section | Use | Content fit | Path |
|---|---|---|---|---|
| SL-01 | Site header | Every page. Dark or light theme | Logo, nav, CTA | `sections/site-header` |
| SL-02 | Booking card | Every page except Insights listing and detail | Fixed copy: homepage version with 3 stats, inner version with a paragraph | `sections/booking-cta` |
| SL-03 | Footer | Every page | Fixed | `sections/site-footer` |
| SL-04 | Section header | Opens every section on homepage and listing pages | Eyebrow, H2, optional intro | `components/section-header` |

### Heroes (always High importance, reuse a type)

| Code | Section | Use | Path |
|---|---|---|---|
| SL-10 | Homepage display hero + logo marquee | Homepage only | `sections/hero-home`, `logo-marquee` |
| SL-11 | Listing hero | Index pages (work, insights, services overview) | `sections/hero-listing` |
| SL-12 | Case study hero (partnership lockup, intro, person) | Success story and partner details | `sections/hero-case-study` |
| SL-13 | Article hero (meta, title, cover) | Insights, guides, long reads | `sections/hero-article` |
| Light hero | Light header and hero with stats | About and pages that should feel lighter | `sections/hero-light` |

### Proof and story

| Code | Section | Weight | Content fit | Path |
|---|---|---|---|---|
| SL-20 | Outcome cards (2 up, client band, mockup) | High | 2 measured results with before/after metric | `sections/outcomes` |
| SL-21 | Featured video story | High | 1 client story with video, logo, title, link | `sections/featured-story` |
| SL-22 | Story card grid (3 up) | Medium | Logo, title up to ~14 words, 2 meta lines, link | `components/story-card` |
| SL-23 | Client quote | Medium | Quote, person, logo | `components/detail-blocks` |

### Value and services

| Code | Section | Weight | Content fit | Path |
|---|---|---|---|---|
| SL-30 | Three column principles with hairlines | Low | 3 differentiators or beliefs: label, title, body | `sections/approach` |
| SL-31 | Stats row | Medium | 3 numbers with labels | `components/stat` |
| SL-32 | Grouped service list (dark band) | High | Services grouped under buyer questions | `sections/services` |
| SL-33 | Process steps (5) | Medium | 4 to 5 steps: icon, number label, title, body | `sections/process` |
| SL-34 | Industry cards (expanding) | High | 4 industries with image, description, project count | `components/industry-card` |
| SL-35 | Engagement models (3 columns) | Low | 3 offers: label, title, description, link | `sections/engagement` |
| Beliefs grid | 6 principles on Warm Glow | Low | 6 short beliefs (About) | `sections/beliefs` |

### Content and listing

| Code | Section | Weight | Path |
|---|---|---|---|
| SL-40 | Blog card grid | Medium | `components/blog-card` |
| SL-41 | Filter chips | Low | `sections/filter-bar`, `components/chip` |
| SL-42 | FAQ (two groups or single column) | Low | `components/faq` |

### Detail pages

| Code | Section | Path |
|---|---|---|
| SL-50 | Table of contents rail (sticky; floating bottom menu on tablet and mobile) | `components/toc` |
| SL-51 | Content section shell | `components/detail-blocks` |
| SL-52 | Key value table | `components/detail-blocks` |
| SL-53 | Navy stat strip | `components/detail-blocks` |
| SL-54 | Gradient list rows | `components/detail-blocks` |
| SL-55 | Numbered outcome list | `components/detail-blocks` |
| SL-56 | Q&A cards | `components/detail-blocks` |
| SL-57 | About block with logo tile | `components/detail-blocks` |
| SL-58 | Article body kit | `sections/article-body` |
| SL-59 | Author and share | `components/detail-blocks` |
| SL-60 | Related items row | `sections/related-row` |

### About page

| Section | Weight | Path |
|---|---|---|
| Logo grid + global presence | Medium | `sections/logo-grid` |
| Story split with founder quote card | Medium | `sections/story-split` |
| Team photo + leadership | Medium | `sections/team` |

Partial parameters for every component are listed in `docs/COMPONENTS.md`. See everything rendered at `/library/` after a build.

---

## 15. Page blueprints

Every page shares the same shell: **header → hero → body → booking card → footer.** Insights listing and detail end with the footer only (intentional).

### 15.1 BP-1 Homepage (approved)

1. Header (dark, no border) + display hero + logo marquee
2. Outcomes we've delivered (SL-20), overlapping the hero fade
3. The partnerships behind the results (SL-21 + SL-22)
4. Our approach in the AI era + stats (SL-30 + SL-31 on Warm Glow)
5. Services built for B2B growth (SL-32, Deep Navy)
6. From first audit to final result (SL-33)
7. Industries we design for (SL-34)
8. Hire our judgment, not just our hands (SL-35)
9. Insights (SL-40)
10. FAQ (SL-42)
11. Booking card (homepage version) + footer

### 15.2 BP-2 Listing page (Success Stories, Insights)

1. Header + listing hero (SL-11), H1 with an optional gradient word
2. Overlap element on the fade: featured story (SL-21) or filter chips (SL-41)
3. Grid section(s): SL-04 + SL-22 or SL-40, padding 120; a second related grid uses top 40
4. Booking card + footer (Insights: footer only)

### 15.3 BP-3 Detail page (Success Story, Insights article)

1. Header + case study hero (SL-12) or article hero (SL-13)
2. Two column body: TOC rail (SL-50) + content column (SL-51 blocks)
   - Case study order: Client Snapshot → About UXTeam → About client → The Challenges → What UXTeam did → The Outcome → Who this is for → Full Client Q&A → What Our Client Says
   - Article order: intro → H2/H3 sections with images and lists → Conclusion → author and share
3. Related items (SL-60)
4. Booking card + footer (Insights: footer only)

### 15.4 Page rules for pages still to come

| Page | Its job | Must include | Main action |
|---|---|---|---|
| UXAudit | Make the audit tangible and low-risk | What is inside the report, a sample report preview, turnaround, what we need, "quoted after one call" | Start with an audit |
| What we do | Explain each service plainly | One section per service with an anchor, a short FAQ each, project or partnership | Book a Discovery Call |
| Conversion optimization | Show the testing method and approved results | Method, illustrative funnel analysis, VORO and AgentSelect results, request for CRO case studies under NDA | Book a Discovery Call |
| AI agent experience | Define the offer and prove it | Plain definition, from-to table limited to rows we can back, AI interface case study (when approved), FAQ | Book a Discovery Call |
| How we work | Show the process and terms | Story timeline, length, what we need, minimum term, reporting, pricing notes, NDA and IP | Book a Discovery Call |
| White label | Win agencies as partners | Why agencies choose us, ways to partner, partnership stories, neutral comparison table, agency FAQ | Book a Discovery Call |
| Industries | Show depth per industry | One line per industry, relevant problems, approved proof only | Book a Discovery Call |
| Case studies | Prove outcomes and judgment | Outcome case studies first, project case studies, success stories filter, problem then decision then result | Book a Discovery Call |
| Insights | Show how we think | Dated posts, topic labels, funnel analysis template | Book a Discovery Call |
| About | Make the company real | Plain definition first, story, team with names and photos, locations | Book a Discovery Call |
| Contact | Make booking effortless | 3 field form (name, work email, company website), calendar on the same page, who they will speak with | Book a Discovery Call |
| Why choose UXTeam | The three pillars in depth | Pillars with proof, short FAQ | Book a Discovery Call |

---

## 16. Building in the repo

### 16.1 Rules

- **Reuse before you build.** Check the library page and `docs/COMPONENTS.md` first.
- **Pages are assembled from includes.** `<!-- @include sections/... key="value" -->`, paths from `src/`. Hand-written HTML in a page is limited to content inside a section. No new classes inside page files.
- **Tokens only.** Colors, type and spacing come from `var(--ux-*)`. A new reusable value goes into `src/tokens/tokens.json` first, then `npm run build`. Never edit `tokens.css`.
- **Naming.** Classes start with `ux-` (BEM: `ux-block__part--variant`). States: `is-open`, `is-active`, `is-visible`. JS hooks use `data-ux-*` attributes.
- **JavaScript.** Register with `UXTeam.register('name', fn)` and add the file to `src/js/manifest.json`.
- **Responsive.** Breakpoints 1199px (tablet) and 767px (mobile). Section specific rules at the bottom of each section's CSS.
- **Accessibility.** Semantic HTML, one H1, headings in order, alt text, focus styles, keyboard support, `prefers-reduced-motion`.
- **Images.** WebP for photos (2x size), PNG or SVG for logos. Lazy load below the fold.
- **Copy.** Paste from the approved content. Never retype from memory.

### 16.2 Adding something new

1. Create `src/components/<name>/` or `src/sections/<name>/` with CSS (header comment naming the Figma node), a partial with `{{param|default}}` fields, JS if needed, and responsive rules.
2. Import the CSS in `src/uxteam.css`.
3. Add a demo to `src/library/index.html`.
4. For creative sections, add the `reference/` folder (section 12.4).
5. Update `docs/COMPONENTS.md`, `docs/FIGMA-MAP.md`, `docs/OPEN-ITEMS.md` (placeholders) and `CHANGELOG.md`.
6. `npm run build`, `npm run check`, compare (section 18), commit with the Figma node in the message, push.

### 16.3 Starting a new page

1. Copy the closest starter from `src/starters/` into `src/pages/<page-name>.html`:
   - `dark-hero-page.html`: inner page with the dark Hero Dusk header and hero (most pages)
   - `light-hero-page.html`: inner page with the light header and hero (About style)
   - `detail-page.html`: two column detail page with table of contents (case study or article)
2. Keep the header, booking card and footer includes exactly as they are.
3. Replace the placeholder sections with includes of existing sections, following your plan (Step 3).
4. Add the page to `src/index.html`.
5. `npm run build`, `npm run check`, then compare with `reference/pages/`.

**Standing rule:** every new section or element designed is added to the repo in the same piece of work, so the repo is always up to date.

---

## 17. Working in Figma (when the person asks for it)

- File key `9JQFLWC1KBelhUEaEZ6I1C`. Design on a working page, never directly on Final Design Pages. Frames move to Final Design Pages only after approval.
- Use the existing components from Assets & Components (`1231:897`) and the color variables. Use auto layout everywhere: padding and gap, never spacer frames.
- Each section is its own frame with its own padding and background; sections stack with 0 gap.
- Put backgrounds and gradients in frames to keep layers clean, and follow layer hierarchy.
- Eyebrow line sits in auto layout with the eyebrow text and matches its width.
- Keep all approved pages in mind as context, not only the page you are working on.
- Image placeholders describe the intended visual clearly.
- When done, share the frame link and a screenshot for review.

---

## 18. Quality bar

A page or section is done when it matches the approved design **at least 95%** at 1440, 768 and 375:

- [ ] Spacing follows section 9 exactly
- [ ] Type styles, sizes and weights match
- [ ] Colors and gradients are tokens and match
- [ ] Copy is identical to the approved content
- [ ] Images are correctly cropped and sharp
- [ ] No sideways scroll at any width; no console errors
- [ ] Hover, focus, keyboard and tap all work; reduced motion respected
- [ ] Text contrast at least 4.5 to 1
- [ ] No em dashes, no exclamation marks, no avoided words
- [ ] Hero has one CTA, and its gradient fades fully to white
- [ ] No orphan words in headings, intros or card titles
- [ ] Group titles are stronger than their content; paired sides match
- [ ] No decorative element looks like a CTA
- [ ] High sections pass the checklist in 13.10
- [ ] Claims pass section 4
- [ ] Every section maps to a repo partial, or is a documented new section
- [ ] Header, booking card and footer are the standard includes, unchanged
- [ ] The page file contains no `<style>`, inline styles or hex colors
- [ ] Nothing on the page appears that does not exist on an approved page, unless it is a planned new section
- [ ] Repo updated (library, docs, changelog) and pushed

Check by screenshotting the built page at the three widths and comparing side by side with the Figma frames. List any accepted difference with a reason.

---

## 19. Do's and don'ts

### Do

- Plan from business value first, then sections (section 6).
- Reuse existing sections for Low and Medium weight content.
- Give High weight content a distinctive, proof-led section with a visual anchor.
- Use icons and graphics where they carry meaning, in a few sections per page.
- Turn mid-page prompts with an action into a CTA band.
- Open every page and section with its answer.
- Put proof next to every claim.
- Keep spacing fixed and sections touching, with padding doing the work.
- Use one Warm Glow and one Deep Navy band at most.
- Keep copy plain, specific, warm and short.
- Follow a given content document strictly.
- Share links or screenshots for approval in the conversation.
- Keep the repo updated with every new section.

### Don't

- Don't design Low weight sections creatively, and don't put them on bands.
- Don't put two CTAs in a hero.
- Don't let a dark gradient end in a hard edge.
- Don't leave a single word on the last line of a heading or intro.
- Don't style icons, arrows or markers like buttons.
- Don't present services, industries or capabilities as plain text lists.
- Don't invent claims, numbers, client names or results.
- Don't use em dashes, exclamation marks or hype words.
- Don't promise results or use "guaranteed".
- Don't use shadows on cards, square or outline buttons, or new colors or fonts.
- Don't use Besley for headings or body.
- Don't use G4 on large areas.
- Don't stack two dark bands or repeat the same layout back to back.
- Don't use spacer elements or pick padding by eye.
- Don't put the founder photo anywhere except the booking section.
- Don't change the booking card or footer per page.
- Don't write "Contact us", "Get a quote", "in UX" (for the 20+ years), or "450+ B2B projects".
- Don't publish anything listed in section 20.
- Don't edit `dist/` or `tokens.css` by hand.

### 19.3 Failures seen before

Real mistakes from earlier AI generated pages, and the rule that prevents each one. Check every page against this list.

| # | What went wrong | Why it is wrong | The rule |
|---|---|---|---|
| 1 | The page was written from scratch with its own CSS instead of using the repo | Nothing matched the system: spacing, type, buttons, cards all drifted | Non-negotiable 1. Pages are includes plus content |
| 2 | The header nav became anchor links to the page's own sections | The header is global navigation, identical on every page | Non-negotiables 2 and 3 |
| 3 | A new footer was invented (anchor links, no offices, no social, no wordmark) | The footer is fixed and identical everywhere | Non-negotiable 2 |
| 4 | The booking card was redesigned: new headline, no founder photo, different layout | The booking card has two fixed versions; only the include is allowed | Non-negotiable 2. Ignore CTA copy in content files |
| 5 | Buttons were plain pills and an underlined text link, with no arrow circle | All CTAs are the Arrow Glide component | Non-negotiable 4 |
| 6 | The hero was a flat dark block, left aligned, with a decorative glow and a hard edge into white | Heroes use Hero Dusk fading to white, centered, no decoration | Non-negotiable 5, section 13.1 |
| 7 | The hero had two CTAs | One CTA per hero | Section 13.1 |
| 8 | The 5 step process became plain numbered text rows | The process section with icons exists and must be reused | Non-negotiable 6, section 13.6 |
| 9 | Ways to work became a 2 by 2 boxed grid with square corners, and listed four ways including the strategy workshop | Ways to work use the engagement section; there are exactly three ways; boxes have radius 8 | Non-negotiables 6, 7 and 11 |
| 10 | Three sections sat on tinted gradient backgrounds | One Warm Glow and one Deep Navy band at most; gradients are for important sections | Non-negotiable 8, section 10 |
| 11 | Spacing was uneven: very large gaps between some sections, cramped elsewhere | Fixed section padding only | Non-negotiable 9, section 9 |
| 12 | The whole page was text with no images, icons, numbers or proof | High weight sections need a visual anchor; claims need proof nearby | Non-negotiable 10, sections 6 and 13.10 |
| 13 | Checkmark icons in colored circles and a navy quote box were added to a terms list | Icons follow one outline style; supporting elements must belong to their section; nothing decorative should look like UI controls | Sections 13.5, 13.6, 13.7 |
| 14 | A low value section ("the principle") got a large two column feature treatment near the top | Low weight sections stay minimal and do not compete with High ones | Section 6.2 |
| 15 | Heavy dark rules and light hairlines were mixed in the same page | Dividers are 1px Steel hairlines; the 4px G4 rule only tops FAQ groups | Section 8.5 |
| 16 | The page had no proof at all (no VORO result, no client names, no stats) | Proof near claims; How we work must show the process in practice | Section 7.2, section 15.4 |

**Root causes behind most of these:** the model did not read the repo before building (Step 2), did not map each section to a repo file (Step 3), and did not compare its result with an approved page (Step 4). Those steps are not optional.

---

## 20. Open items (do not publish as final)

- 3motionAI name, screens and results (homepage outcome card stays a placeholder)
- AI interface case study (approval and anonymization pending)
- Partnership minimum terms per service
- AgentSelect timeframe; Qwary outcome number
- White label tone add-on (pending)
- UK as a client region
- Most FAQ answers are "Add answer here." placeholders
- Featured story video file; Aeonik font files; Calendly link; LinkedIn URLs
- Tablet and mobile designs exist only for the homepage and Success Stories pages; About and Insights follow the rules
- Not built in the repo yet: the CTA band (13.9) and a comparison table section (13.8). Build each once, following those rules, and add it to the library before reusing it

When any of these is resolved, update this file and `docs/OPEN-ITEMS.md`.
