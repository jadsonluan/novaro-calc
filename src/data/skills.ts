import { Character, Monster } from "./input";
import { getHP, getSP } from "./stats";

export interface FormulaReturn {
  percent: number;
  bonus: number;
}

export interface Skill {
  name: string;
  key: string;
  isMelee: boolean;
  formula: (character: Character, monster: Monster) => FormulaReturn;
}

export const SKILLS: Record<string, Skill> = {
  AUTO_ATTACK: {
    key: "AUTO_ATTACK",
    name: "Auto Attack",
    isMelee: true,
    formula: (_character: Character, _monster: Monster) => ({
      percent: 1,
      bonus: 0,
    }),
  },
  TIGER_CANNON_COMBO: {
    key: "TIGER_CANNON_COMBO",
    name: "Tiger Cannon (Combo)",
    isMelee: true,
    formula: (character: Character, monster: Monster) => {
      const baseDamage = (0.3 * getHP(character) + 0.15 * getSP(character)) / 2;
      return {
        percent: (baseDamage * (character.baseLevel / 100)) / 100,
        bonus: 5000 + monster.baseLevel * 40,
      };
    },
  },
};

export function getSkill(name: string) {
  return SKILLS[name] ?? SKILLS["AUTO_ATTACK"];
}
