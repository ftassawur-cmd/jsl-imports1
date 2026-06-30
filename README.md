# JSL Imports — Vehicle Landed-Cost Platform

A single-page React app that calculates the **landed cost** of importing Japanese
vehicles into Sri Lanka, with a 5-step wizard, live exchange rates, tax/excise
breakdown, profit & ROI projections, comparisons, history, a dealership pipeline,
reports, and a full config-driven admin editor. Dark/light themes, CSV export, and print included.

There are **two ways** to run it in Chrome. Pick one.

---

## Option A — Standalone file (no install, fastest)

1. Make sure you're online (it fetches React, lucide, and recharts from a CDN on first load).
2. Double-click **`standalone.html`** — it opens in your default browser.
   - If it opens in another browser, right-click the file → *Open with* → *Google Chrome*.

That's it. The page compiles the app in your browser, so the first paint takes a
couple of seconds. This mode is great for a quick look or sharing a single file.

> For day-to-day use or deploying, use Option B — it's faster and doesn't depend on a CDN.

---

## Option B — Vite dev project (recommended)

This is the standard React setup. You need **Node.js 18 or newer** installed
(check with `node -v`; if you don't have it, get the LTS build from https://nodejs.org).

From this folder, run:

```bash
npm install
npm run dev
```

`npm run dev` starts a local server and **auto-opens Chrome** at
`http://localhost:5173`. Edit anything under `src/` and the page hot-reloads.

To produce an optimized build you can host anywhere (static hosting, Netlify, Vercel, S3, etc.):

```bash
npm run build      # outputs to ./dist
npm run preview    # serves ./dist locally to test the production build
```

---

## What's in here

```
jsl-imports/
├── index.html            # Vite entry (loads the Inter font + mounts the app)
├── package.json          # dependencies + scripts
├── vite.config.js        # Vite + React plugin config
├── standalone.html       # zero-install, CDN-based version (Option A)
├── README.md             # this file
└── src/
    ├── main.jsx           # React entry point — renders <App />
    ├── index.css          # tiny base reset (the app styles itself inline)
    └── JSLImports.jsx      # the entire application (one component file)
```

The app has only three runtime dependencies — **react**, **lucide-react**
(icons), and **recharts** (charts). There is no Tailwind or external CSS
framework: all styling is done with inline styles plus one injected `<style>`
block, so theming and the dark/light toggle work with zero configuration.

---

## Notes

- **Data is in-memory.** Saved calculations, favorites, and comparisons reset on
  page refresh. To persist them, add a `useEffect` in `App` that writes
  `JSON.stringify({ saved, favorites, comparisons, config })` to `localStorage`
  and seed the matching `useState` initializers from it. (Browser storage works
  fine in this real project — it was only disabled in the original preview sandbox.)
- **Exchange rate** is fetched live from a free public API
  (`open.er-api.com`) with a timeout; if it's unreachable the app falls back to
  the configurable default rate. You can also set a manual rate in **Admin → Exchange**.
- **Tax, duty, excise, PAL, VAT, fees, and per-vehicle FOB values are
  illustrative defaults** and are fully editable in the **Admin** panel. Set them
  to the current published Sri Lanka schedule before relying on the numbers. This
  app is a calculator, not official tax advice.
- **Export & print:** the results screen has a CSV export and a Print button
  (Print uses the browser's print dialog — choose "Save as PDF" for a PDF).
