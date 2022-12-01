import { deepCopy } from "../utils/helperFunctions";
import { Debuffs, Character, Monster } from "./input";

type BuffEffect = (
  character: Character,
  monster: Monster
) => { character: Character; monster: Monster };

const DEBUFF_EFFECTS: Record<keyof Debuffs, BuffEffect> = {
  darkClaw: (character: Character, monster: Monster) => {
    const MODIFIER = 150;
    return {
      character: { ...character },
      monster: {
        ...monster,
        meleeModifier: monster.meleeModifier + MODIFIER,
        debuffs: [...monster.debuffs, "darkClaw"],
      },
    };
  },
  magicIntoxication: (character: Character, monster: Monster) => {
    const MODIFIER = 50;
    return {
      character: { ...character },
      monster: {
        ...monster,
        finalModifier: monster.finalModifier + MODIFIER,
        debuffs: [...monster.debuffs, "magicIntoxication"],
      },
    };
  },
  oratio: (character: Character, monster: Monster) => {
    return {
      character: { ...character },
      monster: { ...monster, debuffs: [...monster.debuffs, "oratio"] },
    };
  },
};

export function applyDebuff(
  character: Character,
  monster: Monster,
  debuffs: Debuffs
) {
  let changedCharacter = deepCopy(character) as Character;
  let changedMonster = deepCopy(monster) as Monster;

  Object.keys(DEBUFF_EFFECTS).forEach((key) => {
    if (!debuffs[key as keyof Debuffs].active) return;
    const effect = DEBUFF_EFFECTS[key as keyof Debuffs];
    const { character, monster } = effect(changedCharacter, changedMonster);
    changedCharacter = character;
    changedMonster = monster;
  });

  return { character: changedCharacter, monster: changedMonster };
}
