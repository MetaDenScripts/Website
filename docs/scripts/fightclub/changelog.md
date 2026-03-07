# FightClub Changelog

All notable changes to this project will be documented in this file.

## [1.1.1] - 2026-03-05

### Added
- **Train-a-Fighter table auto-creation** — the `fighters` table is now created automatically on resource start in `server/train_fighter.lua` using `CREATE TABLE IF NOT EXISTS`.
- **Centralized Discord logger module** — webhook payload building is now handled in `server/logger.lua` with shared helper methods for all Fight Club and Train-a-Fighter logs.
- **Prize scaling configuration block** — `Config.PrizeScaling` added to `config.lua` (`basePercent`, `roundBonus`, `levelBonus`) so reward math can be tuned without touching server logic.

### Changed
- **Webhook call sites refactored** — direct `PerformHttpRequest` usage in fight and training handlers now routes through `Log.*` helpers.
- **README/API reference refresh** — command and API documentation aligned with the current implementation, including admin panel callbacks/events and training API coverage.

---

## [1.1.0] - 2026-03-02

### Added
- **Player HP bar** in the fight HUD — a green (`#4fff91`) bar showing the local player's current health percentage, updated every 100 ms alongside the opponent bar.
- **Opponent HP bar** in the fight HUD — a pink (`#ff4fd8`) bar tracking the NPC opponent's HP in real time during the fight session.
- **`preparingFight` flag** — all player attack inputs are fully blocked while the NPC opponent is walking to the fight position, preventing pre-fight damage to the opponent.
- **`Config.Stamina` table** — all previously hardcoded stamina constants extracted to `config.lua` for live tuning without code changes:
  - `drainPerAttack`, `blockRegenPerFrame`
  - `baseRegenPerTick`, `capRegenPerTick`, `logScale`
  - `regenTickMs`, `regenDelayMs`, `regenIdleGateMs`, `regenStartThreshold`
- **`Config.Currency`** — replaces six hardcoded `"black_money"` references in `server.lua`. Can be set to any ox_inventory item name.
- **`Config.SoapItem`**, **`Config.SoapUnblockCost`**, **`Config.SoapReward`**, **`Config.ToothItem`** — all item strings and reward conditions extracted from code into `config.lua`.

### Changed
- **HUD panel redesigned** — replaced the plain single green bar with a dark glassmorphism panel (`#0b0f1a`, 88% opacity) containing labelled rows for Stamina, My HP, and Opponent. Font is Inter; colours follow the MetaDen brand palette (cyan `#00d4ff`, green `#4fff91`, pink `#ff4fd8`). Percentage values display beside each label with tabular numeral alignment.
- **NPC opponent no longer teleports** — `SetEntityCoordsNoOffset` replaced with `TaskGoStraightToCoord` + an arrival wait loop (15 s deadline). The NPC remains **invincible** during the walk; `SetEntityInvincible(false)` is called only after `SetEntityHealth` is applied at the destination, making any pre-walk damage irrelevant.
- **Weapon detection overhauled** — removed unreliable `args[4]` weapon-hash index reading from `gameEventTriggered`. Now uses `HasEntityBeenDamagedByWeapon(currentOponent, WEAPON_UNARMED, 0)` per-hit, followed by `ClearEntityLastWeaponDamage`, for reliable fist-only enforcement.
- **Stamina spam exploit fixed** — regen now requires `regenIdleGateMs` of continuous idle. `lastAttackTime` is stamped on every attack frame; the regen loop breaks immediately if the player attacked recently, regardless of how quickly they release and re-press inputs.
- **`fightStarted` guard** added to the `startFight` while loop — prevents a double `fightEnd` call when both the opponent poll loop and `gameEventTriggered` would otherwise fire simultaneously.

### Fixed
- `server.lua:306 attempt to index a nil value (local 'fight')` crash when `fightEnd` fires for a player with no registered fight (e.g. after a disconnect or late event delivery). Now guarded with `if not fight then return end`.
- Lifetime earnings always recorded as `0` in the database — `local prize = entryFee` inside the win branch was shadowing the outer `local prize = 0`, so `UpdateFighterRecord` always received `0`. The `local` keyword removed from the inner assignment.
- Player could freely attack the NPC opponent while it was walking into position, starting the real fight with the opponent already at reduced HP.
- Every normal fist punch falsely triggered "bad hit detected" — `gameEventTriggered` was reading `args[4]` (the `isFatal` flag, 0 or 1) instead of the weapon hash, so all valid hits appeared to use a non-unarmed weapon.
- Stamina could be maintained near 100% by rapidly tapping attack and block inputs — the single-frame gap between presses caused `IsControlJustPressed` to be false, which the old code treated as "idle" and triggered regen immediately.

---

## [1.0.0] - 2026-01-15

### Added
- **16 fight arena locations** spread across the map, each independently configured with entry fee, minimum level, NPC models, spectator pools, and world positions.
- **10-level XP progression** — players earn 1 XP per round fought; level thresholds configurable via `Config.Levels`. Level affects damage modifier and soap reward eligibility.
- **Spectator crowd system** — a pool of ambient peds spawns in a circle around the arena center. One ped is randomly selected and promoted to the fight position as the opponent; the rest remain as spectators.
- **Multi-round fight sessions** — trainers can initiate N-round fights; a fresh opponent is promoted from the remaining spectators for each round.
- **Stamina HUD** — bottom-centered NUI bar tracking stamina during fights. Drains on attack input, regenerates slowly on idle, recovers slightly while blocking.
- **Cheat detection** — melee weapon use (non-fist) during a fight ends the session immediately and increments the run-away counter. Multi-round fights allow one run per session; exceeding the limit triggers a permanent ban.
- **Melee damage modifier** — scales with fight level (`+0.1` every 5 levels) and QBX gym strength stat (bonus above 60 strength points). Capped at `1.8×`. Applied via `SetPlayerMeleeWeaponDamageModifier` on player load.
- **Scaled prize formula** — winners receive their entry fee back plus a percentage bonus: base 10%, +5% per round, +5% per arena level above 1.
- **Per-arena cooldown** (`Config.CooldownBetweenFights`) — prevents rapid re-entry to the same arena after a fight concludes.
- **`AllowAll` flag** per arena — bypasses the minimum level requirement; used for starter areas and the prison location.
- **First aid station** — ox_target interaction zone at `Config.FirstAidStationCoords`. Gives a random quantity of `Config.FirstAidItem` once per session per player.
- **Pink soap economy** — soap drops as a random reward after any fight (configurable minimum level and percentage chance). Used as shop currency and as half of the ban-unblock payment.
- **Human tooth rare drop** — 5% chance to receive `Config.ToothItem` upon winning a round.
- **Item shop** — context-menu shop accessible via the seller NPC (`ig_omega` ped). Items purchased with pink soaps, defined in `Config.Shop`.
- **Self-unblock system** — banned players can surrender `Config.SoapUnblockCost` soaps plus their total career earnings in cash to wipe their record and regain access.
- **`/createfight` command** — spend 1 pink soap to spawn a custom opponent (`skill` 1–10 sets HP tier, optional ped `model` override) against any target player ID. Blocked if the target is a LEO-job player.
- **Admin commands**: `/banfromfightclub`, `/unbanfromfightclub` (with optional `reset` flag), `/resetfightrecord`, `/checkfighterrecord` — all restricted to `group.admin`.
- **lb-phone SMS** — automatic text messages sent to the player on ban and on unban.
- **Discord webhook logging** — embed messages for: runaway bans, soap rewards, shop purchases, ban/unban events, and record resets. Webhook URL configured in `server/server_config.lua`.
- **Persistent MySQL records** — `metaden_fight_club` table auto-created on resource start. Stores level, XP, wins, losses, total earnings, and blocked status per `citizenid`. `blocked` column added via `ALTER TABLE … ADD COLUMN IF NOT EXISTS` for safe upgrades.
- **`playerDropped` cleanup** — ongoing fight state cleared when a fighter disconnects mid-fight, freeing the arena for the next challenger.
- **Server exports**: `IsBlockedFromFightClub(src)` and `GetPlayerFighting(src)` available for inter-resource use.
- **Server callbacks** registered via `ox_lib`: `GetPlayerFighting`, `GetPlayerDamageModifier`, `GetSellerPosition`.
