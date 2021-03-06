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
}

export interface Buffs {
  allSpheres: boolean;
}

export const emptyBuffs: Buffs = {
  allSpheres: false,
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

export const character: Character = {
  baseLevel: 200,
  job: "Sura",
  skill: "TIGER_CANNON_COMBO",
  crit: false,
  stats: {
    dex: 100 + 19,
    str: 120 + 39,
    luk: 1 + 2,
    agi: 100 + 22,
    vit: 130 + 30,
    int: 73 + 33,
  },
  hp: {
    base: 22810,
    flat: 2070,
    percent: 107,
  },
  sp: {
    base: 985,
    flat: 135,
    percent: -5,
  },
  weapon: {
    level: 4,
    type: "Knuckle",
    refine: 15,
    atk: 250,
    element: "Shadow",
  },
  shadowWeaponRefine: 5,
  equipATK: 651,
  // nao funciona no nova para consumiveis
  consumableATK: 0,
  // parecido com consumableATK mas o nova usa esse invés do consumableATK para alguns itens
  bonusStatusATK: 0,
  ammoATK: 0,
  pseudoBuffATK: 0,
  masteryATK: 30 + 3 * 15,
  buffATK: 0,
  bypass: 0,
  modifiers: {
    skill: 225,
    melee: 80,
    ranged: 0,
    dmg: 0,
    finalDmg: 0,
    //
    race: 14,
    size: 30,
    class: 33,
    monster: 0,
    targetProperty: 0,
    advancedKatarMastery: 0,
    custom: 0,
    critical: 0,
  },
};

export const monster: Monster = {
  baseLevel: 10,
  VIT: 1,
  hardDEF: 0,
  hardDEFDebuff: 0,
  element: "Holy",
  elementLevel: "1",
  race: "formless",
  size: "small",
  type: "boss",
};

export const emptyMonster: Monster = {
  baseLevel: 1,
  VIT: 1,
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
  job: "Sura",
  skill: "basic_attack",
  crit: false,
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