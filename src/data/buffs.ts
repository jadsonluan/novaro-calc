import { deepCopy } from "../utils/helperFunctions";
import { Character } from "./character";
import { ELEMENTS } from "./element";
import { Monster } from "./monster";

export interface Buff {
  active: boolean;
  tooltip: string;
}

export interface Buffs {
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
  // Mage
  magicAmplification?: Buff;
  recognizedSpell?: Buff;
  striking?: Buff;
  // Archer
  trueSight?: Buff;
  unlimit?: Buff;
  fearBreeze?: Buff;
  // Acolyte
  allSpheres?: Buff;
  odinsBlessing?: Buff;
  // Ninja
  shadowWarrior?: Buff;
  earthCharm?: Buff;
  // Taekwon
  falconSoul?: Buff;
  // Novice
  ruleBreak?: Buff;
  breakingLimit?: Buff;
}

export const emptyATKBuffs: Buffs = {
  // Swordsman
  magnumBreak: {
    active: false,
    tooltip: "+20% fire property weaponATK"
  },
  concentration: {
    active: false,
    tooltip: "+15% weaponATK and equipATK"
  },
  asirRune: {
    active: false,
    tooltip: "Pseudo Buff ATK +70"
  },
  turisusRune: {
    active: false,
    tooltip: "STR +30 and +15% Melee % Bonus"
  },
  luxAnimaRune: {
    active: false,
    tooltip: "+30% for the following modifiers: HP & SP, Melee, Ranged, Critical and Size"
  },
  shieldSpell: {
    active: false,
    tooltip: "Pseudo Buff ATK +150"
  },
  inspiration: {
    active: false,
    tooltip: "Pseudo Buff ATK +200, all stats +30 and +20% HP"
  },
  // Thief
  enchantDeadlyPoison: {
    active: false,
    tooltip: "WeaponATK x5 and extraATK x4"
  },
  pyrexia: {
    active: false,
    tooltip: "+5% Melee % Bonus and +15% Critical % Bonus"
  },
  // Merchant
  loudExclamation: {
    active: false,
    tooltip: "STR +4 and Pseudo Buff ATK +30"
  },
  cartBoost: {
    active: false,
    tooltip: "Mastery ATK +50"
  },
  pyroclastic: {
    active: false,
    tooltip: "Pseudo Buff ATK +400"
  },
  // Mage
  striking: {
    active: false,
    tooltip: "Pseudo Buff ATK +100"
  },
  // Archer
  trueSight: {
    active: false,
    tooltip: "All stats +5 and 20% added to the skill base damage"
  },
  unlimit: {
    active: false,
    tooltip: "Final Damage +250%"
  },
  fearBreeze: {
    active: false,
    tooltip: "Increases Aimed Bolt and Arrow Storm damage"
  },
  // Acolyte
  allSpheres: {
    active: false,
    tooltip: "Mastery ATK +3 * spheres = +45"
  },
  odinsBlessing: {
    active: false,
    tooltip: "Pseudo Buff ATK +100"
  },
  // Ninja
  shadowWarrior: {
    active: false,
    tooltip: "Increases Cross Slash damage"
  },
  earthCharm: {
    active: false,
    tooltip: "WeaponATK +15% per charm = +150% and increases Elemental % Bonus +30% against Wind monsters "
  },
  // Taekwon
  falconSoul: {
    active: false,
    tooltip: "Pseudo Buff ATK +50"
  },
};

export const emptyMATKBuffs: Buffs = {
  // Swordsman
  // Thief
  // Merchant
  // Mage
  magicAmplification: {
    active: false,
    tooltip: "MATK +50%"
  },
  recognizedSpell: {
    active: false,
    tooltip: "Removes weapon MATK variance (overupgrade MATK variance still applies)"
  },
  // Archer
  // Acolyte
  // Ninja
  // Taekwon
  // Novice
  ruleBreak: {
    active: false,
    tooltip: "Increase Hyper Novice magic skills damage"
  },
  breakingLimit: {
    active: false,
    tooltip: "Increase Hyper Novice physical skills damage"
  },
};

type BuffEffect = (character: Character, monster: Monster) => Character;

const BUFF_EFFECTS: Record<keyof Buffs, BuffEffect> = {
  // Swordsman
  magnumBreak: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "magnumBreak"] };
  },
  concentration: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "concentration"] };
  },
  asirRune: (character: Character) => {
    const { ATK: { pseudoBuffATK } } = character;
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
    const { ATK: { pseudoBuffATK } } = character;
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
    const { stats, hp, ATK: { pseudoBuffATK } } = character;
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
    const { ATK: { pseudoBuffATK }, stats } = character;
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
    const { ATK: { masteryATK } } = character;
    const ATK_INCREASE = 50;
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
    const { ATK: { pseudoBuffATK } } = character;
    const ATK_INCREASE = 400;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "pyroclastic"],
    };
  },
  // Mage
  magicAmplification: (character: Character) => {
    const { modifiers: { finalDmg } } = character;
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
  striking: (character: Character) => {
    const { ATK: { pseudoBuffATK } } = character;
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
  // Acolyte
  odinsBlessing: (character: Character) => {
    const { ATK: { pseudoBuffATK } } = character;
    const ATK_INCREASE = 100;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "odinsBlessing"],
    };
  },
  allSpheres: (character: Character) => {
    const { ATK: { masteryATK } } = character;
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
  falconSoul: (character: Character) => {
    const { ATK: { pseudoBuffATK } } = character;
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
  // Novice
  breakingLimit: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "breakingLimit"] };
  },
  ruleBreak: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "ruleBreak"] };
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
