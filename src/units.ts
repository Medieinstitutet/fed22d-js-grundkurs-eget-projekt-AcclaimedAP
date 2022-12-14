export const player = {
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
  PRESTIGE_POINTS: 15,
  prestige_upgrades: {
    BONUS_DAMAGE: {
      NAME: 'Play Hard',
      DESCRIPTION: 'Increases your damage by 25% per level',
      BOUGHT: 0,
      MULTIPLIER: 0.25,
      BTN: document.getElementById('btnPrestigeUpgradeDamage'),
    },
    REDUCE_BLOCK: {
      NAME: 'Sneak around',
      DESCRIPTION: 'Reduce the enemies chance to block by 1%',
      BOUGHT: 0,
      MULTIPLIER: 0.01,
      BTN: document.getElementById('btnPrestigeUpgradeBlock'),
    },
    LIFESTEAL: {
      NAME: 'Bloodthirst',
      DESCRIPTION: 'Gain life equal to 5% of damage dealt',
      BOUGHT: 0,
      MULTIPLIER: 0.05,
      BTN: document.getElementById('btnPrestigeUpgradeLifeSteal'),
    },
    GOLD_MULTIPLIER: {
      NAME: 'Stock Market',
      DESCRIPTION: 'Gain 100% extra gold each time you kill an enemy',
      BOUGHT: 0,
      MULTIPLIER: 1,
      BTN: document.getElementById('btnPrestigeUpgradeGold'),
    },
    SMITE: {
      NAME: 'Smite',
      DESCRIPTION: 'Deal damage 25% of your attack every  600th tick',
      BOUGHT: 0,
      MULTIPLIER: 0.25,
      TIMER: 0,
      BTN: document.getElementById('btnPrestigeUpgradeSmite'),
    },
    BLOCK_PENETRATION: {
      NAME: 'Right through',
      DESCRIPTION: 'When the enemy blocks, deal bonus damage',
      BOUGHT: 0,
      MULTIPLIER: 0.1,
      BTN: document.getElementById('btnPrestigeUpgradeBlockPen'),
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
    spnHealthRegen: document.getElementById('spnPlayerHealthRegen'),
    spnAttackSpeed: document.getElementById('spnPlayerAttackSpeed'),
    spnCritChance: document.getElementById('spnPlayerCritChance'),
    spnCritMultiplier: document.getElementById('spnPlayerCritMultiplier'),
    spnBlockChance: document.getElementById('spnPlayerBlockChance'),
    spnLevel: document.getElementById('spnEnemyLevel'),
  },
};

// Enemy object
export const enemy = {
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
    ATTACK_COOLDOWN: 310,
    CRIT_CHANCE: 0.05,
    CRIT_MULTIPLIER: 1.2,
    BLOCK_CHANCE: 0.05,
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

export const shop = {
  ATTACK: {
    NAME: 'ATTACK',
    COST: 0,
    BASE_COST: 5,
    BASE_POWER: 2,
    COST_MULTIPLIER: 1.6,
    POWER_MULTIPLIER: 1.3,
    BOUGHT: 0,
    DOM: document.getElementById('shopBtnAttack'),
  },
  HEALTH: {
    NAME: 'HEALTH',
    COST: 0,
    BASE_COST: 4,
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
    POWER_MULTIPLIER: 0.15,
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
