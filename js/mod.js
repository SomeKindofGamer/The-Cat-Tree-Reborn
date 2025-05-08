let modInfo = {
    name: "The Cat Tree Reborn",
    id: "KITTIESREBORN",
    author: "Shoober",
    pointsName: "monies",
    modFiles: [
        "layers/cats.js",
        "layers/catfood.js",
        "layers/garden.js",
        "layers/a.js",
        "tree.js",
    ],

    discordName: "Shoober's Trees Server",
    discordLink: "https://discord.gg/reRV6Wj359",
    initialStartPoints: new Decimal(0), // Used for hard resets and new players
    offlineLimit: 1, // In hours
}

// Set your version in num and name
let VERSION = {
    num: "1.1",
    name: "Cat Tree Reborn",
}

let changelog = `<h1>Changelog:</h1><br>
    <h3>v1.1</h3><br>
		- 1 new layer!<br>
        - 11 new upgrades!<br>
        - 6 new milestones!<br>
        - 4 new achievements!<br>
        <br>
        
	<h3>v1.0.1</h3><br>
		- Added SFX option<br>
        - Added Hotkeys<br>
        <br>

	<h3>v1.0</h3><br>
		- cats! ofc!<br>
        - 2 Layers<br>
        - 9 Achievements<br>
        - 6 milestones<br>
        - 19 upgrades<br>
		`

let winText = `Congratulations! You've reached 3,000 Flowers and beat the game till next update!, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
    return true
}

// Calculate points/sec!
function getPointGen() {
    if (!canGenPoints())
        return new Decimal(0)
    let gain = new Decimal(1)

    // Cat Layer
    if (hasUpgrade('cats', 11)) gain = gain.add(1)
    if (hasUpgrade('cats', 12)) gain = gain.times(upgradeEffect('cats', 12))
    if (hasUpgrade('cats', 15)) gain = gain.times(upgradeEffect('cats', 15))
    if (hasUpgrade('cats', 21)) gain = gain.pow(upgradeEffect('cats', 21))
    if (hasUpgrade('cats', 22)) gain = gain.times(5)
    if (hasUpgrade('cats', 23)) gain = gain.times(upgradeEffect('cats', 23))
    if (hasUpgrade('cats', 25)) gain = gain.times(upgradeEffect('cats', 25))
    if (hasMilestone('cats', 5)) gain = gain.times(3)
    if (hasUpgrade('cats', 31)) gain = gain.times(upgradeEffect('cats', 31))
    if (hasUpgrade('cats', 32)) gain = gain.times(upgradeEffect('cats', 32))
    if (hasUpgrade('cats', 33)) gain = gain.times(upgradeEffect('cats', 33))
    
    // Cat Food Layer
    if (hasUpgrade('catfood', 11)) gain = gain.times(2)
    if (hasUpgrade('catfood', 12)) gain = gain.times(3)
    if (hasUpgrade('catfood', 13)) gain = gain.times(upgradeEffect('catfood', 13))
    
    // Garden Layer
    gain = gain.times(layers.garden.effect())
    if (hasMilestone('garden', 4)) gain = gain.times(10)

    return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
    return {}
}

// Display extra things at the top of the page
var displayThings = []

// Determines when the game "ends"
function isEndgame() {
    return player.garden.points.gte(3000)
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
    return (3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {}