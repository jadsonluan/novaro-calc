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

const crusaderSkills: Record<string, Skill> = {
  RAY_OF_GENESIS: {
    key: "RAY_OF_GENESIS",
    name: "Ray of Genesis",
    label: "Ray of Genesis",
    isMelee: false,
    job: "Imperial Guard",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 3500;
      return {
        percent:
          (baseDamage + character.stats.int) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  CROSS_RAIN: {
    key: "CROSS_RAIN",
    name: "Cross Rain (Per Hit)",
    label: "Cross Rain (Per Hit)",
    isMelee: false,
    job: "Imperial Guard",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3200 + 
      (buffs.holyShield?.active ? 1300 : 0) + // Base Damage with holy shield is higher
      (buffs.holyShield?.active ? 1500 : 1000);// Passive 1500 if holy shield is active, 1000 if not
      return {
        percent:
          (baseDamage + character.traits.spl * 7) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  JUDGMENT_CROSS: {
    key: "JUDGMENT_CROSS",
    name: "Judgment Cross",
    label: "Judgment Cross",
    isMelee: false,
    job: "Imperial Guard",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 19500 + (['plant', 'insect'].includes(monster.race) ? 1500 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 15) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
};

const rogueSkills: Record<string, Skill> = {
  FROM_THE_ABYSS: {
    key: "FROM_THE_ABYSS",
    name: "From The Abyss (Per Sphere)",
    label: "From The Abyss (Per Sphere)",
    isMelee: false,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2600;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  ABYSS_SQUARE: {
    key: "ABYSS_SQUARE",
    name: "Abyss Square",
    label: "Abyss Square",
    isMelee: false,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 2850 + 1000;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  OMEGA_ABYSS_STRIKE: {
    key: "OMEGA_ABYSS_STRIKE",
    name: "Omega Abyss Strike",
    label: "Omega Abyss Strike",
    isMelee: false,
    job: "Abyss Chaser",
    formula: (character: Character, monster: Monster) => {
      const baseDamage = 22000 + (['angel', 'demon'].includes(monster.race) ? 1500 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 10) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
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
      const baseDamage = 1250;
      return {
        percent:
          (baseDamage + character.traits.spl * 4) *
          (character.baseLevel / 100) *
          7,
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
      const baseDamage = 4750;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
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
      const baseDamage = 14000;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
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
      const baseDamage =
        18000 + (["undead", "dragon"].includes(monster.race) ? 3400 : 0);
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
      const baseDamage = 6500;
      return {
        percent:
          (baseDamage + character.traits.spl * 15) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  FLORAL_FLARE_ROAD: {
    key: "FLORAL_FLARE_ROAD",
    name: "Floral Flare Road",
    label: "Floral Flare Road",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3750;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  CRIMSON_ARROW: {
    key: "CRIMSON_ARROW",
    name: "Crimson Arrow",
    label: "Crimson Arrow",
    isMelee: false,
    job: "Archmage",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1750;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
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
      const baseDamage = 3500;
      return {
        percent:
          (baseDamage +
            (buffs.climax?.active ? 1500 : 0) +
            character.traits.spl * 2.5) *
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
      const baseDamage = 6200;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100) *
          (buffs.climax?.active ? 4 : 1),
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
      const baseDamage = 3980;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
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
      const baseDamage = 4900;
      return {
        percent:
          (baseDamage +
            (buffs.climax?.active ? 1900 : 0) +
            character.traits.spl * 5) *
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
      const baseDamage = 6750;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100) *
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
      const baseDamage = 3900;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
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
      const baseDamage = 6000;
      return {
        percent:
          (baseDamage +
            (buffs.climax?.active ? 1500 : 0) +
            character.traits.spl * 5) *
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
      const baseDamage = 14850;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100) *
          (buffs.climax?.active ? 2.5 : 1),
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
      const baseDamage = 3750;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
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
      const baseDamage = 6000;
      return {
        percent:
          (baseDamage +
            (buffs.climax?.active ? 1500 : 0) +
            character.traits.spl * 5) *
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
      const baseDamage = 6200;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100) *
          (buffs.climax?.active ? 3 : 1),
        bonus: 0,
      };
    },
  },
};

const sageSkills: Record<string, Skill> = {
  PSYCHIC_WAVE: {
    key: "PSYCHIC_WAVE",
    name: "Psychic Wave (Per Wave)",
    label: "Psychic Wave (Per Wave)",
    isMelee: false,
    job: "Elemental Master",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 350 + character.stats.int * 3;
      return {
        percent:
          (baseDamage) * (character.baseLevel / 100) *
          (['Rod', 'Book'].includes(character.weapon.type) ? 2 : 1),
        bonus: 0,
      };
    },
  },
  DIAMOND_DUST: {
    key: "DIAMOND_DUST",
    name: "Diamond Dust",
    label: "Diamond Dust",
    isMelee: false,
    job: "Elemental Master",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = (character.stats.int * 2 + 300 * 5 + character.stats.int * 5);
      return {
        percent:
          (baseDamage) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  EARTH_GRAVE: {
    key: "EARTH_GRAVE",
    name: "Earth Grave",
    label: "Earth Grave",
    isMelee: false,
    job: "Elemental Master",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = (character.stats.int * 2 + 300 * 5 + character.stats.int * 5);
      return {
        percent:
          (baseDamage) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  VARETYR_SPEAR: {
    key: "VARETYR_SPEAR",
    name: "Varetyr Spear",
    label: "Varetyr Spear",
    isMelee: false,
    job: "Elemental Master",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = (character.stats.int * 10 + 150 * 10);
      return {
        percent:
          (baseDamage) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  POISON_BURST: {
    key: "POISON_BURST",
    name: "Poison Burst",
    label: "Poison Burst",
    isMelee: false,
    job: "Elemental Master",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = character.stats.int + 2500 + (monster.debuffs.includes('cloudPoison') ? 1000 : 0);
      return {
        percent:
          (baseDamage) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  DIAMOND_STORM: {
    key: "DIAMOND_STORM",
    name: "Diamond Storm",
    label: "Diamond Storm",
    isMelee: false,
    job: "Elemental Master",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 8150 + (buffs.elementalSummon?.active ? 6250 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  CONFLAGRATION: {
    key: "CONFLAGRATION",
    name: "Conflagration",
    label: "Conflagration",
    isMelee: false,
    job: "Elemental Master",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3750 + (buffs.elementalSummon?.active ? 2000 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  LIGHTNING_LAND: {
    key: "LIGHTNING_LAND",
    name: "Lightning Land",
    label: "Lightning Land",
    isMelee: false,
    job: "Elemental Master",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3750 + (buffs.elementalSummon?.active ? 2000 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  TERRA_DRIVE: {
    key: "TERRA_DRIVE",
    name: "Terra Drive",
    label: "Terra Drive",
    isMelee: false,
    job: "Elemental Master",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 8150 + (buffs.elementalSummon?.active ? 6250 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  VENON_SWAMP: {
    key: "VENON_SWAMP",
    name: "Venon Swamp",
    label: "Venon Swamp",
    isMelee: false,
    job: "Elemental Master",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3750 + (buffs.elementalSummon?.active ? 2000 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  ELEMENTAL_BUSTER: {
    key: "ELEMENTAL_BUSTER",
    name: "Elemental Buster",
    label: "Elemental Buster",
    isMelee: false,
    job: "Elemental Master",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 22500 + (["dragon", "formless"].includes(monster.race) ? 1500 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 10) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
}

const archerSkills: Record<string, Skill> = {
  REVERBERATION: {
    key: "REVERBERATION",
    label: "Reverberation",
    name: "Reverberation",
    isMelee: false,
    job: "Troubadour / Trouvere",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 2200;
      return {
        percent: (baseDamage) * (character.baseLevel / 100) *
        (monster.debuffs.includes('soundBlend') ? 1.3 : 1),
        bonus: 0,
      };
    }
  },
  METALLIC_SOUND: {
    key: "METALLIC_SOUND",
    label: "Metallic Sound",
    name: "Metallic Sound",
    isMelee: false,
    job: "Troubadour / Trouvere",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 1800 * 2;
      return {
        percent: (baseDamage) * (character.baseLevel / 100) *
         (monster.debuffs.includes('soundBlend') ? 1.7 : 1),
        bonus: 0,
      };
    }
  },
  SOUND_BLEND: {
    key: "SOUND_BLEND",
    label: "Sound Blend",
    name: "Sound Blend",
    isMelee: false,
    job: "Troubadour / Trouvere",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 600 + character.traits.spl * 5;
      return {
        percent: (baseDamage) *
         (character.baseLevel / 100) *
         (buffs.mysticSymphony?.active ? 1.4 : 1),
        bonus: 0,
      };
    }
  },
  METALLIC_FURY: {
    key: "METALLIC_FURY",
    label: "Metallic Fury (per hit)",
    name: "Metallic Fury (per hit)",
    isMelee: false,
    job: "Troubadour / Trouvere",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      let baseDamage = 13000 + 
      (monster.debuffs.includes('soundBlend') ? 5000 : 0) + 
      (monster.debuffs.includes('soundBlend') ? character.traits.spl * 10 : character.traits.spl * 5);
      return {
        percent: baseDamage *
         (character.baseLevel / 100),
        bonus: 0,
      };
    }
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
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  FRAMEN: {
    key: "FRAMEN",
    name: "Framen",
    label: "Framen",
    isMelee: false,
    job: "Cardinal",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 4500 + 250 + (['demon', 'undead'].includes(monster.race) ? 500 : 0);
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  ARBITRIUM: {
    key: "ARBITRIUM",
    name: "Arbitrium",
    label: "Arbitrium",
    isMelee: false,
    job: "Cardinal",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 10000 + 1000;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  ARBITRIUM_2ND: {
    key: "ARBITRIUM_2ND",
    name: "Arbitrium (2nd hit)",
    label: "Arbitrium (2nd hit)",
    isMelee: false,
    job: "Cardinal",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 17500 + 5000;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  PNEUMATICUS_PROCELLA: {
    key: "PNEUMATICUS_PROCELLA",
    name: "Pneumaticus Procella (per wave)",
    label: "Pneumaticus Procella (per wave)",
    isMelee: false,
    job: "Cardinal",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 21180 + (['demon', 'undead'].includes(monster.race) ? 1570 : 0);
      return {
        percent: (baseDamage + character.traits.spl * 10) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
};

const ninjaSkills: Record<string, Skill> = {
  FLAMING_PETALS: {
    key: "FLAMING_PETALS",
    name: "Crimson Fire Petal",
    label: "Flaming Petals",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 90 + (buffs.fireCharm?.active ? 200 : 0);
      return {
        percent: (baseDamage) * 10,
        bonus: 0,
      };
    },
  },
  FREEZING_SPEAR: {
    key: "FREEZING_SPEAR",
    name: "Spear of Ice",
    label: "Freezing Spear",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 70 + (buffs.iceCharm?.active ? 200 : 0) + (monster.debuffs.includes('wateryEvasion') ? 20 : 0);
      return {
        percent: (baseDamage) * 12,
        bonus: 0,
      };
    },
  },
  WIND_BLADE: {
    key: "WIND_BLADE",
    name: "Wind Blade",
    label: "Wind Blade",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 150 + (buffs.windCharm?.active ? 200 : 0);
      return {
        percent: (baseDamage) * 6,
        bonus: 0,
      };
    },
  },
  RED_FLAME_CANNON: {
    key: "RED_FLAME_CANNON",
    name: "Red Flame Cannon",
    label: "Red Flame Cannon",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 10500 + 7000;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  COLD_BLOODED_CANNON: {
    key: "COLD_BLOODED_CANNON",
    name: "Cold Blooded Cannon",
    label: "Cold Blooded Cannon",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 8850 + 4000;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  THUNDERING_CANNON: {
    key: "THUNDERING_CANNON",
    name: "Thundering Cannon",
    label: "Thundering Cannon",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 10000 + 7000;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  GOLDEN_DRAGON_CANNON: {
    key: "GOLDEN_DRAGON_CANNON",
    name: "Golden Dragon Cannon",
    label: "Golden Dragon Cannon",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 9950 + 1500;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  DARKENING_DRAGON: {
    key: "DARKENING_DRAGON",
    name: "Darkening Dragon",
    label: "Darkening Dragon",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 9950;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  DARK_DRAGON_NIGHTMARE: {
    key: "DARK_DRAGON_NIGHTMARE",
    name: "Dark Dragon - Nightmare",
    label: "Dark Dragon - Nightmare",
    isMelee: false,
    job: "Shinkiro / Shiranui",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 15500;
      return {
        percent: (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
};

const soulLinkerSkills: Record<string, Skill> = {
  ESPA: {
    key: "ESPA",
    name: "Espa",
    label: "Espa",
    isMelee: false,
    job: "Soul Ascetic",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3000;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  EXORCISM_OF_MALICIOUS_SOUL: {
    key: "EXORCISM_OF_MALICIOUS_SOUL",
    name: "Exorcism of Malicious Soul",
    label: "Exorcism of Malicious Soul",
    isMelee: false,
    job: "Soul Ascetic",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage =
        ((monster.debuffs.includes("soulCurse") ? 1250 : 750) +
          20 + // Soul Mastery lv 10;
          character.traits.spl * 5) *
        20; // Max Souls;
      return {
        percent: baseDamage * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  TALISMAN_OF_BLUE_DRAGON: {
    key: "TALISMAN_OF_BLUE_DRAGON",
    name: "Talisman of Blue Dragon",
    label: "Talisman of Blue Dragon",
    isMelee: false,
    job: "Soul Ascetic",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 9100 + 750 + (buffs.circleOfDirectionsAndElementals?.active ? 2500 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  TALISMAN_OF_WHITE_TIGER: {
    key: "TALISMAN_OF_WHITE_TIGER",
    name: "Talisman of White Tiger",
    label: "Talisman of White Tiger",
    isMelee: false,
    job: "Soul Ascetic",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 5400 + 750 + (buffs.circleOfDirectionsAndElementals?.active ? 2000 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  TALISMAN_OF_RED_PHOENIX: {
    key: "TALISMAN_OF_RED_PHOENIX",
    name: "Talisman of Red Phoenix",
    label: "Talisman of Red Phoenix",
    isMelee: false,
    job: "Soul Ascetic",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 7450 + 750 + (buffs.circleOfDirectionsAndElementals?.active ? 2200 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  TALISMAN_OF_BLACK_TORTOISE: {
    key: "TALISMAN_OF_BLACK_TORTOISE",
    name: "Talisman of Black Tortoise",
    label: "Talisman of Black Tortoise",
    isMelee: false,
    job: "Soul Ascetic",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 10150 + 750 + (buffs.circleOfDirectionsAndElementals?.active ? 2650 : 0);
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  TALISMAN_OF_FOUR_BEARING_GOD: {
    key: "TALISMAN_OF_FOUR_BEARING_GOD",
    name: "Talisman of Four Bearing God",
    label: "Talisman of Four Bearing God",
    isMelee: false,
    job: "Soul Ascetic",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 1300 + 750;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) * (character.baseLevel / 100) *
          (buffs.circleOfDirectionsAndElementals?.active ? 7 : 1),
        bonus: 0,
      };
    },
  },
  CIRCLE_OF_DIRECTIONS_AND_ELEMENTALS: {
    key: "CIRCLE_OF_DIRECTIONS_AND_ELEMENTALS",
    name: "Circle of Directions and Elementals",
    label: "Circle of Directions and Elementals",
    isMelee: false,
    job: "Soul Ascetic",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 10500;
      return {
        percent:
          (baseDamage + character.traits.spl * 10) *
          (character.baseLevel / 100) *
          5, // Hits
        bonus: 0,
      };
    },
  },
};

const noviceSkills: Record<string, Skill> = {
  METEOR_STORM_BUSTER: {
    key: "METEOR_STORM_BUSTER",
    name: "Meteor Storm Buster (fall)",
    label: "Meteor Storm Buster (fall)",
    isMelee: false,
    job: "Hyper Novice",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 3500 + 500;
      return {
        percent:
          (baseDamage + 5 * character.traits.spl) *
          (character.baseLevel / 100) *
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
      const baseDamage = 2050 + 500;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100) *
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
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100) *
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
      const baseDamage = 5400 + 300;
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
      const baseDamage = 8500 + 400;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100) *
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
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100) *
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
      const baseDamage = 7800 + 200;
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
      const baseDamage = 6850 + 400;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100) *
          (buffs.ruleBreak?.active ? 1.4 : 1),
        bonus: 0,
      };
    },
  },
};

const doramSkills: Record<string, Skill> = {
  SILVERVINE_STEM_SPEAR: {
    key: "SILVERVINE_STEM_SPEAR",
    name: "Silvervine Stem Spear",
    label: "Silvervine Stem Spear",
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
  CATNIP_METEOR: {
    key: "CATNIP_METEOR",
    name: "Catnip Meteor (Per Meteor)",
    label: "Catnip Meteor (Per Meteor)",
    isMelee: false,
    job: "Spirit Handler",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 700;
      return {
        percent:
          (baseDamage + character.stats.int) *
          (buffs.colorsOfHyunrok?.active ? 1.5 : 1) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  HYUNROK_BREEZE: {
    key: "HYUNROK_BREEZE",
    name: "Hyunrok Breeze",
    label: "Hyunrok Breeze",
    isMelee: false,
    job: "Spirit Handler",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 7400 + 400;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
  HYUNROK_CANNON: {
    key: "HYUNROK_CANNON",
    name: "Hyunrok Cannon",
    label: "Hyunrok Cannon",
    isMelee: false,
    job: "Spirit Handler",
    formula: (character: Character, monster: Monster, buffs: Buffs) => {
      const baseDamage = 14000 + 750;
      return {
        percent:
          (baseDamage + character.traits.spl * 5) *
          (character.baseLevel / 100),
        bonus: 0,
      };
    },
  },
};

export const MATK_SKILLS: Record<string, Skill> = {
  ...allSkills,
  ...crusaderSkills,
  ...rogueSkills,
  ...wizardSkills,
  ...sageSkills,
  ...archerSkills,
  ...priestSkills,
  ...ninjaSkills,
  ...soulLinkerSkills,
  ...noviceSkills,
  ...doramSkills,
};

export function getSkill(name: string) {
  return MATK_SKILLS[name] ?? MATK_SKILLS["BASIC_ATTACK"];
}
