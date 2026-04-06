# MetaDen Ladies of the Night


> **Build your empire on the streets of Los Santos.**

Run an underground operation like no other. Recruit women from across the city, manage their well-being, station them in profitable districts, and grow your influence — all through a slick in-game management panel. With deep RPG mechanics, PvP rivalry, territory control, and a full player progression system, **Ladies of the Night** is a feature-rich content drop that gives your players hours of engaging gameplay and a reason to keep coming back.

---

## Highlights

- 🎭 **20+ ped models** with randomized names, personalities, and stats
- 📊 **Deep RPG stats** — Beauty, Strength, Seduction, Cleanliness, Body Shape, Charisma, Loyalty
- 🗺️ **10 districts** across Los Santos & Blaine County with tiered income and reputation
- ⚔️ **Full PvP** — attack, poach, ambush, and contest territory against rival players
- 📈 **Dual progression** — both ped levels (1–10) and player levels (1–10) with meaningful unlocks
- 🏥 **6 hospital locations** and a gym for training your peds
- 📱 **Responsive NUI + lb-phone app** — manage everything from a sleek React panel or your in-game phone
- 🎯 **10 unique tasks** with branching outcomes and real-time HUD tracking
- 🔧 **Highly configurable** — districts, income rates, items, PvP, and more via a single `config.lua`

---

## Features

### Recruitment & Charm System
- Approach **20+ randomized female ped models** found throughout the world via **ox_target** (third-eye)
- Clothing-based **Charm Score** — what you wear directly affects your recruitment success rate
  - Configurable clothing pieces (jackets, watches, glasses, hats) contribute charm points
  - Base chance starts at 1%, scales up to 95% with a full outfit
- **Gift requirement** — each recruit asks for a random gift (wine, perfume, makeup, diamond ring, rolex, goldchain) with configurable min/max quantities
- One-time **recruitment cost** (configurable, default $2,500)
- Each ped is assigned a **random name** from a pool of 31 and a **random personality**
- **6 core stats** rolled on recruitment: Beauty, Strength, Seduction, Cleanliness, Body Shape, Charisma — plus Loyalty

### Personalities
- **5 personality types** assigned randomly on recruitment, each with unique modifiers:
  - **Independent** — higher income, slower loyalty gains
  - **Diva** — highest income boost, faster loyalty decay, demands more grooming
  - **Tough** — sickness resistant, task bonus, steady loyalty
  - **Social** — fast loyalty gains, more frequent VIP events
  - **Fragile** — higher beauty, more vulnerable to sickness, bonus income
- Personality affects income multiplier, loyalty gain/decay rates, sickness vulnerability, task bonuses, and event frequency

### Companion System
- **Up to 3 followers** at once (configurable)
- Peds **automatically board and exit vehicles** with you
- Followers **join you in combat** when you get into fights
- **Stuck detection** — auto-teleport if a ped can't pathfind to you
- Smooth **interior transitions** — followers reposition when entering/exiting buildings
- **Dismiss and recall** your followers at any time from the management panel

### Stationed Peds & Passive Income
- **Station peds** at locations across the map (up to 3 per district per player)
- Peds generate **passive income** while stationed, calculated from base rate + stat modifiers + district multiplier + reputation + events + territory bonuses
- **Active hours** — peds only earn during configurable in-game hours (default 20:00–06:00)
- **Zone exclusion radius** — prevents other players from stationing too close (default 50m)
- **Proximity streaming** — stationed peds spawn/despawn based on client proximity for performance
- Stationed peds perform **random idle animations** in the world
- **Stat decay over time** — hunger and thirst increase, trait stats passively decay based on configurable intervals and personality modifiers

### Stats, Health & Care
- **Hunger & Thirst** (0–100) — build over time, reduce happiness and income if neglected
- **Health** (current/max) — can take damage from tasks, combat, or PvP attacks; max health grows with level
- **Sickness** — Healthy → Cold (12h) → Injured (48h) → Critical (96h); strength reduces recovery time
- **Happiness** — derived from hunger, thirst, and sickness; affects overall performance
- **Care items** — feed, hydrate, heal, groom, and gift your peds using inventory items:
  - **Food**: Burger (+30 hunger, +10 health), Salad (+20 hunger, -3 fatness)
  - **Drinks**: Water (+35 thirst), Sprunk (+10 thirst), Wine (+15 thirst, +3 charisma)
  - **Healing**: Bandage (+25 health), First Aid Kit (+50 health, -25% sickness duration)
  - **Grooming**: Soap (+30 cleanliness), Perfume (+10 seduction), Makeup (+15 beauty), Lipstick, Beauty Cream
  - **Gifts**: Goldchain (+2 loyalty), Rolex (+5), Diamond Ring (+7), Panties (+1)
- Care items can only be used when the ped is **physically nearby** (following you or stationed within range)
- **30-second cooldown** between care actions per ped

### Care Streaks
- Maintain **daily care actions** (feed, drink, groom, heal) to build a streak:
  - **3-day streak — Attentive**: +5 loyalty
  - **7-day streak — Devoted**: +10 loyalty, +5% income
  - **14-day streak — Best Boss**: +15 loyalty, +10% income
- Streaks reward consistent engagement and directly boost your bottom line

### Loyalty States
- Peds don't just vanish — they decline **gracefully through 4 warning states**:
  - **Normal** (loyalty 21+) — full income, can follow and station
  - **Disgruntled** (11–20) — -30% income, +15% poach vulnerability
  - **Refusing** (6–10) — -70% income, cannot follow or station, +30% poach vulnerability
  - **Fleeing** (1–5) — 0% income, auto-leaves after 48 hours, +50% poach vulnerability
- At loyalty 0, the ped is **permanently lost**
- Loyalty changes from: care actions (gain), neglect (decay), arrests (-5), task dismissals (-3), sickness/injury penalties

### Gym & Hospital
- **Gym** — Train your peds at Muscle Sands (Vespucci Beach)
  - 5 exercises: Push-ups, Sit-ups, Stretching, Jogging, Yoga
  - Boosts Strength, Max Health, Beauty, Body Shape; reduces Fatness
  - Costs $50/session (configurable) with a 5-minute cooldown
- **Hospital** — Heal peds at **6 locations** across the map:
  - Pillbox, Paleto Bay, Sandy Shores, Central LS, St. Fiacre, Mount Zonah
  - Full heal (max HP + cure sickness) for $500 (configurable)
  - Optional custom doctor NPCs at each location

### Arrest & Bail System
- **5 police stations** across the map: Mission Row, Vespucci, Vinewood, Sandy Shores, Paleto
- **Arrest risk** scales with district danger level + heat; only triggers during active hours
- Arrested peds **cannot work or be stationed** and suffer a loyalty penalty (-5)
- **Bail cost** scales dynamically: base $500 + (district tier × $150) + (heat × $5), capped at $5,000
- **Auto-release** after 4 hours if not bailed (configurable)
- **Arrest cooldown** — 2 hours before a ped can be arrested again
- Optional custom cop NPCs at each station

### Districts & Territory
- **10 predefined districts** across Los Santos and Blaine County:
  - **Tier 1** (early game): Strawberry, Davis, La Mesa, Mirror Park, El Burro Heights, Sandy Shores, Paleto Bay
  - **Tier 2** (mid game): Vespucci
  - **Tier 3** (late game): Vinewood, Del Perro
- Each district has its own **base income multiplier** (0.80x–1.35x), **arrest risk**, and **player level requirement**
- **Reputation** (per player per district, 0–1,000 cap):
  - Earned from stationing peds, completing tasks, collecting earnings, surviving ambushes
  - Reputation tiers: Unknown → Newcomer (+5%) → Known (+10%) → Established (+20%) → Dominant (+35%) → Kingpin (+50% income)
  - Decays at -10/day if no peds stationed in the district
- **Heat** (per player per district):
  - Builds from income ticks, PvP events, and VIP events
  - Increases sickness chance, poach vulnerability, and arrest risk
  - Decays passively at -6/hour + bonus from reputation tier
- **Territory control** — the player with the highest reputation (300+) in a district **owns the territory**, gaining +20% income while rivals get -15%
  - Territory owner blips visible on the map
  - Rivals can **contest ownership** within a time window

### Specializations
- At ped level 5, choose a **specialization** path:
  - **Charmer** — +15 charisma, +10 seduction, +10% income
  - **Survivor** — +20 strength, +50 max health, 50% sickness resistance
  - **Earner** — +$1,000 max pending earnings, +20% income
  - **Loyalist** — 50% slower loyalty decay, 50% faster loyalty gain

### Player & Ped Progression
- **Ped levels** (1–10): XP earned from collecting earnings, feeding, grooming, healing, and completing tasks
  - Each level grants +25 max health
  - Specialization unlocks at level 5
- **Player levels** (1–10): XP earned from all activities including recruiting
  - Unlock **additional recruit slots** (5 → 8 as you level up)
  - Unlock **higher-tier districts** (Vespucci at level 3, Vinewood at level 5, Del Perro at level 7)
  - Unlock **advanced tasks** (Escort at level 5, VIP Transport at level 7, Heist Support at level 9)

### Tasks
- **8 base tasks**: Deliver Supplies, Rescue, Chase a Thief, Escort Client, Find Safer Corner, Recover Stolen Cash, Deal With Trouble, Pickup From Contact
- **2 advanced tasks** (player level gated): VIP Transport, Heist Support
- **Branching outcomes** per task:
  - **Bonus** (15% chance) — 150% reward + loyalty bonus + rare item drop
  - **Success** — 100% reward
  - **Partial** (20% chance) — 50% reward + minor injury
  - Personality and strength modify outcome odds
- **Configurable distance ranges** per task type for destination generation
- **Proximity tasks** — 5% chance of a task offer when you're near your own stationed ped
- **Task offer overlay** — 30-second countdown popup to accept or dismiss (dismissal penalizes loyalty)
- **Real-time Task HUD** — bottom-center tracker showing task phase, distance to objective, and countdown timer
- **Task cooldown**: 30 minutes per ped (configurable)

### VIP Events
- Random district-wide events rolled every 30 minutes for districts with stationed peds:
  - **Weekend Rush** — +50% income for 2 hours (15% chance)
  - **Festival Night** — +100% income for 1 hour (5% chance)
  - **Rich Client Alert** — +80% income for 30 minutes (10% chance)
  - **Rival Crew Pressure** — -40% income + heat gain for 1 hour (8% chance)
  - **Police Sweep** — -70% income for 30 minutes (5% chance)
- Players are notified when an event starts in their district

### PvP Systems
- **Attack stationed peds** — deal damage to rival players' stationed peds, disabling them for hours
  - Owner receives a real-time **PvP alert overlay** with location and a "Go Defend" button
  - Attacked peds can retaliate (configurable) and fight back for 60 seconds
  - Generates heat (+15) in the district for the attacker
- **Poaching** — target rival peds in a **Refusing** loyalty state with gifts to erode their loyalty
  - Requires an **ox_lib skill check** (difficulty affected by heat)
  - Successfully poached peds are disabled for 2 hours; generates heat in the district
- **Ambush encounters** — chance to be ambushed when collecting large earnings ($500+)
  - 2–4 NPC attackers spawn nearby (armed or melee); one designated "runner" tries to escape with your cash
  - **Win** (catch the runner): bonus earnings (+35%)
  - **Lose** (runner escapes): stolen earnings (-30%)
  - Surviving an ambush rewards district reputation (+10)
- **Territory contests** — claim districts for income bonuses; rivals can challenge your claim within a time window

### NUI Panel & lb-phone App
- Full-featured management interface built with **React + TypeScript + Tailwind CSS**
- Works as a standalone desktop NUI (`/ladiesofthenight`) and as a native **lb-phone** app (auto-detected)
- **Responsive design** — single codebase adapts between desktop (sidebar layout) and phone (bottom tab bar)
- **Overview page** — roster grid with status indicators, health/loyalty bars, filter by status (All, Healthy, Needs Care, Ready, Stationed, Arrested), sort by name/earnings/loyalty/level/income
- **Ped detail page** — full stat breakdown with color-coded trait bars, income breakdown modal (showing every modifier), care action buttons, specialization selector, collect earnings, call/dismiss, and bail/hospital actions
- **Zones page** — district cards showing reputation, heat, tier badge, territory owner, active events, stationed count, and required player level
- **Task Offer overlay** — top-right popup with 30s countdown to accept or dismiss
- **Task HUD** — bottom-center real-time tracker with emoji-coded task type, phase, distance, and timer
- **PvP Alert overlay** — real-time danger notifications (attack, lure, poach) with "Go Defend" action
- **Ped quick-action modal** — third-eye context menu for in-world interactions (feed, drink, heal, groom, gift, station, follow)
- **Sidebar stats** — player level, XP, roster count, stationed count, pending + lifetime earnings

---

## Dependencies

| Resource | Purpose |
|---|---|
| [oxmysql](https://github.com/overextended/oxmysql) | MySQL database driver |
| [ox_lib](https://github.com/overextended/ox_lib) | Shared utility library (notifications, skill checks, callbacks) |
| [ox_target](https://github.com/overextended/ox_target) | Third-eye targeting for world ped interactions |
| [metabridge](https://github.com/paidtoprovide/metabridge) | Framework abstraction layer (QBox/ESX/QBCore) |

### Optional
| Resource | Purpose |
|---|---|
| [lb-phone](https://lfrp.gg/) | Enables an in-game phone app alongside the desktop NUI |

## Installation

1. **Import the database**
   ```sql
   -- Run database.sql against your MySQL server
   -- Creates tables: lotn_ladies, lotn_districts, lotn_player_progression
   ```

2. **Add the resource** to your server's resources folder under `[metadenscripts]`

3. **Configure** — edit `config.lua` to adjust:
   - Districts, personalities, specializations
   - Income rates, active hours, stat decay intervals
   - Task types, rewards, distance ranges, and cooldowns
   - PvP settings (attacks, poaching, ambushes, territory)
   - Care items (food, drinks, healing, grooming, gifts)
   - Hospital locations, gym settings, police stations
   - Player level XP thresholds and unlock progression
   - Charm score clothing pieces and recruitment gifts

4. **Build the UI** (if not already built)
   ```bash
   cd ui
   npm install
   npm run build
   ```

5. **Ensure the resource** in your server config:
   ```cfg
   ensure metaden-ladiesofthenight
   ```