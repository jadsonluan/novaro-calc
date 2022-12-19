import { Element } from "./element";

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
  INT: number;
  hardDEF: number;
  hardDEFDebuff: number;
  hardMDEF: number;
  hardMDEFDebuff: number;
  res: number;
  mres: number;
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
  INT: 0,
  hardDEF: 0,
  hardDEFDebuff: 0,
  hardMDEF: 0,
  hardMDEFDebuff: 0,
  res: 0,
  mres: 0,
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