import { Element } from "./element";
import { ElementLevel, MonsterType, Race, Size } from "./monster";

export interface MonsterTemplate {
  key: string;
  name: string;
  baseLevel: number;
  VIT: number;
  INT: number;
  hardDEF: number;
  hardMDEF: number;
  res: number;
  mres: number;
  element: Element;
  elementLevel: ElementLevel;
  race: Race;
  size: Size;
  type: MonsterType;
  damageMultiplier: number;
}

const defaultMonster: MonsterTemplate = {
  key: 'defaultMonster',
  name: 'Default Monster',
  baseLevel: 1,
  VIT: 0,
  INT: 0,
  hardDEF: 0,
  hardMDEF: 0,
  res: 0,
  mres: 0,
  element: "Neutral",
  elementLevel: "1",
  race: "formless",
  size: "small",
  type: "normal",
  damageMultiplier: 1,
};

const memoryOfGerhard: MonsterTemplate = {
  key: 'memoryOfGerhard',
  name: 'Memory of Gerhard',
  baseLevel: 180,
  VIT: 90,
  INT: 169,
  hardDEF: 451,
  hardMDEF: 105,
  res: 0,
  mres: 0,
  element: "Undead",
  elementLevel: "4",
  race: "undead",
  size: "large",
  type: "boss",
  damageMultiplier: 0.1,
};

const phantomAmdarais: MonsterTemplate = {
  key: 'phantomAmdarais',
  name: 'Phantom Amdarais',
  baseLevel: 192,
  VIT: 132,
  INT: 136,
  hardDEF: 446,
  hardMDEF: 82,
  res: 0,
  mres: 0,
  element: "Shadow",
  elementLevel: "3",
  race: "demon",
  size: "large",
  type: "boss",
  damageMultiplier: 1,
};

const phantomHimmelmez: MonsterTemplate = {
  key: 'phantomHimmelmez',
  name: 'Phantom Himmelmez',
  baseLevel: 192,
  VIT: 132,
  INT: 136,
  hardDEF: 514,
  hardMDEF: 92,
  res: 0,
  mres: 0,
  element: "Holy",
  elementLevel: "3",
  race: "angel",
  size: "medium",
  type: "boss",
  damageMultiplier: 1,
};

const phantomKimi: MonsterTemplate = {
  key: 'phantomKimi',
  name: 'Phantom Kimi',
  baseLevel: 160,
  VIT: 52,
  INT: 527,
  hardDEF: 479,
  hardMDEF: 444,
  res: 0,
  mres: 0,
  element: "Ghost",
  elementLevel: "1",
  race: "undead",
  size: "large",
  type: "boss",
  damageMultiplier: 0.2,
};

const midnightFenrir: MonsterTemplate = {
  key: 'midnightFenrir',
  name: 'Midnight Fenrir',
  baseLevel: 210,
  VIT: 200,
  INT: 200,
  hardDEF: 200,
  hardMDEF: 70,
  res: 400,
  mres: 300,
  element: "Ghost",
  elementLevel: "2",
  race: "demihuman",
  size: "medium",
  type: "boss",
  damageMultiplier: 0.1,
};

export const monsterTemplates: MonsterTemplate[] = [
  defaultMonster,
  memoryOfGerhard,
  phantomAmdarais,
  phantomHimmelmez,
  phantomKimi,
  midnightFenrir,
];