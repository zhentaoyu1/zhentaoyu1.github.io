# Zhentao Yu — research homepage

Static academic website for GitHub Pages. No framework, build step, API key, analytics or third-party runtime dependency.

## Preview

From this repository:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080`. The site also works by opening `index.html` directly. Core biography, publications and resource links remain readable with JavaScript disabled.

## Maintain

- `index.html`: biography, selected research, publication entries, news, experience and metadata.
- `assets/site.css`: desktop/mobile layout, print styles and reduced-motion support.
- `assets/site.js`: mobile navigation, publication search/year filters and image preview dialog.
- `images/avatar.jpg`: original profile portrait.
- `images/pubs/`: original research figures. Their full images are accessible through the preview links.

To add a publication, copy an existing `.publication` entry, update its `data-year`, unique `id`, text, image and resource links. If a new year is introduced, add its filter button in `.publication-tools`; keep “Earlier” aligned with the displayed year range in `site.js`.

Citation and star counts are manually dated snapshots, not live counters. Update them with their date. Preserve specific contribution descriptions and distinguish sampling-step reductions from measured speedups.

The site metadata uses the canonical URL `https://zhentaoyu1.github.io/`. If the domain changes, update the canonical/social tags, JSON-LD, `robots.txt` and `sitemap.xml` together. Update the footer and JSON-LD dates when editing content.

## Publish

This checkout is a local revision on `improve/research-homepage`. No changes are published until reviewed and pushed to the branch configured for GitHub Pages. Keep `.nojekyll` at the repository root.

Do not store GitHub tokens or private personal-assistant files in this repository.
