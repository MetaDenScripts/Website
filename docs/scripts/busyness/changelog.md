# Busyness Changelog

All notable changes to this project will be documented in this file.


## [1.1.0] - 2026-03-23

### Added

- Crafting station system with in-world placeable stations, recipe management, ingredient requirements, and crafting animations.
- Admin crafting controls for creating, updating, deleting, and renaming crafting stations and recipes.
- Persistent `md_busyness_crafting_stations` and `md_busyness_crafting_recipes` tables for station and recipe state.
- lb-phone custom app integration for managing businesses directly from the phone.
- Phone-optimised mobile layout with bottom navigation, compact card-based views, and responsive grids for all management pages.
- Loading, error, and not-employed states for the phone app.
- Server-side proximity check for stock deposits — players must be within 5 units of the store to restock.
- `Config.LbPhoneApp.Enabled` toggle to enable or disable lb-phone app registration.

### Changed

- Management data refresh now returns structured responses with explicit success/error states instead of raw payloads.

### Fixed

- Removed stale UI state leak from `management:refresh` callback that could block the in-world panel after using the phone app.

---

## [1.0.0] - 2026-03-12

### Added

- Initial documented release for `metaden-busyness`.
- Server-owned business state with persistent balances, revenue tracking, payout totals, grade thresholds, and stock data.
- UI for employees/managers and an ACE-gated admin oversight panel.
- NPC customer service flow backed by server-generated orders and business-owned stock.
- Public storefront ped placement and public player purchase flow.
- Persistent billing registers with multi-register support per business.
- Employee register billing flow for creating and dismissing bills against nearby customers.
- Customer register payment flow with cash/card settlement and bill dismissal support.
- Admin register placement, move, clear, and add-register controls in the oversight panel.
- Delivery order board with accept, dismiss, complete, waypoint, and audit-log support.
- Delivery fee and distance-bonus support for long-route payouts.
- Employee cash ledger tracking through `md_busyness_employee_cash`.
- Persistent `md_busyness_registers` and `md_busyness_bills` tables for in-world billing state.
- Shared payout APIs for custom integrations through `GetPayoutSplit`, `ApplyPayoutSplit`, and the server-side `metaden-busyness:server:applyPayoutSplit` event.
