/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as unit from './units';
import * as variable from './variables';
// eslint-disable-next-line import/no-cycle
import * as shopFunction from './shop';

export function updateHealthBar(target: any, updateMax = false): void {
  const spnHealthCurrent = target.spnCanvasHealthCurrent;
  const { healthBar } = target;
  const healthCurrent = target.HEALTH_CURRENT;
  healthBar.value = healthCurrent;
  spnHealthCurrent.innerHTML = Math.round(healthCurrent);

  // Only runs when you want it to.
  if (updateMax) {
    const healthMax = target.HEALTH_MAX;
    const spnHealthMax = target.spnCanvasHealthMax;
    spnHealthMax.innerHTML = Math.round(healthMax);
    healthBar.max = healthMax;
    healthBar.low = healthMax / 3;
    healthBar.high = healthMax / 2;
    healthBar.optimum = healthMax * 0.67;
  }
}
// Updates the attack progressbar, like updateHealthBar, the boolean decides if it updates max value too
export function updateAttackTimerBar(target: any, updateMax = false): void {
  target.attackTimerBar.value = target.ATTACK_TIMER;
  if (updateMax) {
    target.attackTimerBar.max = target.ATTACK_COOLDOWN;
  }
}

export function updateStatFrame(target: any): void {
  if (target.statFrame !== undefined) {
    target.statFrame.spnAttack.innerHTML = Math.round(target.DAMAGE).toFixed(0);
    target.statFrame.spnHealthMax.innerHTML = Math.round(target.HEALTH_MAX).toString();
    target.statFrame.spnHealthRegen.innerHTML = target.HEALTH_REGEN.toFixed(1);
    target.statFrame.spnAttackSpeed.innerHTML = ((variable.tickrate / target.ATTACK_COOLDOWN) * 10).toFixed(2);
    target.statFrame.spnCritChance.innerHTML = `${(target.CRIT_CHANCE * 100).toFixed(2)}%`;
    target.statFrame.spnCritMultiplier.innerHTML = `${(target.CRIT_MULTIPLIER * 100).toString()}%`;
    target.statFrame.spnBlockChance.innerHTML = `${(target.BLOCK_CHANCE * 100).toFixed(2)}%`;
    target.statFrame.spnLevel.innerHTML = `${unit.enemy.LEVEL}`;
  }
}

export function calculatePlayerStats(): void {
  // eslint-disable-next-line operator-linebreak
  unit.player.DAMAGE =
    // eslint-disable-next-line operator-linebreak
    (unit.player.base.DAMAGE + shopFunction.shopMath(unit.shop.ATTACK)) *
    (1 + unit.player.prestige_upgrades.BONUS_DAMAGE.BOUGHT * unit.player.prestige_upgrades.BONUS_DAMAGE.MULTIPLIER);
  unit.player.HEALTH_MAX = unit.player.base.HEALTH_MAX + shopFunction.shopMath(unit.shop.HEALTH);
  unit.player.HEALTH_REGEN = unit.player.base.HEALTH_REGEN + shopFunction.shopMath(unit.shop.HEALTH_REGEN);
  unit.player.CRIT_CHANCE = unit.player.base.CRIT_CHANCE + shopFunction.shopMath(unit.shop.CRIT_CHANCE);
  unit.player.CRIT_MULTIPLIER = unit.player.base.CRIT_MULTIPLIER + shopFunction.shopMath(unit.shop.CRIT_MULTIPLIER);
  unit.player.BLOCK_CHANCE = unit.player.base.BLOCK_CHANCE + shopFunction.shopMath(unit.shop.BLOCK_CHANCE);
  unit.player.ATTACK_COOLDOWN = unit.player.base.ATTACK_COOLDOWN - shopFunction.shopMath(unit.shop.ATTACK_SPEED);
}

export function calculateEnemyStats() {
  const e = unit.enemy;
  const p = unit.player;
  // Sets enemies stats to their values based on what level they are.
  let m = 1;
  let dm = 1;
  if (e.LEVEL % 10 === 0) {
    m = 4.5;
    dm = 1.2;
  }
  e.HEALTH_MAX = e.base.HEALTH_MAX + e.LEVEL ** e.multiplier.HEALTH_MAX * m;
  e.DAMAGE = e.base.DAMAGE + e.LEVEL ** e.multiplier.DAMAGE * dm;
  e.GOLD_DROP = e.base.GOLD_DROP + e.LEVEL ** e.multiplier.GOLD_DROP * m;
  e.HEALTH_REGEN = e.base.HEALTH_REGEN + e.LEVEL * e.multiplier.HEALTH_REGEN * dm;
  e.BLOCK_CHANCE = e.base.BLOCK_CHANCE + (e.LEVEL / 1000 - p.prestige_upgrades.REDUCE_BLOCK.BOUGHT * p.prestige_upgrades.REDUCE_BLOCK.MULTIPLIER) * dm;
  updateHealthBar(unit.enemy, true);
}
