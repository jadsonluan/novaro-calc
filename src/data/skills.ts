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
  hardAsSoftDef?: boolean;
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

const knightSkills: Record<string, Skill> = {
  IGNITION_BREAK: {
    key: "IGNITION_BREAK",
    label: "Ignition Break",
    name: "Ignition Break",
    isMelee: true,
    job: "Rune Knight",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2250;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  SONIC_WAVE: {
    key: "SONIC_WAVE",
    label: "Sonic Wave",
    name: "Sonic Wave",
    isMelee: false,
    job: "Rune Knight",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2550;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
}

const crusaderSkills: Record<string, Skill> = {
  OVERBRAND: {
    key: "OVERBRAND",
    label: "Overbrand",
    name: "Overbrand",
    isMelee: true,
    job: "Royal Guard",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 1500;
      return {
        percent: (baseDamage * (character.baseLevel / 100)) * 3,
        bonus: 0,
      };
    },
  },
  CANNON_SPEAR: {
    key: "CANNON_SPEAR",
    label: "Cannon Spear",
    name: "Cannon Spear",
    isMelee: false,
    job: "Royal Guard",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 600;
      return {
        percent: (baseDamage + character.stats.str * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  VANISHING_POINT: {
    key: "VANISHING_POINT",
    label: "Vaninshing Point",
    name: "Vaninshing Point",
    isMelee: false,
    job: "Royal Guard",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 1700;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
}

const whiteSmithSkills: Record<string, Skill> = {
  ARM_CANNON: {
    key: "ARM_CANNON",
    label: "Arm Cannon",
    name: "Arm Cannon",
    isMelee: false,
    job: "Mechanic",
    hardAsSoftDef: true,
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2150;
      return {
        percent:
          (baseDamage) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
}

const alchemistSkills: Record<string, Skill> = {
  CART_CANNON: {
    key: "CART_CANNON",
    label: "Cart Cannon",
    name: "Cart Cannon",
    isMelee: false,
    job: "Genetic",
    hardAsSoftDef: true,
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 1250 + 500;
      return {
        percent:
          (baseDamage + 2 * character.stats.int) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
}

const assassinSkills: Record<string, Skill> = {
  CROSS_IMPACT: {
    key: "CROSS_IMPACT",
    label: "Cross Impact",
    name: "Cross Impact",
    isMelee: true,
    job: "Guillotine Cross",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 2150;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  COUNTER_SLASH: {
    key: "COUNTER_SLASH",
    label: "Counter Slash",
    name: "Counter Slash",
    isMelee: true,
    job: "Guillotine Cross",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 1800;
      return {
        percent: (baseDamage * (character.baseLevel / 120)) + (character.stats.agi * 2) + (70 * 4),
        bonus: 0,
      };
    }
  },
  SOUL_DESTROYER: {
    key: "SOUL_DESTROYER",
    label: "Soul Destroyer",
    name: "Soul Destroyer",
    isMelee: false,
    job: "Guillotine Cross",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 1500;
      return {
        percent: ((baseDamage + character.stats.str + character.stats.int) * (character.baseLevel / 100)),
        bonus: 0,
      };
    }
  },
}

const hunterSkills: Record<string, Skill> = {
  FOCUSED_ARROW_STRIKE: {
    key: "FOCUSED_ARROW_STRIKE",
    label: "Focused Arrow Strike",
    name: "Focused Arrow Strike",
    isMelee: false,
    job: "Ranger",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 1800 + (buffs.trueSight ? 20 : 0);
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  AIMED_BOLT: {
    key: "AIMED_BOLT",
    label: "Aimed Bolt",
    name: "Aimed Bolt",
    isMelee: false,
    job: "Ranger",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = ((buffs.fearBreeze ? 1150 : 700) + (buffs.trueSight ? 20 : 0)) * 5;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  ARROW_STORM: {
    key: "ARROW_STORM",
    label: "Arrow Storm",
    name: "Arrow Storm",
    isMelee: false,
    job: "Ranger",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = (buffs.fearBreeze ? 2700 : 2000) + (buffs.trueSight ? 20 : 0);
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
}

const monkSkills: Record<string, Skill> = {
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

const starGladiatorSkills: Record<string, Skill> = {
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

const ninjaSkills: Record<string, Skill> = {
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
  ...knightSkills,
  ...crusaderSkills,
  ...assassinSkills,
  ...whiteSmithSkills,
  ...alchemistSkills,
  ...hunterSkills,
  ...monkSkills,
  ...starGladiatorSkills,
  ...ninjaSkills,
};

export function getSkill(name: string) {
  return SKILLS[name] ?? SKILLS["AUTO_ATTACK"];
}
