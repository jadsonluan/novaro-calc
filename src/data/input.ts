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
  equipATK: number;
  // nao funciona no nova para consumiveis
  consumableATK: number;
  // parecido com consumableATK mas o nova usa esse invés do consumableATK para alguns iten
  bonusStatusATK: number;
  ammoATK: number;
  pseudoBuffATK: number;
  masteryATK: number;
  buffATK: number;
  bypass: number;
  buffs: string[];
}

export interface Buffs {
  // Swordsman
  magnumBreak: boolean;
  concentration: boolean;
  asirRune: boolean;
  turisusRune: boolean;
  luxAnimaRune: boolean;
  shieldSpell: boolean;
  inspiration: boolean;
  // Thief
  enchantDeadlyPoison: boolean;
  pyrexia: boolean;
  // Merchant
  loudExclamation: boolean;
  cartBoost: boolean;
  pyroclastic: boolean;
  // Mage
  striking: boolean;
  // Archer
  trueSight: boolean;
  unlimit: boolean;
  fearBreeze: boolean;
  // Acolyte
  allSpheres: boolean;
  odinsBlessing: boolean;
  // Ninja
  shadowWarrior: boolean;
  earthCharm: boolean;
  // Taekwon
  falconSoul: boolean;
}

export const emptyBuffs: Buffs = {
  // Swordsman
  magnumBreak: false,
  concentration: false,
  asirRune: false,
  turisusRune: false,
  luxAnimaRune: false,
  shieldSpell: false,
  inspiration: false,
  // Thief
  enchantDeadlyPoison: false,
  pyrexia: false,
  // Merchant
  loudExclamation: false,
  cartBoost: false,
  pyroclastic: false,
  // Mage
  striking: false,
  // Archer
  trueSight: false,
  unlimit: false,
  fearBreeze: false,
  // Acolyte
  allSpheres: false,
  odinsBlessing: false,
  // Ninja
  shadowWarrior: false,
  earthCharm: false,
  // Taekwon
  falconSoul: false,
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
  equipATK: 0,
  consumableATK: 0,
  bonusStatusATK: 0,
  ammoATK: 0,
  pseudoBuffATK: 0,
  masteryATK: 0,
  buffATK: 0,
  bypass: 0,
  buffs: [],
};

export interface BuildInfo {
  character: Character;
  monster: Monster;
  buffs: Buffs;
}

export const INITIAL_BUILD: BuildInfo = {
  character: emptyCharacter,
  monster: emptyMonster,
  buffs: emptyBuffs,
};