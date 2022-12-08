/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/comma-dangle */
/* hehe... eslint go boom */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import './style/style.scss';

// I'm sorry Jenni, for what you're about to see.

type Health = {
  HEALTH_MAX: number;
  HEALTH_CURRENT: number;
  HEALTH_REGEN: number;
};
type CombatStats = {
  DAMAGE: number;
  ATTACK_TIMER: number;
  ATTACK_COOLDOWN: number;
  CHARGE_TIMER: number;
  CHARGE_COOLDOWN: number;
  CRIT_CHANCE: number;
  CRIT_MULTIPLIER: number;
  BLOCK_CHANCE: number;
};
type UtilityStats = {
  NAME: string;
  RESPAWN_TIMER: number;
  GOLD?: number;
  GOLD_DROP?: number;
  LEVEL?: number;
};
// FIXME: This fucker doesn't work it seems, any use related to it currently has "any" to temporary fix, look over this
type UIElements = {
  healthBar: HTMLMeterElement;
  attackTimerBar: HTMLMeterElement;
  xPos?: number;
  xPosReversed?: number;
  portrait: HTMLDivElement;
  image: HTMLImageElement;
  frameState: {
    idle: string;
    dead: string;
  };
};
type LogicBooleans = {
  IS_ATTACKING: boolean;
  IS_FRONT_OF_OPPONENT: boolean;
  IS_ALIVE: boolean;
  IS_RESPAWNING: boolean;
  IS_PLAYABLE_CHARACTER: boolean;
};
/*
type StatFrame = {
  statFrame: {
    spnAttack: HTMLSpanElement;
    spnHealthMax: HTMLSpanElement;
    spnAttackSpeed: HTMLSpanElement;
  };
};
type BaseType = {
  HEALTH_MAX: number;
  HEALTH_REGEN: number;
  DAMAGE: number;
  GOLD_DROP: number;
};

type MultiplierType = {
  HEALTH_MAX: number;
  HEALTH_REGEN: number;
  DAMAGE: number;
  GOLD_DROP: number;
};

type Character = Health &
  CombatStats &
  UtilityStats &
  BaseType &
  MultiplierType &
  LogicBooleans &
  UIElements &
  StatFrame;

interface Character {
  health: Health;
  combat: CombatStats;
  common: UtilityStats;
  base: BaseType;
  multiplier: MultiplierType;
  logic: LogicBooleans;
  ui: UIElements;
  uiFrame?: StatFrame;
}
*/
/*

VARIABLES AND DEFINITIONS

*/
// Logic variables
const tickRate = 15; // Anything lower returns the same result.
let tickCount = 0;

// Player Object

const player = {
  // player stats
  NAME: 'PlayerName',
  HEALTH_MAX: 100,
  HEALTH_CURRENT: 100,
  HEALTH_REGEN: 1,
  DAMAGE: 5,
  ATTACK_TIMER: 0,
  ATTACK_COOLDOWN: 220,
  CHARGE_TIMER: 0,
  CHARGE_COOLDOWN: 50,
  CRIT_CHANCE: 0.05,
  CRIT_MULTIPLIER: 1.2,
  BLOCK_CHANCE: 0.05,
  GOLD: 500,
  RESPAWN_TIMER: 0,
  // Used to calculate and able to backtrack
  base: {
    HEALTH_MAX: 100,
    HEALTH_REGEN: 5,
    DAMAGE: 5,
    ATTACK_COOLDOWN: 220,
    CRIT_CHANCE: 0.05,
    CRIT_MULTIPLIER: 1.2,
    BLOCK_CHANCE: 0.05,
  },
  // Keeps tracks on how many is bought for each item for the purpose of calculating the cost of future upgrades

  // Logic booleans
  IS_PLAYABLE_CHARACTER: true,
  IS_ATTACKING: false,
  IS_FRONT_OF_OPPONENT: false,
  IS_ALIVE: true,
  IS_RESPAWNING: false,

  // DOM on canvas and position
  xPos: 0,
  portrait: document.getElementById('playerPortrait'),
  image: document.getElementById('playerImage'),
  frameState: {
    idle: ['assets/combatzone/player/player_idle_1.svg'],
    dead: 'assets/combatzone/universal/gravestone.svg',
  },
  healthBar: document.getElementById('playerHealthBar'),
  attackTimerBar: document.getElementById('playerAttackBar'),

  // Player info DOM
  statFrame: {
    spnAttack: document.getElementById('spnPlayerAttack'),
    spnHealthMax: document.getElementById('spnPlayerHealthMax'),
    spnAttackSpeed: document.getElementById('spnPlayerAttackSpeed'),
  },
};

// Enemy object
const enemy = {
  NAME: 'Slime',
  HEALTH_MAX: 20,
  HEALTH_CURRENT: 20,
  HEALTH_REGEN: 0.1,
  DAMAGE: 3,
  ATTACK_TIMER: 0,
  ATTACK_COOLDOWN: 310,
  CHARGE_TIMER: 0,
  CHARGE_COOLDOWN: 50,
  CRIT_CHANCE: 0.05,
  CRIT_MULTIPLIER: 1.2,
  BLOCK_CHANCE: 0.05,
  GOLD_DROP: 5,
  RESPAWN_TIMER: 0,
  LEVEL: 1,
  // Used to calculate and able to backtrack
  base: {
    HEALTH_MAX: 20,
    HEALTH_REGEN: 0.1,
    DAMAGE: 3,
    GOLD_DROP: 5,
  },
  // Determines how much stronger the enemy gets per level
  multiplier: {
    HEALTH_MAX: 1.6,
    HEALTH_REGEN: 0.1,
    DAMAGE: 1.4,
    GOLD_DROP: 1.5,
  },
  // Logic booleans
  IS_PLAYABLE_CHARACTER: false,
  IS_ATTACKING: false,
  IS_FRONT_OF_OPPONENT: false,
  IS_ALIVE: true,
  IS_RESPAWNING: false,

  // DOM and position
  xPosReversed: 0,
  portrait: document.getElementById('enemyPortrait'),
  image: document.getElementById('enemyImage'),
  frameState: {
    idle: ['assets/combatzone/enemy/slime_idle_1.svg'],
    dead: 'assets/combatzone/universal/gravestone.svg',
  },
  healthBar: document.getElementById('enemyHealthBar'),
  attackTimerBar: document.getElementById('enemyAttackBar'),
};

const shop = {
  ATTACK: {
    NAME: 'ATTACK',
    COST: 0,
    BASE_COST: 6,
    BASE_POWER: 2,
    COST_MULTIPLIER: 1.6,
    POWER_MULTIPLIER: 1.3,
    BOUGHT: 0,
    DOM: document.getElementById('shopBtnAttack'),
  },
  HEALTH: {
    NAME: 'HEALTH',
    COST: 0,
    BASE_COST: 6,
    BASE_POWER: 5,
    COST_MULTIPLIER: 1.4,
    POWER_MULTIPLIER: 1.25,
    BOUGHT: 0,
    DOM: document.getElementById('shopBtnHealth'),
  },
  HEALTH_REGEN: {
    NAME: 'HEALTH REGENERATION',
    COST: 0,
    BASE_COST: 6,
    BASE_POWER: 1,
    COST_MULTIPLIER: 1.2,
    POWER_MULTIPLIER: 1.15,
    BOUGHT: 0,
    DOM: document.getElementById('shopBtnHealthRegen'),
  },
  ATTACK_SPEED: {
    NAME: 'ATTACK SPEED',
    COST: 0,
    BASE_COST: 30,
    BASE_POWER: 3,
    COST_MULTIPLIER: 2.1,
    POWER_MULTIPLIER: 0.9,
    BOUGHT: 0,
    DOM: document.getElementById('shopBtnAttackSpeed'),
  },
  CRIT_CHANCE: {
    NAME: 'CRIT CHANCE',
    COST: 0,
    BASE_COST: 6,
    BASE_POWER: 0.05,
    COST_MULTIPLIER: 1.5,
    POWER_MULTIPLIER: 0.6,
    BOUGHT: 1,
    DOM: document.getElementById('shopBtnCritChance'),
  },
  CRIT_MULTIPLIER: {
    NAME: 'CRIT MULTIPLIER',
    COST: 0,
    BASE_COST: 6,
    BASE_POWER: 0.1,
    COST_MULTIPLIER: 1.1,
    POWER_MULTIPLIER: 1.1,
    BOUGHT: 0,
    DOM: document.getElementById('shopBtnCritMultiplier'),
  },
  BLOCK_CHANCE: {
    NAME: 'BLOCK CHANCE',
    COST: 0,
    BASE_COST: 6,
    BASE_POWER: 0.05,
    COST_MULTIPLIER: 1.9,
    POWER_MULTIPLIER: 1.04,
    BOUGHT: 0,
    DOM: document.getElementById('shopBtnBlockChance'),
  },
};

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
const divMenu = document.querySelectorAll('.MenuFrame');
// Debug
const tickCounterSpan = document.getElementById('tickCounter') as HTMLSpanElement;
const btnDebugState = document.getElementById('debugButton') as HTMLButtonElement;

/*

FUNCTIONS

*/
/* #########################################################
                        DOM updates
######################################################### */

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
function createText(text: string, positionTarget: any, crit = false, gold?: boolean) {
  const leftRandomOffset = Math.random() * 100 - 50;
  const topRandomOffset = Math.random() * 100 - 50;
  const leftOffset = -120;
  const topOffset = -100;
  const textElement = document.createElement('span');
  textElement.innerHTML = text;
  textElement.classList.add('displayText');
  if (crit) {
    textElement.classList.add('displayTextCrit');
    textElement.innerHTML += '!';
  }
  if (gold) {
    textElement.classList.add('displayTextGold');
    textElement.innerHTML = `+${textElement.innerHTML} Gold`;
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
    target.statFrame.spnAttackSpeed.innerHTML = ((tickRate / target.ATTACK_COOLDOWN) * 10).toFixed(2);
  }
}

function updateGoldDisplay(): void {
  goldCounter.innerHTML = player.GOLD.toString();
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
  if (shopItem.NAME === shop.ATTACK_SPEED.NAME) {
    powerCalc = shopItem.BASE_POWER / (1 + shopItem.BOUGHT * shopItem.POWER_MULTIPLIER);
  }
  if (shopItem.NAME === shop.CRIT_CHANCE.NAME || shopItem === shop.BLOCK_CHANCE) {
    powerCalc = shopItem.BASE_POWER + (shopItem.BOUGHT / 1000) * shopItem.POWER_MULTIPLIER;
  }
  if (shopItem === shop.CRIT_MULTIPLIER) {
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
  if (shopItem === shop.BLOCK_CHANCE || shopItem === shop.CRIT_CHANCE) {
    const powerString = `${power.toString()}%`;
    shopItem.DOM.innerHTML = `${shopItem.NAME}<br>${cost} Gold<br>+ ${powerString}`;
  } else if (shopItem === shop.ATTACK_SPEED) {
    // Special case for attack speed
    shopItem.DOM.innerHTML = `${shopItem.NAME}<br>${cost} Gold<br>- ${power * 15} ms`;
  } else if (shopItem === shop.CRIT_MULTIPLIER) {
    power *= 100;
    const powerString = `${power.toString()}%`;
    shopItem.DOM.innerHTML = `${shopItem.NAME}<br>${cost} Gold<br>+ ${powerString}`;
  } else {
    // Everything else.
    shopItem.DOM.innerHTML = `${shopItem.NAME}<br>${cost} Gold<br>+ ${power}`;
  }
}

function calculatePlayerStats(): void {
  player.DAMAGE += shopMath(shop.ATTACK);
  player.HEALTH_MAX += shopMath(shop.ATTACK);
  player.HEALTH_REGEN += shopMath(shop.HEALTH_REGEN);
  player.CRIT_CHANCE += shopMath(shop.CRIT_CHANCE) / 100;
  player.CRIT_MULTIPLIER += shopMath(shop.CRIT_MULTIPLIER);
  player.BLOCK_CHANCE += shopMath(shop.BLOCK_CHANCE);
  player.ATTACK_COOLDOWN -= shopMath(shop.ATTACK_SPEED);
}

function calculateEnemyStats() {
  // Sets enemies stats to their values based on what level they are.
  enemy.HEALTH_MAX = enemy.base.HEALTH_MAX + enemy.LEVEL * enemy.multiplier.HEALTH_MAX;
  enemy.DAMAGE = enemy.base.DAMAGE + enemy.LEVEL * enemy.multiplier.DAMAGE;
  enemy.GOLD_DROP = enemy.base.GOLD_DROP + enemy.LEVEL * enemy.multiplier.GOLD_DROP;
  enemy.HEALTH_REGEN = enemy.base.HEALTH_REGEN + enemy.LEVEL * enemy.multiplier.HEALTH_REGEN;
  updateHealthBar(enemy, true);
}

function shopBuy(shopItem: any): void {
  shopItem.COST = shopCost(shopItem);

  if (player.GOLD >= shopItem.COST) {
    player.GOLD -= shopItem.COST;
    updateGoldDisplay();
    updateShop(shopItem);
    calculatePlayerStats();
    updateStatFrame(player);
    shopItem.BOUGHT += 1;
  }
}

/* #########################################################
                 Attack and death logic
######################################################### */

// Heals a target
function heal(target: Health & LogicBooleans, amount?: number) {
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
      enemy.LEVEL += 1;
      player.GOLD += enemy.GOLD_DROP;
      createText(enemy.GOLD_DROP.toString(), player, false, true);
      updateGoldDisplay();
    } else {
      // if it was the player that died, reduce level of enemy to make it easier, and heal it up again.
      if (enemy.LEVEL > 10) {
        enemy.LEVEL -= 10;
      } else {
        enemy.LEVEL = 1;
      }
      heal(enemy);
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
function checkDeath(victim: Health & LogicBooleans & UIElements & CombatStats & UtilityStats): void {
  if (Math.floor(victim.HEALTH_CURRENT) <= 0) {
    // If their hp is 0 is below, cause respawn
    victim.IS_ALIVE = false;
    respawn(victim);
  }
}

// Calculates the damage dealt
function damageCalculation(attacker: CombatStats, defender: { BLOCK_CHANCE: number }): [number, boolean] {
  let damageDealt = 0;
  const blockRNG: number = Math.random();
  let critHit = false;
  if (defender.BLOCK_CHANCE >= blockRNG) {
    // Blocks damage
    damageDealt = attacker.DAMAGE * 0.2; // Deals only 20% of damage if blocked
  } else {
    // Rolls for crit
    const critRNG: number = Math.random();

    if (attacker.CRIT_CHANCE >= critRNG) {
      // If crit, deals damage * multiplier!
      damageDealt = attacker.DAMAGE * attacker.CRIT_MULTIPLIER;
      critHit = true;
    } else {
      damageDealt = attacker.DAMAGE;
    }
  }
  const damageResult: [number, boolean] = [damageDealt, critHit];
  return damageResult;
}

function attack(attacker: CombatStats & UtilityStats, defender: any): void {
  const damageResult = damageCalculation(attacker, defender);
  defender.HEALTH_CURRENT -= damageResult[0];
  attacker.ATTACK_TIMER = 0;
  updateHealthBar(defender);
  output(`${attacker.NAME} attacks ${defender.NAME} and deals ${damageResult[0]} damage!`);
  createText(damageResult[0].toFixed(0), defender, damageResult[1]);
  checkDeath(defender);
}

function attackCount(attacker: any, defender: LogicBooleans): void {
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

function resetAttackState(target: LogicBooleans & CombatStats) {
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
  const playerPortrait = player.portrait as HTMLDivElement;
  const enemyPortrait = enemy.portrait as HTMLDivElement;
  if (player.IS_ATTACKING) {
    // As long as it hasn't arrived, keep moving
    if (!player.IS_FRONT_OF_OPPONENT) {
      player.xPos += speed;
      playerPortrait.style.left = `${player.xPos}%`;
    }

    if (player.xPos + enemy.xPosReversed >= distance) {
      // If close enough, perform attack
      player.IS_FRONT_OF_OPPONENT = true;
    }
    if (player.IS_FRONT_OF_OPPONENT) {
      player.CHARGE_TIMER += 1;
    }

    if (player.CHARGE_TIMER >= player.CHARGE_COOLDOWN) {
      attack(player, enemy);
      resetAttackState(player); // Reset attack
      player.IS_FRONT_OF_OPPONENT = false;
    }
  } else if (!player.IS_ATTACKING && player.xPos > startDistance) {
    // Moves it back
    player.xPos -= speed;
    playerPortrait.style.left = `${player.xPos}%`;
  }

  if (enemy.IS_ATTACKING) {
    if (!enemy.IS_FRONT_OF_OPPONENT) {
      enemy.xPosReversed += speed;
      enemyPortrait.style.right = `${enemy.xPosReversed}%`;
    }
    if (player.xPos + enemy.xPosReversed >= distance) {
      // If close enough, perform attack
      enemy.IS_FRONT_OF_OPPONENT = true;
    }
    if (enemy.IS_FRONT_OF_OPPONENT) {
      enemy.CHARGE_TIMER += 1;
      if (enemy.CHARGE_TIMER >= enemy.CHARGE_COOLDOWN) {
        attack(enemy, player);
        resetAttackState(enemy);
        enemy.IS_FRONT_OF_OPPONENT = false;
      }
    }
  } else if (!enemy.IS_ATTACKING && enemy.xPosReversed > startDistance) {
    // Moves it back
    enemy.xPosReversed -= speed;
    enemyPortrait.style.right = `${enemy.xPosReversed}%`;
  }

  backgroundCycle();
}

/*

LOGIC

*/
// NOTE: Temporary, just for debugging.
btnDebugState.addEventListener('click', () => {
  console.log(player);
  console.log(enemy);
  console.log(shop);
});

function degreeDisplay() {
  const spnDegree = document.getElementById('degreeSpn') as HTMLSpanElement;
  spnDegree.innerHTML = `${degree.toFixed(1)}<br>red: ${red.toFixed(1)}<br>green: ${green.toFixed(1)}<br>blue: ${blue.toFixed(1)}`;
}

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

// Unsure on the best way to do this, because it needs the parent parameter.

// Main loop, runs each x tickrate and keeps the game rolling
function gameLoop() {
  tickCount += 1;
  // Attack function
  tickCounterSpan.innerHTML = tickCount.toString();

  attackCount(player, enemy);
  attackCount(enemy, player);
  regeneration(player);
  regeneration(enemy);
  // If they're in respawning state, initiate that.
  if (player.IS_RESPAWNING) {
    respawn(player);
  }
  if (enemy.IS_RESPAWNING) {
    respawn(enemy);
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
shop.ATTACK.DOM?.addEventListener('click', () => {
  shopBuy(shop.ATTACK);
  updateShop(shop.ATTACK);
});
shop.HEALTH.DOM?.addEventListener('click', () => {
  shopBuy(shop.HEALTH);
  updateShop(shop.HEALTH);
});
shop.HEALTH_REGEN.DOM?.addEventListener('click', () => {
  shopBuy(shop.HEALTH_REGEN);
  updateShop(shop.HEALTH_REGEN);
});
shop.ATTACK_SPEED.DOM?.addEventListener('click', () => {
  shopBuy(shop.ATTACK_SPEED);
  updateShop(shop.ATTACK_SPEED);
});
shop.CRIT_CHANCE.DOM?.addEventListener('click', () => {
  shopBuy(shop.CRIT_CHANCE);
  updateShop(shop.CRIT_CHANCE);
});
shop.CRIT_MULTIPLIER.DOM?.addEventListener('click', () => {
  shopBuy(shop.CRIT_MULTIPLIER);
  updateShop(shop.CRIT_MULTIPLIER);
});
shop.BLOCK_CHANCE.DOM?.addEventListener('click', () => {
  shopBuy(shop.BLOCK_CHANCE);
  updateShop(shop.BLOCK_CHANCE);
});

for (let i = 0; i < btnMenu.length; i += 1) {
  btnMenu[i].addEventListener('click', () => {
    menuChange(divMenu[i]);
  });
}

updateShop(shop.ATTACK);
updateShop(shop.HEALTH);
updateShop(shop.HEALTH_REGEN);
updateShop(shop.ATTACK_SPEED);
updateShop(shop.CRIT_CHANCE);
updateShop(shop.CRIT_MULTIPLIER);
updateShop(shop.BLOCK_CHANCE);
// Makes player and enemy stats accurate on start.
updateStatFrame(player);
updateHealthBar(player);
updateGoldDisplay();
updateAttackTimerBar(player, true);
updateHealthBar(enemy);
updateAttackTimerBar(enemy, true);

gameLoop(); // Finally we can start playing the game!
