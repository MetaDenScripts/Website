# Skills Configuration

```lua
Config = {
    -- Enable extra client/server logging where supported.
    debug = false,

    -- Register local tailoring helper commands:
    -- /tailor_toggle_cloth, /tailor_dump, /tailor_capture_cloth
    EnableClothingCommands = false,

    -- Interaction mode switches:
    -- true  = custom proximity markers + custom NUI flow
    -- false = fallback to metabridge target wrappers
    UseCustomInteractionUI = true,

    -- When target wrappers are active, controls whether selecting a target opens
    -- the custom NUI panels (`true`) or only proximity/key prompt flow (`false`).
    UseTargetInteractionUI = true,

    -- Vehicle model used for delivery vans (any valid GTA/FiveM spawn name).
    VanModel = 'speedo',

    -- Main recipe catalog used by tailor UI/crafting logic.
    -- Category keys are shown as tabs/sections in UI.
    TailorRecipes = {
        -- Recipe entry schema reference:
        -- name      = unique internal id
        -- title     = label shown in UI
        -- price     = craft cost (if your server integration uses it)
        -- level     = minimum tailor level
        -- duration  = craft time in milliseconds
        -- required  = array of { item, amount }
        -- reward    = array of { item, amount, experience }
        -- clothing  = optional array of component/prop appearance mappings
        Tops = {
            {
                name = 'basic_tshirt',       -- Output item name
                title = 'Basic T-shirt',     -- Display name for the menu
                duration = 5000,             -- Time to craft in ms (5 seconds)
                level = 0,                   -- Crafting level required
                price = 60,                  -- 35 price of craft + 5 as reward
                required = {
                    { item = 'cotton',    amount = 3 },
                    { item = 'thread',    amount = 2 },
                    { item = 'polyester', amount = 5 },
                    { item = 'acrylic',   amount = 2 }
                },
                reward = {
                    { item = 'basic_tshirt', amount = 1, experience = 10 }
                },
                -- Optional clothing metadata used by the clothes equip system.
                -- Resource owners should set correct component/prop ids and drawable/texture values.
                clothing = {
                    {
                        type = 'component', -- 'component' for ped components, 'prop' for prop indices
                        component = 11,     -- ped component slot (e.g., 11 = tops/torso)
                        -- male/female variants are supported; fallback to `drawable` if not provided
                        male = { drawable = 1, texture = 0 },
                        female = { drawable = 3, texture = 0 }
                    }
                }
            },
            {
                name = 'black_shirt',
                title = 'Black Shirt',
                duration = 5000,
                level = 0,
                price = 60,
                required = {
                    { item = 'cotton',    amount = 3 },
                    { item = 'thread',    amount = 2 },
                    { item = 'polyester', amount = 5 },
                    { item = 'acrylic',   amount = 2 }
                },
                reward = {
                    { item = 'black_shirt', amount = 1, experience = 10 }
                },
                clothing = {
                    {
                        type = 'component',
                        component = 11,
                        male = { drawable = 1, texture = 0 },
                        female = { drawable = 3, texture = 0 }
                    }
                }
            },
            {
                name = 'basic_singlet',
                title = 'Basic Singlet',
                price = 55,
                level = 0,
                duration = 5000,
                required = {
                    { item = 'cotton',    amount = 2 },
                    { item = 'thread',    amount = 1 },
                    { item = 'polyester', amount = 3 },
                    { item = 'acrylic',   amount = 1 }
                },
                reward = {
                    { item = 'basic_singlet', amount = 1, experience = 10 }
                },
                clothing = {
                    {
                        type = 'component', -- 'component' for ped components, 'prop' for prop indices
                        component = 11,     -- ped component slot (e.g., 11 = tops/torso)
                        -- male/female variants are supported; fallback to `drawable` if not provided
                        male = { drawable = 5, texture = 0 },
                        female = { drawable = 3, texture = 0 }
                    }
                }
            },
            {
                name = "basic_blouse",
                title = "Basic Blouse",
                price = 77,
                level = 1,
                duration = 5000,
                required = {
                    { item = 'cotton',    amount = 3 },
                    { item = 'wool',      amount = 3 },
                    { item = 'polyester', amount = 5 },
                    { item = 'acrylic',   amount = 2 },
                    { item = 'thread',    amount = 2 }
                },
                reward = {
                    { item = 'basic_blouse', amount = 1, experience = 15 }
                }
            },
            {
                name = 'basic_sweatshirt',
                title = 'Basic Sweatshirt',
                price = 67,
                level = 2,
                duration = 8000,
                required = {
                    { item = 'cotton',    amount = 3 },
                    { item = 'wool',      amount = 3 },
                    { item = 'polyester', amount = 5 },
                    { item = 'thread',    amount = 1 }
                },
                reward = {
                    { item = 'basic_sweatshirt', amount = 1, experience = 15 }
                },
                clothing = {
                    {
                        type = 'component', -- 'component' for ped components, 'prop' for prop indices
                        component = 11,     -- ped component slot (e.g., 11 = tops/torso)
                        -- male/female variants are supported; fallback to `drawable` if not provided
                        male = { drawable = 86, texture = 2 },
                        female = { drawable = 3, texture = 0 }
                    }
                }
            },
            {
                name = "basic_blazer",
                title = "Basic Blazer",
                price = 77,
                level = 3,
                duration = 10000,
                required = {
                    { item = 'cotton',    amount = 3 },
                    { item = 'wool',      amount = 3 },
                    { item = 'polyester', amount = 5 },
                    { item = 'acrylic',   amount = 2 },
                    { item = 'thread',    amount = 4 }
                },
                reward = {
                    { item = 'basic_blazer', amount = 1, experience = 20 }
                },
                clothing = {
                    {
                        type = 'component', -- 'component' for ped components, 'prop' for prop indices
                        component = 11,     -- ped component slot (e.g., 11 = tops/torso)
                        -- male/female variants are supported; fallback to `drawable` if not provided
                        male = { drawable = 24, texture = 4 },
                        female = { drawable = 3, texture = 0 }
                    }
                }
            },
            {
                name = "basic_shirt",
                title = "Basic Shirt",
                price = 72,
                level = 3,
                duration = 10000,
                required = {
                    { item = 'cotton',    amount = 5 },
                    { item = 'wool',      amount = 3 },
                    { item = 'polyester', amount = 2 },
                    { item = 'acrylic',   amount = 2 },
                    { item = 'thread',    amount = 1 }
                },
                reward = {
                    { item = 'basic_shirt', amount = 1, experience = 20 }
                },
                clothing = {
                    {
                        type = 'component',
                        component = 11,
                        male = { drawable = 12, texture = 0 },
                        female = { drawable = 3, texture = 0 }
                    }
                }
            },
            {
                name = "suburban_dress",
                title = "Suburban Dress",
                price = 112,
                level = 5,
                duration = 15000,
                required = {
                    { item = 'cupro',  amount = 5 },
                    { item = 'fiber',  amount = 4 },
                    { item = 'linen',  amount = 2 },
                    { item = 'silk',   amount = 2 },
                    { item = 'thread', amount = 2 }

                },
                reward = {
                    { item = 'suburban_dress', amount = 1, experience = 25 }
                }
            },
            {
                name = "suburban_tshirt",
                title = "Suburban T-shirt",
                price = 87,
                level = 6,
                duration = 15000,
                required = {
                    { item = 'cotton',  amount = 5 },
                    { item = 'cupro',   amount = 3 },
                    { item = 'spandex', amount = 2 },
                    { item = 'thread',  amount = 1 }
                },
                reward = {
                    { item = 'suburban_tshirt', amount = 1, experience = 30 }
                }
            },
            {
                name = "suburban_shirt",
                title = "Suburban Shirt",
                price = 122,
                level = 6,
                duration = 15000,
                required = {
                    { item = 'cupro',  amount = 5 },
                    { item = 'wool',   amount = 3 },
                    { item = 'thread', amount = 2 }
                },
                reward = {
                    { item = 'suburban_shirt', amount = 1, experience = 30 }
                }
            },
            {
                name = "suburban_sweatshirt",
                title = "Suburban Sweatshirt",
                price = 102,
                level = 7,
                duration = 15000,
                required = {
                    { item = 'cotton',  amount = 15 },
                    { item = 'thread',  amount = 3 },
                    { item = 'acrylic', amount = 2 }
                },
                reward = {
                    { item = 'suburban_sweatshirt', amount = 1, experience = 35 }
                }
            },
            {
                name = "suit_shirt",
                title = "Suit Shirt",
                price = 120,
                level = 8,
                duration = 15000,
                required = {
                    { item = 'cupro',   amount = 2 },
                    { item = 'silk',    amount = 4 },
                    { item = 'lyocell', amount = 2 },
                    { item = 'fiber',   amount = 2 },
                    { item = 'thread',  amount = 2 }

                },
                reward = {
                    { item = 'suit_shirt', amount = 1, experience = 40 }
                }
            },
            {
                name = "suit_waistcoats",
                title = "Waistcoat",
                price = 120,
                level = 9,
                duration = 15000,
                required = {
                    { item = 'cupro',        amount = 5 },
                    { item = 'silk',         amount = 5 },
                    { item = 'metal_bobbin', amount = 2 }
                },
                reward = {
                    { item = 'suit_waistcoats', amount = 1, experience = 45 }
                }

            },
            {
                name = "suit_jacket",
                title = "Suit Jacket",
                price = 165,
                level = 9,
                duration = 15000,
                required = {
                    { item = 'cashmere', amount = 5 },
                    { item = 'linen',    amount = 3 },
                    { item = 'lyocell',  amount = 2 },
                    { item = 'fiber',    amount = 2 },
                    { item = 'thread',   amount = 2 }
                },
                reward = {
                    { item = 'suit_jacket', amount = 1, experience = 45 }
                }
            }
        },
        Bottoms = {
            {
                name = 'basic_shorts',
                title = 'Basic Shorts',
                price = 55,
                level = 1,
                duration = 5000,
                required = {
                    { item = 'cotton',  amount = 3 },
                    { item = 'thread',  amount = 1 },
                    { item = 'spandex', amount = 1 }
                },
                reward = {
                    { item = 'basic_shorts', amount = 1, experience = 10 }
                },
                clothing = {
                    {
                        type = 'component',
                        component = 4,
                        male = { drawable = 15, texture = 0 },
                        female = { drawable = 14, texture = 0 }
                    }
                }
            },
            {
                name = 'basic_jeans',
                title = 'Basic Jeans',
                price = 58,
                level = 2,
                duration = 8000, -- Crafting takes longer for jeans
                required = {
                    { item = 'cotton',  amount = 3 },
                    { item = 'thread',  amount = 3 },
                    { item = 'spandex', amount = 1 }
                },
                reward = {
                    { item = 'basic_jeans', amount = 1, experience = 15 }
                },
                clothing = {
                    {
                        type = 'component',
                        component = 4,
                        male = { drawable = 10, texture = 0 },
                        female = { drawable = 2, texture = 0 }
                    }
                }
            },
            {
                name = "suburban_short",
                title = "Suburban Short",
                price = 65,
                level = 5,
                duration = 15000,
                required = {
                    { item = 'cotton',    amount = 3 },
                    { item = 'thread',    amount = 3 },
                    { item = 'spandex',   amount = 2 },
                    { item = 'polyester', amount = 2 },
                },
                reward = {
                    { item = 'suburban_short', amount = 1, experience = 25 }
                },
                clothing = {
                    {
                        type = 'component',
                        component = 4,
                        male = { drawable = 17, texture = 0 },
                        female = { drawable = 16, texture = 0 }
                    }
                }
            },
            {
                name = "suburban_skirt",
                title = "Suburban Skirt",
                price = 65,
                level = 6,
                duration = 15000,
                required = {
                    { item = 'lyocell', amount = 3 },
                    { item = 'thread',  amount = 1 },
                    { item = 'spandex', amount = 1 }
                },
                reward = {
                    { item = 'suburban_skirt', amount = 1, experience = 30 }
                },
                clothing = {
                    {
                        type = 'component',
                        component = 4,
                        female = { drawable = 15, texture = 0 }
                    }
                }
            },
            {
                name = "suburban_jogger",
                title = "Suburban Jogger",
                price = 78,
                level = 6,
                duration = 15000,
                required = {
                    { item = 'cotton',       amount = 3 },
                    { item = 'metal_bobbin', amount = 3 },
                    { item = 'spandex',      amount = 1 }
                },
                reward = {
                    { item = 'suburban_jogger', amount = 1, experience = 25 }
                },
                clothing = {
                    {
                        type = 'component',
                        component = 4,
                        male = { drawable = 5, texture = 0 },
                        female = { drawable = 4, texture = 0 }
                    }
                }
            },
        },
        Accessories = {
            {
                name = "wallet",
                title = "Wallet",
                price = 70,
                level = 1,
                duration = 5000,
                required = {
                    { item = 'leather', amount = 1 },
                    { item = 'thread',  amount = 1 },
                },
                reward = {
                    { item = 'wallet', amount = 1, experience = 15 }
                }
            },
            {
                name = "leather_gloves",
                title = "Leather Gloves",
                price = 70,
                level = 2,
                duration = 8000,
                required = {
                    { item = 'leather',      amount = 1 },
                    { item = 'metal_bobbin', amount = 1 },
                },
                reward = {
                    { item = 'leather_gloves', amount = 1, experience = 15 }
                },
                clothing = {
                    {
                        type = 'component',
                        component = 3,
                        male = { drawable = 5, texture = 0 },
                        female = { drawable = 5, texture = 0 }
                    }
                }
            },
            {
                name = "mask",
                title = "Black Mask",
                price = 67,
                level = 4,
                duration = 10000,
                required = {
                    { item = 'cotton',  amount = 3 },
                    { item = 'thread',  amount = 2 },
                    { item = 'spandex', amount = 1 }
                },
                reward = {
                    { item = 'mask', amount = 1, experience = 20 }
                }
                ,
                clothing = {
                    {
                        type = 'component',
                        component = 1, -- head/face component (adjust as needed)
                        male = { drawable = 15, texture = 0 },
                        female = { drawable = 14, texture = 0 }
                    }
                }
            },
            {
                name = 'driving_gloves',
                title = 'Black Driving Gloves',
                price = 120,
                level = 6,
                duration = 15000,
                required = {
                    { item = 'leather',      amount = 5 },
                    { item = 'metal_bobbin', amount = 1 },
                    { item = 'thread',       amount = 2 },
                    { item = 'hemp',         amount = 5 }
                },
                reward = {
                    { item = 'driving_gloves', amount = 1, experience = 30 }
                }
                ,
                clothing = {
                    {
                        type = 'component',
                        component = 3, -- arms/gloves component (adjust to server values)
                        male = { drawable = 5, texture = 0 },
                        female = { drawable = 5, texture = 0 }
                    }
                }
            },
        },
        Materials = {
            {
                name = 'cotton',
                title = 'Recycled Cotton',
                level = 0,
                duration = 5000,
                required = {
                    { item = 'old_rag', amount = 5 }
                },
                reward = {
                    { item = 'cotton', amount = 1, experience = 5 }
                }
            },
            {
                name = 'thread',
                title = 'Thread Bobbin',
                level = 0,
                duration = 5000,
                required = {
                    { item = 'cotton',  amount = 2 },
                    { item = 'plastic', amount = 1 }
                },
                reward = {
                    { item = 'thread', amount = 1, experience = 5 }
                }
            },
            {
                name = 'leather',
                title = 'Leather',
                level = 1,
                duration = 5000,
                required = {
                    { item = 'skin', amount = 3 }
                },
                reward = {
                    { item = 'leather', amount = 1, experience = 5 }
                }
            },
            {
                name = 'rope_reel',
                title = 'Rope Reel',
                level = 2,
                duration = 5000,
                required = {
                    { item = 'jute',    amount = 5 },
                    { item = 'plastic', amount = 3 }
                },
                reward = {
                    { item = 'rope_reel', amount = 1, experience = 5 }
                }
            },
            {
                name = 'metal_bobbin',
                title = 'Metal Bobbin',
                level = 3,
                duration = 5000,
                required = {
                    { item = 'metalscrap', amount = 3 },
                    { item = 'steel',      amount = 5 },
                    { item = 'plastic',    amount = 3 }
                },
                reward = {
                    { item = 'metal_bobbin', amount = 1, experience = 5 }
                }
            },
        }
    },

    -- XP thresholds per level.
    -- Example: reaching level 5 requires 50,000 total XP.
    Levels = {
        [0] = 0,
        [1] = 1500,
        [2] = 4000,
        [3] = 8000,
        [4] = 10000,
        [5] = 20000,
        [6] = 30000,
        [7] = 100000,
        [8] = 150000,
        [9] = 200000,
        [10] = 230000,
        [11] = 320000,
        [12] = 420000,
        [13] = 600000,
        [14] = 800000,
        [15] = 1000000
    },

    -- Material shop/price list (used by UI and related purchase flows).
    Materials = {
        { name = 'acrylic',   label = 'Acrylic',      price = 3 },
        { name = 'cashmere',  label = 'Cashmere',     price = 20 },
        { name = 'cotton',    label = 'Cotton',       price = 2 },
        { name = 'cupro',     label = 'Cupro',        price = 8 },
        { name = 'fiber',     label = 'Fiber',        price = 2 },
        { name = 'hemp',      label = 'Hemp',         price = 12 },
        { name = 'jute',      label = 'Jute',         price = 6 },
        { name = 'linen',     label = 'Linen',        price = 4 },
        { name = 'lyocell',   label = 'Lyocell',      price = 7 },
        { name = 'polyester', label = 'Polyester',    price = 1 },
        { name = 'silk',      label = 'Silk', price = 10 },
        { name = 'spandex',   label = 'Spandex',      price = 3 },
        { name = 'wool',      label = 'Wool',         price = 5 }
    },

    -- Delivery job pickup points (randomly selected by delivery flow).
    OrderPickupLocation = {
        vec4(827.84, -3203.8, 4.94, 168.96),
        vec4(1233.48, -3326.1, 4.53, 177.67),
        vec4(-52.75, 6396.52, 30.49, 38.85),
        vec4(903.31, 3586.51, 32.41, 5.58),
        vec4(858.68, -2365.92, 29.35, 359.75),
        vec4(859.84, -2497.07, 27.32, 89.4),
    },

    -- Van spawn when a delivery route begins.
    VanSpawnLocation = vec4(748.8, -971.63, 24.76, 276.19),

    -- Return/check-in location used to finish the route and clean up.
    ReturnSpawnLocation = vec3(748.8, -971.63, 24.76),

    -- Delivery drop-off points (one or more selected during route generation).
    DeliveryLocations = {
        vec4(429.42, -807.95, 29.49, 2.17),
        vec4(71.63, -1391.93, 29.38, 170.54),
        vec4(-823.41, -1069.85, 11.33, 131.09),
        vec4(-1102.76, 2714.47, 19.11, 320.18),
        vec4(1198.13, 2713.89, 38.22, 274.45),
        vec4(1697.83, 4821.66, 42.06, 191.83),
        vec4(6.16, 6508.52, 31.88, 122.42),


    },
    -- Quantity objective range per delivery order.
    DeliveryAmountMin = 5,  -- items
    DeliveryAmountMax = 30, -- items

    -- XP reward range granted on delivery completion.
    DeliveryRewardMin = 70, -- exp
    DeliveryRewardMax = 180, -- exp

    -- Reputation tuning.
    DeliveryRep = {
        maxRep = 1000
    },

    DeliveryPayment = {
        -- Payment routing for delivery completion.
        -- Supported methods: 'event', 'bank', 'item'
        --   event = trigger configured event payload
        --   bank  = direct account-style payout (depends on bridge impl)
        --   item  = grant item currency using `itemName`
        method = 'event',
        reason = 'Tailor Delivery',

        -- Used only when method = 'item'.
        itemName = 'money',

        -- Optional business identifier used in event templates.
        business = 'tailor',

        -- Primary event invoked when method = 'event'.
        -- Placeholders are replaced by runtime values:
        -- {playerId}, {amount}, {reason}, {business}
        event = {
            name = 'payckecks:addToPaycheck',
            args = { '{playerId}', '{amount}', '{reason}' }
        },

        -- Optional follow-up events executed after the primary payout.
        extraEvents = {
            {
                name = 'businessAccount:server:WithdrawFromBusinessAccount',
                args = { '{amount}', '{business}', 'Salary Paid' }
            }
        }
    }
}
```
