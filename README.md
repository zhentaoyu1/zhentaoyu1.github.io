# Zhentao Yu — research homepage

Simple academic website for GitHub Pages. White background, profile sidebar and a chronological publication list. No JavaScript, framework, build step, API key, analytics or third-party runtime dependency.

## Preview

From this repository:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080`. The site also works by opening `index.html` directly.

## Maintain

- `index.html`: biography, publication entries, news and metadata. Career and education are summarized in the biography.
- `assets/site.css`: desktop/mobile layout and print styles.
- `images/avatar.jpg`: original profile portrait.
- `images/pubs/`: original research figures. Their full images are accessible through the preview links.

To add a publication, copy an existing `.publication` entry and update its unique `id`, title, authors, venue/year, image and links. Put newer entries first. Figures link directly to their original images.

Citation and star counts are manually dated snapshots, not live counters. Update them with their date. Preserve specific contribution descriptions and distinguish sampling-step reductions from measured speedups.

The site metadata uses the canonical URL `https://zhentaoyu1.github.io/`. If the domain changes, update the canonical/social tags, JSON-LD, `robots.txt` and `sitemap.xml` together. Update the footer and JSON-LD dates when editing content.

## Publish

GitHub Pages serves the `main` branch. Keep `.nojekyll` at the repository root. Review changes locally before pushing.

Do not store GitHub tokens or private personal-assistant files in this repository.
