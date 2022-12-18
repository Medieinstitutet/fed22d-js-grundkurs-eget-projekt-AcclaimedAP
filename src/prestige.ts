/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import * as unit from './units';
import * as stat from './stats';
import * as canvas from './canvas';

export const spnPrestigePoints = document.getElementById('spnPoints') as HTMLSpanElement;
export const spnPrestigeLevel = document.getElementById('spnLevel') as HTMLSpanElement;
export const spnPrestigeExpCurrent = document.getElementById('spnCurrentExp') as HTMLSpanElement;
export const spnPrestigeExpMax = document.getElementById('spnMaxExp') as HTMLSpanElement;
export const btnPrestige = document.getElementById('btnPrestige') as HTMLButtonElement;
export const prestigeSelectedContainer = document.getElementById('prestigeUpgradeInfo') as HTMLDivElement;
export const prestigeSelectedName = document.getElementById('pSelectedPrestigeUpgradeName') as HTMLHeadingElement;
export const prestigeSelectedDesc = document.getElementById('pSelectedPrestigeUpgradeDescription') as HTMLParagraphElement;
export const prestigeSelectedCost = document.getElementById('spnSelectedPrestigeUpgradeCost') as HTMLSpanElement;
export const prestigeSelectedBtnContainer = document.getElementById('divBuySelectedPrestigeUpgrade') as HTMLButtonElement;

export const btnPrestigeUpgrade = document.getElementsByClassName('btnPrestigeUpgrade') as HTMLCollectionOf<HTMLButtonElement>;

export function updatePrestigeDisplay(): void {
  spnPrestigePoints.innerHTML = unit.player.PRESTIGE_POINTS.toString();
  spnPrestigeLevel.innerHTML = unit.player.PRESTIGE_LEVEL.toString();
  spnPrestigeExpCurrent.innerHTML = unit.player.PRESTIGE_EXP.toString();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  spnPrestigeExpMax.innerHTML = maxExpRequired().toString();
}

export function updateSelectedPrestigeDisplay(obj: any): void {
  prestigeSelectedName.innerHTML = String(obj.NAME);
  prestigeSelectedDesc.innerHTML = String(obj.DESCRIPTION);
  prestigeSelectedCost.innerHTML = (Number(obj.BOUGHT) + 1).toString();
}

export function createPrestigePurchaseButton(obj: any) {
  prestigeSelectedBtnContainer.innerHTML = '';
  const btnPurchase = document.createElement('button');
  btnPurchase.innerHTML = 'Purchase';
  prestigeSelectedBtnContainer.appendChild(btnPurchase);
  // I have no clue how to avoid this anonymous function at this point, since the button is "generic", maybe a global variable to check last pressed button?
  btnPurchase.addEventListener('click', () => {
    const cost = Number(obj.BOUGHT) + 1;
    if (unit.player.PRESTIGE_POINTS >= cost) {
      unit.player.PRESTIGE_POINTS -= cost;
      obj.BOUGHT += 1;
      updatePrestigeDisplay();
      updateSelectedPrestigeDisplay(obj);
      stat.calculatePlayerStats();
      stat.updateStatFrame(unit.player);
    }
  });
}
export function showPrestigeUpgradeInfo(this: any) {
  if (prestigeSelectedContainer?.classList.contains('hidden')) {
    prestigeSelectedContainer.classList.remove('hidden');
  }
  const data = this.dataset.name;
  let obj = unit.player.prestige_upgrades.BONUS_DAMAGE;
  switch (data) {
    case 'BONUS_DAMAGE':
      obj = unit.player.prestige_upgrades.BONUS_DAMAGE;
      break;
    case 'REDUCE_BLOCK':
      obj = unit.player.prestige_upgrades.REDUCE_BLOCK;
      break;
    case 'LIFESTEAL':
      obj = unit.player.prestige_upgrades.LIFESTEAL;
      break;
    case 'GOLD_MULTIPLIER':
      obj = unit.player.prestige_upgrades.GOLD_MULTIPLIER;
      break;
    case 'SMITE':
      obj = unit.player.prestige_upgrades.SMITE;
      break;
    case 'BLOCK_PENETRATION':
      obj = unit.player.prestige_upgrades.BLOCK_PENETRATION;
      break;
    default:
      return;
      break;
  }
  updateSelectedPrestigeDisplay(obj);
  createPrestigePurchaseButton(obj);
}
function enablePrestigeSkills(tier: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const skillButtons = document.getElementById(tier)!.getElementsByTagName('button');
  for (let i = 0; i < skillButtons.length; i += 1) {
    console.log(skillButtons[i]);
    skillButtons[i].disabled = false;
  }
}

function maxExpRequired(): number {
  return unit.player.PRESTIGE_EXP_LEVELUP + unit.player.PRESTIGE_EXP_LEVELUP * unit.player.PRESTIGE_LEVEL * unit.player.PRESTIGE_EXP_LEVELUP_MULTIPLIER;
}

export function levelUpCheck() {
  const expRequired = maxExpRequired();
  if (unit.player.PRESTIGE_EXP >= expRequired) {
    unit.player.PRESTIGE_LEVEL += 1;
    unit.player.PRESTIGE_POINTS += 1;
    unit.player.PRESTIGE_EXP -= expRequired;
    // if the level is 0-9, it will try to unlock tier 0, which is always open, if they are 10-19, it will unlock tier1, etc.
    const tierlevel = unit.player.PRESTIGE_LEVEL;
    console.log(tierlevel);
    console.log(tierlevel / 10);
    const tier = `tier${Math.floor(tierlevel / 10).toFixed(0)}`;
    console.log(tier);
    enablePrestigeSkills(tier);
    levelUpCheck();
  }
}

export function calculateExpGain() {
  const levelsClimbed = unit.enemy.LEVEL - unit.player.HIGHEST_LEVEL_PRESTIGED_AT;
  let gainedExp = 0;
  console.log(`levels climbed${levelsClimbed}`);
  if (levelsClimbed > 0) {
    unit.player.HIGHEST_LEVEL_PRESTIGED_AT = unit.player.HIGHEST_LEVEL_REACHED;
    gainedExp = levelsClimbed * 112.5 + unit.enemy.LEVEL / 80;
  } else {
    gainedExp = unit.enemy.LEVEL / 80;
  }
  unit.player.PRESTIGE_EXP += Math.round(gainedExp);
}

// Cast smite if eligable
export function skillSmite() {
  const cooldown = 600; // how many ticks has to pass before it will deal damage
  const smite = unit.player.prestige_upgrades.SMITE;
  smite.TIMER += 1;
  if (smite.TIMER >= cooldown && unit.enemy.IS_ALIVE) {
    console.log('SMITTEN');
    const damageDealt = unit.player.DAMAGE * smite.BOUGHT * smite.MULTIPLIER;
    unit.enemy.HEALTH_CURRENT -= damageDealt;
    canvas.createText(damageDealt.toFixed(0), unit.enemy, 'skill');
    smite.TIMER = 0;
  }
}
