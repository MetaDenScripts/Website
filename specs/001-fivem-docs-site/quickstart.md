# Quickstart: FiveM Scripts Documentation Website

## Prerequisites

- Node.js 22 LTS
- npm 10+

## 1) Install dependencies

```bash
npm install
```

## 2) Run local docs preview

```bash
npm run docs:dev
```

## 3) Validate markdown and content completeness

```bash
npm run lint:markdown
npm run check:content
```

## 4) Run unit and end-to-end tests

```bash
npm run test:unit
npm run test:e2e
```

## 5) Build static site

```bash
npm run docs:build
```

## 6) Preview production build locally

```bash
npm run docs:preview
```

## Acceptance Validation Checklist

- Top-level navigation lists scripts.
- Homepage shows latest scripts cards (up to 16) with store and documentation links.
- Every script route includes API, README, config examples, and changelog sections.
- Markdown pages render headings, links, code blocks, and tables correctly.
- Keyboard-only navigation reaches all primary links and section anchors.
- Missing-section state is visible and understandable where content is absent.
- Static build output is deployable to GitHub Pages without server dependencies.

## Script Metadata for Homepage Cards

Each script in `docs/scripts/_meta/scripts-index.json` must include:

- `storeUrl`: script store page URL
- `addedAt`: ISO date (`YYYY-MM-DD`) used to sort the latest scripts section
