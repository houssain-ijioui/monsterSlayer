"use strict";
// STATS
let xp = 0;
let health = 100;
let gold = 50;
// CONTROLS
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
// TEXT
const text = document.querySelector("#text");
// FUNCTIONS
const buyHealth = () => {
    console.log("buy health");
};
const buyWeapon = () => {
    console.log("buy weapon");
};
const goTown = () => {
    update(locations[0]);
};
const goStore = () => {
    update(locations[1]);
};
const goCave = () => {
    update(locations[2]);
};
const fightDragon = () => {
    console.log("fight dragon");
};
const fightSlime = () => {
    console.log("fight slime");
};
const fightBeast = () => {
    console.log("fight beast");
};
const attack = () => {
    console.log("attack");
};
const dodge = () => {
    console.log("dodge");
};
const run = () => {
    console.log("run");
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
