import './scss/style.scss';


// VARIABLE LIST
let xp = 0;
let health = 100;
let gold = 300;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];
let weaponList = ["Dagger", "Sword", "Knife", "Crossbow"];
const buttonOne = document.querySelector(`#buttonOne`);
const buttonTwo = document.querySelector(`#buttonTwo`);
const buttonThree = document.querySelector(`#buttonThree`);
let gameText = document.querySelector(`.game__text`);
let xpText = document.querySelector(`#xpText`);
let healthText = document.querySelector(`#healthText`);
let goldText = document.querySelector(`#goldText`);
let monsterNameText = document.querySelector(`#monsterName`);
let monsterHealthText = document.querySelector(`#monsterHealth`);
let inventoryItems = document.querySelector(`.game__inventory--item`);
let shopList = document.querySelector(`.game__shopList`);
let monsterImage = document.querySelector(`.game__monster-image`);
let fightBackground = document.querySelector(`.game__background-image`);
let healthBar = document.querySelector(`.game__healthBar`);
let healthBarText = document.querySelector(`.game__healthBar-text`);
let equippedItem = document.querySelector(`.game__equipped-item`);
let equipWeaponButton = document.querySelector(`.game__equip-weapon`);
let damageDealt = 0;
let dragonDamage = false;

let weaponEquipped = inventory[inventory.length - 1];

const enemyDialogue = [
  "You shouldn't have come here, adventurer!",
  "This cave is my domain, and you’re trespassing!",
  "Prepare to meet your doom in the dark!",
  "I will crush you under the weight of these rocks!",
  "You won’t survive the darkness that lurks within!",
  "Feel the wrath of the cave's true guardian!",
  "You dare challenge me in my own home?",
  "I have waited for someone foolish enough to face me!",
  "This will be your final resting place, stranger!",
  "Your light won't save you here!",
  "I’ll bury you where no one can ever find you!",
  "You’ll regret entering this cave, mark my words!",
  "Your bones will be the treasure I claim today!",
  "The darkness here feeds on your fear. Prepare to be consumed!",
  "I’ll make sure you never leave this cave alive!"
];

const dragonQuotes = [
  "Foolish mortal, your bones will turn to ash in my flames!",
  "You dare challenge me? I am the end of all things!",
  "Your screams shall echo through my lair for eternity!",
  "Pathetic creature, your bravery will be your undoing!",
  "I have feasted on heroes greater than you… and I hunger still.",
  "Your weapons are mere twigs against my ancient scales!",
  "Kneel before me, and I may grant you a swift death.",
  "My fire shall consume your hope and your flesh alike!",
  "I am the nightmare that kings whisper of in fear.",
  "You cannot escape the wrath of the dragonlord!",
  "The air itself trembles at my fury… and so shall you!",
  "I have burned kingdoms to the ground—what makes you think you stand a chance?",
  "The last warrior who dared face me now rests in my belly.",
  "Your courage amuses me… but it will not save you.",
  "Your destiny is to perish beneath my claws!",
  "Even the gods fear my name—what hope do you have?",
  "You will beg for mercy… but none shall be given.",
  "My wings blot out the sun, and my fire shall light your doom!",
  "Tremble, insect, for you stand before true power!",
  "No amount of steel or sorcery will save you from my wrath!"
];



let inStore = false;
let attackTimeout, attackTimeout1, attackTimeout2, attackTimeout3, attackTimeout4;
let buyTimeout;





goldText.innerText = gold;
healthText.innerText = health;
xpText.innerText = xp;
inventoryItems.innerText = `${inventory}`;
shopList.innerText = `Shop Inventory: ${weaponList.join("  ,  ")}`;
equippedItem.innerText = `Equipped Item: ${weaponEquipped}`;

//////////////////////////////////// FUNCTION LIST /////////////////////////////////////

const equipedWeaponFunc = () => {
  const weaponDamage = {
    "Stick": [5, 10],
    "Dagger": [5, 14],
    "Sword": [5, 30],
    "Knife": [5, 18],
    "Crossbow": [5, 22]
  };

  if (weaponEquipped in weaponDamage) {
    let [min, max] = weaponDamage[weaponEquipped];
    damageDealt = Math.floor(Math.random() * (max - min + 1)) + min;
  }
};



/////////////////////////////// ACCESSORY STORE FUNCTIONS //////////////////////////////
//check and remove from inventory function
const removeInventory = () => {
  
  weaponList = weaponList.filter(weapon => !inventory.includes(weapon));

  shopList.innerText = `Shop Inventory: ${weaponList}`;
  inventoryItems.innerText = `${inventory.join("  ,  ")}`;

    
  if (weaponList.length === 0 || weaponList === undefined){
    buyTimeout = setTimeout(() => {
      alert('No More Weapons To Buy!');
      buttonTwo.style.opacity = ".5";
      buttonTwo.style.cursor = "default";
      buttonTwo.onclick = null;
      shopList.innerText = `Shop Inventory: Nothing Left!`
    }, 250);
  }
  
}

//////////////////////////////// STORE BUTTON FUNCTIONS ////////////////////////////////
const buyHealth = () => {
  if (gold >= 10){
    health += 10;
    gold -= 10;
    goldText.innerText = `${gold}`;
    healthText.innerText = `${health}`;
  } else {
    alert('Not Enough Gold!');
  }
}

const buyWeapon = () => {
  let x = weaponList.length;

  if(weaponList.length === 0 || weaponList.length === undefined) {
    buttonTwo.style.opacity = ".5";
    buttonTwo.style.cursor = "default";
    buttonTwo.onclick = null;
  }
  
  if (gold >= 30 && weaponList.length > 0) {
    gold -= 30;
    goldText.innerText = `${gold}`;
    let newWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    inventory.push(newWeapon);
    weaponEquipped = newWeapon; // Auto-equip new weapon
    removeInventory();
  } else if(gold <= 29) {
    alert('Not Enough Gold!');
  }

}

const returnToMenu = () => {
  clearTimeout(attackTimeout);
  clearTimeout(attackTimeout1);
  clearTimeout(attackTimeout2);

  clearTimeout(attackTimeout4);
  clearTimeout(buyTimeout);
  inStore = false;
  document.querySelector(`.background__image`).src = "https://mir-s3-cdn-cf.behance.net/project_modules/1400/588a44195922117.66168b374ece8.gif";

  buttonOne.innerText = 'Go to store';
  buttonTwo.innerText = 'Go to cave';
  buttonThree.innerText = 'Fight dragon';
  gameText.innerText = "Choose Where You'd Like To Go";

  // dragonButton.onclick = controlsFunc;
  
  let controls = document.querySelector(`.game__controls`);
  let control = document.querySelectorAll(`.game__button`);
  
  controls.style.textAlign = "";
  controls.style.display = "flex";
  shopList.style.display = "none";
  fightBackground.style.display = "none";
  monsterImage.style.display = "none";
  healthBar.style.display = "none";
  healthBar.value = 100;
  healthBarText.style.display = "none";
  document.querySelector(`#buttonOne`).style.display = "";
  gameText.style.color = 'black';
  gameText.style.removeProperty("top");

  buttonTwo.style.removeProperty("cursor");
  buttonTwo.style.removeProperty("opacity");

  control.forEach(button => {
    button.style.width = "";
  })
  

  buttonOne.onclick = storeFunction; 
  buttonTwo.onclick = caveFunction;
  buttonThree.onclick = fightDragon;
}

////////////////////////////////// MAIN STORE FUNCTIONS ///////////////////////////////////
const storeFunction = () => {
  let inStore = true; 
  document.querySelector(`.background__image`).src = "https://images.squarespace-cdn.com/content/v1/5882a13517bffc09e39be804/1735970118767-DNBLS8U9ZW515KTJ7JQC/Scene.gif?format=1000w";

  buttonOne.innerText = 'Buy Health (10 Gold)';
  buttonTwo.innerText = 'Buy Random Weapon (30 Gold)';
  buttonThree.innerText = 'Back to Town Square';
  gameText.innerText = "Welcome to the Medieval Store!";

  
  let controls = document.querySelector(`.game__controls`);
  let control = document.querySelectorAll(`.game__button`);
  
  controls.style.textAlign = "center";
  controls.style.display = "block";
  
  shopList.style.display = "block"
  shopList.style.position = "absolute";
  shopList.style.left = "50%";
  shopList.style.bottom = "30%";
  shopList.style.textAlign = "center";
  shopList.style.transform = "translateX(-50%)";
  
  control.forEach(button => {
    button.style.width = "75%";
  })

  if(weaponList.length === 0 || weaponList.length === undefined) {
    buttonTwo.style.opacity = ".5";
    buttonTwo.style.cursor = "default";
    buttonTwo.onclick = null;
  }
  
  buttonOne.onclick = buyHealth;
  buttonTwo.onclick = buyWeapon;
  buttonThree.onclick = returnToMenu;
}



////////////////////////////////// CAVE ACCESSORY FUNCTION ///////////////////////////////
const gameOver = () => {    
  alert('Game Over! You Died!');
  window.location.href = "game_over.html";
};

const gameWin = () => {    
  alert('CONGRADULATIONS, YOU WIN!');
  window.location.href = "game_win.html";
};

const attackFunction = () => {
  console.log(weaponEquipped)

  equipedWeaponFunc();
  healthBar.value -= damageDealt;
  healthBarText.innerText = healthBar.value;
  buttonOne.disabled = true; 
  buttonOne.style.opacity = "0.5"; 
  buttonOne.style.cursor = "default";


  attackTimeout1 = setTimeout(() => {

    let damageTaken = Math.floor(Math.random() * 2 + 5);

    if(dragonDamage) {
      damageTaken = Math.floor(Math.random() * 10 + 5);
    }
    // equipedWeaponFunc();
    gameText.style.color = "rgb(184, 22, 0)";
    gameText.innerText = `Damage Taken: -${damageTaken}HP
    Damage Dealt: ${damageDealt}`;
    health -= damageTaken;
    healthText.innerText = health; 

    setTimeout(() => {if(health <= 0){
      gameOver();
      return;
    }}, 400);

  }, 400);

  monsterImage.style.opacity = ".1"

  attackTimeout2 = setTimeout(() => {
    monsterImage.style.opacity = "1";
  }, 400);

  attackTimeout3 = setTimeout(() => {
    buttonOne.disabled = false; 
    buttonOne.style.opacity = "1"; 
    buttonOne.style.cursor = "pointer";
  }, 1500);

  attackTimeout4 = setTimeout(() => {
    gameText.style.color = "black";
    if(dragonDamage){
      gameText.style.color = "rgb(236, 236, 0)";
    }
    gameText.innerText = enemyDialogue[Math.floor(Math.random() * enemyDialogue.length)];
  }, 1500);
  
  if (healthBar.value <= 0){
    buttonOne.innerText = "Fight Again";
    buttonOne.onclick = () => {
      healthBar.value = 100;
      // healthBarText.innerText = healthBar.value;
      caveFunction();
    };
    gameText.innerText = "Oh no I am defeated!";  

    if(dragonDamage) {
        gameWin();
        return;
    }

    buttonThree.innerText = 'Leave';
    monsterImage.style.transform = "translateY(300px)"
    clearTimeout(attackTimeout);
    clearTimeout(attackTimeout1);
    clearTimeout(attackTimeout2);
    clearTimeout(attackTimeout4);

    setTimeout(() => {
      monsterImage.style.opacity = "0";
      monsterImage.style.display = "none";
    }, 600)


    attackTimeout = setTimeout(() => {
      let randomGold =  Math.floor(Math.random() * 100 + 25);
      let xpGain = Math.floor(Math.random() * 100 + 5);
      gameText.innerText = `Gold: +${randomGold}
      XP: +${xpGain}`
      gameText.style.color = 'gold';
      xpText.innerText = xp += xpGain;
      goldText.innerText = gold += randomGold;
    }, 1000);

  } 
}

    
    
    const equipWeaponDiv = document.querySelector(".game__equip");
    
    const displayWeaponButtons = () => {
      equipWeaponDiv.innerHTML = ""; 
      equipWeaponDiv.style.display = "block"; 
      gameText.style.display = "none";
      healthBar.style.display = "none";
      healthBarText.style.display = "none";
      fightBackground.style.display = "none";
      monsterImage.style.display = "none";
      // equipWeaponButton.style.display = "flex";
      buttonOne.disabled = true; 
      buttonOne.style.cursor = "default";
      buttonOne.style.opacity = "0.5"; 
      buttonThree.disabled = true; 
      buttonThree.style.cursor = "default";
      buttonThree.style.opacity = "0.5"; 
      
      inventory.forEach(weapon => {
        let button = document.createElement("button");
        button.classList.add("game__equip-weapon");
        button.innerText = weapon;
        button.onclick = () => equipWeapon(weapon);
        equipWeaponDiv.appendChild(button);
      });
    }
    
    function equipWeapon(weapon) {
      weaponEquipped = weapon;
      equippedItem.innerText = `Equipped Item: ${weaponEquipped}`;
      // equipWeaponButton.style.display = "none";
      gameText.style.display = "block";
      healthBar.style.display = "block";
      healthBarText.style.display = "block";
      fightBackground.style.display = "block";
      monsterImage.style.display = "block";
      buttonOne.disabled = false; 
      // buttonOne.style.cursor = "pointer";
      // buttonOne.style.opacity = "1"; 
      buttonOne.style.removeProperty("cursor");
      buttonOne.style.removeProperty("opacity");
      buttonThree.disabled = false; 
      // buttonThree.style.cursor = "pointer";
      // buttonThree.style.opacity = "1"; 
      buttonThree.style.removeProperty("cursor");
      buttonThree.style.removeProperty("opacity");
      equipWeaponDiv.style.display = "none"; // Hide all buttons after equipping
    }
    
    
    
    
    /////////////////////////////////// CAVE FUNCTIONS //////////////////////////////////

const caveFunction = () => {

  let randomMonster = ["https://media.stickerswiki.app/terrariaa/312754.512.webp",
    "https://media.stickerswiki.app/terrariaa/312739.512.webp",
    "https://media.stickerswiki.app/terrariaa/312758.512.webp",
    "https://media.stickerswiki.app/terrariaa/312746.512.webp",
    "https://media.stickerswiki.app/terrariaa/312751.512.webp",
    "https://media.stickerswiki.app/terrariaa/312760.512.webp",
    "https://media.stickerswiki.app/terrariaa/312752.512.webp",
    "https://media.stickerswiki.app/terrariaa/312759.512.webp",
    "https://media.stickerswiki.app/terrariaa/312763.512.webp",
    "https://media.stickerswiki.app/terrariaa/312761.512.webp",
    "https://preview.redd.it/59yw6c2d8fx61.png?width=512&format=png&auto=webp&s=cc68f641f8a9b825cc32c7b179bd8de8cc8c9721"
  ]

  let randomIndex = Math.floor(Math.random() * randomMonster.length)

  document.querySelector(`.background__image`).src = "https://cdnb.artstation.com/p/assets/images/images/020/204/921/original/veronica-norbrink-cave-background-4-space-boii.gif?1566836439";

  healthBar.max = 100;
  buttonOne.innerText = 'Attack';
  buttonTwo.innerText = 'Equip Weapon';
  buttonThree.innerText = 'Flee';
  healthBar.style.display = "block";
  healthBarText.style.display = "block";
  healthBarText.innerText = healthBar.value;
  fightBackground.style.display = "block";
  monsterImage.style.display = "block";
  gameText.style.display = "block";
  monsterImage.style.opacity = "1";
  monsterImage.style.transform = ""
  gameText.style.color = 'black';
  // gameText.style.top = '60%';
  
  document.querySelector(`.game__background-image`).src = "https://img.itch.zone/aW1nLzU1OTg3NjMucG5n/original/y1cVuL.png";
  document.querySelector(`.game__monster-image`).src = randomMonster[randomIndex];
  
  gameText.innerText = enemyDialogue[Math.floor(Math.random() * enemyDialogue.length)];

  
  buttonOne.onclick = attackFunction;
  buttonTwo.onclick = displayWeaponButtons;
  buttonThree.onclick = returnToMenu;
}





const fightDragon = () => {

  dragonDamage = true;

  document.querySelector(`.background__image`).src = "https://i.pinimg.com/originals/08/d9/ef/08d9ef7723de602edefa8af825d9a1e2.gif";

  document.querySelector(`.game__monster-image`).src = "https://images.freeimages.com/image/previews/9f2/pixel-dragon-color-png-5690497.png";

  healthBar.max = 500;
  healthBar.value = 500;

  buttonOne.innerText = 'Attack';
  buttonTwo.innerText = 'Equip Weapon';
  buttonThree.style.display = "none";
  fightBackground.src = "https://i.pinimg.com/originals/43/d4/d7/43d4d7e5ba1cfa7959a1fab8d64f22ea.gif"
  healthBar.style.display = "block";
  healthBarText.style.display = "block";
  healthBarText.innerText = healthBar.value;
  fightBackground.style.display = "block";
  monsterImage.style.display = "block";
  monsterImage.style.transform = ""
  monsterImage.style.opacity = "1";
  gameText.innerText = dragonQuotes[Math.floor(Math.random() * enemyDialogue.length)];
  gameText.style.color = "rgb(236, 236, 0)";
  // gameText.style.top = '60%';



  buttonOne.onclick = attackFunction;
  buttonTwo.onclick = displayWeaponButtons;
  buttonThree.onclick = returnToMenu;
}




buttonOne.onclick = storeFunction; 
buttonTwo.onclick = caveFunction;
buttonThree.onclick = fightDragon;

