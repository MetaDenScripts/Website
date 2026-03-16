# Busyness Changelog

All notable changes to this project will be documented in this file.

# Changelog

All notable changes to `metaden-busyness` will be documented in this file.

The format follows Keep a Changelog and this project starts its documented release history at `1.0.0`.

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
