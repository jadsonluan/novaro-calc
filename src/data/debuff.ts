import { deepCopy } from "../utils/helperFunctions";
import { Buff } from "./buffs";
import { Character } from "./character";
import { Monster } from "./monster";

export interface Debuffs {
  soundBlend?: Buff;
  oratio?: Buff;
  darkClaw?: Buff;
  raid?: Buff;
  magicIntoxication?: Buff;
  allBloom?: Buff;
  violentQuake?: Buff;
  earthInsignia?: Buff;
  waterInsignia?: Buff;
  windInsignia?: Buff;
  fireInsignia?: Buff;
  soulCurse?: Buff;
}

export const emptyATKDebuffs: Debuffs = {
  darkClaw: {
    active: false,
    tooltip: "+150%(75% for boss) melee damage inflicted",
    job: "Thief"
  },
  raid: {
    active: false,
    tooltip: "+30% (15% for boss) final damage",
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
  earthInsignia: {
    active: false,
    tooltip: "Takes 50% from fire property attacks",
    job: "Mage"
  },
  waterInsignia: {
    active: false,
    tooltip: "Takes 50% from wind property attacks",
    job: "Mage"
  },
  windInsignia: {
    active: false,
    tooltip: "Takes 50% from earth property attacks",
    job: "Mage"
  },
  fireInsignia: {
    active: false,
    tooltip: "Takes 50% from water property attacks",
    job: "Mage"
  },
  soundBlend: {
    active: false,
    tooltip: "Increases damage of some Troubadour / Trouvere skills",
    job: "Archer"
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
  raid: {
    active: false,
    tooltip: "+30% (15%) final damage",
    job: "Thief"
  },
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
  earthInsignia: {
    active: false,
    tooltip: "Takes 50% from fire property attacks",
    job: "Mage"
  },
  waterInsignia: {
    active: false,
    tooltip: "Takes 50% from wind property attacks",
    job: "Mage"
  },
  windInsignia: {
    active: false,
    tooltip: "Takes 50% from earth property attacks",
    job: "Mage"
  },
  fireInsignia: {
    active: false,
    tooltip: "Takes 50% from water property attacks",
    job: "Mage"
  },
  soundBlend: {
    active: false,
    tooltip: "Increases damage of some Troubadour / Trouvere skills",
    job: "Archer"
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
  raid: (character: Character, monster: Monster) => {
    const MODIFIER = 30;
    return {
      character: { ...character },
      monster: {
        ...monster,
        finalModifier: monster.finalModifier + (monster.type === 'normal' ? MODIFIER : MODIFIER / 2),
        debuffs: [...monster.debuffs, "raid"],
      },
    };
  },
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
        finalPropertyModifier: monster.finalPropertyModifier + MODIFIER,
        debuffs: [...monster.debuffs, "magicIntoxication"],
      },
    };
  },
  soundBlend: (character: Character, monster: Monster) => {
    return {
      character: { ...character },
      monster: { ...monster, debuffs: [...monster.debuffs, "soundBlend"] },
    };
  },
  oratio: (character: Character, monster: Monster) => {
    return {
      character: { ...character },
      monster: { ...monster, debuffs: [...monster.debuffs, "oratio"] },
    };
  },
  allBloom: (character: Character, monster: Monster) => {
    const MODIFIER = 100;
    return {
      character: { ...character },
      monster: {
        ...monster,
        finalPropertyModifier: monster.finalPropertyModifier + (character.weapon.element === 'Fire' ? MODIFIER : 0),
        debuffs: [...monster.debuffs, "allBloom"],
      },
    };
  },
  violentQuake: (character: Character, monster: Monster) => {
    const MODIFIER = 100;
    return {
      character: { ...character },
      monster: {
        ...monster,
        finalPropertyModifier: monster.finalPropertyModifier + (character.weapon.element === 'Earth' ? MODIFIER : 0),
        debuffs: [...monster.debuffs, "allBloom"],
      },
    };
  },
  earthInsignia: (character: Character, monster: Monster) => {
    const { modifiers: { dmg } } = character;
    const MODIFIER = 50;
    return {
      character: { 
        ...character,
        modifiers: {
          ...character.modifiers,
          dmg: dmg + (character.weapon.element === 'Fire' ? MODIFIER : 0),
        },
       },
      monster: {
        ...monster,
        debuffs: [...monster.debuffs, "earthInsignia"],
      },
    };
  },
  waterInsignia: (character: Character, monster: Monster) => {
    const { modifiers: { dmg } } = character;
    const MODIFIER = 50;
    return {
      character: {
        ...character,
        modifiers: {
          ...character.modifiers,
          dmg: dmg + (character.weapon.element === 'Wind' ? MODIFIER : 0),
        },
       },
      monster: {
        ...monster,
        debuffs: [...monster.debuffs, "waterInsignia"],
      },
    };
  },
  windInsignia: (character: Character, monster: Monster) => {
    const { modifiers: { dmg } } = character;
    const MODIFIER = 50;
    return {
      character: { 
        ...character,
        modifiers: {
          ...character.modifiers,
          dmg: dmg + (character.weapon.element === 'Earth' ? MODIFIER : 0),
        },
       },
      monster: {
        ...monster,
        debuffs: [...monster.debuffs, "windInsignia"],
      },
    };
  },
  fireInsignia: (character: Character, monster: Monster) => {
    const { modifiers: { dmg } } = character;
    const MODIFIER = 50;
    return {
      character: { 
        ...character,
        modifiers: {
          ...character.modifiers,
          dmg: dmg + (character.weapon.element === 'Water' ? MODIFIER : 0),
        },
       },
      monster: {
        ...monster,
        debuffs: [...monster.debuffs, "fireInsignia"],
      },
    };
  },
  soulCurse: (character: Character, monster: Monster) => {
    const { weapon: { element } } = character;
    const { type, finalPropertyModifier } = monster;
    const MODIFIER = (type === 'normal' ? 2 : 1.2);
  
    return {
      character: { ...character },
      monster: {
        ...monster,
        finalPropertyModifier: (element === 'Shadow' ? (((1 + finalPropertyModifier / 100) * MODIFIER) - 1) * 100 : 0),
        debuffs: [...monster.debuffs, "allBloom"],
      },
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
