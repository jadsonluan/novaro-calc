import { Stats, Traits } from "./character";

export type EquipmentClass =
  | "headgear"
  | "mid"
  | "low"
  | "armor"
  | "weapon"
  | "shield"
  | "garment"
  | "shoes"
  | "accessoryR"
  | "accessoryL"
  | "costumeHeadgear"
  | "costumeMid"
  | "costumeLow"
  | "sgArmor"
  | "sgWeapon"
  | "sgShield"
  | "costumeGarment"
  | "sgShoes"
  | "sgEarring"
  | "sgPendant"

export interface EquipmentModifiers {
  stats: Stats;
  traits: Traits;
  hp: {
    flat: number;
    percent: number;
  };
  sp: {
    flat: number;
    percent: number;
  };
  ATK: {
    equipATK: number;
    patk: number;
    crate: number;
  };
  MATK: {
    equipMATK: number;
    matkPercent: number;
    smatk: number;
  };
  modifiers: {
    kill: number;
    melee: number;
    ranged: number;
    race: number;
    size: number;
    class: number;
    monster: number;
    targetProperty: number;
    skillProperty: number;
    critical: number;
    custom: number;
  }
  bypass: number;
  traitBypass: number;
}

export const initialEquipment: Equipment = {
  name: '',
  equipmentClass: 'headgear',
  cards: [],
  cardSlots: 0,
  enchats: [],
  enchantSlots: 0,
  stats: {
    str: 0,
    agi: 0,
    vit: 0,
    int: 0,
    dex: 0,
    luk: 0,
  },
  traits: {
    pow: 0,
    sta: 0,
    wis: 0,
    spl: 0,
    con: 0,
    crt: 0,
  },
  hp: {
    flat: 0,
    percent: 0,
  },
  sp: {
    flat: 0,
    percent: 0,
  },
  ATK: {
    equipATK: 0,
    patk: 0,
    crate: 0,
  },
  MATK: {
    equipMATK: 0,
    matkPercent: 0,
    smatk: 0,
  },
  modifiers: {
    kill: 0,
    melee: 0,
    ranged: 0,
    race: 0,
    size: 0,
    class: 0,
    monster: 0,
    targetProperty: 0,
    skillProperty: 0,
    critical: 0,
    custom: 0,
  },
  bypass: 0,
  traitBypass: 0,
}

export interface Enchant extends EquipmentModifiers {
  name: string;
}

export interface Card extends EquipmentModifiers {
  name: string;
  equipmentClass: EquipmentClass;
}


export interface Equipment extends EquipmentModifiers {
  name: string;
  equipmentClass: EquipmentClass;
  cardSlots: number;
  cards: Card[];
  enchantSlots: number;
  enchats: Enchant[];
}

export interface Gears {
  headgear?: Equipment;
  mid?: Equipment;
  low?: Equipment;
  armor?: Equipment;
  weapon?: Equipment;
  shield?: Equipment;
  garment?: Equipment;
  shoes?: Equipment;
  accessoryR?: Equipment;
  accessoryL?: Equipment;
  costumeHeadgear?: Equipment;
  costumeMid?: Equipment;
  costumeLow?: Equipment;
  sgArmor?: Equipment;
  sgWeapon?: Equipment;
  sgShield?: Equipment;
  costumeGarment?: Equipment;
  sgShoes?: Equipment;
  sgEarring?: Equipment;
  sgPendant?: Equipment;
}

export const initialGears = {
  headgear: initialEquipment,
  mid: initialEquipment,
  low: initialEquipment,
  armor: initialEquipment,
  weapon: initialEquipment,
  shield: initialEquipment,
  garment: initialEquipment,
  shoes: initialEquipment,
  accessoryR: initialEquipment,
  accessoryL: initialEquipment,
  costumeHeadgear: initialEquipment,
  costumeMid: initialEquipment,
  costumeLow: initialEquipment,
  sgArmor: initialEquipment,
  sgWeapon: initialEquipment,
  sgShield: initialEquipment,
  costumeGarment: initialEquipment,
  sgShoes: initialEquipment,
  sgEarring: initialEquipment,
  sgPendant: initialEquipment,
}