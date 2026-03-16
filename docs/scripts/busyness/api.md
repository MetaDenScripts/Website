# Busyness API Reference

## Commands

| Command | Permission | Description |
|---|---|---|
| `/businesspanel` | Employee of a configured business | Opens the business management UI for the caller's current job |
| `/busynessadmin` | `metaden.busyness.admin` | Opens the admin oversight UI |

---

## Configuration Reference

All configuration lives in `config.lua`.

### General

| Key | Description |
|---|---|
| `Config.Debug` | Enables extra debug output and zone helpers |
| `Config.ResourceName` | Resource name used by the NUI bridge and callbacks |

### Management UI (`Config.Management`)

| Key | Description |
|---|---|
| `Command` | Command used to open the employee/manager UI |
| `MaxLogRows` | Maximum recent rows returned to the management UI |
| `Target` | ox_target interaction settings for management access points |

### Storefront Ped (`Config.StorePed`)

| Key | Description |
|---|---|
| `SpawnRadius` | Outer radius where storefront ped tracking starts |
| `SpawnDistance` | Distance required before the ped actually spawns |
| `MaxPlacementDistance` | Maximum distance from the business management point where the storefront ped can be saved |
| `InteractionDistance` | Distance required to interact with the storefront ped |
| `DefaultModel` | Fallback storefront ped model |
| `Scenario` | Idle scenario used by the storefront ped |
| `PreviewDistance` | Placement preview distance in front of the player |
| `Target` | ox_target settings for public shopping interactions |

### Billing Registers (`Config.Registers`)

| Key | Description |
|---|---|
| `MaxPlacementDistance` | Maximum distance from the business placement origin where a register may be saved |
| `MarkerDistance` | Range where the nearby register marker helper remains visible |
| `Preview` | Aim-based placement preview settings for the admin placement tool |
| `Target` | Shared employee/customer ox_target area settings for register interactions |
| `Billing` | Rules for nearby target detection, open-bill limits, and description length |

### Billing Register Preview (`Config.Registers.Preview`)

| Key | Description |
|---|---|
| `RayDistance` | Maximum distance checked by the placement preview ray |
| `ImpactSize` | Preview impact-dot size |
| `SphereSize` | Preview sphere size for the placement helper |
| `DiscSize` | Preview ground-disc size for the placement helper |

### Billing Register Target (`Config.Registers.Target`)

| Key | Description |
|---|---|
| `Radius` | Register interaction area radius |
| `Distance` | ox_target interaction distance once inside the area |
| `EmployeeIcon` | ox_target icon shown for employee bill creation |
| `EmployeeLabel` | ox_target label shown for employee bill creation |
| `CustomerIcon` | ox_target icon shown for customer bill payment |
| `CustomerLabel` | ox_target label shown for customer bill payment |

### Billing Rules (`Config.Registers.Billing`)

| Key | Description |
|---|---|
| `NearbyPlayerDistance` | Max distance used to build the employee bill-target list |
| `AllowMultipleOpenBillsPerTarget` | Allows multiple open bills for the same customer at one register when true |
| `MaxDescriptionLength` | Maximum description length stored for a bill and audit row |

### Admin (`Config.Admin`)

| Key | Description |
|---|---|
| `Command` | Command used to open the admin panel |
| `AcePermission` | ACE permission required for admin access |
| `MaxLogRows` | Maximum audit rows returned to the admin panel |

### NPC Customer Loop

| Key | Description |
|---|---|
| `Config.CustomerSpawnInterval` | Time between customer spawn attempts |
| `Config.MaxCustomers` | Maximum active customers per business |
| `Config.CustomerLifetime` | How long a spawned customer can exist |
| `Config.WaveDistance` | Range where customers wave at nearby employees |
| `Config.InteractionDistance` | Target interaction distance for NPC customers |

### NPC Order Generation (`Config.CustomerOrder`)

| Key | Description |
|---|---|
| `MinItems` | Minimum unique items per generated order |
| `MaxItems` | Maximum unique items per generated order |
| `MinQuantity` | Minimum quantity per item |
| `MaxQuantity` | Maximum quantity per item |

### Delivery Orders (`Config.DeliveryOrders`)

| Key | Description |
|---|---|
| `MaxActive` | Maximum active delivery orders per business |
| `RefillIntervalMinutes` | Minutes between new slots once the board drops below cap |
| `DeliveryFeePercent` | Fee percent added on top of item subtotal |
| `SpawnRadius` | Recipient ped tracking radius |
| `SpawnDistance` | Distance before the delivery recipient ped spawns |
| `RecipientScenario` | Idle scenario used by the recipient ped |
| `Target` | ox_target settings for completing a delivery |
| `Reward` | Employee reward type for deliveries (`money` or `item`) |
| `DistanceBonus` | Optional extra payout for longer routes |
| `Destinations` | Global fallback dropoff list |

### Delivery Distance Bonus (`Config.DeliveryOrders.DistanceBonus`)

| Key | Description |
|---|---|
| `Enabled` | Enables distance-based bonus payout |
| `MinimumDistance` | No bonus is paid until this distance is exceeded |
| `DistanceStep` | Additional distance required per bonus step |
| `BonusPerStep` | Amount paid for each extra distance step |
| `MaxBonus` | Cap for bonus payout (`0` disables the cap) |
| `UseZ` | Includes height in distance calculations when true |

### Business Defaults (`Config.BusinessDefaults`)

| Key | Description |
|---|---|
| `NpcEnabled` | Default NPC customer state for newly seeded businesses |
| `EmployeePayoutPercent` | Default in-house employee sale percentage |
| `MinStockGrade` | Default minimum grade for stocking |
| `MinWithdrawGrade` | Default minimum grade for withdrawals |
| `MinManageGrade` | Default minimum grade for management |
| `MaxCustomers` | Default max customer count for seeded businesses |

### Business Entries (`Config.Businesses`)

Each entry in `Config.Businesses` seeds one business and acts as the static source for world placement plus default item data. After seeding, the live item catalog is managed in the database and can be changed from the admin panel.

| Field | Type | Description |
|---|---|---|
| `name` | string | Stable internal business key |
| `label` | string | UI-facing business name |
| `job` | string | QBX job assigned to the business |
| `coords` | `vec3` | Main NPC-customer service point |
| `managementCoords` | `vec3` | Management panel interaction point |
| `heading` | number | Default heading for the business area |
| `storePedModel` | string | Default storefront ped model for this business |
| `spawnPoints` | table | NPC customer spawn positions |
| `path` | table | Optional NPC walk path toward the counter |
| `deliveryDestinations` | table | Optional per-business dropoff override list |
| `items` | table | Seed list of default sale items and price caps |

Notes:
- Admins can add, edit, hide, and delete business catalog items from `/busynessadmin`.
- New catalog entries must already exist in the inventory system configured through `metabridge`; this resource does not create item definitions.
- Removing an item from `Config.Businesses.items` no longer deletes the live database row for an existing business.

Minimal example:

```lua
Config.Businesses = {
    {
        name = 'yourbusiness',
        label = 'Your Business',
        job = 'yourbusiness',
        storePedModel = 's_f_y_shop_mid',
        coords = vec3(x, y, z),
        managementCoords = vec3(x, y, z),
        heading = 120.0,
        spawnPoints = {
            vec3(x1, y1, z1),
            vec3(x2, y2, z2)
        },
        path = {
            vec4(x, y, z, heading)
        },
        deliveryDestinations = {},
        items = {
            { name = 'item_name', label = 'Item Label', defaultPrice = 15, maxPrice = 25 },
            { name = 'another_item', label = 'Another Item', defaultPrice = 8, maxPrice = 15 }
        }
    }
}
```


---

## Server Exports

### `GetPayoutSplit(businessName, total, mode)`

Calculates the payout split for a business without applying any money, item, or log changes.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `businessName` | string | Business key from `Config.Businesses` |
| `total` | number | Gross sale or delivery total |
| `mode` | string | `normal` for the configured employee split, `inverse` for delivery-style inversion |

**Returns**

```lua
{
    mode = 'normal' or 'inverse',
    employeeShare = number,
    businessShare = number,
    employeeSharePercent = number,
    businessSharePercent = number,
}
```

Example:

```lua
local split = exports['metaden-busyness']:GetPayoutSplit('burgershot', 250, 'inverse')
```

---

### `ApplyPayoutSplit(source, businessName, total, options)`

Applies a payout split through the shared server path. This updates employee payout, business totals, employee cash tracking, and audit logs using the same logic as built-in NPC sales and delivery completions.

**Core options**

| Key | Type | Description |
|---|---|---|
| `mode` | string | `normal` or `inverse` |
| `action` | string | Log action to write, for example `served`, `delivery`, or a custom action |
| `sourceType` | string | Log source label, for example `npc`, `delivery`, or `custom` |
| `items` | table | Optional Lua table written to `itemsJson` |
| `itemsJson` | string | Optional pre-encoded JSON payload for the log |
| `reward` | table | Reward definition for the employee share |
| `rewardReason` | string | Reason string passed into QBX money payout calls |
| `servedCustomersDelta` | number | Optional served customer increment |
| `rejectedCustomersDelta` | number | Optional rejected customer increment |
| `broadcast` | boolean | Set `false` to suppress immediate business update broadcast |
| `skipLog` | boolean | Set `true` to skip inserting a customer log row |

**Reward definition**

```lua
reward = {
    type = 'money' or 'item',
    moneyType = 'cash',
    itemName = 'money',
    label = 'cash'
}
```

Example:

```lua
local result = exports['metaden-busyness']:ApplyPayoutSplit(source, 'burgershot', 250, {
    mode = 'normal',
    action = 'served',
    sourceType = 'custom',
    reward = {
        type = 'money',
        moneyType = 'cash',
        label = 'cash',
    },
    items = {
        { name = 'burger', quantity = 2, price = 25 }
    }
})
```

---

## Server Callbacks

Registered through `ox_lib` and typically consumed client-side with `lib.callback.await`.

### Public and Employee Callbacks

| Name | Purpose |
|---|---|
| `metaden-busyness:server:getBusinessState` | Returns public state for a single business |
| `metaden-busyness:server:getManagementUiData` | Returns the business management payload for an employee |
| `metaden-busyness:server:getRegisterBillingUiData` | Returns register billing UI data for an employee at a specific register |
| `metaden-busyness:server:createRegisterBill` | Creates a new register bill for a nearby customer |
| `metaden-busyness:server:getRegisterPaymentUiData` | Returns open register bills for the caller at a specific register |
| `metaden-busyness:server:payRegisterBill` | Pays an open register bill with cash or card |
| `metaden-busyness:server:dismissRegisterBill` | Dismisses an open register bill from the employee or customer flow |
| `metaden-busyness:server:acceptDeliveryOrder` | Accepts a delivery order for the caller |
| `metaden-busyness:server:dismissDeliveryOrder` | Dismisses a pending or self-assigned delivery order |
| `metaden-busyness:server:completeDeliveryOrder` | Validates inventory, pays the employee split, logs the delivery, and updates the board |
| `metaden-busyness:server:getPublicStoreUiData` | Returns storefront UI data for a placed public store ped |
| `metaden-busyness:server:createCustomerOrder` | Generates a server-owned NPC customer order |
| `metaden-busyness:server:updatePayouts` | Updates the configured employee payout percent |
| `metaden-busyness:server:updatePermissions` | Updates business grade thresholds |
| `metaden-busyness:server:toggleNpc` | Enables or disables NPC traffic for a business |
| `metaden-busyness:server:updateSalePrice` | Updates a live item sale price |
| `metaden-busyness:server:toggleMenuItem` | Toggles an item on or off the live storefront menu |
| `metaden-busyness:server:saveStorePedPlacement` | Saves storefront ped placement from the employee UI |
| `metaden-busyness:server:clearStorePedPlacement` | Clears storefront ped placement |
| `metaden-busyness:server:depositStock` | Moves player inventory into business stock |
| `metaden-busyness:server:withdrawFunds` | Withdraws business funds subject to permissions and employee balances |
| `metaden-busyness:server:purchaseStoreItems` | Handles public storefront purchases |

### Admin Callbacks

| Name | Purpose |
|---|---|
| `metaden-busyness:server:getAdminUiData` | Returns the admin oversight payload |
| `metaden-busyness:server:adminCreateItem` | Admin-only item catalog create |
| `metaden-busyness:server:adminUpdateItem` | Admin-only item settings update |
| `metaden-busyness:server:adminDeleteItem` | Admin-only item catalog delete |
| `metaden-busyness:server:adminUpdateBusiness` | Admin-only business settings update |
| `metaden-busyness:server:adminSaveStorePedPlacement` | Admin storefront ped placement override |
| `metaden-busyness:server:adminClearStorePedPlacement` | Admin storefront ped clear action |
| `metaden-busyness:server:adminSaveRegisterPlacement` | Admin register placement or move action |
| `metaden-busyness:server:adminClearRegisterPlacement` | Admin register clear action |

---

## Server Events

### `metaden-busyness:server:handleCustomerDecision` _(client → server)_

Completes or rejects a generated NPC customer order.

| Parameter | Type | Description |
|---|---|---|
| `customerId` | number | Client-side customer identifier |
| `orderId` | string | Generated server order key |
| `action` | string | `served` or `rejected` |

---

### `metaden-busyness:server:applyPayoutSplit` _(server → server)_

Reusable internal event for other server resources to apply a payout split through the same shared logic used by busyness. This is intentionally server-only and is not registered as a client-callable net event.

| Parameter | Type | Description |
|---|---|---|
| `employeeSource` | number | Server player ID to receive the employee share |
| `businessName` | string | Target business key |
| `total` | number | Gross amount to split |
| `options` | table | Same options accepted by `ApplyPayoutSplit` |

Example:

```lua
TriggerEvent('metaden-busyness:server:applyPayoutSplit', source, 'burgershot', 250, {
    mode = 'inverse',
    action = 'delivery',
    sourceType = 'custom_delivery',
    reward = {
        type = 'money',
        moneyType = 'cash',
        label = 'cash',
    }
})
```

---

### `metaden-busyness:server:payoutSplitApplied` _(server event)_

Fired after `metaden-busyness:server:applyPayoutSplit` runs.

| Parameter | Type | Description |
|---|---|---|
| `employeeSource` | number | Server player ID passed into the apply event |
| `businessName` | string | Business key |
| `total` | number | Gross amount passed into the apply event |
| `options` | table | Original options table |
| `result` | table | Result payload returned by the shared payout applier |


---

## Database Tables

The resource manages the following tables automatically:

| Table | Purpose |
|---|---|
| `md_busyness_businesses` | Core business state, payouts, balances, and storefront placement |
| `md_busyness_items` | Allowed items, price caps, live price, stock, and menu state |
| `md_busyness_customer_logs` | NPC sales, player store sales, register sales, delivery logs, dismissals, and enriched payment/reference metadata |
| `md_busyness_withdraw_logs` | Business withdrawal history |
| `md_busyness_registers` | Persistent per-business billing register placement and labels |
| `md_busyness_bills` | Open, paid, and dismissed bills tied to specific registers and customers |
| `md_busyness_employee_cash` | Employee earned totals, paid cash totals, withdrawable balance, and withdrawals |
