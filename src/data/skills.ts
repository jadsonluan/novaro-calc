import { Buffs, Character, Monster } from "./input";
import { Job } from "./job";
import { getHP, getSP } from "./stats";

export interface FormulaReturn {
  percent: number;
  bonus: number;
}

export interface Skill {
  name: string;
  label: string;
  key: string;
  job: Job | "All";
  isMelee: boolean;
  formula: (character: Character, monster: Monster, buffs: Buffs) => FormulaReturn;
}

const allSkills: Record<string, Skill> = {
  AUTO_ATTACK: {
    key: "AUTO_ATTACK",
    name: "Auto Attack",
    label: "Auto Attack",
    isMelee: true,
    job: "All",
    formula: (_character: Character, _monster: Monster) => ({
      percent: 100,
      bonus: 0,
    }),
  },
}

const suraSkills: Record<string, Skill> = {
  TRIPLE_ATTACK: {
    key: "TRIPLE_ATTACK",
    name: "Triple Attack",
    label: "Triple Attack",
    isMelee: true,
    job: "Sura",
    formula: (_character: Character, _monster: Monster) => ({
      percent: 200,
      bonus: 0,
    }),
  },
  TIGER_CANNON_COMBO: {
    key: "TIGER_CANNON_COMBO",
    label: "Tiger Cannon (Combo)",
    name: "Tiger Cannon",
    isMelee: true,
    job: "Sura",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = (0.3 * getHP(character) + 0.15 * getSP(character)) / 2;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 5000 + monster.baseLevel * 10,
      };
    },
  },
  // THIRD_FLAME_BOMB: {
  //   key: "THIRD_FLAME_BOMB",
  //   label: "Third Flame Bomb",
  //   name: "Third Flame Bomb",
  //   isMelee: true,
  //   job: "Sura",
  //   formula: (character: Character, monster: Monster) => {
  //     const baseDamage = 3250 + 0.2 * getHP(character);
  //     return {
  //       percent: baseDamage * (character.baseLevel / 100),
  //       bonus: 0,
  //     };
  //   },
  // },
}

const geneticSkills: Record<string, Skill> = {
  CART_CANNON: {
    key: "CART_CANNON",
    label: "Cart Cannon",
    name: "Cart Cannon",
    isMelee: false,
    job: "Genetic",
    formula: (character: Character, monster: Monster) => {
      // (250 * skillLevel) + (100 * Cart Remodeling skill level)
      const baseDamage = 1250 + 500;
      return {
        percent:
          (baseDamage + 2 * character.stats.int) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
}

const starEmperorSkills: Record<string, Skill> = {
  SOLAR_BURST: {
    key: "SOLAR_BURST",
    label: "Solar Burst",
    name: "Solar Burst",
    isMelee: true,
    job: "Star Emperor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3200;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
}

const kagerouOboroSkills: Record<string, Skill> = {
  CROSS_SLASH: {
    key: "CROSS_SLASH",
    label: "Cross Slash",
    name: "Cross Slash",
    isMelee: false,
    job: "Kagerou",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2000;
      return {
        percent: baseDamage * (character.baseLevel / 120) * (buffs.shadowWarrior ? 1.2 : 1),
        bonus: 0,
      };
    }
  },
}

export const SKILLS: Record<string, Skill> = {
  ...allSkills,
  ...suraSkills,
  ...geneticSkills,
  ...starEmperorSkills,
  ...kagerouOboroSkills,
};

export function getSkill(name: string) {
  return SKILLS[name] ?? SKILLS["AUTO_ATTACK"];
}
