# Go-To-Market Playbook — ForLocals.AI

> **Status:** active GTM. This is the plan we execute against to land paying
> customers. Newest strategic shifts are logged in `docs/decisions.md`.
> Pricing/ROI evidence lives in `docs/automation-research.md`.

---

## The gap this fills

ForLocals.AI had a strong **product** thesis (which apps are worth building) but
**no go-to-market**: no lead offer, no pricing, no way to actually find and close
a customer. This playbook is that missing piece.

## The core thesis

**Lead with the lowest-friction hook, not the highest-value app.** The biggest-$
automations (reactivation, missed-call, reviews) are real — but the highest-value
ones are also the *highest-trust, highest-friction* to start cold. So we get in
the door with something we can **deliver for free before the prospect says yes**,
that needs **no access to their systems and no customer data**, then **expand**
each account into the revenue-leak apps once trust exists.

Per `docs/automation-research.md`: content is a *soft* sell (weak, hard-to-
attribute ROI). We use it honestly — as the **door-opener**, never oversold as a
revenue driver.

## Why NOT texting first

The obvious "money" play (reactivation / missed-call text-back) starts with SMS,
which means:
- **A2P 10DLC registration** — carrier paperwork, days-to-weeks of delay.
- **TCPA consent** — legal exposure if their list isn't properly opted in.
- **Handing over their customer database** — the single biggest trust ask there is.

All three are the *wrong* thing to put in front of a stranger you're trying to
close this week. Texting is **deferred, not abandoned** — it's an expansion offer
for accounts that already trust us.

---

## The lead offer

**Free week of on-brand social posts → $99/mo flat, cancel anytime.**

- **What the prospect gets free:** a week of finished, ready-to-post captions +
  image directions, written in *their* brand voice, made from their **public**
  info (website, existing socials, Google listing). No login, no data, no catch.
- **The ask:** *"I can keep this going for you every week — $99/mo, cancel
  anytime."*
- **Why $99:** it's the **hook price**, not the profit center. The goal is the
  relationship + the logo + the expansion path. At $99 it's a no-brainer vs.
  agencies ($300–$2,000/mo) and trivially easy to say yes to after seeing free
  finished work.

### What this offer requires from the prospect
Nothing, to start. Public info only. (Later, to post on their behalf, they can
grant social-account access — low trust, reversible — but the entry needs zero.)

---

## Target market

Broad local service / brick-and-mortar (~$500K–$2M revenue) — any owner who
"knows they should be posting and isn't." No vertical gating for the hook; the
sample works from whatever public presence they have.

---

## Channel & close: cold outreach, deliver-before-yes

The motion is **gift-first**, not pitch-first:

1. **Pick a prospect** and pull their public info (site, socials, Google listing).
2. **Generate the sample** with `outreach/prospect-sample-prompt.md`.
3. **Send it cold** — lead with the finished work: *"I made these for you, free."*
   Scripts in `outreach/cold-outreach-templates.md`.
4. **On a reply,** offer the **$99/mo** continuation. For warm/interested
   prospects, spin up a branded **hosted dashboard preview** to raise the wow —
   see `outreach/warm-dashboard-howto.md`.

### The demo artifact is tiered
- **Cold (fast):** finished captions + image directions, sent as a doc/images.
  Produced in minutes per prospect — this is the "this week" engine.
- **Warm (wow):** a hosted dashboard preview built by copying
  `apps/social-media/template/` — only worth the effort for prospects who reply.

---

## Pricing & expansion ladder

| Stage | Offer | Price |
|---|---|---|
| **Hook** | Social content (the door-opener) | **$99/mo** |
| Expand 1 | + AI Review Responses (also no-texting, public data) | step toward $200–300 |
| Expand 2 | + Reputation requests / missed-call / no-show | toward the $300–500 band |
| Stack | Full bundle | $500+ (incumbents' "stackers" hit $600–1,200) |

**The wedge:** incumbents (GoHighLevel ~$97–497, Podium ~$400, Birdeye ~$300–449,
Weave ~$399) all **quote-gate** the same bundle. We publish **transparent,
AI-native pricing** — start at $99, expand visibly. (Anchors:
`docs/automation-research.md` § "willingness to pay".)

---

## First-week sprint (how to actually land #1)

1. **Day 1 — kit ready.** This playbook + `outreach/` templates + sample prompt.
2. **Day 1–2 — build samples.** Pick 5–10 local prospects; generate a free
   sample week for each with `prospect-sample-prompt.md`.
3. **Day 2–3 — send cold.** Use `cold-outreach-templates.md`; lead with the gift.
4. **Day 3–5 — convert.** On replies, offer $99/mo; for warm ones, build the
   hosted dashboard preview (`warm-dashboard-howto.md`) and close.
5. **Expand.** Once an account is live and trusts us, attach Review Responses next.

---

## What's already built (so this is assembly, not new product)
- `apps/social-media/` + `apps/social-media/template/` — content prompts +
  copy-me dashboard scaffold.
- `/dashboard/` shared self-theming renderer — powers the warm-tier preview.
- `businesses/momentum-fitness/apps/social-media/` — a live reference instance to
  show prospects what "ongoing" looks like.

## Build dependency / open items
- **Posting on their behalf** (vs. them pasting) needs social-account access —
  define that handoff once a paying client wants it.
- **Expansion to Review Responses** is the next no-texting app to productize.
- **Texting offers** wait for A2P + consent + established trust.
