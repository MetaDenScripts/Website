# Outdoors Configuration

```lua
Config = {}

-- ============================================================
-- Skills integration
-- ============================================================
-- If false, all skill-dependent logic is ignored:
-- - No XP is awarded.
-- - No skill-based item amount bonus is applied.
-- Base rewards still work normally.
Config.UseMetaDenSkills = true

-- ============================================================
-- Water detection tuning
-- ============================================================
-- River detection tuning for getting bottled water (higher = more lenient)
Config.RiverRingFractionThreshold = 0.7

-- ============================================================
-- Target toggles
-- ============================================================
-- Disable any target you don't want to be enabled, this will only disable the target
Config.EnabledTargets = {
    Campfires = true,
    SleepingBags = true,
    Tents = true,
    Bins = true,
    YogaMat = true,
    Rocks = true,
    Wood = true,
    WoodItem = true,
}

-- ============================================================
-- Target model lists
-- ============================================================
Config.Rocks = {
    390804950,
    -1625949270,
    -2041628332,
    1471437843
}

Config.Wood = {
    `prop_logpile_06`,
    `prop_logpile_06b`,
    `prop_woodpile_04a`,
    `prop_woodpile_03a`,
    `prop_logpile_07`,
    `prop_logpile_03`,
    `prop_woodpile_04b`,
    `prop_logpile_01`,
    `prop_logpile_05`,
    `prop_logpile_02`,
    `prop_logpile_07b`,
}

Config.WoodItem = {
    -1853453107,
    -1152075764,
    -3872440
}

Config.YogaMat = {
    `prop_yoga_mat_03`,
    `prop_yoga_mat_01`,
    `p_yoga_mat_02_s`,
    `p_yoga_mat_03_s`,
    `p_yoga_mat_01_s`,
}

Config.Tents = {
    `m23_2_prop_m32_tent_01a`,
    `prop_skid_tent_cloth`,
    `prop_skid_tent_03`,
    `ba_prop_battle_tent_01`,
    `prop_skid_tent_01`,
    `prop_skid_tent_01b`,
}

Config.Bins = {
    `p_dumpster_t`,
    `prop_dumpster_3a`,
    `prop_dumpster_02a`,
    `prop_dumpster_4a`,
    `prop_dumpster_01a`,
    `prop_dumpster_02b`,
    `m23_2_prop_m32_dumpster_01a`,
    `prop_dumpster_4b`
}
Config.SleepingBags = {`prop_skid_sleepbag_1`, `prop_rub_matress_03`, `m23_2_prop_m32_sleepbag_01a`, `xm3_prop_xm3_rub_matress_01a`}

-- ============================================================
-- Gathering and crafting
-- ============================================================
Config.RawMeatItemName = { 'rawmeat' }
Config.Campfires = {`prop_hobo_stove_01`, `h4_prop_h4_firepit_rocks_01a`, `prop_beach_fire`}

-- Chance (%) to successfully yield rewards from each search action
Config.WoodRewardChance = 80
Config.WoodRewardItems = { 'wood', 'fishbait', 'carbon' }
Config.RockRewardChance = 70
Config.RockRewardItems = { 'rock', 'smallrocks', 'carbon', 'fishbait' }

-- Search timing (milliseconds)
Config.Timeout = 25000 -- cooldown before searching again
Config.SearchTime = 10000

-- Anti-abuse token TTL (milliseconds)
Config.NonceTTL = 15000

-- Server-side per-action cooldowns (milliseconds)
Config.EventCooldowns = {
    cookMeat = 2000,
    searchForMaterial = Config.Timeout,
    fillBottle = 2000,
    gutAnimal = 1000
}

-- Experience rewards per action
-- ============================================================
-- Experience rewards (metaden-skills)
-- ============================================================
-- Per action XP reward. Each entry maps:
-- actionName = { skill = '<skill_key>', amount = <xp_amount> }
--
-- Valid action keys used by this script:
-- cookMeat, searchForMaterial, gutSnake, gutLizard, fillBottle
--
-- Note: If Config.UseMetaDenSkills = false, these rewards are skipped.
Config.ExperienceRewards = {
    cookMeat = { skill = 'cooking', amount = 1 },
    searchForMaterial = { skill = 'survival', amount = 1 },
    gutSnake = { skill = 'survival', amount = 1 },
    gutLizard = { skill = 'survival', amount = 1 },
    fillBottle = { skill = 'survival', amount = 1 }
}

-- ============================================================
-- Skill-based item amount bonus (metaden-skills)
-- ============================================================
-- Optional item amount scaling based on metaden-skills level
-- Bonus formula: floor((level - 1) / levelsPerBonus), capped by maxBonus
--
-- Example with levelsPerBonus=5:
-- level 1-5 => +0
-- level 6-10 => +1
-- level 11-15 => +2
-- ... up to maxBonus
Config.SkillItemBonus = {
    enabled = true,
    skill = 'survival',
    levelsPerBonus = 5,
    maxBonus = 3,

    -- Toggle bonus application per action
    actions = {
        searchForMaterial = true,
        gutSnake = true,
        gutLizard = true,
        fillBottle = false,
        cookMeat = false
    }
}

-- ============================================================
-- Bonus gather pools
-- ============================================================
Config.MushroomChance = 25
Config.MushroomRewardItems = {
    'mushrooms'
}
Config.AnimalItems = {
    'viper', 'charidotellasexpunctata', 'stagbeetle', 'longhornbeetle', 'hornbeetle', 'gecko3', 'gecko2', 'gecko',
    'dungbeetle', 'coralsnake', 'colorbeetle', 'cobra', 'blackbeetle', 'beardeddragon', 'anaconda', 'spider', 'tarantula'
}
Config.AnimalChance = 15

-- ============================================================
-- Gutting rewards
-- ============================================================
-- min/max are base roll ranges before optional skill item bonus.
-- skinAmount is granted as a fixed amount.
Config.GuttingRewards = {
    snake = {
        meatItem = 'snakemeat',
        meatMin = 3,
        meatMax = 5,
        skinItem = 'snakeskin',
        skinAmount = 1
    },
    lizard = {
        meatItem = 'lizardmeat',
        meatMin = 1,
        meatMax = 3,
        skinItem = 'lizardskin',
        skinAmount = 1
    }
}

-- Base random reward range for searchable resources
Config.MinToGet = 1
Config.MaxToGet = 5

-- ============================================================
-- Search animation presets
-- ============================================================
-- Players can pick one of these sets with /outdoorsanim <setName>
-- Default remains the current behavior (mechanic)
Config.SearchAnimationSets = {
    mechanic = {
        label = 'Mechanic Search',
        kind = 'mechanic'
    },
    kneel = {
        label = 'Kneel Search',
        kind = 'kneel'
    }
}

Config.DefaultSearchAnimationSet = 'mechanic'
Config.PlayerAnimationCommand = 'outdoorsanim'

-- ============================================================
-- Data-driven lootables
-- ============================================================
-- Each entry supports:
-- id: unique key
-- props: list of models to target
-- interaction: ui details (label/icon/distance/progressLabel/searchTime)
-- successChance: % chance for a successful search (server-authoritative)
-- cooldownMs: local client cooldown before retrying
-- rollMode: 'single' or 'multi'
-- rolls: number of weighted picks for multi mode
-- lootTable: { item, chance, min, max, applySkillBonus? }
-- requiredItem: optional gate
--   { enabled=true, item='lockpick', amount=1, mode='check|consume_on_success|consume_on_attempt' }
-- minigame: optional client export hook
--   { enabled=true, resource='my_resource', export='StartMinigame', args={...}, passOnNil=true }
-- animation: optional per-lootable animation defaults
--   { defaultSet='mechanic', allowPlayerOverride=true }
-- bonusPools: optional additional weighted pools rolled after success
--   { chance=25, rollMode='single', rolls=1, lootTable={...} }

local function BuildDefaultLootables()
    return {
        {
            id = 'rocks',
            enabled = true,
            legacyEnabledKey = 'Rocks',
            legacyAliases = { 'rocks' },
            props = Config.Rocks,
            interaction = {
                id = 'collect-rocks',
                icon = 'fa-solid fa-magnifying-glass',
                label = 'Collect Rocks',
                distance = 5.0,
                progressLabel = 'Searching for rocks...',
                searchTime = Config.SearchTime
            },
            successChance = Config.RockRewardChance,
            cooldownMs = Config.Timeout,
            rollMode = 'single',
            rolls = 1,
            lootTable = {
                { item = 'rock', chance = 40, min = Config.MinToGet, max = Config.MaxToGet },
                { item = 'smallrocks', chance = 30, min = Config.MinToGet, max = Config.MaxToGet },
                { item = 'carbon', chance = 20, min = Config.MinToGet, max = Config.MaxToGet },
                { item = 'fishbait', chance = 10, min = Config.MinToGet, max = Config.MaxToGet }
            },
            requiredItem = {
                enabled = false,
                item = nil,
                amount = 1,
                mode = 'check'
            },
            minigame = {
                enabled = false,
                resource = nil,
                export = nil,
                args = {},
                passOnNil = true
            },
            animation = {
                defaultSet = 'mechanic',
                allowPlayerOverride = true
            },
            bonusPools = {
                {
                    chance = Config.MushroomChance,
                    rollMode = 'single',
                    rolls = 1,
                    lootTable = {
                        { item = 'mushrooms', chance = 100, min = Config.MinToGet, max = Config.MaxToGet }
                    }
                },
                {
                    chance = Config.AnimalChance,
                    rollMode = 'single',
                    rolls = 1,
                    lootTable = {
                        { item = 'viper', chance = 6, min = 1, max = 1 },
                        { item = 'charidotellasexpunctata', chance = 6, min = 1, max = 1 },
                        { item = 'stagbeetle', chance = 6, min = 1, max = 1 },
                        { item = 'longhornbeetle', chance = 6, min = 1, max = 1 },
                        { item = 'hornbeetle', chance = 6, min = 1, max = 1 },
                        { item = 'gecko3', chance = 6, min = 1, max = 1 },
                        { item = 'gecko2', chance = 6, min = 1, max = 1 },
                        { item = 'gecko', chance = 6, min = 1, max = 1 },
                        { item = 'dungbeetle', chance = 6, min = 1, max = 1 },
                        { item = 'coralsnake', chance = 6, min = 1, max = 1 },
                        { item = 'colorbeetle', chance = 6, min = 1, max = 1 },
                        { item = 'cobra', chance = 6, min = 1, max = 1 },
                        { item = 'blackbeetle', chance = 6, min = 1, max = 1 },
                        { item = 'beardeddragon', chance = 6, min = 1, max = 1 },
                        { item = 'anaconda', chance = 6, min = 1, max = 1 },
                        { item = 'spider', chance = 5, min = 1, max = 1 },
                        { item = 'tarantula', chance = 5, min = 1, max = 1 }
                    }
                }
            }
        },
        {
            id = 'wood_logs',
            enabled = true,
            legacyEnabledKey = 'Wood',
            legacyAliases = { 'wood' },
            props = Config.Wood,
            interaction = {
                id = 'collect-wood-logs',
                icon = 'fa-solid fa-tree',
                label = 'Collect Wood',
                distance = 5.0,
                progressLabel = 'Searching for wood...',
                searchTime = Config.SearchTime
            },
            successChance = Config.WoodRewardChance,
            cooldownMs = Config.Timeout,
            rollMode = 'single',
            rolls = 1,
            lootTable = {
                { item = 'wood', chance = 60, min = Config.MinToGet, max = Config.MaxToGet },
                { item = 'fishbait', chance = 20, min = Config.MinToGet, max = Config.MaxToGet },
                { item = 'carbon', chance = 20, min = Config.MinToGet, max = Config.MaxToGet }
            },
            requiredItem = {
                enabled = false,
                item = nil,
                amount = 1,
                mode = 'check'
            },
            minigame = {
                enabled = false,
                resource = nil,
                export = nil,
                args = {},
                passOnNil = true
            },
            animation = {
                defaultSet = 'mechanic',
                allowPlayerOverride = true
            }
        },
        {
            id = 'wood_items',
            enabled = true,
            legacyEnabledKey = 'WoodItem',
            legacyAliases = {},
            props = Config.WoodItem,
            interaction = {
                id = 'collect-wood-items',
                icon = 'fa-solid fa-tree',
                label = 'Collect Wood',
                distance = 5.0,
                progressLabel = 'Searching for wood...',
                searchTime = Config.SearchTime
            },
            successChance = Config.WoodRewardChance,
            cooldownMs = Config.Timeout,
            rollMode = 'single',
            rolls = 1,
            lootTable = {
                { item = 'wood', chance = 60, min = Config.MinToGet, max = Config.MaxToGet },
                { item = 'fishbait', chance = 20, min = Config.MinToGet, max = Config.MaxToGet },
                { item = 'carbon', chance = 20, min = Config.MinToGet, max = Config.MaxToGet }
            },
            requiredItem = {
                enabled = false,
                item = nil,
                amount = 1,
                mode = 'check'
            },
            minigame = {
                enabled = false,
                resource = nil,
                export = nil,
                args = {},
                passOnNil = true
            },
            animation = {
                defaultSet = 'mechanic',
                allowPlayerOverride = true
            }
        }
    }
end

Config.Lootables = Config.Lootables or BuildDefaultLootables()

if Config.EnabledTargets and type(Config.Lootables) == 'table' then
    for _, lootable in ipairs(Config.Lootables) do
        local key = lootable.legacyEnabledKey
        if key and Config.EnabledTargets[key] == false then
            lootable.enabled = false
        end
    end
end

-- ============================================================
-- Cooking recipes
-- ============================================================
-- Each recipe:
-- name: output item
-- title: menu label
-- duration: cook progress time (ms)
-- cooking: minimum cooking XP required (when skills UI is enabled)
-- required: ingredient list
Config.Recipes = {
    {
        name = 'cookedmeat',
        title = 'Cooked Meat',
        duration = 5000,
        cooking = 0,
        required = {
            { item = 'rawmeat', amount = 1 },
        }
    },
    {
        name = 'cookedsnakemeat',
        title = 'Cooked Snake Meat',
        duration = 5000,
        cooking = 0,
        required = {
            { item = 'snakemeat', amount = 1 },
        }
    },
    {
        name = 'cookedlizardmeat',
        title = 'Cooked Lizard Meat',
        duration = 5000,
        cooking = 0,
        required = {
            { item = 'lizardmeat', amount = 1 },
        }
    },
    {
        name = 'water',
        title = 'Boiled Water',
        duration = 5000,
        cooking = 0,
        required = {
            { item = 'dirtywater', amount = 1 },
        }
    },
}

```
