---
description: Load all project context to cleanly start a new working session
allowed-tools: Bash(git status:*), Bash(git log:*), Bash(git branch:*), Bash(git fetch:*), Bash(git rev-list:*), Read
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
- **Sync with the live branch** (`main` is the live GitHub Pages branch — work sometimes
  lands there between sessions, and a fresh session branch can be cut from a stale point):
!`git fetch origin main 2>&1 | tail -1`
!`echo "Commits on main NOT on this branch:"; git log --oneline HEAD..origin/main`
!`echo "Commits on this branch NOT on main:"; git log --oneline origin/main..HEAD`

## 3. Brief me (keep it tight — no code yet)
After reading the above, reply with:
1. **Where we are** — 2–3 sentences on the project's current state.
2. **Last session** — what was most recently built (reconcile `docs/progress.md` with the git log).
3. **Branch sync** — name the `claude/*` working branch we're actually on (read it from
   `git status`, don't assume a hardcoded name). Then report the divergence from `main`
   measured in step 2: if this branch is **behind `main`**, say so plainly, treat
   `docs/progress.md` as possibly stale, and **offer to rebase onto `origin/main` before
   any new work**. Remember: `main` is the **live GitHub Pages branch**, so only push
   there when I explicitly say so.
4. **Known gaps / issues** — pulled from `docs/progress.md`.
5. **Suggested next step** — the single most logical next task, phrased as a question so I can
   confirm or redirect.

Then stop and wait for my go-ahead.
