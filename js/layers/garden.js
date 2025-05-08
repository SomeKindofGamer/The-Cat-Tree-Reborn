addLayer("garden", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌼", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0), // Currency
        }
    },
    branches: ["cats"],
    color: "#86ff6e",
    glowColor: "green",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "flowers", // Name of prestige currency
    baseResource: "cats", // Name of resource prestige is based on
    baseAmount() { return player.cats.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: new Decimal(5), // Only needed for static layers, base of the formula (b^(x^exp))
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },

    resetDescription() {
        return "Plant all your cats for "
    },

    nextDescription() {
        return "You can plant another at "
    },

    resourceDescription() {
        return "You've planted "
    },

    effect() {
        let gardenBoost = player[this.layer].points.add(1).pow(0.75)
        let sfcap = 0.35
        if (hasUpgrade('catfood', 33)) sfcap = 0.5

        softcappedEffect = softcap(gardenBoost, new Decimal(200), sfcap)

        return softcappedEffect
    },

    effectDescription() {
        let softcapDescription = ""
        let layerEffect = tmp[this.layer].effect

        if (layerEffect.gte(new Decimal(200)) ) {
            softcapDescription = " (Softcapped)"
        }

        return "which are boosting monies by "+ format(layerEffect) + "x" + softcapDescription
    },

    canReset() {
        return (player.cats.points.gte(20) && player.catfood.points.gte(12))
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        let Generation = new Decimal(1)
        return Generation
    },

    doReset(resettingLayer) {

    },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g",
            description: "G: Perform a Garden Reset!",
            onPress(){if (canReset(this.layer)) doReset(this.layer)},
            unlocked() { return (hasMilestone('cats', 5)) },
        },
    ],
    
    layerShown() {
        let visible = false

        if (hasMilestone('cats', 5)) {
            visible = true
        }

        if (player[this.layer].points.gte(1)) {
            visible = true
        }

        return visible
    },

    milestones: {
        0: {
            requirementDescription: "Into the soil you go! (20)",
            effectDescription: "Plant your first few cats! (congrats!)",
            done() {
                return player.garden.points.gte(1)
            }
        },

        1: {
            requirementDescription: "More cat food! (40)",
            effectDescription: "Unlock 2 cat food upgrades",
            done() {
                return player.garden.points.gte(40)
            },
            unlocked() { return hasMilestone("garden", 0) },
        },

        2: {
            requirementDescription: "Garden Expansion! (100)",
            effectDescription: "Unlock Garden Upgrades",
            done() {
                return player.garden.points.gte(100)
            },
            unlocked() { return player.garden.points.gte(60) || hasMilestone("garden", 2) },
        },

        3: {
            requirementDescription: "remember cats? (200)",
            effectDescription: "Unlock more Cat Upgrades",
            done() {
                return (player.garden.points.gte(200) && hasUpgrade("garden", 12))
            },
            unlocked() { return hasUpgrade("garden", 12) || hasMilestone("garden", 3) },
        },

        4: {
            requirementDescription: "Beautiful flowers! (1,000)",
            effectDescription: "10x monies and Unlock more Cat Food Upgrades",
            done() {
                return (player.garden.points.gte(1000) && hasUpgrade("garden", 13))
            },
            unlocked() { return hasUpgrade("garden", 13) || hasMilestone("garden", 4) },
        },

        5: {
            requirementDescription: "What's that? (3,000)",
            effectDescription: "Unlock a new layer... (soon)",
            done() {
                return (player.garden.points.gte(3000) && hasUpgrade("catfood", 34))
            },
            unlocked() { return hasUpgrade("catfood", 34) || hasMilestone("garden", 5) },
        },
    },

    upgrades: {
        11: {
            title: "on that flower grind",
            description: "Flowers boost Cat Upgrade 14",

            effect() {
                let pow = new Decimal(0.2)

                return player[this.layer].points.add(1).pow(pow)
            },

            tooltip() {
                return "formula flowers^0.2"
            },

            effectDisplay() { return "flowers are boosting by: " + format(upgradeEffect(this.layer, this.id)) + "x" },
            cost: new Decimal(100),
        },

        12: {
            title: "prettier flowers",
            description: "x2 flowers gain",
            cost: new Decimal(140),
            unlocked() { return (hasUpgrade('garden', 11)) },
        },

        13: {
            title: "ultimate planting",
            description: "keep cat upgrades on reset",
            cost: new Decimal(350),
            unlocked() { return (hasUpgrade('garden', 12)) },
        },
    },

    infoboxes:{
        stuff: {
            title: "The Garden!",
            body() { 
                let desc = "Welcome to The Garden! You can plant your cats here to unlock milestones which unlock more content! This layer is not connected to Cat Food so it won't reset cat food only cats. You'll keep all your Cat Milestones but you'll lose all your cat upgrades. You can only reset once you've reached 20 cats and 12 cat food."
                return desc
            },
        },

        softcap: {
            title: "Garden Softcap!",
            body() { 
                let desc = "You've reached the softcap. This is here so you just dont get infinite flowers for infinite monies. In the future there will be upgrades where you can lower the softcap effect. Currently theres only one in Cat Food."
                return desc
            },
            unlocked() {
                let unlocked = false
                let layerEffect = tmp[this.layer].effect

                if (layerEffect.gte(new Decimal(200))) {
                    unlocked = true
                }

                return unlocked
            }   
        }
    },

    tabFormat: {
        "Garden": {
            content: ["main-display",
                "garden-prestige-button",
                "blank",
                "milestones",
                "blank",
                "blank",
                ["infobox", "stuff"],
                "blank",
                "blank",
                ["infobox", "softcap"],
                "blank",
                "blank",
            ]
        },

        "Upgrades": {
            content: ["main-display",
                "resource-display",
                "garden-prestige-button",
                "blank",
                "upgrades",
            ],
            unlocked() {
                return hasAchievement('a', 31)
            }
        },
    }
})
