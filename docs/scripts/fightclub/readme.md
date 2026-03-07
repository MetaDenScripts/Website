# FightClub

> Step into the cage and prove yourself. **MetaDen FightClub** is a deep underground fighting resource for FiveM servers — featuring a progressive level system, multi-location arenas, hand-picked spectator crowds, a dynamic stamina HUD, cheat detection, prize scaling, a soap economy, full Discord logging, **and a full Train-a-Fighter companion system** where you recruit, train, feed, and fight with your own personal fighter NPC. No weapons. No running. Just fists.

---

## Features

- **16 fight locations across the map** — each zone is fully self-contained with configurable entry fees, NPC models, health ranges, spectator pools, and minimum level requirements.
- **10-level progression system** — players earn XP per round fought and level up automatically when thresholds are passed.
- **Spectator crowd promotion** — a pool of ambient peds spawns around the arena; one is picked at random and walks to the fight position to become the opponent. Remaining peds watch.
- **Multi-round sessions** — arenas support N-round fights. A new opponent is promoted for each round.
- **Dynamic stamina HUD** — NUI panel (bottom-center) shows stamina, player HP, and opponent HP bars in real time during fights. Bars are colour-coded: cyan stamina, green player HP, pink opponent HP.
- **Stamina system** — each attack drains stamina; blocking slowly regenerates it; idle time (configurable gate) triggers automatic regen, starting below a configurable threshold. All values are tunable via `Config.Stamina`.
- **Custom KO recovery hook** — KO/minigame behavior is handled in a non-escrowed client file so server owners can wire in their own minigame, revive, or heal events/exports.
- **Cheat detection** — melee weapon use ends the fight immediately and counts as a runaway. Excessive running away results in a permanent ban.
- **Damage modifier scaling** — base melee damage multiplier grows every 5 fight levels (capped at 1.8×). Player gym strength (`metadata.strength`) adds a further fractional bonus above 60 points.
- **Scaled prize formula** — winners receive their entry fee back plus a percentage bonus based on number of rounds and the arena level (base 10%, +5% per round, +5% per level above 1).
- **Per-arena cooldown** — configurable cooldown prevents the same arena being entered again too quickly after a fight ends.
- **`AllowAll` flag** — individual arenas can bypass the level requirement, e.g. for prison or starter locations.
- **First aid station** — players can collect a first-aid kit at the configured coords (one pickup per session).
- **Pink soap economy** — soaps drop as a rare random reward (configurable level threshold and chance). Soaps are used as shop currency and as part of the ban-unblock payment.
- **Human tooth rare drop** — 5% chance to receive a human tooth item upon winning a fight.
- **Item shop** — configured shop items purchasable with pink soaps via the seller NPC or context menu.
- **Self-unblock system** — banned players can pay `Config.SoapUnblockCost` soaps plus their full career earnings in cash to wipe their record and regain access.
- **Street fight (`/createfight`)** — spend one pink soap to spawn a skilled opponent (level 1–10) against any target player ID, anywhere.
- **Admin panel tooling** — `/fightclubadmin` opens the admin UI, with server-side admin actions for ban, unban, and record reset.
- **Discord webhook logging** — embed logs for: runaway bans, soap rewards, shop purchases, ban/unban actions, and record resets.
- **Persistent MySQL records** — wins, losses, level, XP, total earnings, and blocked status stored per `citizenid`.
- **Server exports** — `IsBlockedFromFightClub` and `GetPlayerFighting` for inter-resource use.

---

## Requirements

### Dependencies

| Resource | Role |
|---|---|
| [`metabridge`](https://github.com/metadenscripts/metabridge) | Bridge layer for framework, inventory, target, callbacks, UI helpers, and player access |
| [`ox_lib`](https://github.com/overextended/ox_lib) | Required by both this resource and `metabridge` |
| [`oxmysql`](https://github.com/overextended/oxmysql) | Async MySQL queries |

---

## Installation

### 1. Database

The table is created automatically on first resource start:

```sql
CREATE TABLE IF NOT EXISTS `metaden_fight_club` (
    `id`         VARCHAR(50)  NOT NULL,
    `level`      INT          NOT NULL DEFAULT 1,
    `experience` INT          NOT NULL DEFAULT 0,
    `wins`       INT          NOT NULL DEFAULT 0,
    `losses`     INT          NOT NULL DEFAULT 0,
    `earnings`   INT          NOT NULL DEFAULT 0,
    `blocked`    BOOLEAN      NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 2. Load Order (`server.cfg`)

```
ensure oxmysql
ensure ox_lib
ensure metabridge
ensure metaden-fightclub
```

If your `metabridge` setup depends on framework, inventory, or target resources such as `qbx_core`, `ox_inventory`, or `ox_target`, load those before `metabridge`.

### 3. Discord Webhook

Set your webhook URL in `server/server_config.lua`:

```lua
Config.DiscordWebhook = "https://discord.com/api/webhooks/..."
```

### 4. ACE Permissions

The admin panel command (`/fightclubadmin`) and admin panel actions (ban/unban/reset) require `metaden.fightclub.admin`:

```
add_principal identifier.<your-identifier> group.admin
add_ace group.admin metaden.fightclub.admin allow
```


# Train-a-Fighter

> Recruit, train, feed, and fight with your own personal fighter companion. The **Train-a-Fighter** module lives alongside Fight Club in the same resource — separate progression, separate locations, separate DB table.

---

## Train-a-Fighter Features

- **Fighter recruitment** — pay cash (+ 1 pink soap) to recruit a personal fighter NPC at the Pillbox gym.
- **15-level progression** — fighters earn XP through training, sparring, and matches (0–38,000 XP scale).
- **Training system** — cardio and strength exercises with animation-based sessions that build specific stats.
- **Feeding & hydration** — feed your fighter from 27 food items and 7 drink items to keep hunger/thirst topped up. Diet quality affects physique.
- **Physique system** — fighters evolve between skinny, fat, muscular, and balanced body types based on fat/muscle/strength ratios.
- **NPC fights** — pit your fighter against randomly generated opponents at the Pillbox arena.
- **Sparring** — low-risk training matches that award XP without injury risk.
- **PvP fighter battles** — challenge another player's fighter with wagered bets.
- **Companion system** — take your fighter with you around the map; they follow on foot, enter/exit vehicles, and assist in combat.
- **Fatigue, injury & recovery** — fighters accumulate fatigue, can get injured, and need rest/healing time.
- **REST/heal cooldowns** — configurable rest and recovery timers prevent spamming fights.
- **React UI stats panel** — view your fighter's full stat breakdown via `/myrecord` command or the trainer menu.
- **Discord logging** — recruitment events are logged to your webhook.

---

## Train-a-Fighter Setup

### 1. Database

The `fighters` table is created automatically on resource start by `server/train_fighter.lua` using `CREATE TABLE IF NOT EXISTS`.


---

## Train-a-Fighter Commands

| Command | Parameters | Description |
|---|---|---|
| `/myrecord` | — | Opens your fighter stats panel with current progression and condition data. |
| `/fighterfollow` | — | Whistle to recall your companion fighter back to you. |
| `/_changeFighterModel` | `<target> <model>` | **Admin** — changes a player's fighter ped model. Requires `group.admin`. |
