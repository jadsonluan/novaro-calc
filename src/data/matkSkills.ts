import { Buffs } from "./buffs";
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
};

const wizardSkills: Record<string, Skill> = {
  CRIMSON_ROCK: {
    key: "CRIMSON_ROCK",
    name: "Crimson Rock",
    label: "Crimson Rock",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3700;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  CHAIN_LIGHTNING: {
    key: "CHAIN_LIGHTNING",
    name: "Chain Lightning",
    label: "Chain Lightning",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 1400;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  SOUL_EXPANSION: {
    key: "SOUL_EXPANSION",
    name: "Soul Expansion",
    label: "Soul Expansion",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2000;
      return {
        percent:
          (baseDamage + character.stats.int) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  COMET: {
    key: "COMET",
    name: "Comet",
    label: "Comet",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 6000;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  SOUL_VULCAN_STRIKE: {
    key: "SOUL_VULCAN_STRIKE",
    name: "Soul Vulcan Strike",
    label: "Soul Vulcan Strike",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 900;
      return {
        percent: (baseDamage + character.traits.spl * 4) * (character.baseLevel / 100) * 7,
        bonus: 0,
      };
    },
  },
  MYSTERY_ILLUSION: {
    key: "MYSTERY_ILLUSION",
    name: "Mystery Illusion",
    label: "Mystery Illusion",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2500;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  DEADLY_PROJECTION: {
    key: "DEADLY_PROJECTION",
    name: "Deadly Projection",
    label: "Deadly Projection",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3000;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  ASTRAL_IMPACT: {
    key: "ASTRAL_IMPACT",
    name: "Astral Impact",
    label: "Astral Impact",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 5000 + (['undead', 'dragon'].includes(monster.race) ? 6000 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 15) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  ASTRAL_IMPACT_OVERTIME: {
    key: "ASTRAL_IMPACT_OVERTIME",
    name: "Astral Impact (Overtime)",
    label: "Astral Impact (Overtime)",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2000 + (['undead', 'dragon'].includes(monster.race) ? 2000 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 15) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  CRIMSON_ARROW_EXPLOSION: {
    key: "CRIMSON_ARROW_EXPLOSION",
    name: "Crimson Arrow (Explosion)",
    label: "Crimson Arrow (Explosion)",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1500;
      return {
        percent:
          (baseDamage + (buffs.climax?.active ? 1500 : 0) + character.traits.spl * 2.5) *
          2 *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  ALL_BLOOM: {
    key: "ALL_BLOOM",
    name: "All Bloom",
    label: "All Bloom",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 500;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100) *
          (buffs.climax?.active ? 2 : 1),
        bonus: 0,
      };
    },
  },
  RAIN_OF_CRYSTAL: {
    key: "RAIN_OF_CRYSTAL",
    name: "Rain of Crystal",
    label: "Rain of Crystal",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 750;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  FROZEN_SLASH: {
    key: "FROZEN_SLASH",
    name: "Frozen Slash",
    label: "Frozen Slash",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3000;
      return {
        percent:
          (baseDamage + (buffs.climax?.active ? 1250 : 0) + character.traits.spl * 5) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  CRYSTAL_IMPACT: {
    key: "CRYSTAL_IMPACT",
    name: "Crystal Impact",
    label: "Crystal Impact",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 4000;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100) *
          (buffs.climax?.active ? 1.5 : 1),
        bonus: 0,
      };
    },
  },
  TORNADO_STORM: {
    key: "TORNADO_STORM",
    name: "Tornado Storm",
    label: "Tornado Storm",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 450;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  STORM_CANNON: {
    key: "STORM_CANNON",
    name: "Storm Cannon",
    label: "Storm Cannon",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3000;
      return {
        percent:
          (baseDamage + (buffs.climax?.active ? 1250 : 0) + character.traits.spl * 5) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  DESTRUCTIVE_HURRICANE: {
    key: "DESTRUCTIVE_HURRICANE",
    name: "Destructive Hurricane",
    label: "Destructive Hurricane",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 8000;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100) *
          (buffs.climax?.active ? 2 : 1),
        bonus: 0,
      };
    },
  },
  STRATUM_TREMOR: {
    key: "STRATUM_TREMOR",
    name: "Stratum Tremor",
    label: "Stratum Tremor",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 1250;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  ROCK_DOWN: {
    key: "ROCK_DOWN",
    name: "Rock Down",
    label: "Rock Down",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3000;
      return {
        percent:
          (baseDamage + (buffs.climax?.active ? 1250 : 0) + character.traits.spl * 5) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  VIOLENT_QUAKE: {
    key: "VIOLENT_QUAKE",
    name: "Violent Quake",
    label: "Violent Quake",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 600;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100) *
          (buffs.climax?.active ? 2 : 1),
        bonus: 0,
      };
    },
  },
};

const priestSkills: Record<string, Skill> = {
  ADORAMUS: {
    key: "ADORAMUS",
    name: "Adoramus",
    label: "Adoramus",
    isMelee: false,
    job: "Cardinal",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2800;
      return {
        percent:
          (baseDamage) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
}

const noviceSkills: Record<string, Skill> = {
  METEOR_STORM_BUSTER: {
    key: "METEOR_STORM_BUSTER",
    name: "Meteor Storm Buster (fall)",
    label: "Meteor Storm Buster (fall)",
    isMelee: false,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3800;
      return {
        percent:
          (baseDamage + 5 * character.traits.spl) * (character.baseLevel / 100) *
          (buffs.ruleBreak?.active ? 1.5 : 1),
        bonus: 0,
      };
    },
  },
  METEOR_STORM_BUSTER_EXPLOSION: {
    key: "METEOR_STORM_BUSTER_EXPLOSION",
    name: "Meteor Storm Buster (explostion)",
    label: "Meteor Storm Buster (explostion)",
    isMelee: false,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2450;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100) *
          (buffs.ruleBreak?.active ? 1.5 : 1),
        bonus: 0,
      };
    },
  },
  JUPITEL_THUNDERSTORM: {
    key: "JUPITEL_THUNDERSTORM",
    name: "Jupitel Thunderstorm",
    label: "Jupitel Thunderstorm",
    isMelee: false,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 18300;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100) *
          (buffs.ruleBreak?.active ? 1.7 : 1),
        bonus: 0,
      };
    },
  },
  JACK_FROST_NOVA: {
    key: "JACK_FROST_NOVA",
    name: "Jack Frost Nova (Explosion)",
    label: "Jack Frost Nova (Explosion)",
    isMelee: false,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2500;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100) *
          2 *
          (monster.type === "boss" ? 1 : 1.15) *
          (buffs.ruleBreak?.active ? 1.7 : 1),
        bonus: 0,
      };
    },
  },
  HELLS_DRIVE: {
    key: "HELLS_DRIVE",
    name: "Hell's Drive",
    label: "Hell's Drive",
    isMelee: false,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 6900;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100) *
          (buffs.ruleBreak?.active ? 1.7 : 1),
        bonus: 0,
      };
    },
  },
  GROUND_GRAVITATION_INITIAL: {
    key: "GROUND_GRAVITATION_INITIAL",
    name: "Ground Gravitation (Initial)",
    label: "Ground Gravitation (Initial)",
    isMelee: false,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 18400;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100) *
          (buffs.ruleBreak?.active ? 1.5 : 1),
        bonus: 0,
      };
    },
  },
  GROUND_GRAVITATION_FIELD: {
    key: "GROUND_GRAVITATION_FIELD",
    name: "Ground Gravitation (Field)",
    label: "Ground Gravitation (Field)",
    isMelee: false,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3300;
      return {
        // Increase damage by 15% when inside the field (doesn't work on boss monsters)
        percent:
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100) *
          (monster.type === "boss" ? 1 : 1.15) *
          (buffs.ruleBreak?.active ? 1.5 : 1),
        bonus: 0,
      };
    },
  },
  NAPALM_VULCAN_STRIKE: {
    key: "NAPALM_VULCAN_STRIKE",
    name: "Napalm Vulcan Strike",
    label: "Napalm Vulcan Strike",
    isMelee: false,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3150;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100) *
          (buffs.ruleBreak?.active ? 2 : 1),
        bonus: 0,
      };
    },
  },
};

export const MATK_SKILLS: Record<string, Skill> = {
  ...allSkills,
  ...wizardSkills,
  ...priestSkills,
  ...noviceSkills,
};

export function getSkill(name: string) {
  return MATK_SKILLS[name] ?? MATK_SKILLS["BASIC_ATTACK"];
}
