# Newsletter Writing

Write recurring email newsletters in the business's voice — educational, on-brand, and
pointed at the primary offer. Each issue teaches one useful idea, builds trust, and ends
with a soft next step. Produces full issues plus subject lines, preview text, an editorial
calendar, and segment variants (e.g. prospects vs. existing customers).

**Reads from brand context:** `brand`, `voice`, `key-messaging`, `content-pillars`.
**Produces:** ready-to-send issues, a subject-line library, a reusable issue structure, an
editorial calendar, and a prompt library tuned to the business.

**Reference implementation:** `businesses/momentum-fitness/apps/newsletter/` is a fully
built instance of this app, including a working dashboard (`index.html`), a prompt library
with a Master Context Block, two ready-to-send issues, an issue-structure template, and a
subject-line library.

- `prompts/` — reusable prompt templates (the business instance customizes these).
- `src/` — optional code (e.g. an ESP send integration), unused for now.
