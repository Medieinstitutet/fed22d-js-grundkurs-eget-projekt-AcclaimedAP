export type Health = {
  HEALTH_MAX: number;
  HEALTH_CURRENT: number;
  HEALTH_REGEN: number;
};
export type CombatStats = {
  DAMAGE: number;
  ATTACK_TIMER: number;
  ATTACK_COOLDOWN: number;
  CHARGE_TIMER: number;
  CHARGE_COOLDOWN: number;
  CRIT_CHANCE: number;
  CRIT_MULTIPLIER: number;
  BLOCK_CHANCE: number;
};
export type UtilityStats = {
  NAME: string;
  RESPAWN_TIMER: number;
  GOLD?: number;
  GOLD_DROP?: number;
  LEVEL?: number;
};
// FIXME: This fucker doesn't work it seems, any use related to it currently has "any" to temporary fix, look over this
export type UIElements = {
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
export type LogicBooleans = {
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
