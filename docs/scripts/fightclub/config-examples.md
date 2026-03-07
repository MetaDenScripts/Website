# FightClub Configuration

```lua
Config = {}

-- Global debug flag used by this resource.
Config.Debug = false

-- Cooldown after finishing a fight before starting another (milliseconds).
Config.CooldownBetweenFights = 300000 -- 5 minutes

-- Player level thresholds for fightclub progression.
-- Format: [level] = required_xp
Config.Levels = {
    [1] = 0,
    [2] = 20,
    [3] = 50,
    [4] = 100,
    [5] = 180,
    [6] = 300,
    [7] = 500,
    [8] = 800,
    [9] = 1200,
    [10] = 2000
}

-- Arena definitions used for normal fightclub matches.
-- Shared schema per location:
--   Level             = minimum player level required to enter.
--   EntryFee          = amount of Config.Currency charged to join.
--   AllowAll          = if true, bypasses level restriction checks.
--   CenterPos         = arena center (x, y, z, heading).
--   Trainer           = NPC model + world position that players interact with.
--   PlayerFightingPos = where the player is placed at fight start.
--   NPCFighter        = opponent model/spawn and random HP range.
--   Spectators        = crowd settings (count + random model pool).
Config.FightLocations = {
    [1] = {
        Level = 1,
        EntryFee = 50,
        AllowAll = false,
        CenterPos = vec4(328.31, -1084.07, 60.77, 358.64),
        Trainer = {
            model = "s_m_m_hairdress_01",
            location = vec4(329.29, -1091.5, 61.29, 1.0),
        },
        PlayerFightingPos = vec4(328.33, -1081.54, 60.77, 183.48),
        NPCFighter = {
            model = "a_m_m_beach_02",
            position = vec4(328.14, -1085.55, 60.77, 357.42),
            minHealth = 250,
            maxHealth = 450
        },
        Spectators = {
            amount = 4,
            models = {
                "a_m_m_ktown_01",
                "a_m_m_og_boss_01",
                "a_m_m_salton_04",
            }
        }
    },
    [2] = {
        Level = 2,
        EntryFee = 250,
        AllowAll = false,
        CenterPos = vec4(182.9, -1055.87, 70.74, 252.87),
        Trainer = {
            model = "a_m_m_hillbilly_02",
            location = vec4(185.03, -1063.14, 70.74, 338.09),
        },
        PlayerFightingPos = vec4(180.97, -1054.84, 70.74, 256.91),
        NPCFighter = {
            model = "a_m_m_tennis_01",
            position = vec4(184.64, -1056.16, 70.74, 71.18),
            minHealth = 350,
            maxHealth = 600
        },
        Spectators = {
            amount = 10,
            models = {
                "a_m_m_bevhills_01",
                "a_m_m_malibu_01",
                "a_m_m_mexlabor_01",
                "a_m_m_rurmeth_01",
                "a_m_o_soucent_01",
                "a_m_y_cyclist_01"
            }
        }
    },
    [3] = {
        Level = 3,
        EntryFee = 550,
        AllowAll = false,
        CenterPos = vec4(-1692.96, -750.95, 10.19, 238.53),
        Trainer = {
            model = "a_m_m_bevhills_02",
            location = vec4(-1691.37, -742.78, 10.18, 151.37),
        },
        PlayerFightingPos = vec4(-1695.25, -749.31, 10.19, 231.12),
        NPCFighter = {
            model = "a_m_m_beach_01",
            position = vec4(-1691.23, -752.3, 10.19, 48.05),
            minHealth = 500,
            maxHealth = 750
        },
        Spectators = {
            amount = 10,
            models = {
                "a_m_m_eastsa_02",
                "a_m_m_golfer_01",
                "a_m_m_malibu_01",
                "a_m_y_gay_01",
                "a_m_y_genstreet_01",
                "a_m_y_genstreet_02"
            }
        }
    },
    [4] = {
        Level = 4,
        EntryFee = 750,
        AllowAll = false,
        CenterPos = vec4(-1729.77, -193.56, 57.42, 351.29),
        Trainer = {
            model = "a_m_m_golfer_01",
            location = vec4(-1725.35, -190.1, 57.52, 3.29),
        },
        PlayerFightingPos = vec4(-1729.39, -191.49, 57.39, 184.03),
        NPCFighter = {
            model = "a_m_y_juggalo_01",
            position = vec4(-1728.81, -195.5, 57.22, 9.22),
            minHealth = 700,
            maxHealth = 850
        },
        Spectators = {
            amount = 10,
            models = {
                "a_m_y_mexthug_01",
                "a_m_y_soucent_02",
                "a_m_m_mlcrisis_01",
            }
        }
    },
    [5] = {
        Level = 1,
        EntryFee = 50,
        CenterPos = vec4(288.38, -1601.46, 30.27, 315.49),
        Trainer = {
            model = "a_m_y_genstreet_02",
            location = vec4(291.2, -1605.28, 30.16, 47.51),
        },
        PlayerFightingPos = vec4(288.05, -1603.53, 30.26, 343.38),
        NPCFighter = {
            model = "a_m_y_soucent_03",
            position = vec4(289.5, -1599.13, 30.26, 151.88),
            minHealth = 200,
            maxHealth = 300
        },
        Spectators = {
            amount = 5,
            models = {
                "g_m_y_ballaeast_01",
                "g_m_y_ballaorig_01",
                "g_m_y_famdnf_01",
                "g_m_y_famfor_01",
            }
        }
    },
    [6] = {
        Level = 2,
        EntryFee = 250,
        AllowAll = false,
        CenterPos = vec4(663.4, -1434.64, 9.73, 281.23),
        Trainer = {
            model = "g_m_y_salvaboss_01",
            location = vec4(675.19, -1432.64, 9.73, 109.4),
        },
        PlayerFightingPos = vec4(663.95, -1436.76, 9.73, 11.75),
        NPCFighter = {
            model = "g_m_y_salvagoon_01",
            position = vec4(662.5, -1432.35, 9.73, 188.3),
            minHealth = 350,
            maxHealth = 500
        },
        Spectators = {
            amount = 6,
            models = {
                "g_m_y_salvagoon_01",
                "g_m_y_salvagoon_02",
                "g_f_y_vagos_01",
                "g_m_y_mexgoon_03"
            }
        }
    },
    [7] = {
        Level = 3,
        EntryFee = 550,
        AllowAll = false,
        CenterPos = vec4(543.84, -2407.81, 4.88, 277.87),
        Trainer = {
            model = "s_m_m_autoshop_01",
            location = vec4(538.48, -2406.5, 5.87, 336.49),
        },
        PlayerFightingPos = vec4(545.93, -2407.72, 4.88, 86.73),
        NPCFighter = {
            model = "s_m_m_autoshop_02",
            position = vec4(542.62, -2406.54, 4.87, 224.36),
            minHealth = 550,
            maxHealth = 700
        },
        Spectators = {
            amount = 6,
            models = {
                "a_m_m_mexcntry_01",
                "a_m_m_salton_02",
                "a_m_m_soucent_02",
                "a_m_y_downtown_01"
            }
        }
    },
    [8] = {
        Level = 4,
        EntryFee = 750,
        AllowAll = false,
        CenterPos = vec4(1234.77, -2360.36, 48.89, 251.13),
        Trainer = {
            model = "a_m_m_eastsa_02",
            location = vec4(1225.68, -2357.52, 49.29, 252.13),
        },
        PlayerFightingPos = vec4(1233.81, -2363.5, 48.78, 342.64),
        NPCFighter = {
            model = "a_m_y_breakdance_01",
            position = vec4(1236.12, -2357.98, 49.94, 157.16),
            minHealth = 750,
            maxHealth = 900
        },
        Spectators = {
            amount = 10,
            models = {
                "a_m_m_mexcntry_01",
                "a_m_m_salton_02",
                "a_m_m_soucent_02",
                "a_m_y_downtown_01"
            }
        }
    },
    [9] = {
        Level = 5,
        EntryFee = 1050,
        AllowAll = false,
        CenterPos = vec4(-142.59, -2221.35, 7.81, 2.28),
        Trainer = {
            model = "s_m_y_construct_02",
            location = vec4(-142.65, -2214.67, 7.81, 180.54),
        },
        PlayerFightingPos = vec4(-145.33, -2221.43, 7.81, 269.41),
        NPCFighter = {
            model = "s_m_y_dockwork_01",
            position = vec4(-140.65, -2221.39, 7.81, 90.94),
            minHealth = 850,
            maxHealth = 1200
        },
        Spectators = {
            amount = 3,
            models = {
                "s_m_m_dockwork_01",
                "s_m_m_gardener_01",
                "s_m_m_janitor",
                "s_m_y_construct_01"
            }
        }
    },
    [10] = {
        Level = 5,
        EntryFee = 1050,
        AllowAll = false,
        CenterPos = vec4(2038.37, 3881.09, 31.85, 279.62),
        Trainer = {
            model = "g_m_y_lost_03",
            location = vec4(2033.32, 3891.23, 31.85, 214.25),
        },
        PlayerFightingPos = vec4(2035.4, 3880.05, 30.89, 291.38),
        NPCFighter = {
            model = "a_m_m_salton_01",
            position = vec4(2041.98, 3882.98, 30.82, 115.27),
            minHealth = 850,
            maxHealth = 1200
        },
        Spectators = {
            amount = 6,
            models = {
                "a_m_m_hillbilly_02",
                "a_m_m_salton_02",
                "a_m_y_methhead_01",
                "g_m_y_lost_02",
                "g_m_y_lost_01"

            }
        }
    },
    [11] = {
        Level = 2,
        EntryFee = 50,
        AllowAll = false,
        CenterPos = vec4(-2173.79, 4271.15, 48.96, 259.02),
        Trainer = {
            model = "ig_clay",
            location = vec4(-2177.52, 4275.37, 48.11, 230.03),
        },
        PlayerFightingPos = vec4(-2172.29, 4273.68, 47.96, 150.04),
        NPCFighter = {
            model = "g_m_y_lost_02",
            position = vec4(-2174.44, 4269.72, 47.96, 326.59),
            minHealth = 550,
            maxHealth = 800
        },
        Spectators = {
            amount = 6,
            models = {
                "g_m_y_lost_03",
                "g_f_y_lost_01",
                "g_m_y_lost_02",
                "g_m_y_lost_01",
            }
        }
    },
    [12] = {
        Level = 8,
        EntryFee = 2500,
        AllowAll = false,
        CenterPos = vec4(-842.89, 5903.24, 4.07, 103.85),
        Trainer = {
            model = "a_m_y_beach_02",
            location = vec4(-825.9, 5898.57, 6.62, 74.74),
        },
        PlayerFightingPos = vec4(-840.03, 5903.35, 3.56, 103.42),
        NPCFighter = {
            model = "a_m_y_musclbeac_02",
            position = vec4(-846.19, 5903.52, 2.57, 266.41),
            minHealth = 2050,
            maxHealth = 3500
        },
        Spectators = {
            amount = 10,
            models = {
                "a_m_y_musclbeac_01",
                "a_m_m_beach_01",
                "a_m_m_beach_02",
                "a_m_y_beach_01",
                "a_m_y_beach_03",
                "a_f_y_beach_01"
            }
        }
    },
    [13] = {
        Level = 9,
        EntryFee = 3500,
        AllowAll = false,
        CenterPos = vec4(208.47, 135.53, 101.46, 262.33),
        Trainer = {
            model = "cs_joeminuteman",
            location = vec4(215.8, 129.97, 101.86, 57.23),
        },
        PlayerFightingPos = vec4(204.92, 133.86, 101.46, 296.08),
        NPCFighter = {
            model = "a_m_y_musclbeac_02",
            position = vec4(213.09, 137.52, 101.46, 110.15),
            minHealth = 3050,
            maxHealth = 4500
        },
        Spectators = {
            amount = 0,
            models = {
                "a_m_y_musclbeac_01",
            }
        }
    },
    [14] = {
        Level = 3,
        EntryFee = 550,
        AllowAll = false,
        CenterPos = vec4(-168.92, -1070.99, 30.14, 250.9),
        Trainer = {
            model = "s_m_y_construct_02",
            location = vec4(-171.61, -1063.56, 30.14, 241.7),
        },
        PlayerFightingPos = vec4(-167.52, -1068.3, 30.14, 164.61),
        NPCFighter = {
            model = "s_m_y_construct_02",
            position = vec4(-169.41, -1072.93, 30.14, 336.56),
            minHealth = 3050,
            maxHealth = 4500
        },
        Spectators = {
            amount = 6,
            models = {
                "a_m_m_farmer_01",
                "cs_floyd",
                "s_m_m_gaffer_01",
                "s_m_m_lathandy_01",
                "s_m_m_gardener_01"

            }
        }
    },
    [15] = {
        Level = 1,
        EntryFee = 50,
        AllowAll = false,
        CenterPos = vec4(342.51, -1195.99, 29.29, 176.16),
        Trainer = {
            model = "a_m_o_soucent_01",
            location = vec4(342.84, -1188.11, 29.34, 194.8),
        },
        PlayerFightingPos = vec4(338.64, -1195.68, 29.23, 257.75),
        NPCFighter = {
            model = "a_m_m_trampbeac_01",
            position = vec4(344.78, -1195.19, 29.18, 108.01),
            minHealth = 250,
            maxHealth = 450
        },
        Spectators = {
            amount = 4,
            models = {
                "a_m_o_soucent_03",
                "a_m_o_tramp_01",
                "a_m_m_soucent_01",
            }
        }
    },
    [16] = {
        Level = 1,
        EntryFee = 10,
        AllowAll = true,
        CenterPos = vec4(1680.57, 2541.88, 44.56, 139.58),
        Trainer = {
            model = "ig_rashcosvki",
            location = vec4(1686.54, 2535.32, 44.56, 81.78),
        },
        PlayerFightingPos = vec4(1682.04, 2542.67, 44.56, 136.92),
        NPCFighter = {
            model = "s_m_y_prismuscl_01",
            position = vec4(1679.46, 2539.3, 44.56, 321.5),
            minHealth = 400,
            maxHealth = 500
        },
        Spectators = {
            amount = 6,
            models = {
                "u_m_y_prisoner_01",
                "s_m_y_prismuscl_01",
                "s_m_y_prisoner_01",
            }
        }
    },
}

-- Consumables sold by the fightclub shop.
-- Table key is internal id; item is display label; amount is quantity per purchase.
Config.Shop = {
    ['bandage'] = {
        item = "Bandage",
        price = 1,
        amount = 10
    },
    ['firstaid'] = {
        item = "First Aid Kit",
        price = 1,
        amount = 3,
    }, 
}


-- Shared first aid station inside the fightclub building.
-- FirstAidItem must match your inventory item name.
-- min/max controls random amount granted/used by station logic.
Config.FirstAidStationCoords = vec3(216.293762, 131.612915, 103.044785)
Config.FirstAidItem = "firstaid"
Config.FirstAidStation = {
    min = 1,
    max = 3,
}

-- Prize scaling: how much extra the winner earns on top of the entry fee refund.
-- percent = basePercent + (rounds * roundBonus) + ((level - 1) * levelBonus)
Config.PrizeScaling = {
    basePercent = 0.10, -- 10% of entry fee
    roundBonus  = 0.05, -- +5% per round completed
    levelBonus  = 0.05, -- +5% per arena level above 1
}

-- Item used as currency for entry fees, prize payouts, and ban unblock repayments
Config.Currency = "money"

-- Soap item: earned as a random reward; used as shop currency and for unblocking bans
Config.SoapItem = "pinksoap"
-- How many soaps a banned player must hand over to get unblocked
Config.SoapUnblockCost = 100
-- Conditions for the random soap reward after a fight
Config.SoapReward = {
    minLevel = 5,   -- player must be at least this level
    chance   = 10,  -- percent chance (1-100) of receiving a soap
}

-- Tooth item: given to a player via the giveTooth event
Config.ToothItem = "tooth"

-- Optional metaden-skills integration.
-- When enabled and the resource is running, strength/stamina values are read
-- from that script's skill XP instead of QBX player metadata.
Config.SkillsIntegration = {
    enabled       = true,
    resource      = 'metaden-skills',
    -- Skill key used as "strength" (reduces KO minigame difficulty & melee modifier).
    -- Must match a key in metaden-skills Config.Skills.
    strengthSkill = 'fighting',
    -- Skill key used as "stamina" (controls stamina regen speed).
    -- Set to nil to fall back to player metadata.
    staminaSkill  = nil,
}

-- KO minigame: triggered when the player is knocked out during a fight.
-- Set 'resource' to nil to skip the minigame entirely and use 'fallback' as the result.
Config.KOMinigame = {
    resource = 'bl_ui',   -- resource that exposes the minigame export (nil = disabled)
    export   = 'KeySpam', -- export function name; called as exports[resource][export](iterations, difficulty)
    fallback = true,      -- result used when the resource is unavailable: true = auto-succeed, false = auto-fail
}

-- Stamina bar tuning
-- Note: per-frame/per-tick values depend on the loops in client logic,
-- so increase carefully to avoid overly fast regen/drain.
Config.Stamina = {
    drainPerAttack      = 10,     -- stamina lost per attack input
    blockRegenPerFrame  = 0.1,   -- stamina gained per frame while blocking
    baseRegenPerTick    = 0.03,  -- minimum regen per tick (low-stamina players)
    capRegenPerTick     = 0.2,   -- maximum regen per tick (high-stamina players)
    logScale            = 900.0, -- curve width; higher = slower ramp-up
    regenTickMs         = 50,    -- regen loop interval in ms
    regenDelayMs        = 3000,  -- ms to wait before regen begins after becoming eligible
    regenIdleGateMs     = 2000,  -- ms of idle (no attacks) required before regen is allowed
    regenStartThreshold = 40,    -- regen only kicks in below this stamina level
}


-------------------------------------------------------------------------------
-----------  TRAIN A FIGHTER  -------------------------------------------------
-------------------------------------------------------------------------------

-- NOTE: These coords are located inside the Prentiss fightclub 580 free MLO
-- https://prentiss.tebex.io/package/5157114
-- Change them if you're using a different interior or want a different location for
-- the trainer and arena.

-- Fighter management/simulation module config.
Config.Training = {}

-- One-time cost to recruit a new fighter.
Config.Training.RecruitCost = 1500
Config.Training.RecruitMoneyType = "money"
-- Optional: Set to nil to disable the extra recruit cost
Config.Training.SecondaryRecruitCost = nil
Config.Training.SecondaryRecruitMoneyType = "pinksoap"

-- If using Fight Club, should someone that has been banned
-- be able to recruit fighters?
Config.Training.AllowToRecruitIfBannedFromFightClub = false

-- NPC that opens fighter-training interactions.
Config.Training.TrainerPed = {
    model = `s_m_y_barman_01`,
    coords = vec4(215.0, 128.49, 102.86, 67.83),
}

-- Dedicated arena used for AI-vs-AI training/sparring/matches.
Config.Training.Arena = {
    studentSpawn = {
        coords = vec4(204.81, 133.58, 101.46, 289.0),
    },
    opponentSpawn = {
        coords = vec4(213.0, 137.46, 101.46, 111.1),
    },
    center = vec3(208.91, 135.45, 102.46)
}

-- Timers are in seconds.
Config.Training.RestTime = 1800                         -- seconds (30 minutes)
Config.Training.RecoveryTimeAfterMatch = 300            -- seconds (5 minutes)
Config.Training.RecoveryTimeAfterBruisedInjury = 3600   -- seconds (1 hour)
Config.Training.RecoveryTimeAfterFracturedInjury = 7200 -- seconds (2 hours)
Config.Training.RecoveryTimeAfterKOInjury = 86400       -- seconds (1 day)

-- Extra max health gained per fighter level.
Config.Training.LevelHealthIncrease = 100

-- XP granted by activity type.
Config.Training.Experience = {
    sparring = 15,
    training = 10,
    match = 30
}

-- Match simulation tuning.
Config.Training.InjuryChanceOnMatch = 10 -- 10%
Config.Training.FatiguePerMatch = 30     -- Base fatigue per match
Config.Training.MatchWinPrize = 100      -- Base prize for winning a match
Config.Training.MatchPrizeMoneyType = "black_money"

-- Passive fighter maintenance rules.
Config.Training.HoursBeforeLosingStats = 48   -- Hours before stats start to decay
Config.Training.HungerThirstIncreaseHours = 4 -- Hours before hunger and thirst increase

-- First Aid: fraction of remaining recovery time to cut when a kit is used.
-- 0.5 = 50% reduction (default), 1.0 = instant full heal.
Config.Training.FirstAidRecoveryReduction = 0.5

-- Random max-health gain range during applicable training events.
Config.Training.IncreaseHealth = {
    min = 1,
    max = 5
}

-- Candidate ped model presets used when creating fighters.
-- Each entry provides body-type variants the script can pick from.
Config.Training.FighterModelTypes = {
    -- Males
    [1] = { skinny = `a_m_y_methhead_01`, balanced = `a_m_m_beach_02`, muscular = `a_m_y_musclbeac_02`, fat = `a_m_m_genfat_01` },
    [2] = { skinny = `a_m_y_hipster_03`, balanced = `a_m_y_jetski_01`, muscular = `a_m_y_surfer_01`, fat = `a_m_m_genfat_02` },
    [3] = { skinny = `a_m_m_hillbilly_02`, balanced = `a_m_y_jetski_01`, muscular = `a_m_m_salton_01`, fat = `a_m_m_farmer_01` },
    [4] = { skinny = `a_m_o_salton_01`, balanced = `a_m_o_beach_01`, muscular = `a_m_y_acult_02`, fat = `a_m_m_beach_02` },
    [5] = { skinny = `a_m_m_salton_03`, balanced = `a_m_y_soucent_03`, muscular = `a_m_m_beach_01`, fat = `a_m_m_afriamer_01` },
    -- Females
    [6] = { skinny = `a_f_y_skater_01`, balanced = `a_f_y_eastsa_01`, muscular = `a_f_m_bodybuild_01`, fat = `a_f_m_fatcult_01` },
    [7] = { skinny = `a_f_m_skidrow_01`, balanced = `a_f_y_soucent_01`, muscular = `a_f_y_soucent_02`, fat = `a_f_m_fatbla_01` },
    [8] = { skinny = `a_f_m_trampbeac_01`, balanced = `a_f_o_genstreet_01`, muscular = `a_f_m_tourist_01`, fat = `a_f_m_tramp_01` },
}

-- Model pool used when spawning random opponent fighters.
Config.Training.OpponentModelType = {
    `a_m_m_acult_01`,
    `a_m_m_eastsa_01`,
    `a_m_m_genfat_02`,
    `a_m_m_mexcntry_01`,
    `a_m_m_polynesian_01`,
    `a_m_m_skater_01`,
    `a_m_m_tennis_01`,
    `csb_maude`,
    `g_m_importexport_01`,
    `g_m_y_azteca_01`,
    `g_m_y_mexgoon_02`
}

-- Activity templates for training sessions.
-- Positive values increase stat/resource, negative values decrease.
Config.Training.Types = {
    coords = vector3(209.41, 128.68, 102.62),
    heading = 224.38,
    cardio = {
        strength = 0,
        stamina = 2,
        speed = 1,
        fatigue = 10,
        injury_risk = 3,
        thirst = 10,
        food = 5,
        fat = -2,
        animations = {
            { dict = "amb@world_human_jog_standing@male@idle_a",       clip = "idle" },
            { dict = "move_m@joy@a",                                   clip = "walk" },
            { dict = "timetable@reunited@ig_2",                        clip = "jimmy_getknocked" },
            { dict = "anim@mp_player_intcelebrationmale@karate_chops", clip = "karate_chops" },
        }
    },
    strength = {
        strength = 2,
        stamina = 1,
        speed = 0,
        fatigue = 10,
        injury_risk = 7,
        thirst = 10,
        food = 8,
        fat = -1,
        animations = {
            { dict = "amb@world_human_push_ups@male@base",  clip = "base" },
            { dict = "amb@world_human_sit_ups@male@idle_a", clip = "idle_a" },
            { dict = "timetable@denice@ig_1",               clip = "idle_b" },
        }
    }
}

-- Food nutrition mapping used by fighter feeding logic.
-- hunger/thirst = restored needs, fat = body-fat impact, protein = muscle growth support.
Config.Training.Food = {
    burger = { hunger = 30, fat = 10, protein = 1 },
    -- Add more food items here as needed, matching your inventory item names.
}

-- Drink nutrition mapping used by fighter hydration logic.
Config.Training.Drinks = {
    sprunk = { thirst = 10, fat = 2, protein = 0 },
    water = { thirst = 35, fat = 0, protein = 0 },
    -- Add more drink items here as needed, matching your inventory item names.
}

-- Training fighter levels (separate from fightclub arena levels above)
-- Format: [level] = required_xp
Config.TrainingLevels = {
    [1] = 0,
    [2] = 150,
    [3] = 350,
    [4] = 600,
    [5] = 1000,
    [6] = 2000,
    [7] = 3500,
    [8] = 5500,
    [9] = 8000,
    [10] = 11500,
    [11] = 15500,
    [12] = 20000,
    [13] = 25000,
    [14] = 31000,
    [15] = 38000,
}
```