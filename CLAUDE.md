# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Overview

Personal academic website of Vasanth Sarathy (vsarathy.com), built with **Eleventy (11ty) 2.x**.
The site's job is positioning: it presents Vasanth as a researcher who *builds and evaluates AI
reasoning you can inspect, contest, and trust*, with a lawyer's eye for manipulation. Keep all
copy consistent with that identity.

**History note:** this repo began as an al-folio Jekyll fork. The Jekyll theme was removed in the
2026 cleanup; if you see references to Jekyll, `_config.yml`, or `_bibliography/papers.bib`, they
are stale — everything lives under `src/` now. Old files are recoverable from git history.

## Commands

```bash
npm install        # once
npm start          # dev server at http://localhost:4000
npm run build      # production build to _site/
```

## Structure

```
.eleventy.js               # 11ty config: passthroughs (src/assets, CNAME, robots.txt),
                           #   markdown-it + KaTeX, posts collection, date filters
src/
  index.njk                # homepage: banner question, identity, selected work, contact
  research.njk             # research program: 4 trust properties × model/agent/multi-agent
  publications.njk         # "Selected Publications" page (curated)
  tools.njk                # research software (VSAX, ArgLib, Crucible), Rune, games
  apps.njk                 # redirect stub: /apps/ -> /tools/ (do not delete)
  art.njk                  # Legally Drawn cartoon gallery
  blog/blog.njk            # blog index
  blog/posts/              # posts, YYYY-MM-DD-title.md
  _data/site.json          # name, title, email, socials, NAVIGATION
  _data/publications.js    # curated publication list (see below)
  _data/artworks.js        # scans src/assets/img/art/ for the gallery
  _includes/layouts/       # base.njk (head/meta/OG), page.njk, post.njk
  _includes/components/    # header.njk (nav), footer.njk
  assets/css/              # variables.css (design tokens), base.css, components.css
```

## Content rules

**Publications** (`src/_data/publications.js`):
- This is a *curated* list sourced from the CV
  (`Workspace/2_Areas/Career/CV_Resumes/CV/cv_sarathy_2026.tex`), not an exhaustive record.
  Vasanth has many more publications; the complete record is his Google Scholar profile.
  Never state an exact total anywhere on the site — say "more than 40" and link Scholar.
- Fields: `title, author, year, venue, abbr, tag (journal/workshop/etc), note (oral/spotlight/
  award), link, selected (homepage highlight), question (the eval question the work answers —
  shown on the homepage Selected Work block)`.
- Homepage shows entries with `selected: true`; keep those to ~5 and framed by `question`.

**Blog posts** (`src/blog/posts/YYYY-MM-DD-title.md`):

```yaml
---
layout: layouts/post.njk
title: Post Title
date: 2026-01-15
description: One-line description
---
```

KaTeX math is available (`$...$`, `$$...$$`).

**Voice / positioning:** homepage and research page copy follows the "banner question + method"
structure (big question about AI reasoning, answered by building adversarial evaluations, lawyer
background as the differentiator). Don't flatten this into generic researcher-bio language.

## Design system

- Hybrid type: **IBM Plex Sans for body prose, IBM Plex Mono for structure** (headings, nav,
  labels, venues, metadata). Loaded in `base.njk`; roles assigned in `base.css`/`components.css`.
- Tokens in `src/assets/css/variables.css`: white background, near-black text, accent =
  burnt ember `#c04016` (matches CV/brand). No gradients, no rounded corners, 15px base.
- Publications listing is intentionally dense (see `.publications` overrides in components.css).

## Deployment

- Push to the **`eleventy-migration`** branch → `.github/workflows/deploy-eleventy.yml` builds
  (Node 18, `npm ci`, `npm run build`) and deploys `_site/` to GitHub Pages. Live in ~2-3 min.
- `CNAME` (vsarathy.com) and `robots.txt` are passthrough-copied into the build.
- `master` holds the pre-migration Jekyll history; do not deploy from it.
