# Dragon Repeller Documentation

## Table of Contents

- [Dragon Repeller Documentation](#dragon-repeller-documentation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Game Features](#game-features)
  - [File Structure](#file-structure)
  - [Game Flow](#game-flow)
  - [Key JavaScript Functions](#key-javascript-functions)
    - [`update(location)`](#updatelocation)
    - [`buyWeapon()`](#buyweapon)
    - [`fightDragon()`](#fightdragon)
    - [`easterEgg()`](#easteregg)
  - [How to Extend](#how-to-extend)

---

## Overview

**Dragon Repeller** is a browser-based RPG game where players take on monsters, upgrade their equipment, and aim to defeat a dragon. Players navigate through a text-based adventure with dynamic updates to their stats (XP, health, and gold).

---

## Game Features

- Interactive text-based gameplay with buttons for navigation and actions.
- Three distinct monster types with unique stats.
- A shop system to buy weapons and health.
- An Easter egg mini-game where players can win gold.

---

## File Structure

- **index.html**:
  The main structure of the game, linking CSS and JavaScript files.
  
- **styles.css**:
  Customizes the look and feel of the game interface.
  
- **script.js**:
  Contains the core logic for gameplay, including navigation, stats management, and combat mechanics.

---

## Game Flow

1. **Start**:
   - The player begins in the town square.
   - Buttons allow navigation to the store, cave, or directly to fight the dragon.

2. **In the Store**:
   - Players can spend gold to buy health or upgrade their weapon.

3. **In the Cave**:
   - Players can fight two monster types: "slime" or "fanged beast."

4. **Combat**:
   - Players attack the monster and dodge its attacks.
   - Weapons and stats influence the damage dealt and received.

5. **Defeat Dragon**:
   - Players win the game by defeating the dragon.

6. **Easter Egg**:
   - Players can discover a hidden game where they guess random numbers.

---

## Key JavaScript Functions

### `update(location)`

- **Purpose**: Updates the game's state and UI to match the selected location.
- **Input**: `location` (an object from the `locations` array).
- **Output**: Updates button text, functionality, and the main text display.

### `buyWeapon()`

- **Purpose**: Allows players to purchase stronger weapons if they have enough gold.
- **Input**: None.
- **Output**: Updates the inventory, gold, and weapon stats.

### `fightDragon()`

- **Purpose**: Starts a battle against the dragon.
- **Input**: None.
- **Output**: Sets up monster stats and initiates combat.

### `easterEgg()`

- **Purpose**: Launches the hidden number-guessing mini-game.
- **Input**: None.
- **Output**: Updates text with game instructions and results.

---

## How to Extend

1. **Add a Monster**:
   - Add a new object to the `monsters` array in `script.js`:

     ```javascript
     { name: "giant", level: 15, health: 200 }
     ```

2. **Add a Weapon**:
   - Add a new object to the `weapons` array in `script.js`:

     ```javascript
     { name: "flaming axe", power: 150 }
     ```

3. **Create a New Location**:
   - Add a new object to the `locations` array in `script.js` with custom button actions.

---

Feel free to modify the above structure to fit your needs! Let me know if you’d like this document as a file.
