# App Template

Copy this folder to add a new automation:

```
cp -r apps/_template apps/<app-slug>
```

Then fill in `README.md` and `app.json`, add prompt templates under `prompts/`, and/or code
under `src/`. Keep `status: "planned"` until it's built. See `../../CONVENTIONS.md`.

**Reads from brand context:** list the `businesses/<business>/brand/` fields this app needs.
**Produces:** describe the outputs.
