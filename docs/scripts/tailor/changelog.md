# MetaDen Skills Changelog

All notable changes to this project are documented in this file.

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