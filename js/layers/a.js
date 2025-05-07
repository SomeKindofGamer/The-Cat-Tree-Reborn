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