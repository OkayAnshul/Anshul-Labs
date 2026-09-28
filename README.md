# Anshul Labs — official website

The official website of **Anshul Labs**, an independent software business based in
Prayagraj, Uttar Pradesh, India.

Live: <https://okayanshul.github.io/anshul-labs/>

It's a plain static site (HTML, CSS and a little JavaScript), so there's no build step,
no dependencies, no backend and no tracking. It is hosted free on GitHub Pages.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage: hero, projects, GitHub, Google Play direction, services, technology, about, contact |
| `privacy.html` | Privacy policy for the website |
| `terms.html` | Terms of use for the website |
| `404.html` | "Page not found" page, which GitHub Pages serves automatically |
| `styles.css` | All styles. Colours, spacing and fonts are CSS variables at the top of the file |
| `script.js` | Progressive enhancement: mobile menu, scroll reveal, active nav link. The site still works without it |
| `assets/` | Logo/favicon (`favicon.svg`), PNG icons, and the social sharing image (`og-image.png`) |
| `site.webmanifest` | Web app manifest (name, icons, colours) |
| `robots.txt`, `sitemap.xml` | Search engine files |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

All links between pages and to assets are **relative** (`styles.css`, `assets/…`,
`privacy.html`), so the site works under the `/anshul-labs/` subpath and at a domain root.
The one exception is `404.html`, which uses absolute URLs because GitHub serves it from
any path.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Deploy with GitHub Pages

The site is published from the `gh-pages` branch.

1. Open the repository on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose the branch (`gh-pages`, or `master` once these files are merged) and the
   **/ (root)** folder, then **Save**.
4. After a minute or so the site is live at `https://okayanshul.github.io/anshul-labs/`.

To publish changes, commit them to the branch Pages deploys from. GitHub redeploys automatically.

## Updating projects

Projects are in `index.html`, in the section marked `<!-- PROJECTS -->`. Each project is one
`<li>` with an `<article class="project-card">` inside it. To add a project, copy an
existing block and change:

- **Category** — `project-category`, for example `Android · Productivity`
- **Status badge** — `<span class="badge">Open source</span>`. For unfinished work use
  `badge badge--experiment` with `Experimental`. `badge--active` (green) and
  `badge--research` (blue) are also available.
- **Name, description and technology tags**
- **GitHub link** — only link to repositories that exist and are public.

The "Built in public" card has a short list of repositories (`repo-list`) that you can edit
the same way.

When an app goes live on Google Play, replace the `play-pill` element (the "Google Play —
coming soon" note) with a real link to the store listing. Then update the line under the
projects grid ("None are published on Google Play yet") and the roadmap list.

## Changing contact information

The email address, GitHub and LinkedIn URLs appear in several places. Search and replace across
the project:

- `anshulisokay@gmail.com` — `index.html` (contact section, mobile menu, footer, JSON-LD),
  `privacy.html` and `terms.html`
- `https://github.com/OkayAnshul`
- `https://www.linkedin.com/in/builderanshul/`

The location ("Prayagraj, Uttar Pradesh, India") appears in the hero card, the About facts,
the contact section, the footer, the JSON-LD block and the legal pages.

When you change the privacy policy or terms, also update the **Last updated** date on that
page and the `<lastmod>` date in `sitemap.xml`.

## Connecting a custom domain

1. Buy a domain, for example `anshullabs.com`.
2. At your DNS provider, add records that point to GitHub Pages:
   - Apex domain (`anshullabs.com`): four `A` records to `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153` and `185.199.111.153`. You can also add `AAAA`
     records for IPv6 (see GitHub's docs).
   - `www` subdomain: a `CNAME` record to `okayanshul.github.io`.
3. In **Settings → Pages → Custom domain**, enter the domain and save. GitHub commits a
   `CNAME` file to the publishing branch. Tick **Enforce HTTPS** once it becomes available.
4. Replace the old base URL with the new one everywhere:

   ```bash
   grep -rl "https://okayanshul.github.io/anshul-labs/" . --exclude-dir=.git \
     | xargs sed -i 's#https://okayanshul.github.io/anshul-labs/#https://anshullabs.com/#g'
   ```

   That updates the canonical URLs, Open Graph and Twitter tags, the JSON-LD, `sitemap.xml`,
   `robots.txt` and `404.html`.
5. Update the website URL in Google Play Console and anywhere else you've listed it.

Note: search engines only read `robots.txt` from the root of a domain, so it has no effect at
`okayanshul.github.io/anshul-labs/`. It starts working once the site moves to its own domain.
Until then, you can submit `sitemap.xml` directly in Google Search Console.

## Content principles

This is the website of a small, independent business, and everything on it should be
true. Don't add invented clients, testimonials, statistics, download counts, team members
or awards. Label experimental projects as experimental, and don't claim a Google Play
release until it's live.

© 2026 Anshul Labs
