import { deepCopy } from "../utils/helperFunctions";
import { Buffs, Character } from "./input";

type BuffEffect = (character: Character) => Character;

const BUFF_EFFECTS: Record<keyof Buffs, BuffEffect> = {
  allSpheres: (character: Character) => {
    const { masteryATK } = character;
    const ATK_PER_SPHERE = 3;
    return { ...character, masteryATK: masteryATK + 15 * ATK_PER_SPHERE };
  },
};

export function applyBuffs(character: Character, buffs: Buffs) {
  let buffedCharacter = deepCopy(character) as Character;

  Object.keys(BUFF_EFFECTS).forEach((key) => {
    if (!buffs[key as keyof Buffs]) return;
    const effect = BUFF_EFFECTS[key as keyof Buffs];
    buffedCharacter = effect(buffedCharacter);
  });

  return buffedCharacter;
}
