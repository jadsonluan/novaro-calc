import { deepCopy, getTraitBonuses } from "../utils/helperFunctions";
import { Character } from "./character";
import { ELEMENTS } from "./element";
import { Monster } from "./monster";

export interface Buff {
  active: boolean;
  tooltip: string;
  job: string;
}

export interface Buffs {
  // All
  blueHerbActivator?: Buff;
  redHerbActivator?: Buff;
  // Swordsman
  magnumBreak?: Buff;
  concentration?: Buff;
  asirRune?: Buff;
  turisusRune?: Buff;
  luxAnimaRune?: Buff;
  shieldSpell?: Buff;
  inspiration?: Buff;
  // Thief
  enchantDeadlyPoison?: Buff;
  pyrexia?: Buff;
  // Merchant
  loudExclamation?: Buff;
  cartBoost?: Buff;
  pyroclastic?: Buff;
  tempering?: Buff;
  // Mage
  magicAmplification?: Buff;
  recognizedSpell?: Buff;
  climax?: Buff;
  striking?: Buff;
  spellEnchanting?: Buff;
  // Archer
  trueSight?: Buff;
  fearBreeze?: Buff;
  unlimit?: Buff;
  calamityGale?: Buff;
  marchOfProntera?: Buff;
  serenadeOfJawaii?: Buff;
  mysticSymphony?: Buff;
  // Acolyte
  allSpheres?: Buff;
  odinsBlessing?: Buff;
  benedictum?: Buff;
  religio?: Buff;
  presensAcies?: Buff;
  competentia?: Buff;
  // Ninja
  shadowWarrior?: Buff;
  earthCharm?: Buff;
  // Gunslinger
  platinumAlter?: Buff;
  heatBarrel?: Buff;
  intensiveAim?: Buff;
  hiddenCard?: Buff;
  // Taekwon
  opposition?: Buff;
  miracle?: Buff;
  lightOfTheSun?: Buff;
  fairySoul?: Buff;
  falconSoul?: Buff;
  talismanOfWarrior?: Buff;
  talismanOfMagician?: Buff;
  talismanOfFiveElements?: Buff;
  soulOfHeavenAndEarth?: Buff;
  circleOfDirectionsAndElementals?: Buff;
  // Novice
  ruleBreak?: Buff;
  breakingLimit?: Buff;
  // Doram
  bunchOfShrimp?: Buff;
  chattering?: Buff;
  marineFestivalofKisul?: Buff;
  sandFestivalofKisul?: Buff;
  temporaryCommunion?: Buff;
  blessingOfMysticalCreatures?: Buff;
}

export const emptyATKBuffs: Buffs = {
  // All
  redHerbActivator: {
    active: false,
    tooltip: "+15% melee/ranged damage",
    job: "All",
  },
  // Swordsman
  magnumBreak: {
    active: false,
    tooltip: "+20% fire property weaponATK",
    job: "Swordsman",
  },
  concentration: {
    active: false,
    tooltip: "+15% weaponATK and equipATK",
    job: "Swordsman",
  },
  asirRune: {
    active: false,
    tooltip: "Pseudo Buff ATK +70",
    job: "Swordsman",
  },
  turisusRune: {
    active: false,
    tooltip: "STR +30 and +15% Melee % Bonus",
    job: "Swordsman",
  },
  luxAnimaRune: {
    active: false,
    tooltip: "+30% for the following modifiers: HP & SP, Melee, Ranged, Critical and Size",
    job: "Swordsman",
  },
  shieldSpell: {
    active: false,
    tooltip: "Pseudo Buff ATK +150",
    job: "Swordsman",
  },
  inspiration: {
    active: false,
    tooltip: "Pseudo Buff ATK +200, all stats +30 and +20% HP",
    job: "Swordsman",
  },
  // Thief
  enchantDeadlyPoison: {
    active: false,
    tooltip: "WeaponATK x5 and extraATK x4",
    job: "Thief",
  },
  pyrexia: {
    active: false,
    tooltip: "+5% Melee % Bonus and +15% Critical % Bonus",
    job: "Thief",
  },
  // Merchant
  loudExclamation: {
    active: false,
    tooltip: "STR +4 and Pseudo Buff ATK +30",
    job: "Merchant",
  },
  cartBoost: {
    active: false,
    tooltip: "Mastery ATK +50",
    job: "Merchant",
  },
  pyroclastic: {
    active: false,
    tooltip: "Pseudo Buff ATK +450",
    job: "Merchant",
  },
  tempering: {
    active: false,
    tooltip: "P.atk +15",
    job: "Merchant",
  },
  // Mage
  striking: {
    active: false,
    tooltip: "Pseudo Buff ATK +100",
    job: "Mage",
  },
  // Archer
  trueSight: {
    active: false,
    tooltip: "All stats +5 and 20% added to archer's skills base damage",
    job: "Archer",
  },
  fearBreeze: {
    active: false,
    tooltip: "Increases Aimed Bolt and Arrow Storm damage",
    job: "Archer",
  },
  unlimit: {
    active: false,
    tooltip: "Final Damage +250%",
    job: "Archer",
  },
  calamityGale: {
    active: false,
    tooltip: "Unlimit effect, increases Crescive Bolt damage and increases damage against Brute and Fish monsters",
    job: "Archer",
  },
  marchOfProntera: {
    active: false,
    tooltip: "P.Atk +15",
    job: "Archer",
  },
  mysticSymphony: {
    active: false,
    tooltip: "Increases damage of Rhythm Shooting, Rose Blossom and Sound Blend. Increases damage against Fish and Demi-Human races",
    job: "Archer",
  },
  // Acolyte
  allSpheres: {
    active: false,
    tooltip: "Mastery ATK +3 * spheres = +45",
    job: "Acolyte",
  },
  odinsBlessing: {
    active: false,
    tooltip: "Pseudo Buff ATK +100",
    job: "Acolyte",
  },
  benedictum: {
    active: false,
    tooltip: "POW / CON / CRT +10",
    job: "Acolyte",
  },
  presensAcies: {
    active: false,
    tooltip: "C.Rate +10",
    job: "Acolyte",
  },
  competentia: {
    active: false,
    tooltip: "P.Atk and S.Matk +50",
    job: "Acolyte",
  },
  // Ninja
  shadowWarrior: {
    active: false,
    tooltip: "Increases Cross Slash damage",
    job: "Ninja",
  },
  earthCharm: {
    active: false,
    tooltip: "WeaponATK +15% per charm = +150% and increases Elemental % Bonus +30% against Wind monsters",
    job: "Ninja",
  },
  // Gunslinger
  platinumAlter: {
    active: false,
    tooltip: "Increases Mastery ATK +100 if have 10 coins",
    job: "Gunslinger",
  },
  heatBarrel: {
    active: false,
    tooltip: "160% (10 coins) damage add to Night Watch skills base damage",
    job: "Gunslinger",
  },
  intensiveAim: {
    active: false,
    tooltip: "Pseudo Buff ATK +150, acts like you have 10 aiming stacks for Night Watch skills",
    job: "Gunslinger",
  },
  hiddenCard: {
    active: false,
    tooltip: "Ranged % Bonus +100, P.Atk +30",
    job: "Gunslinger",
  },
  // Taekwon
  opposition: {
    active: false,
    tooltip: "Increase ATK based on [Base Level + DEX + LUK (+ STR if Large)] / 3",
    job: "Taekwon",
  },
  miracle: {
    active: false,
    tooltip: "Increase ATK based on [Base Level + DEX + LUK + STR] / 3 (Overrides Opposition)",
    job: "Taekwon",
  },
  lightOfTheSun: {
    active: false,
    tooltip: "Solar Burst damage +25%",
    job: "Taekwon",
  },
  falconSoul: {
    active: false,
    tooltip: "Pseudo Buff ATK +50",
    job: "Taekwon",
  },
  talismanOfWarrior: {
    active: false,
    tooltip: "P.Atk +10",
    job: "Taekwon",
  },
  talismanOfFiveElements: {
    active: false,
    tooltip: "Increase damage against Neutral, Water, Earth, Fire and Wind property monsters by 20%",
    job: "Taekwon",
  },
  soulOfHeavenAndEarth: {
    active: false,
    tooltip: "Increases Melee, Ranged and All Elemement Magical by 25%",
    job: "Taekwon",
  },
  // Novice
  breakingLimit: {
    active: false,
    tooltip: "Increase Hyper Novice physical skills damage",
    job: "Novice",
  },
  // Doram
  bunchOfShrimp: {
    active: false,
    tooltip: "ATK/MATK +10%",
    job: "Doram",
  },
  chattering: {
    active: false,
    tooltip: "Pseudo Buff ATK +100",
    job: "Doram",
  },
  marineFestivalofKisul: {
    active: false,
    tooltip: "POW / CON / CRT +10",
    job: "Doram",
  },
  temporaryCommunion: {
    active: false,
    tooltip: "P.Atk, S.Matk and H.Plus +15",
    job: "Doram",
  },
  blessingOfMysticalCreatures: {
    active: false,
    tooltip: "P.Atk and S.Matk + 50",
    job: "Doram",
  },
};

export const emptyMATKBuffs: Buffs = {
  // All
  blueHerbActivator: {
    active: false,
    tooltip: "+15% all element magic damage",
    job: "All",
  },
  // Swordsman
  // Thief
  // Merchant
  // Mage
  magicAmplification: {
    active: false,
    tooltip: "MATK +50%",
    job: "Mage",
  },
  recognizedSpell: {
    active: false,
    tooltip: "Removes weapon MATK variance (overupgrade MATK variance still applies)",
    job: "Mage",
  },
  climax: {
    active: false,
    tooltip: "Climax buff, acts as level 3 Climax for affected skills",
    job: "Mage",
  },
  spellEnchanting: {
    active: false,
    tooltip: "S.Matk +20",
    job: "Mage",
  },
  // Archer
  serenadeOfJawaii: {
    active: false,
    tooltip: "S.Matk +15",
    job: "Archer",
  },
  mysticSymphony: {
    active: false,
    tooltip: "Increases damage of Rhythm Shooting, Rose Blossom and Sound Blend. Increases damage against Fish and Demi-Human races",
    job: "Archer",
  },
  // Acolyte
  odinsBlessing: {
    active: false,
    tooltip: "Buff MATK +100",
    job: "Acolyte",
  },
  benedictum: {
    active: false,
    tooltip: "POW / CON / CRT +10",
    job: "Acolyte",
  },
  religio: {
    active: false,
    tooltip: "SPL / STA / WIS +10",
    job: "Acolyte",
  },
  competentia: {
    active: false,
    tooltip: "P.Atk and S.Matk +50",
    job: "Acolyte",
  },
  // Ninja
  // Taekwon
  fairySoul: {
    active: false,
    tooltip: "Pseudo Buff MATK +50",
    job: "Taekwon",
  },
  talismanOfMagician: {
    active: false,
    tooltip: "S.Matk +10",
    job: "Taekwon",
  },
  talismanOfFiveElements: {
    active: false,
    tooltip: "Increase damage against Neutral, Water, Earth, Fire and Wind property monsters by 20%",
    job: "Taekwon",
  },
  soulOfHeavenAndEarth: {
    active: false,
    tooltip: "Increases Melee, Ranged and All Elemement Magical by 25%",
    job: "Taekwon",
  },
  circleOfDirectionsAndElementals: {
    active: false,
    tooltip: "S.Matk +25 and activates 'Blessing of the Four Directions and Five Elementals'",
    job: "Taekwon",
  },
  // Novice
  ruleBreak: {
    active: false,
    tooltip: "Increase Hyper Novice magic skills damage",
    job: "Novice",
  },
  // Doram
  bunchOfShrimp: {
    active: false,
    tooltip: "ATK/MATK +10%",
    job: "Doram",
  },
  chattering: {
    active: false,
    tooltip: "Buff MATK +100",
    job: "Doram",
  },
  sandFestivalofKisul: {
    active: false,
    tooltip: "SPL / STA / WIS +10",
    job: "Doram",
  },
  temporaryCommunion: {
    active: false,
    tooltip: "P.Atk, S.Matk and H.Plus +15",
    job: "Doram",
  },
  blessingOfMysticalCreatures: {
    active: false,
    tooltip: "P.Atk and S.Matk + 50",
    job: "Doram",
  },
};

type BuffEffect = (character: Character, monster: Monster) => Character;

const BUFF_EFFECTS: Record<keyof Buffs, BuffEffect> = {
  // All
  blueHerbActivator: (character: Character) => {
    const {
      modifiers: { skillProperty },
    } = character;
    const MODIFIER_INCREASE = 15;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        skillProperty: skillProperty + MODIFIER_INCREASE,
      },
      buffs: [...character.buffs, "blueHerbActivator"],
    };
  },
  redHerbActivator: (character: Character) => {
    const {
      modifiers: { melee, ranged },
    } = character;
    const MODIFIER_INCREASE = 15;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        melee: melee + MODIFIER_INCREASE,
        ranged: ranged + MODIFIER_INCREASE,
      },
      buffs: [...character.buffs, "redHerbActivator"],
    };
  },
  // Swordsman
  magnumBreak: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "magnumBreak"] };
  },
  concentration: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "concentration"] };
  },
  asirRune: (character: Character) => {
    const {
      ATK: { pseudoBuffATK },
    } = character;
    const ATK_INCREASE = 70;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "asirRune"],
    };
  },
  turisusRune: (character: Character) => {
    const { stats, modifiers } = character;
    const MELEE_INCREASE = 15;
    const STAT_INCREASE = 30;
    return {
      ...character,
      stats: { ...stats, str: stats.str + STAT_INCREASE },
      modifiers: { ...modifiers, melee: modifiers.melee + MELEE_INCREASE },
      buffs: [...character.buffs, "turisusRune"],
    };
  },
  luxAnimaRune: (character: Character) => {
    const { hp, sp, modifiers } = character;
    const PERCENT_INCREASE = 30;
    return {
      ...character,
      hp: { ...hp, percent: hp.percent + PERCENT_INCREASE },
      sp: { ...sp, percent: sp.percent + PERCENT_INCREASE },
      modifiers: {
        ...modifiers,
        size: modifiers.size + PERCENT_INCREASE,
        melee: modifiers.melee + PERCENT_INCREASE,
        ranged: modifiers.ranged + PERCENT_INCREASE,
        critical: modifiers.critical + PERCENT_INCREASE,
      },
      buffs: [...character.buffs, "luxAnima"],
    };
  },
  shieldSpell: (character: Character) => {
    const {
      ATK: { pseudoBuffATK },
    } = character;
    const ATK_INCREASE = 150;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "shieldSpell"],
    };
  },
  inspiration: (character: Character) => {
    const {
      stats,
      hp,
      ATK: { pseudoBuffATK },
    } = character;
    const ATK_INCREASE = 200;
    const STAT_INCREASE = 30;
    const HP_PERCENT_INCREASE = 20;
    return {
      ...character,
      hp: {
        ...hp,
        percent: hp.percent + HP_PERCENT_INCREASE,
      },
      ATK: {
        ...character.ATK,
        pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      },
      stats: {
        str: stats.str + STAT_INCREASE,
        agi: stats.agi + STAT_INCREASE,
        vit: stats.vit + STAT_INCREASE,
        int: stats.int + STAT_INCREASE,
        dex: stats.dex + STAT_INCREASE,
        luk: stats.luk + STAT_INCREASE,
      },
      buffs: [...character.buffs, "inspiration"],
    };
  },
  // Thief
  enchantDeadlyPoison: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "enchantDeadlyPoison"] };
  },
  pyrexia: (character: Character) => {
    const { modifiers } = character;
    const PYREXIA_MELEE_MODIFIER = 5;
    const PYREXIA_CRITICAL_MODIFIER = 15;
    return {
      ...character,
      modifiers: {
        ...modifiers,
        melee: modifiers.melee + PYREXIA_MELEE_MODIFIER,
        critical: modifiers.critical + PYREXIA_CRITICAL_MODIFIER,
      },
      buffs: [...character.buffs, "pyrexia"],
    };
  },
  // Merchant
  loudExclamation: (character: Character) => {
    const {
      ATK: { pseudoBuffATK },
      stats,
    } = character;
    const ATK_INCREASE = 30;
    const STAT_INCREASE = 4;
    return {
      ...character,
      stats: {
        ...stats,
        str: stats.str + STAT_INCREASE,
      },
      ATK: {
        ...character.ATK,
        pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "loudExclamation"],
    };
  },
  cartBoost: (character: Character) => {
    const {
      ATK: { masteryATK },
    } = character;
    const ATK_INCREASE = 30;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        masteryATK: masteryATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "cartBoost"],
    };
  },
  pyroclastic: (character: Character) => {
    const {
      ATK: { pseudoBuffATK },
    } = character;
    const ATK_INCREASE = 450;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "pyroclastic"],
    };
  },
  tempering: (character: Character) => {
    const {
      ATK: { patk },
    } = character;
    const PATK_INCREASE = 15;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        patk: patk + PATK_INCREASE,
      },
      buffs: [...character.buffs, "tempering"],
    };
  },
  // Mage
  magicAmplification: (character: Character) => {
    const {
      modifiers: { finalDmg },
    } = character;
    const MOD_INCREASE = 50;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        finalDmg: finalDmg + MOD_INCREASE,
      },
      buffs: [...character.buffs, "magicAmplification"],
    };
  },
  recognizedSpell: (character: Character) => {
    return {
      ...character,
      buffs: [...character.buffs, "recognizedSpell"],
    };
  },
  climax: (character: Character) => {
    return {
      ...character,
      buffs: [...character.buffs, "climax"],
    };
  },
  striking: (character: Character) => {
    const {
      ATK: { pseudoBuffATK },
    } = character;
    const ATK_INCREASE = 100;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "striking"],
    };
  },
  spellEnchanting: (character: Character) => {
    const {
      MATK: { smatk },
    } = character;
    const MATK_INCREASE = 20;
    return {
      ...character,
      MATK: {
        ...character.MATK,
        smatk: smatk + MATK_INCREASE,
      },
      buffs: [...character.buffs, "spellEnchanting"],
    };
  },
  // Archer
  trueSight: (character: Character) => {
    const { stats } = character;
    const STAT_INCREASE = 5;
    return {
      ...character,
      stats: {
        str: stats.str + STAT_INCREASE,
        agi: stats.agi + STAT_INCREASE,
        vit: stats.vit + STAT_INCREASE,
        int: stats.int + STAT_INCREASE,
        dex: stats.dex + STAT_INCREASE,
        luk: stats.luk + STAT_INCREASE,
      },
      buffs: [...character.buffs, "trueSight"],
    };
  },
  fearBreeze: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "fearBreeze"] };
  },
  unlimit: (character: Character) => {
    const { modifiers } = character;
    const UNLIMIT_INCREASE = 250;
    return {
      ...character,
      modifiers: {
        ...modifiers,
        finalDmg: modifiers.finalDmg + UNLIMIT_INCREASE,
      },
      buffs: [...character.buffs, "unlimit"],
    };
  },
  calamityGale: (character: Character) => {
    const { modifiers } = character;
    const UNLIMIT_INCREASE = 250;
    return {
      ...character,
      modifiers: {
        ...modifiers,
        finalDmg:
          modifiers.finalDmg +
          (!character.buffs.includes("unlimit") ? UNLIMIT_INCREASE : 0),
      },
      buffs: [...character.buffs, "calamityGale"],
    };
  },
  marchOfProntera: (character: Character) => {
    const {
      ATK: { patk },
    } = character;
    const PATK_INCREASE = 15;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        patk: patk + PATK_INCREASE,
      },
      buffs: [...character.buffs, "marchOfProntera"],
    };
  },
  serenadeOfJawaii: (character: Character) => {
    const {
      MATK: { smatk },
    } = character;
    const SMATK_INCREASE = 15;
    return {
      ...character,
      MATK: {
        ...character.MATK,
        smatk: smatk + SMATK_INCREASE,
      },
      buffs: [...character.buffs, "serenadeOfJawaii"],
    };
  },
  mysticSymphony: (character: Character, monster: Monster) => {
    const {
      modifiers: { race },
    } = character;
    const RACE_MODIFIER = 30;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        race:
          race +
          (["fish", "demihuman"].includes(monster.race) ? RACE_MODIFIER : 0),
      },
      buffs: [...character.buffs, "mysticSymphony"],
    };
  },
  // Acolyte
  odinsBlessing: (character: Character) => {
    const {
      ATK: { pseudoBuffATK },
      MATK: { buffMATK },
    } = character;
    const ATK_INCREASE = 100;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      },
      MATK: {
        ...character.MATK,
        buffMATK: buffMATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "odinsBlessing"],
    };
  },
  benedictum: (character: Character) => {
    const {
      traits: { pow, con, crt },
    } = character;
    const TRAIT_INCREASE = 10;
    return {
      ...character,
      traits: {
        ...character.traits,
        pow: pow + TRAIT_INCREASE,
        con: con + TRAIT_INCREASE,
        crt: crt + TRAIT_INCREASE,
      },
      buffs: [...character.buffs, "benedictum"],
    };
  },
  religio: (character: Character) => {
    const {
      traits: { spl, sta, wis },
    } = character;
    const TRAIT_INCREASE = 10;
    return {
      ...character,
      traits: {
        ...character.traits,
        spl: spl + TRAIT_INCREASE,
        sta: sta + TRAIT_INCREASE,
        wis: wis + TRAIT_INCREASE,
      },
      buffs: [...character.buffs, "religio"],
    };
  },
  presensAcies: (character: Character) => {
    const {
      ATK: { crate },
    } = character;
    const TRAIT_INCREASE = 10;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        crate: crate + TRAIT_INCREASE,
      },
      buffs: [...character.buffs, "presensAcies"],
    };
  },
  competentia: (character: Character) => {
    const {
      ATK: { patk },
      MATK: { smatk },
    } = character;
    const TRAIT_INCREASE = 50;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        patk: patk + TRAIT_INCREASE,
      },
      MATK: {
        ...character.MATK,
        smatk: smatk + TRAIT_INCREASE,
      },
      buffs: [...character.buffs, "competentia"],
    };
  },
  allSpheres: (character: Character) => {
    const {
      ATK: { masteryATK },
    } = character;
    const ATK_PER_SPHERE = 3;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        masteryATK: masteryATK + ATK_PER_SPHERE * 15,
      },
      buffs: [...character.buffs, "allSpheres"],
    };
  },
  // Ninja
  shadowWarrior: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "shadowWarrior"] };
  },
  // Gunslinger
  platinumAlter: (character: Character) => {
    const {
      ATK: { masteryATK },
    } = character;
    const ATK_PER_COIN = 8;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        masteryATK: masteryATK + ATK_PER_COIN * 10,
      },
      buffs: [...character.buffs, "platinumAlter"],
    };
  },
  heatBarrel: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "heatBarrel"] };
  },
  intensiveAim: (character: Character) => {
    const { ATK: { pseudoBuffATK } } = character;
    const ATK_INCREASE = 150;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "intensiveAim"],
    };
  },
  hiddenCard: (character: Character) => {
    const { ATK: { patk }, modifiers: { ranged } } = character;
    const PATK_INCREASE = 30;
    const MODIFIER_INCREASE = 100;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        patk: patk + PATK_INCREASE,
      },
      modifiers: {
        ...character.modifiers,
        ranged: ranged + MODIFIER_INCREASE,
      },
      buffs: [...character.buffs, "hiddenCard"],
    };
  },
  earthCharm: (character: Character, monster: Monster) => {
    const { modifiers } = character;
    const INCREASED_PROPERTY_DAMAGE = 30;
    // Also increases totalWeaponATk by 15% per charm (150% total)
    return {
      ...character,
      modifiers: {
        ...modifiers,
        targetProperty:
          monster.element === ELEMENTS[4]
            ? modifiers.targetProperty + INCREASED_PROPERTY_DAMAGE
            : modifiers.targetProperty,
      },
      buffs: [...character.buffs, "earthCharm"],
    };
  },
  // Taekwon
  opposition: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "opposition"] };
  },
  miracle: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "miracle"] };
  },
  lightOfTheSun: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "lightOfTheSun"] };
  },
  fairySoul: (character: Character) => {
    const {
      MATK: { buffMATK },
    } = character;
    const MATK_INCREASE = 50;
    return {
      ...character,
      MATK: {
        ...character.MATK,
        buffMATK: buffMATK + MATK_INCREASE,
      },
      buffs: [...character.buffs, "fairySoul"],
    };
  },
  falconSoul: (character: Character) => {
    const {
      ATK: { pseudoBuffATK },
    } = character;
    const ATK_INCREASE = 50;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "falconSoul"],
    };
  },
  talismanOfWarrior: (character: Character) => {
    const {
      ATK: { patk },
    } = character;
    const PATK_INCREASE = 10;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        patk: patk + PATK_INCREASE,
      },
      buffs: [...character.buffs, "talismanOfWarrior"],
    };
  },
  talismanOfMagician: (character: Character) => {
    const {
      MATK: { smatk },
    } = character;
    const SMATK_INCREASE = 10;
    return {
      ...character,
      MATK: {
        ...character.MATK,
        smatk: smatk + SMATK_INCREASE,
      },
      buffs: [...character.buffs, "talismanOfMagician"],
    };
  },
  talismanOfFiveElements: (character: Character) => {
    const {
      modifiers: { targetProperty },
    } = character;
    const MODIFIER_INCREASE = 20;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        targetProperty: targetProperty + MODIFIER_INCREASE,
      },
      buffs: [...character.buffs, "talismanOfFiveElements"],
    };
  },
  soulOfHeavenAndEarth: (character: Character) => {
    const {
      modifiers: { melee, ranged, skillProperty },
    } = character;
    const MODIFIER_INCREASE = 25;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        melee: melee + MODIFIER_INCREASE,
        ranged: ranged + MODIFIER_INCREASE,
        skillProperty: skillProperty + MODIFIER_INCREASE,
      },
      buffs: [...character.buffs, "soulOfHeavenAndEarth"],
    };
  },
  circleOfDirectionsAndElementals: (character: Character) => {
    const {
      MATK: { smatk },
    } = character;
    const SMATK_INCREASE = 25;
    return {
      ...character,
      MATK: {
        ...character.MATK,
        smatk: smatk + SMATK_INCREASE,
      },
      buffs: [...character.buffs, "circleOfDirectionsAndElementals"],
    };
  },
  // Novice
  breakingLimit: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "breakingLimit"] };
  },
  ruleBreak: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "ruleBreak"] };
  },
  // Doram
  bunchOfShrimp: (character: Character) => {
    const {
      modifiers: { class: classATK },
      MATK: { matkPercent },
    } = character;
    const MODIFIER_INCREASE = 10;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        class: classATK + MODIFIER_INCREASE,
      },
      MATK: {
        ...character.MATK,
        matkPercent: (matkPercent / 100) * 1.1 * 100,
      },
      buffs: [...character.buffs, "bunchOfShrimp"],
    };
  },
  chattering: (character: Character) => {
    const {
      ATK: { pseudoBuffATK },
      MATK: { buffMATK },
    } = character;
    const ATK_INCREASE = 100;
    const MATK_INCREASE = 100;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      },
      MATK: {
        ...character.MATK,
        buffMATK: buffMATK + MATK_INCREASE,
      },
      buffs: [...character.buffs, "chattering"],
    };
  },
  marineFestivalofKisul: (character: Character) => {
    const {
      traits: { pow, con, crt },
      ATK: { patk, crate },
    } = character;
    const TRAIT_INCREASE = 10;
    return {
      ...character,
      traits: {
        ...character.traits,
        pow: pow + TRAIT_INCREASE,
        con: con + TRAIT_INCREASE,
        crt: crt + TRAIT_INCREASE,
      },
      ATK: {
        ...character.ATK,
        patk:
          patk +
          getTraitBonuses(
            "pow",
            character.traits.pow,
            character.traits.pow + TRAIT_INCREASE
          ) +
          getTraitBonuses(
            "con",
            character.traits.con,
            character.traits.con + TRAIT_INCREASE
          ),
        crate:
          crate +
          getTraitBonuses(
            "crt",
            character.traits.crt,
            character.traits.crt + TRAIT_INCREASE
          ),
      },
      buffs: [...character.buffs, "marineFestivalofKisul"],
    };
  },
  sandFestivalofKisul: (character: Character) => {
    const {
      traits: { spl, sta, wis },
      MATK: { smatk },
    } = character;
    const TRAIT_INCREASE = 10;
    return {
      ...character,
      traits: {
        ...character.traits,
        spl: spl + TRAIT_INCREASE,
        sta: sta + TRAIT_INCREASE,
        wis: wis + TRAIT_INCREASE,
      },
      MATK: {
        ...character.MATK,
        smatk:
          smatk +
          getTraitBonuses(
            "spl",
            character.traits.spl,
            character.traits.spl + TRAIT_INCREASE
          ),
      },
      buffs: [...character.buffs, "sandFestivalofKisul"],
    };
  },
  temporaryCommunion: (character: Character) => {
    const {
      ATK: { patk },
      MATK: { smatk },
    } = character;
    const TRAIT_INCREASE = 15;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        patk: patk + TRAIT_INCREASE,
      },
      MATK: {
        ...character.MATK,
        smatk: smatk + TRAIT_INCREASE,
      },
      buffs: [...character.buffs, "temporaryCommunion"],
    };
  },
  blessingOfMysticalCreatures: (character: Character) => {
    const {
      ATK: { patk },
      MATK: { smatk },
    } = character;
    const TRAIT_INCREASE = 50;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        patk: patk + TRAIT_INCREASE,
      },
      MATK: {
        ...character.MATK,
        smatk: smatk + TRAIT_INCREASE,
      },
      buffs: [...character.buffs, "blessingOfMysticalCreatures"],
    };
  },
};

export function applyBuffs(
  character: Character,
  monster: Monster,
  buffs: Buffs
) {
  let buffedCharacter = deepCopy(character) as Character;

  Object.keys(BUFF_EFFECTS).forEach((key) => {
    if (!buffs[key as keyof Buffs]?.active) return;
    const effect = BUFF_EFFECTS[key as keyof Buffs];
    buffedCharacter = effect(buffedCharacter, monster);
  });

  return buffedCharacter;
}
