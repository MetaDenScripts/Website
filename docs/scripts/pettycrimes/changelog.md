# Petty Crimes Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-03-18

### Added
- **Parking meter gameplay loop** — players can pay meters with coins, inspect paid status, or steal the stored coins using a crowbar.
- **Coin-fed prop theft** — newspaper dispensers, payphones, parking meters, and train ticket props can all be targeted for configurable coin theft.
- **Shoplifting system** — clothes, hats, glasses, fruit stands, convenience-store shelves, and liquor-store zones all support stealable loot pools.
- **Mailbox crime loop** — players can break into post boxes, steal letters, and convert opened mail into random junk or cash rewards.
- **Traffic sign theft** — supported street signs can be removed with an angle grinder and rewarded as carryable items.
- **Vehicle vandalism interactions** — tires can be slashed, windows can be smashed, and brake lines can be cut through global vehicle target options.
- **Configurable skill checks** — parking meters, shoplifting, mailbox theft, traffic sign theft, and brake-line cutting each use dedicated skill-check presets.
- **NPC consequence reactions** — nearby peds can flee or become hostile after a crime, with optional random weapon escalation.
- **Persistent world-state tracking** — robbery cooldowns, breakage, paid parking, and stored coins are tracked in SQL per deterministic location key.
- **Parking receipt metadata** — paid meters produce receipts carrying vehicle plate and payment timestamp metadata.
- **Crime XP support** — successful crimes can award `crime` XP through `metaden-skills` when that resource is installed.
- **Bridge-based integration** — notifications, inventory actions, progress bars, metadata labels, player bootstrap, and target registration are routed through `metabridge`.
- **Config validation on startup** — the resource validates key chance values, duration values, and loot pools before the state layer is used.

### Notes
- **Manual SQL import required** — the resource ships [pettycrimes.sql](pettycrimes.sql) and expects the `petty_crimes` table to exist.
- **Inventory merge required** — custom item definitions and images from the `inventory` folder must be merged into your `ox_inventory` setup.
- **Some reward/tool items are external** — items such as `letter`, `crowbar`, `anglegrinder`, `WEAPON_STOPSIGN`, and several traffic-sign rewards must already exist in your server inventory configuration.
- **Crime XP is optional** — if `metaden-skills` is not started, petty crimes still work normally but no XP is awarded.
