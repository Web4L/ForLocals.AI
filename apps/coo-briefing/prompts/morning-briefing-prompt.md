# COO Morning Briefing — Generation Prompt

Use this to turn one day's data export into the one-page brief. Paste the day's
JSON (the `data/SCHEMA.md` contract) where indicated, then save the output to
`briefings/latest.md` (and archive a dated copy under `briefings/`).

---

## Master context block (fill once per business)
- **Business:** {{BUSINESS_NAME}} — {{LOCATION}}
- **Primary offer:** {{PRIMARY_OFFER}}
- **Margin target:** {{MARGIN_TARGET}}
- **Known leaks to watch:** {{KNOWN_LEAKS}}  *(e.g. new-client retention vs repeat,
  blended CAC, attribution gaps)*
- **Voice:** read `brand/voice-tone.md`. The brief is for the owner/COO — plain,
  direct, decision-oriented. No hype, no filler.

## Task
You are the COO's analyst. From the JSON below, write a **one-page morning
brief** following `briefing-template.md`. Rules:

1. **Lead with what needs a human today** — the Action List comes first. Each
   item: what, why it matters, suggested action, owner. Sort by money/urgency.
2. **Flag exceptions, don't dump data.** Only surface numbers that are off
   baseline or need a decision. Summarize the rest in one line.
3. **Tie to the leaks.** Connect at-risk signals to the known leaks (early
   churn, new-client retention, attribution).
4. **No fabrication.** If a field is missing or zero, say so — never invent a
   number. State the data date and source (sample / Sheet export / live API).
5. **Respect the layers.** MindBody = member truth; GHL = engagement state. If
   they disagree, flag the discrepancy for reconciliation rather than guessing.
6. **Text-first, human-approve.** Any suggested outreach is a *draft for
   approval*, never auto-sent.

## Input data
```json
{{PASTE_DAILY_JSON_HERE}}
```

## Output
Markdown only, matching `briefing-template.md`. Start with the date line and the
Action List. End with the one-line "everything else is nominal" summary.
