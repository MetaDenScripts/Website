# Skills Configuration

```lua
Config = Config or {}

-- Skill registry used by XP, levels, and UI labels.
-- Key = internal skill identifier, Value = display name shown in UI.
Config.Skills = {
    survival = 'Survival',
    cooking = 'Cooking',
    fishing = 'Fishing',
    hacking = 'Hacking',
    crime = 'Crime',
    logistics = 'Logistics',
    tailor = 'Tailor',
    crafting = 'Crafting',
    metaldetecting = 'Metal Detecting',
    repo = 'Repo',
    scrapping = 'Scrapping',
    fighting = 'Fighting',
    education_biology = 'Education: Biology',
    education_art = 'Education: Art',
    education_engineering = 'Education: Engineering',
    education_chemistry = 'Education: Chemistry',
    diving = 'Diving',
    jeweller = 'Jeweller',
    bountyhunter = 'Bounty Hunter',
    drugseller = 'Drug Seller',
    dealerrep = 'Dealer Rep',
    traderweapons = 'Weapons Trader',
    butcher = 'Butcher'
}

-- XP thresholds per level.
-- Example: [1] = 100 means level 1 is reached at 100 XP.
-- Keep values ascending to avoid incorrect level calculations.
Config.Levels = {
    [1] = 100,
    [2] = 250,
    [3] = 500,
    [4] = 850,
    [5] = 1300,
    [6] = 1900,
    [7] = 2600,
    [8] = 3400,
    [9] = 4300,
    [10] = 5500,
    [11] = 7000,
    [12] = 9000,
    [13] = 11500,
    [14] = 14500,
    [15] = 18000,
    [16] = 22000,
    [17] = 27000,
    [18] = 33000,
    [19] = 40000,
    [20] = 50000
}

-- Security options for client/server XP calls.
-- RequireNonce: validates a per-player nonce before allowing XP operations.
-- NonceLength: number of random characters generated for the nonce.
-- AllowServerMissingNonce: if true, server-side calls without nonce are accepted.
Config.Security = {
    RequireNonce = true,
    NonceLength = 24,
    AllowServerMissingNonce = false
}

-- Database synchronization behavior.
-- Enabled: master toggle for DB resync checks.
-- OnMutation: refresh from DB before Add/Remove/Set operations.
-- OnRead: refresh from DB before GetExperience/GetTotalExperience reads.
-- Use these when external scripts or manual SQL edits can modify XP rows.
Config.DatabaseSync = {
    Enabled = true,
    OnMutation = true,
    OnRead = true
}

-- Admin XP command settings.
-- Name: chat/console command used for XP administration.
-- Ace: additional ACE permission checked at runtime for in-game command usage.
-- Note: command registration is still restricted-mode, so command.<Name> ACE is also required.
Config.AdminCommand = {
    Name = 'skillexp',
    Ace = 'metaden-skills.admin'
}

-- Milestones data bridge for phone/NUI apps.
-- This controls how default levels/reputation are shaped and optionally merged
-- with custom exports/functions from other resources.
Config.MilestonesBridge = {
    Levels = {
        -- Optional explicit map for skill labels in the levels payload.
        -- If not present, labels can still be derived from Config.Skills.
        SkillMap = {
            survival = 'Survival',
            cooking = 'Cooking',
            logistics = 'Logistics',
            tailor = 'Tailor',
            crafting = 'Crafting',
            metaldetecting = 'Metal Detecting',
            repo = 'Repo',
            scrapping = 'Scrapping',
            fighting = 'Fighting',
            education_biology = 'Education: Biology',
            education_art = 'Education: Art',
            education_engineering = 'Education: Engineering',
            education_chemistry = 'Education: Chemistry',
            diving = 'Diving',
            jeweller = 'Jeweller'
        },
        -- Optional custom source for level payload:
        -- CustomExport = { resource = 'my_resource', export = 'GetLevels', passContext = true }
        -- CustomFunction = function(sourceOrIdentifier, context) return {...} end
        CustomExport = nil,
        CustomFunction = nil,
        -- true  = default + custom merged (custom keys overwrite duplicates)
        -- false = custom payload only
        MergeCustomWithDefault = true
    },
    Reputation = {
        -- Pull reputation from metaden-skills reputation export.
        UseSkillsReputation = true,
        -- Include framework metadata respect/faction values if present.
        IncludeMetadataRespect = true,
        -- metadata key -> display label in UI reputation payload.
        MetadataRespectMap = {
            ballas = 'Ballas',
            family = 'Families',
            vagos = 'Vagos',
            lostmc = 'The Lost MC'
        },
        -- Rename output reputation keys for UI readability.
        RenameMap = {
            bountyhunter = 'Contracts',
            drugseller = 'Hustler/Dealer'
        },
        -- Hide noisy or duplicate keys from final reputation payload.
        HiddenKeys = {
            ['city hall'] = true,
            traderweapons = true,
            dealerrep = true,
            cooking = true,
            logistics = true,
            scrapping = true
        },
        -- Optional custom source for reputation payload:
        -- CustomExport = { resource = 'my_resource', export = 'GetReputation', passContext = true }
        -- CustomFunction = function(sourceOrIdentifier, context) return {...} end
        CustomExport = nil,
        CustomFunction = nil,
        -- true  = default + custom merged (custom keys overwrite duplicates)
        -- false = custom payload only
        MergeCustomWithDefault = true
    }
}

-- Standalone UI command configuration (outside phone apps).
Config.MilestonesUi = {
    EnableStandaloneCommand = true,
    StandaloneCommandName = 'milestones'
}

-- Mission/reputation runtime tuning.
Config.MissionSystem = {
    -- Admin command name used to assign missions manually.
    -- Registered in restricted mode; grant command.<AdminAssignCommandName> in ACE.
    AdminAssignCommandName = 'missionassign',

    -- Chance-based bonus reward settings.
    GoldCoinChance = 5,
    MaxGoldCoinsPerSession = 5,
    GoldCoinRewardItem = 'goldcoin',

    -- Per-reputation-category reward trigger thresholds.
    -- chance = roll threshold (1-100), rep = minimum required reputation.
    ReputationChance = {
        crime = {
            chance = 15,
            rep = 100,
        },
        bountyhunter = {
            chance = 5,
            rep = 99999,
        },
        drugseller = {
            chance = 5,
            rep = 999999,
        },
        dealerrep = {
            chance = 5,
            rep = 99999,
        },
        scrapping = {
            chance = 5,
            rep = 99999,
        },
        education_engineering = {
            chance = 5,
            rep = 99999,
        },
        traderweapons = {
            chance = 5,
            rep = 99999,
        },
        hacking = {
            chance = 20,
            rep = 100,
        }
    },
    -- Base reputation map used when no stored value exists.
    ReputationDefaults = {
        crime = 0,
        bountyhunter = 0,
        drugseller = 0,
        dealerrep = 0,
        scrapping = 0,
        education_engineering = 0,
        traderweapons = 0,
        butcher = 0,
        hacking = 0,
    },
    -- Metadata keys that can be merged into reputation payloads.
    ReputationMetadataKeys = {
        'bountyhunter',
        'drugseller',
        'dealerrep',
        'scrapping',
        'traderweapons',
        'butcher',
    },
}

```
