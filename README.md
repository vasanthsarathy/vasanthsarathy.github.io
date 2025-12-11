# Vasanth Sarathy - Personal Website

A minimal, clean personal website built with Eleventy, featuring a technical aesthetic.

## Overview

This site showcases:
- Art gallery (88 cartoons about law)
- Web applications and puzzle games
- Blog with LaTeX math and code highlighting support

## Tech Stack

- **[Eleventy](https://www.11ty.dev/)** - Static site generator
- **Vanilla CSS** - No framework, clean and minimal
- **KaTeX** - Fast math rendering
- **Prism** - Syntax highlighting
- **GitHub Pages** - Hosting
- **Custom domain**: vsarathy.com

## Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm start

# Site will be available at http://localhost:4000
```

### Build

```bash
# Build for production
npm run build

# Output will be in _site/
```

## Site Structure

```
src/
├── index.njk              # Home page with bio
├── art.njk                # Art gallery (88 cartoons)
├── apps.njk               # Web apps and games
├── blog/
│   ├── blog.njk          # Blog listing
│   └── posts/*.md        # Blog posts
├── _includes/
│   ├── layouts/          # Page templates
│   └── components/       # Reusable components
├── _data/
│   ├── site.json        # Site metadata
│   └── artworks.js      # Auto-discovered artwork
└── assets/
    ├── css/             # Stylesheets
    └── img/             # Images
```

## Editing Content

### Where to Edit Each Page

- **Home Page**: Edit `src/index.njk` for bio, title, and profile info
- **Art Gallery**: Edit `src/art.njk` for page title/description. Add/remove images in `src/assets/img/art/legally-drawn/img/`
- **Apps Page**: Edit `src/apps.njk` to add/modify app cards and links
- **Blog Posts**: Create/edit `.md` files in `src/blog/posts/`
- **Blog Index**: Edit `src/blog/blog.njk`
- **Site Info**: Edit `src/_data/site.json` for name, email, social links, navigation

### Adding Blog Posts

Create a new Markdown file in `src/blog/posts/`:

```markdown
---
layout: layouts/post.njk
title: Your Post Title
date: 2024-MM-DD
description: Brief description
tags: [ai, research]
---

Your content here...

## Math Support

$$E = mc^2$$

## Code Support

\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`
```

### Adding Artwork

Place images in `src/assets/img/art/legally-drawn/img/`. They will be automatically discovered and added to the gallery.

## Complete Workflow: Edit → Build → Deploy

### Step 1: Edit Content

Edit the relevant files (see "Editing Content" section above).

### Step 2: Test Locally

```bash
# Start development server
npm start

# Site runs at http://localhost:4000/
# Auto-reloads when you save files
```

Preview your changes in the browser. Make any adjustments needed.

### Step 3: Build for Production

```bash
# Build the site
npm run build

# Output will be in _site/ directory
```

This creates the final static files that will be deployed.

### Step 4: Commit Your Changes

```bash
# Check what files changed
git status

# Add all changes
git add .

# Commit with a descriptive message
git commit -m "Update home page bio and add new blog post"
```

### Step 5: Push to GitHub

```bash
# Push to the eleventy-migration branch
git push origin eleventy-migration
```

### Step 6: Automatic Deployment

✅ **GitHub Actions automatically deploys your site!**

- After you push, GitHub Actions will:
  1. Install dependencies
  2. Build the site
  3. Deploy to GitHub Pages
  4. Site will be live at **vsarathy.com** in ~2-3 minutes

You can monitor the deployment:
- Go to your repository on GitHub
- Click "Actions" tab
- See the latest workflow run

### Quick Reference

```bash
# Full workflow
npm start              # Test locally at http://localhost:4000
# (Make edits, preview changes)
npm run build          # Build for production
git add .              # Stage changes
git commit -m "..."    # Commit
git push origin eleventy-migration  # Deploy!
```

### Manual Deployment (Alternative)

If you need to deploy manually:

```bash
npm run build
# Deploy contents of _site/ directory to your hosting
```

## Design Philosophy

- **Minimal**: Clean, distraction-free design
- **Technical**: Documentation-style aesthetic
- **Fast**: Static files, optimized for performance
- **Accessible**: Semantic HTML, proper contrast
- **Responsive**: Mobile-first design

## CSS Architecture

- `variables.css` - Design tokens (colors, spacing, typography)
- `reset.css` - Minimal CSS reset
- `base.css` - Base typography and elements
- `components.css` - Component-specific styles

**Design**: Clean white background with thin IBM Plex Mono (weight 400) throughout.

## Performance

Target metrics:
- First Contentful Paint: <1s
- Time to Interactive: <2s
- Lighthouse Score: 95+

## License

Content and code are separate:
- **Code**: MIT License
- **Content**: © Vasanth Sarathy

## Contact

- Email: vasanth.sarathy@tufts.edu
- GitHub: [@vasanthsarathy](https://github.com/vasanthsarathy)
- LinkedIn: [vasanthsarathy](https://linkedin.com/in/vasanthsarathy)
- Google Scholar: [Profile](https://scholar.google.com/citations?user=3SeoejIAAAAJ)
