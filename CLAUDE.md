# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal academic website built with the **al-folio** Jekyll theme. The site is hosted on GitHub Pages and showcases publications, projects, CV, blog posts, and news. The site auto-deploys on pushes to the master branch.

## Build and Development Commands

### Local Development (Docker - Recommended)

```bash
# Pull latest pre-built image and run local server
docker compose pull
docker compose up

# Access site at http://localhost:8080
```

```bash
# Build custom docker image (if needed)
docker compose up --build

# Force recreate (to update Ruby/Jekyll packages)
docker compose up --build --force-recreate
```

### Local Development (Native Ruby)

```bash
# Install dependencies
bundle install
pip install jupyter

# Run local server with related posts support
bundle exec jekyll serve --lsi

# Access site at http://localhost:4000
```

### Build for Production

```bash
# Build static site
export JEKYLL_ENV=production
bundle exec jekyll build --lsi

# Purge unused CSS (optional optimization)
npm install -g purgecss
purgecss -c purgecss.config.js
```

### Code Quality

```bash
# Format code with Prettier
npx prettier --write .

# Check formatting
npx prettier --check .
```

## Project Architecture

### Content Management

- **Publications**: Managed via BibTeX in `_bibliography/papers.bib`
  - Jekyll Scholar plugin automatically generates publication pages
  - Author highlighting configured in `_config.yml` under `scholar.last_name` and `scholar.first_name`
  - Supports fields: `abstract`, `arxiv`, `pdf`, `poster`, `supp`, `code`, `website`, etc.

- **CV**: Dual-source system
  - Primary: `assets/json/resume.json` (JSON Resume standard)
  - Fallback: `_data/cv.yml` (used if JSON file not found)

- **Blog Posts**: Markdown files in `_posts/` with format `YYYY-MM-DD-title.md`

- **Projects**: Markdown files in `_projects/` displayed as responsive grid

- **News**: Markdown files in `_news/` displayed on homepage
  - Two types: inline news and news with links

### Key Configuration

- `_config.yml`: Main configuration file
  - Site metadata (title, author, email, description)
  - Theme settings (colors, fonts)
  - Plugin configuration (Jekyll Scholar, pagination, etc.)
  - Social media links
  - Collections definition

- `_data/`:
  - `coauthors.yml`: Co-author information for automatic linking
  - `repositories.yml`: GitHub user and repo data
  - `venues.yml`: Publication venue abbreviations

### Layouts and Templates

- `_layouts/`: Page layout templates (about, cv, post, distill, etc.)
- `_includes/`: Reusable components (header, footer, news, etc.)
- `_sass/`: SCSS styling
  - `_themes.scss`: Theme colors
  - `_variables.scss`: CSS variables
  - `_base.scss`, `_layout.scss`, `_cv.scss`, `_distill.scss`: Component styles

### Asset Management

- `assets/img/`: Images (supports responsive WebP via ImageMagick)
- `assets/js/`: JavaScript files
- `assets/json/`: Data files (resume.json)
- `assets/pdf/`: PDF files (papers, posters, slides)

## Deployment

### GitHub Pages Auto-Deploy

The site automatically deploys via GitHub Actions on push to master/main branch:

1. Workflow: `.github/workflows/deploy.yml`
2. Builds with Jekyll
3. Purges unused CSS
4. Deploys to `gh-pages` branch

**Important**: All changes must be made to the `master` branch, never to `gh-pages` (auto-generated).

### Deployment Triggers

The workflow runs on changes to:
- `assets/**`
- `**.html`, `**.js`, `**.liquid`
- `**/*.md`, `**.yml`

## Content Editing Guidelines

### Adding Publications

Edit `_bibliography/papers.bib`:
- Use standard BibTeX format
- Add custom fields for PDFs, posters, code links, etc.
- Publications auto-sort by year (most recent first)

### Updating Personal Information

- Site title, name, email: `_config.yml` lines 5-9
- Social links: `_config.yml` lines 69-104
- About page: `_pages/about.md`

### Modifying CV

- JSON format: Edit `assets/json/resume.json`
- YAML format: Edit `_data/cv.yml` (and delete resume.json)

### Adding Blog Posts

Create `_posts/YYYY-MM-DD-title.md` with frontmatter:
```yaml
---
layout: post
title: Your Title
date: YYYY-MM-DD
description: Brief description
tags: formatting code
categories: sample-posts
---
```

## Technical Details

### Jekyll Plugins

- `jekyll-scholar`: Bibliography and citation management
- `jekyll-paginate-v2`: Blog pagination
- `jekyll-imagemagick`: Responsive image generation
- `jekyll-jupyter-notebook`: Jupyter notebook support
- `jekyll-toc`: Table of contents generation
- `jekyll-minifier`: HTML/CSS/JS minification

### Theme Features

- Light/dark mode toggle (auto-detects user preference)
- Responsive design with Bootstrap
- MathJax for LaTeX math typesetting
- Code syntax highlighting
- Image zoom (medium-zoom)
- Distill-style blog posts support
- Chart.js, Mermaid, TikZ support

### Configuration Notes

- `url`: Set to `https://vasanthsarathy.github.io`
- `baseurl`: Leave empty for root deployment
- Changes to `_config.yml` require rebuild to take effect
- All other changes are live (just refresh page)
