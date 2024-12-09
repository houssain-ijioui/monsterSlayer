"use strict";
// STATS
let xp = 0;
let health = 100;
let gold = 50;
let inventory = ["stick"];
let currentWeaponIndex = 0;
let currentMonsterIndex;
// STATS TEXT
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
// CONTROLS
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
// TEXT
const text = document.querySelector("#text");
// MONSTER
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
// FUNCTIONS
const buyHealth = () => {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText === null || goldText === void 0 ? void 0 : goldText.innerText = gold;
        healthText === null || healthText === void 0 ? void 0 : healthText.innerText = health;
    }
    else {
        text === null || text === void 0 ? void 0 : text.innerText = "You do not have enough gold to buy health.";
    }
};
const buyWeapon = () => {
    if (gold >= 30) {
        if (currentWeaponIndex >= 3) {
            text === null || text === void 0 ? void 0 : text.innerText = `you already have the most powerfull weapon ${inventory}.`;
            button2 === null || button2 === void 0 ? void 0 : button2.innerText = "Sell weapon for 15 gold";
            button2 === null || button2 === void 0 ? void 0 : button2.onclick = sellWeapon;
        }
        else {
            gold -= 30;
            goldText === null || goldText === void 0 ? void 0 : goldText.innerText = gold;
            let newWeapon = weapons[currentWeaponIndex + 1]["name"];
            inventory.push(newWeapon);
            currentWeaponIndex++;
            text === null || text === void 0 ? void 0 : text.innerText = `You bought ${newWeapon}. In your inventory you have ${inventory}.`;
        }
    }
    else {
        text === null || text === void 0 ? void 0 : text.innerText = "you don't have enough gold to buy a new weapon.";
    }
};
const goTown = () => {
    monsterStats === null || monsterStats === void 0 ? void 0 : monsterStats.style.display = "none";
    update(locations[0]);
};
const goStore = () => {
    update(locations[1]);
};
const goCave = () => {
    update(locations[2]);
};
const fightDragon = () => {
    currentMonsterIndex = 2;
    goFight();
};
const fightSlime = () => {
    currentMonsterIndex = 0;
    goFight();
};
const fightBeast = () => {
    currentMonsterIndex = 1;
    goFight();
};
const goFight = () => {
    update(locations[3]);
    monsterStats === null || monsterStats === void 0 ? void 0 : monsterStats.style.display = "block";
    monsterName === null || monsterName === void 0 ? void 0 : monsterName.innerText = monsters[currentMonsterIndex]["name"];
    monsterHealthText === null || monsterHealthText === void 0 ? void 0 : monsterHealthText.innerText = monsters[currentMonsterIndex]["health"];
};
const attack = () => {
    text === null || text === void 0 ? void 0 : text.innerText = `The ${monsters[currentMonsterIndex]["name"]} attacks.`;
    text === null || text === void 0 ? void 0 : text.innerText += ` You attack it with your ${weapons[currentWeaponIndex]["name"]}.`;
    applyDamage();
};
const dodge = () => {
    text === null || text === void 0 ? void 0 : text.innerText = `You dodged the attack from ${monsters[currentMonsterIndex]["name"]}`;
};
const sellWeapon = () => {
    console.log("sell weapon");
};
function update(location) {
    text === null || text === void 0 ? void 0 : text.innerText = location.text;
    button1 === null || button1 === void 0 ? void 0 : button1.innerText = location["button text"][0];
    button2 === null || button2 === void 0 ? void 0 : button2.innerText = location["button text"][1];
    button3 === null || button3 === void 0 ? void 0 : button3.innerText = location["button text"][2];
    button1 === null || button1 === void 0 ? void 0 : button1.onclick = location["button functions"][0];
    button2 === null || button2 === void 0 ? void 0 : button2.onclick = location["button functions"][1];
    button3 === null || button3 === void 0 ? void 0 : button3.onclick = location["button functions"][2];
}
const applyDamage = () => {
    let weaponPower = weapons[currentWeaponIndex]["power"];
    let monster = monsters[currentMonsterIndex];
    let myDamage = Math.floor(weaponPower - (monster.level * 2) + ((monster.maxHealth - monster.health) / 10) - ((100 - health) / 20));
    let monsterDamage = Math.floor((monster.level * 3) - ((monster.maxHealth - monster.health) / 15) + ((100 - health) / 25));
    // subtract from my health the monster damage
    monsterDamage > 0 && (health -= monsterDamage);
    healthText === null || healthText === void 0 ? void 0 : healthText.innerText = health;
    // subtract my damage from monster current healt
    myDamage > 0 && (monster.health -= myDamage);
    monsterHealthText === null || monsterHealthText === void 0 ? void 0 : monsterHealthText.innerText = monster.health;
    console.log("my damage", myDamage);
    console.log(monsters[currentMonsterIndex]);
};
// initialize values
button1 === null || button1 === void 0 ? void 0 : button1.onclick = goStore;
button2 === null || button2 === void 0 ? void 0 : button2.onclick = goCave;
button3 === null || button3 === void 0 ? void 0 : button3.onclick = fightDragon;
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
];
const weapons = [
    { name: "stick", power: 5 },
    { name: "dagger", power: 30 },
    { name: "claw hammer", power: 50 },
    { name: "sword", power: 100 }
];
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15,
        maxHealth: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60,
        maxHealth: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300,
        maxHealth: 300
    },
];
