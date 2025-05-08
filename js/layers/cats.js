addLayer("cats", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🐱", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0), // Currency

        }
    },
    color: "#ffd36e",
    glowColor: "orange",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "cats", // Name of prestige currency
    baseResource: "monies", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    base: new Decimal(5), // Only needed for static layers, base of the formula (b^(x^exp))
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },

    resourceDescription() {
        return "You've adopted "
    },

    autoPrestige() {
        if (hasUpgrade('catfood', 32)) {
            return true
        } else {
            return false
        }
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        let Generation = new Decimal(1)
        if (player.cats.points.gte(5)) {
            Generation = new Decimal(0.5)
        }
        if (player.cats.points.gte(6)) {
            Generation = new Decimal(0.415)
        }
        if (player.cats.points.gte(8)) {
            Generation = new Decimal(0.33)
        }
        if (player.cats.points.gte(14)) {
            Generation = new Decimal(0.3)
        }

        if (player.cats.points.gte(17)) {
            let multer = new Decimal(0.96)

            Generation = Generation.times(multer)
        }

        if (player.cats.points.gte(19)) {
            let multer = new Decimal(0.92)

            Generation = Generation.times(multer)
        }

        if (player.cats.points.gte(20)) {
            let multer = new Decimal(0.64)

            Generation = Generation.times(multer)
        }

        if (player.cats.points.gte(21)) {
            let multer = new Decimal(0.82)

            Generation = Generation.times(multer)
        }

        if (player.cats.points.gte(25)) {
            let multer = new Decimal(0.92)

            Generation = Generation.times(multer)
        }

        if (player.cats.points.gte(29)) {
            let multer = new Decimal(0.88)

            Generation = Generation.times(multer)
        }
        
        return Generation
    },

    doReset(resettingLayer) {
        if (resettingLayer === 'catfood') {
            let savedMilestones = player.cats.milestones;
            let upgradesToKeep = [];

            if (hasMilestone('cats', 4)) {
                upgradesToKeep = player.cats.upgrades.slice();
            } else {
                if (hasUpgrade('cats', 21)) upgradesToKeep.push(21);
                if (hasUpgrade('cats', 22)) upgradesToKeep.push(22);
            }

            layerDataReset(this.layer);

            player.cats.upgrades = upgradesToKeep;
            player.cats.milestones = savedMilestones;
        }

        if (resettingLayer === 'garden') {
            let savedMilestones = player.cats.milestones;
            let upgradesToKeep = [];

            if (hasUpgrade('garden', 13)) {
                upgradesToKeep = player.cats.upgrades.slice();
            }

            layerDataReset(this.layer);

            player.cats.upgrades = upgradesToKeep;
            player.cats.milestones = savedMilestones;
        }
    },

    milestones: {
        0: {
            requirementDescription: "your first fluffy friend! (1)",
            effectDescription: "Unlock your first 3 cat upgrades",
            done() {
                return player.cats.points.gte(1)
            }
        },

        1: {
            requirementDescription: "a start of an army! (3)",
            effectDescription: "Unlock more upgrades!",
            done() {
                return player.cats.points.gte(3)
            },
            unlocked() { return hasMilestone("cats", 1) },
        },

        2: {
            requirementDescription: "wait we were starving these cats? (5)",
            effectDescription: "Unlock Cat Food!",
            done() {
                return player.cats.points.gte(5)
            },
            unlocked() { return player.cats.points.gte(4) || hasMilestone("cats", 2) },
        },

        3: {
            requirementDescription: "Almost millonaire (7)",
            effectDescription: "Unlock 2 new cat food upgrades",
            done() {
                return player.cats.points.gte(7)
            },
            unlocked() { return hasMilestone("cats", 3) },
        },

        4: {
            requirementDescription: "So many cats! (9)",
            effectDescription: "Keep all cat upgrades on Cat Food reset and unlock more cat food upgrades",
            done() {
                return player.cats.points.gte(9)
            },
            unlocked() { return hasMilestone("cats", 4) },
        },

        5: {
            requirementDescription: "Ready to plant? (20)",
            effectDescription: "x3 monies and unlock The Garden",
            done() {
                return player.cats.points.gte(20)
            },
            unlocked() { return hasUpgrade("catfood", 25) },
        },
    },

    upgrades: {
        11: {
            title: "make an awesome tktok account!",
            description: "Gotta make money somehow! +1 monies gain",
            cost: new Decimal(1),
        },

        12: {
            title: "make an even better youtube account!",
            description: "Multiply your monies gain by how much cats you have",
            cost: new Decimal(1),

            effect() {
                let pow = new Decimal(0.66)
                if (hasUpgrade('cats', 13)) {
                    pow = new Decimal(0.88)
                }

                let mult = player[this.layer].points.add(1)
                if (hasUpgrade('cats', 14)) mult = mult.times(upgradeEffect('cats', 14))

                return mult.pow(pow)
            },

            tooltip() {
                let pow = new Decimal(0.66)
                if (hasUpgrade('cats', 13)) {
                    pow = new Decimal(0.88)
                }

                let formula = "cats"

                formula += `^${pow.toFixed(2)}`

                if (hasUpgrade('cats', 14)) {
                    let effect = upgradeEffect('cats', 14)
                    formula += `×${effect.toFixed(2)}`
                }

                return "formula " + formula
            },

            effectDisplay() { return "adsense is making you: " + format(upgradeEffect(this.layer, this.id)) + "x more monies" }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('cats', 11)) },
        },

        13: {
            title: "post more frequently!",
            description: "slightly buffs the previous upgrade",
            cost: new Decimal(2),
            unlocked() { return (hasUpgrade('cats', 12)) },
        },

        14: {
            title: "going viral?",
            description: "Cats boost youtube adsense",
            cost: new Decimal(3),

            effect() {
                let pow = new Decimal(0.333)
                let mul = player[this.layer].points.add(1).pow(pow)

                if (hasUpgrade("garden", 11)) {
                    mul = mul.times(upgradeEffect('garden', 11))
                }

                return mul
            },

            tooltip() {
                let form = "formula cats^0.333"

                if (hasUpgrade('garden', 11)) {
                    let effect = upgradeEffect('garden', 11)
                    form += `×${effect.toFixed(2)}`
                }

                return form
            },

            effectDisplay() { return "cats are boosting adsense by: " + format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
            unlocked() { return (hasMilestone('cats', 1) && hasUpgrade('cats', 13)) },
        },

        15: {
            title: "monies cloning machine",
            description: "thank you grandma for giving this to me",
            cost: new Decimal(4),

            effect() {
                if (player.points.gte(10)) {
                    if (hasUpgrade('catfood', 14)) {
                        let mul = player.points.log(35).add(1)
                        mul = mul.times(3)
                        return mul
                    } else {
                        return player.points.log(215).add(1)
                    }
                } else {
                    return 1
                }
            },

            tooltip() {
                let pow = new Decimal(215)
                if (hasUpgrade('catfood', 14)) {
                    pow = new Decimal(35)
                }

                return "formula log_base(" + pow + ") of monies"
            },

            effectDisplay() { return "grandmas monies machine is making you: " + format(upgradeEffect(this.layer, this.id)) + "x more monies" }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('cats', 14)) },
        },

        21: {
            title: "the ultimate cattening!",
            description: "cat cat cat.",
            cost: new Decimal(7),

            effect() {
                if (player.points.gte(10)) {
                    let catpower = new Decimal(0.006)
                    if (hasUpgrade('catfood', 24)) {
                        catpower = new Decimal(0.012)
                    }

                    return player.points.add(1).pow(catpower)
                } else {
                    return 1
                }
            },

            tooltip() { return "basically means ^" + format(upgradeEffect(this.layer, this.id)) + " monies sorry if ur confused by cat power i thought cat power was cool sounding" },
            effectDisplay() { return "cat cat cat? " + format(upgradeEffect(this.layer, this.id)) + " cat power" },
            unlocked() { return (hasUpgrade('cats', 15) && hasUpgrade('catfood', 22) || hasUpgrade('cats', 21)) },
        },

        22: {
            title: "cat king",
            description: "remember when you saw that one cat on the street being bullied? yeah thats him. anyways x5 monies",
            cost: new Decimal(8),
            unlocked() { return (hasUpgrade('cats', 21) || hasUpgrade('cats', 22)) },
        },

        23: {
            title: "cat thieves",
            description: "train your cats to rob banks for you",
            cost: new Decimal(10),

            effect() {
                let pow = new Decimal(0.65)

                return player[this.layer].points.add(1).pow(pow)
            },

            effectDisplay() { return "your cats robbing banks are boosting your monies by: " + format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return (hasUpgrade('cats', 22) && hasUpgrade('catfood', 25) || hasUpgrade('cats', 23)) },
        },

        24: {
            title: "cat power overload",
            description: "multiply your cat power 2",
            cost: new Decimal(12),
            unlocked() { return (hasUpgrade('cats', 23)) },
        },

        25: {
            title: "extensive training",
            description: "train your cats to rob better",
            cost: new Decimal(15),
            effect() {
                let pow = new Decimal(0.888)

                return player[this.layer].points.add(1).pow(pow)
            },

            effectDisplay() { return "your cats robbing banks are boosting your monies by: " + format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return (hasUpgrade('cats', 24)) },
        },

        31: {
            title: "Planning for WORLD DOMINATION",
            description: "Your cats multiply your monies gain by alot",

            effect() {
                let pow = new Decimal(1.5)

                return player[this.layer].points.add(1).pow(pow)
            },

            effectDisplay() { return "your cats are boosting your monies by: " + format(upgradeEffect(this.layer, this.id)) + "x" },
            cost: new Decimal(20),
            unlocked() { return (hasUpgrade('cats', 25) && hasMilestone('garden', 3)) },
        },

        32: {
            title: "Send cats to the garden to meditate",
            description: "Your monies will multiply by cats multiplied by flowers.",

            effect() {
                let pow = new Decimal(1)
                let pow2 = new Decimal(0.2)

                return player[this.layer].points.add(1).pow(pow).times(player.garden.points.add(1).pow(pow2))
            },

            effectDisplay() { return "your cats are boosting your monies by: " + format(upgradeEffect(this.layer, this.id)) + "x" },
            cost: new Decimal(21),
            unlocked() { return (hasUpgrade('cats', 31)) },
        },

        33: {
            title: "World Domination.",
            description: "Finally. WORLD DOMINATION.",

            effect() {
                let pow = new Decimal(0.077)

                return player.points.add(1).pow(pow)
            },

            effectDisplay() { return "world domination is boosting your monies by: " + format(upgradeEffect(this.layer, this.id)) + "x" },
            cost: new Decimal(22),
            unlocked() { return (hasUpgrade('cats', 31)) },
        },
    },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Perform a Cat Reset!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() { return true },

    tabFormat: {
        "Cats": {
            content: ["main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "milestones",
            ]
        },

        "Upgrades": {
            content: ["main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "upgrades",
            ],
            unlocked() {
                return hasAchievement('a', 11)
            }
        },
    }
})