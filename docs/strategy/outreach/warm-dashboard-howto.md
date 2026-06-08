# Warm-Prospect Dashboard Preview — How-To

> Part of the GTM playbook (`../go-to-market.md`). The cold artifact is finished
> posts (fast). For a **warm prospect who replied**, raise the wow by spinning up
> a branded **hosted dashboard preview** — it shows them what "ongoing, in one
> place" looks like and differentiates us from a freelancer emailing captions.
>
> This reuses the existing shared renderer — **no new code**, just a folder copy
> + a manifest edit. Full conventions: `CONVENTIONS.md` ("Onboarding a new
> business") and `dashboard/README.md` (manifest schema).

## When to bother
Only after a reply / clear interest. It's more work than a cold sample, so it's
the **closer**, not the opener.

## Steps (a lightweight preview, not full onboarding)

1. **Copy the business template** for a scratch/preview slug:
   `cp -r businesses/_template businesses/<prospect-slug>`
2. **Fill minimal brand context** in `businesses/<prospect-slug>/brand/brand.json`
   — name, location, an accent color pulled from their logo/site, and (optional)
   a logo in `brand/assets/`. The renderer self-themes from this.
3. **Copy the social-media dashboard scaffold:**
   `cp -r apps/social-media/template businesses/<prospect-slug>/apps/social-media`
4. **Drop in the sample content** you already generated (the free week of posts)
   as the dashboard's content section(s), and edit `apps/social-media/manifest.json`
   (hero/tagline/stats/nav) to speak to *them*.
5. **Wire it** in `businesses/<prospect-slug>/business.json`
   (`enabledApps: ["social-media"]` + `appConfig.social-media.dashboard`).
6. **Preview locally** (`python3 -m http.server`) and confirm the dashboard +
   landing page serve HTTP-200 and look right. Share the link with the prospect.

## Important guardrails
- **The `index.html` shell is copied as-is — never hand-edit it.** Only
  `manifest.json` + content + `brand.json` change. (Decision: shared renderer.)
- **A preview slug is not a launched client.** Don't add it to the `BUSINESSES`
  array in root `/index.html` until they're a paying customer — that's the public
  homebase. Keep previews unlisted.
- **Public site = no secrets/PII.** Previews live in a public repo; only ship
  public-safe content.
- On conversion, finish proper onboarding per `CONVENTIONS.md` (real `brand/`
  folder as the single source of truth).
