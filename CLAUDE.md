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
  research.njk             # research program: Reasoning Assurance — 4 properties + the method
  publications.njk         # "Selected Publications" page (curated)
  tools.njk                # research software (VSAX, ArgLib, Crucible), Rune, games
  apps.njk                 # redirect stub: /apps/ -> /tools/ (do not delete)
  art.njk                  # Legally Drawn cartoon gallery
  blog/blog.njk            # blog index
  blog/posts/              # posts, YYYY-MM-DD-title.md
  _data/site.json          # name, title, email, socials, NAVIGATION
  _data/publications.js    # curated publication list (see below)
  _data/artworks.js        # scans src/assets/img/art/ for the gallery
  _includes/layouts/       # base.njk (shell/head/meta/OG), page.njk, post.njk
  _includes/components/    # header.njk (wordmark + nav), footer.njk
  assets/css/              # variables.css (design tokens), base.css, components.css
  assets/js/site.js        # § section index + scroll-spy + reveal observer
```

## Page structure

Pages are built from `<section id="…" data-index="…">` blocks, each opening with an `<h2>`.
`site.js` reads those at runtime and builds the **§ index** pinned in the left margin, so adding
a section to a template automatically adds an index entry — there is no TOC to maintain. Blog
posts have no `<section>` wrappers, so the index falls back to their `<h2 id>` headings and drops
the § numbering (their headings often carry the author's own numbers). Publications sets
`indexNumbering: none` in front matter so its index lists years instead.

Motion is enhancement only: `site.js` adds the `.reveal` class itself, so with JS off or
`prefers-reduced-motion` set, every element is simply visible. Never move reveal state into
CSS-only rules — that reintroduces the flash-of-hidden-content this design avoids.

## Content rules

**Publications** (`src/_data/publications.js`):
- This is a *curated* list sourced from the CV
  (`Workspace/2_Areas/Career/CV_Resumes/CV/cv_sarathy_2026.tex`), not an exhaustive record.
  Vasanth has many more publications; the complete record is his Google Scholar profile.
  Never state an exact total anywhere on the site — say "more than 40" and link Scholar.
- Fields: `title, author, year, venue, abbr, tag (journal/workshop/etc), note (oral/spotlight/
  award), link, selected (homepage highlight), question (the eval question the work answers —
  shown on the homepage Recent Work block), techniques`.
- `techniques` drives the evidence chips under each row of the homepage toolkit block. Keys:
  `logic · uncertainty · interpretability · planning · language` — they must match the `evidence()`
  macro calls in `index.njk`. The data file groups them into `publications.byTechnique` with a
  `short` chip label (`AAAI ’26`). This tagging is **curated, not exhaustive**: the block is a
  short citation trail, so keep each key to ~4 papers chosen for fit and venue strength. Tagging a
  new paper is all it takes to change what the homepage shows. Interpretability is the thin row —
  it carries one paper plus a hand-written VSAX chip passed through `{% call %}`.
- Homepage shows entries with `selected: true` under "Recent work"; keep those to ~5, framed by
  `question`, and favor strong venue tags (main track / journal) — avoid demo-track or
  extended-abstract papers there.

**Blog posts** (`src/blog/posts/YYYY-MM-DD-title.md`):

```yaml
---
layout: layouts/post.njk
title: Post Title
date: 2026-01-15
description: One-line description
---
```

KaTeX math is available (`$...$`, `$$...$$`). New posts automatically appear on `/blog/` and in
the Atom feed at `/feed.xml` (`src/feed.njk`) — no extra steps. The homepage deliberately does
*not* list recent posts (removed 2026-08-10); keep it that way unless Vasanth asks otherwise.
To keep a draft out of the build, add `eleventyExcludeFromCollections: true` and `permalink: false`
to its front matter.

**Voice / positioning:** the research program is named **Reasoning Assurance** — the science of
specifying what good reasoning requires, verifying whether AI systems meet those specs,
monitoring them at runtime, and improving them against the same specs. This name is settled;
don't re-litigate it or drift to "verifiable reasoning" / "trustworthy reasoning". The layer map:
*trustworthy* = value language · *verifiable* = a goal-state inside the program ·
*inspect / contest / trust / attribute* = the property vocabulary · *Reasoning Assurance* = the
discipline. The intellectual signature is the **implicit layer** — assumptions arguments don't
state, norms contexts don't announce, beliefs interlocutors don't share, reasoning models report
but don't run — made explicit, then checkable. Homepage and research copy follow the "banner
question + method" structure, with the lawyer background as the differentiator. Don't flatten
this into generic researcher-bio language, and don't lead with the assured-discovery horizon —
that closes the research page, it doesn't open the site.

## Design system

- Three type roles: **Source Serif 4 for display** (headings, leads), **IBM Plex Sans for body
  prose**, **IBM Plex Mono for structure** (nav, labels, venues, §-numbers, metadata). Loaded in
  `base.njk`; roles assigned in `base.css`/`components.css`. Leads use serif at weight **300**.
- Tokens in `src/assets/css/variables.css`: warm paper `#faf9f6`, warm ink `#171210`, secondary
  text as ink at 58% alpha, hairlines at 10%, accent = burnt ember `#c04016` (matches CV/brand).
  Ember is reserved for interactive and structural elements — prose bold is weight-500 ink, not
  ember. 2px corner radius, 17px base.
- Publications listing is intentionally dense (see `.publications` overrides in components.css).

## Deployment

- Push to **`master`** (or `main`) → `.github/workflows/deploy-eleventy.yml` builds
  (Node 18, `npm ci`, `npm run build`) and deploys `_site/` to GitHub Pages. Live in ~2-3 min.
- `CNAME` (vsarathy.com) and `robots.txt` are passthrough-copied into the build.
