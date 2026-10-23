# The Flight Tech Labs

Official website for **The Flight Tech Labs**: the download home for our Windows apps and a showcase of the other sites we build and host.

- **Featured app:** [ResumeForge AI](apps/resumeforge-ai/index.html), an offline-first ATS resume engineer for Windows 10/11.
- **Projects:** links and short descriptions for our other live sites (Silicon Matrix, NAVIK Simulator, Kumari Kandam, Škoda Volkswagen India Showcase, Oru Payanam Aayiram Kathaigal, Lumisphere).

The site is plain HTML, CSS and JavaScript. There is no framework and no build step. App and project lists are rendered from two JSON files, so most updates are data edits.

## Tech

- Static HTML pages with one shared stylesheet (`assets/css/styles.css`) and one script (`assets/js/main.js`)
- Content data in `apps.json` (apps, versions, changelogs) and `sites.json` (other hosted sites)
- Hosted on [Vercel](https://vercel.com) with clean URLs, redirects and security headers set in `vercel.json`

## Project structure

```
flighttechlabs/
├── index.html                 Home
├── apps/
│   ├── index.html             All apps (rendered from apps.json)
│   └── resumeforge-ai/
│       └── index.html         App detail page (filled from apps.json)
├── install.html               Install guide + SmartScreen help
├── faq.html                   FAQ (details/summary accordion)
├── changelog.html             Release history (rendered from apps.json)
├── projects.html              Other sites (rendered from sites.json)
├── about.html
├── contact.html               Form (demo; wire to a backend)
├── privacy.html               Privacy policy (template)
├── terms.html                 Terms of use (template)
├── 404.html
├── apps.json                  Single source of truth for apps
├── sites.json                 Links + about text for other hosted sites
├── vercel.json                Clean URLs, redirects, headers
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/favicon.svg
└── downloads/
    ├── README.txt
    └── ResumeForgeAI-Setup.exe   <- add this file
```

## Run locally

Links use clean URLs (`/faq`, not `/faq.html`), and the page lists are loaded with `fetch()`. Opening the HTML files directly from disk does not work. Use a local server that supports clean URLs:

```
npx serve .
```

Or run Vercel's own dev server:

```
npx vercel dev
```

Then open the URL the command prints, for example http://localhost:3000.

## Add a new app

1. Put the installer in `downloads/`, for example `downloads/MyApp-Setup-1.0.0.exe`.
2. Add an object to `apps.json`:
   - `id`, `slug` (used in `/apps/<slug>`), `name`, `monogram`, `tagline`, `description`
   - `features` (array), `version`, `platform`, `requirements`, `size`, `releaseDate`
   - `file` (`/downloads/...`), `fileName` (download name), `releaseNotes`
   - `changelog` (array of `{ version, date, notes[] }`)
3. Copy `apps/resumeforge-ai/index.html` to `apps/<slug>/index.html`. Change `data-app-id` on `<main>` to the new `id`, and update the title and breadcrumb.
4. Add the URL to `sitemap.xml`.

The app card on `/apps` and the home page appears automatically after step 2.

## Add another hosted site

Add an object to `sites.json`:

```json
{
  "name": "My Site",
  "url": "https://my-site.vercel.app/",
  "monogram": "MS",
  "category": "Short label",
  "about": "One or two sentences about the site."
}
```

It appears on `/projects` automatically.

## Deploy to Vercel

**Dashboard**
1. Push this repo to GitHub.
2. In Vercel, choose **Add New → Project** and import the repo.
3. Framework preset: **Other**. Build command: empty. Output directory: `.` (root).
4. Deploy. Every push to the main branch redeploys the site.

**CLI**
```
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

## Installer files and GitHub

GitHub rejects files larger than 100 MB, and Electron installers are often close to that size. If `ResumeForgeAI-Setup.exe` is too big:

- Upload the installer to a **GitHub Release** and point `file` in `apps.json` to the release download URL, or
- Track it with [Git LFS](https://git-lfs.com).

To keep installers out of the repo entirely, uncomment the `downloads/*.exe` line in `.gitignore`.

## Before going live

- [ ] Replace `YOUR-DOMAIN.com` in `sitemap.xml` and `robots.txt`
- [ ] Put the real support email on `contact.html`
- [ ] Wire the contact form to a backend (Formspree, a Vercel function, etc.). The current form only shows a confirmation toast.
- [ ] Review and finalise `privacy.html` and `terms.html` (templates, not legal advice)
- [ ] Add the governing-law line in `terms.html`
- [ ] Add the real `version`, `size` and `releaseDate` to `apps.json` once the installer is in
- [ ] Confirm the installer is under Vercel's static file size limit (see `downloads/README.txt`)
- [ ] Optional: add screenshots to `apps.json` as `screenshots: [{ "src": "/assets/img/...", "alt": "..." }]`
- [ ] Code-sign the `.exe` before public launch to reduce SmartScreen warnings

## Notes

- Downloads are served with `Content-Disposition: attachment` (see `vercel.json`), so the download button saves the file instead of opening it.
- `cleanUrls` is on: `/install.html` is served at `/install`.
- Static content works with JavaScript disabled. The app and project lists need JavaScript.

## License

© The Flight Tech Labs. All rights reserved.
