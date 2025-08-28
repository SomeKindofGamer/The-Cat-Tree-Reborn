addLayer("space", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: '<img src="resources/aliencat.jpg" width="73" height="73">', // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0), // Currency
            essence: new Decimal(0), // Currency
        }
    },
    branches: ["dogs"],
    color: "rgb(81, 0, 69)",
    glowColor: "brown",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "aliens", // Name of prestige currency
    baseResource: "Space Essence", // Name of resource prestige is based on
    baseAmount() { return player.space.points }, // Get the current amount of baseResource
    baseAmountEssence() { return player.space.essence }, // essence!!!
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    base: new Decimal(5), // Only needed for static layers, base of the formula (b^(x^exp))
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        if (player.space.points.gte(15)) {
            mult = new Decimal(1.75)
        }

        if (player.space.points.gte(25)) {
            mult = new Decimal(2).add(player.space.points.sub(25).mul(0.25))
        }

        if (player.space.points.gte(35)) {
            mult = mult.add(player.space.points.sub(35).mul(0.45))
        }

        if (player.space.points.gte(40)) {
            mult = mult.add(player.space.points.sub(40).mul(0.65))
        }

        if (player.space.points.gte(50)) {
            let extra = player.space.points.sub(49)
            let multiplier = Decimal.pow(1.25, extra)
            mult = mult.mul(multiplier)
        }

        return mult
    },

    resetDescription() {
        return "Ascend for "
    },

    nextDescription() {
        return "You can ascend again at "
    },

    resourceDescription() {
        return "You've ascended for "
    },

    canReset() {
        return player[this.layer].essence.gte(100)
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        let Generation = new Decimal(1)
        return Generation
    },

    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [{
        key: "s",
        description: "S: Perform a Space Reset!",
        onPress() { if (canReset(this.layer)) doReset(this.layer) },
        unlocked() {
            let visible = false

            if (hasMilestone('cats', 6)) {
                visible = true
            }

            if (player[this.layer].essence.gte(1)) {
                visible = true
            }

            if (player[this.layer].points.gte(1)) {
                visible = true
            }

            if (player.dogs.points.gte(100)) {
                visible = true
            }

            return visible
        },
    },],

    clickables: {
        11: {
            canClick() {return true},

            onClick() {
                let essenceMulti = new Decimal(1)

                if (hasMilestone("space", 0)) {
                    essenceMulti = essenceMulti.mul(milestoneEffect('space', 0))
                }

                if (hasMilestone("space", 2)) {
                    essenceMulti = essenceMulti.mul(milestoneEffect('space', 2))
                }

                if (hasMilestone("space", 6)) {
                    essenceMulti = essenceMulti.mul(milestoneEffect('space', 6))
                }

                if (hasUpgrade("space", 11)) {
                    essenceMulti = essenceMulti.mul(2)
                }

                if (hasUpgrade("space", 12)) {
                    essenceMulti = essenceMulti.mul(upgradeEffect('space', 12))
                }

                if (hasUpgrade("space", 14)) {
                    essenceMulti = essenceMulti.mul(upgradeEffect('space', 14))
                }

                player.space.essence = player.space.essence.add(essenceMulti)
            },

            onHold() {
                let essenceMulti = new Decimal(1)

                if (hasMilestone("space", 0)) {
                    essenceMulti = essenceMulti.mul(milestoneEffect('space', 0))
                }

                if (hasMilestone("space", 2)) {
                    essenceMulti = essenceMulti.mul(milestoneEffect('space', 2))
                }

                if (hasMilestone("space", 6)) {
                    essenceMulti = essenceMulti.mul(milestoneEffect('space', 6))
                }

                if (hasUpgrade("space", 11)) {
                    essenceMulti = essenceMulti.mul(2)
                }

                if (hasUpgrade("space", 12)) {
                    essenceMulti = essenceMulti.mul(upgradeEffect('space', 12))
                }

                if (hasUpgrade("space", 14)) {
                    essenceMulti = essenceMulti.mul(upgradeEffect('space', 14))
                }

                player.space.essence = player.space.essence.add(essenceMulti)
            },
        }
    },

    milestones: {
        0: {
            requirementDescription: "zeeble zorp! (1)",

            effect() {
                let mult = player[this.layer].points.add(1)
                let powr = new Decimal(1.25)

                return mult.pow(powr)
            },

            effectDescription() {return "Essence is multiplied by Alien Cats" + "<br> boost: " + format(milestoneEffect('space', 0)) + "x"},

            done() {
                return player.space.points.gte(1)
            }
        },

        1: {
            requirementDescription: "more aliens! (3)",

            effect() {
                let mult = player[this.layer].points.add(1)
                let powr = new Decimal(0.232)

                return mult.pow(powr)
            },

            effectDescription() {return "Monies is multiplied slightly by Alien Cats" + "<br> boost: " + format(milestoneEffect('space', 1)) + "x"},
            done() {
                return player.space.points.gte(3)
            },
            unlocked() { return hasMilestone("space", 1) },
        },

        2: {
            requirementDescription: "now its getting good... (8)",

            effect() {
                let mult = player[this.layer].essence.add(1)
                let powr = new Decimal(0.125)

                if (hasMilestone("space", 4)) {
                    powr = new Decimal(0.15)
                }

                return mult.pow(powr)
            },

            effectDescription() {return "Essence multiplies Essence?" + "<br> boost: " + format(milestoneEffect('space', 2)) + "x"},
            done() {
                return player.space.points.gte(8)
            },
            unlocked() { return hasMilestone("space", 1) },
        },
        
        3: {
            requirementDescription: "gotta grind previous layers! (15)",

            effect() {
                let mult = player.catfood.points.add(1)
                let powr = new Decimal(0.85)

                return mult.pow(powr)
            },

            effectDescription() {return "Cat Food boosts Essence" + "<br> boost: " + format(milestoneEffect('space', 3)) + "x"},
            done() {
                return player.space.points.gte(15)
            },
            unlocked() { return hasMilestone("space", 2) },
        },

        4: {
            requirementDescription: "little bit more buffy (20)",
            effectDescription: "Keep cat automation!!!<br>Cat Food no longer resets cats<br>Space Milestone 2 is slightly better.",

            done() {
                return player.space.points.gte(20)
            },

            unlocked() { return hasMilestone("space", 3) },
        },

        5: {
            requirementDescription: "huge alien army... (25)",
            effectDescription: "Unlock Cat Food Automation!<br>Automate all Cat and Cat Food Upgrades",

            done() {
                return player.space.points.gte(25)
            },

            unlocked() { return hasMilestone("space", 4) },
        },

        6: {
            requirementDescription: `Huge PROFITS! (30)`,
            
            effect() {
                let mult = player[this.layer].essence.add(1)
                let powr = new Decimal(0.155)

                return mult.pow(powr)
            },

            effectDescription() {return "Monies and Essence is multiplied by Essence" + "<br> boost: " + format(milestoneEffect('space', 6)) + "x"},

            done() {
                return player.space.points.gte(30)
            },

            unlocked() { return hasMilestone("space", 5) },
        },

        7: {
            requirementDescription: `Need upgrades? (35)`,
            effectDescription: "Unlock Essence Upgrades",

            done() {
                return player.space.points.gte(35)
            },

            unlocked() { return hasMilestone("space", 6) },
        },

        8: {
            requirementDescription: `What's next? (50)`,
            effectDescription: "What is next.... (coming soon!)",

            done() {
                return player.space.points.gte(50)
            },

            unlocked() { return hasMilestone("space", 7) },
        },
    },

    layerShown() {
        let visible = false

        if (hasMilestone('cats', 6)) {
            visible = true
        }

        if (player[this.layer].essence.gte(1)) {
            visible = true
        }

        if (player[this.layer].points.gte(1)) {
            visible = true
        }

        if (player.dogs.points.gte(100)) {
            visible = true
        }

        return visible
    },

    upgrades: {
        11: {
            title: "more essence!",
            description: "gain 2x more essence!",
            overrideCost: new Decimal(1e7),
            fullDisplay() {
                return `<span style="color:white;"><h3>${this.title}</h3><br>${this.description}<br>cost: ${formatWhole(this.overrideCost)} Space Essence</span>`
            },

            canAfford() {
                if (player.space.essence.gte(this.overrideCost)) {
                    return true
                }

                return false
            },

            pay() {
                player.space.essence = player.space.essence.sub(this.overrideCost)
            }
        },

        12: {
            title: "dog boost!",
            description: "dogs boost essence gain",
            overrideCost: new Decimal(2e7),
            
            fullDisplay() {
                return `<span style="color:white;"><h3>${this.title}</h3><br>${this.description}<br>dogs are making you ${format(upgradeEffect(this.layer, this.id)) + "x more essence"}<br>cost: ${format(this.overrideCost)} Space Essence</span>`
            },

            effect() {
                let pow = new Decimal(0.2)
                let mult = player.dogs.points.add(1).pow(pow)
                return mult
            },

            canAfford() {
                if (player.space.essence.gte(this.overrideCost)) {
                    return true
                }

                return false
            },

            pay() {
                player.space.essence = player.space.essence.sub(this.overrideCost)
            },

            unlocked() { return (hasUpgrade('space', 11)) },
        },

        13: {
            title: "im running out of title ideas",
            description: "flowers no longer resets cat upgrades<br>dogs no longer reset cats",
            overrideCost: new Decimal(2.5e7),
            
            fullDisplay() {
                return `<span style="color:white;"><h3>${this.title}</h3><br>${this.description}<br>cost: ${format(this.overrideCost)} Space Essence</span>`
            },

            canAfford() {
                if (player.space.essence.gte(this.overrideCost)) {
                    return true
                }

                return false
            },

            pay() {
                player.space.essence = player.space.essence.sub(this.overrideCost)
            },

            unlocked() { return (hasUpgrade('space', 12)) },
        },

        14: {
            title: "big big boost!",
            description: "alien cats boosts monies, essence and flowers",
            overrideCost: new Decimal(3.5e7),
            
            fullDisplay() {
                return `<span style="color:white;"><h3>${this.title}</h3><br>${this.description}<br>aliens are boosting by ${format(upgradeEffect(this.layer, this.id)) + "x"}<br>cost: ${format(this.overrideCost)} Space Essence</span>`
            },

            effect() {
                let pow = new Decimal(0.2)
                let mult = player.space.points.add(1).pow(pow)
                return mult
            },

            canAfford() {
                if (player.space.essence.gte(this.overrideCost)) {
                    return true
                }

                return false
            },

            pay() {
                player.space.essence = player.space.essence.sub(this.overrideCost)
            },

            unlocked() { return (hasUpgrade('space', 12)) },
        },
    },

    infoboxes: {
        stuff: {
            title: "Welcome to space!",
            body() {
                let desc = "You've taken over earth with your army. Now it's time to take over space!<br>Click the ALIEN CAT (you can also hold) to gain essence to ascend for an alien cat!<br>This layer will only reset catfood and dogs.<br>It is recommended to not do dog resets till around milestone 6"
                return desc
            },
        },

        upgrades: {
            title: "Essence Upgrades!",
            body() {
                let desc = "You've now unlocked essence upgrades! congrats!<br>These upgrades obviously cost Essence<br>when grinding upgrades dont forget to get aliens lol"
                return desc
            },
        },
    },

    tabFormat: {
        "Ascend": {
            content: [
                "main-display",
                "essence-display",
                "clickables",
                "blank",
                "space-prestige-button",
                "blank",
                "milestones",
                "blank",
                "blank",
                ["infobox", "stuff"],
                "blank",
                "blank",
            ]
        },

        "Upgrades": {
            content: [
                "main-display",
                "essence-display",
                "clickables",
                "blank",
                "space-prestige-button",
                "blank",
                "blank",
                "upgrades",
                "blank",
                "blank",
                ["infobox", "upgrades"],
                "blank",
                "blank",
            ],
            unlocked() {
                return hasMilestone('space', 7)
            }
        },
    }
})