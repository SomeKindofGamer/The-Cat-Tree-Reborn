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
            let multer = new Decimal(0.5)
            
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
            requirementDescription: "The god of cats. (20)",
            effectDescription: "x3 monies and beat the game. till next update ;)",
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

                return player[this.layer].points.add(1).pow(pow)
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

            effectDisplay() { return "grandmas monies machine is making you: " +  format(upgradeEffect(this.layer, this.id)) + "x more monies" }, // Add formatting to the effect
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
            
            tooltip() {return "basically means ^" + format(upgradeEffect(this.layer, this.id)) + " monies sorry if ur confused by cat power i thought cat power was cool sounding"},
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
    },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        //  {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
                "blank",
                "upgrades",
            ],
            unlocked() {
                return hasAchievement('a', 11)
            }
        },
    }
})

addLayer("catfood", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🥫", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
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

        return Generation
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        //  {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
                return mult.pow(1.5)
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

addLayer("a", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "yellow",
    resource: "achievements",
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "how cute!",
            done() { return player.cats.points.gte(1) },
            tooltip: "Get 1 cat", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        12: {
            name: "got a new friend!",
            done() { return player.cats.points.gte(2) },
            tooltip: "Get 2 cats", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        13: {
            name: "time for food!",
            done() { return player.catfood.points.gte(1) },
            tooltip: "Get your first cat food (yummy!)", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        14: {
            name: "even more?",
            done() { return player.catfood.points.gte(2) },
            tooltip: "Get your second cat food (very yummy!)", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        15: {
            name: "they're cute aren't they?",
            done() { return player.cats.points.gte(7) },
            tooltip: "Get 7 cats", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        21: {
            name: "so many cat food!",
            done() { return player.catfood.points.gte(5) },
            tooltip: "Get 5 cat food", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        22: {
            name: "crazy cat person...",
            done() { return player.cats.points.gte(10) },
            tooltip: "Get 10 cats", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        23: {
            name: "final cat food upgrade! (as of right now)",
            done() { return hasUpgrade("catfood", 25) },
            tooltip: "Unlock Feline Fortune", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasUpgrade("catfood", 25) },
        },

        24: {
            name: "The Cat Tree Reborn",
            done() { return hasMilestone("cats", 5) },
            tooltip: "Get cat milestone 5 and unlock a new layer. but for now you'll finish the game. Thanks for playing!", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasMilestone("cats", 5) },
        },
    },

    tabFormat: [
        ["display-text", function() { return "<MA style='font-size: 25px; font-family: url(\"fonts/cabin.ttf\")'>Achievements ~ " + player.a.achievements.length + " / " + (Object.keys(tmp.a.achievements).length - 2) }],
        "blank",
        "blank", ["row", [
            ["achievement", 11],
            ["achievement", 12],
            ["achievement", 13],
            ["achievement", 14],
            ["achievement", 15],
        ]],
        ["row", [
            ["achievement", 21],
            ["achievement", 22],
            ["achievement", 23],
            ["achievement", 24],
        ]],
        
        "blank",
        "blank",
    ],
    layerShown() { return true }
})