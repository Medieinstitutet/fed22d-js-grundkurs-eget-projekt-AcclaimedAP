/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/comma-dangle */
/* hehe... eslint go boom */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import './style/style.scss';
import * as types from './types';
import * as unit from './units';
// I'm sorry Jenni, for what you're about to see.

/*

VARIABLES AND DEFINITIONS

*/
// Logic variables
const tickRate = 15; // Anything lower returns the same result.
let tickCount = 0;
// Player Object

// DOM

const outputBox = document.getElementById('textOutput') as HTMLDivElement;
// TODO: group canvas variables into a single object
// Animation variables
const canvas = document.getElementById('canvas') as HTMLDivElement;
const goldCounter = document.getElementById('goldCount') as HTMLSpanElement;
const dayAndNight = document.getElementById('dayNight') as HTMLImageElement;
const day = {
  red: 183,
  green: 255,
  blue: 255,
};
const sunSetAndRise = {
  red: 255,
  green: 221,
  blue: 138,
};
const night = {
  red: 44,
  green: 47,
  blue: 107,
};
let red = 183;
let blue = 255;
let green = 255;
let degree = 0;

// Menu button array
const btnMenu = document.querySelectorAll('.btnMenu');
const divMenu = document.querySelectorAll('.menuFrame');

// Prestige Shop
const spnPrestigePoints = document.getElementById('spnPoints') as HTMLSpanElement;
const spnPrestigeLevel = document.getElementById('spnLevel') as HTMLSpanElement;
const spnPrestigeExpCurrent = document.getElementById('spnCurrentExp') as HTMLSpanElement;
const spnPrestigeExpMax = document.getElementById('spnMaxExp') as HTMLSpanElement;
const btnPrestige = document.getElementById('btnPrestige') as HTMLButtonElement;

// Debug
const tickCounterSpan = document.getElementById('tickCounter') as HTMLSpanElement;
const btnDebugState = document.getElementById('debugButton') as HTMLButtonElement;

/*

FUNCTIONS

*/
/* #########################################################
                        DOM updates
######################################################### */
// Counts the amount of digits in a number
function digitCounter(number: number, count = 0): number {
  if (number) {
    count += 1;
    return digitCounter(Math.floor(number / 10), count);
  }
  return count;
}
// Visual aid to convert large numbers to a number that is easier to understand.
function numberToAsciiConverter(number: number): string {
  let stringLength = digitCounter(number);
  const ascii = 96;
  let loopCount = 0;
  console.log(`Number: ${number}`);
  let finalString = number.toFixed();
  console.log(`Finalstring: ${finalString}, stringLength: ${stringLength}`);
  if (stringLength >= 4) {
    while (stringLength >= 4) {
      loopCount += 1;
      stringLength -= 3;
    }
    const divided = 1000 ** loopCount;
    number /= divided;
    console.log(number);
    if (number > 100) {
      finalString = Math.round(number).toString() + String.fromCharCode(ascii + loopCount);
    } else if (number > 10) {
      finalString = number.toFixed(1) + String.fromCharCode(ascii + loopCount);
    } else {
      finalString = number.toFixed(2) + String.fromCharCode(ascii + loopCount);
    }
  }

  return finalString;
}
// Menu functionality
function menuChange(uiElement: Element) {
  if (uiElement.classList.contains('hidden')) {
    for (let i = 0; i < divMenu.length; i += 1) {
      if (!divMenu[i].classList.contains('hidden')) {
        divMenu[i].classList.add('hidden');
      }
    }
    uiElement.classList.remove('hidden');
  }
}

// Text is any input you want to show, positionTarget is which element you want it to base its position on,
// you can input if there's a crit(makes text bigger and changes color), or if it is related to gold, which makes the text golden and outputs "+ x gold" instead
function createText(text: string, positionTarget: any, type: string) {
  const leftRandomOffset = Math.random() * 100 - 50;
  const topRandomOffset = Math.random() * 100 - 50;
  const leftOffset = -120;
  const topOffset = -100;
  const textElement = document.createElement('span');
  textElement.classList.add('displayText');
  switch (type) {
    case 'crit':
      textElement.classList.add('displayTextCrit');
      textElement.innerHTML += `<ruby>${text} <rp>(</rp><rt>Crit!</rt><rp>)</rp></ruby>`;
      break;
    case 'gold':
      textElement.classList.add('displayTextGold');
      textElement.innerHTML = `+${text} Gold`;
      break;
    case 'block':
      textElement.classList.add('displayTextBlock');
      textElement.innerHTML += `<ruby>${text} <rp>(</rp><rt>Block!</rt><rp>)</rp></ruby>`;
      break;
    default:
      textElement.innerHTML = text;
      break;
  }
  const position = positionTarget.image?.getBoundingClientRect();
  textElement.style.left = `${(position.left - leftOffset + leftRandomOffset).toString()}px`;
  textElement.style.top = `${(position.top - topOffset + topRandomOffset).toString()}px`;
  canvas.appendChild(textElement);

  const animation = textElement.animate(
    [
      { transform: 'translateY(0px)', opacity: '1' },
      { transform: 'translateY(-100px)', opacity: '0' },
    ],
    {
      duration: 2500,
      iterations: 1,
      easing: 'ease-in-out',
    }
  );
  animation.play();
  animation.onfinish = () => {
    textElement.remove();
  };
}

function updateStatFrame(target: any): void {
  if (target.statFrame !== undefined) {
    target.statFrame.spnAttack.innerHTML = Math.round(target.DAMAGE).toFixed(0);
    target.statFrame.spnHealthMax.innerHTML = Math.round(target.HEALTH_MAX).toString();
    target.statFrame.spnHealthRegen.innerHTML = target.HEALTH_REGEN.toFixed(1);
    target.statFrame.spnAttackSpeed.innerHTML = ((tickRate / target.ATTACK_COOLDOWN) * 10).toFixed(2);
    target.statFrame.spnCritChance.innerHTML = `${(target.CRIT_CHANCE * 100).toFixed(2)}%`;
    target.statFrame.spnCritMultiplier.innerHTML = `${(target.CRIT_MULTIPLIER * 100).toString()}%`;
    target.statFrame.spnBlockChance.innerHTML = `${(target.BLOCK_CHANCE * 100).toFixed(2)}%`;
    target.statFrame.spnLevel.innerHTML = `${unit.enemy.LEVEL}`;
  }
}

function updateGoldDisplay(): void {
  goldCounter.innerHTML = numberToAsciiConverter(unit.player.GOLD);
}

function updatePrestigeDisplay(): void {
  spnPrestigePoints.innerHTML = unit.player.PRESTIGE_POINTS.toString();
  spnPrestigeLevel.innerHTML = unit.player.PRESTIGE_LEVEL.toString();
  spnPrestigeExpCurrent.innerHTML = unit.player.PRESTIGE_EXP.toString();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  spnPrestigeExpMax.innerHTML = maxExpRequired().toString();
}
// Updates healthbar
// If you want to update the max values of the healthbar, you can pass on true to make it update those values as well.

function updateHealthBar(target: any, updateMax = false): void {
  const { healthBar } = target;
  const healthMax = target.HEALTH_MAX;
  const healthCurrent = target.HEALTH_CURRENT;
  healthBar.value = healthCurrent;

  // Only runs when you want it to.
  if (updateMax) {
    healthBar.max = healthMax;
    healthBar.low = healthMax / 3;
    healthBar.high = healthMax / 2;
    healthBar.optimum = healthMax * 0.67;
  }
}
// Updates the attack progressbar, like updateHealthBar, the boolean decides if it updates max value too
function updateAttackTimerBar(target: any, updateMax = false): void {
  target.attackTimerBar.value = target.ATTACK_TIMER;
  if (updateMax) {
    target.attackTimerBar.max = target.ATTACK_COOLDOWN;
  }
}

// outputs text into the combatlog! You can input a styling like b, headers, i, etc as a quickhand,
// although the original text string also supports these.
// in case of the style input, you omit<and>, as they are automatically added.
// The purpose include readability.
function output(text?: string, style?: string): void {
  outputBox.innerHTML += `<${style}><br>${text}<${style}>`;
  outputBox.scrollTop = outputBox.scrollHeight;
}

/* #########################################################
                        Shop and UI and Stats
######################################################### */
function shopMath(shopItem: { NAME: string; BASE_POWER: number; BOUGHT: number; POWER_MULTIPLIER: number }): number {
  let powerCalc: number = shopItem.BASE_POWER + shopItem.BOUGHT * shopItem.POWER_MULTIPLIER;
  if (shopItem.NAME === unit.shop.ATTACK_SPEED.NAME) {
    powerCalc = shopItem.BASE_POWER / (1 + shopItem.BOUGHT * shopItem.POWER_MULTIPLIER);
  }
  if (shopItem.NAME === unit.shop.CRIT_CHANCE.NAME || shopItem === unit.shop.BLOCK_CHANCE) {
    powerCalc = shopItem.BASE_POWER + (shopItem.BOUGHT / 1000) * shopItem.POWER_MULTIPLIER;
  }
  if (shopItem === unit.shop.CRIT_MULTIPLIER) {
    powerCalc = shopItem.BASE_POWER + (shopItem.BOUGHT / 100) * shopItem.POWER_MULTIPLIER;
  }
  if (powerCalc >= 1) {
    return Number(powerCalc.toFixed(0));
  }
  if (powerCalc >= 0.1) {
    return Number(powerCalc.toFixed(1));
  }
  if (powerCalc >= 0.01) {
    return Number(powerCalc.toFixed(2));
  }
  return Number(powerCalc.toFixed(3));
}
function shopCost(shopItem: { BASE_COST: number; COST_MULTIPLIER: number; BOUGHT: number }): number {
  return Math.round(shopItem.BASE_COST + shopItem.BASE_COST * shopItem.COST_MULTIPLIER * shopItem.BOUGHT);
}
function updateShop(shopItem: any): void {
  const cost = shopCost(shopItem);
  let power = shopMath(shopItem);
  // If it is supposed to show in %, do so
  if (shopItem === unit.shop.BLOCK_CHANCE || shopItem === unit.shop.CRIT_CHANCE) {
    const powerString = `${power.toString()}%`;
    shopItem.DOM.innerHTML = `${shopItem.NAME}<br>${cost} Gold<br>+ ${powerString}`;
  } else if (shopItem === unit.shop.ATTACK_SPEED) {
    // Special case for attack speed
    shopItem.DOM.innerHTML = `${shopItem.NAME}<br>${cost} Gold<br>- ${power * 15} ms`;
  } else if (shopItem === unit.shop.CRIT_MULTIPLIER) {
    power *= 100;
    const powerString = `${power.toString()}%`;
    shopItem.DOM.innerHTML = `${shopItem.NAME}<br>${cost} Gold<br>+ ${powerString}`;
  } else {
    // Everything else.
    shopItem.DOM.innerHTML = `${shopItem.NAME}<br>${cost} Gold<br>+ ${power}`;
  }
}

function calculatePlayerStats(): void {
  unit.player.DAMAGE = unit.player.base.DAMAGE + shopMath(unit.shop.ATTACK);
  unit.player.HEALTH_MAX = unit.player.base.HEALTH_MAX + shopMath(unit.shop.HEALTH);
  unit.player.HEALTH_REGEN = unit.player.base.HEALTH_REGEN + shopMath(unit.shop.HEALTH_REGEN);
  unit.player.CRIT_CHANCE = unit.player.base.CRIT_CHANCE + shopMath(unit.shop.CRIT_CHANCE) / 100;
  unit.player.CRIT_MULTIPLIER = unit.player.base.CRIT_MULTIPLIER + shopMath(unit.shop.CRIT_MULTIPLIER);
  unit.player.BLOCK_CHANCE = unit.player.base.BLOCK_CHANCE + shopMath(unit.shop.BLOCK_CHANCE);
  unit.player.ATTACK_COOLDOWN = unit.player.base.ATTACK_COOLDOWN - shopMath(unit.shop.ATTACK_SPEED);
}

function calculateEnemyStats() {
  // Sets enemies stats to their values based on what level they are.
  unit.enemy.HEALTH_MAX = unit.enemy.base.HEALTH_MAX + unit.enemy.LEVEL * unit.enemy.multiplier.HEALTH_MAX;
  unit.enemy.DAMAGE = unit.enemy.base.DAMAGE + unit.enemy.LEVEL * unit.enemy.multiplier.DAMAGE;
  unit.enemy.GOLD_DROP = unit.enemy.base.GOLD_DROP + unit.enemy.LEVEL * unit.enemy.multiplier.GOLD_DROP;
  unit.enemy.HEALTH_REGEN = unit.enemy.base.HEALTH_REGEN + unit.enemy.LEVEL * unit.enemy.multiplier.HEALTH_REGEN;
  unit.enemy.BLOCK_CHANCE = unit.enemy.base.BLOCK_CHANCE + unit.enemy.LEVEL / 1000;
  updateHealthBar(unit.enemy, true);
}

function shopBuy(shopItem: any): void {
  shopItem.COST = shopCost(shopItem);

  if (unit.player.GOLD >= shopItem.COST) {
    unit.player.GOLD -= shopItem.COST;
    updateGoldDisplay();
    updateShop(shopItem);
    calculatePlayerStats();
    updateStatFrame(unit.player);
    shopItem.BOUGHT += 1;
  }
}

function maxExpRequired(): number {
  return unit.player.PRESTIGE_EXP_LEVELUP + unit.player.PRESTIGE_EXP_LEVELUP * unit.player.PRESTIGE_LEVEL * unit.player.PRESTIGE_EXP_LEVELUP_MULTIPLIER;
}

function levelUpCheck() {
  const expRequired = maxExpRequired();
  if (unit.player.PRESTIGE_EXP >= expRequired) {
    unit.player.PRESTIGE_LEVEL += 1;
    unit.player.PRESTIGE_POINTS += 1;
    unit.player.PRESTIGE_EXP -= expRequired;
    levelUpCheck();
  }
}

function calculateExpGain() {
  const levelsClimbed = unit.enemy.LEVEL - unit.player.HIGHEST_LEVEL_PRESTIGED_AT;
  let gainedExp = 0;
  console.log(`levels climbed${levelsClimbed}`);
  if (levelsClimbed > 0) {
    unit.player.HIGHEST_LEVEL_PRESTIGED_AT = unit.player.HIGHEST_LEVEL_REACHED;
    gainedExp = levelsClimbed / 2.5 + unit.enemy.LEVEL / 80;
  } else {
    gainedExp = unit.enemy.LEVEL / 80;
  }
  unit.player.PRESTIGE_EXP += Math.round(gainedExp);
}
function updateAllShops() {
  updateShop(unit.shop.ATTACK);
  updateShop(unit.shop.HEALTH);
  updateShop(unit.shop.HEALTH_REGEN);
  updateShop(unit.shop.ATTACK_SPEED);
  updateShop(unit.shop.CRIT_CHANCE);
  updateShop(unit.shop.CRIT_MULTIPLIER);
  updateShop(unit.shop.BLOCK_CHANCE);
}
function initialize() {
  calculatePlayerStats();
  updateStatFrame(unit.player);
  updateHealthBar(unit.player);
  updateGoldDisplay();
  updateAttackTimerBar(unit.player, true);
  updateHealthBar(unit.enemy);
  updateAttackTimerBar(unit.enemy, true);
  updatePrestigeDisplay();
  updateAllShops();
}
/* #########################################################
                 Attack and death logic
######################################################### */

// Heals a target
function heal(target: types.Health & types.LogicBooleans, amount?: number) {
  if (target.IS_ALIVE && amount != null) {
    // If alive, and amount is given, heal that amount
    target.HEALTH_CURRENT += amount;
  } else if (!target.IS_ALIVE && amount != null) {
    // If NOT alive, and amount is given, health is equal to the amount
    target.HEALTH_CURRENT = amount;
  } else {
    // If all fails, give full health
    target.HEALTH_CURRENT = target.HEALTH_MAX;
  }
}

// Respawns a target that has fallen 💀
function respawn(target: any) {
  // gives target max hp
  target.IS_RESPAWNING = true;
  if (target.image.src !== target.frameState.dead) {
    target.image.src = target.frameState.dead;
  }
  const respawnCooldown = 150;
  target.RESPAWN_TIMER += 1;
  if (target.RESPAWN_TIMER >= respawnCooldown) {
    // If it is the enemy that dies, level it up, give gold to player, etc.
    if (target.IS_PLAYABLE_CHARACTER === false) {
      unit.enemy.LEVEL += 1;
      if (!unit.player.PRESTIGE_ENABLED && unit.enemy.LEVEL >= 50) {
        unit.player.PRESTIGE_ENABLED = true;
        btnPrestige.disabled = false;
      }
      unit.player.GOLD += unit.enemy.GOLD_DROP;
      createText(unit.enemy.GOLD_DROP.toString(), unit.player, 'gold');
      updateGoldDisplay();
      updateStatFrame(unit.player);
      if (unit.player.HIGHEST_LEVEL_REACHED <= unit.enemy.LEVEL) {
        unit.player.HIGHEST_LEVEL_REACHED = unit.enemy.LEVEL;
      }
    } else {
      // if it was the player that died, reduce level of enemy to make it easier, and heal it up again.
      if (unit.enemy.LEVEL > 10) {
        unit.enemy.LEVEL -= 10;
      } else {
        unit.enemy.LEVEL = 1;
      }
      heal(unit.enemy);
    }
    calculateEnemyStats();
    heal(target);

    target.RESPAWN_TIMER = 0;
    target.IS_ALIVE = true;
    target.IS_RESPAWNING = false;
    target.ATTACK_TIMER = 0;
    target.image.src = target.frameState.idle[0];
    updateHealthBar(target);
  }
}
function regeneration(target: any) {
  if (target.HEALTH_CURRENT < target.HEALTH_MAX) {
    heal(target, target.HEALTH_REGEN / (1000 / tickRate));
    updateHealthBar(target);
  }
}
// Checks whenever they're dead
function checkDeath(victim: types.Health & types.LogicBooleans & types.UIElements & types.CombatStats & types.UtilityStats): void {
  if (Math.floor(victim.HEALTH_CURRENT) <= 0) {
    // If their hp is 0 is below, cause respawn
    victim.IS_ALIVE = false;
    respawn(victim);
  }
}

// Calculates the damage dealt
function damageCalculation(attacker: types.CombatStats, defender: { BLOCK_CHANCE: number }): [number, string] {
  let damageDealt = 0;
  const blockRNG: number = Math.random();
  let type = 'normal';
  if (defender.BLOCK_CHANCE >= blockRNG) {
    // Blocks damage
    type = 'block';
    damageDealt = attacker.DAMAGE * 0.2; // Deals only 20% of damage if blocked
  } else {
    // Rolls for crit
    const critRNG: number = Math.random();

    if (attacker.CRIT_CHANCE >= critRNG) {
      // If crit, deals damage * multiplier!
      damageDealt = attacker.DAMAGE * attacker.CRIT_MULTIPLIER;
      type = 'crit';
    } else {
      damageDealt = attacker.DAMAGE;
    }
  }
  const damageResult: [number, string] = [damageDealt, type];
  return damageResult;
}

function attack(attacker: types.CombatStats & types.UtilityStats, defender: any): void {
  const damageResult = damageCalculation(attacker, defender);
  defender.HEALTH_CURRENT -= damageResult[0];
  attacker.ATTACK_TIMER = 0;
  updateHealthBar(defender);
  output(`${attacker.NAME} attacks ${defender.NAME} and deals ${damageResult[0]} damage!`);
  createText(damageResult[0].toFixed(0), defender, damageResult[1]);
  checkDeath(defender);
}

function attackCount(attacker: any, defender: types.LogicBooleans): void {
  // If the player is dead, or already attacking, end this function(optimization?)
  if (!attacker.IS_ALIVE || !defender.IS_ALIVE) {
    return;
  }
  attacker.ATTACK_TIMER += 1;
  updateAttackTimerBar(attacker);
  if (attacker.ATTACK_TIMER >= attacker.ATTACK_COOLDOWN) {
    // Player Attack
    attacker.IS_ATTACKING = true;
  }
}

function adjustColor(color: number, target: number, speed = 1): number {
  if (color < target) {
    color += speed;
  } else if (color > target) {
    color -= speed;
  }
  return color;
}

// ANIMATION FUNCTIONS
// Rotates the background, gets called every tick.

function backgroundCycle() {
  const sunSetTime = 50;
  const nightStartTime = 90;
  const sunRiseTime = 250;
  const dayTime = 300;
  const colorChangeSpeed = 0.6;
  degree += 0.1;
  if (degree >= 360) {
    degree = 0; // Resets degree to reduce headache
  }
  dayAndNight.style.transform = `rotate(${degree}deg)`;
  if (degree >= dayTime || degree <= sunSetTime) {
    red = adjustColor(red, day.red, colorChangeSpeed);
    green = adjustColor(green, day.green, colorChangeSpeed);
    blue = adjustColor(blue, day.blue, colorChangeSpeed);

    // Sunset & rise
  } else if ((degree < dayTime && degree > sunRiseTime) || (degree > sunSetTime && degree < nightStartTime)) {
    red = adjustColor(red, sunSetAndRise.red, colorChangeSpeed);
    green = adjustColor(green, sunSetAndRise.green, colorChangeSpeed);
    blue = adjustColor(blue, sunSetAndRise.blue, colorChangeSpeed);
    // Night
  } else if (degree > nightStartTime && degree < sunRiseTime) {
    red = adjustColor(red, night.red, colorChangeSpeed);
    green = adjustColor(green, night.green, colorChangeSpeed);
    blue = adjustColor(blue, night.blue, colorChangeSpeed);
  }
  canvas.style.backgroundColor = `rgb(${red},${green},${blue})`;
}

function resetAttackState(target: types.LogicBooleans & types.CombatStats) {
  target.IS_ATTACKING = false;
  target.ATTACK_TIMER = 0;
  target.CHARGE_TIMER = 0;
}
/*
NOTE: I tried making this function "general",
but I can't find a good way to differentiate between them moving left or right, if I do, this code is cut in half.
TODO: Potential solution would be to generalize it but add cases depending on the object.
This would probably cut it by 1/3rd.
*/
function animate() {
  const distance = 50; // How close they will get, higher number = closer
  // Causes player to lunge forward if it is time to attack
  const speed = 1; // How many % they will move every tick.
  const startDistance = 5;
  const playerPortrait = unit.player.portrait as HTMLDivElement;
  const enemyPortrait = unit.enemy.portrait as HTMLDivElement;
  if (unit.player.IS_ATTACKING) {
    // As long as it hasn't arrived, keep moving
    if (!unit.player.IS_FRONT_OF_OPPONENT) {
      unit.player.xPos += speed;
      playerPortrait.style.left = `${unit.player.xPos}%`;
    }

    if (unit.player.xPos + unit.enemy.xPosReversed >= distance) {
      // If close enough, perform attack
      unit.player.IS_FRONT_OF_OPPONENT = true;
    }
    if (unit.player.IS_FRONT_OF_OPPONENT) {
      unit.player.CHARGE_TIMER += 1;
    }

    if (unit.player.CHARGE_TIMER >= unit.player.CHARGE_COOLDOWN) {
      attack(unit.player, unit.enemy);
      resetAttackState(unit.player); // Reset attack
      unit.player.IS_FRONT_OF_OPPONENT = false;
    }
  } else if (!unit.player.IS_ATTACKING && unit.player.xPos > startDistance) {
    // Moves it back
    unit.player.xPos -= speed;
    playerPortrait.style.left = `${unit.player.xPos}%`;
  }

  if (unit.enemy.IS_ATTACKING) {
    if (!unit.enemy.IS_FRONT_OF_OPPONENT) {
      unit.enemy.xPosReversed += speed;
      enemyPortrait.style.right = `${unit.enemy.xPosReversed}%`;
    }
    if (unit.player.xPos + unit.enemy.xPosReversed >= distance) {
      // If close enough, perform attack
      unit.enemy.IS_FRONT_OF_OPPONENT = true;
    }
    if (unit.enemy.IS_FRONT_OF_OPPONENT) {
      unit.enemy.CHARGE_TIMER += 1;
      if (unit.enemy.CHARGE_TIMER >= unit.enemy.CHARGE_COOLDOWN) {
        attack(unit.enemy, unit.player);
        resetAttackState(unit.enemy);
        unit.enemy.IS_FRONT_OF_OPPONENT = false;
      }
    }
  } else if (!unit.enemy.IS_ATTACKING && unit.enemy.xPosReversed > startDistance) {
    // Moves it back
    unit.enemy.xPosReversed -= speed;
    enemyPortrait.style.right = `${unit.enemy.xPosReversed}%`;
  }

  backgroundCycle();
}

// NOTE: Temporary, just for debugging.
btnDebugState.addEventListener('click', () => {
  console.log(unit.player);
  console.log(unit.enemy);
  console.log(unit.shop);
});

function degreeDisplay() {
  const spnDegree = document.getElementById('degreeSpn') as HTMLSpanElement;
  spnDegree.innerHTML = `${degree.toFixed(1)}<br>red: ${red.toFixed(1)}<br>green: ${green.toFixed(1)}<br>blue: ${blue.toFixed(1)}`;
}
/*

DEBUG

*/
// NOTE: trying to calculate how many updates per second we get.
const tpsSpan = document.getElementById('ticksPerSecond') as HTMLSpanElement;
const d = new Date();
let pastSecond = d.getTime();
let x = 0;
function ticksPerSecond() {
  x += 1;
  if (x === 100) {
    const d2 = new Date();
    const currentTime = d2.getTime();
    const difference: number = 1000 / ((currentTime - pastSecond) / 100);
    tpsSpan.innerHTML = difference.toFixed(2);
    pastSecond = currentTime;
    x = 0;
  }
}

/*

LOGIC

*/

function resetStats() {
  unit.player.DAMAGE = unit.player.base.DAMAGE;
  unit.player.HEALTH_MAX = unit.player.base.HEALTH_MAX;
  unit.player.HEALTH_CURRENT = unit.player.base.HEALTH_MAX;
  unit.player.HEALTH_REGEN = unit.player.base.HEALTH_REGEN;
  unit.player.ATTACK_COOLDOWN = unit.player.base.ATTACK_COOLDOWN;
  unit.player.ATTACK_TIMER = 0;
  unit.player.BLOCK_CHANCE = unit.player.base.BLOCK_CHANCE;
  unit.player.CRIT_CHANCE = unit.player.base.CRIT_CHANCE;
  unit.player.CRIT_MULTIPLIER = unit.player.base.CRIT_MULTIPLIER;
  unit.player.GOLD = unit.player.base.GOLD;
  unit.enemy.DAMAGE = unit.enemy.base.DAMAGE;
  unit.enemy.HEALTH_MAX = unit.enemy.base.HEALTH_MAX;
  unit.enemy.HEALTH_CURRENT = unit.enemy.base.HEALTH_MAX;
  unit.enemy.HEALTH_REGEN = unit.enemy.base.HEALTH_REGEN;
  unit.enemy.ATTACK_COOLDOWN = unit.enemy.base.ATTACK_COOLDOWN;
  unit.enemy.ATTACK_TIMER = 0;
  unit.enemy.BLOCK_CHANCE = unit.enemy.base.BLOCK_CHANCE;
  unit.enemy.CRIT_CHANCE = unit.enemy.base.CRIT_CHANCE;
  unit.enemy.CRIT_MULTIPLIER = unit.enemy.base.CRIT_MULTIPLIER;
}

// Main loop, runs each x tickrate and keeps the game rolling
function gameLoop() {
  tickCount += 1;
  // Attack function
  tickCounterSpan.innerHTML = tickCount.toString();

  attackCount(unit.player, unit.enemy);
  attackCount(unit.enemy, unit.player);
  regeneration(unit.player);
  regeneration(unit.enemy);
  // If they're in respawning state, initiate that.
  if (unit.player.IS_RESPAWNING) {
    respawn(unit.player);
  }
  if (unit.enemy.IS_RESPAWNING) {
    respawn(unit.enemy);
  }

  // Animation function
  animate();

  // Loopieloop loop - setInterval? Heard it is better with setTimeout for this, but got to ask
  ticksPerSecond();
  degreeDisplay();
  setTimeout(gameLoop, tickRate);
}
// Loops over all shop buttons to give them their info.

/*
FIXME: Typescript doesn't like this one

Object.keys(shop).forEach(key => {
  shop[key].DOM.addEventListener('click', () => {
    shopBuy(shop[key]);
  });
  updateShop(shop[key]);
});
*/

// NOTE: Temporary fix for above...
unit.shop.ATTACK.DOM?.addEventListener('click', () => {
  shopBuy(unit.shop.ATTACK);
  updateShop(unit.shop.ATTACK);
});
unit.shop.HEALTH.DOM?.addEventListener('click', () => {
  shopBuy(unit.shop.HEALTH);
  updateShop(unit.shop.HEALTH);
});
unit.shop.HEALTH_REGEN.DOM?.addEventListener('click', () => {
  shopBuy(unit.shop.HEALTH_REGEN);
  updateShop(unit.shop.HEALTH_REGEN);
});
unit.shop.ATTACK_SPEED.DOM?.addEventListener('click', () => {
  shopBuy(unit.shop.ATTACK_SPEED);
  updateShop(unit.shop.ATTACK_SPEED);
});
unit.shop.CRIT_CHANCE.DOM?.addEventListener('click', () => {
  shopBuy(unit.shop.CRIT_CHANCE);
  updateShop(unit.shop.CRIT_CHANCE);
});
unit.shop.CRIT_MULTIPLIER.DOM?.addEventListener('click', () => {
  shopBuy(unit.shop.CRIT_MULTIPLIER);
  updateShop(unit.shop.CRIT_MULTIPLIER);
});
unit.shop.BLOCK_CHANCE.DOM?.addEventListener('click', () => {
  shopBuy(unit.shop.BLOCK_CHANCE);
  updateShop(unit.shop.BLOCK_CHANCE);
});

for (let i = 0; i < btnMenu.length; i += 1) {
  btnMenu[i].addEventListener('click', () => {
    menuChange(divMenu[i]);
  });
}

btnPrestige.addEventListener('click', () => {
  console.log('prestige!');
  calculateExpGain();
  levelUpCheck();
  updatePrestigeDisplay();
  resetStats();
  initialize();
});

// Makes player and enemy stats accurate on start.

initialize();
gameLoop(); // Finally we can start playing the game!
