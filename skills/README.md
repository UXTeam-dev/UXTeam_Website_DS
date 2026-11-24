# Skills

Step-by-step procedures for any AI tool (Claude, Codex, Cursor, Copilot) or person working on the UXTeam website. Each skill is a `SKILL.md` with a short description at the top and the full procedure below it.

| Skill | Use it when |
|---|---|
| [uxteam-page-strategy](uxteam-page-strategy/SKILL.md) | Planning a new page or rewriting a page's copy, especially from only a page name or outline. Produces the business framing, story, section weights and content brief. |
| [uxteam-creative-review](uxteam-creative-review/SKILL.md) | Designing a High weight section, or reviewing any page or section before handing it over. Produces creative direction, or a scored review with ranked fixes. |

Order on a new page: page strategy (plan), build, creative review (check). See LLM.md section 0.

This folder is the only copy. `.claude/skills/` holds pointer files so Claude Code loads these automatically. Edit the skills here, never in `.claude/`.

To add a skill: create `skills/<name>/SKILL.md` with `name` and `description` at the top, add a row here, mention it in LLM.md 0A.4 and AGENTS.md, and add a pointer in `.claude/skills/<name>/SKILL.md`.
