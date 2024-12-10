interface LocationItem {
    name: string,
    "button text": Array<string>,
    "button functions": Array<() => void>,
    text: string
}

interface Weapon {
    name: string,
    power: number
}

interface Monster {
    name: string,
    level: number,
    health: number,
    maxHealth: number
}


// STATS
let xp: number = 0;
let health: number = 100;
let gold: number = 50;
let inventory: string[] = ["stick"];
let currentWeaponIndex: number = 0;
let currentMonsterIndex: number | null;


// STATS TEXT
const xpText = document.querySelector<HTMLElement>("#xpText");
const healthText = document.querySelector<HTMLElement>("#healthText");
const goldText = document.querySelector<HTMLElement>("#goldText");

// CONTROLS
const button1 = document.querySelector<HTMLButtonElement>("#button1");
const button2 = document.querySelector<HTMLButtonElement>("#button2");
const button3 = document.querySelector<HTMLButtonElement>("#button3");

// TEXT
const text = document.querySelector<HTMLElement>("#text");


// MONSTER
const monsterStats = document.querySelector<HTMLElement>("#monsterStats");
const monsterName = document.querySelector<HTMLElement>("#monsterName");
const monsterHealthText = document.querySelector<HTMLElement>("#monsterHealth");


// FUNCTIONS
const buyHealth = () => {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText?.innerText = gold;
        healthText?.innerText = health;
    } else {
        text?.innerText = "You do not have enough gold to buy health.";
    }
}

const buyWeapon = () => {
    if (gold >= 30) {
        if (currentWeaponIndex >= 3) {
            text?.innerText = `you already have the most powerfull weapon ${inventory}.`;
            button2?.innerText = "Sell weapon for 15 gold";
            button2?.onclick = sellWeapon;
        } else {
            gold -= 30;
            goldText?.innerText = gold;
            let newWeapon: string = weapons[currentWeaponIndex + 1]["name"];
            inventory.push(newWeapon);
            currentWeaponIndex++;
            text?.innerText = `You bought ${newWeapon}. In your inventory you have ${inventory}.`;
        }
    } else {
        text?.innerText = "you don't have enough gold to buy a new weapon."
    }
}

const goTown = () => {
    monsterStats?.style.display = "none";
    update(locations[0])
}

const goStore = () => {
    update(locations[1])
}

const goCave = () => {
    update(locations[2])
}

const fightDragon = () => {
    currentMonsterIndex = 2;
    goFight();
}

const fightSlime = () => {
    currentMonsterIndex = 0;
    goFight();
}

const fightBeast = () => {
    currentMonsterIndex = 1;
    goFight();
}

const goFight = () => {
    update(locations[3]);
    monsterStats?.style.display = "block";
    monsterName?.innerText = monsters[currentMonsterIndex]["name"];
    monsterHealthText?.innerText = monsters[currentMonsterIndex]["health"];
}

const attack = () => {
    text?.innerText = `The ${monsters[currentMonsterIndex]["name"]} attacks.`;
    text?.innerText += ` You attack it with your ${weapons[currentWeaponIndex]["name"]}.`;
    applyDamage();
}

const dodge = () => {
    text?.innerText = `You dodged the attack from ${monsters[currentMonsterIndex]["name"]}`;
}

const sellWeapon = () => {
    console.log("sell weapon");
}

const restart = () => {
    xp = 0;
    health = 100;
    gold = 50;
    inventory = ["stick"];
    currentWeaponIndex = 0;
    currentMonsterIndex = 0;
    update(locations[0]);
    xpText?.innerText = 0;
    healthText?.innerText = 100;
    goldText?.innerText = 50;
}

const lose = () => {
    update(locations[4]);
}


const killMonster = () => {
    update(locations[5]);
    monsterStats?.style.display = "none";
    monsters[currentMonsterIndex].health = monsters[currentMonsterIndex].maxHealth;
    currentMonsterIndex = null;
    gold += 20;
    xp += 20;
    goldText?.innerText = gold;
    xpText?.innerText = xp;
}

function update(location: LocationItem) {
    text?.innerText = location.text;
    button1?.innerText = location["button text"][0];
    button2?.innerText = location["button text"][1];
    button3?.innerText = location["button text"][2];
    button1?.onclick = location["button functions"][0];
    button2?.onclick = location["button functions"][1];
    button3?.onclick = location["button functions"][2];
}


const applyDamage = () => {
    let weaponPower: number = weapons[currentWeaponIndex]["power"];
    let monster: Monster = monsters[currentMonsterIndex];

    let myDamage: number =
        Math.floor(weaponPower - (monster.level * 2) + ((monster.maxHealth - monster.health) / 10) - ((100 - health) / 20));

    let monsterDamage: number =
        Math.floor((monster.level * 3) - ((monster.maxHealth - monster.health) / 15) + ((100 - health) / 25));

    
    // subtract from my health the monster damage
    monsterDamage > 0 && (health -= monsterDamage);
    healthText?.innerText = health;
    if (health <= 0) {
        lose();
    }

    // subtract my damage from monster current healt
    myDamage > 0 && (monster.health -= myDamage);
    monsterHealthText?.innerText = monster.health;
    if (monster.health <= 0) {
        killMonster();
    }
}


// initialize values
button1?.onclick = goStore;
button2?.onclick = goCave;
button3?.onclick = fightDragon;



const locations: Array<LocationItem> = [
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
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. &#x2620;"
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: "The monster screams \"Arg!\" as it dies. You gain experience points and find gold."
    },
    {
        name: "win",
        "button text": ["Go town square", "Go town square", "Go town square"],
        "button functions": [goTown, goTown, goTown],
        text: "You killed the monster"
    },
]


const weapons: Array<Weapon> = [
    { name: "stick", power: 5 },
    { name: "dagger", power: 30 },
    { name: "claw hammer", power: 50 },
    { name: "sword", power: 100 }
]


const monsters: Array<Monster> = [
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
]