# Claytonhame Microsite

Interactive property microsite for Claytonhame, 76 St Cross Road, Winchester. Built for ffour Estates (legal seller: St Cross Limited, Company No. 16080695) with Knight Frank as sole agent.

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
├── public/
│   ├── complaints-procedure.html   ← Complaints procedure page (Consumer Code §5.2)
│   └── wp-content/uploads/         ← Self-hosted images, logos, floorplans,
│                                      CCNH Code Member logo + Code v5 PDF (2026/10/)
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

All property images are self-hosted in `public/wp-content/uploads/` and deploy with the site. The concierge chat uses a built-in knowledge base — no external API required, no API key, no ongoing costs. Vercel Web Analytics provides private visit stats.

---

## Consumer Code for New Homes compliance

The site carries the elements required of St Cross Limited as a Code member
(Consumer Code for New Homes, Version 5):

- **Footer** — Code Member logo in the "Project partners" band, the statement that
  St Cross Limited subscribes to and complies with the Code, a free download of the
  Code (PDF), and a link to the complaints procedure.
- **`public/complaints-procedure.html`** — the complaints procedure per Code §5.2.4
  (5-working-day acknowledgement, 20-working-day response, escalation to Build-Zone
  and the Independent Dispute Resolution Scheme). The page is `noindex` and the
  email/postal address are assembled by JavaScript at runtime so scrapers and search
  engines can't harvest them — if you edit the contact details, keep them out of the
  raw HTML (they're reversed-string fragments in the script at the bottom of the page).
- **Chatbot** — knowledge-base entries cover the Code, complaints, warranty and
  developer identity (`KB` array in `src/App.jsx`).

Things to keep current:

- The **Code Member logo** is year-stamped (2026) — replace it in
  `public/wp-content/uploads/2026/10/` when CCNH issues next year's version.
- The **"Available Q2 2026"** date and chatbot answers must stay realistic (Code §3.2.1) —
  update them if the programme moves.
- The Knight Frank **brochure** must also carry the Code logo and subscription statement.

---

## Questions

If something breaks during deployment, the most common causes are:

- **"npm install failed"** — make sure you're on Node.js 18 or newer.
- **DNS not resolving after 30 minutes** — double-check the CNAME value matches exactly what Vercel showed you.
- **Site loads but looks unstyled** — Tailwind didn't build properly; check that `index.css` is being imported in `main.jsx`.

For anything else, paste the error into Claude.
