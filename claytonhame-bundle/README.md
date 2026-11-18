# Claytonhame Microsite

Interactive property microsite for Claytonhame, 76 St Cross Road, Winchester. Built for ffour Estates (legal seller: St Cross Limited, Company No. 16080695) with Knight Frank as sole agent.

**Live at [stcross.ffour.co.uk](https://stcross.ffour.co.uk/).**

---

## Where it lives and how it deploys

- **Live URL:** <https://stcross.ffour.co.uk/>
- **Host:** Vercel (`Server: Vercel`, `lhr1` region).
- **Repository:** `mdotai88/stcrossroad` on GitHub. This bundle is a subfolder of that
  repo, so Vercel's **Root Directory** for the project is `claytonhame-bundle` — the
  folder holding `package.json`. Vercel auto-detects Vite + React from there.
- **Deploys:** a push to `main` is all it takes. Vercel rebuilds and the new version is
  live within a minute or so; nothing needs to be run locally and no dashboard step is
  required.

### Making updates

1. Edit the files — almost always just **`src/App.jsx`**, with `index.html` for meta
   tags and SEO.
2. Commit and push to `main`.
3. Wait about a minute, then check the live site.

To confirm a change really reached production rather than trusting the dashboard:

```bash
curl -s https://stcross.ffour.co.uk/ | grep -o 'name="description" content="[^"]*"'
```

That returns the deployed meta description. For anything inside the React app, find the
hashed bundle the page references and grep that instead:

```bash
curl -s https://stcross.ffour.co.uk/ | grep -oE 'src="/assets/[^"]*"'
curl -s https://stcross.ffour.co.uk/assets/index-XXXX.js | grep -o 'some string'
```

A stale hash, or a string that isn't there, means the build hasn't landed yet.

---

## The domain

`stcross.ffour.co.uk` is already attached in Vercel (project → **Settings** →
**Domains**) and resolves through a CNAME on **GoDaddy** (My Products → DNS for
**ffour.co.uk**) pointing at the project's Vercel DNS target —
`268fd974144e16e1.vercel-dns-017.com` as of November 2026. Vercel issues and renews the
SSL certificate automatically.

Only touch this if the domain needs re-pointing: add the domain in Vercel first, use the
exact CNAME value Vercel then shows (it is per-project, not the generic
`cname.vercel-dns.com`), and allow 5–15 minutes for DNS and the certificate.

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
│                                      CCNH Code Member logo + Code v5 PDF (2026/10/),
│                                      film poster (2026/11/film-poster.jpg)
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

## The Film

The full tour sits in its own **"The Film"** section directly below the hero, with a
"Watch the film" button in the hero and an entry in both the desktop nav and the
mobile menu (`#film`).

The film is hosted on YouTube but plays inside our own chrome, driven by the IFrame
Player API: no YouTube logo, no title bar, no "Watch on YouTube" button and no
related-video grid at the end — that end screen is replaced by our own "Watch again"
/ "Book a viewing" card. The controls (play/pause, clock, scrub bar, mute,
fullscreen), click-to-pause and the keyboard shortcuts (space, arrows, M, F) are all
ours, in the site palette.

Nothing is requested from any Google domain until a visitor presses play, and
playback then runs from `youtube-nocookie.com`. Until then the facade is the local
poster. If the Player API is blocked, it falls back to a plain privacy-mode embed.

The three things that define it live at the top of `src/App.jsx`:

- `FILM_ID` — the YouTube video id. Replace it to swap the film; nothing else needs
  to change.
- `FILM_POSTER` — the still shown before play, currently cut from the hallway render.
  Re-cut it from the new film if you swap the film, or the facade will not match.
- `FILM_TITLE` — used for the iframe's accessible title.

Keep the film consistent with the property as sold: if a room is changed after
filming, either re-shoot or stop showing it, since the film is a sales claim like any
other (Code §3.2.1).

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
- The **"Available Now"** claim and the chatbot answers must stay realistic (Code §3.2.1) —
  update them if the property stops being ready for immediate occupation.
- The **guide price** appears in several places that must agree: `PROPERTY.guidePrice`
  in `src/App.jsx` (which drives the hero tile and the affordability calculator), the
  chatbot's price answer, the two hard figures the chatbot quotes that are derived
  from it (stamp duty and the monthly repayment), the share-sheet text, and the meta
  description in `index.html`. Recompute the derived figures with the site's own
  `calcStamp` band table and mortgage formula rather than by hand.
- The Knight Frank **brochure** must also carry the Code logo and subscription statement.

---

## Questions

If something breaks during deployment, the most common causes are:

- **"npm install failed"** — make sure you're on Node.js 18 or newer.
- **DNS not resolving after 30 minutes** — double-check the CNAME value matches exactly what Vercel showed you.
- **Site loads but looks unstyled** — Tailwind didn't build properly; check that `index.css` is being imported in `main.jsx`.

For anything else, paste the error into Claude.
