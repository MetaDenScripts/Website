# MetaDen Outdoors

Camping and outdoor interaction resource for your server with support for:

- Campfire cooking
- Collecting wood and rocks
- Filling bottles from river-like water
- Gutting snakes and lizards
- Sleeping in sleeping bags/tents
- Hiding in dumpsters
- Yoga stress relief

## Requirements

- `ox_lib`
- `metabridge`

Optional integrations:

- `metaden-skills` (only used when `Config.UseMetaDenSkills = true`)

## Installation

1. Place this folder in your resources.
2. Ensure dependencies start before this resource.
3. Add to your server cfg:

```cfg
ensure metaden-outdoors
```

## Configuration

All configuration is in `config.lua`.

Main keys:

- `Config.UseMetaDenSkills` – enables cooking XP/level gating callback integration.
- `Config.RiverRingFractionThreshold` – river/creek classifier sensitivity for bottle fill.
- `Config.EnabledTargets` – toggles each target interaction group on/off.
- `Config.Rocks`, `Config.Wood`, `Config.WoodItem`, `Config.YogaMat`, `Config.Tents`, `Config.Bins`, `Config.SleepingBags`, `Config.Campfires` – model lists for interactions.
- `Config.WoodRewardChance`, `Config.RockRewardChance` – local chance check before server reward event.
- `Config.Timeout` – local gather timeout in ms.
- `Config.SearchTime` – progressbar duration in ms for material searching.
- `Config.NonceTTL` – action nonce validity window in ms.
- `Config.EventCooldowns` – server-side anti-spam cooldowns per action.
- `Config.ExperienceRewards` – per-action skill/XP rewards (`cookMeat`, `searchForMaterial`, `gutSnake`, `gutLizard`, `fillBottle`).
- `Config.SkillItemBonus` – optional skill-level item amount bonus for configured actions.
- `Config.GuttingRewards` – configurable snake/lizard meat and skin reward amounts/items.
- `Config.MushroomChance`, `Config.MushroomRewardItems` – bonus mushroom reward configuration.
- `Config.AnimalChance`, `Config.AnimalItems` – random creature reward configuration.
- `Config.MinToGet`, `Config.MaxToGet` – min/max item amounts for gather rewards.
- `Config.Recipes` – cookable recipes (`name`, `title`, `duration`, `cooking`, `required`).

### External events triggered by this resource

- `ian-health:server:IncreaseDirty` (after cooking)
- `ian-health:server:increaseStress` (after yoga)

### Skills integration

- Cooking XP is granted through `exports['metaden-skills']:AddExperience(identifier, 'cooking', amount)` on successful cooking.
- When `Config.UseMetaDenSkills = true`, cooking menu progression reads current cooking XP through `metaden-outdoors:server:requestCookingSkillData` and unlocks recipes by `recipe.cooking` threshold.

## External APIs Used

### metabridge

Used through `MetaBridge`/`MetaBridgeClient` or fallback exports:

- `requestCallback`
- `registerCallback`
- `addTargetModel`
- `getItemImage`
- `getItemLabel`
- `getItemCount`
- `removeItem`
- `addItem`
- `getItemFromSlot`
- `notify`
- `progressBar`
- `registerContext`
- `showContext`

### GTA natives (direct animation)

- `TaskStartScenarioInPlace`
- `TaskPlayAnim`
- `ClearPedTasks`
- `ClearPedSecondaryTask`
- `ClearPedTasksImmediately`

## Security Notes

- Sensitive server actions are nonce-protected (`Config.NonceTTL`).
- Server-side action cooldowns are enforced (`Config.EventCooldowns`).
- Player nonce/cooldown data is cleaned on disconnect.

## Known Notes

- This resource intentionally relies on `metabridge` abstraction for inventory/target compatibility.
