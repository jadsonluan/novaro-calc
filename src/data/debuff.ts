import { deepCopy } from "../utils/helperFunctions";
import { Buff } from "./buffs";
import { Character } from "./character";
import { Monster } from "./monster";

export interface Debuffs {
  // Archer
  soundBlend?: Buff;
  // Acolyte
  oleumSanctum?: Buff;
  oratio?: Buff;
  // Thief
  darkClaw?: Buff;
  raid?: Buff;
  // Merchant
  quake?: Buff;
  // Mage
  magicIntoxication?: Buff;
  allBloom?: Buff;
  violentQuake?: Buff;
  earthInsignia?: Buff;
  waterInsignia?: Buff;
  windInsignia?: Buff;
  fireInsignia?: Buff;
  cloudPoison?: Buff;
  // Ninja
  wateryEvasion?: Buff;
  // Taekwon
  soulCurse?: Buff;
}

export const emptyATKDebuffs: Debuffs = {
  soundBlend: {
    active: false,
    tooltip: "Increases damage of some Troubadour / Trouvere skills",
    job: "Archer",
    iconURL: 'https://static.divine-pride.net/images/skill/5357.png',
  },
  oratio: {
    active: false,
    tooltip: "Decreases holy property resistance",
    job: "Acolyte",
    iconURL: 'https://static.divine-pride.net/images/skill/2046.png',
  },
  oleumSanctum: {
    active: false,
    tooltip: "Increases long ranged damage by 50%",
    job: "Acolyte",
    iconURL: 'https://static.divine-pride.net/images/skill/5241.png',
  },
  quake: {
    active: false,
    tooltip: "Increases YOUR melee and long ranged modifiers by 50% against the target",
    job: "Merchant",
    iconURL: 'https://static.divine-pride.net/images/skill/5296.png',
  },
  darkClaw: {
    active: false,
    tooltip: "+150%(75% for boss) melee damage inflicted",
    job: "Thief",
    iconURL: 'https://static.divine-pride.net/images/skill/5001.png',
  },
  raid: {
    active: false,
    tooltip: "+30% (15% for boss) final damage",
    job: "Thief",
    iconURL: 'https://static.divine-pride.net/images/skill/214.png',
  },
  magicIntoxication: {
    active: false,
    tooltip: "Takes 50% more damage from all properties",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/2213.png',
  },
  allBloom: {
    active: false,
    tooltip: "Takes 100% from fire property attacks",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/5222.png',
  },
  violentQuake: {
    active: false,
    tooltip: "Takes 100% from earth property attacks",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/5218.png',
  },
  earthInsignia: {
    active: false,
    tooltip: "Takes 50% from fire property attacks",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/2468.png',
  },
  waterInsignia: {
    active: false,
    tooltip: "Takes 50% from wind property attacks",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/2466.png',
  },
  windInsignia: {
    active: false,
    tooltip: "Takes 50% from earth property attacks",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/2467.png',
  },
  fireInsignia: {
    active: false,
    tooltip: "Takes 50% from water property attacks",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/2465.png',
  },
  cloudPoison: {
    active: false,
    tooltip: "Decreases poison property resistance",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/2448.png',
  },
  soulCurse: {
    active: false,
    tooltip: "Takes 100% (20% if boss type) more damage from shadow property attacks",
    job: "Taekwon",
    iconURL: 'https://static.divine-pride.net/images/skill/2601.png',
  },
};

export const emptyMATKDebuffs: Debuffs = {
  soundBlend: {
    active: false,
    tooltip: "Increases damage of some Troubadour / Trouvere skills",
    job: "Archer",
    iconURL: 'https://static.divine-pride.net/images/skill/5357.png',
  },
  oratio: {
    active: false,
    tooltip: "Decreases holy property resistance",
    job: "Priest",
    iconURL: 'https://static.divine-pride.net/images/skill/2046.png',
  },
  raid: {
    active: false,
    tooltip: "+30% (15%) final damage",
    job: "Thief",
    iconURL: 'https://static.divine-pride.net/images/skill/214.png',
  },
  magicIntoxication: {
    active: false,
    tooltip: "Takes 50% more damage from all properties",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/2213.png',
  },
  allBloom: {
    active: false,
    tooltip: "Takes 100% more damage from fire property attacks",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/5222.png',
  },
  violentQuake: {
    active: false,
    tooltip: "Takes 100% more damage from earth property attacks",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/5218.png',
  },
  earthInsignia: {
    active: false,
    tooltip: "Takes 50% from fire property attacks",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/2468.png',
  },
  waterInsignia: {
    active: false,
    tooltip: "Takes 50% from wind property attacks",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/2466.png',
  },
  windInsignia: {
    active: false,
    tooltip: "Takes 50% from earth property attacks",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/2467.png',
  },
  fireInsignia: {
    active: false,
    tooltip: "Takes 50% from water property attacks",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/2465.png',
  },
  cloudPoison: {
    active: false,
    tooltip: "Decreases poison property resistance",
    job: "Mage",
    iconURL: 'https://static.divine-pride.net/images/skill/2448.png',
  },
  wateryEvasion: {
    active: false,
    tooltip: "Increases Freezing Spear damage",
    job: "Ninja",
    iconURL: 'https://static.divine-pride.net/images/skill/538.png',
  },
  soulCurse: {
    active: false,
    tooltip: "Takes 100% (20% if boss type) more damage from shadow property attacks",
    job: "Taekwon",
    iconURL: 'https://static.divine-pride.net/images/skill/2601.png',
  },
};

type BuffEffect = (
  character: Character,
  monster: Monster
) => { character: Character; monster: Monster };

const DEBUFF_EFFECTS: Record<keyof Debuffs, BuffEffect> = {
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
  oleumSanctum: (character: Character, monster: Monster) => {
    const MODIFIER = 50;
    return {
      character: { ...character },
      monster: {
        ...monster,
        rangedModifier: monster.rangedModifier + MODIFIER,
        debuffs: [...monster.debuffs, "oleumSanctum"],
      },
    };
  },
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
        meleeModifier: monster.meleeModifier + (monster.type === 'normal' ? MODIFIER : MODIFIER / 2),
        debuffs: [...monster.debuffs, "darkClaw"],
      },
    };
  },
  quake: (character: Character, monster: Monster) => {
    const { modifiers: { melee, ranged} } = character;
    const MODIFIER_INCREASE = 50;
    return {
      character: {
        ...character,
        modifiers: {
          ...character.modifiers,
          melee: melee + MODIFIER_INCREASE,
          ranged: ranged + MODIFIER_INCREASE,
        },
      },
      monster: {
        ...monster,
        debuffs: [...monster.debuffs, "quake"],
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
  cloudPoison: (character: Character, monster: Monster) => {
    const MODIFIER = 25;
    return {
      character: { ...character },
      monster: {
        ...monster,
        finalPropertyModifier: monster.finalPropertyModifier + (character.weapon.element === 'Poison' ? MODIFIER : 0),
        debuffs: [...monster.debuffs, "cloudPoison"],
      },
    };
  },
  wateryEvasion: (character: Character, monster: Monster) => {
    return {
      character: { ...character },
      monster: { ...monster, debuffs: [...monster.debuffs, "wateryEvasion"] },
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
