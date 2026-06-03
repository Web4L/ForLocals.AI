# Conventions

## Naming
- Folder names are lowercase, hyphenated slugs: `social-media`, `momentum-fitness`.
- App slugs are consistent everywhere: the folder under `apps/<slug>/` matches the folder
  under `businesses/<business>/apps/<slug>/` and the `id` in `app.json`.

## Two kinds of folders

### `apps/<slug>/` — a reusable automation (business-agnostic)
```
apps/<slug>/
    README.md       what it does, the brand-context fields it reads, what it outputs
    app.json        machine-readable metadata (see schema below)
    prompts/        prompt templates for the prompt-driven path
    src/            optional code for the code-driven path (.gitkeep until used)
```
Apps may be **prompt-only**, **code**, or a **mix** — both paths exist from day one.

`app.json` schema:
```json
{
  "id": "social-media",
  "name": "Social Media Content",
  "category": "Content",
  "description": "One-line summary.",
  "status": "ready | planned",
  "requiredContext": ["voice", "key-messaging", "brand"],
  "outputs": ["instagram captions", "carousels", "content calendar"]
}
```

### `businesses/<business>/` — one client's homebase
```
businesses/<business>/
    business.json   manifest: identity + which apps are enabled (see schema below)
    brand/          SINGLE SOURCE OF TRUTH for this business's context
        brand.json  name, location, colors, fonts, links, offers, CTA
        voice.md    tone of voice
        assets/     logo, images
    apps/<slug>/    this business's config + generated content for one app
```

`business.json` schema:
```json
{
  "id": "momentum-fitness",
  "name": "Momentum Fitness",
  "location": "Pantego, TX",
  "enabledApps": ["social-media"]
}
```

## Adding a new app
1. `cp -r apps/_template apps/<slug>` (or create the four files above).
2. Fill in `README.md` + `app.json` (`status: "planned"` until built).
3. Build the prompt templates in `prompts/` and/or code in `src/`.

## Onboarding a new business
1. `cp -r businesses/_template businesses/<business-slug>`.
2. Fill in `brand/brand.json`, `brand/voice.md`, and drop a logo in `brand/assets/`.
3. List the apps they're using in `business.json` → `enabledApps`.
4. For each enabled app, create `apps/<slug>/` and start generating content.

## Brand context never gets duplicated
Anything about *who the business is* (tone, colors, offers, framework) lives only under
`businesses/<business>/brand/`. App folders reference it; they never copy it.
