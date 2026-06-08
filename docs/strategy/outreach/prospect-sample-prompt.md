# Prospect Sample Prompt — Free Week of Posts from Public Info

> Part of the GTM playbook (`../go-to-market.md`). This is the engine that
> produces the **free cold-outreach sample**. A paying client gets a full
> `brand/` folder as the single source of truth (see `CONVENTIONS.md`); a **cold
> prospect doesn't** — so this prompt adds a **rapid brand-inference step** from
> their public footprint, then reuses our standard social pattern (the Master
> Context Block in `apps/social-media/template/tools/prompt-library.md`).

## How to run it (2–5 min per prospect)

1. **Gather public inputs** (no access needed):
   - Their website URL (about page, services, any stated offer).
   - Their existing Instagram/Facebook handle (recent posts, tone, hashtags).
   - Their Google Business Profile (category, location, what they emphasize).
2. **Paste STEP 1** into a fresh LLM chat with those inputs → it infers a draft
   brand block.
3. **Sanity-check** the inferred block (fix anything obviously wrong — don't ship
   invented prices or claims).
4. **Paste STEP 2** → it generates the week of posts.
5. Deliver as the sample (doc/images) per `cold-outreach-templates.md`.

---

## STEP 1 — Infer the brand block from public info

```
You are a brand strategist. From ONLY the public information I provide, infer a
concise brand context for a local business. Do NOT invent prices, offers, awards,
or claims that aren't supported by the inputs — if something isn't evident, leave
it general. Output exactly this block:

BUSINESS: [name] — [city, ST]
WHAT THEY DO: [one-paragraph positioning, grounded in the inputs]
TARGET AUDIENCE: [who they serve, inferred from inputs]
VOICE & TONE: [3–5 adjectives + 1 line on what to do / avoid, matched to their
existing posts]
LIKELY PRIMARY OFFER / ENTRY POINT: [their main service or promo IF evident; else
"general services"]
SOFT CTA STYLE: [how they currently invite contact — DM, book, call, visit]

PUBLIC INPUTS:
- Website: [paste key text / URL summary]
- Instagram/Facebook: [paste handle + notes on recent posts/tone]
- Google listing: [category, location, notable details]
```

## STEP 2 — Generate the free sample week

```
You are a content strategist and copywriter for the business in the brand block
above. Use ONLY that context. Do not invent offers, prices, or details.

Produce a FREE SAMPLE: a 7-day social plan that proves you understand their brand.
For each of the 7 days give:
- Day + format (Reel / carousel / single image / story)
- A scroll-stopping one-line hook
- The full caption (hook in first 2 lines, one useful idea, light proof, soft CTA
  in their CTA style)
- A one-line image/visual direction the owner can shoot on a phone

Mix educational, proof/social, and culture/behind-the-scenes. Keep it genuinely
on-brand and immediately usable. Add a short friendly intro line the owner could
read first.
```

---

## Notes
- **Quality bar:** the sample IS the sales pitch. If a post feels generic or
  off-voice, fix it before sending — one weak caption kills the "they get us"
  effect.
- **When they convert:** stop inferring. Onboard them properly — create their
  `businesses/<slug>/brand/` folder (single source of truth, per `CONVENTIONS.md`)
  and switch to the real Master Context Block.
- **Don't fabricate.** No invented discounts, stats, or awards in a cold sample —
  it has to survive the owner reading it.
