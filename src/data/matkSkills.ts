import { Character } from "./character";
import { Monster } from "./monster";
import { Skill } from "./skills";

const allSkills: Record<string, Skill> = {
  BASIC_ATTACK: {
    key: "BASIC_ATTACK",
    name: "Pure MATK",
    label: "Pure MATK",
    isMelee: false,
    job: "All",
    formula: (_character: Character, _monster: Monster) => ({
      percent: 100,
      bonus: 0,
    }),
  },
}

const wizardSkills: Record<string, Skill> = {
  CRIMSON_ROCK: {
    key: "CRIMSON_ROCK",
    name: "Crimson Rock",
    label: "Crimson Rock",
    isMelee: false,
    job: "Warlock",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3700;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      }
    },
  },
  CHAIN_LIGHTNING: {
    key: "CHAIN_LIGHTNING",
    name: "Chain Lightning",
    label: "Chain Lightning",
    isMelee: false,
    job: "Warlock",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 1400;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      }
    },
  },
  SOUL_EXPANSION: {
    key: "SOUL_EXPANSION",
    name: "Soul Expansion",
    label: "Soul Expansion",
    isMelee: false,
    job: "Warlock",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2000;
      return {
        percent: (baseDamage + character.stats.int) * (character.baseLevel / 100),
        bonus: 0,
      }
    },
  },
  COMET: {
    key: "COMET",
    name: "Comet",
    label: "Comet",
    isMelee: false,
    job: "Warlock",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 6000;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      }
    },
  },
}

export const MATK_SKILLS: Record<string, Skill> = {
  ...allSkills,
  ...wizardSkills,
};

export function getSkill(name: string) {
  return MATK_SKILLS[name] ?? MATK_SKILLS["BASIC_ATTACK"];
}
