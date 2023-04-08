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

function getWhitesmithATKBonus(character: Character,buffs: Buffs) {
  if (buffs.overThrust?.active || buffs.maximumOverThrust?.active) {
    let ATK_MODIFIER = 25;

    if (character.job !== 'Meister') ATK_MODIFIER = 15;
    if (buffs.maximumOverThrust?.active) ATK_MODIFIER = 100;

    return ATK_MODIFIER;
  }

  return 0;
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
  DRAGON_BREATH: {
    key: "DRAGON_BREATH",
    label: "Dragon Breath",
    name: "Dragon Breath",
    isMelee: false,
    job: "Dragon Knight",
    hardAsSoftDef: true,
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = Math.floor(10 * (getHP(character) / 50 + getSP(character) / 4));
      return {
        percent: baseDamage * 
         ((90 + 50) / 100) *
         (buffs.dragonicAura?.active ? 1.5 : 1) *
         (character.baseLevel / 100) + 50, // Small correction
        bonus: 0,
      };
    },
  },
  WIND_CUTTER_TWO: {
    key: "WIND_CUTTER_TWO",
    label: "Wind Cutter (2H Sword)",
    name: "Wind Cutter (2H Sword)",
    isMelee: true,
    hardAsSoftDef: true,
    job: "Dragon Knight",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 1250;

      return {
        percent: baseDamage * (character.baseLevel / 100) * 2,
        bonus: 0,
      };
    },
  },
  WIND_CUTTER_SPEAR: {
    key: "WIND_CUTTER_SPEAR",
    label: "Wind Cutter (Spear)",
    name: "Wind Cutter (Spear)",
    isMelee: false,
    job: "Dragon Knight",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2000;

      return {
        percent: baseDamage * (character.baseLevel / 100) * 1,
        bonus: 0,
      };
    },
  },
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
  HACK_AND_SLASHER_2HSWORD: {
    key: "HACK_AND_SLASHER_2HSWORD",
    label: "Hack and Slasher (2H Sword)",
    name: "Hack and Slasher (2H Sword)",
    isMelee: true,
    job: "Dragon Knight",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 7700 + character.traits.pow * 7;
      return {
        percent: baseDamage * (character.baseLevel / 100) * 2,
        bonus: 0,
      };
    },
  },
  HACK_AND_SLASHER_2HSPEAR: {
    key: "HACK_AND_SLASHER_2HSPEAR",
    label: "Hack and Slasher (2H Spear)",
    name: "Hack and Slasher (2H Spear)",
    isMelee: false,
    job: "Dragon Knight",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 7700 + character.traits.pow * 7;
      return {
        percent: baseDamage * (character.baseLevel / 100) * 2,
        bonus: 0,
      };
    },
  },
  STORM_SLASH: {
    key: "STORM_SLASH",
    label: "Storm Slash",
    name: "Storm Slash",
    isMelee: true,
    job: "Dragon Knight",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2200 + character.traits.pow * 5;
      return {
        percent: baseDamage * (character.baseLevel / 100) * 5,
        bonus: 0,
      };
    },
  },
  SERVANT_W_ATK: {
    key: "SERVANT_W_ATK",
    label: "Servant Weapon",
    name: "Servant Weapon",
    isMelee: true,
    job: "Dragon Knight",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2500 + character.traits.pow * 5;
      return {
        percent: baseDamage * (character.baseLevel / 100) * 2,
        bonus: 0,
      };
    },
  },
  SERVANT_W_PHANTOM: {
    key: "SERVANT_W_PHANTOM",
    label: "Servant Weapon - Phantom (5 hits)",
    name: "Servant Weapon - Phantom",
    isMelee: true,
    job: "Dragon Knight",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 1700 + character.traits.pow * 5;
      return {
        percent: baseDamage * (character.baseLevel / 100) * 5,
        bonus: 0,
      };
    },
  },
  SERVANT_W_DEMOLITION: {
    key: "SERVANT_W_DEMOLITION",
    label: "Servant Weapon - Demoliton (5 hits)",
    name: "Servant Weapon - Demolition",
    isMelee: true,
    job: "Dragon Knight",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2500 + character.traits.pow * 5;
      return {
        percent: baseDamage * (character.baseLevel / 100) * 5,
        bonus: 0,
      };
    },
  },
}

const crusaderSkills: Record<string, Skill> = {
  RAPID_SMITHING: {
    key: "RAPID_SMITHING",
    label: "Rapid Smithing",
    name: "Rapid Smithing",
    isMelee: false,
    job: "Imperial Guard",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage =
        1300 + character.shield.weight + character.shield.refine * 4;
      return {
        percent:
          baseDamage *
          (character.baseLevel / 100) *
          (buffs.shieldShooting?.active ? 1.5 : 1),
        bonus: 0,
      };
    },
  },
  SHIELD_PRESS: {
    key: "SHIELD_PRESS",
    label: "Shield Press",
    name: "Shield Press",
    isMelee: true,
    job: "Imperial Guard",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2000 + (buffs.shieldShooting?.active ? 2100 : 0);
      return {
        percent:
          (baseDamage + character.stats.str) * (character.baseLevel / 100) +
          character.stats.vit +
          (character.shield.weight / 2) * character.shield.refine,
        bonus: 0,
      };
    },
  },
  EARTH_DRIVE: {
    key: "EARTH_DRIVE",
    label: "Earth Drive",
    name: "Earth Drive",
    isMelee: true,
    job: "Imperial Guard",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1900 + (buffs.shieldShooting?.active ? 1850 : 0);
      return {
        percent: (baseDamage + character.stats.str + character.stats.vit) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  OVER_BRAND: {
    key: "OVER_BRAND",
    label: "Overbrand",
    name: "Over Brand",
    isMelee: true,
    job: "Imperial Guard",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1500 + (buffs.moonSlasher?.active ? 500 : 0);
      return {
        percent: baseDamage * (character.baseLevel / 100) * 3,
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
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 600 + (buffs.grandJudgment?.active ? 400 : 0);
      return {
        percent:
          (baseDamage + character.stats.str * 5) * (character.baseLevel / 100),
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
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1700 + (buffs.grandJudgment?.active ? 800 : 0);
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  OVERSLASH: {
    key: "OVERSLASH",
    label: "Overslash",
    name: "Overslash",
    isMelee: true,
    job: "Imperial Guard",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 1600 + 2500;
      return {
        percent:
          (baseDamage + character.traits.pow * 7) *
          (character.baseLevel / 100) *
          3,
        bonus: 0,
      };
    },
  },
  OVERSLASH_MAX: {
    key: "OVERSLASH_MAX",
    label: "Overslash (Max Enemies)",
    name: "Overslash (Max Enemies)",
    isMelee: true,
    job: "Imperial Guard",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 1600 + 2500;
      return {
        percent:
          (baseDamage + character.traits.pow * 7) *
          (character.baseLevel / 100) *
          7,
        bonus: 0,
      };
    },
  },
  SHIELD_SHOOTING: {
    key: "SHIELD_SHOOTING",
    label: "Shield Shooting",
    name: "Shield Shooting",
    isMelee: false,
    job: "Imperial Guard",
    formula: (character: Character, monster: Monster) => {
      const baseDamage =
        14900 +
        2500 +
        (character.shield.weight / 10) * (character.shield.refine * 25);
      return {
        percent:
          (baseDamage + character.traits.pow * 7) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  GRAND_JUDGMENT: {
    key: "GRAND_JUDGMENT",
    label: "Grand Judgment",
    name: "Grand Judgment",
    isMelee: false,
    job: "Imperial Guard",
    formula: (character: Character, monster: Monster) => {
      const baseDamage =
        15250 + (["plant", "insect"].includes(monster.race) ? 1600 : 0);
      return {
        percent:
          (baseDamage + character.traits.pow * 10) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
};

const whiteSmithSkills: Record<string, Skill> = {
  ARM_CANNON: {
    key: "ARM_CANNON",
    label: "Arm Cannon",
    name: "Arm Cannon",
    isMelee: false,
    job: "Meister",
    hardAsSoftDef: true,
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2150 + getWhitesmithATKBonus(character, buffs);
      return {
        percent:
          (baseDamage) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  AXE_TORNADO: {
    key: "AXE_TORNADO",
    label: "Axe Tornado",
    name: "Axe Tornado",
    isMelee: true,
    job: "Meister",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1100 + getWhitesmithATKBonus(character, buffs);
      return {
        percent:
          (baseDamage + character.stats.vit) * (buffs.axeStomp?.active ? 1.4 : 1) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  POWER_SWING: {
    key: "POWER_SWING",
    label: "Power Swing",
    name: "Power Swing",
    isMelee: true,
    job: "Meister",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1300 + getWhitesmithATKBonus(character, buffs);
      return {
        percent:
          (baseDamage + character.stats.dex) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  AXE_STOMP: {
    key: "AXE_STOMP",
    label: "Axe Stomp (Per Hit)",
    name: "Axe Stomp",
    isMelee: true,
    job: "Meister",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 5150 + getWhitesmithATKBonus(character, buffs);
      return {
        percent:
          (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  MIGHTY_SMASH: {
    key: "MIGHTY_SMASH",
    label: "Mighty Smash",
    name: "Mighty Smash",
    isMelee: true,
    job: "Meister",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1825 + (buffs.axeStomp?.active ? 25 : 0) + getWhitesmithATKBonus(character, buffs);
      return {
        percent:
          (baseDamage + character.traits.pow * 10) *
          (character.baseLevel / 100) *
          (buffs.axeStomp?.active ? 7 : 5),
        bonus: 0,
      };
    },
  },
  SPARK_BLASTER: {
    key: "SPARK_BLASTER",
    label: "Spark Blaster",
    name: "Spark Blaster",
    isMelee: false,
    job: "Meister",
    hardAsSoftDef: true,
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 9250 + getWhitesmithATKBonus(character, buffs);
      return {
        percent:
          (baseDamage + character.traits.pow * 10) * (character.baseLevel / 100) * 2,
        bonus: 0,
      };
    },
  },
  TRIPLE_LASER: {
    key: "TRIPLE_LASER",
    label: "Triple Laser",
    name: "Triple Laser",
    isMelee: false,
    job: "Meister",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 5050 + getWhitesmithATKBonus(character, buffs);
      return {
        percent:
          (baseDamage + character.traits.pow * 12) * (character.baseLevel / 100) * 3,
        bonus: 0,
      };
    },
  },
  RUSH_QUAKE: {
    key: "RUSH_QUAKE",
    label: "Rush Quake",
    name: "Rush Quake",
    isMelee: true,
    job: "Meister",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 36000 + (['formless', 'insect'].includes(monster.race) ? 1500 : 0) + getWhitesmithATKBonus(character, buffs);
      return {
        percent:
          (baseDamage + character.traits.pow * 10) * (character.baseLevel / 100),
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
  ACIFIED_ZONE: {
    key: "ACIFIED_ZONE",
    label: "Acified Zone",
    name: "Acified Zone",
    isMelee: false,
    job: "Biolo",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2000;
      return {
        percent:
          (baseDamage + 5 * character.traits.pow) * (character.baseLevel / 100) *
          (1 + (buffs.researchReport?.active ? 0.7 : 0) + (buffs.researchReport?.active && ['formless', 'plant'].includes(monster.race) ? 0.3 : 0)) *
          7,
        bonus: 0,
      };
    },
  },
  MAYHEMIC_THORNS: {
    key: "MAYHEMIC_THORNS",
    label: "Mayhemic Thorns",
    name: "Mayhemic Thorns",
    isMelee: false,
    job: "Biolo",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3200 + (buffs.researchReport?.active ? 150 : 0);
      return {
        percent:
          (baseDamage + character.traits.pow * 10) * 
          (character.baseLevel / 100) * 
          (buffs.researchReport?.active ? 4 : 3),
        bonus: 0,
      };
    },
  },
  EXPLOSIVE_POWDER: {
    key: "EXPLOSIVE_POWDER",
    label: "Explosive Powser",
    name: "Explosive Powser",
    isMelee: true,
    job: "Biolo",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3150 + (buffs.researchReport?.active ? 500 : 0);
      return {
        percent:
          (baseDamage + character.traits.pow * 10) * 
          (character.baseLevel / 100) * 
          (buffs.researchReport?.active ? 5 : 3),
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
    },
  },
  COUNTER_SLASH: {
    key: "COUNTER_SLASH",
    label: "Counter Slash",
    name: "Counter Slash",
    isMelee: true,
    job: "Shadow Cross",
    hardAsSoftDef: true,
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 1800;
      return {
        percent:
          baseDamage * (character.baseLevel / 120) +
          character.stats.agi * 2 +
          70 * 4,
        bonus: 0,
      };
    },
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
        percent:
          (baseDamage + character.stats.str + character.stats.int) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  SAVAGE_IMPACT: {
    key: "SAVAGE_IMPACT",
    label: "Savage Impact",
    name: "Savage Impact",
    isMelee: true,
    job: "Shadow Cross",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 900;
      return {
        percent:
          (baseDamage + (buffs.shadowExceed?.active ? 200 + character.traits.pow * 5 : 0) + character.traits.pow * 5) *
          (character.baseLevel / 100) *
          (buffs.cloaking?.active ? 5 : 3),
        bonus: 0,
      };
    },
  },
  IMPACT_CRATER: {
    key: "IMPACT_CRATER",
    label: "Impact Crater",
    name: "Impact Crater",
    isMelee: true,
    job: "Shadow Cross",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 400;
      return {
        percent:
          (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  IMPACT_CRATER_MAX: {
    key: "IMPACT_CRATER_MAX",
    label: "Impact Crater (Max Hits)",
    name: "Impact Crater (Max Hits)",
    isMelee: true,
    job: "Shadow Cross",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 400;
      return {
        percent:
          (baseDamage + character.traits.pow * 5) *
          (character.baseLevel / 100) *
          10,
        bonus: 0,
      };
    },
  },
  DANCING_KNIVES: {
    key: "DANCING_KNIVES",
    label: "Dancing Knives",
    name: "Dancing Knives",
    isMelee: true,
    job: "Shadow Cross",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 1000;
      return {
        percent:
          (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  ETERNAL_SLASH: {
    key: "ETERNAL_SLASH",
    label: "Eternal Slash",
    name: "Eternal Slash",
    isMelee: true,
    job: "Shadow Cross",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1325;
      return {
        percent:
          (baseDamage +
            (buffs.shadowExceed?.active ? 500 + character.traits.pow * 1 : 0) +
            character.traits.pow * 2) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  ETERNAL_SLASH_MAX: {
    key: "ETERNAL_SLASH_MAX",
    label: "Eternal Slash (Max Hits)",
    name: "Eternal Slash (Max Hits)",
    isMelee: true,
    job: "Shadow Cross",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1325;
      return {
        percent:
          (baseDamage +
            (buffs.shadowExceed?.active ? 500 + character.traits.pow * 1 : 0) +
            character.traits.pow * 2) *
          (character.baseLevel / 100) * 5,
        bonus: 0,
      };
    },
  },
  SHADOW_STAB: {
    key: "SHADOW_STAB",
    label: "Shadow Stab",
    name: "Shadow Stab",
    isMelee: true,
    job: "Shadow Cross",
    hardAsSoftDef: true,
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1750 + (buffs.cloaking?.active ? 250 : 0);
      return {
        percent:
          (baseDamage + character.traits.pow * (buffs.cloaking?.active ? 7 : 5)) *
          (character.baseLevel / 100) *
          (buffs.cloaking?.active ? 3 : 2),
        bonus: 0,
      };
    },
  },
  FATAL_SHADOW_CLAW: {
    key: "FATAL_SHADOW_CLAW",
    label: "Fatal Shadow Claw",
    name: "Fatal Shadow Claw",
    isMelee: true,
    job: "Shadow Cross",
    formula: (character: Character, monster: Monster) => {
      const baseDamage =
        13000 + (["demihuman", "dragon"].includes(monster.race) ? 1500 : 0);
      return {
        percent:
          (baseDamage + character.traits.pow * 10) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
};

const rogueSkills: Record<string, Skill> = {
  FATAL_MENACE: {
    key: "FATAL_MENACE",
    label: "Fatal Menace",
    name: "Fatal Menace",
    isMelee: true,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 1200 + (buffs.abyssDagger?.active ? 330 : 0);
      return {
        percent: (baseDamage + character.stats.agi) * (character.baseLevel / 100) *
         (character.weapon.type === "Dagger" ? 2 : 1),
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
  ABYSS_DAGGER: {
    key: "ABYSS_DAGGER",
    label: "Abyss Dagger",
    name: "Abyss Dagger",
    isMelee: true,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 4600;
      return {
        percent:
          (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100) * 2,
        bonus: 0,
      };
    },
  },
  UNLUCKY_RUSH: {
    key: "UNLUCKY_RUSH",
    label: "Unlucky Rush",
    name: "Unlucky Rush",
    isMelee: true,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2500;
      return {
        percent:
          (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  DEFT_STAB: {
    key: "DEFT_STAB",
    label: "Deft Stab",
    name: "Deft Stab",
    isMelee: true,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3750;
      return {
        percent:
          (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100) * 5,
        bonus: 0,
      };
    },
  },
  CHAIN_REACTION_SHOT: {
    key: "CHAIN_REACTION_SHOT",
    label: "Chain Reaction Shot",
    name: "Chain Reaction Shot",
    isMelee: false,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 4250;
      return {
        percent:
          (baseDamage + character.traits.con * 10) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  CHAIN_REACTION_SHOT_EXPLOSION: {
    key: "CHAIN_REACTION_SHOT_EXPLOSION",
    label: "Chain Reaction Shot (2nd Damage)",
    name: "Chain Reaction Shot (2nd Damage)",
    isMelee: false,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 12350;
      return {
        percent:
          (baseDamage + character.traits.con * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  FRENZY_SHOT: {
    key: "FRENZY_SHOT",
    label: "Frenzy Shot",
    name: "Frenzy Shot",
    isMelee: false,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 6150;
      return {
        percent:
          (baseDamage + character.traits.con * 15) * (character.baseLevel / 100) * 2,
        bonus: 0,
      };
    },
  },
  FRENZY_SHOT_MAX: {
    key: "FRENZY_SHOT_MAX",
    label: "Frenzy Shot (3 Hits)",
    name: "Frenzy Shot (3 Hits)",
    isMelee: false,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 6150;
      return {
        percent:
          (baseDamage + character.traits.con * 15) * (character.baseLevel / 100) * 3,
        bonus: 0,
      };
    },
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
  RHYTHM_SHOOTING: {
    key: "RHYTHM_SHOOTING",
    label: "Rhythm Shooting",
    name: "Rhythm Shooting",
    isMelee: false,
    job: "Troubadour / Trouvere",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 600 + character.traits.con * 5;
      return {
        percent: (baseDamage) * 3 *
         (character.baseLevel / 100) *
         (buffs.mysticSymphony?.active ? 2 : 1) *
         (monster.debuffs.includes('soundBlend') ? 2.1 : 1),
        bonus: 0,
      };
    }
  },
  ROSE_BLOSSOM: {
    key: "ROSE_BLOSSOM",
    label: "Rose Blossom",
    name: "Rose Blossom",
    isMelee: false,
    job: "Troubadour / Trouvere",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 3750 + character.traits.con * 5;
      return {
        percent: baseDamage *
         (character.baseLevel / 100) *
         (buffs.mysticSymphony?.active ? 2 : 1) *
         (monster.debuffs.includes('soundBlend') ? 1.3 : 1),
        bonus: 0,
      };
    }
  },
  ROSE_BLOSSOM_EXPLOSION: {
    key: "ROSE_BLOSSOM_EXPLOSION",
    label: "Rose Blossom (Explosion)",
    name: "Rose Blossom (Explosion)",
    isMelee: false,
    job: "Troubadour / Trouvere",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 1750 + character.traits.con * 5;
      return {
        percent: baseDamage *
         (character.baseLevel / 100) *
         (buffs.mysticSymphony?.active ? 2 : 1) *
         (monster.debuffs.includes('soundBlend') ? 1.80 : 1),
        bonus: 0,
      };
    }
  },
}

const priestSkills: Record<string, Skill> = {
  PETITIO: {
    key: "PETITIO",
    label: "Petitio (Mace)",
    name: "Petitio (Mace)",
    isMelee: false,
    job: "Cardinal",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2700 + character.traits.pow * 5;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  PETITIO_BOOK: {
    key: "PETITIO_BOOK",
    label: "Petitio (Book)",
    name: "Petitio (Book)",
    isMelee: true,
    job: "Cardinal",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2700 + character.traits.pow * 5;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  EFFLIGO: {
    key: "EFFLIGO",
    label: "Effligo",
    name: "Effligo",
    isMelee: true,
    job: "Cardinal",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 8000 + (['demon', 'undead'].includes(monster.race) ? 4000 : 0);
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
};

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
  TIGER_CANNON: {
    key: "TIGER_CANNON",
    label: "Tiger Cannon",
    name: "Tiger Cannon",
    isMelee: true,
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = (0.3 * getHP(character) + 0.15 * getSP(character)) / 4;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 5000 + monster.baseLevel * 10,
      };
    },
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
  GATES_OF_HELL: {
    key: "GATES_OF_HELL",
    label: "Gates of Hell",
    name: "Gate of Hell",
    isMelee: false,
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 5000;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus:
          getHP(character) -
          character.hp.current +
          Math.max(character.sp.current - 100, character.sp.current) * 3 +
          character.baseLevel * 10,
      };
    },
  },
  GATES_OF_HELL_COMBO: {
    key: "GATES_OF_HELL_COMBO",
    label: "Gates of Hell (Combo)",
    name: "Gate of Hell",
    isMelee: false,
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 8000;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: (getHP(character) - character.hp.current) + (getSP(character) * 3) + (character.baseLevel * 40),
      };
    },
  },
  EXPLOSION_BLASTER: {
    key: "EXPLOSION_BLASTER",
    label: "Explosion Blaster",
    name: "Explosion Blaster",
    isMelee: false,
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3250 + (monster.debuffs.includes('oleumSanctum') ? 1000 : 0);
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  MASSIVE_FLAME_BLASTER: {
    key: "MASSIVE_FLAME_BLASTER",
    label: "Massive Flame Blaster",
    name: "Massive Flame Blaster",
    isMelee: false,
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 8000 + (['demon', 'brute'].includes(monster.race) ? 3000 : 0);
      return {
        percent: (baseDamage + character.traits.pow * 10) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  FIRST_BRAND: {
    key: "FIRST_BRAND",
    label: "First Brand",
    name: "First Brand",
    isMelee: true,
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2250;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  SECOND_FAITH: {
    key: "SECOND_FAITH",
    label: "Second Faith",
    name: "Second Faith",
    isMelee: true,
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2500;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  THIRD_PUNISH: {
    key: "THIRD_PUNISH",
    label: "Third Punish",
    name: "Third Punish",
    isMelee: true,
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3250;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100) * 2,
        bonus: 0,
      };
    },
  },
  SECOND_JUDGMENT: {
    key: "SECOND_JUDGMENT",
    label: "Second Judgment",
    name: "Second Judgment",
    isMelee: true,
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2500;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  THIRD_CONSECRATION: {
    key: "THIRD_CONSECRATION",
    label: "Third Consecration",
    name: "Third Consecration",
    isMelee: true,
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3350;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100) * 5,
        bonus: 0,
      };
    },
  },
  SECOND_FLAME: {
    key: "SECOND_FLAME",
    label: "Second Flame",
    name: "Second Flame",
    isMelee: true,
    job: "Inquisitor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2750;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
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
        percent: (baseDamage + character.traits.pow * 10) * (character.baseLevel / 100) * 3,
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
        percent: baseDamage * (character.baseLevel / 100) *
         (character.buffs.includes('lightOfTheSun') ? 1.25 : 1),
        bonus: 0,
      };
    },
  },
  NOON_BLAST: {
    key: "NOON_BLAST",
    label: "Noon Blast",
    name: "Noon Blast",
    isMelee: true,
    job: "Sky Emperor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 6000 + 250;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  SUNSET_BLAST: {
    key: "SUNSET_BLAST",
    label: "Sunset Blast",
    name: "Sunset Blast",
    isMelee: true,
    job: "Sky Emperor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2400 + 250;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  MIDNIGHT_KICK: {
    key: "MIDNIGHT_KICK",
    label: "Midnight Kick",
    name: "Midnight Kick",
    isMelee: true,
    job: "Sky Emperor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 7500 + 250;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  DAWN_BREAK: {
    key: "DAWN_BREAK",
    label: "Dawn Break",
    name: "Dawn Break",
    isMelee: true,
    job: "Sky Emperor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3300 + 250;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  TWINKLING_GALAXY: {
    key: "TWINKLING_GALAXY",
    label: "Twinkling Galaxy (Per Star)",
    name: "Twinkling Galaxy (Per Star)",
    isMelee: true,
    job: "Sky Emperor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2200 + 150;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  STAR_BURST: {
    key: "STAR_BURST",
    label: "Star Burst (Per Star)",
    name: "Star Burst (Per Star)",
    isMelee: true,
    job: "Sky Emperor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2500 + 250;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  STAR_CANNON: {
    key: "STAR_CANNON",
    label: "Star Cannon (Per Star)",
    name: "Star Cannon (Per Star)",
    isMelee: true,
    job: "Sky Emperor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2700 + 250;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  ALL_IN_THE_SKY: {
    key: "ALL_IN_THE_SKY",
    label: "All in the Sky",
    name: "All in the Sky",
    isMelee: true,
    job: "Sky Emperor",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 20000;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100) *
         (['demon', 'demihuman'].includes(monster.race) ? 3 : 1),
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
  KUNAI_DISTORTION: {
    key: "KUNAI_DISTORTION",
    label: "Kunai - Distortion",
    name: "Kunai - Distortion",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 4000 + 700;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  KUNAI_ROTATION: {
    key: "KUNAI_ROTATION",
    label: "Kunai - Rotation (Per Wave)",
    name: "Kunai - Rotation (Per Wave)",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3300 + 2500;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  KUNAI_REFRACTION: {
    key: "KUNAI_REFRACTION",
    label: "Kunai - Refraction (Per Hit)",
    name: "Kunai - Refraction (Per Hit)",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3800 + 350;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  KUNAI_NIGHTMARE: {
    key: "KUNAI_NIGHTMARE",
    label: "Kunai - Nightmare",
    name: "Kunai - Nightmare",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 15000;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  HUUMA_SHURIKEN_GRASP: {
    key: "HUUMA_SHURIKEN_GRASP",
    label: "Huuma Shuriken - Grasp",
    name: "Huuma Shuriken - Grasp",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2700 + 500;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  HUUMA_SHURIKEN_CONSTRUCT: {
    key: "HUUMA_SHURIKEN_CONSTRUCT",
    label: "Huuma Shuriken - Construct",
    name: "Huuma Shuriken - Construct",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 4600 + 3000;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  HUUMA_SHURIKEN_CONSTRUCT_EXPLOSION: {
    key: "HUUMA_SHURIKEN_CONSTRUCT_EXPLOSION",
    label: "Huuma Shuriken - Construct (Explosion)",
    name: "Huuma Shuriken - Construct (Explosion)",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 6800 + 3000;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  SHADOW_HUNTING: {
    key: "SHADOW_HUNTING",
    label: "Shadow - Hunting",
    name: "Shadow - Hunting",
    isMelee: true,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 4500 + 500;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  SHADOW_DANCE: {
    key: "SHADOW_DANCE",
    label: "Shadow - Dance",
    name: "Shadow - Dance",
    isMelee: true,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 6500 + 5000;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  SHADOW_FLASH: {
    key: "SHADOW_FLASH",
    label: "Shadow - Flash",
    name: "Shadow - Flash",
    isMelee: true,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 9700 + 10000;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  SHADOW_NIGHTMARE: {
    key: "SHADOW_NIGHTMARE",
    label: "Shadow - Nightmare",
    name: "Shadow - Nightmare",
    isMelee: true,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 15000;
      return {
        percent: (baseDamage + character.traits.pow * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
}

const gunslingerSkills: Record<string, Skill> = {
  ROUND_TRIP: {
    key: "ROUND_TRIP",
    label: "Round Trip",
    name: "Round Trip",
    isMelee: false,
    job: "Night Watch",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2500 + (buffs.heatBarrel?.active ? 200 : 0);
      return {
        percent: (baseDamage) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  FIRE_DANCE: {
    key: "FIRE_DANCE",
    label: "Fire Dance",
    name: "Fire Dance",
    isMelee: false,
    job: "Night Watch",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1200 + 200 + (buffs.heatBarrel?.active ? 200 : 0);
      return {
        percent: (baseDamage) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  WILD_FIRE: {
    key: "WILD_FIRE",
    label: "Wild Fire",
    name: "Wild Fire",
    isMelee: false,
    job: "Night Watch",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const damageFactor: Record<string, number> = {
        'Shotgun': 8000 + (buffs.intensiveAim?.active ? 25000 : 0),
        'Grenade Launcher': 7000 + (buffs.intensiveAim?.active ? 25000 : 0),
        default: 0,
      }
      const baseDamage = damageFactor[character.weapon.type] ? damageFactor[character.weapon.type] : damageFactor.default;

      return {
        percent: (baseDamage + (buffs.heatBarrel?.active ? 180 : 0) + character.traits.con * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  MAGAZINE_FOR_ONE: {
    key: "MAGAZINE_FOR_ONE",
    label: "Magazine for One",
    name: "Magazine for One",
    isMelee: false,
    job: "Night Watch",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const damageFactor: Record<string, number> = {
        'Pistol': 2100 + (buffs.intensiveAim?.active ? 2500 : 0),
        'Gatling Gun': 1700 + (buffs.intensiveAim?.active ? 2500 : 0),
        default: 0,
      }
      const baseDamage = damageFactor[character.weapon.type] ? damageFactor[character.weapon.type] : damageFactor.default;

      const hitFactor: Record<string, number> = {
        'Pistol': 6,
        'Gatling Gun': 10,
        default: 0,
      }
      const hitNumber = hitFactor[character.weapon.type] ? hitFactor[character.weapon.type] : hitFactor.default;

      return {
        percent: (baseDamage + (buffs.heatBarrel?.active ? 200 : 0) + character.traits.con * 5) * (character.baseLevel / 100) * hitNumber,
        bonus: 0,
      };
    }
  },
  SPIRAL_SHOOTING: {
    key: "SPIRAL_SHOOTING",
    label: "Spiral Shooting",
    name: "Spiral Shooting",
    isMelee: false,
    job: "Night Watch",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const damageFactor: Record<string, number> = {
        'Rifle': 4900 + (buffs.intensiveAim?.active ? 7500 : 0),
        'Grenade Launcher': 6000 + (buffs.intensiveAim?.active ? 7500 : 0),
        default: 0,
      }
      const baseDamage = damageFactor[character.weapon.type] ? damageFactor[character.weapon.type] : damageFactor.default;

      const hitFactor: Record<string, number> = {
        'Rifle': 1,
        'Grenade Launcher': 2,
        default: 0,
      }
      const hitNumber = hitFactor[character.weapon.type] ? hitFactor[character.weapon.type] : hitFactor.default;

      return {
        percent: (baseDamage + (buffs.heatBarrel?.active ? 200 : 0) + character.traits.con * 5) * (character.baseLevel / 100) * hitNumber,
        bonus: 0,
      };
    }
  },
  ONLY_ONE_BULLET: {
    key: "ONLY_ONE_BULLET",
    label: "Only One Bullet",
    name: "Only One Bullet",
    isMelee: false,
    job: "Night Watch",
    hardAsSoftDef: true,
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const damageFactor: Record<string, number> = {
        'Pistol': 6500 + (buffs.intensiveAim?.active ? 12500 : 0),
        'Rifle': 4750 + (buffs.intensiveAim?.active ? 12500 : 0),
        default: 0,
      }
      const baseDamage = damageFactor[character.weapon.type] ? damageFactor[character.weapon.type] : damageFactor.default;

      return {
        percent: (baseDamage + (buffs.heatBarrel?.active ? 200 : 0) + character.traits.con * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  THE_VIGILANTE_AT_NIGHT: {
    key: "THE_VIGILANTE_AT_NIGHT",
    label: "The Vigilante at Night",
    name: "The Vigilante at Night",
    isMelee: false,
    job: "Night Watch",
    hardAsSoftDef: true,
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const damageFactor: Record<string, number> = {
        'Shotgun': 4300 + (buffs.intensiveAim?.active ? 10000 : 0),
        'Gatling Gun': 1500 + (buffs.intensiveAim?.active ? 5000 : 0),
        default: 0,
      }
      const baseDamage = damageFactor[character.weapon.type] ? damageFactor[character.weapon.type] : damageFactor.default;

      const hitFactor: Record<string, number> = {
        'Shotgun': 4,
        'Gatling Gun': 7,
        default: 0,
      }
      const hitNumber = hitFactor[character.weapon.type] ? hitFactor[character.weapon.type] : hitFactor.default;

      return {
        percent: (baseDamage + (buffs.heatBarrel?.active ? 200 : 0) + character.traits.con * 5) * (character.baseLevel / 100) * hitNumber,
        bonus: 0,
      };
    }
  },
  BASIC_GRENADE: {
    key: "BASIC_GRENADE",
    label: "Basic Grenade",
    name: "Basic Grenade",
    isMelee: false,
    job: "Night Watch",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 5500 + 400 + (buffs.heatBarrel?.active ? 200 : 0);
      return {
        percent: (baseDamage + character.traits.con * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  HASTY_FIRE: {
    key: "HASTY_FIRE",
    label: "Hasty Fire (Per Hit)",
    name: "Hasty Fire (Per Hit)",
    isMelee: false,
    job: "Night Watch",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 6000 + 100 + (buffs.heatBarrel?.active ? 200 : 0);
      return {
        percent: (baseDamage + character.traits.con * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  GRENADE_DROPPING: {
    key: "GRENADE_DROPPING",
    label: "Grenade Dropping (Per Explosion)",
    name: "Grenade Dropping (Per Explosion)",
    isMelee: false,
    job: "Night Watch",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2750 + 250 + (buffs.heatBarrel?.active ? 200 : 0);
      return {
        percent: (baseDamage + character.traits.con * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  MISSION_BOMBARD: {
    key: "MISSION_BOMBARD",
    label: "Mission Bombard (Initial Damage)",
    name: "Mission Bombard (Initial Damage)",
    isMelee: false,
    job: "Night Watch",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 15000 + 800 + (buffs.heatBarrel?.active ? 200 : 0);
      return {
        percent: (baseDamage + character.traits.con * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    }
  },
  MISSION_BOMBARD_EXPLOSION: {
    key: "MISSION_BOMBARD_EXPLOSION",
    label: "Mission Bombard (Explosion)",
    name: "Mission Bombard (Explosion)",
    isMelee: false,
    job: "Night Watch",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 2800 + 250 + (buffs.heatBarrel?.active ? 200 : 0);
      return {
        percent: (baseDamage + character.traits.con * 5) * (character.baseLevel / 100),
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

const doramSkills: Record<string, Skill> = {
  PICKY_PECK: {
    key: "PICKY_PECK",
    name: "Picky Peck",
    label: "Picky Peck",
    isMelee: false,
    job: "Spirit Handler",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 700;
      return {
        percent: (baseDamage),
        bonus: 0,
      };
    },
  },
  LUNATIC_CARROT_BEAT: {
    key: "LUNATIC_CARROT_BEAT",
    name: "Lunatic Carrot Beat",
    label: "Lunatic Carrot Beat",
    isMelee: false,
    job: "Spirit Handler",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 700;
      return {
        percent:
          (baseDamage + character.stats.str) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  CHULHO_SONIC_CLAW: {
    key: "CHULHO_SONIC_CLAW",
    name: "Chulho Sonic Claw",
    label: "Chulho Sonic Claw",
    isMelee: false,
    job: "Spirit Handler",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3150 + 500;
      return {
        percent:
          (baseDamage + character.traits.pow * 5) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  HOWLING_OF_CHULHO: {
    key: "HOWLING_OF_CHULHO",
    name: "Howling of Chulho",
    label: "Howling of Chulho",
    isMelee: false,
    job: "Spirit Handler",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 7250 + 500;
      return {
        percent:
          (baseDamage + character.traits.pow * 5) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  HOGOGONG_STRIKE: {
    key: "HOGOGONG_STRIKE",
    name: "Hogogong Strike",
    label: "Hogogong Strike",
    isMelee: false,
    job: "Spirit Handler",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1500 + 200;
      return {
        percent:
          (baseDamage + character.traits.pow * 5) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
}

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
  ...priestSkills,
  ...monkSkills,
  ...starGladiatorSkills,
  ...ninjaSkills,
  ...gunslingerSkills,
  ...noviceSkills,
  ...doramSkills,
};

export function getSkill(name: string) {
  return SKILLS[name] ?? SKILLS["BASIC_ATTACK"];
}
