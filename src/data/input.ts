type Element =
  | "neutral"
  | "water"
  | "earth"
  | "fire"
  | "wind"
  | "poison"
  | "holy"
  | "shadow"
  | "ghost"
  | "undead";

interface Stats {
  str: number;
  agi: number;
  vit: number;
  int: number;
  dex: number;
  luk: number;
}

interface HPInfo {
  base: number;
  flat: number;
  percent: number;
}

interface SPInfo {
  base: number;
  flat: number;
  percent: number;
}

interface Weapon {
  type: string;
  level: number;
  atk: number;
  refine: number;
  element: Element;
}

interface Modifiers {
  skill: number;
  melee: number;
  dmg: number;
  finalDmg: number;
  race: number;
  size: number;
  class: number;
  monster: number;
  targetProperty: number;
  advancedKatarMastery: number;
}

export interface Character {
  baseLevel: number;
  job: string;
  skill: string;
  stats: Stats;
  hp: HPInfo;
  sp: SPInfo;
  weapon: Weapon;
  modifiers: Modifiers
  shadowWeaponRefine: number;
  equipATK: number
  // nao funciona no nova para consumiveis
  consumableATK: number
  // parecido com consumableATK mas o nova usa esse invés do consumableATK para alguns iten
  bonusStatusATK: number
  ammoATK: number
  pseudoBuffATK: number
  masteryATK: number
  buffATK: number
  bypass: number
}

type Race = 'formless' | 'demihuman' | 'undead' | 'fish' | 'plant' | 'insect' | 'demon' | 'angel' | 'undead' | 'brute' | 'dragon' | 'player'
type Size = 'small' | 'medium' | 'large'

interface Monster {
  baseLevel: number;
  VIT: number;
  hardDEF: number;
  hardDEFDebuff: number;
  element: Element;
  elementLevel: number;
  race: Race
  size: Size
  boss: boolean
}

export const character: Character = {
  baseLevel: 200,
  job: "SURA",
  skill: "TIGER_CANNON_COMBO",
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
    percent: 97 + 20,
  },
  sp: {
    base: 985,
    flat: 135,
    percent: -5,
  },
  weapon: {
    level: 4,
    type: "knuckle",
    refine: 15,
    atk: 250,
    element: "shadow",
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
    skill: 1 + 2.25,
    melee: 1 + 0.8,
    dmg: 1,
    finalDmg: 1,
    //
    race: 1 + 0.14,
    size: 1 + 0.3,
    class: 1 + 0.33,
    monster: 1,
    targetProperty: 1,
    advancedKatarMastery: 1,
  },
};

export const monster: Monster = {
  baseLevel: 10,
  VIT: 1,
  hardDEF: 0,
  hardDEFDebuff: 0,
  element: "holy",
  elementLevel: 1,
  race: "formless",
  size: "small",
  boss: false,
};