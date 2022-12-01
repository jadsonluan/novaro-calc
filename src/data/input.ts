import { Job } from "./job";
import WeaponType from "./weapon";
import { Element } from "./element";

export interface Stats {
  str: number;
  agi: number;
  vit: number;
  int: number;
  dex: number;
  luk: number;
}

export interface HPInfo {
  base: number;
  flat: number;
  percent: number;
}

export interface SPInfo {
  base: number;
  flat: number;
  percent: number;
}

export interface Weapon {
  type: WeaponType;
  level: number;
  atk: number;
  refine: number;
  element: Element;
}

export interface ATKModifiers {
  equipATK: number;
  // nao funciona no nova para consumiveis
  consumableATK: number;
  // parecido com consumableATK mas o nova usa esse invés do consumableATK para alguns iten
  bonusStatusATK: number;
  ammoATK: number;
  pseudoBuffATK: number;
  masteryATK: number;
  buffATK: number;
}

export interface Modifiers {
  skill: number;
  melee: number;
  ranged: number;
  dmg: number;
  finalDmg: number;
  race: number;
  size: number;
  class: number;
  monster: number;
  targetProperty: number;
  advancedKatarMastery: number;
  custom: number;
  critical: number;
}

export interface Character {
  baseLevel: number;
  job: Job;
  skill: string;
  crit: boolean;
  ignorePenalty: boolean;
  stats: Stats;
  hp: HPInfo;
  sp: SPInfo;
  weapon: Weapon;
  modifiers: Modifiers;
  shadowWeaponRefine: number;
  ATK: ATKModifiers;
  bypass: number;
  buffs: string[];
  debuffs: string[];
}

export interface Buff {
  active: boolean;
  tooltip: string;
}

export interface Buffs {
  // Swordsman
  magnumBreak: Buff;
  concentration: Buff;
  asirRune: Buff;
  turisusRune: Buff;
  luxAnimaRune: Buff;
  shieldSpell: Buff;
  inspiration: Buff;
  // Thief
  enchantDeadlyPoison: Buff;
  pyrexia: Buff;
  // Merchant
  loudExclamation: Buff;
  cartBoost: Buff;
  pyroclastic: Buff;
  // Mage
  striking: Buff;
  // Archer
  trueSight: Buff;
  unlimit: Buff;
  fearBreeze: Buff;
  // Acolyte
  allSpheres: Buff;
  odinsBlessing: Buff;
  // Ninja
  shadowWarrior: Buff;
  earthCharm: Buff;
  // Taekwon
  falconSoul: Buff;
}

export const emptyBuffs: Buffs = {
  // Swordsman
  magnumBreak: {
    active: false,
    tooltip: "+20% fire property weaponATK"
  },
  concentration: {
    active: false,
    tooltip: "+15% weaponATK and equipATK"
  },
  asirRune: {
    active: false,
    tooltip: "Pseudo Buff ATK +70"
  },
  turisusRune: {
    active: false,
    tooltip: "STR +30 and +15% Melee % Bonus"
  },
  luxAnimaRune: {
    active: false,
    tooltip: "+30% for the following modifiers: HP & SP, Melee, Ranged, Critical and Size"
  },
  shieldSpell: {
    active: false,
    tooltip: "Pseudo Buff ATK +150"
  },
  inspiration: {
    active: false,
    tooltip: "Pseudo Buff ATK +200, all stats +30 and +20% HP"
  },
  // Thief
  enchantDeadlyPoison: {
    active: false,
    tooltip: "WeaponATK x5 and extraATK x4"
  },
  pyrexia: {
    active: false,
    tooltip: "+5% Melee % Bonus and +15% Critical % Bonus"
  },
  // Merchant
  loudExclamation: {
    active: false,
    tooltip: "STR +4 and Pseudo Buff ATK +30"
  },
  cartBoost: {
    active: false,
    tooltip: "Mastery ATK +50"
  },
  pyroclastic: {
    active: false,
    tooltip: "Pseudo Buff ATK +400"
  },
  // Mage
  striking: {
    active: false,
    tooltip: "Pseudo Buff ATK +100"
  },
  // Archer
  trueSight: {
    active: false,
    tooltip: "All stats +5 and 20% added to the skill base damage"
  },
  unlimit: {
    active: false,
    tooltip: "Final Damage +250%"
  },
  fearBreeze: {
    active: false,
    tooltip: "Increases Aimed Bolt and Arrow Storm damage"
  },
  // Acolyte
  allSpheres: {
    active: false,
    tooltip: "Mastery ATK +3 * spheres = +45"
  },
  odinsBlessing: {
    active: false,
    tooltip: "Pseudo Buff ATK +100"
  },
  // Ninja
  shadowWarrior: {
    active: false,
    tooltip: "Increases Cross Slash damage"
  },
  earthCharm: {
    active: false,
    tooltip: "WeaponATK +15% per charm = +150% and increases Elemental % Bonus +30% against Wind monsters "
  },
  // Taekwon
  falconSoul: {
    active: false,
    tooltip: "Pseudo Buff ATK +50"
  },
};

export interface Debuffs {
  oratio: Buff;
  darkClaw: Buff;
  magicIntoxication: Buff;
}

export const emptyDebuffs: Debuffs = {
  darkClaw: {
    active: false,
    tooltip: "+150%(75% for boss) melee damage inflicted"
  },
  magicIntoxication: {
    active: false,
    tooltip: "Takes 50% more damage from all properties"
  },
  oratio: {
    active: false,
    tooltip: "Decreases holy property resistance"
  },
};

export type Race =
  | "angel"
  | "brute"
  | "demihuman"
  | "demon"
  | "dragon"
  | "fish"
  | "formless"
  | "insect"
  | "plant"
  | "player"
  | "undead";

export const RACES: Race[] = [
  "angel",
  "brute",
  "demihuman",
  "demon",
  "dragon",
  "fish",
  "formless",
  "insect",
  "plant",
  "player",
  "undead",
];

export type Size = "small" | "medium" | "large";
export const SIZES: Size[] = ["small", "medium", "large"];

export type MonsterType = "normal" | "boss";
export const MONSTER_TYPES: MonsterType[] = ["normal", "boss"];

export type ElementLevel = "1" | "2" | "3" | "4";
export interface Monster {
  baseLevel: number;
  VIT: number;
  hardDEF: number;
  hardDEFDebuff: number;
  element: Element;
  elementLevel: ElementLevel;
  race: Race;
  size: Size;
  type: MonsterType;
  finalModifier: number;
  meleeModifier: number;
  rangedModifier: number;
  debuffs: string[];
}

export const emptyMonster: Monster = {
  baseLevel: 1,
  VIT: 0,
  hardDEF: 0,
  hardDEFDebuff: 0,
  element: "Neutral",
  elementLevel: "1",
  race: "formless",
  size: "small",
  type: "normal",
  finalModifier: 0,
  meleeModifier: 0,
  rangedModifier: 0,
  debuffs: [],
};

export const emptyCharacter: Character = {
  baseLevel: 1,
  job: "Rune Knight",
  skill: "basic_attack",
  crit: false,
  ignorePenalty: false,
  stats: {
    str: 0,
    agi: 0,
    vit: 0,
    int: 0,
    dex: 0,
    luk: 0,
  },
  hp: {
    base: 1,
    flat: 0,
    percent: 0,
  },
  sp: {
    base: 1,
    flat: 0,
    percent: 0,
  },
  weapon: {
    atk: 0,
    element: "Neutral",
    level: 1,
    refine: 0,
    type: "Bare Hand",
  },
  modifiers: {
    advancedKatarMastery: 0,
    class: 0,
    dmg: 0,
    finalDmg: 0,
    melee: 0,
    ranged: 0,
    monster: 0,
    race: 0,
    size: 0,
    skill: 0,
    targetProperty: 0,
    custom: 0,
    critical: 0,
  },
  shadowWeaponRefine: 0,
  ATK: {
    equipATK: 0,
    consumableATK: 0,
    bonusStatusATK: 0,
    ammoATK: 0,
    pseudoBuffATK: 0,
    masteryATK: 0,
    buffATK: 0,
  },
  bypass: 0,
  buffs: [],
  debuffs: [],
};

export interface BuildInfo {
  character: Character;
  monster: Monster;
  buffs: Buffs;
  debuffs: Debuffs;
}

export const INITIAL_BUILD: BuildInfo = {
  character: emptyCharacter,
  monster: emptyMonster,
  buffs: emptyBuffs,
  debuffs: emptyDebuffs,
};