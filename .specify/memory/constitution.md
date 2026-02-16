<!--
Sync Impact Report
- Version change: template-draft → 1.0.0
- Modified principles:
	- Principle 1 placeholder → I. Script-First Information Architecture
	- Principle 2 placeholder → II. Markdown as Source of Truth
	- Principle 3 placeholder → III. Accessibility Is Non-Negotiable
	- Principle 4 placeholder → IV. Documentation Completeness per Script
	- Principle 5 placeholder → V. GitHub Pages Compatibility and Simplicity
- Added sections:
	- Section 2 placeholder → Design and Content Standards
	- Section 3 placeholder → Delivery Workflow and Quality Gates
- Removed sections: None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ⚠ pending: .specify/templates/commands/*.md (directory not present in repository)
	- ✅ reviewed, no changes required: .github/agents/*.md
- Follow-up TODOs:
	- TODO(RATIFICATION_DATE): original adoption date is unknown and must be confirmed.
-->

# MetaDenScripts Constitution

## Core Principles

### I. Script-First Information Architecture
All documentation features MUST preserve a script-first navigation model. The top-level
navigation MUST list scripts, and each script documentation area MUST expose exactly these
content groups: API documentation, README, configuration examples, and changelog. This
structure is mandatory to keep discovery predictable for server owners and developers.

### II. Markdown as Source of Truth
Documentation content MUST be authored and maintained in Markdown, and the site MUST render
Markdown content faithfully without requiring content rewrites into HTML. Any new feature
that touches content ingestion or rendering MUST prove compatibility with existing Markdown
documents to protect maintainability and contributor velocity.

### III. Accessibility Is Non-Negotiable
User-facing documentation pages MUST use semantic headings, keyboard-navigable controls,
meaningful link text, and sufficient color contrast equivalent to WCAG 2.1 AA intent. Pull
requests that introduce navigation, layout, or content components MUST include an
accessibility verification note because accessible docs are a core product requirement.

### IV. Documentation Completeness per Script
A script section is considered complete only when all four required content groups exist:
API documentation, README, configuration examples, and changelog. Features that add or
modify script documentation flows MUST preserve this completeness rule to avoid partial,
misleading, or support-heavy releases.

### V. GitHub Pages Compatibility and Simplicity
The documentation platform MUST remain deployable on GitHub Pages with a static-friendly
architecture and no mandatory server-side runtime. Implementation choices SHOULD favor simple,
maintainable patterns over custom complexity unless a documented constraint makes complexity
necessary.

## Design and Content Standards

- Design decisions MUST prioritize clarity over ornamentation and keep a consistent visual
	hierarchy across script pages.
- Navigation labels, headings, and section names MUST be consistent between scripts.
- Content templates MUST be reusable across scripts to reduce drift and improve onboarding.
- Changelog entries MUST be chronologically ordered and clearly scoped per script version.

## Delivery Workflow and Quality Gates

- Every plan MUST include a Constitution Check that verifies all five core principles.
- Every specification MUST include explicit requirements for script navigation structure,
	Markdown rendering behavior, and accessibility acceptance criteria.
- Every task list MUST include work items for accessibility validation and documentation
	completeness verification when user-facing docs are affected.
- Release readiness for documentation features REQUIRES successful local preview and an
	explicit check that all required script sections render correctly.

## Governance

This constitution is the authoritative governance source for this repository and supersedes
conflicting process notes in templates and agent guidance.

Amendments MUST be proposed through a pull request that includes: (1) proposed text changes,
(2) rationale, (3) semantic version bump justification, and (4) a Sync Impact Report covering
affected templates and guidance documents.

Versioning policy for this constitution follows semantic versioning:
- MAJOR: Incompatible governance changes or principle removals/redefinitions.
- MINOR: New principle/section or materially expanded guidance.
- PATCH: Clarifications, wording improvements, and typo/non-semantic edits.

Compliance review expectations:
- During planning, the Constitution Check MUST pass before design proceeds.
- During review, pull requests MUST state compliance with all applicable principles.
- Governance consistency across templates MUST be re-validated whenever this file changes.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date unknown. | **Last Amended**: 2026-02-16
