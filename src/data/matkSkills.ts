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

const noviceSkills: Record<string, Skill> = {
  METEOR_STORM_BUSTER: {
    key: "METEOR_STORM_BUSTER",
    name: "Meteor Storm Buster (fall)",
    label: "Meteor Storm Buster (fall)",
    isMelee: false,
    job: "Super Novice EX",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3800;
      return {
        percent: (baseDamage + 5 * character.traits.spl) * (character.baseLevel / 100),
        bonus: 0,
      }
    },
  },
  METEOR_STORM_BUSTER_EXPLOSION: {
    key: "METEOR_STORM_BUSTER_EXPLOSION",
    name: "Meteor Storm Buster (explostion)",
    label: "Meteor Storm Buster (explostion)",
    isMelee: false,
    job: "Super Novice EX",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2450;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      }
    },
  },
  JUPITEL_THUNDERSTORM: {
    key: "JUPITEL_THUNDERSTORM",
    name: "Jupitel Thunderstorm",
    label: "Jupitel Thunderstorm",
    isMelee: false,
    job: "Super Novice EX",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 18300;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      }
    },
  },
  JACK_FROST_NOVA: {
    key: "JACK_FROST_NOVA",
    name: "Jack Frost Nova (Explosion)",
    label: "Jack Frost Nova (Explosion)",
    isMelee: false,
    job: "Super Novice EX",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2500;
      return {
        percent: ((baseDamage + character.traits.spl * 5) * (character.baseLevel / 100)) * 2,
        bonus: 0,
      }
    },
  },
  HELLS_DRIVE: {
    key: "HELLS_DRIVE",
    name: "Hell's Drive",
    label: "Hell's Drive",
    isMelee: false,
    job: "Super Novice EX",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 6900;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      }
    },
  },
  GROUND_GRAVITATION_INITIAL: {
    key: "GROUND_GRAVITATION_INITIAL",
    name: "Ground Gravitation (Initial)",
    label: "Ground Gravitation (Initial)",
    isMelee: false,
    job: "Super Novice EX",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 18400;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      }
    },
  },
  GROUND_GRAVITATION_FIELD: {
    key: "GROUND_GRAVITATION_FIELD",
    name: "Ground Gravitation (Field)",
    label: "Ground Gravitation (Field)",
    isMelee: false,
    job: "Super Novice EX",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3300;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      }
    },
  },
  NAPALM_VULCAN_STRIKE: {
    key: "NAPALM_VULCAN_STRIKE",
    name: "Napalm Vulcan Strike",
    label: "Napalm Vulcan Strike",
    isMelee: false,
    job: "Super Novice EX",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3150;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      }
    },
  },
}

export const MATK_SKILLS: Record<string, Skill> = {
  ...allSkills,
  ...noviceSkills,
  ...wizardSkills,
};

export function getSkill(name: string) {
  return MATK_SKILLS[name] ?? MATK_SKILLS["BASIC_ATTACK"];
}
