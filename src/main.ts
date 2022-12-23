/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* hehe... eslint go boom */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import './style/style.scss';

import * as unit from './units';
import * as utility from './utility';
import * as canvas from './canvas';
import * as prestige from './prestige';
import * as stat from './stats';
import * as variable from './variables';
import * as shopFunction from './shop';
import * as combat from './combat';
// I'm sorry Jenni, for what you're about to see.

// Debug
const tickCounterSpan = document.getElementById('tickCounter') as HTMLSpanElement;
const btnDebugState = document.getElementById('debugButton') as HTMLButtonElement;
let tickCount = 0;
/*

FUNCTIONS

*/

// save and load functionality
const btnSave = document.getElementById('btnSave') as HTMLButtonElement;
const btnLoad = document.getElementById('btnLoad') as HTMLButtonElement;

function initialize() {
  stat.calculatePlayerStats();
  stat.updateStatFrame(unit.player);
  stat.updateHealthBar(unit.player, true);
  canvas.updateGoldDisplay();
  stat.updateAttackTimerBar(unit.player, true);
  stat.updateHealthBar(unit.enemy, true);
  stat.updateAttackTimerBar(unit.enemy, true);
  prestige.updatePrestigeDisplay();
  shopFunction.updateAllShops();
}
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
  unit.shop.ATTACK.BOUGHT = 0;
  unit.shop.ATTACK_SPEED.BOUGHT = 0;
  unit.shop.BLOCK_CHANCE.BOUGHT = 0;
  unit.shop.CRIT_CHANCE.BOUGHT = 0;
  unit.shop.CRIT_MULTIPLIER.BOUGHT = 0;
  unit.shop.HEALTH.BOUGHT = 0;
  unit.shop.HEALTH_REGEN.BOUGHT = 0;
}
// Main loop, runs each x tickrate and keeps the game rolling

function gameLoop() {
  tickCount += 1;
  // Attack function
  tickCounterSpan.innerHTML = tickCount.toString();

  combat.attackCount(unit.player, unit.enemy);
  combat.attackCount(unit.enemy, unit.player);
  combat.regeneration(unit.player);
  combat.regeneration(unit.enemy);
  if (unit.player.prestige_upgrades.SMITE.BOUGHT > 0) {
    prestige.skillSmite();
  }
  // If they're in respawning state, initiate that.
  if (unit.player.IS_RESPAWNING) {
    combat.respawn(unit.player);
  }
  if (unit.enemy.IS_RESPAWNING) {
    combat.respawn(unit.enemy);
  }
  // Animation function
  canvas.backgroundCycle();
  // Loopieloop loop - setInterval? Heard it is better with setTimeout for this, but got to ask
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  ticksPerSecond();
  canvas.degreeDisplay();
  setTimeout(gameLoop, variable.tickrate);
}
const popup = document.getElementById('overlay') as HTMLDivElement;
const btnStartGame = document.getElementById('btnGameStart');
function gameStart() {
  const inputName = document.getElementById('inputNameSelect') as HTMLInputElement;

  if (inputName?.value !== '' || inputName?.value == null) {
    unit.player.NAME = inputName?.value ?? 'null';
  } else {
    unit.player.NAME = 'Player';
  }
  initialize();
  popup?.classList.add('hidden');
  gameLoop();
}

function loadSave() {
  unit.loadProgress();
  initialize();
  popup?.classList.add('hidden');
  gameLoop();
}

/*

DEBUG

*/
// NOTE: Temporary, just for debugging.

btnDebugState.addEventListener('click', () => {
  console.log(unit.player);
  console.log(unit.enemy);
  console.log(unit.shop);
});

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

// NOTE: Because of how I set it up, any sort of loop does sadly not work, tried a million and one things...

unit.shop.ATTACK.DOM?.addEventListener('click', () => {
  shopFunction.shopBuy(unit.shop.ATTACK);
});
unit.shop.HEALTH.DOM?.addEventListener('click', () => {
  shopFunction.shopBuy(unit.shop.HEALTH);
});
unit.shop.HEALTH_REGEN.DOM?.addEventListener('click', () => {
  shopFunction.shopBuy(unit.shop.HEALTH_REGEN);
});
unit.shop.ATTACK_SPEED.DOM?.addEventListener('click', () => {
  shopFunction.shopBuy(unit.shop.ATTACK_SPEED);
});
unit.shop.CRIT_CHANCE.DOM?.addEventListener('click', () => {
  shopFunction.shopBuy(unit.shop.CRIT_CHANCE);
});
unit.shop.CRIT_MULTIPLIER.DOM?.addEventListener('click', () => {
  shopFunction.shopBuy(unit.shop.CRIT_MULTIPLIER);
});
unit.shop.BLOCK_CHANCE.DOM?.addEventListener('click', () => {
  shopFunction.shopBuy(unit.shop.BLOCK_CHANCE);
});

// Menu buttons
for (let i = 0; i < utility.btnMenu.length; i += 1) {
  utility.btnMenu[i].addEventListener('click', () => {
    utility.menuChange(utility.divMenu[i]);
  });
}

// Prestige level up button
prestige.btnPrestige.addEventListener('click', () => {
  prestige.calculateExpGain();
  prestige.levelUpCheck();
  prestige.updatePrestigeDisplay();
  resetStats();
  initialize();
});
function prestigeEventListener(e: any) {
  e.addEventListener('click', prestige.showPrestigeUpgradeInfo);
}
Array.from(prestige.btnPrestigeUpgrade).forEach(prestigeEventListener);

// Saving and loading
btnSave.addEventListener('click', unit.saveProgress);
if (localStorage.getItem('player') !== null && localStorage.getItem('enemy') !== null && localStorage.getItem('shop') !== null) {
  btnLoad.addEventListener('click', loadSave);
} else {
  btnLoad.disabled = true;
}

utility.btnHelpClose.addEventListener('click', utility.toggleHelp);
utility.btnHelpOpen.addEventListener('click', utility.toggleHelp);
btnStartGame?.addEventListener('click', gameStart);

// Finally we can start playing the game!
