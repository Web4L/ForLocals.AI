# Newsletter Prompt Templates (reusable)

Business-agnostic prompt templates for the Newsletter app. A business instance copies these
into its own `tools/prompt-library.md` and prepends its **Master Context Block** (the
business's brand context, voice, offer, and audience) so the AI stays on brand.

> Every prompt below assumes a Master Context Block for the business is already loaded in the
> chat. Without it, the AI will invent generic, off-brand details.

---

## Full issue draft
"Using the context above, write a complete email newsletter issue for **[audience segment]**.
Theme: **[one idea]**. Structure: (1) subject line + preview text, (2) a short personal-sounding
opener that hooks on the one idea, (3) the main teaching section that delivers real value,
(4) a short proof or story element, (5) one soft CTA toward **[primary offer]**, (6) a quick
practical tip, (7) a warm sign-off. Keep it skimmable, ~400–600 words, in our voice."

## Subject lines + preview text
"Write 10 subject lines (under ~45 characters) and a matching preview text for each, for an
issue about **[topic]**. Mix curiosity, benefit, and plain-spoken angles. No clickbait, no
hype. Flag the 3 you'd test first and say why."

## One-idea opener
"Write 3 alternative opening paragraphs for a newsletter about **[topic]**. Each should sound
like a real person, hook on a single relatable tension, and avoid generic '[industry] tips'
phrasing."

## Teaching section
"Write the main body for a newsletter that teaches **[one principle]**. Explain it simply with
a concrete, visual example anyone could picture. Connect it back to why **[primary offer]** is
the place to put it into practice. One idea, taught well — don't list five things."

## Segment variants
"Take the issue above and produce two variants: one for **[segment A, e.g. prospects who
haven't bought]** and one for **[segment B, e.g. existing customers]**. Keep the core teaching
identical; change the opener, framing, and CTA to fit each segment's relationship with us."

## Repurpose existing content
"Turn this [blog post / social series / FAQ] into a newsletter issue in our voice: pull out the
single strongest idea, teach it, and end with a soft CTA toward **[primary offer]**. Suggest a
subject line and preview text."

## Editorial calendar
"Propose a 3-month newsletter editorial calendar at a **[weekly / biweekly / monthly]** cadence.
For each issue give: a theme, the one idea taught, the audience segment, and the CTA. Balance
education, proof/stories, and offer-forward issues so it doesn't feel salesy."

## Re-engagement / win-back issue
"Write a short newsletter aimed at subscribers who've gone quiet. Lead with value (not 'we miss
you'), remind them of the one thing we help with, and give a single low-friction next step
toward **[primary offer]**."

## Plain-text personal note
"Rewrite the issue above as a short plain-text email that reads like a personal note from the
owner — no design, no headers, one clear idea, one soft CTA. Under 200 words."
