# Har du klippet gresset?

A one-page static status site. Big letters say "Ja." or "Nei." Below that:
"Antall dager siden gresset ble klippet:" and a number.

You never type Ja/Nei or the number yourself. You only ever update **one
date** — the day you last mowed — as plain text, and the page works out the
rest on its own every time it loads:

- days = today − that date
- "Ja." if that's `0` (mowed today), otherwise "Nei."
- the day count shows either way, counting up automatically each day

## One-time setup (a few minutes)

1. Go to [gist.github.com](https://gist.github.com) and sign in with GitHub.
2. Create a new gist:
   - Filename: `status.txt`
   - Content: just today's date, nothing else: `2026-07-12`
3. Click **Create public gist**.
4. Click the **Raw** button on that file and copy the URL. It looks like:
   `https://gist.githubusercontent.com/<you>/<gist-id>/raw/status.txt`
5. Open `src/pages/index.astro`, find this line near the top, and paste your
   URL in:
   ```js
   const GIST_RAW_URL = "https://gist.githubusercontent.com/<you>/<gist-id>/raw/status.txt";
   ```
6. Build and deploy once:
   ```bash
   npm install
   npm run build
   ```
   Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare
   Pages, GitHub Pages — drag-and-drop onto Netlify works fine).

That's the only time you touch code or redeploy.

## Updating the status from now on

Whenever you mow: open your gist on **github.com** (works fine from your
phone), change the date, click **Update public gist**. The site picks it up
within seconds — no rebuild, no redeploy, no logging into your host.

If the gist is ever unreachable, the page quietly falls back to the date
bundled in `public/status.txt`, so it never breaks — it just shows
stale-but-safe info until the gist is reachable again.

## Running it locally

```bash
npm install
npm run dev
```

## Design notes

The background is a CSS-only "mowed lawn" — alternating stripes like real
mower lines, plus soft blurred foreground grass blades for a close-up,
shallow-depth-of-field feel. No photo assets, so nothing to license or swap.
The status itself is painted onto a small wooden sign staked into the lawn,
like a garden or golf-course marker.

Want a real photo instead of the CSS texture? Drop an image into `public/`
(e.g. `grass.jpg`) and replace the `.lawn__stripes` / `.lawn__blades` rules
in `index.astro` with a single `background-image` rule pointing at it.
