# This Is Your Song

A static, multi-page marketing and catalog site for **This Is Your Song**—a custom songwriting service. Visitors can learn about the offering, hear sample tracks organized by genre, and use an order form (with a mailto fallback for direct email).

**Live site:** deploy this repository to any static host (for example [GitHub Pages](https://pages.github.com/)) with the repository root as the document root so `index.html` loads at `/`.

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Repository structure](#repository-structure)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Deployment](#deployment)
- [Site architecture](#site-architecture)
- [Typography and scaling](#typography-and-scaling)
- [Customizing content](#customizing-content)
- [Order form behavior](#order-form-behavior)
- [Accessibility and semantics](#accessibility-and-semantics)
- [Browser support](#browser-support)
- [Known limitations](#known-limitations)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

This project is a **hand-authored static website**: HTML for structure, a single shared CSS file for layout and theme, and a small amount of vanilla JavaScript for shared navigation, footer links, optional injected call-to-action copy, and client-side order-form UX. There is **no build step** and **no package manager**; you can edit files directly and refresh the browser.

Primary audiences:

- **Visitors** exploring the service and listening to samples.
- **Maintainers** updating copy, artwork, audio paths, and catalog entries.
- **Reviewers** (e.g. instructors or collaborators) inspecting structure and deployment on GitHub.

---

## Features

- **Home** — Introduction, value proposition, embedded jingle demo, and a short **Know More** link to More Info; lead lines use heading levels for emphasis.
- **More Info** (`more-info.html`) — Origin story, explanatory copy, a larger featured **We Are the Guard** tile (`.AboutFeature`), and multiple audio examples (“one song, four styles”).
- **Catalog** — Genre sections with repeatable “tile” cards (image, title, audio, “Order similar” link to the order form).
- **Order** — Guided form fields; optional **Talk to Me** audio upload (with caption and a link to [Windows Sound Recorder](https://apps.microsoft.com/detail/9WZDNCRFHWKN) for PC users); optional lyrics and reference MP3 uploads; prefilled **Contact** mailto in the footer; inline thank-you after submit (client-side only).
- **Shared navigation** — Top nav and footer generated consistently via JavaScript from `data-*` attributes on `<html>`.
- **Shared call-to-action** — On pages that include `#site-call-to-action`, [`site-include.js`](assets/js/site-include.js) injects the same catalog / order / contact paragraph so copy and links stay in one place (Home and More Info).
- **Responsive layout** — CSS grid and flexbox, including catalog layouts tuned for smaller and larger viewports.

---

## Tech stack

| Layer        | Technology                          |
|-------------|-------------------------------------|
| Markup      | HTML5                               |
| Styling     | CSS3 (custom properties, grid/flex) |
| Scripting   | JavaScript (ES5-style IIFE, no bundler) |
| Fonts       | System / inherited (see `assets/style.css`) |
| Hosting     | Any static file host (GitHub Pages, Netlify, etc.) |

---

## Repository structure

```
.
├── index.html                 # Home (site root; links use contents/ and assets/)
├── LICENSE                    # MIT
├── README.md                  # This file
├── assets/
│   ├── style.css              # Global stylesheet for all pages
│   ├── js/
│   │   ├── site-include.js    # Injects top nav, footer, optional #site-call-to-action CTA
│   │   └── order-form.js      # Order page: prevent default submit, show confirmation, reset
│   ├── audio/                 # MP3 samples (referenced from HTML)
│   ├── images/                # PNG/WebP-style assets for tiles and pages
│   └── pdf/                   # Optional printable assets (e.g. order form PDF)
└── contents/
    ├── more-info.html
    ├── catalog.html
    └── order.html
```

Paths are **relative**: pages under `contents/` use `../assets/...` for CSS, scripts, images, and audio.

---

## Requirements

- A **modern browser** (see [Browser support](#browser-support)).
- For local testing, a **local static HTTP server** is recommended so behavior matches production and avoids `file://` quirks with some resources.

Optional:

- **Git** — to clone, branch, and push changes.

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/JASYTIONLINE/r94-this-is-your-song.git
cd r94-this-is-your-song
```

### 2. Run a local static server

From the repository root (the folder that contains `index.html`):

**Python 3**

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/` in your browser.

**Node.js** (if you have `npx`)

```bash
npx --yes serve -l 8080
```

Use the URL the tool prints (often `http://localhost:8080`).

> **Why not open `index.html` directly?** Some browsers restrict or behave inconsistently with `file://` URLs for scripts, media, or future fetches. A one-line local server keeps parity with GitHub Pages and other hosts.

### 3. Verify pages

- `http://localhost:8080/` — Home  
- `http://localhost:8080/contents/more-info.html` — More Info  
- `http://localhost:8080/contents/catalog.html` — Catalog  
- `http://localhost:8080/contents/order.html` — Order  

Confirm top navigation, footer, and audio players load; check the browser **console** only if something fails (there should be no dependency on a build tool).

---

## Deployment

### GitHub Pages (typical)

1. Push this repository to GitHub.
2. In the repository **Settings → Pages**, set the source to deploy from the **`main`** branch and the **`/` (root)** folder (not `/docs` unless you move files).
3. After the workflow finishes, the site is available at  
   `https://<user-or-org>.github.io/<repo-name>/`

**Important:** The entry URL must resolve to [`index.html`](index.html) at the site root. Do not publish only the `contents/` folder without also publishing the root `index.html` and `assets/`, or internal links will break.

### Other hosts

Upload the same folder structure to Netlify, Cloudflare Pages, S3 + CloudFront, or any static host. No server-side runtime is required.

---

## Site architecture

### HTML `data-*` contract (navigation)

[`assets/js/site-include.js`](assets/js/site-include.js) expects each page’s `<html>` to declare:

| Attribute            | Purpose |
|----------------------|---------|
| `data-site-section`  | `"root"` for [`index.html`](index.html); `"contents"` for pages under [`contents/`](contents/). |
| `data-site-page`     | `"home"` \| `"more-info"` \| `"catalog"` \| `"order"` — drives `aria-current="page"` on the matching nav link. |

Missing attributes cause the script to exit early; nav/footer placeholders will stay empty.

Placeholder elements:

- `#site-nav-inner` — top navigation target.
- `#site-footer-inner` — footer navigation target.
- `#site-call-to-action` — optional; empty `<section class="CallToAction" id="site-call-to-action">` on [Home](index.html) and [More Info](contents/more-info.html). Filled by `renderCallToAction()` in `site-include.js`. The section uses `display: contents` so layout matches a plain paragraph inside the card.

### Styling

[`assets/style.css`](assets/style.css) is the **single** stylesheet. It defines global tokens (colors, typography), `.card` sections, catalog grids, tile (`.TIM`) layout, forms, and responsive rules.

### Key pages

| File | Role |
|------|------|
| [`index.html`](index.html) | Home, jingle demo, optional CTA block |
| [`contents/more-info.html`](contents/more-info.html) | Story + multi-style samples + optional CTA block |
| [`contents/catalog.html`](contents/catalog.html) | Large catalog of genre-grouped tiles |
| [`contents/order.html`](contents/order.html) | Order form + confirmation message |

---

## Typography and scaling

The site uses CSS custom properties in [`assets/style.css`](assets/style.css) `:root` to separate **scalable story/layout text** from **fixed UI chrome**:

| Token | Typical use |
|-------|-------------|
| **`--font-p`** | Base scale for `.card` content: headings (`calc(var(--font-p) * …)`), body flow inside cards, tile titles (including `clamp` + container query units where used), jingle box, **form disclaimers** (`.form-disclaimer`), and other proportional sizing. **Changing `--font-p` rescales this whole group together.** |
| **`--font-ui`** | **Fixed-feel controls**: submit button (`.btn`), form inputs (`.form-field`), and similar UI set explicitly to `var(--font-ui)` so labels and fields **do not balloon** when you increase `--font-p`. |

Global **`p`** elements also set `font-size: 1.5rem` (at the default `--font-p` of `2rem`, that is **0.75×** the card scale). To keep paragraphs **strictly** tied to `--font-p` in one place, you can replace that rule with something like `font-size: calc(var(--font-p) * 0.75)` (maintainers should verify line length and layout after any change).

**Nav/footer link text** injected by `site-include.js` uses stylesheet rules for `.site-nav a` / `.site-footer-nav a` (fixed `rem`-based sizes in CSS), so **button-like nav labels** stay visually stable while story copy scales from `--font-p`.

---

## Customizing content

### Replacing images and audio

1. Add or replace files under [`assets/images/`](assets/images/) and [`assets/audio/`](assets/audio/).
2. Update the corresponding `src` on `<img>` and `<source>` elements in the relevant HTML files.
3. Keep **descriptive `alt` text** on images for accessibility.

### Catalog titles and tracks

[`contents/catalog.html`](contents/catalog.html) uses a repeated pattern per tile: title, image, audio source, and an “Order similar” button linking to `order.html#sample-order`. To ship your MVP:

- Replace placeholder titles (e.g. “Song 1”) with real track names.
- Point each tile’s image and MP3 to your media files.
- Genre sections are plain HTML `<section>` blocks; duplicate or trim sections as needed.

A future improvement (optional) is a small JSON + build script to generate the catalog from data; that is **not** part of the current repo.

### Mailto and branding

Contact and order mailto links use a consistent subject line (**This Is Your Song**). To change the address or template, edit:

- [`assets/js/site-include.js`](assets/js/site-include.js) (`CONTACT_MAILTO`) — also used by the injected CTA “contact me” link and nav/footer **Contact**.
- The mailto `href` in [`contents/order.html`](contents/order.html) if you use a different template for the inline “open a prefilled message” link.

**Shared CTA copy** (home + More Info): edit `renderCallToAction()` in [`assets/js/site-include.js`](assets/js/site-include.js) so catalog/order paths and wording stay correct for both `root` and `contents` URL layouts.

---

## Order form behavior

[`assets/js/order-form.js`](assets/js/order-form.js) **does not** POST to a backend. On submit it:

1. Calls `preventDefault()` so the page does not navigate away.
2. Reveals the thank-you paragraph (`#confirmation`).
3. Resets the form fields (including optional file inputs).

The form includes optional uploads: **Talk to Me** (audio narrative), lyrics file, and reference MP3. File data is **not** sent anywhere by this script; real delivery still requires a backend or manual follow-up (see below).

For production use cases where submissions must be **stored or emailed automatically**, integrate a form backend (Formspree, Netlify Forms, a serverless function, etc.) and replace or extend this script. Until then, visitors can still use the **Contact** mailto link in the footer (and any mailto links in copy) to reach you directly.

---

## Accessibility and semantics

- Landmark elements (`<nav>`, `<main>`, `<header>`, `<footer>`) are used where appropriate.
- `aria-label` and `aria-labelledby` appear on key regions (e.g. catalog sections).
- Audio uses native `<audio controls>`; images should have meaningful `alt` text when you swap in real artwork.

Further audits (keyboard-only pass, color contrast tools) are recommended before a public launch.

---

## Browser support

Target: **current evergreen browsers** (last two major versions of Chrome, Edge, Firefox, Safari). The site uses modern CSS (e.g. `overflow-x: clip`, grid). Very old browsers may degrade layout or hide some effects.

---

## Known limitations

- **No server-side form handling** — see [Order form behavior](#order-form-behavior); uploaded files are not transmitted by the current scripts.
- **Large catalog HTML** — maintainability is manual unless you add a generator later.
- **Some imagery** may still use third-party placeholders (e.g. More Info featured tile) until you replace them with owned assets.

---

## Contributing

1. Fork the repository.
2. Create a branch for your change (`git checkout -b feature/your-change`).
3. Commit with clear messages.
4. Open a pull request describing what changed and why.

For course or team projects, follow any additional guidelines your instructor or organization provides.

---

## License

This project is licensed under the **MIT License** — see [`LICENSE`](LICENSE).

---

## Author

**John Barkle** — © 2026

Repository: [github.com/JASYTIONLINE/r94-this-is-your-song](https://github.com/JASYTIONLINE/r94-this-is-your-song)

For service inquiries, use the **Contact** / **Order** flows on the deployed site or the mailto links defined in the HTML and `site-include.js`.
