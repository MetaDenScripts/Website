# Tasks: FiveM Scripts Documentation Website

**Input**: Design documents from `/specs/001-fivem-docs-site/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Include unit and end-to-end tests for content model, markdown rendering, navigation, and accessibility smoke checks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Node project and scripts in package.json
- [X] T002 Configure VitePress site scaffolding in docs/.vitepress/config.ts
- [X] T003 [P] Add TypeScript and toolchain configs in tsconfig.json and markdownlint-cli2.jsonc
- [X] T004 [P] Create base docs structure and homepage in docs/index.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T005 Create scripts metadata and content schema in docs/scripts/_meta/scripts-index.json and src/lib/content-model.ts
- [X] T006 [P] Implement script-first navigation generation in docs/.vitepress/config.ts
- [X] T007 [P] Implement markdown rendering enhancements and theme shell in docs/.vitepress/theme/index.ts and docs/.vitepress/theme/custom.css
- [X] T008 Implement section-completeness checker in scripts/check-content.mjs
- [X] T009 Configure GitHub Pages deployment workflow in .github/workflows/deploy-docs.yml
- [X] T010 Configure test scaffolding in vitest.config.ts and playwright.config.ts

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Browse Script Documentation Structure (Priority: P1) 🎯 MVP

**Goal**: Users can navigate by script and access API, README, config examples, and changelog sections.

**Independent Test**: Run docs locally and verify each script shows all required sections through navigation.

### Tests for User Story 1

- [X] T011 [P] [US1] Add navigation and required-sections e2e test in tests/e2e/navigation.spec.ts
- [X] T012 [P] [US1] Add content completeness unit test in tests/unit/content-model.spec.ts

### Implementation for User Story 1

- [X] T013 [P] [US1] Add sample script documentation files in docs/scripts/vehicle-keys/{api.md,readme.md,config-examples.md,changelog.md}
- [X] T014 [P] [US1] Add second sample script documentation files in docs/scripts/police-tools/{api.md,readme.md,config-examples.md,changelog.md}
- [X] T015 [US1] Wire script landing/navigation page in docs/scripts/index.md
- [X] T016 [US1] Add missing-section fallback component and usage in docs/.vitepress/theme/components/MissingSectionNotice.vue

**Checkpoint**: User Story 1 is functional and independently testable

---

## Phase 4: User Story 2 - Read Markdown-Based Content (Priority: P2)

**Goal**: Maintainers can author markdown and have it rendered correctly with readable formatting.

**Independent Test**: Render markdown-heavy sample pages with headings, lists, links, tables, and code blocks.

### Tests for User Story 2

- [X] T017 [P] [US2] Add markdown rendering e2e test in tests/e2e/markdown-rendering.spec.ts

### Implementation for User Story 2

- [X] T018 [P] [US2] Add markdown-rich examples to docs/scripts/vehicle-keys/readme.md
- [X] T019 [P] [US2] Add markdown-rich examples to docs/scripts/police-tools/readme.md
- [X] T020 [US2] Add docs authoring guidance in docs/contributing.md

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - Use the Site Accessibly (Priority: P3)

**Goal**: Keyboard-only and assistive-technology users can navigate and consume docs effectively.

**Independent Test**: Validate focus order, skip link behavior, landmarks, and heading hierarchy in key pages.

### Tests for User Story 3

- [X] T021 [P] [US3] Add accessibility smoke e2e test in tests/e2e/accessibility.spec.ts

### Implementation for User Story 3

- [X] T022 [US3] Implement skip-link and landmark wrappers in docs/.vitepress/theme/Layout.vue
- [X] T023 [US3] Improve accessible styling and focus visibility in docs/.vitepress/theme/custom.css
- [X] T024 [US3] Add accessibility notes and keyboard guide in docs/accessibility.md

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T025 [P] Add docs README for local usage in README.md
- [X] T026 Run content completeness check and fix findings
- [X] T027 Run unit and e2e tests and fix findings
- [X] T028 Build static site and verify preview output

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories (Phases 3-5)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on all user stories

### User Story Dependencies

- **US1**: Starts after Foundational, no dependency on other stories
- **US2**: Starts after Foundational, reuses US1 docs pages
- **US3**: Starts after Foundational, builds on existing theme/layout

### Within Each User Story

- Tests before implementation
- Content model before navigation usage
- Theme/layout foundations before accessibility enhancements

### Parallel Opportunities

- T003 and T004 can run in parallel
- T006 and T007 can run in parallel
- T011/T012, T013/T014, T018/T019 can run in parallel
- Test files for different stories can run in parallel

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Phases 1 and 2
2. Deliver and validate US1
3. Confirm navigable script-first docs with required sections

### Incremental Delivery

1. Add US1 navigation and completeness
2. Add US2 markdown depth and author guidance
3. Add US3 accessibility hardening
4. Run polish checks and static build verification

## Notes

- Mark tasks complete in this file as implementation proceeds.
- Keep Markdown as source of truth for all script documentation pages.
- Preserve GitHub Pages static compatibility in all tooling decisions.
