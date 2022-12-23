/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as types from './types';
import * as unit from './units';
import * as prestige from './prestige';
import * as canvas from './canvas';
import * as stat from './stats';
import * as variable from './variables';
import * as utility from './utility';

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
export function respawn(target: any) {
  // gives target max hp
  target.IS_RESPAWNING = true;
  const imageDead = target.imageDead as HTMLImageElement;
  const image = target.image as HTMLImageElement;
  if (imageDead.classList.contains('hidden')) {
    imageDead.classList.remove('hidden');
    image.classList.add('hidden');
  }
  const respawnCooldown = 100;
  target.RESPAWN_TIMER += 1;
  if (target.RESPAWN_TIMER >= respawnCooldown) {
    // If it is the enemy that dies, level it up, give gold to player, etc.
    if (target.IS_PLAYABLE_CHARACTER === false) {
      unit.enemy.LEVEL += 1;
      heal(unit.player);
      stat.updateHealthBar(unit.player);
      if (prestige.btnMenuPrestige.disabled && unit.enemy.LEVEL >= 30) {
        unit.player.PRESTIGE_ENABLED = true;
        prestige.btnPrestige.disabled = false;
        prestige.btnMenuPrestige.disabled = false;
      }
      const gd = unit.enemy.GOLD_DROP * (1 + unit.player.prestige_upgrades.GOLD_MULTIPLIER.BOUGHT * unit.player.prestige_upgrades.GOLD_MULTIPLIER.MULTIPLIER);
      unit.player.GOLD += gd;
      canvas.createText(gd.toFixed(0), unit.player, 'gold');
      canvas.updateGoldDisplay();
      stat.updateStatFrame(unit.player);
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
    stat.calculateEnemyStats();
    heal(target);
    const enemyLevelDisplay = unit.enemy.spnCanvasEnemyLevel;
    if (enemyLevelDisplay) {
      enemyLevelDisplay.innerHTML = unit.enemy.LEVEL.toString();
    }
    target.RESPAWN_TIMER = 0;
    target.IS_ALIVE = true;
    target.IS_RESPAWNING = false;
    target.ATTACK_TIMER = 0;
    imageDead.classList.add('hidden');
    image.classList.remove('hidden');
    stat.updateHealthBar(target);
  }
}
export function regeneration(target: any) {
  if (target.HEALTH_CURRENT < target.HEALTH_MAX) {
    heal(target, target.HEALTH_REGEN / (1000 / variable.tickrate));
    stat.updateHealthBar(target);
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
function damageCalculation(attacker: any, defender: { BLOCK_CHANCE: number }): [number, string] {
  let damageDealt = 0;
  const blockRNG: number = Math.random();
  let type = 'normal';
  if (defender.BLOCK_CHANCE >= blockRNG) {
    const blockDAmpBought = attacker.prestige_upgrades?.BLOCK_PENETRATION.BOUGHT ?? 0;
    const blockDAmpMulti = attacker.prestige_upgrades?.BLOCK_PENETRATION.multiplier ?? 0;
    // Blocks damage
    type = 'block';
    damageDealt = attacker.DAMAGE * 0.2 * (1 + blockDAmpBought * blockDAmpMulti); // Deals only 20% of damage if blocked
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
  if (attacker.prestige_upgrades?.LIFESTEAL.BOUGHT) {
    const lifestealAmount: number = damageDealt * attacker.prestige_upgrades.LIFESTEAL.BOUGHT * attacker.prestige_upgrades.LIFESTEAL.MULTIPLIER;
    heal(attacker, lifestealAmount);
    if (lifestealAmount >= 1) {
      canvas.createText(lifestealAmount.toFixed(0), attacker, 'heal');
    }
  }
  const damageResult: [number, string] = [damageDealt, type];
  return damageResult;
}

function attack(attacker: any, defender: any): void {
  const damageResult = damageCalculation(attacker, defender);
  defender.HEALTH_CURRENT -= damageResult[0];
  stat.updateHealthBar(defender);
  utility.output(`${attacker.NAME} attacks ${defender.NAME} and deals ${damageResult[0]} damage!`);
  canvas.createText(damageResult[0].toFixed(0), defender, damageResult[1]);
  checkDeath(defender);
}

function resetAttackState(target: types.LogicBooleans & types.CombatStats) {
  target.IS_ATTACKING = false;
  target.ATTACK_TIMER = 0;
  target.CHARGE_TIMER = 0;
}

function chargingAttack(attacker: any, defender: any) {
  const playerPortrait = document.getElementById('playerPortrait') as HTMLDivElement;
  const enemyPortrait = document.getElementById('enemyPortrait') as HTMLDivElement;
  let portrait;
  attack(attacker, defender);
  let moveBackAnim = {};
  if (attacker.IS_PLAYABLE_CHARACTER) {
    portrait = playerPortrait;
    moveBackAnim = [{ left: '30%' }, { left: '1%' }];
  } else {
    portrait = enemyPortrait;
    moveBackAnim = [{ right: '30%' }, { right: '1%' }];
  }
  const moveBackTiming = {
    duration: 700,
    easing: 'ease-in-out',
    fill: 'forwards',
  };
  // @ts-ignore
  const animation = portrait.animate(moveBackAnim, moveBackTiming);
  animation.play();

  animation.onfinish = () => {
    attacker.IS_FRONT_OF_OPPONENT = false;
    resetAttackState(attacker);
    attacker.ANIMATION_ACTIVE = false;
  };
}

function animate(attacker: any, defender: any) {
  if (!attacker.IS_ATTACKING && !attacker.ANIMATION_ACTIVE) {
    const playerPortrait = unit.player.portrait as HTMLDivElement;
    const enemyPortrait = unit.enemy.portrait as HTMLDivElement;
    let moveForwardAnim = {};
    let portrait;
    if (attacker.IS_PLAYABLE_CHARACTER) {
      portrait = playerPortrait;
      moveForwardAnim = [{ left: '1%' }, { left: '30%' }];
    } else {
      portrait = enemyPortrait;
      moveForwardAnim = [{ right: '1%' }, { right: '30%' }];
    }
    attacker.ANIMATION_ACTIVE = true;

    const moveForwardTiming = {
      duration: 700,
      fill: 'forwards',
      easing: 'ease-in-out',
      endDelay: 400,
    };
    attacker.IS_ATTACKING = true;
    // @ts-ignore
    const animation = portrait.animate(moveForwardAnim, moveForwardTiming);
    animation.play();
    animation.onfinish = () => {
      attacker.IS_FRONT_OF_OPPONENT = true;
      chargingAttack(attacker, defender);
    };
  }
}
export function attackCount(attacker: any, defender: any): void {
  // If the player is dead, or already attacking, end this function(optimization?)
  if (!attacker.IS_ALIVE || !defender.IS_ALIVE) {
    return;
  }
  attacker.ATTACK_TIMER += 1;
  stat.updateAttackTimerBar(attacker);
  if (attacker.ATTACK_TIMER >= attacker.ATTACK_COOLDOWN && !attacker.IS_ATTACKING) {
    // Player Attack
    animate(attacker, defender);
  }
}
