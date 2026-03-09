# FightClub API Reference

## Configuration Reference

All options live in `config.lua` under the global `Config` table. Sensitive server-only values belong in `server/server_config.lua`.

### General

| Key | Type | Default | Description |
|---|---|---|---|
| `Debug` | boolean | `false` | Enables extra client-side debug output. |
| `CooldownBetweenFights` | number | `300000` | Per-arena cooldown in ms after a fight ends (default 5 min). |

### Level Thresholds (`Config.Levels`)

Maps level number → total XP required to reach it. Level 1 is the starting level (0 XP).

```lua
Config.Levels = {
    [1] = 0, [2] = 20, [3] = 50, [4] = 100,
    [5] = 180, [6] = 300, [7] = 500, [8] = 800,
    [9] = 1200, [10] = 2000
}
```

Players earn 1 XP per round fought regardless of outcome.

### Fight Locations (`Config.FightLocations`)

Each entry defines one arena. Fields:

| Field | Type | Description |
|---|---|---|
| `Level` | number | Minimum fighter level required to enter (ignored when `AllowAll = true`). |
| `EntryFee` | number | Amount of `Config.Currency` required to enter. |
| `AllowAll` | boolean | If `true`, bypasses the level requirement. |
| `CenterPos` | vec4 | Center of the arena; spectator crowd spawns at this radius. |
| `Trainer.model` | string | Ped model hash string for the fight trainer/guard NPC. |
| `Trainer.location` | vec4 | World position + heading for the trainer. |
| `PlayerFightingPos` | vec4 | Where the player is teleported when the fight starts. |
| `NPCFighter.model` | string | Ped model used for the promoted opponent. |
| `NPCFighter.position` | vec4 | Fight spot the NPC walks to. |
| `NPCFighter.minHealth` | number | Minimum health rolled for the opponent. |
| `NPCFighter.maxHealth` | number | Maximum health rolled for the opponent. |
| `Spectators.amount` | number | How many spectator peds to spawn. |
| `Spectators.models` | table | Pool of ped models chosen at random for spectators. |

### Item Shop (`Config.Shop`)

Items purchasable via the seller NPC using `Config.SoapItem` as currency.

```lua
Config.Shop = {
    ['bandage']  = { item = "Bandage",       price = 1, amount = 10 },
    ['firstaid'] = { item = "First Aid Kit", price = 1, amount = 3  },
}
```

`price` is the number of soaps required; `amount` is how many of the item are given.

### First Aid Station

| Key | Type | Description |
|---|---|---|
| `FirstAidStationCoords` | vec3 | World position of the ox_target first-aid pickup zone. |
| `FirstAidItem` | string | Item name given to the player. |
| `FirstAidStation.min` | number | Minimum quantity given per pickup. |
| `FirstAidStation.max` | number | Maximum quantity given per pickup. |

### Economy

| Key | Default | Description |
|---|---|---|
| `Config.Currency` | `"money"` | ox_inventory item used for entry fees, prize payouts, and ban repayments. |
| `Config.SoapItem` | `"pinksoap"` | Item used as shop currency and ban-unblock payment. |
| `Config.SoapUnblockCost` | `100` | Number of soaps required for self-unblock. |
| `Config.SoapReward.minLevel` | `5` | Minimum fighter level to be eligible for a soap drop. |
| `Config.SoapReward.chance` | `10` | Percent chance (1–100) of receiving a soap after any fight. |
| `Config.ToothItem` | `"body_humantooth"` | Item given on the rare 5% tooth drop after winning a fight. |

### Stamina (`Config.Stamina`)

All stamina values are client-side only and take effect immediately on resource restart — no server restart needed.

| Key | Default | Description |
|---|---|---|
| `drainPerAttack` | `10` | Stamina lost per attack input frame. |
| `blockRegenPerFrame` | `0.1` | Stamina gained per frame while holding block (no attack). |
| `baseRegenPerTick` | `0.03` | Minimum auto-regen per tick (players with low stamina stat). |
| `capRegenPerTick` | `0.2` | Maximum auto-regen per tick (players with high stamina stat). |
| `logScale` | `900.0` | Log-curve width for stamina stat → regen scaling. Higher = slower ramp. |
| `regenTickMs` | `50` | Regen loop interval in milliseconds. |
| `regenDelayMs` | `3000` | Delay in ms before regen begins once conditions are met. |
| `regenIdleGateMs` | `2000` | Required idle time (no attack inputs) before regen is allowed. |
| `regenStartThreshold` | `40` | Regen only activates when stamina drops below this percentage. |

### KO Recovery Customization

The KO recovery flow is intentionally exposed in `client_open.lua`. This file is non-escrowed and loaded before the main client logic.

Use `HandleFightClubKO(context)` to run your own recovery minigame and post-success heal/revive flow. When the player succeeds, call `CompleteFightClubKORecovery(context)`.

The `context` table includes:

| Field | Type | Description |
|---|---|---|
| `playerPed` | number | Client ped handle for the knocked-out player. |
| `fightingLevel` | number | Current fight-club level for the player. |
| `strength` | number | Current strength value used for KO scaling. |
| `baseDifficulty` | number | Raw difficulty before bonuses are applied. |
| `adjustedDifficulty` | number | Recommended difficulty value to pass into your minigame. |
| `iterations` | number | Suggested number of taps/checks/rounds for the recovery minigame. |

Opinionated defaults for `adjustedDifficulty`:

- `80+` = very hard, best reserved for weak or brand-new fighters
- `60-79` = solid default range for most servers
- `40-59` = forgiving and good for casual progression
- `<40` = very easy, recovery should usually succeed

Suggested use of `iterations`:

- `1` for brutal KOs or low-level fighters
- `2` for a normal recovery minigame
- `3` only if you want recovery to be intentionally demanding

Minimal example:

```lua
function HandleFightClubKO(context)
    local success = exports['your_minigame']:Start(context.iterations, context.adjustedDifficulty)

    if success then
        TriggerEvent('your_medical_resource:client:healOrRevive')
        CompleteFightClubKORecovery(context)
    end
end
```

---

## Server Exports

### `IsBlockedFromFightClub(src)`

Returns whether a player is currently banned from the fight club.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `src` | number | Server player ID. |

**Returns** — `boolean`

```lua
local banned = exports['metaden-fightclub']:IsBlockedFromFightClub(source)
```

---

### `GetPlayerFighting(src)`

Returns the full fighter record for a player.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `src` | number | Server player ID. |

**Returns**

```lua
{
    level                 = number,  -- current fight level (1–10)
    experience            = number,  -- total XP earned
    wins                  = number,
    losses                = number,
    earnings              = number,  -- total cash won across all fights
    experienceToNextLevel = number,  -- XP threshold for next level (0 if max level)
    blocked               = boolean,
}
```

```lua
local record = exports['metaden-fightclub']:GetPlayerFighting(source)
```

---

## Client Exports

### `isPlayerFighter(entity)`

Returns whether the given entity handle is the calling player's spawned companion fighter.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `entity` | number | Client entity handle (ped). |

**Returns** — `boolean`

```lua
local isFighter = exports['metaden-fightclub']:isPlayerFighter(entity)
if isFighter then
    -- block interaction, e.g. prevent selling drugs to the fighter
    return
end
```

---

## Server Callbacks

Registered via `ox_lib` and invoked client-side with `lib.callback.await`.

---

### `metaden-fight-club:server:GetPlayerFighting`

Returns the caller's own fighter record. Same shape as the `GetPlayerFighting` export.

---

### `metaden-fight-club:server:GetPlayerDamageModifier`

Returns a melee damage multiplier for the calling player.

**Calculation**
- Base: `1.0`
- +`floor(level / 5) * 0.1` per 5 fight levels
- If gym strength > 60: +`(strength / 1000) * 0.1`
- Capped at `1.8`
- Blocked players receive no bonus (returns `1.0`).

**Returns** — `number`

---

### `metaden-fight-club:server:GetSellerPosition`

Returns the world position of the soap shop seller NPC.

**Returns** — `vec4`

---

### `metaden-fight-club:server:GetPlayerSkills`

Returns the calling player's configured skill XP values when `Config.SkillsIntegration` is enabled and the target skills are configured.

**Returns** — `table|nil`

---

### `metaden-fight-club:server:GetLeaderboard`

Returns two top-10 leaderboards built from `metaden_fight_club`:
- `byWins` (wins desc, then level)
- `byLevel` (level desc, then experience)

**Returns** — `{ byWins = table, byLevel = table }`

---

### `metaden-fight-club:server:GetAdminFighters`

Returns the full fighter list for the admin panel, including earnings, soaps, teeth, blocked state, and resolved names.

**Returns** — `table`

---

### `metaden-fight-club:server:GetBannedPlayers`

Returns currently blocked fighters for the admin panel.

**Returns** — `table`

---

## Server Events

### `metaden-fight-club:Server:startFight` _(client → server)_

Initiates a fight session. Performs all validation (cooldown, ban check, payment) before confirming.

| Parameter | Type | Description |
|---|---|---|
| `index` | number | `Config.FightLocations` key. |
| `rounds` | number | Number of rounds to fight. |

---

### `metaden-fight-club:server:fightEnd` _(client → server)_

Fired by the client when a fight session concludes. Handles prize payout, XP update, and ban logic.

| Parameter | Type | Description |
|---|---|---|
| `win` | boolean\|nil | `true` = won, `false` = lost, `nil` = opponent failed to appear (refund). |
| `timesRanAway` | number | Number of times the player left their opponent during the session. |

---

### `metaden-fight-club:server:getFirstAid` _(client → server)_

Gives the calling player a random quantity of `Config.FirstAidItem`. Limited to one pickup per session.

---

### `metaden-fight-club:server:giveTooth` _(client → server)_

Gives the calling player one `Config.ToothItem`. Triggered automatically client-side on the 5% rare win drop.

---

### `metaden-fight-club:server:unblockPlayer` _(client → server)_

Self-unblock flow. Requires `Config.SoapUnblockCost` soaps and the player's total career earnings in cash. On success, fully resets the fight record.

---

### `metaden-fight-club:server:BuyFromFightClub` _(client → server)_

Purchases a shop item using pink soaps.

| Parameter | Type | Description |
|---|---|---|
| `item` | string | Key in `Config.Shop`. |

---

### `metaden-fight-club:server:AdminBanById` _(client → server)_

Admin panel action to ban a fighter record by source ID or citizen ID string.

| Parameter | Type | Description |
|---|---|---|
| `target` | number\|string | Source ID or citizen ID. |

---

### `metaden-fight-club:server:AdminUnbanById` _(client → server)_

Admin panel action to unban a fighter record by source ID or citizen ID string.

| Parameter | Type | Description |
|---|---|---|
| `target` | number\|string | Source ID or citizen ID. |

---

### `metaden-fight-club:server:AdminResetById` _(client → server)_

Admin panel action to reset a fighter record (unblock, level/XP/wins/losses/earnings/soap/tooth reset).

| Parameter | Type | Description |
|---|---|---|
| `target` | number\|string | Source ID or citizen ID. |

---

## Admin Commands

| Command | Permission | Parameters | Description |
|---|---|---|---|
| `/createfight` | Requires 1 pink soap | `<target> [skill] [model]` | Spawns a custom fight opponent against the target player. `skill` 1–10 sets HP tier; `model` overrides the ped model. Costs 1 soap from the caller. Cannot target LEO-job players. |
| `/fightclub` | Player | — | Opens the player fight club panel. |
| `/fightclubadmin` | `group.admin` | — | Opens the fight club admin panel UI. |

---

## NUI Message Reference

Messages sent from client Lua to the fight HUD via `SendNUIMessage`.

| `type` | Payload | Description |
|---|---|---|
| `barStatus` | `{ display: boolean }` | Shows (`true`) or hides (`false`) the entire HUD panel. |
| `barLevel` | `{ level: number }` | Updates the stamina bar (0–100). |
| `playerHP` | `{ level: number }` | Updates the player HP bar (0–100). |
| `enemyHP` | `{ level: number }` | Updates the opponent HP bar (0–100). |

---

## Database Schema

```sql
CREATE TABLE `metaden_fight_club` (
    `id`         VARCHAR(50)  NOT NULL,   -- citizenid
    `level`      INT          NOT NULL DEFAULT 1,
    `experience` INT          NOT NULL DEFAULT 0,
    `wins`       INT          NOT NULL DEFAULT 0,
    `losses`     INT          NOT NULL DEFAULT 0,
    `earnings`   INT          NOT NULL DEFAULT 0,
    `blocked`    BOOLEAN      NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Configuration Reference

All options live in `config.lua` under the global `Config` table. Sensitive server-only values belong in `server/server_config.lua`.

### General

| Key | Type | Default | Description |
|---|---|---|---|
| `Debug` | boolean | `false` | Enables extra client-side debug output. |
| `CooldownBetweenFights` | number | `300000` | Per-arena cooldown in ms after a fight ends (default 5 min). |

### Level Thresholds (`Config.Levels`)

Maps level number → total XP required to reach it. Level 1 is the starting level (0 XP).

```lua
Config.Levels = {
    [1] = 0, [2] = 20, [3] = 50, [4] = 100,
    [5] = 180, [6] = 300, [7] = 500, [8] = 800,
    [9] = 1200, [10] = 2000
}
```

Players earn 1 XP per round fought regardless of outcome.

### Fight Locations (`Config.FightLocations`)

Each entry defines one arena. Fields:

| Field | Type | Description |
|---|---|---|
| `Level` | number | Minimum fighter level required to enter (ignored when `AllowAll = true`). |
| `EntryFee` | number | Amount of `Config.Currency` required to enter. |
| `AllowAll` | boolean | If `true`, bypasses the level requirement. |
| `CenterPos` | vec4 | Center of the arena; spectator crowd spawns at this radius. |
| `Trainer.model` | string | Ped model hash string for the fight trainer/guard NPC. |
| `Trainer.location` | vec4 | World position + heading for the trainer. |
| `PlayerFightingPos` | vec4 | Where the player is teleported when the fight starts. |
| `NPCFighter.model` | string | Ped model used for the promoted opponent. |
| `NPCFighter.position` | vec4 | Fight spot the NPC walks to. |
| `NPCFighter.minHealth` | number | Minimum health rolled for the opponent. |
| `NPCFighter.maxHealth` | number | Maximum health rolled for the opponent. |
| `Spectators.amount` | number | How many spectator peds to spawn. |
| `Spectators.models` | table | Pool of ped models chosen at random for spectators. |

### Item Shop (`Config.Shop`)

Items purchasable via the seller NPC using `Config.SoapItem` as currency.

```lua
Config.Shop = {
    ['bandage']  = { item = "Bandage",       price = 1, amount = 10 },
    ['firstaid'] = { item = "First Aid Kit", price = 1, amount = 3  },
}
```

`price` is the number of soaps required; `amount` is how many of the item are given.

### First Aid Station

| Key | Type | Description |
|---|---|---|
| `FirstAidStationCoords` | vec3 | World position of the ox_target first-aid pickup zone. |
| `FirstAidItem` | string | Item name given to the player. |
| `FirstAidStation.min` | number | Minimum quantity given per pickup. |
| `FirstAidStation.max` | number | Maximum quantity given per pickup. |

### Economy

| Key | Default | Description |
|---|---|---|
| `Config.Currency` | `"money"` | ox_inventory item used for entry fees, prize payouts, and ban repayments. |
| `Config.SoapItem` | `"pinksoap"` | Item used as shop currency and ban-unblock payment. |
| `Config.SoapUnblockCost` | `100` | Number of soaps required for self-unblock. |
| `Config.SoapReward.minLevel` | `5` | Minimum fighter level to be eligible for a soap drop. |
| `Config.SoapReward.chance` | `10` | Percent chance (1–100) of receiving a soap after any fight. |
| `Config.ToothItem` | `"body_humantooth"` | Item given on the rare 5% tooth drop after winning a fight. |

### Stamina (`Config.Stamina`)

All stamina values are client-side only and take effect immediately on resource restart — no server restart needed.

| Key | Default | Description |
|---|---|---|
| `drainPerAttack` | `10` | Stamina lost per attack input frame. |
| `blockRegenPerFrame` | `0.1` | Stamina gained per frame while holding block (no attack). |
| `baseRegenPerTick` | `0.03` | Minimum auto-regen per tick (players with low stamina stat). |
| `capRegenPerTick` | `0.2` | Maximum auto-regen per tick (players with high stamina stat). |
| `logScale` | `900.0` | Log-curve width for stamina stat → regen scaling. Higher = slower ramp. |
| `regenTickMs` | `50` | Regen loop interval in milliseconds. |
| `regenDelayMs` | `3000` | Delay in ms before regen begins once conditions are met. |
| `regenIdleGateMs` | `2000` | Required idle time (no attack inputs) before regen is allowed. |
| `regenStartThreshold` | `40` | Regen only activates when stamina drops below this percentage. |

### KO Recovery Customization

The KO recovery flow is intentionally exposed in `client_open.lua`. This file is non-escrowed and loaded before the main client logic.

Use `HandleFightClubKO(context)` to run your own recovery minigame and post-success heal/revive flow. When the player succeeds, call `CompleteFightClubKORecovery(context)`.

The `context` table includes:

| Field | Type | Description |
|---|---|---|
| `playerPed` | number | Client ped handle for the knocked-out player. |
| `fightingLevel` | number | Current fight-club level for the player. |
| `strength` | number | Current strength value used for KO scaling. |
| `baseDifficulty` | number | Raw difficulty before bonuses are applied. |
| `adjustedDifficulty` | number | Recommended difficulty value to pass into your minigame. |
| `iterations` | number | Suggested number of taps/checks/rounds for the recovery minigame. |

Opinionated defaults for `adjustedDifficulty`:

- `80+` = very hard, best reserved for weak or brand-new fighters
- `60-79` = solid default range for most servers
- `40-59` = forgiving and good for casual progression
- `<40` = very easy, recovery should usually succeed

Suggested use of `iterations`:

- `1` for brutal KOs or low-level fighters
- `2` for a normal recovery minigame
- `3` only if you want recovery to be intentionally demanding

Minimal example:

```lua
function HandleFightClubKO(context)
    local success = exports['your_minigame']:Start(context.iterations, context.adjustedDifficulty)

    if success then
        TriggerEvent('your_medical_resource:client:healOrRevive')
        CompleteFightClubKORecovery(context)
    end
end
```

---

## Server Exports

### `IsBlockedFromFightClub(src)`

Returns whether a player is currently banned from the fight club.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `src` | number | Server player ID. |

**Returns** — `boolean`

```lua
local banned = exports['metaden-fightclub']:IsBlockedFromFightClub(source)
```

---

### `GetPlayerFighting(src)`

Returns the full fighter record for a player.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `src` | number | Server player ID. |

**Returns**

```lua
{
    level                 = number,  -- current fight level (1–10)
    experience            = number,  -- total XP earned
    wins                  = number,
    losses                = number,
    earnings              = number,  -- total cash won across all fights
    experienceToNextLevel = number,  -- XP threshold for next level (0 if max level)
    blocked               = boolean,
}
```

```lua
local record = exports['metaden-fightclub']:GetPlayerFighting(source)
```

---

## Server Callbacks

Registered via `ox_lib` and invoked client-side with `lib.callback.await`.

---

### `metaden-fight-club:server:GetPlayerFighting`

Returns the caller's own fighter record. Same shape as the `GetPlayerFighting` export.

---

### `metaden-fight-club:server:GetPlayerDamageModifier`

Returns a melee damage multiplier for the calling player.

**Calculation**
- Base: `1.0`
- +`floor(level / 5) * 0.1` per 5 fight levels
- If gym strength > 60: +`(strength / 1000) * 0.1`
- Capped at `1.8`
- Blocked players receive no bonus (returns `1.0`).

**Returns** — `number`

---

### `metaden-fight-club:server:GetSellerPosition`

Returns the world position of the soap shop seller NPC.

**Returns** — `vec4`

---

### `metaden-fight-club:server:GetPlayerSkills`

Returns the calling player's configured skill XP values when `Config.SkillsIntegration` is enabled and the target skills are configured.

**Returns** — `table|nil`

---

### `metaden-fight-club:server:GetLeaderboard`

Returns two top-10 leaderboards built from `metaden_fight_club`:
- `byWins` (wins desc, then level)
- `byLevel` (level desc, then experience)

**Returns** — `{ byWins = table, byLevel = table }`

---

### `metaden-fight-club:server:GetAdminFighters`

Returns the full fighter list for the admin panel, including earnings, soaps, teeth, blocked state, and resolved names.

**Returns** — `table`

---

### `metaden-fight-club:server:GetBannedPlayers`

Returns currently blocked fighters for the admin panel.

**Returns** — `table`

---

## Server Events

### `metaden-fight-club:Server:startFight` _(client → server)_

Initiates a fight session. Performs all validation (cooldown, ban check, payment) before confirming.

| Parameter | Type | Description |
|---|---|---|
| `index` | number | `Config.FightLocations` key. |
| `rounds` | number | Number of rounds to fight. |

---

### `metaden-fight-club:server:fightEnd` _(client → server)_

Fired by the client when a fight session concludes. Handles prize payout, XP update, and ban logic.

| Parameter | Type | Description |
|---|---|---|
| `win` | boolean\|nil | `true` = won, `false` = lost, `nil` = opponent failed to appear (refund). |
| `timesRanAway` | number | Number of times the player left their opponent during the session. |

---

### `metaden-fight-club:server:getFirstAid` _(client → server)_

Gives the calling player a random quantity of `Config.FirstAidItem`. Limited to one pickup per session.

---

### `metaden-fight-club:server:giveTooth` _(client → server)_

Gives the calling player one `Config.ToothItem`. Triggered automatically client-side on the 5% rare win drop.

---

### `metaden-fight-club:server:unblockPlayer` _(client → server)_

Self-unblock flow. Requires `Config.SoapUnblockCost` soaps and the player's total career earnings in cash. On success, fully resets the fight record.

---

### `metaden-fight-club:server:BuyFromFightClub` _(client → server)_

Purchases a shop item using pink soaps.

| Parameter | Type | Description |
|---|---|---|
| `item` | string | Key in `Config.Shop`. |

---

### `metaden-fight-club:server:AdminBanById` _(client → server)_

Admin panel action to ban a fighter record by source ID or citizen ID string.

| Parameter | Type | Description |
|---|---|---|
| `target` | number\|string | Source ID or citizen ID. |

---

### `metaden-fight-club:server:AdminUnbanById` _(client → server)_

Admin panel action to unban a fighter record by source ID or citizen ID string.

| Parameter | Type | Description |
|---|---|---|
| `target` | number\|string | Source ID or citizen ID. |

---

### `metaden-fight-club:server:AdminResetById` _(client → server)_

Admin panel action to reset a fighter record (unblock, level/XP/wins/losses/earnings/soap/tooth reset).

| Parameter | Type | Description |
|---|---|---|
| `target` | number\|string | Source ID or citizen ID. |

---

## Admin Commands

| Command | Permission | Parameters | Description |
|---|---|---|---|
| `/createfight` | Requires 1 pink soap | `<target> [skill] [model]` | Spawns a custom fight opponent against the target player. `skill` 1–10 sets HP tier; `model` overrides the ped model. Costs 1 soap from the caller. Cannot target LEO-job players. |
| `/fightclub` | Player | — | Opens the player fight club panel. |
| `/fightclubadmin` | `group.admin` | — | Opens the fight club admin panel UI. |

---

## NUI Message Reference

Messages sent from client Lua to the fight HUD via `SendNUIMessage`.

| `type` | Payload | Description |
|---|---|---|
| `barStatus` | `{ display: boolean }` | Shows (`true`) or hides (`false`) the entire HUD panel. |
| `barLevel` | `{ level: number }` | Updates the stamina bar (0–100). |
| `playerHP` | `{ level: number }` | Updates the player HP bar (0–100). |
| `enemyHP` | `{ level: number }` | Updates the opponent HP bar (0–100). |

---

## Database Schema

```sql
CREATE TABLE `metaden_fight_club` (
    `id`         VARCHAR(50)  NOT NULL,   -- citizenid
    `level`      INT          NOT NULL DEFAULT 1,
    `experience` INT          NOT NULL DEFAULT 0,
    `wins`       INT          NOT NULL DEFAULT 0,
    `losses`     INT          NOT NULL DEFAULT 0,
    `earnings`   INT          NOT NULL DEFAULT 0,
    `blocked`    BOOLEAN      NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
