import { deepCopy } from "../utils/helperFunctions";
import { ELEMENTS } from "./element";
import { Buffs, Character, Monster } from "./input";

type BuffEffect = (character: Character, monster: Monster) => Character;

const BUFF_EFFECTS: Record<keyof Buffs, BuffEffect> = {
  // Swordsman
  shieldSpell: (character: Character) => {
    const { pseudoBuffATK } = character;
    const ATK_INCREASE = 150;
    return {
      ...character,
      pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
      buffs: [...character.buffs, "shieldSpell"],
    };
  },
  inspiration: (character: Character) => {
    const { stats, pseudoBuffATK } = character;
    const ATK_INCREASE = 200;
    const STAT_INCREASE = 30;
    return {
      ...character,
      pseudoBuffATK: pseudoBuffATK + ATK_INCREASE,
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
  allSpheres: (character: Character) => {
    const { masteryATK } = character;
    const ATK_PER_SPHERE = 3;
    return {
      ...character,
      masteryATK: masteryATK + 15 * ATK_PER_SPHERE,
      buffs: [...character.buffs, "allSpheres"],
    };
  },
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
};

export function applyBuffs(
  character: Character,
  monster: Monster,
  buffs: Buffs
) {
  let buffedCharacter = deepCopy(character) as Character;

  Object.keys(BUFF_EFFECTS).forEach((key) => {
    if (!buffs[key as keyof Buffs]) return;
    const effect = BUFF_EFFECTS[key as keyof Buffs];
    buffedCharacter = effect(buffedCharacter, monster);
  });

  return buffedCharacter;
}
