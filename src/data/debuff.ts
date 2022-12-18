import { deepCopy } from "../utils/helperFunctions";
import { Buff } from "./buffs";
import { Character } from "./character";
import { Monster } from "./monster";

export interface Debuffs {
  oratio?: Buff;
  darkClaw?: Buff;
  magicIntoxication?: Buff;
  allBloom?: Buff;
  violentQuake?: Buff;
  soulCurse?: Buff;
}

export const emptyATKDebuffs: Debuffs = {
  darkClaw: {
    active: false,
    tooltip: "+150%(75% for boss) melee damage inflicted",
    job: "Thief"
  },
  magicIntoxication: {
    active: false,
    tooltip: "Takes 50% more damage from all properties",
    job: "Mage"
  },
  allBloom: {
    active: false,
    tooltip: "Takes 100% from fire property attacks",
    job: "Mage"
  },
  violentQuake: {
    active: false,
    tooltip: "Takes 100% from earth property attacks",
    job: "Mage"
  },
  oratio: {
    active: false,
    tooltip: "Decreases holy property resistance",
    job: "Priest"
  },
  soulCurse: {
    active: false,
    tooltip: "Takes 100% (20% if boss type) more damage from shadow property attacks",
    job: "Taekwon"
  },
};

export const emptyMATKDebuffs: Debuffs = {
  magicIntoxication: {
    active: false,
    tooltip: "Takes 50% more damage from all properties",
    job: "Mage"
  },
  allBloom: {
    active: false,
    tooltip: "Takes 100% more damage from fire property attacks",
    job: "Mage"
  },
  violentQuake: {
    active: false,
    tooltip: "Takes 100% more damage from earth property attacks",
    job: "Mage"
  },
  oratio: {
    active: false,
    tooltip: "Decreases holy property resistance",
    job: "Priest"
  },
  soulCurse: {
    active: false,
    tooltip: "Takes 100% (20% if boss type) more damage from shadow property attacks",
    job: "Taekwon"
  },
};

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
  allBloom: (character: Character, monster: Monster) => {
    return {
      character: { ...character },
      monster: { ...monster, debuffs: [...monster.debuffs, "allBloom"] },
    };
  },
  violentQuake: (character: Character, monster: Monster) => {
    return {
      character: { ...character },
      monster: { ...monster, debuffs: [...monster.debuffs, "violentQuake"] },
    };
  },
  soulCurse: (character: Character, monster: Monster) => {
    return {
      character: { ...character },
      monster: { ...monster, debuffs: [...monster.debuffs, "soulCurse"] },
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
    if (!debuffs[key as keyof Debuffs]?.active) return;
    const effect = DEBUFF_EFFECTS[key as keyof Debuffs];
    const { character, monster } = effect(changedCharacter, changedMonster);
    changedCharacter = character;
    changedMonster = monster;
  });

  return { character: changedCharacter, monster: changedMonster };
}
