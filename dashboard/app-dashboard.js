/* ForLocals.AI — shared app-dashboard renderer.
   Reads the business's brand.json (../../brand/brand.json) for theme (accent, fonts, name,
   awards, logo) and the instance's manifest.json (./manifest.json) for content (tag, hero,
   stats, nav sections). Renders the same styled dashboard for any business + app.

   No build step. Depends on marked.js (loaded by the shell) and on fetch() resolving paths
   against the document URL, so manifest `file` paths are relative to the instance page
   (e.g. "README.md", "content/x.md", "../../brand/voice-tone.md") exactly as before. */
(function () {
  "use strict";

  const root = document.documentElement;
  const $ = (id) => document.getElementById(id);

  const getJSON = async (p) => {
    const r = await fetch(p, { cache: "no-store" });
    if (!r.ok) throw new Error(r.status + " " + r.statusText);
    return r.json();
  };

  // Accent hierarchy mirrors the homebase + landing pages: yellow -> accent -> primary.
  const accentOf = (b) =>
    (b && b.colors && (b.colors.yellow || b.colors.accent || b.colors.primary)) || "#5b8cff";

  // "#rrggbb" (or "#rgb") -> "rgba(r,g,b,a)". Falls back to Momentum yellow on bad input.
  function hexToRgba(hex, a) {
    let h = String(hex || "").trim().replace(/^#/, "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h, 16);
    if (h.length !== 6 || Number.isNaN(n)) return `rgba(239,228,0,${a})`;
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const inline = (s) => (window.marked ? marked.parseInline(String(s == null ? "" : s)) : esc(s));

  function applyTheme(brand) {
    const accent = accentOf(brand);
    root.style.setProperty("--accent", accent);
    const deep = (brand && brand.colors && (brand.colors.yellowDeep || brand.colors.accentDeep)) || accent;
    root.style.setProperty("--accent-deep", deep);
    root.style.setProperty("--accent-glow", hexToRgba(accent, 0.5));
    [["--accent-a05", 0.05], ["--accent-a06", 0.06], ["--accent-a08", 0.08],
     ["--accent-a10", 0.10], ["--accent-a18", 0.18], ["--accent-a25", 0.25],
     ["--accent-a30", 0.30], ["--accent-a35", 0.35], ["--accent-a40", 0.40]]
      .forEach(([k, a]) => root.style.setProperty(k, hexToRgba(accent, a)));

    const fonts = (brand && brand.fonts) || {};
    const heading = fonts.heading || "Montserrat";
    const body = fonts.body || "Inter";
    root.style.setProperty("--font-heading", `'${heading}'`);
    root.style.setProperty("--font-body", `'${body}'`);
    injectFonts(heading, body);
  }

  function injectFonts(heading, body) {
    const fam = (name, weights) =>
      `family=${encodeURIComponent(name).replace(/%20/g, "+")}:wght@${weights}`;
    const families = [fam(heading, "600;700;800;900")];
    if (body && body !== heading) families.push(fam(body, "400;500;600;700"));
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
    document.head.appendChild(link);
  }

  // Topbar brandmark: try the brand logo PNG, fall back to a CSS wordmark built from the name.
  function buildLogo(brand) {
    const name = (brand && brand.name) || "Dashboard";
    const words = name.trim().split(/\s+/);
    const first = words[0] || name;
    const rest = words.slice(1).join(" ");
    const ring = (first[0] || "•").toUpperCase();
    const logoFile = (brand && brand.logo) || "logo.png";

    const wordmark =
      `<span class="logo-css" id="logoCss">` +
        `<span class="logo-ring"><b>${esc(ring)}</b></span>` +
        `<span class="logo-text">` +
          `<span class="logo-word">${esc(first.toUpperCase())}</span>` +
          (rest ? `<span class="logo-sub">${esc(rest.toUpperCase())}</span>` : "") +
        `</span>` +
      `</span>`;

    const brandmark = $("brandmark");
    brandmark.setAttribute("aria-label", name);
    brandmark.innerHTML =
      `<img class="logo-img" id="logoImg" src="../../brand/assets/${esc(logoFile)}" alt="${esc(name)}" />` + wordmark;

    const img = $("logoImg"), cssEl = $("logoCss");
    img.addEventListener("load", () => { img.style.display = "block"; cssEl.style.display = "none"; });
    img.addEventListener("error", () => { img.remove(); });
  }

  function renderAwards(brand, manifest) {
    const awards = (manifest && manifest.awards) || (brand && brand.awards) || [];
    $("awards").innerHTML = awards.map((a) => `<span class="award">${inline(a)}</span>`).join("");
  }

  function renderHero(manifest) {
    const hero = (manifest && manifest.hero) || {};
    $("eyebrow").textContent = hero.eyebrow || "";
    $("heroTitle").innerHTML = hero.title ? inline(hero.title) : "";
    $("heroSub").innerHTML = hero.subcopy ? inline(hero.subcopy) : "";
    $("tag").textContent = manifest.tag || "";
    $("stats").innerHTML = ((manifest && manifest.stats) || [])
      .map((s) => `<div class="stat"><b>${esc(s.n)}</b><span>${esc(s.l)}</span></div>`).join("");
  }

  function buildNav(manifest) {
    $("sidenav").innerHTML = ((manifest && manifest.nav) || []).map((g) => `
      <div class="group">
        <div class="group-title">${esc(g.group)}</div>
        ${(g.items || []).map((it) => `<a href="#${esc(it.id)}" data-id="${esc(it.id)}">${esc(it.title)}</a>`).join("")}
      </div>`).join("");
  }

  async function renderSections(manifest) {
    const items = ((manifest && manifest.nav) || []).flatMap((g) => g.items || []);
    const results = await Promise.all(items.map(async (it) => {
      try {
        const res = await fetch(it.file, { cache: "no-store" });
        if (!res.ok) throw new Error(res.status + " " + res.statusText);
        return { it, md: await res.text(), ok: true };
      } catch (e) {
        return { it, err: e.message, ok: false };
      }
    }));
    $("content").innerHTML = results.map((r) => `
      <section class="doc" id="${esc(r.it.id)}">
        <div class="doc-kicker"><span class="pill">${esc(r.it.pill)}</span></div>
        ${ r.ok
            ? `<div class="md">${marked.parse(r.md)}</div>`
            : `<div class="md"><h1>${esc(r.it.title)}</h1><div class="err">Couldn't load <code>${esc(r.it.file)}</code> (${esc(r.err)}). If you're opening this file directly from disk, view it through GitHub Pages instead.</div></div>` }
      </section>`).join("");
    setupScrollSpy(items);
  }

  function setupScrollSpy(items) {
    const links = [...$("sidenav").querySelectorAll("a")];
    const byId = (id) => links.find((l) => l.dataset.id === id);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const a = byId(en.target.id);
          if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });
    items.forEach((it) => { const el = $(it.id); if (el) obs.observe(el); });
  }

  function setupMobileMenu() {
    const nav = $("sidenav");
    $("menuBtn").addEventListener("click", () => nav.classList.toggle("open"));
    nav.addEventListener("click", (e) => { if (e.target.tagName === "A") nav.classList.remove("open"); });
  }

  function renderFooter(brand, manifest) {
    $("footer").innerHTML = manifest.footer ||
      `<b>${esc((brand && brand.name) || "")}</b> &nbsp;·&nbsp; ${esc(manifest.tag || "")} &nbsp;·&nbsp; This page renders the latest content straight from the repository.`;
  }

  async function main() {
    if (window.marked) marked.setOptions({ gfm: true, breaks: false });
    const [brand, manifest] = await Promise.all([
      getJSON("../../brand/brand.json").catch(() => null),
      getJSON("./manifest.json"),
    ]);
    applyTheme(brand);
    document.title =
      (brand && brand.name ? brand.name + " — " : "") + (manifest.docTitleSuffix || manifest.tag || "Dashboard");
    buildLogo(brand);
    renderAwards(brand, manifest);
    renderHero(manifest);
    buildNav(manifest);
    setupMobileMenu();
    renderFooter(brand, manifest);
    await renderSections(manifest);
  }

  main().catch((e) => {
    const c = document.getElementById("content");
    if (c) c.innerHTML = `<section class="doc"><div class="md"><div class="err">Failed to load dashboard: ${esc(e.message)}</div></div></section>`;
  });
})();
