# MetaDen Skills Changelog

All notable changes to this project are documented in this file.

## [1.0.2] - 2026-03-30

### Fixed
- **UI Performance**: Clicking +/- on material quantities or recipe amounts no longer triggers a server roundtrip. All quantity adjustments are now handled client-side in JavaScript, making interactions instant instead of 10-15 seconds per click.
- **Hot-Reload Crash**: Replaced `require('server.utils')` with explicit load ordering in `fxmanifest.lua` and a global reference (`TailorUtils`). This fixes the "syntax error in server utils" that occurred on resource restart / hot-reload.
- **Image Caching**: Added `itemImageCache` so `getItemImage()` results are cached across menu rebuilds, matching the existing `getItemLabel()` pattern.
- **Empty Config Entries**: Added a nil-guard in `buildRecipeEntries` to skip empty `{}` placeholder entries in `TailorRecipes` (e.g. Accessories, Materials) that could produce broken UI cards.
- **Config Typo**: Fixed `payckecks:addToPaycheck` → `paychecks:addToPaycheck` in `DeliveryPayment.event.name`.
- **Unused Variable**: Removed dead `GetPlayer()` call in `server/utils.lua` `increaseExperience()`.

### Changed
- **Quantity Controls**: The +/- buttons and quantity input are now fully handled in the NUI JavaScript layer. Native browser number input spinners have been removed (input changed to `type="text"` with `inputMode="numeric"`).
- **Order Cart**: Material order quantities are tracked in the JS UI and sent to Lua as a complete cart on "Submit Order". The "Reset Cart" button resets quantities purely client-side.
- **Recipe Crafting**: The craft amount is read from the JS payload when "Craft" is clicked, rather than relying on Lua-side state that required a server callback to rebuild.
- **Server Scripts Load Order**: `fxmanifest.lua` now uses explicit file ordering (`server/utils.lua`, `server/tailoring.lua`, `server/laptop.lua`) instead of the `server/*.lua` glob to guarantee correct initialization order.
- **Experience Caching**: Sewing machine and materials station menus cache the player's experience data on first open, so subsequent quantity changes don't re-query the database.

## [1.0.1] - 2026-02-24

### Added
- Configurable job access gating via `Config.JobAccess.enabled` and `Config.JobAccess.job`.
- Server-side enforcement for tailoring actions to prevent direct event bypass.

### Changed
- Laptop job assignment now uses the configured job name and updates menu labels accordingly.
- Access denied messaging now reflects the configured job label.

## [1.0.0] - 2026-02-19

Initial public release of `metaden-tailor`.

### Added
- Core tailoring crafting system with categorized recipes:
	- `Tops`
	- `Bottoms`
	- `Accessories`
	- `Materials`
- Config-driven crafting requirements and rewards:
	- Required material lists per recipe
	- Per-recipe craft duration
	- Per-recipe level requirement
	- XP rewards embedded in reward outputs
- Progression support:
	- Global level thresholds via `Config.Levels`
	- Recipe gating by required tailor level
- Materials economy data:
	- Configurable material entries (`name`, `label`, `price`) via `Config.Materials`
- Delivery workflow configuration:
	- Pickup locations
	- Delivery locations
	- Delivery van model and spawn points
	- Delivery reward min/max controls
	- Delivery reputation cap settings
- Flexible delivery payment pipeline:
	- `event`, `bank`, or `item` payment method support
	- Configurable primary payout event with template args
	- Optional extra follow-up events
- Clothing equip metadata system for crafted items:
	- Supports both ped components and props
	- Supports male/female mappings per entry
	- Supports multi-entry outfit bundles per item
- Client clothing control surface:
	- Exports: `ToggleClothing`, `EquipClothing`, `UnequipClothing`
	- Command: `/tailor_toggle_cloth <item_name>`
- Ped inspection and snippet-generation commands:
	- `/tailor_dump` for current component/prop diagnostics
	- `/tailor_capture_cloth <item_name>` for config-ready clothing snippet generation
- Interaction mode support:
	- Custom proximity/NUI mode
	- Target wrapper mode through metabridge adapters

### Notes
- Designed to stay framework-agnostic through `metabridge`.
- Notification strategy includes layered fallback (metabridge notify -> `lib.notify` -> chat).