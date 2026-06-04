---
description: Load all project context to cleanly start a new working session
allowed-tools: Bash(git status:*), Bash(git log:*), Bash(git branch:*), Bash(git fetch:*), Bash(git rev-list:*), Bash(git show:*), Bash(git ls-tree:*), Read
---

You are starting a new working session on **ForLocals.AI**. Before doing anything else,
load and internalize the full project context, then give me a short briefing. Do NOT start
making changes until I confirm the next step.

**Why this command reads from `origin/main`, not your local files:** `main` is the live
GitHub Pages branch and the source of truth for what's actually built. A fresh session
branch can be cut from a *stale* commit (it has happened — a session once reported the
newsletter app "not built" because its branch predated it). So the context below is read
from `origin/main` on purpose; the local working tree may be behind and must not be
trusted for build state.

## 0. Sync with the live branch FIRST (before reading anything)
!`git fetch origin main 2>&1 | tail -1`
- Branch & working tree:
!`git status -sb`
- Recent history (local):
!`git log --oneline -10`
- Divergence from the live branch:
!`echo "Commits on main NOT on this branch:"; git log --oneline HEAD..origin/main`
!`echo "Commits on this branch NOT on main:"; git log --oneline origin/main..HEAD`

## 1. Read the canonical context — FROM `origin/main` (in this order)
These are read from the live branch, not your checkout, so the briefing reflects reality
even if this branch is stale.
- Project identity, principles, tech stack, working style, session hygiene:
!`git show origin/main:CLAUDE.md`
- Folder conventions; how to add an app / onboard a business:
!`git show origin/main:CONVENTIONS.md`
- Settled decisions (do NOT re-litigate these):
!`git show origin/main:docs/decisions.md`
- What's built, known issues, the next step:
!`git show origin/main:docs/progress.md`

## 2. Verify the REAL built state from the `main` tree (don't trust prose)
Read which businesses exist and which apps each has actually enabled, straight from the
manifests on `main` — this is the ground truth that catches stale-doc hallucinations.
!`for f in $(git ls-tree -r --name-only origin/main | grep 'businesses/.*/business.json'); do echo "== $f =="; git show origin/main:"$f"; done`
- App folders that actually exist on `main` per business:
!`git ls-tree -r --name-only origin/main | grep -E 'businesses/[^/]+/apps/[^/]+/' | sed -E 's#(businesses/[^/]+/apps/[^/]+)/.*#\1#' | sort -u`

## 3. Brief me (keep it tight — no code yet)
After reading the above, reply with:
1. **Where we are** — 2–3 sentences on the project's current state, grounded in the
   `origin/main` context above (not the local working tree).
2. **Last session** — what was most recently built (reconcile `origin/main`'s
   `docs/progress.md` with the git log and the step-2 manifests).
3. **Branch sync** — name the `claude/*` working branch we're actually on (read it from
   `git status`, don't assume a hardcoded name). Then report the divergence from `main`
   measured in step 0: if this branch is **behind `main`**, say so plainly, declare the
   local working tree **stale and not to be trusted for build state**, and **offer to
   rebase onto `origin/main` as the first action before any new work**. Remember: `main`
   is the **live GitHub Pages branch**, so only push there when I explicitly say so.
4. **Known gaps / issues** — pulled from `origin/main`'s `docs/progress.md`.
5. **Suggested next step** — the single most logical next task, phrased as a question so I can
   confirm or redirect.

Then stop and wait for my go-ahead.
