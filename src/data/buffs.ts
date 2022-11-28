import { deepCopy } from "../utils/helperFunctions";
import { ELEMENTS } from "./element";
import { Buffs, Character, Monster } from "./input";

type BuffEffect = (character: Character, monster: Monster) => Character;

const BUFF_EFFECTS: Record<keyof Buffs, BuffEffect> = {
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
  trueSight: (character: Character) => {
    const { stats } = character;
    return { ...character, stats: {
      str: stats.str + 5,
      agi: stats.agi + 5,
      vit: stats.vit + 5,
      int: stats.int + 5,
      dex: stats.dex + 5,
      luk: stats.luk + 5,
    }, buffs: [...character.buffs, "trueSight"] };
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
