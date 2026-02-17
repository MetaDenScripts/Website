# Research: FiveM Scripts Documentation Website

## Decision 1: Use a Markdown-native static docs framework (VitePress)

- Decision: Adopt VitePress as the documentation platform.
- Rationale: VitePress is optimized for Markdown rendering, static output, and GitHub Pages deployment with minimal operational overhead.
- Alternatives considered:
  - Docusaurus: strong plugin ecosystem but introduces extra complexity for this scope.
  - MkDocs Material: excellent docs UX but less aligned with a TypeScript-first customization flow.
  - Custom React app: high flexibility but unnecessary complexity for an MVP docs portal.

## Decision 2: File-based content model with per-script folders

- Decision: Store docs per script in a fixed folder structure containing `api.md`, `readme.md`, `config-examples.md`, and `changelog.md`.
- Rationale: Enforces constitution completeness and keeps contributor workflow straightforward.
- Alternatives considered:
  - Monolithic markdown file per script: harder to maintain and less discoverable.
  - CMS-backed content: not static-first and adds hosting/runtime complexity.

## Decision 3: Navigation driven by script index manifest

- Decision: Maintain a `scripts-index.json` manifest for deterministic script listing and labels.
- Rationale: Supports predictable script-first navigation and avoids filesystem-order ambiguity.
- Alternatives considered:
  - Filesystem discovery only: simpler but unstable ordering and metadata constraints.
  - Hardcoded nav config only: higher maintenance friction as script count grows.

## Decision 4: Accessibility validation as release gate

- Decision: Add keyboard navigation and semantic structure checks in end-to-end acceptance testing.
- Rationale: Accessibility is constitutionally non-negotiable and must be verified before release.
- Alternatives considered:
  - Manual ad-hoc checks only: inconsistent and easy to miss regressions.
  - Deferred accessibility review: violates constitutional gate requirements.

## Decision 5: GitHub Pages deployment via static build workflow

- Decision: Deploy generated static site artifacts through a GitHub Actions workflow.
- Rationale: Matches hosting target, keeps delivery reproducible, and avoids server runtime dependencies.
- Alternatives considered:
  - Manual local deploys: not repeatable and error-prone.
  - External hosting platform: out of scope for stated requirement.

## Decision 6: Markdown rendering policy and fallback behavior

- Decision: Render standard CommonMark-compatible features and show clear fallback messaging for unsupported constructs.
- Rationale: Preserves source-of-truth markdown flow while keeping UX understandable.
- Alternatives considered:
  - Strict failure on unsupported markdown: risks blank/incomplete pages.
  - Allow raw HTML-heavy markdown patterns: weakens maintainability and consistency.
