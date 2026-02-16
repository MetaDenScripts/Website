# Tasks: FiveM Scripts Documentation Website

**Input**: Design documents from `/specs/001-fivem-docs-site/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Context for this task generation**: Add a homepage “latest scripts” section under index/missing-section area using a simple 4x4-style card grid (not carousel), showing script title, description, store link, and documentation link.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare metadata and schema needed by all stories.

- [X] T001 Extend script metadata model with `storeUrl` and `addedAt` fields in src/lib/content-model.ts
- [X] T002 Add `storeUrl` and `addedAt` values for each script in docs/scripts/_meta/scripts-index.json
- [X] T003 [P] Document new metadata requirements (`storeUrl`, `addedAt`) in docs/contributing.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared homepage data/component plumbing required before story implementation.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 Create latest-scripts selector utility (sort by `addedAt`, limit 16) in src/lib/latest-scripts.ts
- [X] T005 [P] Register homepage latest-scripts component in docs/.vitepress/theme/index.ts
- [X] T006 [P] Add reusable grid/card base styles for latest scripts in docs/.vitepress/theme/custom.css
- [X] T007 Create Vue component scaffold with typed props for latest scripts in docs/.vitepress/theme/components/LatestScriptsGrid.vue
- [X] T008 Wire scripts-index JSON loading for homepage component consumption in docs/.vitepress/config.ts

**Checkpoint**: Foundation ready — user stories can proceed.

---

## Phase 3: User Story 1 - Browse Script Documentation Structure (Priority: P1) 🎯 MVP

**Goal**: Homepage shows the most recently added scripts as cards with clear store and documentation paths.

**Independent Test**: Open homepage and verify up to 16 newest scripts appear in a 4-column card grid on desktop, each with title, summary, store link, and docs link.

### Tests for User Story 1

- [X] T009 [P] [US1] Add homepage latest-scripts rendering e2e scenario in tests/e2e/navigation.spec.ts
- [X] T010 [P] [US1] Add unit test for latest-scripts sort/limit behavior in tests/unit/content-model.spec.ts

### Implementation for User Story 1

- [X] T011 [US1] Implement latest-scripts card rendering (title, summary, store/docs links) in docs/.vitepress/theme/components/LatestScriptsGrid.vue
- [X] T012 [US1] Mount latest-scripts grid on homepage under index content in docs/index.md
- [X] T013 [US1] Link each card to docs route using script section README paths from docs/scripts/_meta/scripts-index.json
- [X] T014 [US1] Add fallback to MissingSectionNotice when no scripts are available in docs/.vitepress/theme/components/LatestScriptsGrid.vue
- [X] T015 [US1] Tune responsive layout to 4-column desktop grid and stacked mobile cards in docs/.vitepress/theme/custom.css

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Read Markdown-Based Content (Priority: P2)

**Goal**: Markdown-driven documentation remains accurate while homepage cards use metadata links.

**Independent Test**: From homepage latest-scripts cards, open docs links and confirm Markdown pages render headings, links, code blocks, and tables correctly.

### Tests for User Story 2

- [X] T016 [P] [US2] Add regression path from homepage card to markdown page in tests/e2e/markdown-rendering.spec.ts

### Implementation for User Story 2

- [X] T017 [US2] Validate README target path generation from scripts metadata in src/lib/latest-scripts.ts
- [X] T018 [US2] Update quickstart validation steps for latest-scripts metadata and homepage checks in specs/001-fivem-docs-site/quickstart.md
- [X] T019 [US2] Update API contract schema for script metadata (`storeUrl`, `addedAt`) in specs/001-fivem-docs-site/contracts/openapi.yaml

**Checkpoint**: User Stories 1 and 2 work independently.

---

## Phase 5: User Story 3 - Use the Site Accessibly (Priority: P3)

**Goal**: Latest-scripts cards are fully keyboard navigable and screen-reader friendly.

**Independent Test**: Keyboard-only users can reach each card link and screen readers announce a clear section heading, card title, and link purpose.

### Tests for User Story 3

- [X] T020 [P] [US3] Add keyboard and landmark checks for latest-scripts section in tests/e2e/accessibility.spec.ts

### Implementation for User Story 3

- [X] T021 [US3] Add semantic section heading and list semantics for cards in docs/.vitepress/theme/components/LatestScriptsGrid.vue
- [X] T022 [US3] Add accessible link labels for external store links in docs/.vitepress/theme/components/LatestScriptsGrid.vue
- [X] T023 [US3] Ensure visible focus states for card actions in docs/.vitepress/theme/custom.css

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency, docs, and release readiness checks.

- [X] T024 [P] Update project usage notes for latest-scripts cards in README.md
- [X] T025 Run content validation and markdown lint checks via package.json scripts (`npm run check:content`, `npm run lint:markdown`)
- [X] T026 Run unit/e2e validation for new homepage behavior via package.json scripts (`npm run test:unit`, `npm run test:e2e`)
- [X] T027 Build production docs and verify static output with latest-scripts section (`npm run docs:build`) in docs/.vitepress/config.ts

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Starts immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2; can run after US1 data contracts are in place.
- **Phase 5 (US3)**: Depends on Phase 2; best validated after US1 UI is in place.
- **Phase 6 (Polish)**: Depends on completion of selected user stories.

### User Story Dependencies

- **US1 (P1)**: No dependency on other user stories after foundational completion.
- **US2 (P2)**: Reuses US1 latest-scripts links but remains independently testable.
- **US3 (P3)**: Reuses US1 UI structure for accessibility enhancements.

### Within Each User Story

- Tests first (when included), then implementation.
- Data/model updates before component wiring.
- Component wiring before style/accessibility refinement.

---

## Parallel Execution Examples

### User Story 1

- Run `T009` and `T010` in parallel (different test files).
- Run `T013` and `T015` in parallel after `T011` starts (metadata link wiring vs CSS tuning).

### User Story 2

- Run `T016` and `T019` in parallel (test file vs contract file).

### User Story 3

- Run `T022` and `T023` in parallel (component labels vs CSS focus styles).

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 and Phase 2.
2. Deliver only **US1 (Phase 3)** for immediate value.
3. Validate homepage latest-scripts grid behavior and ship.

### Incremental Delivery

1. Add US1 latest-scripts cards.
2. Add US2 markdown-link regression and metadata contract alignment.
3. Add US3 accessibility hardening.
4. Run polish validations and static build checks.

### Suggested MVP Scope

- **US1 only**: latest-scripts grid cards with store/docs links and fallback state.
