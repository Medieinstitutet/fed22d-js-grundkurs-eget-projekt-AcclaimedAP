/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as unit from './units';
// eslint-disable-next-line import/no-cycle
import * as stat from './stats';
import * as canvas from './canvas';

export function shopMath(shopItem: { NAME: string; BASE_POWER: number; BOUGHT: number; POWER_MULTIPLIER: number }): number {
  let powerCalc: number = shopItem.BASE_POWER + shopItem.BOUGHT ** shopItem.POWER_MULTIPLIER;
  if (shopItem.NAME === unit.shop.ATTACK_SPEED.NAME) {
    powerCalc = shopItem.BASE_POWER + shopItem.BOUGHT * shopItem.POWER_MULTIPLIER;
  }
  if (shopItem.NAME === unit.shop.CRIT_CHANCE.NAME || shopItem === unit.shop.BLOCK_CHANCE) {
    powerCalc = shopItem.BASE_POWER + (shopItem.BOUGHT / 1000) ** shopItem.POWER_MULTIPLIER;
    return powerCalc;
  }
  if (shopItem === unit.shop.CRIT_MULTIPLIER) {
    powerCalc = shopItem.BASE_POWER + (shopItem.BOUGHT / 30) ** shopItem.POWER_MULTIPLIER;
    return powerCalc;
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
export function updateShop(shopItem: any): void {
  const cost = shopCost(shopItem);
  const powerdiff = shopMath(shopItem);
  shopItem.BOUGHT += 1;
  let power = shopMath(shopItem);
  shopItem.BOUGHT -= 1;
  power -= powerdiff;
  // If it is supposed to show in %, do so
  if (shopItem === unit.shop.BLOCK_CHANCE || shopItem === unit.shop.CRIT_CHANCE || shopItem === unit.shop.CRIT_MULTIPLIER) {
    const powerString = `${(power * 100).toFixed(2)}%`;
    shopItem.DOM.innerHTML = `<p class="shopUpgradeName">${shopItem.NAME}</p><p class="shopUpgradeCost">${cost} Gold<br>+ ${powerString}</p>`;
  } else if (shopItem === unit.shop.ATTACK_SPEED) {
    // Special case for attack speed
    shopItem.DOM.innerHTML = `<p class="shopUpgradeName">${shopItem.NAME}</p><p class="shopUpgradeCost">${cost} Gold<br>${power * 15} ms</p>`;
  } else {
    // Everything else.
    shopItem.DOM.innerHTML = `<p class="shopUpgradeName">${shopItem.NAME}</p><p class="shopUpgradeCost">${cost} Gold<br>+ ${power}</p>`;
  }
}

export function shopBuy(shopItem: any): void {
  shopItem.COST = shopCost(shopItem);

  if (unit.player.GOLD >= shopItem.COST) {
    unit.player.GOLD -= shopItem.COST;
    shopItem.BOUGHT += 1;
    canvas.updateGoldDisplay();
    stat.calculatePlayerStats();
    stat.updateStatFrame(unit.player);
    updateShop(shopItem);
    if (shopItem === unit.shop.HEALTH) {
      stat.updateHealthBar(unit.player, true);
    }
    if (shopItem === unit.shop.ATTACK_SPEED) {
      stat.updateAttackTimerBar(unit.player, true);
    }
  }
}

export function updateAllShops() {
  let k: keyof typeof unit.shop;
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (k in unit.shop) {
    updateShop(unit.shop[k]);
  }
}
