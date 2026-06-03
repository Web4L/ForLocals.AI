# ForLocals.AI

A library of high-value **automations ("apps") for local business owners** — social media
content, newsletters, SEO blogs, review handling, and more — that run against each
business's own **brand context** (tone, voice, colors, offers). Every business gets a
single **homebase dashboard** that surfaces all of its enabled apps in one place.

## How this repo is organized

There are two independent dimensions, kept separate on purpose:

| Folder | What it holds | Owner of truth for |
| --- | --- | --- |
| `apps/` | The reusable automations themselves — prompts and/or code. **Business-agnostic.** | *How* an automation works |
| `businesses/` | One folder per client = its **homebase**. Brand context + per-app config & outputs. | *Who* the automation runs for |
| `dashboard/` | The cross-app homebase view that renders a business's enabled apps. | Presentation |

```
apps/<app>/                 reusable automation (prompts/, src/, app.json, README)
businesses/<business>/
    brand/                  single source of truth: voice, messaging, colors, assets
    apps/<app>/             that business's config + generated content for one app
    business.json           manifest: which apps are enabled
dashboard/                  homebase that reads businesses/*/business.json
```

### Why brand context lives at the business level (not inside each app)

A business's brand (tone, colors, voice, offers) is **identical across all its apps**. If
we nested context inside each app folder, updating a brand color would mean editing it in
10 places, and the homebase would have to scrape many folders to assemble one client.
Instead, brand context is defined **once** in `businesses/<business>/brand/`, and every app
reads from it.

## Current state

- **First business:** Momentum Fitness (Pantego, TX) — see `businesses/momentum-fitness/`.
- **First app built:** Social Media Content (`businesses/momentum-fitness/apps/social-media/`),
  including a working dashboard (`index.html`), brand context, a prompt library, and
  ready-to-post Instagram content for the Physics 101 program.
- The other 9 apps under `apps/` are scaffolded definitions, not yet built.

See `CONVENTIONS.md` for how to add a new app or onboard a new business.
