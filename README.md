# MetaDenScripts Documentation Website

Static documentation portal for FiveM scripts, built with VitePress and designed for GitHub Pages.

## Development

```bash
npm install
npm run docs:dev
```

## Validation

```bash
npm run check:content
npm run lint:markdown
npm run test:unit
npm run test:e2e
```

## Build

```bash
npm run docs:build
npm run docs:preview
```

## Content Structure

Each script under `docs/scripts/<script-id>/` includes:

- `readme.md`
- `api.md`
- `config-examples.md`
- `changelog.md`

Update `docs/scripts/_meta/scripts-index.json` when adding a script.

## Latest Scripts on Homepage

Homepage cards are generated from `docs/scripts/_meta/scripts-index.json` and sorted by newest `addedAt` value.
Each script entry should include:

- `storeUrl` (external store page)
- `addedAt` (ISO date `YYYY-MM-DD`)
