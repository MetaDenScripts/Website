# Health Conditions Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2026-04-21

### Added
- Collapsible body diagram and conditions panels — each section can be toggled independently, with the other expanding to fill the freed space
- When the conditions panel is hidden the outer UI panel shrinks to fit only the body diagram, with a smooth animated width transition
- Compact header layout activates when only the body diagram is visible — title and eye icon remain on the first row, and action buttons are arranged in a horizontal row beneath them
- Re-open button appears in the body panel header when the conditions panel is collapsed, giving a visible tap target to restore it alongside clicking a body region
- `Config.UI` block for controlling the panel's on-screen presentation:
  - `Position` — place the panel at `'center'`, `'left'`, or `'right'` of the screen
  - `Width` — base panel width in pixels (minimum 400)
  - `MaxHeight` — maximum panel height as a percentage of viewport height (clamped 60–95)
  - `Scale` — uniform scale multiplier for the entire panel (clamped 0.5–2.0)
- Mutual collapse guard on both panels — either panel can always expand, but neither can collapse while the other is already collapsed, preventing a state where both panels are hidden simultaneously

--- 

## [1.0.0] - 2026-03-24

### Added
- Third-eye player inspection via ox_target — examine other players to see their physical conditions
- Custom NUI panel with player mugshot (via MugShotBase64) and condition card list
- Interactive anatomical body diagram for visual body-location review
- 25 predefined condition types (black eye, swollen lip, broken nose, stitches, cast, etc.)
- Custom condition descriptions for scene-specific injuries and ailments
- 15 body locations for precise condition placement
- 3 severity levels (minor, moderate, severe) with color-coded badges
- Self-inspection command (`/healthconditions`) to view and manage your own conditions
- Players can add up to 10 self-reported conditions with configurable max expiry
- EMS and police can set, edit, and remove conditions on any player
- Database-backed conditions with automatic expiry timestamps
- Automatic expiry cleanup when the resource starts and when conditions are fetched
- Automatic damage detection with weapon/category mapping, body-location mapping, severity calculation, and cooldown protection
- Target player notification when a condition is added by EMS/police
- Configurable authorized jobs and minimum grade requirements
- Single-request examine flow that returns the full UI payload server-side
- Copy-to-clipboard support for sharing condition summaries into MDTs or incident notes
- Trusted server integration hooks for adding and deleting conditions from other resources
- Dark-themed UI matching the metaden design system

