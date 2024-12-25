let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
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
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// This function takes a location object from the locations array and updates
// the game state to the values in that object. This includes setting the text
// of the game, setting the text and functions of the buttons, and hiding the
// monster stats div.
function update(location) {
  // Hide the monster stats div
  monsterStats.style.display = "none";

  // Set the text and function of each button
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];

  // Set the function of each button
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];

  // Set the text of the game
  text.innerHTML = location.text;
}

// This function is called when the player wants to go to the town.
// It's also used as the default function for the first button.
// It sets the game state to the "town" state which is the first
// element of the locations array.
function goTown() {
  // Call the update function which will set the game state to
  // the "town" state. This includes setting the text of the game,
  // setting the text and functions of the buttons, and hiding the
  // monster stats div.
  update(locations[0]);
}

// This function is called when the player wants to go to the store.
// It's also used as the default function for the second button.
// It sets the game state to the "store" state which is the second
// element of the locations array.
function goStore() {
  // Call the update function which will set the game state to
  // the "store" state. This includes setting the text of the game,
  // setting the text and functions of the buttons, and hiding the
  // monster stats div.
  update(locations[1]);
}

// This function is called when the player wants to go to the cave.
// It's also used as the default function for the third button.
// It sets the game state to the "cave" state which is the third
// element of the locations array.
function goCave() {
  // Call the update function which will set the game state to
  // the "cave" state. This includes setting the text of the game,
  // setting the text and functions of the buttons, and hiding the
  // monster stats div.
  update(locations[2]);
}

// This function is called when the player clicks on the button to buy health.
// It first checks if the player has enough gold to buy health. If the player
// does, it subtracts 10 gold from the player's gold and adds 10 health to
// the player's health. It then updates the game state by setting the text of
// the gold and health elements to the new values. If the player does not have
// enough gold to buy health, it sets the text of the game to a message saying
// so.
function buyHealth() {
  // Check if the player has enough gold to buy health
  if (gold >= 10) {
    // Subtract 10 gold from the player's gold
    gold -= 10;

    // Add 10 health to the player's health
    health += 10;

    // Update the game state by setting the text of the gold and health
    // elements to the new values
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    // Set the text of the game to a message saying that the player does
    // not have enough gold to buy health
    text.innerText = "You do not have enough gold to buy health.";
  }
}

// This function is called when the player wants to buy a weapon.
// If the player already has the most powerful weapon, it does
// not do anything.
function buyWeapon() {
  // Check if the player already has the most powerful weapon
  if (currentWeapon < weapons.length - 1) {
    // Check if the player has enough gold to buy a weapon
    if (gold >= 30) {
      // Subtract 30 gold from the player's gold
      gold -= 30;

      // Increment the current weapon index
      currentWeapon++;

      // Update the game state by setting the text of the gold element
      // to the new value
      goldText.innerText = gold;

      // Get the name of the new weapon
      let newWeapon = weapons[currentWeapon].name;

      // Set the text of the game to a message saying what the player
      // now has
      text.innerText = "You now have a " + newWeapon + ".";

      // Add the new weapon to the player's inventory
      inventory.push(newWeapon);

      // Set the text of the game to a message saying what the player
      // has in their inventory
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      // Set the text of the game to a message saying that the player
      // does not have enough gold to buy a weapon
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    // Set the text of the game to a message saying that the player
    // already has the most powerful weapon
    text.innerText = "You already have the most powerful weapon!";

    // Set the text of the second button to "Sell weapon for 15 gold"
    button2.innerText = "Sell weapon for 15 gold";

    // Set the function of the second button to sell a weapon
    button2.onclick = sellWeapon;
  }
}

// This function is called when the player clicks on the second button
// when they are in the "store" state. It allows them to sell their
// current weapon for 15 gold. If the player does not have any
// weapons other than the default "stick", it does not do anything.
function sellWeapon() {
  // Check if the player has more than one weapon in their inventory
  if (inventory.length > 1) {
    // Add 15 gold to the player's gold
    gold += 15;

    // Update the game state by setting the text of the gold element
    // to the new value
    goldText.innerText = gold;

    // Get the name of the current weapon
    let currentWeapon = inventory.shift();

    // Set the text of the game to a message saying that the player
    // sold their current weapon
    text.innerText = "You sold a " + currentWeapon + ".";

    // Set the text of the game to a message saying what the player
    // has in their inventory
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    // Set the text of the game to a message saying that the player
    // cannot sell their only weapon
    text.innerText = "Don't sell your only weapon!";
  }
}

// This function is called when the player wants to fight a slime.
// It sets the "fighting" variable to 0, which means the player is
// fighting a slime. It then calls the "goFight" function which
// updates the game state to the "fight" state.
function fightSlime() {
  // Set the "fighting" variable to 0, which means the player is
  // fighting a slime.
  fighting = 0;

  // Call the "goFight" function which updates the game state to
  // the "fight" state.
  goFight();
}

// This function is called when the player wants to fight a beast.
// It sets the "fighting" variable to 1, which means the player is
// fighting a beast. It then calls the "goFight" function which
// updates the game state to the "fight" state.
function fightBeast() {
  // Set the "fighting" variable to 1, which means the player is
  // fighting a beast.
  fighting = 1;

  // Call the "goFight" function which updates the game state to
  // the "fight" state.
  goFight();
}

// This function is called when the player wants to fight the dragon.
// It sets the "fighting" variable to 2, which means the player is
// fighting the dragon. It then calls the "goFight" function which
// updates the game state to the "fight" state.
function fightDragon() {
  // Set the "fighting" variable to 2, which means the player is
  // fighting the dragon.
  fighting = 2;

  // Call the "goFight" function which updates the game state to
  // the "fight" state.
  goFight();
}

// This function is called when the player wants to fight a monster.
// It updates the game state to the "fight" state by calling the
// "update" function with the "fight" state as the argument.
// It also sets the "monsterHealth" variable to the health of the
// monster that the player is fighting.
// It displays the "monsterStats" div which shows the name and health
// of the monster.
function goFight() {
  // Update the game state to the "fight" state
  update(locations[3]);

  // Set the "monsterHealth" variable to the health of the monster
  // that the player is fighting
  monsterHealth = monsters[fighting].health;

  // Display the div that shows the name and health of the monster
  monsterStats.style.display = "block";

  // Set the text of the "monsterName" element to the name of the
  // monster
  monsterName.innerText = monsters[fighting].name;

  // Set the text of the "monsterHealthText" element to the health
  // of the monster
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  // Update the text to indicate that the monster is attacking
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  
  // Add to the text to indicate that the player is attacking the monster with their current weapon
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  
  // Reduce player's health by the monster's attack value
  health -= getMonsterAttackValue(monsters[fighting].level);
  
  // Check if the player's attack hits the monster
  if (isMonsterHit()) {
    // Reduce monster's health by the weapon's power, a random factor based on player's xp, and an additional 1
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    // Update the text to indicate that the player's attack missed
    text.innerText += " You miss.";
  }
  
  // Update the health text to reflect the player's current health
  healthText.innerText = health;
  
  // Update the monster's health text to reflect the monster's current health
  monsterHealthText.innerText = monsterHealth;
  
  // Check if the player's health has dropped to zero or below
  if (health <= 0) {
    // Call the function to handle player's loss
    lose();
  } 
  // Check if the monster's health has dropped to zero or below
  else if (monsterHealth <= 0) {
    // If the player was fighting the dragon
    if (fighting === 2) {
      // Call the function to handle player's victory over the dragon
      winGame();
    } else {
      // Call the function to handle player's victory over other monsters
      defeatMonster();
    }
  }
  
  // Random chance for the player's weapon to break
  if (Math.random() <= .1 && inventory.length !== 1) {
    // Update the text to indicate that a weapon has broken
    text.innerText += " Your " + inventory.pop() + " breaks.";
    
    // Decrement the current weapon index
    currentWeapon--;
  }
}

// This function takes a monster's level and returns its attack value.
// The attack value is calculated by multiplying the monster's level by 5
// and then subtracting a random number between 0 and the player's XP.
// If the result is negative, then the monster's attack value is set to 0.
function getMonsterAttackValue(level) {
  // Multiply the monster's level by 5
  const hit = (level * 5);
  
  // Subtract a random number between 0 and the player's XP
  // This simulates the monster's attack missing the player
  // if the player has enough XP
  hit -= Math.floor(Math.random() * xp);
  
  // If the result is negative, then the monster's attack value is set to 0
  // This prevents the monster's attack from increasing the player's health
  if (hit < 0) {
    hit = 0;
  }
  
  // Print the monster's attack value to the console
  // This is useful for debugging
  console.log(hit);
  
  // Return the monster's attack value
  return hit;
}

// This function determines if the monster's attack hits the player.
// The function returns a boolean value indicating whether the monster's attack
// hits the player.
// The function first checks if a random number between 0 and 1 is greater than
// 0.2. If it is, then the monster's attack hits.
// If the random number is not greater than 0.2, then the function checks if the
// player's health is less than 20. If it is, then the monster's attack hits.
// If neither of these conditions is met, then the monster's attack does not hit.
function isMonsterHit() {
  // Return true if a random number between 0 and 1 is greater than 0.2
  // or if the player's health is less than 20
  return Math.random() > .2 || health < 20;
}

// This function is called when the player wants to dodge the monster's attack.
// It updates the text on the screen to indicate that the player dodged the attack.
// It does not affect the player's health or the monster's health.
function dodge() {
  // Update the text on the screen to indicate that the player dodged the attack
  // The text is updated with the name of the monster that the player is fighting
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

// This function is called when the player defeats a monster.
// It rewards the player with gold and experience points.
// The amount of gold that the player is rewarded is equal to the monster's level
// multiplied by 6.7. The amount of experience points that the player is rewarded
// is equal to the monster's level.
// It updates the text on the screen to show the new amount of gold and experience
// points that the player has.
// It also updates the game state to the "kill monster" state.
function defeatMonster() {
  // Reward the player with gold
  // The amount of gold that the player is rewarded is equal to the monster's level
  // multiplied by 6.7
  gold += Math.floor(monsters[fighting].level * 6.7);
  
  // Reward the player with experience points
  // The amount of experience points that the player is rewarded is equal to the monster's level
  xp += monsters[fighting].level;
  
  // Update the text on the screen to show the new amount of gold and experience
  // points that the player has
  goldText.innerText = gold;
  xpText.innerText = xp;
  
  // Update the game state to the "kill monster" state
  update(locations[4]);
}

// This function is called when the player's health reaches zero.
// It changes the game state to the "lose" state which displays a message to the player
// that they have lost the game, and gives them the option to restart the game.
// The update function is called with the "lose" state as the argument to set the
// game state to the "lose" state.
function lose() {
  // Call the update function with the "lose" state as the argument to set the
  // game state to the "lose" state.
  update(locations[5]);
}

// This function is called when the player has won the game by defeating the final boss, the dragon.
// It changes the game state to the "win" state which displays a message to the player that they have won the game,
// and gives them the option to restart the game.
// The update function is called with the "win" state as the argument to set the game state to the "win" state.
function winGame() {
  // Call the update function with the "win" state as the argument to set the
  // game state to the "win" state.
  update(locations[6]);
}

// This function is called when the player chooses to restart the game.
// It resets the player's experience points, health, gold, current weapon, and inventory to their default values.
// It also updates the text on the screen to show the new values for the player's gold, health, and experience points.
// Finally, it calls the goTown function to change the game state to the "town square" state.
function restart() {
  // Reset the player's experience points to 0
  xp = 0;
  
  // Reset the player's health to 100
  health = 100;
  
  // Reset the player's gold to 50
  gold = 50;
  
  // Reset the player's current weapon to the default value, which is the stick
  currentWeapon = 0;
  
  // Reset the player's inventory to the default value, which is the stick
  inventory = ["stick"];
  
  // Update the text on the screen to show the new values for the player's gold, health, and experience points
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  
  // Call the goTown function to change the game state to the "town square" state
  goTown();
}

// This function is called when the player is in the "kill monster" state and clicks the first button.
// It changes the game state to the "easter egg" state which displays a secret message to the player.
// The update function is called with the "easter egg" state as the argument to set the game state to the "easter egg" state.
function easterEgg() {
  // Call the update function with the "easter egg" state as the argument to set the
  // game state to the "easter egg" state.
  update(locations[7]);
}

// This function is called when the player selects the number 2 in the game.
// It calls the 'pick' function with the number 2 as the argument.
// The 'pick' function will then generate 10 random numbers and check if 2 is among them.
// If 2 is found among the random numbers, the player wins 20 gold.
// If not, the player loses 10 health.
function pickTwo() {
  pick(2);
}

// This function is called when the player selects the number 8 in the game.
// It calls the 'pick' function with the number 8 as the argument.
// The 'pick' function will then generate 10 random numbers and check if 8 is among them.
// If 8 is found among the random numbers, the player wins 20 gold.
// If not, the player loses 10 health.
function pickEight() {
  // Call the 'pick' function with the number 8 as the argument
  pick(8);
}

// This function is called when the player has clicked on one of the buttons
// in the "easter egg" state. The number that the player clicked on is passed
// in as an argument to this function.
//
// The first thing it does is generate 10 random numbers between 0 and 10
// inclusive. It stores these numbers in an array called 'numbers'.
function pick(guess) {
  // Create an empty array to store the random numbers
  const numbers = [];

  // Generate 10 random numbers and store them in the array
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  // Update the text on the screen to show the player which number they
  // picked, and what the 10 random numbers are.
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";

  // Loop over the array of numbers and add each one to the text
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }

  // Check if the number that the player picked is in the array of numbers
  if (numbers.includes(guess)) {
    // If it is, update the text on the screen to show that the player won
    text.innerText += "Right! You win 20 gold!";

    // Increase the player's gold by 20
    gold += 20;

    // Update the text on the screen to show the new amount of gold
    goldText.innerText = gold;
  } else {
    // If the number the player picked is not in the array, update the text
    // on the screen to show that the player lost
    text.innerText += "Wrong! You lose 10 health!";

    // Decrease the player's health by 10
    health -= 10;

    // Update the text on the screen to show the new amount of health
    healthText.innerText = health;

    // If the player's health has gone to zero or below, call the 'lose'
    // function to end the game
    if (health <= 0) {
      lose();
    }
  }
}
