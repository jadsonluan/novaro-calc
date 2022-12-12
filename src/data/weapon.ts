import { Element } from "./element";

export interface Weapon {
  type: WeaponType;
  level: number;
  atk: number;
  matk: number;
  refine: number;
  grade: Grade;
  element: Element;
}

export type Grade = "No Grade" | "D" | "C" | "B" | "A";

export const GRADES: Grade[] = ["No Grade", "D", "C", "B", "A"];

type WeaponType =
  | "Axe"
  | "Bare Hand"
  | "Book"
  | "Bow"
  | "Dagger"
  | "Gun"
  | "Huuma Shuriken"
  | "Instrument"
  | "Katar"
  | "Knuckle"
  | "Mace"
  | "One Hand Sword"
  | "Rod"
  | "Spear"
  | "Spear (Dragon)"
  | "Spear (Gryphon)"
  | "Two Hand Sword"
  | "Whip";

export default WeaponType;

export const WEAPONS: WeaponType[] = [
  "Axe",
  "Bare Hand",
  "Book",
  "Bow",
  "Dagger",
  "Gun",
  "Huuma Shuriken",
  "Instrument",
  "Katar",
  "Knuckle",
  "Mace",
  "One Hand Sword",
  "Rod",
  "Spear",
  "Spear (Dragon)",
  "Spear (Gryphon)",
  "Two Hand Sword",
  "Whip",
];

interface WeaponPenalty {
  small: number;
  medium: number;
  large: number;
}

export const WEAPON_PENALTIES: Record<WeaponType, WeaponPenalty> = {
  Axe: {
    small: 0.5,
    medium: 0.75,
    large: 1,
  },
  "Bare Hand": {
    small: 1,
    medium: 1,
    large: 1,
  },
  Book: {
    small: 1,
    medium: 1,
    large: 0.5,
  },
  Bow: {
    small: 1,
    medium: 1,
    large: 0.75,
  },
  Dagger: {
    small: 1,
    medium: 75,
    large: 0.5,
  },
  Gun: {
    small: 1,
    medium: 1,
    large: 1,
  },
  Katar: {
    small: 0.75,
    medium: 1,
    large: 0.75,
  },
  Knuckle: {
    small: 1,
    medium: 1,
    large: 0.75,
  },
  Mace: {
    small: 0.75,
    medium: 1,
    large: 1,
  },
  Spear: {
    small: 1,
    medium: 1,
    large: 1,
  },
  "Spear (Gryphon)": {
    small: 0.75,
    medium: 1,
    large: 1,
  },
  "Spear (Dragon)": {
    small: 1,
    medium: 1,
    large: 1,
  },
  "One Hand Sword": {
    small: 0.75,
    medium: 1,
    large: 0.75,
  },
  "Two Hand Sword": {
    small: 0.75,
    medium: 0.75,
    large: 1,
  },
  Rod: {
    small: 1,
    medium: 1,
    large: 1,
  },
  "Huuma Shuriken": {
    small: 0.75,
    medium: 0.75,
    large: 1,
  },
  Instrument: {
    small: 0.75,
    medium: 1,
    large: 0.75,
  },
  Whip: {
    small: 0.75,
    medium: 1,
    large: 0.5,
  },
};
