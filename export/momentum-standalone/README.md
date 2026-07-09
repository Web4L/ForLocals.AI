# Momentum Fitness — COO OS & Homebase

The complete, standalone operating system for Momentum Fitness (Pantego, TX):
brand context, content apps, dashboards, and the COO morning-briefing system —
all in one repo, rendered as a static site with no build step.

Originally built by [ForLocals.AI](https://forlocals.ai).

## What's here

| Folder | What it is |
|---|---|
| `index.html` | The homebase — every app in one place. This is the site's front page. |
| `business.json` | Which apps are enabled and how each is configured. |
| `brand/` | **Single source of truth** for brand: voice & tone, key messaging, content pillars, the MOVE framework, colors (`brand.json`). Every app reads from here — edit brand things here and only here. |
| `apps/coo-briefing/` | COO morning briefing: dashboard, SOP, briefing template, prompt library, sample data + schema. |
| `apps/social-media/` | Social content system: generated content, calendar, prompt library, dashboard. |
| `apps/newsletter/` | Newsletter system: published issues, templates, editorial calendar, prompt library, dashboard. |
| `dashboard/` | The shared dashboard renderer (CSS + JS) all app pages use. Rarely needs touching. |
| `integrations/` | Credentials **template** for the live MindBody + GoHighLevel data feeds. See below. |
| `docs/momentum-coo-os.md` | The COO OS runbook — phases, credential checklist, rollout plan. |

## Running the site

It's plain HTML/JS — any static host works, no build command.

- **Vercel:** import this repo, framework preset **Other**, leave build command
  and output directory empty, deploy.
- **Locally:** `python3 -m http.server` in the repo root, then open
  `http://localhost:8000`. (Opening `index.html` from disk won't work — the
  pages fetch JSON/Markdown over HTTP.)

## Credentials & secrets

**This repo contains no credentials, and none should ever be committed.**

When the live MindBody / GoHighLevel data feeds are switched on
(see `docs/momentum-coo-os.md`), copy `integrations/.env.example` to `.env`
and fill it locally, or set the same variables as environment variables in
the Vercel project settings. `.env` is git-ignored. The keys involved are
Momentum's own (GHL Private Integrations token, MindBody API credentials).

## Making changes

- Brand/voice changes → edit files in `brand/` only.
- New content (posts, newsletter issues, briefings) → add Markdown files in the
  matching app folder; the dashboards render whatever the `manifest.json`
  points at.
- Enable/disable an app or change its blurb → `business.json`.
