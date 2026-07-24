# vsarathy.com

Personal academic website of [Vasanth Sarathy](https://vsarathy.com) — research on trustworthy
reasoning for AI that acts: adversarial evaluation, argumentation, uncertainty quantification,
and machine theory of mind.

Built with [Eleventy](https://www.11ty.dev/). No frameworks, no trackers, one CSS file's worth
of design tokens (IBM Plex Sans/Mono, black on white, burnt-ember accents).

## Develop

```bash
npm install
npm start        # http://localhost:4000
npm run build    # production build to _site/
```

## Deploy

Push to the `eleventy-migration` branch. GitHub Actions builds and deploys to GitHub Pages
(see `.github/workflows/deploy-eleventy.yml`).

## Layout

Site source lives in `src/` — pages as Nunjucks templates, blog posts as Markdown in
`src/blog/posts/`, site data (navigation, curated publications) in `src/_data/`.
See `CLAUDE.md` for the full map and content conventions.

## License

MIT (site code). Content © Vasanth Sarathy.
