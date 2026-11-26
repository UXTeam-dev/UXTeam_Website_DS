# LLM.md · UXTeam Website Design System

**Read this whole file before you plan, write, design or build anything in this repo, then follow the steps in section 0 (Step 0 to Step 4).** It is the single brief for any AI model, agent or tool working on the UXTeam website. It covers the business, the brand voice, the creative approach, the design rules, the coded system and the do's and don'ts.

**"You" in this repo means whichever AI tool is building the page** (Claude, Codex, Cursor, Gemini, Copilot or any other). Wherever a rule says "use your judgment", "write one", "pick" or "decide", the tool doing the work makes that call itself, following these rules. No step is reserved for one particular tool.

If something here conflicts with a direct instruction from the person you are working with, follow the person and point out the conflict in one line.

---

## Non-negotiables (read these even if you read nothing else)

Breaking any of these means the page is wrong, however good it looks.

1. **Only the developers' classes, only their stylesheet** ([docs/CSS-GUIDE.md](docs/CSS-GUIDE.md), mandatory). The live site runs one stylesheet, `src/css/uxteam-site.css`. A page uses only classes in [docs/CLASS-REGISTRY.md](docs/CLASS-REGISTRY.md): no `<style>` blocks, no inline styles, no invented, Bootstrap, Salient or old `ux-` classes. When nothing fits, add a new PART in `src/css/parts/` the developers' way (CSS-GUIDE section 5), never CSS in a page. A page built here pastes into WordPress as it is. **Build from the repo, never from scratch:** a page is the wrapper `<div class="uxt-home uxt-<key>">` plus sections copied from `src/partials/` (`<!-- @include partials/... -->`), with only text, links and images changed.
2. **Global sections are fixed and never in the page.** The header is Salient's own; the booking card and the footer are the footer global section (`src/global/footer-global.html`), on every page, with the card overlapping the footer. A page body never contains a header, a footer or a booking card; buttons that book a call link to `#book-call` (16.5).
3. **Header navigation is the site navigation** (What We Do, UXAudit, Work, About, Insights, Contact), never anchor links to the current page's sections.
4. **Every button is the developers' Arrow Glide button** (`uxt-button` + one type, `src/partials/elements/button.html`), always with the circle and its two arrow SVGs. No plain pills, no underlined links as CTAs, no buttons without the arrow.
5. **A hero uses the existing hero section** (`partials/sections/hero.html`): centered, one CTA, the dark hero that fades to white. No flat dark blocks, no glow blobs, no left aligned hero unless the design says so.
6. **Reuse the matching section first, whole.** Process or steps use the process section with icons. Ways to work use the engagement section. FAQ uses the FAQ component. Stories use story cards. Reuse approved sections with their approved copy, labels and layout, and never merge two of them (12.5). Only content with no matching section gets a new design.
7. **Radius 8 on cards and boxes, 1px Steel borders, no square corners, no shadows.**
8. **At most one Warm Glow band and one Deep Navy band per page.** Every other section is white.
9. **Fixed spacing only** (section 9). Sections touch; padding does the spacing.
10. **High weight sections get a visual anchor** (graphic, mockup, icons, numbers, proof). A page made only of text rows is not finished. **A process or approach section shows the process, never the result:** icons, numbers, steps, simple cards or a diagram, never a mockup or screenshot (13.6).
11. **Facts, offers and copy follow the business rules:** exactly three ways to work (Audit, Project, Partnership); the strategy workshop is a service, not a way to work; no invented claims.
12. **Equal items get equal treatment.** In a set of parallel items (the seven services, the industries), every item gets the same layout and weight; none is featured, none is split off (12.6).
13. **The page wrapper decides which styles apply** (15.5). `uxt-home` first, then the page key; a class that only works inside another page's wrapper is never used.
14. **Check your work against the approved pages** before saying it is done (section 18). If you cannot build or preview, say so.
15. **No gradient fills on content cards, and never a gradient on a gradient** (8.5). Content cards are white with a 1px Steel border (a gradient stroke on Deep Navy). Nothing with a gradient surface sits on a gradient band or hero.
16. **Every section header has an eyebrow,** whether or not the content document gives one. Write one if it is missing (8.4).
17. **Icons and graphics are SVG,** inline or an `.svg` file. Never a PNG, JPG, WebP or data URI image of an icon or graphic. **Icons start from Phosphor Light** (`assets/icons/phosphor/`, find with `npm run icon -- <word>`, place with `<!-- @icon name size="32" class="uxt-…" -->`); when a section needs icons with more character, curate custom ones in the same line style (`docs/GRAPHICS.md` 4.5). **Pick and draw every other graphic with `docs/GRAPHICS.md`:** the section's job decides the graphic family, and real images (client work, people, blog covers) are never generated; **Never add a real client mockup or screenshot:** wherever one is needed, put a labeled placeholder (an image box); the team adds the image later (8.6).
18. **The trusted-by logo strip is always `partials/sections/logos.html`, as it is** (auto scrolling, label "Trusted by B2B companies worldwide"). Never a static row of logos, never a new strip; the check compares it (12.5).
19. **A content heavy section is brainstormed before it is built** (12.7). Never stack every point the content gives into columns plus another section's content.
20. **Every hero has an eyebrow above the H1.** If the content gives none, write one (8.4).
21. **Read every line of copy in place and fix breaks that split a phrase** (5.4).
22. **Every arrow in a card is the Arrow Glide button as a `<span aria-hidden="true">`, and the card has `uxt-button-trigger`** so hovering the card plays the glide (11).


## 0. Start here

**Do not write copy, design or code until you have finished Steps 0 to 3, in this order. Do not hand anything over until you have done Step 4.** Skipping them is the main reason pages come out generic, badly spaced or off brand.

### Step 0. Make sure you have the current repo

Rules change often. An old copy of the repo means old rules.

1. Work from the latest `main`: `git fetch origin`, `git checkout main`, `git pull`. If you must work on another branch, create it from the latest `main` and name it `<type>/<what-it-changes>` (for example `page/white-label`; full rule in `CLAUDE.md`, "Branch names").
2. Confirm that `LLM.md`, `AGENTS.md`, `docs/CSS-GUIDE.md`, `skills/` and `scripts/check.mjs` exist, and read the top of `CHANGELOG.md`. If any of them is missing, you are on an old copy: stop and update before doing anything else.
3. If you cannot update (no network, read only access), say so before you start, and say which version you are working from.

### Step 1. Pick the approach

Before touching anything, settle four things and state them back to the person in a few lines:

| Decide | Options | How to decide |
|---|---|---|
| Task type | New page · New section · Change to an existing page or section · Fix | From the request |
| Where to design | **Figma first, then code** · **Code directly** | The person tells you each time. If they have not, ask before you start |
| Content | **Content document given** (follow it strictly) · **Only a page name or outline** (you write the copy) | From what was shared. See section 5 |
| Output | Figma frames · Coded page in the repo · Both | From the request |

Then say what you will produce, and what you need from the person, if anything.

**When the inputs disagree, ask before building.** Examples: the file name says one page and the document inside describes another; the brief contradicts an approved page; "start fresh" could mean new copy or a new design. Name the conflict in one line and ask which one is meant. Do not pick one silently and build a whole page on it.

**Know what "start fresh" means here.** It means a fresh page built from the system, not a fresh visual language. The page still uses the approved hero type, approved sections, blueprints and rules.

### Step 2. Build your knowledge from the repo

Read before you plan. At minimum:

| Read | Why |
|---|---|
| This file, completely | Business, voice, rules, craft, process |
| `docs/BRAND-GUIDE.md` | Full positioning, offer, page rules and claims |
| `knowledge/uxteam-website-knowledge.txt` | Facts from the live ux.team site: company and contact details, services, clients, all success stories, testimonials, FAQs, numbers with their approval status |
| `docs/CSS-GUIDE.md` and `docs/CLASS-REGISTRY.md` | The only classes you may use, the page structure, and how to add a class (mandatory) |
| `docs/COMPONENTS.md` | Every section and element partial with its fields |
| `docs/GRAPHICS.md` and `reference/graphics/` | Which icon, illustration, scene or image box goes where, and how to draw a new one |
| The developers' pages in `src/pages/` that are closest to your task | Tone, sentence length, markup and composition already live |
| The partials you might reuse, in `src/partials/` | The exact markup to copy for each section and element |
| `reference/pages/` and `reference/README.md` | Screenshots of every approved page, and approved live references |
| `docs/OPEN-ITEMS.md` | What is still a placeholder or not approved |
| `CHANGELOG.md` | What changed recently |

Also check, depending on the task:
- **Designing in Figma:** the approved frames on Final Design Pages and the components on Assets & Components (section 17).
- **Writing copy:** the copy on every approved page, so facts, numbers and repeated answers match.
- **Building a new section:** CSS-GUIDE section 5, PART B of `src/css/uxteam-site.css` (type, buttons, layout) and the PART of the closest existing section.

### Step 3. Share your plan, then start

Before any design or build, share a short plan in the conversation. For new pages and copy, follow the `uxteam-page-strategy` skill (`skills/uxteam-page-strategy/SKILL.md`):

1. The page's job, its reader and its single main action
2. The section list with business value weights and treatments (section 6.5)
3. **For every section, the repo file you will use** (for example `partials/sections/process.html`), and any new class it needs with the PART it goes in. "New" is allowed only for content no existing section can carry, with one line on why
4. **For every section with more than one idea or more than about 80 words of content, the composition brainstorm from 12.7:** two or three layout options, the one you picked and why, and what you cut, merged or moved
5. Any content changes, open questions or placeholders

Start once the plan is clear. For small changes and fixes, the plan can be one or two lines.

### Step 4. Review before you hand over

Before saying the work is done:

1. Run `npm run classes` if you changed CSS, then `npm run build` and `npm run check`. Fix every error it reports. Treat warnings as things to justify or fix. A page with a `<style>` block, an inline style or a class outside the registry is not done.
2. Screenshot the page at 1440, 768 and 375 and put it beside the closest approved page (`reference/pages/` holds screenshots of every approved page). Look for anything that does not appear on an approved page: a new color, a new card style, a different header or footer, a plain button, a flat hero. Remove it or justify it.
3. Go through section 19.3 (failures seen before) and confirm none of them is present. Check every section for an eyebrow (the hero too), card fills (no gradients), icon files (SVG only), the logo marquee and the composition of content heavy sections.
4. In the browser: read every heading and card at 1440, 768 and 375 and fix breaks that split a phrase (5.4); hover every card and confirm its arrow glides; scroll to the end of the preview and confirm the booking card and footer follow the page. (The header and its scroll behaviour are Salient's and show only on the live site.)
5. For any page or High weight section, run the review in the `uxteam-creative-review` skill and fix everything it ranks as important.
6. Report what you checked and anything you could not check.

---

## 0A. How to use this file

### 0A.1 Order of truth

When two sources disagree, the higher one wins:

1. The person's instruction in the current conversation
2. An approved content document for the page (if one is given)
3. This file
4. `docs/BRAND-GUIDE.md` (full positioning and brand guide). It wins on tone, framing and claims
5. `knowledge/uxteam-website-knowledge.txt` (facts from the live site). It is the fact source, but the brand guide wins where they disagree
6. Approved Figma frames on **Final Design Pages**, and live pages the person has confirmed as approved (listed in `reference/README.md`, for example new.ux.team/what-we-do)
7. The coded pages and sections in this repo
8. Your own judgment

### 0A.2 Approvals

All approvals happen in the conversation. When a design or page is ready for review, share the Figma link or a screenshot (desktop first, then tablet and mobile when built) and wait for feedback. Do not treat anything as approved until the person says so.

### 0A.3 Working with your tools

How you reach this repo changes what you can do. Work out which case you are in before Step 2.

| How you are connected | What to do |
|---|---|
| **The repo is cloned on your machine, with a terminal** | Read files directly. Run `npm run build`, then `npm run serve` and look at pages at http://localhost:4321/preview/. Take screenshots at 1440, 768 and 375 to check your work. Commit and push when done |
| **GitHub through an MCP server or the GitHub API (no terminal)** | Read files through the tool, starting with this file and the list in Step 2. Read source files in `src/`, never `dist/` (generated). You cannot build or preview: when you change files, change the source in `src/` only and tell the person the build and visual check still need to run. Use a branch and a pull request for changes unless told otherwise |
| **Only web access to the repo** | Read raw files from GitHub. Treat the repo as read only knowledge and deliver your output as files or designs for the person to add |
| **Figma through the Figma MCP** | File key `9JQFLWC1KBelhUEaEZ6I1C`. Read the approved frames and components before designing. Follow section 17. Share the frame link and a screenshot for review |
| **A browser tool** | Use it to view built pages or the live site and compare them with Figma. Never as a replacement for reading the source |

General rules for every tool:
- **Read before you write.** Never change a file you have not read in full.
- **Source, not output.** Edit `src/`, `docs/` and `assets/`. Never edit `dist/`, `docs/CLASS-REGISTRY.md` or the developers' files (`src/css/uxteam-site.css`, `src/pages/homepage.html`, `src/pages/what-we-do.html`, `src/global/footer-global.html`).
- **Keep the repo current.** Every new section or element goes in with its partial, its PART if any, its docs and a changelog line (section 16.2).
- **Be honest about checks.** If you could not build, preview or compare with Figma, say so instead of saying the page is done.
- **Large files.** `uxteam-site.css` is about 7,500 lines. Read the registry and the PART you need, not the whole file.

### 0A.4 Skills and outside guidance

This repo ships two skills in the `skills/` folder at the repo root. They are written for any tool or person: read the `SKILL.md` and follow it step by step. (`.claude/skills/` only holds pointers so Claude Code loads them automatically. Edit the skills in `skills/`.)

| Skill | Use it when | What it produces |
|---|---|---|
| `uxteam-page-strategy` | Planning any new page or rewriting a page's copy, especially when there is no content document | The page's job, reader and action, the story, section weights, a content brief per section, and the claims check |
| `uxteam-creative-review` | Designing a High weight section, or reviewing any page or section before handing it over | Design direction for the section, then a scored review with the fixes ranked |

Use them in this order on a new page: page strategy (Step 3 plan), then build, then creative review (Step 4).

**General design skills and guides** (for example UI/UX Pro Max or any style or palette generator) may be used **only** for usability, accessibility and performance checks. They must never choose styles, colors, fonts, layouts or tone for UXTeam. The brand is already decided: this file and the repo win every time.

### 0A.5 Quick map of this file

| # | Section | Use it for |
|---|---|---|
| 0 | Start here | Current repo, approach, knowledge, plan, review. Always first |
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
| 13 | Craft rules | Hero, line breaks, hierarchy, icons, tables, CTA bands, web quality standards |
| 14 | Section library | Every existing section and when to use it |
| 15 | Page blueprints | Templates for each page type |
| 16 | Building in the repo | Code structure and rules (with docs/CSS-GUIDE.md) |
| 17 | Working in Figma | When the person asks for Figma |
| 18 | Quality bar | What done looks like |
| 19 | Do's and don'ts | The short list, and failures seen before (up to 56) |
| 20 | Open items | What must not be published yet |

---

## 1. The repo

Plain HTML and CSS, built to match the live site exactly. The live site (new.ux.team) runs on the Salient WordPress theme: each page body is one Raw HTML element, the CSS is one file in Salient > Custom CSS, and the booking card and footer are a footer global section. This repo holds the developers' versions of those files and builds new pages the same way. **Rules for classes and CSS: [docs/CSS-GUIDE.md](docs/CSS-GUIDE.md) (mandatory).**

```
LLM.md                     This file (CLAUDE.md and AGENTS.md point here)
AGENTS.md, CLAUDE.md       Short pointers and the non-negotiables, read automatically by AI tools
README.md                  Human readable overview and quick start
CHANGELOG.md               Every change, newest first
docs/CSS-GUIDE.md          Mandatory class and CSS rules: existing elements, new classes, handover
docs/CLASS-REGISTRY.md     Every class a page may use (generated by npm run classes, never edited)
docs/                      also BRAND-GUIDE, GRAPHICS, COMPONENTS, FIGMA-MAP, HOW-TO-ADD, WORDPRESS, OPEN-ITEMS
knowledge/                 uxteam-website-knowledge.txt: facts from the live ux.team site
skills/                    uxteam-page-strategy and uxteam-creative-review, for any AI tool (section 0A.4)
reference/                 Screenshots of the approved pages (pages/), every graphic on the Figma Graphics board (graphics/), approved live references (README.md)
assets/                    fonts, icons (SVG, Phosphor and custom), graphics (SVG), images, logos

src/css/uxteam-site.css    The developers' live Custom CSS, PART A to R. Never edited (fingerprinted)
src/css/parts/             New PARTs written here, the developers' way (CSS-GUIDE section 5)
src/css/uxteam-site-additions.css  Imports the new PARTs in order
src/css/hooks.json         Classes needed by markup or scripts that have no CSS
src/pages/                 Page bodies. homepage.html and what-we-do.html are the developers' files (never edited)
src/global/                footer-global.html: booking card and footer, the developers' file
src/partials/sections/     Every section of the developers' pages, ready to copy (hero, logos, outcomes, stories, services…)
src/partials/elements/     Button, heading, FAQ item: the developers' exact markup with fill-in fields
src/starters/page.html     Start every new page from this

scripts/build.mjs          npm run build
scripts/classes.mjs        npm run classes (writes the registry)
scripts/check.mjs          npm run check: the mandatory gate for pages and CSS
dist/wordpress/            Paste-ready page bodies and the footer global section
dist/preview/              Full pages to review in a browser (stand-in header, images from new.ux.team)
dist/css/                  uxteam-site.css and uxteam-site-additions.css

legacy/                    The old ux- system (before the developers' CSS). Not used for new pages; kept as a visual reference while its designs are converted
```

Commands: `npm run build`, `npm run classes` (after any CSS change), `npm run check` (run after every build; must pass), `npm run serve` (http://localhost:4321/preview/<page>.html), `npm run dev`, `npm run icon -- <word>` (find a Phosphor icon). Legacy: `npm run legacy:build`, `legacy:check`, `legacy:bundle`.

Figma file: **UXTeam Website 2026**, key `9JQFLWC1KBelhUEaEZ6I1C`.
- Final Design Pages `1231:508` (approved pages, the only design source of truth)
- Assets & Components `1231:897` (components and interactions)
- Design System Guideline `2351:577` (rules)
- Graphics `2638:6786` (every icon, illustration and scene, with where each is used; see `docs/GRAPHICS.md`)

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
- Headings: short, sentence case, often first person ("Outcomes we've delivered"). Short label style titles (two to four words, such as "Design specialists") have no full stop; titles written as a full sentence keep it.
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
2. **Find the page's job and main action** in section 15.6 (page rules). If the page is not listed, define its job in one sentence and its single main action.
3. **Study what already exists.** Read the copy on the approved pages in `src/pages/` and the Figma Final Design Pages. Reuse their tone, sentence length, heading style and any matching content (facts, proof, service descriptions, FAQ answers). Repeated answers must match across pages.
4. **Plan the story** (section 7) and **score each section's business value** (section 6).
5. **Write section by section:** eyebrow, heading, optional subhead, body, actions, proof used.
6. **Check:** voice (section 3), claims (section 4), no em dashes, approved labels.
7. Share the content with the page design for review. Mark anything uncertain or invented as a placeholder.

### 5.4 Copy wrapping

Copy is read in a flow. When a line wraps because of the container or section width, the break must not cut the reader's thought.

1. **Read every heading, sub and card text in place** at 1440, 768 and 375, as a reader would, not just as a box that fits.
2. **Break at phrase boundaries.** A line ends after a complete phrase ("We design decisions," / "not just screens"), never between words that belong together: an adjective and its noun, a number and its unit ("50+ agencies"), a name ("UXTeam" and what follows it in a lockup), a verb and its short object, "and" or "of" left at the end of a line.
3. **No lone last word** (an orphan) in a heading, a sub or a card title. Rebalance the line or tighten the copy.
4. **How to fix it, in this order:** shorten or reorder the copy (within 5.3); then keep a pair together with `&nbsp;` or `<span class="uxt-nowrap">`; then, for a heading only, a manual `<br>` at a phrase boundary, hidden at the breakpoints where it no longer helps (the hero titles already hide `br` on mobile). Never shrink the type, never widen a container past the grid to make a line fit.
5. The CSS already balances headings (`text-wrap: balance`) and avoids lone words in body text (`text-wrap: pretty`). That helps, but it does not read the copy for you.
6. Equal cards in a row: titles that wrap should wrap at similar points, so the row reads evenly. Rewrite a title that is far longer than its siblings.

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
| Hero sub | 1 or 2 sentences, about 30 words, 3 lines at most |

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
| Services offered | High | SL-32 grouped service list (dark) on the homepage; the capability stack on a page dedicated to services (15.4) |
| Industry capabilities | High | SL-34 expanding industry cards |
| Outcomes and measured results | High | SL-20 outcome cards |
| Featured client story or video | High | SL-21 featured story |
| An offer's core value (for example what is inside the audit report) | High | New creative section |
| Success story grid | Medium | SL-22 story cards |
| Process or how it works | Medium | SL-33 process steps |
| Stats and company facts | Medium | SL-31 stats row |
| Team and leadership | Medium | Team section (About) |
| Client logos and presence | Medium | The logo marquee, as it is (SL-10). The hairline logo grid is About only |
| Ways to work with us | Low | SL-35 engagement models |
| Our approach, beliefs, principles | Low (Medium when paired with stats as proof, as on the homepage) | SL-30 principles |
| Why choose us (short reasons) | Medium | Why grid with icons (15.4) |
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

### 8.2 Colors

In new CSS, use the developers' variables where one exists, otherwise the hex below (CSS-GUIDE 5.5). In a page, colours come only from the classes.

| Name | Hex | In CSS | Use |
|---|---|---|---|
| navy | #0A1B33 | `var(--uxt-color-navy)` | Headings, primary button on light, navy cards |
| ink | #0D1315 | `var(--uxt-color-heading)` | Heading colour, darkest stop of dark gradients, social circles |
| slate | #5C6D85 | hex | Middle stop of hero and footer gradients |
| charcoal | #081219 | `var(--uxt-color-body)` | Body text |
| steel | #6F7680 | `var(--uxt-color-border)` | 1px card borders, dividers, key labels |
| mist | #F2F3F8 | hex | Soft panels (author box) |
| white | #FFFFFF | hex | Page background, cards, text on dark |
| sky | #A5ECFF | hex | 2px eyebrow underline (`underline-sky-blue`) |
| aqua | #A9FBFF | hex | Gradient start, labels on navy |
| peach | #FEDFBA | `var(--uxt-color-peach)` | Gradient end, numerals on navy |

Support colours for specific uses: hero-sub #E4F0FF, stroke-soft #ACB5C2, stroke-tag #516076, stroke-menu #D8DADD, photo-bg #C1CCDE, author-bg #F6DBA0, toc-active #111111, logo-underline #919C9F.

**Never** flat black, never new background colors. Dark surfaces are always gradients built from ink, navy and slate.

### 8.3 Gradients

| Name | Use |
|---|---|
| G1 Hero Dusk | Dark hero background fading to white so the next block overlaps the fade |
| G2 Deep Navy | One important dark band per page (services) |
| G3 Footer | Footer only |
| G4 Aqua to Peach | The signature accent: highlight words, strokes, 4px rules, icons. **Never large areas** |
| G5 CTA Card | Booking card |
| G6 Detail Card | Existing rows on the approved Success Story detail page only. **Never on a new card or section** (8.5) |
| G7 Warm Glow | One soft feature band per page |
| G8 Hero Light | Light hero version |

Client brand gradients appear only inside outcome cards (client band).

**Gradients are for backgrounds and accents, never for content cards.** Backgrounds: the hero, one Warm Glow band, one Deep Navy band, the booking card, the footer. Accents: G4 words, strokes, rules and icons. A gradient surface never sits on another gradient surface (no G6 or G5 card on Warm Glow, Deep Navy or a hero).

### 8.4 Type

Three fonts only:
- **Aeonik**: headings and buttons
- **Manrope**: body, nav, labels, forms
- **Besley**: eyebrows, meta lines, labels, numerals, stats, quotes, founder name, footer heads. **Never for headings or body.**

| Role | Spec |
|---|---|
| Display H1 | Aeonik Regular 90 (64 tablet, 44 mobile). Homepage, hub pages (What we do) and the About hero only (15.5) |
| Inner page H1 | Aeonik Medium 64 |
| Section H2 | Aeonik Medium 50 (40, 32), Navy, centered for section intros |
| Card, step, column title | Aeonik Medium 30 (26, 22) |
| Small title (FAQ, blog card, detail cards) | Aeonik Medium 25 |
| Body | Manrope 20 (18, 17); 18 and 16 for dense cards |
| Eyebrow | Besley Medium 14, uppercase, +8% tracking, 2px Sky line matching the text width, 5 below. **Every section header has one** (below) |
| Meta and labels | Besley Medium 18 |
| Stats | Besley Bold 60 + Regular "+", label Aeonik Regular 30 |
| Quote | Besley Italic 28 |

- **Every hero has an eyebrow above its H1,** on every page type. If the content gives none, write one: two to six words that name the page's topic or audience (for example "B2B SaaS and AI", "From the UXTeam studio", "Success story"), never a repeat of the H1. On article pages the category and date line above the H1 is the eyebrow.
- **Every section header has an eyebrow** above its H2, on every page type except the long form body of detail pages (article and case study content blocks). If the content document gives none, write one: two to four words naming the topic or the reader's question (for example "How we work", "Built for SaaS", "Why UXTeam"), never a repeat of the heading.
- Headings: sentence case, -2% tracking.
- A **G4 gradient word** in a heading is optional, only for a word or short phrase that needs attention (`uxt-accent-strong` where the developers use it; otherwise a new class in a PART).
- Numbers may go bigger than the text styles in Besley for balance.

### 8.5 Shape and depth

- Cards: white, 1px Steel border, radius 8, **no shadow, no gradient fill.** This is a hard rule for every content card (a card holding a title, text, a list, a stat or an icon), on every page and every background. The only cards with gradients are approved components used as they are: the booking card (G5), the outcome card's client band, the service card's gradient stroke on Deep Navy, and the existing Success Story detail rows (G6).
- **Never a gradient on a gradient.** A card, panel or band with a gradient surface never sits on a gradient background. On Warm Glow, cards are white. On Deep Navy, cards have no fill and a gradient stroke.
- Radius 6 for images and logo tiles inside cards, 12 for navy stat strips, 4 for inputs, pill for buttons and chips.
- Prefer **hairlines** to structure text heavy layouts before adding boxes.
- On dark backgrounds, cards use gradient strokes, not fills.
- Only effects allowed: glass play button, soft shadows on device mockups.

### 8.6 Icons and imagery

**`docs/GRAPHICS.md` is the full guide.** In short, six families, chosen by the section's job:

| Family | Where | Look |
|---|---|---|
| 1 Process icons, 64px | The process section | Navy 1.5 outline, one G4 filled shape |
| 2 Phosphor Light icons, 32px on a tile; 24px meta icons | Trust points, expectations, benefits (tint tile); audiences (Navy tile); client facts (24px Steel, no tile) | Navy 1.5 outline, no fill |
| 3 Spot illustrations, 200 x 140 | Topic or path tiles, on a Mist panel | 3 to 9 shapes, Navy 1.5, exactly one G4 shape |
| 4 Product scenes, 518 x 518 | Service rows and other High sections that show what the client gets | Navy panel, two soft glows, simplified UI, one flagged problem, white floating cards |
| 5 Mini scenes, 257 x 200 | A row of four parts of one capability | Dark base, two glows in one hue, one white card |
| 6 Image boxes | Anywhere a client mockup, screenshot, photo or cover is needed | Mist box, dashed Steel border, a label that names the image |

**Real client mockups and screenshots are never added to a page.** Wherever a section needs one (a service scene showing client work, an outcome card, an industry card, a case study visual), put a labeled placeholder (`partials/elements/placeholder.html`, class `uxt-placeholder`, `docs/GRAPHICS.md` section 8) at the exact size, and list it in `docs/OPEN-ITEMS.md`. The team adds the real image later. This does not change approved sections reused whole: their existing images stay as they are.

- Icons: **Phosphor, Light weight, is the base set** (`assets/icons/phosphor/light/`). For utility icons (trust points, benefits, meta facts, lists, controls) use it as it is: find one with `npm run icon -- <word>` and place it with `<!-- @icon name size="32" class="uxt-…" -->`; the build inlines it so it takes the container's color. 32px in tiles, 24px beside text. Never another weight or library, never an `<img>` of a Phosphor icon.
- **Curate custom icons when a section needs them:** when the icon is the main visual of a card or tile, or the set must carry the page's subject (example: the six service tiles in "What we design" on the B2B SaaS and AI page). Start from a familiar Phosphor shape, redraw it as Navy 1.5 strokes, combine and simplify, add one G4 accent, and keep the set consistent. One approach per section: all stock or all curated (`docs/GRAPHICS.md` 4.5). Process icons are provided in `assets/icons/process/` as SVG.
- **Icons, graphics, diagrams and illustrations are always SVG:** inline `<svg>` or an `.svg` file in `assets/`. Never a PNG, JPG, WebP or base64 data image of an icon or graphic, and never a screenshot of one. Raster files are only for photos, client logos supplied as raster, and real product screenshots. A missing icon is drawn as SVG in the house style or taken from Figma as SVG.
- Imagery: real, client-approved work over stock. One crop, one radius, one overlay per image set.
- Founder photo and name appear **only in the booking section**. Team pages use real photos with names.
- Product mockups (phones, laptops, browser frames) for outcomes and industries.
- Blog covers: editorial 3D style.
- Placeholders: describe the intended visual clearly in the placeholder.
- **Never generate imagery with AI image tools** (abstract glass shapes, 3D renders, invented interfaces) for the website unless the person asks for it. Use real, approved work and the assets in `assets/`, or leave a labeled placeholder that describes the visual. The hero types decide whether there is an image at all: the display and listing heroes have none.
- Mist is a surface for small panels (the author box, a CTA band). It is never a full section background.

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

Responsive: the developers' CSS handles it.

In code: every band is `uxt-full uxt-section` (110px top and bottom, set by the developers to match these values on the live site). Never add your own section padding; where a section needs different spacing, the developers' PART for it already sets it, and a new section's PART follows the closest existing one.

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
- Give the strongest band to the page's highest weight section (for example services on Deep Navy). A band is one way to add weight, not the only one: on What we do the capability stack stays on white and gets its weight from scale, visuals and interaction.
- **Header and hero:** dark (Hero Dusk, glass CTA) or light (light hero, primary CTA). Vary between pages so every page does not look the same.
- **A dark hero always fades fully to white before it ends.** No visible edge where the next section starts. See 13.1.
- On dark backgrounds, foreground elements must **blend in**: navy or glass cards, gradient strokes. A bright white strip on a dark fade looks wrong.
- Every page ends dark with the footer. The booking card floats across the white to dark boundary.
- Contrast at least 4.5 to 1 for all text, including grey text and captions. If a gradient makes text hard to read, adjust the gradient, not the text color.

---

## 11. Buttons and calls to action

Only from the **CTA / 01 Arrow Glide** button (`uxt-button` + a type, CSS-GUIDE 4.3). Every CTA is a pill with an arrow circle, or a text link with an arrow circle. No square or outline buttons.

| Type | Where |
|---|---|
| Glass (on dark) | Header only, dark header |
| Primary on dark | Dark hero |
| Primary on light | Light hero, booking form, light header, one closing action under a section, the main action inside a large capability card |
| Secondary (text link + circle) | Inside a card or column only, never alone at section level |
| Secondary subtle | Inside dark cards |
| Icon (circle only) | Industry cards, blog cards |

- One main CTA per screen.
- **A section's closing action is one Primary pill, centered, alone** ("Learn How We Work", "Read Other Blogs"). Never a Secondary text link floating at section level, and never a Primary plus Secondary pair under a section.
- **Inside a card:** at most one Primary (that card's own action, for example "Book an Audit") and one text link. Never three actions in one card.
- **A hero has exactly one CTA.** See 13.1 for choosing it when the content gives two.
- **Only CTAs look like CTAs.** The arrow circle, pills and the Aeonik 17 link style are reserved for things you can click. See 13.5.
- A prompt with an action in the middle of a page ("Need something else?") becomes a CTA band, not loose text and a button. See 13.9.
- Label: "Book a Discovery Call". Audit offers: "Start with an audit".
- Interaction: arrow glide 350ms ease out. Card hovers 300ms. Industry cards 450ms. FAQ 420ms height, 300ms fade and icon change.
- **Cards play the CTA hover.** Any arrow in a card (story cards, insight cards, industry rows, service cards) is the Arrow Glide button as a `<span aria-hidden="true">`: `partials/elements/button-icon.html` (circle only) or `button-in-card.html` (Secondary). Never draw a separate arrow, never a "→" character as a CTA. The card gets `uxt-button-trigger`, so hovering it plays the arrow glide and the Secondary underline. The card itself is the link.

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
   - Use the existing foundation only: PART B classes, the colours in 8.2, grid, radius, the button.
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

Full page screenshots of every approved page are in `reference/pages/` (see `reference/README.md`), and the live pages at new.ux.team are the coded reference. The creative sections to study before designing a new one: outcomes, featured story, services and industries (`src/partials/sections/`), and their screenshots. The old system's reference folders (`legacy/src/sections/*/reference/`) still hold the design notes for those sections.

When you add a new creative section, put its Figma export in `reference/sections/<name>/` with a short `NOTES.md`: the business point, why it looks this way, what can vary and what must not.

### 12.5 Reuse approved sections exactly

When a page needs content that already exists as an approved section (the process, the partnerships stories, the outcomes, the logo strip, the FAQ), use that section **as it is, with its approved copy and labels**:

- Keep the approved wording. The process steps are "1. Audit" with the story line "We walk your product as your buyers do.", not "Step 1 / Audit" with new copy. The logo strip label is "Trusted by B2B companies worldwide".
- **The trusted-by logo strip is always `partials/sections/logos.html`,** the auto scrolling strip with its approved logos, wherever a page shows trusted partners (under a hero or as a trust row). Never a static row of four or five logos, never a new logo layout, never a hand picked subset. The About page's "Our clients" logo grid is a different approved section and stays on About. The homepage FAQ heading is "What we observe, think, and learn".
- Keep the approved structure. The partnerships section is the featured video story plus three story cards; the outcomes section is two outcome cards. Never merge two approved sections into one new section, and never add a sub heading inside one to make room for another.
- Keep the approved layout. Story cards are always three across on desktop. A two across story grid does not exist.
- Change copy only where the page's content document says so.

### 12.6 Items of equal weight get equal treatment

When a section presents a set of parallel items (the seven services, the industries, the ways to work), every item gets the same layout, the same visual weight and the same parts:

- Never feature one item in a rich card and leave the others as plain text rows.
- Never pull one item out of the set into its own band (for example AI design on a separate dark band while the other services sit on white). A set stays together.
- If one item is the natural starting point (the audit), mark it with a label such as "Start here", not with a different layout.
- An index of the items (anchor links) is a compact sticky tab bar, never a grid of tiles that fills a screen before the content starts.

### 12.7 Brainstorm content heavy sections before building

A section that receives a lot of content (several groups of points, or more than about 80 words) is a design problem, not a layout to fill. Dumping every point into columns, or stacking two kinds of content in one section, makes a wall the reader skips. Before building such a section, think it through and write it in the plan (Step 3):

1. **Name the one idea** the section must leave with the reader, in one sentence. If you need two sentences, it is two sections or one idea is cut.
2. **Sort the content:** what proves the idea, what supports it, what repeats another section, what the reader does not need here. Cut or move the last two. Never repeat another section's content (for example the full process inside a "how we fit your team" section).
3. **Sketch two or three compositions** in words (for example: a short intro with three icon points; a split with a diagram on one side and three lines on the other; a numbered strip). Pick the one that makes the idea readable in five seconds and differs from the neighbouring sections.
4. **Write to the composition,** within the limits in 5.3. Each item gets a short title and at most one line or two of body.
5. **Check:** one focal point, at most one group of parallel items, one visual anchor if it is Medium or High, and it reads in five seconds.

The same thinking applies when you write the content yourself from an outline (5.2): plan the composition first, then write only what it can hold.

---

## 13. Craft rules

These rules fix the details that make a page feel finished. They apply to every page, in Figma and in code.

### 13.1 Hero

- **One CTA only.** A hero has exactly one action. If the content gives two, keep the one that matches the page's main action (section 15.6), usually "Book a Discovery Call". The other destination is usually covered by the page itself (for example "See how it works" is just the next sections). If it is still needed, place it as a text link inside the section it belongs to.
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
- Choose the graphic family with the table in `docs/GRAPHICS.md` section 1. One family and one size per section.
- **A section about a process, an approach, a method or principles shows how the work happens, never what it produces.** Use icons, step numbers, simple white cards, a flow or a diagram drawn in SVG. Never a product mockup, a phone or browser frame, a screenshot or an "illustrative interface". Mockups belong to outcomes, stories and industries, where they show a result.
- Every High section has a visual anchor: an illustration, a product mockup, a preview of a deliverable, a diagram, a large number or an icon set. Graphics that show data are labeled "Illustrative".

### 13.7 Everything inside a section belongs to it

- Supporting elements (a confidentiality note, a guarantee, terms, a footnote) are designed as part of their section: same surface, same stroke and radius, on the same grid, placed as the closing row or a side column.
- A high contrast card (navy on light, white on dark) is used only when it is the section's focal point. A supporting note gets a quieter treatment: a row separated by a hairline, a gradient stroke on dark, or an icon with text. Never a gradient filled card.

### 13.8 Tables

- Rows are separated by 1px hairlines. No full grid. Vertical lines only where columns truly need them.
- **The highlighted column** (UXTeam) gets a G6 fill and a 1px stroke around the whole column with radius 8, so it reads as one unit. The table sits on a white section, never on a gradient band.
- Column headers and row labels use Besley Medium 18. Cell text is Manrope 16 to 18, short and parallel, never paragraphs.
- On mobile the table scrolls inside its own container with the first column fixed, or becomes one stacked card per row.

### 13.9 CTA bands inside a page

- When content ends a section with a question and an action (for example "Need something outside these three?"), give it a CTA band instead of loose text and a button.
- A CTA band sits inside the 1200 container: radius 8, a Mist panel on light pages (as on the live What we do page, never a gradient fill), a navy card with a gradient stroke on dark, a heading in the 30 style, one line of body, one Primary button on the right (stacked under the text on mobile).
- At most 2 per page. Never directly above the booking card. It counts as that screen's one main CTA.

### 13.10 High section checklist

A High weight section is ready only when all of these are true:

- [ ] It makes its business point within a few seconds of looking at it.
- [ ] It has a visual anchor (13.6), not just text.
- [ ] Its composition differs from the sections around it.
- [ ] It gets more space and more emphasis than Low sections: a band, gradient stroke cards on Deep Navy, or larger scale with visuals and interaction (the capability stack), within the band limits in section 10.
- [ ] It has clear hierarchy (13.3) and one main action at most.
- [ ] It is still fully on brand: registry classes only, PART B type, radius, the button, an eyebrow, white cards without gradient fills, SVG icons.

### 13.11 Besley for labels

Besley is the voice of labels. Column headers, row labels, step numbers, group labels, meta lines and small descriptors use Besley (Medium 18, or the 14 uppercase eyebrow style). Titles and body stay in Aeonik and Manrope. Use judgment where a label also works as a title (13.3).

### 13.12 Web quality standards

Accessibility, performance and interaction basics every page meets. Most are built into the components already; keep them intact when you build something new.

**Accessibility**
- Text contrast at least 4.5 to 1 (3 to 1 for text 24px and up or bold 19px and up), including grey text, captions, and text on gradients and images.
- Visible focus state on everything interactive. Never remove the focus outline.
- The header's "Skip to content" link targets `<main id="main">`. Every page keeps that id.
- One H1, then H2 and H3 in order, never skipping a level for styling. Use the type classes to change size, not the heading level.
- Icon-only controls (play button, social links, menu toggle) have an `aria-label`. Decorative images use `alt=""`; meaningful images get a real description.
- Never carry meaning by color alone. Pair it with text or an icon.
- Toggles (FAQ items, menus, the section menu) expose their state with `aria-expanded`. Anything that opens on hover (industry cards) also opens on keyboard focus.
- Respect `prefers-reduced-motion`.

**Touch and interaction**
- Tap targets at least 44 by 44 px, with at least 8 px between them on tablet and mobile.
- Anything that opens on hover also opens on tap and on keyboard focus.
- Clickable elements show a pointer cursor and a visible hover and focus state.

**Readability**
- Body text never below 16 px on mobile.
- Long text lines stay around 60 to 75 characters on desktop (the 810 article column and the 760 intro width do this).
- Numbers in tables and stats line up (`font-variant-numeric: tabular-nums` where numbers are compared).

**Performance**
- Every image has `width` and `height` (or an aspect ratio) so the page does not jump while loading.
- Photos are WebP, at 2x their display size at most. Images below the first screen use `loading="lazy"`.
- Fonts use `font-display: swap`. Only the fonts used above the fold are preloaded.
- Scripts load with `defer`. No third party scripts without the person's approval.

**Motion**
- Animate only `transform` and `opacity`, never width, height or position properties (the FAQ height animation is the one deliberate exception).
- Use the developers' motion timings (300ms ease-out for movement, 200ms for colour, as in PART N). Micro interactions 150 to 350 ms; nothing longer than 450 ms.
- Motion explains a change (open, close, move). No decorative animation, at most one or two moving things per screen.
- Animations never block clicks or scrolling.

**Forms**
- Visible labels on every field, never a placeholder alone. Mark required fields.
- The right input types and `autocomplete` values (`email`, `url`, `name`).
- Validate when the visitor leaves a field or submits, not on every key. Show the error under the field, say how to fix it, and move focus to the first invalid field.
- Announce the result of a submit with `role="status"` or `aria-live`.

**Navigation**
- Navigation stays the same on every page. When a nav link points to the current page, mark it with `aria-current="page"`.
- Every key page and every section a visitor might share has a URL or an anchor.

---

## 14. Section library

Each section is either **live** (the developers built it; copy its partial from `src/partials/` and change only text, links and images) or **design only** (approved in Figma or in the old system, no `uxt-` code yet). A design only section is built the first time a page needs it: markup in `src/partials/sections/`, styles in a new PART (CSS-GUIDE section 5). The old system's version in `legacy/src/` is the visual reference, never code to copy. Weight is the typical weight from section 6.

### Global (never in a page)

| Code | Section | Where it comes from |
|---|---|---|
| SL-01 | Site header | Salient's header (PART O hides it on scroll down) |
| SL-02, SL-03 | Booking card and footer | Footer global section, `src/global/footer-global.html` (PART E, L, D). Buttons link to `#book-call` |
| SL-04 | Section heading (eyebrow, H2, optional intro) | `partials/elements/heading.html`, `heading-intro.html` (PART B) |

### Live sections

| Code | Section | Weight | Content fit | Partial | Works inside |
|---|---|---|---|---|---|
| SL-10 | Display hero + logo strip | High | Eyebrow, H1, one or two sentences, one CTA | `sections/hero.html` + `sections/logos.html` | `.uxt-home` |
| SL-20 | Outcome cards (2 up) | High | 2 measured results with a metric | `sections/outcomes.html` | `.uxt-home` |
| SL-21, SL-22 | Featured video story + 3 story cards | High | 1 story with video, then 3 cards: logo, title up to ~14 words, meta | `sections/stories.html` | `.uxt-home` |
| SL-30, SL-31 | Approach columns + stats row | Low to Medium | 3 differentiators, 3 numbers | `sections/approach-stats.html` | `.uxt-home` |
| SL-32 | Grouped service list (dark band) | High | Services grouped under buyer questions | `sections/services.html` | `.uxt-home` |
| SL-33 | Process steps | Medium | 4 to 5 steps: icon, number label, title, body | `sections/process.html` | `.uxt-home` |
| SL-34 | Industries (expanding rows) | High | 4 industries with image, description, count | `sections/industries.html` | `.uxt-home` |
| SL-35 | Ways to work (3 columns) | Low | Audit, Project, Partnership | `sections/engage.html` | `.uxt-home` |
| SL-40 | Insight cards | Medium | 3 articles: image, meta, title | `sections/insights.html` | `.uxt-home` |
| SL-42 | FAQ (two columns) | Low | 6 to 8 questions | `sections/faq.html`, `elements/faq-item.html` | `.uxt-home` |
| Capability stack | Sticky tabs + stacked capability cards + closing CTA | High | 5 to 8 capabilities | `sections/capabilities.html` + `capabilities-script.html` | `.uxt-wwd` only |
| Why grid with icons | 4 columns, outline icon, title, one sentence | Medium | 4 reasons | `sections/why.html` | `.uxt-wwd` only |
| About sections | Hero, logos, beliefs, leaders, team, stories, FAQ | Medium | About page | PART R is live; markup to come from the developers | `.uxt-about` only |

"`.uxt-wwd` only" means the styles are scoped to What we do. To use that section on another page, move its styles into a shared PART first (CSS-GUIDE 5.4), and agree it with the developers.

### Design only (build with a new PART when first needed)

| Code | Section | Weight | Content fit | Visual reference |
|---|---|---|---|---|
| SL-11 | Listing hero | High | Index pages (work, insights, services overview) | `legacy/src/sections/hero-listing`, `reference/pages/` |
| SL-12 | Case study hero (partnership lockup, intro, person) | High | Success story details | `legacy/src/sections/hero-case-study` |
| SL-13 | Article hero (meta, title, cover) | High | Insights articles | `legacy/src/sections/hero-article` |
| Light hero | Light hero with stats | High | About and lighter pages | `legacy/src/sections/hero-light` |
| SL-23 | Client quote | Medium | Quote, person, logo | `legacy/src/components/detail-blocks` |
| Beliefs grid | 6 principles on Warm Glow | Low | 6 short beliefs | PART R (About) has one: reuse it there |
| Expectations row | 4 columns, Steel hairline, 56px tint icon tile, title, two lines | Low to Medium | 4 promises or requirements | Figma `2638:22316`, `legacy/src/sections/expectations` |
| Topic tiles | 3 or 6 tiles, Mist spot illustration, title with arrow circle | Medium | Topics or paths to choose from | Figma `2638:22054` |
| Service row with scene | 1200 card: eyebrow, title, intro, checklist, actions; 518 product scene | High | One service: intro, 5 items, actions, one scene | Figma `2638:17149` to `2638:19804` |
| Numbers band | Up to 4 Besley numerals with unit and label on Deep Navy | Medium | Safe numbers only (knowledge section 10) | `legacy/src/sections/numbers-band` |
| Capability with mini scenes | Four mini scenes with titles and two lines | Medium to High | Four parts of one capability | Figma `2638:20489` |
| SL-41 | Filter chips | Low | Listing pages | `legacy/src/sections/filter-bar` |
| SL-50 to SL-60 | Detail page kit: TOC rail, content shell, key value table, navy stat strip, list rows, numbered outcomes, Q&A cards, about block, article body, author and share, related row | Low to Medium | Success story and article pages | `legacy/src/components/detail-blocks`, `reference/pages/` |
| About (old) | Logo grid, story split, team | Medium | About | Replaced by PART R |

Fields for every partial are in `docs/COMPONENTS.md`. Every class with where it works is in `docs/CLASS-REGISTRY.md`.

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

### 15.4 BP-4 Hub page: What we do (live at new.ux.team/what-we-do)

The approved direction for a page that sells the whole offer. Use it for What we do, and as the model for any page that presents all services or capabilities.

1. Header + **display hero** (the homepage style): eyebrow, H1 at the display size, one short sub (about 30 words at most, 3 lines), one Primary CTA, the logo strip labeled "Trusted by B2B companies worldwide". (The live page has no eyebrow yet; rule 20 applies, and this is raised with the developers in `docs/OPEN-ITEMS.md`.)
2. **Capabilities, the High section.** Section header ("Our capabilities at a glance"), then:
   - a sticky tab bar with one tab per capability, the active one underlined as you scroll;
   - one large white card per capability (radius 8, 1px Steel border, roughly 40 by 56 padding), stacked so each card slides over the previous one on desktop: text on the left (title at about 40, a short intro, an arrow list of what is included, a Besley "Where it fits" line, one Primary action for that service plus at most one text link), and a deliverable visual on the right (about 518 square: an audit report, a product screen, a website);
   - AI design as one of these cards, with its four sub areas shown as a row of small image tiles inside the card;
   - a closing CTA band ("Don't see exactly what you need?") on a Mist tint with the button on the right.
   On mobile the tab bar scrolls sideways and each card stacks with the visual on top.
3. How we work: the approved process section, unchanged, closing with one Primary "Learn How We Work".
4. Why B2B teams choose UXTeam: four columns separated by hairlines, each with an outline icon, a short title (no full stop) and one sentence, on Warm Glow.
5. The partnerships behind the results: featured video story plus three story cards, unchanged.
6. Outcomes we've delivered: the two outcome cards, unchanged.
7. Insights: three blog cards and one Primary link to the blog.
8. FAQ: two groups, heading "What we observe, think, and learn".
9. Booking card and footer: the footer global section, not part of the page.

Code: the whole page is `src/pages/what-we-do.html` (the developers' file); its sections are in `src/partials/sections/` (`capabilities.html`, `why.html` and the shared homepage sections).

### 15.5 Wrapper, hero and page end for each page type

The booking card and footer are the same on every page (the footer global section). What changes per page is the wrapper and the hero.

| Page type | Example | Wrapper | Hero |
|---|---|---|---|
| Homepage | Homepage | `uxt-home` | Display hero + logo strip (`sections/hero.html`) |
| Hub (whole offer) | What we do | `uxt-home uxt-wwd` | Display hero + logo strip |
| Company | About | `uxt-home uxt-about` | About hero (PART R) |
| Listing | Success Stories, Insights | `uxt-home uxt-<key>` | Listing hero (design only, section 14) |
| Detail | Case study, article | `uxt-home uxt-<key>` | Case study or article hero (design only) |
| Inner | UXAudit, How we work, White label, industry pages | `uxt-home uxt-<key>` | Display hero, or a listing or light hero once built |

Pages that should end with the footer only (the Insights listing and articles) need the booking card switched off for that page in WordPress. That is a developer setting, listed in `docs/OPEN-ITEMS.md`.

### 15.6 Page rules for pages still to come

| Page | Its job | Must include | Main action |
|---|---|---|---|
| UXAudit | Make the audit tangible and low-risk | What is inside the report, a sample report preview, turnaround, what we need, "quoted after one call" | Start with an audit |
| What we do | Explain each service plainly | Follow BP-4 (15.4): capability stack with one card per service, process, why us, proof, FAQ | Book a Discovery Call |
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

**The full rules are in [docs/CSS-GUIDE.md](docs/CSS-GUIDE.md). They are mandatory, and `npm run check` enforces them.** This section is the short version.

### 16.1 Rules

- **One stylesheet.** Pages use only `src/css/uxteam-site.css` (the developers' live CSS) and new PARTs in `src/css/parts/`. No `<style>`, no `style=""`, no linked stylesheets.
- **Registry classes only.** Every class on a page is in `docs/CLASS-REGISTRY.md`. Never PART A classes (old Salient CSS), never Salient element classes (`nectar-*`, `wpb_*`), never the old `ux-` classes, never invented ones.
- **Copy, then change content.** A section is copied from `src/partials/sections/` or built from `src/partials/elements/` (`<!-- @include partials/... key="value" -->`). Change text, links and images; keep classes and structure.
- **Wrapper first.** The page body is `<div class="uxt-home uxt-<key>">` and everything is inside it.
- **New classes the developers' way:** `uxt-<page key>-<part>`, flat hyphens, variants as a second class, states `is-*`/`has-*`, one PART file with the header, scoped to the page wrapper (CSS-GUIDE section 5).
- **Never edit the developers' files** (`uxteam-site.css`, `homepage.html`, `what-we-do.html`, `footer-global.html`). The check fingerprints them.
- **Scripts** only from the approved `*-script.html` partials. New behaviour is a request to the developers.
- **Accessibility.** Semantic HTML, one H1, headings in order, alt on every image, buttons with labels, keyboard support.
- **Images** from the WordPress media library (`/wp-content/uploads/…`). Icons and graphics are SVG.
- **Copy.** Paste from the approved content. Never retype from memory.

### 16.2 Adding a new section or element

1. Check the registry and the partials once more. Most sections exist.
2. Write the markup as a partial in `src/partials/sections/<name>.html` with a doc comment at the top (what it is, where it works, fields as `{{key|default}}`), using registry classes wherever they fit.
3. For what does not fit, write a new PART in `src/css/parts/` (CSS-GUIDE section 5) and import it in `src/css/uxteam-site-additions.css`.
4. `npm run classes`, `npm run build`, `npm run check`. Look at it in the preview at 1440, 768 and 375.
5. Update `docs/COMPONENTS.md`, `docs/FIGMA-MAP.md`, `docs/OPEN-ITEMS.md` (placeholders) and `CHANGELOG.md` (with the PART for the handover), commit with the Figma node in the message, push.

### 16.3 Starting a new page

1. Copy `src/starters/page.html` to `src/pages/<page-name>.html` and set the wrapper (`uxt-home uxt-<key>`).
2. Fill it with section partials, following your plan (Step 3).
3. `npm run build`, `npm run check`, open `dist/preview/<page-name>.html`, compare with `reference/pages/`.
4. Hand over `dist/wordpress/<page-name>.html` and, if any, `dist/css/uxteam-site-additions.css` (CSS-GUIDE section 7).

**Standing rule:** every new section or element designed is added to the repo in the same piece of work, so the repo is always up to date.

### 16.4 Stay inside the scope of the task

A page task adds a page, and the new sections that page needs as reusable sections. It does not change the rest of the site.

- **Do not edit shared files as part of a page task:** the developers' files, other pages, shared partials, `scripts/`. If the page needs one of these changed, stop and propose the change separately with the reason.
- **Do not add new mechanisms** (content catalogs, build steps, data files, new directives) without asking. Use the existing includes.
- **New sections are reusable sections.** Name the partial for what it is (`numbers-band`), and its classes with the page key of the page that first uses it, as the developers do (`uxt-wwd-cap`). When a second page needs it, its styles move to a shared PART.
- **Do not fill open items yourself.** Links, booking URLs, social links, article titles and dates listed as open (section 20) stay open until the person supplies them. Finding a value on the old site is a suggestion to raise, not a fact to ship.
- **Do not publish anything** (preview hosts, external sites, public links) unless the person asks. Deliver in the repo, and share screenshots for review.
- **Do not use button classes for something else.** `uxt-button` is only for real CTAs, or the arrow inside a card that is a link.

### 16.5 Global header and page end

**Header:** Salient's own header, not part of any page. PART O hides it on scroll down and shows it on scroll up. Never add a header, a sticky bar, a border or a background to a page.

**Booking card and footer:** the footer global section (`src/global/footer-global.html`, PART E, L and D), with fixed copy, on every page. The card overlaps the top of the footer, as in Figma. A page never contains either one; a button that books a call links to `#book-call`, which scrolls to the card.

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
- [ ] Colors and gradients come from registry classes or the 8.2 palette, and match
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
- [ ] Every section header has an eyebrow, and the hero has one above the H1
- [ ] Copy read in place at 1440, 768 and 375: no break splits a phrase, no lone last word
- [ ] Scrolling up brings back the Ink header bar; there is no line under the header
- [ ] Hovering each card plays its arrow glide
- [ ] The booking card overlaps the footer (page end after `</main>`)
- [ ] No gradient filled content card, and no gradient surface on a gradient background
- [ ] Every icon and graphic is SVG
- [ ] The trusted-by logos are the logo marquee include, unchanged
- [ ] Process and approach sections show the process, not a mockup
- [ ] Content heavy sections were brainstormed (12.7) and read in five seconds
- [ ] High sections pass the checklist in 13.10
- [ ] Claims pass section 4
- [ ] Web quality standards in 13.12 are met (focus, contrast, tap targets, image sizes, motion, forms)
- [ ] Every section maps to a repo partial, or is a documented new section
- [ ] Header, booking card and footer are the standard includes, unchanged
- [ ] The page file contains no `<style>`, inline styles, hex colors or classes outside the registry, and `npm run check` passes
- [ ] Nothing on the page appears that does not exist on an approved page, unless it is a planned new section
- [ ] Treatment matches the approved direction: the right sections are emphasized, approved sections are reused whole, equal items are treated equally
- [ ] Only the files the task needed were changed (16.4); nothing was published outside the repo
- [ ] Repo updated (partials, PARTs, registry, docs, changelog) and pushed

Check by screenshotting the built page at the three widths and comparing side by side with the Figma frames. List any accepted difference with a reason.

---

## 19. Do's and don'ts

### 19.1 Do

- Plan from business value first, then sections (section 6).
- Reuse existing sections for Low and Medium weight content, and approved sections whole.
- Treat every item of a set (services, industries) the same way.
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
- Give every section header an eyebrow, writing one when the content has none.
- Draw icons and graphics as SVG.
- Put an eyebrow above every hero H1, written by you when the content has none.
- Read copy in place and break lines at phrase boundaries.
- Use the Arrow Glide icon for every arrow in a card, so the card hover plays its glide.
- Leave the header, booking card and footer out of the page: they are global.
- Brainstorm two or three compositions for a content heavy section before building it.

### 19.2 Don't

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
- Don't fill content cards with a gradient, and don't put a gradient surface on a gradient background.
- Don't show a mockup or screenshot in a process or approach section.
- Don't build a static logo row; the trusted-by strip is the logo marquee.
- Don't use PNG, JPG, WebP or data images for icons or graphics.
- Don't add a line under the header or build your own sticky header.
- Don't draw a separate arrow in a card or use "→" as a CTA.
- Don't put the booking card inside `<main>`, and don't edit its copy.
- Don't leave a heading that breaks mid-phrase or ends on a lone word.
- Don't pour every point of the content into one section.
- Don't stack two dark bands or repeat the same layout back to back.
- Don't use spacer elements or pick padding by eye.
- Don't put the founder photo anywhere except the booking section.
- Don't change the booking card or footer per page. Pick the booking version by page type (15.5).
- Don't merge approved sections, rewrite their labels, or feature one item of a set over the others.
- Don't write "Contact us", "Get a quote", "in UX" (for the 20+ years), or "450+ B2B projects".
- Don't publish anything listed in section 20.
- Don't edit `dist/`, the registry or the developers' files by hand.
- Don't add a `<style>` block or a class that is not in the registry. Write a PART (docs/CSS-GUIDE.md section 5).

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
| 16 | The page had no proof at all (no VORO result, no client names, no stats) | Proof near claims; How we work must show the process in practice | Section 7.2, section 15.6 |
| 17 | What we do used the inner 64 hero with an eyebrow and a four line sub | A page that presents the whole offer uses the display hero with a short sub | Section 15.5 |
| 18 | The logo strip label was rewritten ("Companies we've worked with") | Approved labels are reused word for word | Section 12.5 |
| 19 | The seven services became a screen of index tiles, then one rich featured card (UX audit) and five plain text rows | Equal items get equal treatment; the index is a compact sticky tab bar | Section 12.6, 15.4 |
| 20 | No service had a visual: every capability was text only | Capabilities are High weight and each needs a deliverable visual | Sections 13.10, 15.4 |
| 21 | AI design was pulled out of the set onto its own Deep Navy band | A set stays together; a band is not a way to feature one item | Section 12.6 |
| 22 | The down arrow circles on the index tiles looked like CTAs | Only CTAs look like CTAs | Section 13.5 |
| 23 | "Don't see exactly what you need?" was plain centered text with a text link | A prompt with an action is a CTA band | Section 13.9 |
| 24 | The process copy and labels were rewritten ("Step 1", "Audit") | Approved sections keep their approved copy | Section 12.5 |
| 25 | Section closing actions were Secondary links, or a Primary plus Secondary pair; one card had three actions | One Primary per section close; at most one Primary and one link per card | Section 11 |
| 26 | Outcomes and success stories were merged into one "Case studies" section with a sub heading and two across story cards; the featured video story was dropped | Approved sections are reused whole; story cards are three across | Section 12.5 |
| 27 | The why grid had no icons and its short titles ended with full stops | Icons where they carry meaning; label style titles have no full stop | Sections 13.6, 3.3 |
| 28 | The FAQ heading became the generic "Frequently asked questions" | Reuse the approved heading | Section 12.5 |
| 29 | The inner booking card was used on a hub page | Hub pages use the homepage booking version | Section 15.5 |
| 30 | On mobile the seven index tiles filled about 1000px before any content | Index becomes a sideways scrolling tab strip on mobile | Sections 12.6, 15.4 |
| 31 | The model worked on an old copy of the repo: it read a rules file that no longer exists and never saw LLM.md, the skills, the starters or the page check | Rules only work if the current repo is read | Step 0 |
| 32 | The attachment's file name and its content described different pages; the model guessed instead of asking | Conflicting inputs are raised before building | Step 1 |
| 33 | "Start fresh" was read as permission for a new visual language: a left aligned split hero with an AI generated glass illustration | Fresh page, same system; no AI imagery; heroes from the approved types | Step 1, sections 8.6, 15.5 |
| 34 | Section intros were left aligned across the page | Section intros (eyebrow + H2) are centered; left aligned headers are for detail pages | Sections 8.4, 14 (SL-04) |
| 35 | Insights sat on a full Mist band, making four tinted or dark areas on one page | Mist is for panels; at most one Warm Glow and one Deep Navy band | Sections 8.6, 10 |
| 36 | The capability index tiles carried the button classes | Component classes are used only for what they are | Section 16.4 |
| 37 | The case studies were new invented cards instead of the outcome and story cards | Approved sections are reused whole | Section 12.5 |
| 38 | The FAQ became one list beside a left aligned heading instead of the approved two groups | Approved sections are reused whole | Section 12.5 |
| 39 | A page task also changed the shared header, footer links, booking form, FAQ script, build script, the homepage and another page's article title and date | A page task stays inside its scope; shared changes are proposed separately | Section 16.4 |
| 40 | A new content catalog and build directive were added for one Insights card | No new mechanisms without asking | Section 16.4 |
| 41 | Open items (Calendly link, social links, article metadata) were filled from the old public site | Open items stay open until the person supplies them | Sections 16.4, 20 |
| 42 | The page was deployed to an outside preview host | Nothing is published unless asked | Section 16.4 |
| 43 | Testing covered links, menus, forms and overflow at eight widths, but never compared the page with an approved page or the live What we do page | Functional tests do not replace the visual and treatment comparison | Step 4, section 18 |
| 44 | The trusted-by strip under the hero was a static row of four logos | The logo strip is one approved section and must look the same everywhere | The logo marquee include, as it is (12.5) |
| 45 | "Designing AI products people trust", an approach section, showed a phone mockup labeled "Illustrative product interface" | An approach section explains how we work; a mockup shows a result we have not delivered | Process and approach sections show the process (13.6) |
| 46 | Content cards used the G6 gradient fill, on a non-detail page and on the Warm Glow band | Gradient cards look decorative and compete with the band; a gradient on a gradient muddies both | No gradient fills on content cards, never a gradient on a gradient (8.5) |
| 47 | Most section headers had no eyebrow because the content document did not give one | Eyebrows are part of every section header in the system | Write an eyebrow for every section header (8.4) |
| 48 | Process step icons were embedded as PNG data images | Raster icons blur, cannot take the color tokens and add weight | Icons and graphics are SVG (8.6) |
| 49 | "Built to fit your product team" stacked four text columns and the full process section in one block | Two ideas and every point of the content in one section; nothing was chosen | Brainstorm content heavy sections before building (12.7) |
| 50 | "Why SaaS and AI teams choose UXTeam" used G6 gradient cards and had no eyebrow | Same rules as rows 46 and 47 | Sections 8.4, 8.5 |
| 51 | The hero H1 had no eyebrow because the content document did not give one | The hero is a section header too; the eyebrow frames the page | Write an eyebrow above every H1 (8.4) |
| 52 | Headings and card copy broke mid-phrase ("Product and app" / "design") or left a lone word | The reader loses the thought at the break | Read copy in place and break at phrase boundaries (5.4) |
| 53 | The header had a line under it and stayed transparent, so it was lost once the page scrolled | The line is not in the design; readers need the nav back when they scroll up | Header without line, pinned Ink bar on scroll up (16.5) |
| 54 | Hovering a "What we design" card did nothing to its arrow | The card arrow was a separate drawing, not the Arrow Glide icon | Arrow Glide icon in every card; the card hover plays the glide (11) |
| 55 | The booking card sat above the footer with a gap instead of overlapping it | The card was inside `<main>` and the footer outside it, so the overlap rule never applied | The booking card and footer are global, never in the page (16.5) |
| 56 | Pages came with their own `<style>` blocks and classes the AI invented, so the developers rewrote every page before it could go into WordPress | The live site has one stylesheet and one class system; anything else is rework | Registry classes only, new CSS as a PART the developers' way (rule 1, docs/CSS-GUIDE.md) |

**Root causes behind most of these:** the model did not read the repo before building (Step 2), did not map each section to a repo file (Step 3), and did not compare its result with an approved page (Step 4). Those steps are not optional.

Rows 31 to 43 come from a second What we do attempt by another tool. It tested carefully and documented every decision, but it started from an old copy of the repo, so none of the current rules reached it. Step 0 exists because of this.

Rows 17 to 30 come from a What we do page that used the repo correctly at code level (right classes, right components, clean spacing) but still missed the approved direction. Following the code rules is not enough: the page also has to match the approved page's **treatment** (which sections are emphasized, which approved sections are reused whole, and how a set of items is presented).

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
- Not built as uxt- sections yet: the CTA band (13.9), a comparison table section (13.8) and the design only sections in section 14. Build each once, as a partial with a PART, before reusing it

When any of these is resolved, update this file and `docs/OPEN-ITEMS.md`.
