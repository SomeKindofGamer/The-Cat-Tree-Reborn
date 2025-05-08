addLayer("catfood", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🥫", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0), // Currency
        }
    },
    branches: ["cats"],
    color: "#ff7575",
    glowColor: "red",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "cat food", // Name of prestige currency
    baseResource: "cats", // Name of resource prestige is based on
    baseAmount() { return player.cats.points }, // Get the current amount of baseResource
    type: "catfood", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: new Decimal(1), // Only needed for static layers, base of the formula (b^(x^exp))
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        let Generation = new Decimal(3.803)
        if (player[this.layer].points.gte(2)) {
            Generation = new Decimal(4.1205)
        }

        if (player[this.layer].points.gte(3)) {
            Generation = new Decimal(4.4245)
        }

        if (player[this.layer].points.gte(3)) {
            Generation = new Decimal(4.8)
        }

        if (player[this.layer].points.gte(5)) {
            Generation = new Decimal(5)
        }

        if (player[this.layer].points.gte(12)) {
            Generation = new Decimal(5.05)
        }

        if (player[this.layer].points.gte(14)) {
            Generation = new Decimal(5.8)
        }

        return Generation
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f",
            description: "F: Perform a Cat Food Reset!",
            onPress(){if (canReset(this.layer)) doReset(this.layer)},
            unlocked() { return (hasMilestone('cats', 2)) },
        },
    ],

    layerShown() {
        let visible = false
        if (hasMilestone('cats', 2)) {
            visible = true
        }

        if (hasUpgrade('catfood', 11)) {
            visible = true
        }

        if (player[this.layer].points.gte(1)) {
            visible = true
        }
        return visible
    },

    upgrades: {
        11: {
            title: "feed the cats food!",
            description: "x2 monies gain (rich rich)",
            cost: new Decimal(1),
        },

        12: {
            title: "richer flavors",
            description: "x3 monies gain",
            cost: new Decimal(1),
            unlocked() { return (hasUpgrade('catfood', 11)) },
        },

        13: {
            title: "ultimate feeder",
            description: "cat food multiplies monies",
            cost: new Decimal(1),
            effect() {
                let pow = new Decimal(1.66)

                if (hasUpgrade('catfood', 21)) pow = new Decimal(2)

                let mult = player[this.layer].points.add(1).pow(pow)

                if (hasUpgrade('catfood', 23)) mult = mult.times(upgradeEffect('catfood', 23))

                return mult
            },

            tooltip() {
                let pow = new Decimal(1.66)
                if (hasUpgrade('catfood', 21)) {
                    pow = new Decimal(2)
                }

                if (hasUpgrade('catfood', 23)) {
                    let effect = upgradeEffect('catfood', 23)
                    pow = pow + "x" + effect.toFixed(2)
                }

                return "formula catfood^" + pow
            },


            effectDisplay() { return "cat food is multiplying by: " + format(upgradeEffect(this.layer, this.id)) + "x more monies" }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('catfood', 12)) },
        },

        14: {
            title: "force cat food in the monies machine",
            description: "monies machine gives more monies",
            cost: new Decimal(2),
            unlocked() { return (hasUpgrade('catfood', 13)) },
        },

        21: {
            title: "ultimate feeder 2",
            description: "boosts ultimate feeder!!!",
            cost: new Decimal(3),
            unlocked() { return (hasMilestone('cats', 3) || hasUpgrade('catfood', 21)) },
        },

        22: {
            title: "premium foods",
            description: "unlock more cat upgrades",
            cost: new Decimal(4),
            unlocked() { return (hasUpgrade('catfood', 21)) }
        },

        23: {
            title: "ultimate feeder 3",
            description: "boosts ultimate feeder even more",
            cost: new Decimal(5),
            unlocked() { return (hasUpgrade('catfood', 22) && hasMilestone('cats', 4)) },

            effect() {
                let mult = player[this.layer].points.add(1)
                let powr = new Decimal(1.5)

                if (hasUpgrade('catfood', 31)) {
                    powr = new Decimal(2)
                }

                return mult.pow(powr)
            },

            tooltip() {
                let powr = new Decimal(1.5)

                if (hasUpgrade('catfood', 31)) {
                    powr = new Decimal(2)
                }

                return "formula catfood^" + powr
            },

            effectDisplay() { return "ultimate feeder boost: " + format(upgradeEffect(this.layer, this.id)) + "x" },
        },

        24: {
            title: "kitty empire",
            description: "2x cat food gain",
            cost: new Decimal(6),
            unlocked() { return (hasUpgrade('catfood', 23) && hasMilestone('cats', 4)) },
        },

        25: {
            title: "feline fortune",
            description: "unlock even more cat upgrades",
            cost: new Decimal(8),
            unlocked() { return (hasUpgrade('catfood', 24) && hasMilestone('cats', 4)) },
        },

        31: {
            title: "ultimate yummy cat food",
            description: "boosts cat food upgrade 23",
            cost: new Decimal(10),

            tooltip() {
                return "boosts it by +0.5"
            },

            unlocked() { return (hasUpgrade('catfood', 25) && hasMilestone('garden', 1)) },
        },

        32: {
            title: "automatic adoption",
            description: "get cat automation",
            cost: new Decimal(12),
            unlocked() { return (hasUpgrade('catfood', 31)) },
        },

        33: {
            title: "Feed flowers cat food",
            description: "Lowers flower softcap",
            cost: new Decimal(14),
            unlocked() { return (hasUpgrade('catfood', 32) && hasMilestone('garden', 4)) },
        },

        34: {
            title: "Duplicating flower machine",
            description: "Multiply flowers by 2",
            cost: new Decimal(16),
            unlocked() { return (hasUpgrade('catfood', 33) && hasMilestone('garden', 4)) },
        },
    },

    tabFormat: {
        "Cat Food": {
            content: ["main-display",
                "resource-display",
                "catfood-prestige-button",
                "blank",
                "upgrades",
            ]

        },
    }
})