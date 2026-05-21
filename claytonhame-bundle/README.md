# Claytonhame Microsite

Interactive property microsite for Claytonhame, 76 St Cross Road, Winchester. Built for ffour Estates with Knight Frank as sole agent.

---

## Deploy to Vercel (5 minutes, no command line needed)

1. Sign in at **[vercel.com](https://vercel.com)** (free).
2. From the dashboard, click **"Add New..."** → **"Project"**.
3. Scroll to the bottom of the "Import Git Repository" page and click **"Continue with deploy without Git"** — or use the **Vercel CLI** (instructions below).
4. **Drag this entire folder** onto the upload area.
5. Vercel auto-detects Vite + React. Leave all defaults. Click **"Deploy"**.
6. Wait ~60 seconds. You'll get a URL like `claytonhame-xyz.vercel.app` — that's your live site.

### Alternative: Vercel CLI

If drag-and-drop doesn't work:

```bash
npm install -g vercel
cd claytonhame-bundle
vercel
```

Follow the prompts. It'll handle the rest.

---

## Attach your subdomain (e.g. `stcrossroad.ffour.co.uk`)

1. In Vercel: open the project → **Settings** → **Domains** → enter `stcrossroad.ffour.co.uk` → click **Add**.
2. Vercel will show a **CNAME record** to add. Something like:
   - **Type:** CNAME
   - **Name:** `stcrossroad`
   - **Value:** `cname.vercel-dns.com`
3. In **GoDaddy**: My Products → DNS for **ffour.co.uk** → **Add Record** → enter the values above → Save.
4. Wait 5–15 minutes. DNS propagates, Vercel auto-detects, SSL certificate auto-issues.
5. Done. Buyers visiting `stcrossroad.ffour.co.uk` see the site with that URL in the address bar throughout.

---

## Making updates

When you want changes to the site:

1. Replace **`src/App.jsx`** with the new version.
2. In Vercel dashboard: project → **Deployments** → top-right menu → **Redeploy**, or upload the folder again.
3. About 30 seconds later, the live site updates.

If you set up a GitHub connection, you can just `git push` and Vercel redeploys automatically.

---

## Local preview (optional)

Want to see changes before pushing them live? Requires Node.js:

1. Install Node.js from [nodejs.org](https://nodejs.org) (LTS version).
2. Open a terminal in this folder.
3. Run `npm install` (downloads dependencies — takes 30s).
4. Run `npm run dev`.
5. Open `http://localhost:5173` in your browser.

Changes to `src/App.jsx` show instantly without a refresh.

---

## What's in this folder

```
claytonhame-bundle/
├── src/
│   ├── App.jsx          ← The actual microsite (edit this for changes)
│   ├── main.jsx         ← React entry point (don't touch)
│   └── index.css        ← Base styles (don't touch)
├── index.html           ← HTML shell + meta tags / SEO
├── package.json         ← Project dependencies
├── vite.config.js       ← Build config
├── tailwind.config.js   ← Tailwind CSS config
├── postcss.config.js    ← CSS processing config
└── README.md            ← This file
```

---

## Tech stack

- **React 18** — interactive UI
- **Vite** — build tool (very fast)
- **Tailwind CSS** — styling
- **Lucide React** — icons

All property images are hosted on `ffour.co.uk`. The concierge chat uses a built-in knowledge base — no external API required, no API key, no ongoing costs.

---

## Questions

If something breaks during deployment, the most common causes are:

- **"npm install failed"** — make sure you're on Node.js 18 or newer.
- **DNS not resolving after 30 minutes** — double-check the CNAME value matches exactly what Vercel showed you.
- **Site loads but looks unstyled** — Tailwind didn't build properly; check that `index.css` is being imported in `main.jsx`.

For anything else, paste the error into Claude.
