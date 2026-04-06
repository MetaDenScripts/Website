# MetaDen Ladies of the Night Changelog

All notable changes to this project are documented in this file.

## [1.0.0] - 2026-04-06

### Added

#### Core Systems
- Ped recruitment with 35+ female ped models and randomized name assignment
- Clothing-based **Charm Score** system affecting recruitment success chance
- Recruitment gift requirement - a random gift item (wine, perfume, makeup, etc.) is required alongside the recruitment fee
- 6 trait stats (Beauty, Strength, Seduction, Cleanliness, Body Shape, Charisma) with configurable decay
- Loyalty system with gain/loss from player actions
- Hunger, thirst, and sickness mechanics with periodic stat decay
- 6 hospital locations (Pillbox, Paleto, Sandy Shores, Central LS, St. Fiacre, Mount Zonah) with per-hospital doctor ped model overrides
- Station peds in the open world with idle scenario animations
- Follow/unfollow companion system (up to 3 followers) with stuck detection/auto-teleport, combat assistance, and vehicle mounting
- Passive income generation for stationed peds with configurable tick interval and active-hours scheduling
- Earnings collection with pending cap
- Ped dismissal — permanently remove a ped from your roster via the NUI panel
- Ped poaching via skill checks
- Replaceable skill check wrapper (`client/skillcheck.lua`) - unescrowed so server owners can swap in any skill check library

#### Personalities
- 5 unique personalities randomly assigned on recruit: Independent, Diva, Tough, Social, Fragile
- Each personality modifies income, loyalty gain/decay, sickness chance, grooming needs, and task performance
- Personality-based initial trait adjustments

#### Specializations
- 4 specialization paths unlocked at ped level 5: Charmer, Survivor, Earner, Loyalist
- Permanent stat bonuses and gameplay modifiers per spec
- One-time irreversible choice per ped

#### Districts & Territory
- 10 predefined districts: Strawberry, Davis, La Mesa, Mirror Park, El Burro Heights, Vespucci, Vinewood, Del Perro, Sandy Shores, Paleto Bay
- District tiers (1-3) with scaling income multipliers
- Player level requirements for higher-tier districts
- Reputation system - earn reputation per district to boost income (up to +50%)
- Heat system - stationing peds raises heat, increasing sickness chance and poach vulnerability
- Heat decay over time
- District blips on minimap colored by tier
- `/lotnzones` command to toggle district zone radius blips and labels on the map
- Territory control - highest-reputation player automatically owns the zone with income bonuses for the owner and penalties for rivals

#### Ped Leveling
- 10 ped levels with XP thresholds (0 to 9,000 XP)
- XP earned from collecting earnings, feeding, grooming, healing, and completing tasks
- +25 max health per ped level
- Specialization path unlocked at ped level 5

#### Player Progression
- 10 player levels with XP thresholds (0 to 40,000 XP)
- XP earned from collecting, feeding, grooming, healing, completing tasks, and recruiting
- Unlockable recruit slots, districts, and advanced tasks per level

#### Loyalty States
- 3 declining loyalty states: Disgruntled, Refusing, About to Leave
- Income penalties, behavior restrictions, and poach vulnerability per state
- 48-hour auto-leave timer at the lowest loyalty state
- Visual warnings in the NUI panel

#### Care & Items
- Food items (burger, salad) restoring hunger with fatness/cleanliness trade-offs
- Drink items (water, sprunk, wine) restoring thirst with optional stat bonuses
- Healing items (bandage, first aid) restoring health and reducing sickness
- Grooming items (soap, perfume, makeup) boosting beauty, seduction, charisma, cleanliness
- Gift items (gold chain, rolex, diamond ring, panties) increasing loyalty
- Care cooldown (30s between actions per ped)

#### Gym Training
- 1 gym location (Muscle Sands, Vespucci Beach) with configurable coords, radius, and optional trainer ped model — easily extendable to multiple locations
- Train active followers to boost strength (1-3 per session, capped at 100) and max health (1-3 per session)
- 5 exercise animations (push ups, sit ups, stretching, jogging, yoga) randomly selected per session
- Configurable training cost ($50 default), 5-minute cooldown per ped, and ped XP/loyalty gains
- Additional stat effects per session: hunger +20, thirst +20, fatness -5, beauty +2, body shape +3
- Supports both NPC trainer ped (ox_target) and marker + E-key interaction modes via `SpawnInteractionPeds` toggle

#### Care Streaks
- Consecutive daily care actions (feed, drink, groom, heal) within a 24-hour window
- 3 streak thresholds: Attentive (3), Devoted (7), Best Boss (14)
- Loyalty and income bonuses for higher streaks

#### Tasks
- 8 base tasks: Deliver Supplies, Rescue, Chase a Thief, Escort Client, Find Safer Corner, Recover Stolen Cash, Deal With Trouble, Pickup From Contact
- 2 advanced tasks: VIP Transport, Heist Support
- Player level gating for certain tasks
- Branching task outcomes: Bonus (150% reward + rare item), Success (100% reward), Partial (50% reward + injury)
- Task cooldown per ped
- Proximity-triggered task offers when standing near your own stationed peds
- Task offer overlay with countdown timer and dismiss option (loyalty penalty on dismiss)

#### VIP Events
- 5 random district-wide events: Weekend Rush, Festival Night, Rich Client Alert, Rival Crew Pressure, Police Sweep
- Temporary income multipliers (positive and negative)
- Configurable duration and roll chance per district
- Rolled at 30-minute intervals

#### Arrest System
- Heat-based arrest risk - stationed peds can be arrested, with chance scaling by heat points
- 5 police stations: Mission Row, Vespucci, Vinewood, Sandy Shores Sheriff, Paleto Bay
- Configurable bail costs (base + tier scaling + heat multiplier, capped at $5,000)
- Auto-release after 4 hours if not bailed
- Arrest cooldown preventing re-arrest within 2 hours of release
- Loyalty loss on arrest
- Optional NPC cop peds at stations with per-station model overrides

#### PvP
- **Hostile interaction modal** - third-eye another player's stationed ped to open the hostile action menu
- **Attack** rival players' stationed peds (damage, disable, loyalty loss, heat gain) with per-ped cooldown
- **Ped retaliation** - attacked peds temporarily fight back for a configurable duration (default 15s) before returning to idle
- **Lure away system** - multi-step gift-based loyalty erosion: gift items to weaken loyalty, then "Sweet Talk" skill check when ped reaches Refusing state to poach her
- **Gift cooldown** - configurable cooldown between hostile gifts (default 30s)
- **Owner PvP alert overlay** - real-time notification card when a ped is attacked, poached, or being lured, with "Go Defend" button that sets a waypoint to the ped's location and auto-dismiss countdown
- Ambush encounters when collecting earnings above threshold (25% chance)
- Armed NPC spawns (2-4 enemies) with fight-or-flee outcome
- Survive ambush for bonus earnings; die/flee and lose a percentage

#### NUI Panel
- React + TypeScript + Tailwind CSS interface
- Accessible via `/ladiesofthenight` command or as an **lb-phone** custom app (auto-registered if lb-phone is installed)
- **Overview page** with ped cards showing personality, stats, loyalty warnings
- 5 filter options (All, Stationed, Idle, Sick, Low Loyalty) and 5 sort options
- **Ped detail page** with full stat bars, income breakdown modal, care actions
- Specialization selector with confirmation
- Schedule editor for active hours
- Item selector modals for feeding, drinking, healing, grooming, gifting
- **Zones page** for district/territory overview with tier badges, activity levels, and reputation
- **Recruitment prompt page** with cost breakdown, charm point calculation, success probability, and required gift preview
- **Task offer overlay** with task type, reward, and countdown timer
- **Task HUD** - persistent active task tracker with distance, time remaining, and phase info
- **PvP alert overlay** - owner defense notification with "Go Defend" waypoint button
- **Hostile modal** - multi-step interaction UI for non-owners with loyalty state indicators
- **Sidebar** with player level, XP progress, max recruits, stationed count

#### Database
- `lotn_ladies` table with personality, specialization, loyalty state, care streak, and district columns
- `lotn_districts` table tracking per-player district reputation, heat, and territory claims
- `lotn_player_progression` table for player XP and level

#### Server Exports
- `AddZoneReputation(citizenId, districtId, amount)` — add reputation to a player in a specific district
- `GetZoneReputation(citizenId, districtId)` — get a player's current reputation in a district
- `GetZoneReputationTier(citizenId, districtId)` — get a player's reputation tier name (Unknown, Newcomer, Known, Established, Dominant, Kingpin)

#### Integration
- Discord webhook logging for recruitment, dismissal, earnings collection, and hospital healing
- Framework-agnostic via metabridge (Qbox, ESX, QBCore)
- ox_lib for notifications, skill checks, and callbacks
- oxmysql for database operations
- lb-phone custom app integration (optional, auto-detected)
