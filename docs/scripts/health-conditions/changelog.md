# Health Conditions Changelog

All notable changes to this project will be documented in this file.

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

