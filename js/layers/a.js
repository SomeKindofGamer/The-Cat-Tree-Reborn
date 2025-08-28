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
            name: "im feeling the fortune",
            done() { return hasUpgrade("catfood", 25) },
            tooltip: "Unlock Feline Fortune", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 23) },
        },

        24: {
            name: "The Garden!",
            done() { return hasMilestone("cats", 5) },
            tooltip: "Get cat milestone 5 and unlock a new layer!", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 24) },
        },

        25: {
            name: "how does this exactly work",
            done() { return player.garden.points.gte(1) },
            tooltip: "Plant your first cat!", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 25) },
        },

        31: {
            name: "Cat Flower Empire!",
            done() { return player.garden.points.gte(100) },
            tooltip: "Plant 100 cats!", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 31) },
        },

        32: {
            name: "WORLD DOMINATION!",
            done() { return hasUpgrade("cats", 33) },
            tooltip: "Take over the world with CATS!", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 32) },
        },

        33: {
            name: "What's that?",
            done() { return player.garden.points.gte(3000) },
            tooltip: "Plant 3,000 cats and unlock a new layer!", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 33) },
        },

        34: {
            name: "Woof woof!",
            done() { return player.dogs.points.gte(1) },
            tooltip: "Get your first... dog?", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 34) },
        },

        35: {
            name: "Woof woof woof!",
            done() { return player.dogs.points.gte(5) },
            tooltip: "Get 5 dogs!", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 35) },
        },
        
        41: {
            name: "Endless flower fields",
            done() { return player.garden.points.gte(250000) },
            tooltip: "Get 250,000 Flowers!", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 41) },
        },

        42: {
            name: "The next step.",
            done() { return hasMilestone("cats", 6) },
            tooltip: "Unlock cat milestone 6", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 41) },
        },

        43: {
            name: `<img src="resources/aliencat.jpg" width="40" height="40">`,
            done() { return hasMilestone("space", 0) },
            tooltip: "zeeble zorp! get your first alien cat!", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 42) },
        },

        44: {
            name: `collecting aliens cats like pokemon cards`,
            done() { return player.space.points.gte(30) },
            tooltip: "Get 30 Alien Cats!", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 43) },
        },

        45: {
            name: `What's next?`,
            done() { return hasMilestone("space", 8) },
            tooltip: "Unlock space milestone 8", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) },
            unlocked() { return hasAchievement("a", 44) },
        },
    },

    tabFormat: [
        ["display-text", function() { return "<MA style='font-size: 25px; font-family: url(\"fonts/cabin.ttf\")'>Achievements ~ " + player.a.achievements.length + " / " + (Object.keys(tmp.a.achievements).length - 2) }],
        "blank",
        "blank",
        
        ["row", [
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
            ["achievement", 25],
        ]],

        ["row", [
            ["achievement", 31],
            ["achievement", 32],
            ["achievement", 33],
            ["achievement", 34],
            ["achievement", 35],
        ]],

        ["row", [
            ["achievement", 41],
            ["achievement", 42],
            ["achievement", 43],
            ["achievement", 44],
            ["achievement", 45],
        ]],

        "blank",
        "blank",
    ],
    layerShown() { return true }
})