# Contributing Documentation

All script documentation is written in Markdown and grouped by script.

## Required Sections Per Script

Each script folder must include:

1. `readme.md`
2. `api.md`
3. `config-examples.md`
4. `changelog.md`

## Authoring Guidelines

- Use clear headings in descending order (`#`, `##`, `###`).
- Prefer short paragraphs and bullet points.
- Keep examples realistic and copy-paste friendly.
- Add changelog entries in descending release order.

## Validation Commands

```bash
npm run check:content
npm run lint:markdown
npm run test:unit
```

If you add new script docs, update `docs/scripts/_meta/scripts-index.json`.
