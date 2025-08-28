addLayer("dogs", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🐶", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0), // Currency
        }
    },
    branches: ["catfood"],
    color: "#4b371c",
    glowColor: "brown",
    requires: new Decimal(3000), // Can be a function that takes requirement increases into account
    resource: "dogs", // Name of prestige currency
    baseResource: "flowers", // Name of resource prestige is based on
    baseAmount() { return player.garden.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    base: new Decimal(5), // Only needed for static layers, base of the formula (b^(x^exp))
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },

    resetDescription() {
        return "Sacrifice everything for "
    },

    nextDescription() {
        return "You can adopt another dog at "
    },

    resourceDescription() {
        return "You've adopted "
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        let Generation = new Decimal(1)
        return Generation
    },

    effect() {
        let boost = player[this.layer].points.add(1).pow(1.5)
        let boostfood = player[this.layer].points.add(1).pow(0.3)
        let sfcap = 0.35

        softcappedEffect = {
            boost: softcap(boost, new Decimal(75), sfcap),
            boostfood: softcap(boostfood, new Decimal(2), sfcap)
        }

        return softcappedEffect
    },

    effectDescription() {
        let softcapDescription = ""
        let softcapDescription2 = ""
        let layerEffect = tmp[this.layer].effect.boost
        let layerEffectFood = tmp[this.layer].effect.boostfood

        if (layerEffect.gte(new Decimal(75))) {
            softcapDescription2 = " (Softcapped)"
        }

        if (layerEffectFood.gte(new Decimal(2))) {
            softcapDescription = " (Softcapped)"
        }

        return "which is multiplying flowers by " + format(layerEffectFood) + "x" + softcapDescription + " and boosts monies gain by " + format(layerEffect) + "x" + softcapDescription2
    },

    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [{
        key: "d",
        description: "D: Perform a Dog Reset!",
        onPress() { if (canReset(this.layer)) doReset(this.layer) },
        unlocked() {
            let visible = false

            if (hasMilestone('garden', 5)) {
                visible = true
            }

            if (player[this.layer].points.gte(1)) {
                visible = true
            }

            if (hasUpgrade('dogs', 11)) {
                visible = true
            }

            return visible
        },
    },],

    milestones: {
        0: {
            requirementDescription: "a dog? (1)",
            effectDescription: "x3.5 monies gain<br>2x cat food gain",
            done() {
                return player.dogs.points.gte(1)
            }
        },

        1: {
            requirementDescription: "multiple dogs? (2)",
            effectDescription: "Lower cat cost by 1.5x<br>multiply flower gain by 2x",
            done() {
                return player.dogs.points.gte(2)
            },
            unlocked() { return hasMilestone("dogs", 0) },
        },

        2: {
            requirementDescription: "doggo army (4)",
            effectDescription: "Multiply flower gain by 3x",
            done() {
                return player.dogs.points.gte(4)
            },
            unlocked() { return hasMilestone("dogs", 1) },
        },

        3: {
            requirementDescription: "cats and dogs... living together? (8)",

            effect() {
                let mult = player[this.layer].points.add(1)
                let powr = new Decimal(0.232)

                return mult.pow(powr)
            },
            
            done() {
                return player.dogs.points.gte(8)
            },

            effectDescription() {return "Dogs boost monies gain<br>unlock passive flower gain" + "<br> boost: " + format(milestoneEffect('dogs', 3)) + "x"},
            unlocked() { return hasMilestone("dogs", 2) },
        },

        4: {
            requirementDescription: "flower doggos (15)",
            effectDescription: "Unlock another flower upgrade and a new cat milestone",
            done() {
                return player.dogs.points.gte(15)
            },
            unlocked() { return hasMilestone("dogs", 3) },
        },

        5: {
            requirementDescription: "endless growing empire (40)",
            effectDescription: "Unlock more flower upgrades",
            done() {
                return player.dogs.points.gte(40)
            },
            unlocked() { return hasMilestone("dogs", 4) },
        },
    },

    layerShown() {
        let visible = false

        if (hasMilestone('garden', 5)) {
            visible = true
        }

        if (player[this.layer].points.gte(1)) {
            visible = true
        }

        if (hasUpgrade('dogs', 11)) {
            visible = true
        }

        return visible
    },

    infoboxes: {
        stuff: {
            title: "Dogs?",
            body() {
                let desc = "You've unlocked dogs!<br>Getting a dog will reset ALL your previous layers in return for a dog."
                return desc
            },
        },
    },

    tabFormat: {
        "Dogs": {
            content: ["main-display",
                "resource-display",
                "dog-prestige-button",
                "blank",
                "milestones",
                "blank",
                "blank", ["infobox", "stuff"],
                "blank",
                "blank",
            ]
        },
    }
})