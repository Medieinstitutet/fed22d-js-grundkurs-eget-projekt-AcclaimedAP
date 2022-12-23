/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-mutable-exports */
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
  GOLD: 5,
  RESPAWN_TIMER: 0,
  PRESTIGE_ENABLED: false,
  PRESTIGE_LEVEL: 0,
  PRESTIGE_EXP: 0,
  PRESTIGE_EXP_LEVELUP: 10,
  PRESTIGE_EXP_LEVELUP_MULTIPLIER: 1.7,
  HIGHEST_LEVEL_REACHED: 0,
  HIGHEST_LEVEL_PRESTIGED_AT: 0,
  PRESTIGE_POINTS: 0,
  prestige_upgrades: {
    BONUS_DAMAGE: {
      NAME: 'Play Hard',
      DESCRIPTION: 'Increases your damage by 25% per level',
      BOUGHT: 0,
      MULTIPLIER: 0.25,
    },
    REDUCE_BLOCK: {
      NAME: 'Sneak around',
      DESCRIPTION: 'Reduce the enemies chance to block by 1% per level',
      BOUGHT: 0,
      MULTIPLIER: 0.01,
    },
    LIFESTEAL: {
      NAME: 'Bloodthirst',
      DESCRIPTION: 'Gain life equal to 5% of damage dealt per level',
      BOUGHT: 0,
      MULTIPLIER: 0.05,
    },
    GOLD_MULTIPLIER: {
      NAME: 'Stock Market',
      DESCRIPTION: 'Gain 100% per level extra gold each time you kill an enemy',
      BOUGHT: 0,
      MULTIPLIER: 1,
    },
    SMITE: {
      NAME: 'Smite',
      DESCRIPTION: 'Deal damage 25% per level of your attack every 600th tick',
      BOUGHT: 0,
      MULTIPLIER: 0.25,
      TIMER: 0,
    },
    BLOCK_PENETRATION: {
      NAME: 'Right through',
      DESCRIPTION: 'When the enemy blocks, deal 10% per level bonus damage',
      BOUGHT: 0,
      MULTIPLIER: 0.1,
    },
  },
  // Used to calculate and able to backtrack
  base: {
    HEALTH_MAX: 100,
    HEALTH_REGEN: 1,
    DAMAGE: 5,
    ATTACK_COOLDOWN: 220,
    CRIT_CHANCE: 0.05,
    CRIT_MULTIPLIER: 1.2,
    BLOCK_CHANCE: 0.05,
    GOLD: 5,
  },
  // Keeps tracks on how many is bought for each item for the purpose of calculating the cost of future upgrades

  // Logic booleans
  IS_PLAYABLE_CHARACTER: true,
  IS_ATTACKING: false,
  IS_FRONT_OF_OPPONENT: false,
  IS_ALIVE: true,
  IS_RESPAWNING: false,
  ANIMATION_ACTIVE: false,
  // DOM on canvas and position
  xPos: 0,
  portrait: document.getElementById('playerPortrait'),
  image: document.getElementById('playerImage'),
  imageDead: document.getElementById('playerImageDead'),
  frameState: {
    idle: ['assets/combatzone/player/player_idle_1.svg'],
  },
  healthBar: document.getElementById('playerHealthBar'),
  attackTimerBar: document.getElementById('playerAttackBar'),
  spnCanvasHealthCurrent: document.getElementById('spnCanvasPlayerHealthCurrent'),
  spnCanvasHealthMax: document.getElementById('spnCanvasPlayerHealthMax'),
  // Player info DOM
  statFrame: {
    spnAttack: document.getElementById('spnPlayerAttack'),
    spnHealthMax: document.getElementById('spnPlayerHealthMax'),
    spnHealthRegen: document.getElementById('spnPlayerHealthRegen'),
    spnAttackSpeed: document.getElementById('spnPlayerAttackSpeed'),
    spnCritChance: document.getElementById('spnPlayerCritChance'),
    spnCritMultiplier: document.getElementById('spnPlayerCritMultiplier'),
    spnBlockChance: document.getElementById('spnPlayerBlockChance'),
    spnLevel: document.getElementById('spnEnemyLevel'),
  },
};

// Enemy object
const enemy = {
  NAME: 'Slime',
  HEALTH_MAX: 15,
  HEALTH_CURRENT: 15,
  HEALTH_REGEN: 0.1,
  DAMAGE: 2,
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
    HEALTH_MAX: 15,
    HEALTH_REGEN: 0.1,
    DAMAGE: 2,
    ATTACK_COOLDOWN: 3100,
    CRIT_CHANCE: 0.05,
    CRIT_MULTIPLIER: 1.2,
    BLOCK_CHANCE: 0.05,
    GOLD_DROP: 5,
  },
  // Determines how much stronger the enemy gets per level
  multiplier: {
    HEALTH_MAX: 1.22,
    HEALTH_REGEN: 0.001,
    DAMAGE: 1.1,
    GOLD_DROP: 1.4,
  },
  // Logic booleans
  IS_PLAYABLE_CHARACTER: false,
  IS_ATTACKING: false,
  IS_FRONT_OF_OPPONENT: false,
  IS_ALIVE: true,
  IS_RESPAWNING: false,
  ANIMATION_ACTIVE: false,
  // DOM and position
  xPosReversed: 0,
  portrait: document.getElementById('enemyPortrait'),
  image: document.getElementById('enemyImage'),
  imageDead: document.getElementById('enemyImageDead'),
  frameState: {
    idle: ['assets/combatzone/enemy/slime_idle_1.svg'],
  },
  healthBar: document.getElementById('enemyHealthBar'),
  attackTimerBar: document.getElementById('enemyAttackBar'),
  spnCanvasHealthCurrent: document.getElementById('spnCanvasEnemyHealthCurrent'),
  spnCanvasHealthMax: document.getElementById('spnCanvasEnemyHealthMax'),
  spnCanvasEnemyLevel: document.getElementById('spnCanvasEnemyLevel'),
};

const shop = {
  ATTACK: {
    NAME: 'ATTACK',
    COST: 0,
    BASE_COST: 5,
    BASE_POWER: 2,
    COST_MULTIPLIER: 1.8,
    POWER_MULTIPLIER: 1.5,
    BOUGHT: 0,
    DOM: document.getElementById('shopBtnAttack'),
  },
  HEALTH: {
    NAME: 'HEALTH',
    COST: 0,
    BASE_COST: 4,
    BASE_POWER: 5,
    COST_MULTIPLIER: 1.4,
    POWER_MULTIPLIER: 1.65,
    BOUGHT: 0,
    DOM: document.getElementById('shopBtnHealth'),
  },
  HEALTH_REGEN: {
    NAME: 'HEALTH REGENERATION',
    COST: 0,
    BASE_COST: 6,
    BASE_POWER: 0.3,
    COST_MULTIPLIER: 1.2,
    POWER_MULTIPLIER: 1.01,
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
    BASE_POWER: 0.005,
    COST_MULTIPLIER: 1.5,
    POWER_MULTIPLIER: 1.3,
    BOUGHT: 1,
    DOM: document.getElementById('shopBtnCritChance'),
  },
  CRIT_MULTIPLIER: {
    NAME: 'CRIT MULTIPLIER',
    COST: 0,
    BASE_COST: 6,
    BASE_POWER: 0.1,
    COST_MULTIPLIER: 1.1,
    POWER_MULTIPLIER: 1.6,
    BOUGHT: 0,
    DOM: document.getElementById('shopBtnCritMultiplier'),
  },
  BLOCK_CHANCE: {
    NAME: 'BLOCK CHANCE',
    COST: 0,
    BASE_COST: 6,
    BASE_POWER: 0.005,
    COST_MULTIPLIER: 1.9,
    POWER_MULTIPLIER: 1.2,
    BOUGHT: 0,
    DOM: document.getElementById('shopBtnBlockChance'),
  },
};
function saveProgress() {
  localStorage.setItem('player', JSON.stringify(player));
  localStorage.setItem('enemy', JSON.stringify(enemy));
  localStorage.setItem('shop', JSON.stringify(shop));
}
function loadProgress() {
  if (localStorage.getItem('player') !== null && localStorage.getItem('enemy') !== null && localStorage.getItem('shop') !== null) {
    const playerTemp: typeof player = JSON.parse(localStorage.getItem('player')!);
    const enemyTemp: typeof enemy = JSON.parse(localStorage.getItem('enemy')!);
    const shopTemp: typeof shop = JSON.parse(localStorage.getItem('shop')!);
    player.NAME = playerTemp.NAME;
    player.GOLD = playerTemp.GOLD;
    player.PRESTIGE_ENABLED = playerTemp.PRESTIGE_ENABLED;
    player.PRESTIGE_LEVEL = playerTemp.PRESTIGE_LEVEL;
    player.PRESTIGE_EXP = playerTemp.PRESTIGE_EXP;
    player.PRESTIGE_EXP_LEVELUP = playerTemp.PRESTIGE_EXP_LEVELUP;
    player.PRESTIGE_EXP_LEVELUP_MULTIPLIER = playerTemp.PRESTIGE_EXP_LEVELUP_MULTIPLIER;
    player.HIGHEST_LEVEL_REACHED = playerTemp.HIGHEST_LEVEL_REACHED;
    player.HIGHEST_LEVEL_PRESTIGED_AT = playerTemp.HIGHEST_LEVEL_PRESTIGED_AT;
    player.PRESTIGE_POINTS = playerTemp.PRESTIGE_POINTS;
    player.prestige_upgrades.BONUS_DAMAGE = playerTemp.prestige_upgrades.BONUS_DAMAGE;
    player.prestige_upgrades.REDUCE_BLOCK = playerTemp.prestige_upgrades.REDUCE_BLOCK;
    player.prestige_upgrades.LIFESTEAL = playerTemp.prestige_upgrades.LIFESTEAL;
    player.prestige_upgrades.GOLD_MULTIPLIER = playerTemp.prestige_upgrades.GOLD_MULTIPLIER;
    player.prestige_upgrades.SMITE = playerTemp.prestige_upgrades.SMITE;
    player.prestige_upgrades.BLOCK_PENETRATION = playerTemp.prestige_upgrades.BLOCK_PENETRATION;
    shop.ATTACK.BOUGHT = shopTemp.ATTACK.BOUGHT;
    shop.HEALTH.BOUGHT = shopTemp.HEALTH.BOUGHT;
    shop.ATTACK_SPEED.BOUGHT = shopTemp.ATTACK_SPEED.BOUGHT;
    shop.HEALTH_REGEN.BOUGHT = shopTemp.HEALTH_REGEN.BOUGHT;
    shop.BLOCK_CHANCE.BOUGHT = shopTemp.BLOCK_CHANCE.BOUGHT;
    shop.CRIT_CHANCE.BOUGHT = shopTemp.CRIT_CHANCE.BOUGHT;
    shop.CRIT_MULTIPLIER.BOUGHT = shopTemp.CRIT_MULTIPLIER.BOUGHT;
    enemy.LEVEL = enemyTemp.LEVEL;
    console.log(player, enemy, shop);
  }
}
// eslint-disable-next-line object-curly-newline
export { player, enemy, shop, saveProgress, loadProgress };
