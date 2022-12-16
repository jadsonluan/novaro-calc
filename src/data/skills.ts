import { Buffs } from "./buffs";
import { Character } from "./character";
import { Job } from "./job";
import { Monster, SIZES } from "./monster";
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
  BASIC_ATTACK: {
    key: "BASIC_ATTACK",
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
    job: "Dragon Knight",
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
    job: "Dragon Knight",
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
    job: "Imperial Guard",
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
    job: "Imperial Guard",
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
    job: "Imperial Guard",
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
    job: "Meister",
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
    job: "Biolo",
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
    job: "Shadow Cross",
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
    job: "Shadow Cross",
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
    job: "Shadow Cross",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 1500;
      return {
        percent: ((baseDamage + character.stats.str + character.stats.int) * (character.baseLevel / 100)),
        bonus: 0,
      };
    }
  },
}

const rogueSkills: Record<string, Skill> = {
  FATAL_MENACE: {
    key: "FATAL_MENACE",
    label: "Fatal Menace",
    name: "Fatal Menace",
    isMelee: true,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = (1200 + character.stats.agi) * (character.weapon.type === "Dagger" ? 2 : 1);
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  TRIANGLE_SHOT: {
    key: "TRIANGLE_SHOT",
    label: "Triangle Shot",
    name: "Triangle Shot",
    isMelee: false,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 2300 + character.stats.agi * 3;
      return {
        percent: baseDamage * (character.baseLevel / 100),
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
    job: "Wind Hawk",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 1800 + (buffs.trueSight?.active ? 20 : 0);
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
    job: "Wind Hawk",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = ((buffs.fearBreeze?.active ? 1150 : 700) + (buffs.trueSight?.active ? 20 : 0)) * 5;
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
    job: "Wind Hawk",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = (buffs.fearBreeze?.active ? 2700 : 2000) + (buffs.trueSight?.active ? 20 : 0);
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  CRESCIVE_BOLT: {
    key: "CRESCIVE_BOLT",
    label: "Crescive Bolt",
    name: "Crescive Bolt",
    isMelee: false,
    job: "Wind Hawk",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 3000 + (buffs.trueSight?.active ? 20 : 0);
      return {
        percent: (baseDamage + character.traits.con * 5) * (character.baseLevel / 100) *
        (buffs.calamityGale?.active ? 1.2 : 1) *
        (buffs.calamityGale?.active && ['brute', 'fish'].includes(monster.race) ? 1.5 : 1),
        bonus: 0,
      };
    }
  },
  CRESCIVE_BOLT_MAX: {
    key: "CRESCIVE_BOLT_MAX",
    label: "Crescive Bolt (Max stacks)",
    name: "Crescive Bolt (Max stacks)",
    isMelee: false,
    job: "Wind Hawk",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 3000 + (buffs.trueSight?.active ? 20 : 0);
      return {
        percent: (baseDamage + character.traits.con * 5) * (character.baseLevel / 100) * 
        1.3 * // 3 stacks of 20% damage increase each
        (buffs.calamityGale?.active ? 1.2 : 1) *
        (buffs.calamityGale?.active && ['brute', 'fish'].includes(monster.race) ? 1.5 : 1),
        bonus: 0,
      };
    }
  },
  GALE_STORM: {
    key: "GALE_STORM",
    label: "Gale Storm",
    name: "Gale Storm",
    isMelee: false,
    job: "Wind Hawk",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 2500 + (buffs.trueSight?.active ? 20 : 0);
      return {
        percent: (baseDamage + character.traits.con * 5) * (character.baseLevel / 100) *
          (buffs.calamityGale?.active && ['brute', 'fish'].includes(monster.race) ? 1.5 : 1),
        bonus: 0,
      };
    }
  },
}

const bardSkills: Record<string, Skill> = {
  SEVERE_RAINSTORM: {
    key: "SEVERE_RAINSTORM",
    label: "Severe Rainstorm 1-tick",
    name: "Severe Rainstorm 1-tick",
    isMelee: false,
    job: "Troubadour / Trouvere",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 500 + ((character.stats.dex + character.stats.agi) / 2);
      return {
        percent: (baseDamage + (character.weapon.type === "Instrument" ? 100 : 0)) * (character.baseLevel / 100),
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
    job: "Inquisitor",
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
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = (0.3 * getHP(character) + 0.15 * getSP(character)) / 2;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 5000 + monster.baseLevel * 10,
      };
    },
  },
  THIRD_FLAME_BOMB: {
    key: "THIRD_FLAME_BOMB",
    label: "Third Flame Bomb",
    name: "Third Flame Bomb",
    isMelee: true,
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3250 + 0.2 * getHP(character);
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
}

const starGladiatorSkills: Record<string, Skill> = {
  SOLAR_BURST: {
    key: "SOLAR_BURST",
    label: "Solar Burst",
    name: "Solar Burst",
    isMelee: true,
    job: "Sky Emperor",
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
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2000;
      return {
        percent: baseDamage * (character.baseLevel / 120) * (buffs.shadowWarrior?.active ? 1.2 : 1),
        bonus: 0,
      };
    }
  },
}

const noviceSkills: Record<string, Skill> = {
  DOUBLE_BOWLING_BASH: {
    key: "DOUBLE_BOWLING_BASH",
    name: "Double Bowling Bash (Per hit)",
    label: "Double Bowling Bash (Per hit)",
    isMelee: true,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2400;
      return {
        percent:
          (baseDamage + 5 * character.traits.pow) * (character.baseLevel / 100) *
          (buffs.breakingLimit?.active ? 1.5 : 1),
        bonus: 0,
      };
    },
  },
  SHIELD_CHAIN_RUSH: {
    key: "SHIELD_CHAIN_RUSH",
    name: "Shield Chain Rush",
    label: "Shield Chain Rush",
    isMelee: false,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3700;
      return {
        percent:
          (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100) *
          (buffs.breakingLimit?.active ? 1.5 : 1),
        bonus: 0,
      };
    },
  },
  SPIRAL_PIERCE_MAX: {
    key: "SPIRAL_PIERCE_MAX",
    name: "Spiral Pierce Max",
    label: "Spiral Pierce Max",
    isMelee: false,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3300;
      const bonusFactor = {
        [SIZES[0]]: 2.5, // Small
        [SIZES[1]]: 2.3, // Medium
        [SIZES[2]]: 2.2, // Large
      }
      return {
        percent:
          (baseDamage + character.traits.pow * 5) * (bonusFactor[monster.size] || 1) *
          (character.baseLevel / 100) *
          (buffs.breakingLimit?.active ? 2 : 1),
        bonus: 0,
      };
    },
  },
  MEGA_SONIC_BLOW: {
    key: "MEGA_SONIC_BLOW",
    name: "Mega Sonic Blow",
    label: "Mega Sonic Blow",
    isMelee: true,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2800;
      return {
        percent:
          (baseDamage + character.traits.pow * 5) *
          (character.baseLevel / 100) *
          (buffs.breakingLimit?.active ? 2 : 1),
        bonus: 0,
      };
    },
  },
};

export const SKILLS: Record<string, Skill> = {
  ...allSkills,
  ...knightSkills,
  ...crusaderSkills,
  ...assassinSkills,
  ...rogueSkills,
  ...whiteSmithSkills,
  ...alchemistSkills,
  ...hunterSkills,
  ...bardSkills,
  ...monkSkills,
  ...starGladiatorSkills,
  ...ninjaSkills,
  ...noviceSkills,
};

export function getSkill(name: string) {
  return SKILLS[name] ?? SKILLS["BASIC_ATTACK"];
}
