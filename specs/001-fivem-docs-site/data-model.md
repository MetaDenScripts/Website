# Data Model: FiveM Scripts Documentation Website

## Entity: Script
- Description: A documented FiveM script represented in top-level navigation.
- Fields:
  - `id` (string, required): Unique stable identifier used in routes and content paths.
  - `name` (string, required): Human-readable script display name.
  - `summary` (string, optional): Short description shown in script lists.
  - `order` (integer, required): Explicit ordering value for script navigation.
  - `status` (enum, required): `active` | `deprecated`.
- Validation Rules:
  - `id` MUST be URL-safe and unique across all scripts.
  - `name` MUST be non-empty.
  - `order` MUST be unique or deterministic when ties occur.
- State Transitions:
  - `active` → `deprecated` when script is no longer maintained.

## Entity: DocumentationSection
- Description: Required content segment inside each script.
- Fields:
  - `scriptId` (string, required): Foreign key to Script.
  - `sectionType` (enum, required): `api` | `readme` | `config-examples` | `changelog`.
  - `title` (string, required): Section heading label.
  - `sourcePath` (string, required): Path to markdown source file.
  - `hasContent` (boolean, required): Indicates markdown content existence.
  - `lastUpdated` (date-time, optional): Last source update timestamp.
- Validation Rules:
  - Each script MUST have all four required `sectionType` values.
  - `sourcePath` MUST map to markdown content under docs root.
  - If `hasContent = false`, UI MUST expose a clear missing-section state.

## Entity: ChangelogEntry
- Description: A versioned change note within a script changelog section.
- Fields:
  - `scriptId` (string, required): Foreign key to Script.
  - `version` (string, required): Script version label.
  - `releaseDate` (date, required): Release date.
  - `summary` (string, required): Human-readable change summary.
  - `changes` (array[string], optional): Detailed bullet changes.
- Validation Rules:
  - Entries SHOULD be ordered by descending `releaseDate`.
  - `version` MUST be non-empty.

## Entity: NavigationItem
- Description: UI node used in global or per-script navigation.
- Fields:
  - `id` (string, required): Unique nav item id.
  - `label` (string, required): Display text.
  - `href` (string, required): Internal target path.
  - `kind` (enum, required): `script` | `section`.
  - `parentId` (string, optional): Parent item for section navigation.
- Validation Rules:
  - Every `href` MUST resolve to an existing route.
  - `section` items MUST reference a valid script parent.

## Relationships
- Script 1 → 4 required DocumentationSection records (one per required section type).
- Script 1 → many ChangelogEntry records.
- Script 1 → many NavigationItem records via section items.

## Derived Views
- Script completeness view: boolean per script indicating all required sections present.
- Accessibility audit view: list of routes/pages requiring semantic or keyboard verification.
