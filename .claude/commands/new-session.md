---
description: Load all project context to cleanly start a new working session
allowed-tools: Bash(git status:*), Bash(git log:*), Bash(git branch:*), Read
---

You are starting a new working session on **ForLocals.AI**. Before doing anything else,
load and internalize the full project context, then give me a short briefing. Do NOT start
making changes until I confirm the next step.

## 1. Read the canonical context (in this order)
- @CLAUDE.md — project identity, product principles, tech stack, working style, session hygiene
- @CONVENTIONS.md — folder conventions; how to add an app / onboard a business
- @docs/decisions.md — settled decisions (do NOT re-litigate these)
- @docs/progress.md — what's built, known issues, the next step

## 2. Check repo state
- Branch & working tree:
!`git status -sb`
- Recent history:
!`git log --oneline -10`

## 3. Brief me (keep it tight — no code yet)
After reading the above, reply with:
1. **Where we are** — 2–3 sentences on the project's current state.
2. **Last session** — what was most recently built (reconcile `docs/progress.md` with the git log).
3. **Branch check** — confirm we're on `claude/upbeat-bardeen-cPbNl`. Remember: `main` is the
   **live GitHub Pages branch**, so only push there when I explicitly say so.
4. **Known gaps / issues** — pulled from `docs/progress.md`.
5. **Suggested next step** — the single most logical next task, phrased as a question so I can
   confirm or redirect.

Then stop and wait for my go-ahead.
