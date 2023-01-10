import { deepCopy, getTraitBonuses } from "../utils/helperFunctions";
import { Character } from "./character";
import { ELEMENTS } from "./element";
import { Monster } from "./monster";

export interface Buff {
  label?: string;
  active: boolean;
  tooltip: string;
  job: string;
}

export interface Buffs {
  // All
  blueHerbActivator?: Buff;
  redHerbActivator?: Buff;
  boxOfResentment?: Buff;
  boxOfDrowsiness?: Buff;
  tyrBlessing?: Buff;
  distilledFightingSpirit?: Buff;
  herbOfIncantation?: Buff;
  cursedFragment?: Buff;
  limitedPowerBooster?: Buff;
  redBooster?: Buff;
  infinityDrink?: Buff;
  sacredDraught?: Buff;
  runeStrawberryCake?: Buff;
  investigate?: Buff;
  // Swordsman
  magnumBreak?: Buff;
  concentration?: Buff;
  asirRune?: Buff;
  turisusRune?: Buff;
  luxAnimaRune?: Buff;
  moonSlasher?: Buff;
  shieldSpell?: Buff;
  inspiration?: Buff;
  attackStance?: Buff;
  shieldShooting?: Buff;
  grandJudgment?: Buff;
  holyShield?: Buff;
  // Thief
  enchantDeadlyPoison?: Buff;
  pyrexia?: Buff;
  cloaking?: Buff;
  potentVenom?: Buff;
  shadowExceed?: Buff;
  autoShadowSpell?: Buff;
  abyssDagger?: Buff;
  abyssSlayer?: Buff;
  // Merchant
  loudExclamation?: Buff;
  overThrust?: Buff;
  maximumOverThrust?: Buff;
  powerMaximize?: Buff;
  cartBoost?: Buff;
  pyroclastic?: Buff;
  tempering?: Buff;
  researchReport?: Buff;
  // Mage
  magicAmplification?: Buff;
  recognizedSpell?: Buff;
  intenseTelekinesis?: Buff;
  climax?: Buff;
  seismicPower?: Buff;
  frostWeapon?: Buff;
  lightningLoader?: Buff;
  flameLauncher?: Buff;
  deluge?: Buff;
  violentGale?: Buff;
  volcano?: Buff;
  earthInsigniaLv2?: Buff;
  waterInsigniaLv2?: Buff;
  windInsigniaLv2?: Buff;
  fireInsigniaLv2?: Buff;
  earthInsigniaLv3?: Buff;
  waterInsigniaLv3?: Buff;
  windInsigniaLv3?: Buff;
  fireInsigniaLv3?: Buff;
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
  odinsBlessing?: Buff;
  benedictum?: Buff;
  religio?: Buff;
  presensAcies?: Buff;
  competentia?: Buff;
  risingDragon?: Buff;
  gentleTouchRevitalize?: Buff;
  firmFaith?: Buff;
  powerfulFaith?: Buff;
  // Ninja
  fireCharm?: Buff;
  iceCharm?: Buff;
  windCharm?: Buff;
  earthCharm?: Buff;
  shadowWarrior?: Buff;
  sixteenthNight?: Buff;
  distorcedCrescent?: Buff;
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
  tyrBlessing: {
    active: false,
    tooltip: "+20 Status ATK. Does not stack with Box Of Resentment, Distilled Fighting Spirit or Cursed Fragment",
    job: "All",
  },
  boxOfResentment: {
    active: false,
    tooltip: "+20 Status ATK. Does not stack with Tyr Blessing, Distilled Fighting Spirit or Cursed Fragment",
    job: "All",
  },
  distilledFightingSpirit: {
    active: false,
    tooltip: "+30 Status ATK. Does not stack with Tyr Blessing, Box Of Resentment or Cursed Fragment",
    job: "All",
  },
  cursedFragment: {
    active: false,
    tooltip: "+50 Status ATK. Does not stack with Tyr Blessing, Box Of Resentment or Distilled Fighting Spirit",
    job: "All",
  },
  redBooster: {
    active: false,
    tooltip: "+30 Status ATK",
    job: "All",
  },
  limitedPowerBooster: {
    active: false,
    tooltip: "+30 Status ATK and +1% ATK",
    job: "All",
  },
  infinityDrink: {
    active: false,
    tooltip: "+5% Critical Damage and +5% Ranged Damage",
    job: "All",
  },
  sacredDraught: {
    active: false,
    tooltip: "+3% ATK",
    job: "All",
  },
  runeStrawberryCake: {
    active: false,
    tooltip: "+5% (Weapon Base ATK + Refine ATK) and +5% Status ATK",
    job: "All",
  },
  investigate: {
    active: false,
    tooltip: "Ignores monster Hard DEF and gain this DEF / 2 as PseudoBuffATK",
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
  moonSlasher: {
    active: false,
    tooltip: "Increases Overbrand damage",
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
  attackStance: {
    active: false,
    tooltip: "+15 P.Atk",
    job: "Swordsman",
  },
  shieldShooting: {
    active: false,
    tooltip: "Increases Rapid Smithing, Shield Press and Earth Drive damage",
    job: "Swordsman",
  },
  grandJudgment: {
    active: false,
    tooltip: "Increases Vanishing Point and Cannon Spear damage",
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
  cloaking: {
    active: false,
    tooltip: "Increases Savage Impact and Shadow Stab damage",
    job: "Thief",
  },
  potentVenom: {
    active: false,
    tooltip: "+30% Res bypass",
    job: "Thief",
  },
  shadowExceed: {
    active: false,
    tooltip: "Increases Savage Impact and Eternal Slash damage",
    job: "Thief",
  },
  abyssDagger: {
    active: false,
    tooltip: "Increases Fatal Menace damage",
    job: "Thief",
  },
  abyssSlayer: {
    active: false,
    tooltip: "P.Atk and S.Matk +30",
    job: "Thief",
  },
  // Merchant
  loudExclamation: {
    active: false,
    tooltip: "STR +4 and Pseudo Buff ATK +30",
    job: "Merchant",
  },
  overThrust: {
    active: false,
    tooltip: "Adds +25% ATK to Meister skills base formula",
    job: "Merchant",
  },
  maximumOverThrust: {
    active: false,
    tooltip: "Adds +100% ATK to Meister skills base formula",
    job: "Merchant",
  },
  powerMaximize: {
    active: false,
    tooltip: "Removes Weapon Base ATK variance (over upgrade variance still applies)",
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
  researchReport: {
    active: false,
    tooltip: "Increases Acified Zone damage and acid skills damage against Formless and Plant monsters",
    job: "Merchant",
  },
  // Mage
  deluge: {
    active: false,
    tooltip: "+20% Water property damage",
    job: "Mage",
  },
  violentGale: {
    active: false,
    tooltip: "+20% Wind property damage",
    job: "Mage",
  },
  volcano: {
    active: false,
    tooltip: "+20% Fire property damage and +30 ATK",
    job: "Mage",
  },
  earthInsigniaLv2: {
    active: false,
    tooltip: "Acts as Lv2 insignia buff. +10% ATK",
    job: "Mage"
  },
  waterInsigniaLv2: {
    active: false,
    tooltip: "Acts as Lv2 insignia buff. +10% ATK",
    job: "Mage"
  },
  windInsigniaLv2: {
    active: false,
    tooltip: "Acts as Lv2 insignia buff. +10% ATK",
    job: "Mage"
  },
  fireInsigniaLv2: {
    active: false,
    tooltip: "Acts as Lv2 insignia buff. +10% ATK and +50 ATK",
    job: "Mage"
  },
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
  risingDragon: {
    active: false,
    tooltip: "Mastery ATK +3 * spheres = +45 and MaxHP/SP +10%",
    job: "Acolyte",
  },
  gentleTouchRevitalize: {
    active: false,
    tooltip: "MaxHP + 10% and increases Tiger Cannon damage by 30%",
    job: "Acolyte",
  },
  firmFaith: {
    active: false,
    tooltip: "MaxHP +10%",
    job: "Acolyte",
  },
  powerfulFaith: {
    active: false,
    tooltip: "ATK +30 and P.Atk +15",
    job: "Acolyte",
  },
  // Ninja
  shadowWarrior: {
    active: false,
    tooltip: "Increases Cross Slash damage",
    job: "Ninja",
  },
  fireCharm: {
    active: false,
    tooltip: "Increases Race % Bonus +30% against Earth monsters",
    job: "Ninja",
  },
  iceCharm: {
    active: false,
    tooltip: "Increases Race % Bonus +30% against Fire monsters",
    job: "Ninja",
  },
  windCharm: {
    active: false,
    tooltip: "Increases Race % Bonus +30% against Water monsters",
    job: "Ninja",
  },
  earthCharm: {
    active: false,
    tooltip: "WeaponATK +15% per charm = +150% and increases Race % Bonus +30% against Wind monsters",
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
  tyrBlessing: {
    active: false,
    tooltip: "+20 Status MATK. Does not stack with Box Of Drowsiness, Herb of Incantation or Cursed Fragment",
    job: "All",
  },
  boxOfDrowsiness: {
    active: false,
    tooltip: "+20 Status MATK. Does not stack with Tyr Blessing, Herb of Incantation or Cursed Fragment",
    job: "All",
  },
  herbOfIncantation: {
    active: false,
    tooltip: "+30 Status MATK. Does not stack with Tyr Blessing, Box Of Drowsiness or Cursed Fragment",
    job: "All",
  },
  cursedFragment: {
    active: false,
    tooltip: "+50 Status MATK. Does not stack with Tyr Blessing, Box Of Drowsiness or Herb of Incantation",
    job: "All",
  },
  redBooster: {
    active: false,
    tooltip: "+30 Status MATK",
    job: "All",
  },
  limitedPowerBooster: {
    active: false,
    tooltip: "+30 Status MATK and +1% MATK",
    job: "All",
  },
  infinityDrink: {
    active: false,
    tooltip: "+5% All Element magical damage",
    job: "All",
  },
  sacredDraught: {
    active: false,
    tooltip: "+3% MATK",
    job: "All",
  },
  runeStrawberryCake: {
    active: false,
    tooltip: "+5% magic damage",
    job: "All",
  },
  // Swordsman
  attackStance: {
    active: false,
    tooltip: "+15 S.Matk",
    job: "Swordsman",
  },
  holyShield: {
    active: false,
    tooltip: "Increases Holy Rain damage and +15% Holy Property magical damage",
    job: "Swordsman",
  },
  // Thief
  autoShadowSpell: {
    active: false,
    tooltip: "+50 Matk",
    job: "Thief",
  },
  abyssSlayer: {
    active: false,
    tooltip: "P.Atk and S.Matk +30",
    job: "Thief",
  },
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
  intenseTelekinesis: {
    active: false,
    tooltip: "+200% Ghost property magic damage",
    job: "Mage",
  },
  climax: {
    active: false,
    tooltip: "Climax buff, acts as level 3 Climax for affected skills",
    job: "Mage",
  },
  seismicPower: {
    active: false,
    tooltip: "+5% Earth elemental magic damage",
    job: "Mage",
  },
  frostWeapon: {
    active: false,
    tooltip: "+5% Water elemental magic damage",
    job: "Mage",
  },
  lightningLoader: {
    active: false,
    tooltip: "+5% Wind elemental magic damage",
    job: "Mage",
  },
  flameLauncher: {
    active: false,
    tooltip: "+5% Fire elemental magic damage",
    job: "Mage",
  },
  deluge: {
    active: false,
    tooltip: "+20% Water property damage",
    job: "Mage",
  },
  violentGale: {
    active: false,
    tooltip: "+20% Wind property damage",
    job: "Mage",
  },
  volcano: {
    active: false,
    tooltip: "+20% Fire property damage and +30 MATK",
    job: "Mage",
  },
  earthInsigniaLv3: {
    active: false,
    tooltip: "Acts as Lv3 insignia buff. +25% Earth property damage",
    job: "Mage"
  },
  waterInsigniaLv3: {
    active: false,
    tooltip: "Acts as Lv3 insignia buff. +25% Water property damage",
    job: "Mage"
  },
  windInsigniaLv3: {
    active: false,
    tooltip: "Acts as Lv3 insignia buff. +25% Wind property damage",
    job: "Mage"
  },
  fireInsigniaLv3: {
    active: false,
    tooltip: "Acts as Lv3 insignia buff. +50 MATK and +25% Fire property damage",
    job: "Mage"
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
  fireCharm: {
    active: false,
    tooltip: "Increases Flaming Petals damage",
    job: "Ninja",
  },
  iceCharm: {
    active: false,
    tooltip: "Increases Freezing Spear damage",
    job: "Ninja",
  },
  windCharm: {
    active: false,
    tooltip: "Increases Wind Blade damage",
    job: "Ninja",
  },
  sixteenthNight: {
    label: "16th Night",
    active: false,
    tooltip: "Matk +125",
    job: "Ninja",
  },
  distorcedCrescent: {
    active: false,
    tooltip: "Increases MATK based on Base Level",
    job: "Ninja",
  },
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

type BuffEffect = (character: Character, monster: Monster, isMATK: boolean) => Character;

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
  cursedFragment: (character: Character) => {
    const {
      ATK: { bonusStatusATK },
      MATK: { bonusStatusMATK },
    } = character;
    const ATK_INCREASE = 50;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        bonusStatusATK:
          bonusStatusATK +
          (!character.buffs.some((buff: string) =>
            [
              "boxOfResentment",
              "tyrBlessing",
              "distilledFightingSpirit",
            ].includes(buff)
          )
            ? ATK_INCREASE
            : 0),
      },
      MATK: {
        ...character.MATK,
        bonusStatusMATK:
          bonusStatusMATK +
          (!character.buffs.some((buff: string) =>
            [
              "boxOfDrowsiness",
              "tyrBlessing",
              "herbOfIncantation",
            ].includes(buff)
          )
            ? ATK_INCREASE
            : 0),
      },
      buffs: [...character.buffs, "cursedFragment"],
    };
  },
  distilledFightingSpirit: (character: Character) => {
    const {
      ATK: { bonusStatusATK },
    } = character;
    const ATK_INCREASE = 30;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        bonusStatusATK:
          bonusStatusATK +
          (!character.buffs.some((buff: string) =>
            [
              "boxOfResentment",
              "tyrBlessing",
              "cursedFragment",
            ].includes(buff)
          )
            ? ATK_INCREASE
            : 0),
      },
      buffs: [...character.buffs, "distilledFightingSpirit"],
    };
  },
  herbOfIncantation: (character: Character) => {
    const {
      MATK: { bonusStatusMATK },
    } = character;
    const ATK_INCREASE = 30;
    return {
      ...character,
      MATK: {
        ...character.MATK,
        bonusStatusMATK:
          bonusStatusMATK +
          (!character.buffs.some((buff: string) =>
            [
              "tyrBlessing",
              "boxOfDrowsiness",
              "cursedFragment",
            ].includes(buff)
          )
            ? ATK_INCREASE
            : 0),
      },
      buffs: [...character.buffs, "herbOfIncantation"],
    };
  },
  boxOfResentment: (character: Character) => {
    const {
      ATK: { bonusStatusATK },
    } = character;
    const ATK_INCREASE = 20;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        bonusStatusATK:
          bonusStatusATK +
          (!character.buffs.some((buff: string) =>
            [
              "tyrBlessing",
              "distilledFightingSpirit",
              "cursedFragment",
            ].includes(buff)
          )
            ? ATK_INCREASE
            : 0),
      },
      buffs: [...character.buffs, "boxOfResentment"],
    };
  },
  boxOfDrowsiness: (character: Character) => {
    const {
      MATK: { bonusStatusMATK },
    } = character;
    const ATK_INCREASE = 20;
    return {
      ...character,
      MATK: {
        ...character.MATK,
        bonusStatusMATK:
          bonusStatusMATK +
          (!character.buffs.some((buff: string) =>
            [
              "tyrBlessing",
              "herbOfIncantation",
              "cursedFragment",
            ].includes(buff)
          )
            ? ATK_INCREASE
            : 0),
      },
      buffs: [...character.buffs, "boxOfDrowsiness"],
    };
  },
  tyrBlessing: (character: Character) => {
    const {
      ATK: { bonusStatusATK },
      MATK: { bonusStatusMATK },
    } = character;
    const ATK_INCREASE = 20;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        bonusStatusATK:
          bonusStatusATK +
          (!character.buffs.some((buff: string) =>
            [
              "boxOfResentment",
              "distilledFightingSpirit",
              "cursedFragment",
            ].includes(buff)
          )
            ? ATK_INCREASE
            : 0),
      },
      MATK: {
        ...character.MATK,
        bonusStatusMATK:
          bonusStatusMATK +
          (!character.buffs.some((buff: string) =>
            [
              "boxOfDrowsiness",
              "herbOfIncantation",
              "cursedFragment",
            ].includes(buff)
          )
            ? ATK_INCREASE
            : 0),
      },
      buffs: [...character.buffs, "tyrBlessing"],
    };
  },
  redBooster: (character: Character) => {
    const {
      ATK: { bonusStatusATK },
      MATK: { bonusStatusMATK }
    } = character;
    const ATK_INCREASE = 30;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        bonusStatusATK: bonusStatusATK + ATK_INCREASE,
      },
      MATK: {
        ...character.MATK,
        bonusStatusMATK: bonusStatusMATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "redBooster"],
    };
  },
  limitedPowerBooster: (character: Character) => {
    const {
      ATK: { bonusStatusATK },
      modifiers: { class: classATK },
      MATK: { bonusStatusMATK, matkPercent }
    } = character;
    const ATK_INCREASE = 30;
    const ATK_PERCENT_INCREASE = 1;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        bonusStatusATK: bonusStatusATK + ATK_INCREASE,
      },
      modifiers: {
        ...character.modifiers,
        class: classATK + ATK_PERCENT_INCREASE,
      },
      MATK: {
        ...character.MATK,
        bonusStatusMATK: bonusStatusMATK + ATK_INCREASE,
        matkPercent: matkPercent + ATK_PERCENT_INCREASE,
      },
      buffs: [...character.buffs, "limitedPowerBooster"],
    };
  },
  infinityDrink: (character: Character) => {
    const {
      modifiers: { ranged, critical, skillProperty },
    } = character;
    const MODIFIER_INCREASE = 5;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        critical: critical + MODIFIER_INCREASE,
        ranged: ranged + MODIFIER_INCREASE,
        skillProperty: skillProperty + MODIFIER_INCREASE,
      },
      buffs: [...character.buffs, "infinityDrink"],
    };
  },
  sacredDraught: (character: Character) => {
    const {
      modifiers: { class: classATK },
      MATK: { matkPercent }
    } = character;
    const ATK_PERCENT_INCREASE = 3;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        class: classATK + ATK_PERCENT_INCREASE,
      },
      MATK: {
        ...character.MATK,
        matkPercent: matkPercent + ATK_PERCENT_INCREASE,
      },
      buffs: [...character.buffs, "sacredDraught"],
    };
  },
  runeStrawberryCake: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "runeStrawberryCake"] };
  },
  investigate: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "investigate"] };
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
      ATK: { weaponBuffATK },
    } = character;
    const ATK_INCREASE = 70;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        weaponBuffATK: weaponBuffATK + ATK_INCREASE,
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
  moonSlasher: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "moonSlasher"] };
  },
  shieldSpell: (character: Character) => {
    const {
      ATK: { weaponBuffATK },
    } = character;
    const ATK_INCREASE = 150;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        weaponBuffATK: weaponBuffATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "shieldSpell"],
    };
  },
  inspiration: (character: Character) => {
    const {
      stats,
      hp,
      ATK: { weaponBuffATK },
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
        weaponBuffATK: weaponBuffATK + ATK_INCREASE,
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
  attackStance: (character: Character) => {
    const {
      ATK: { patk },
      MATK: { smatk }
    } = character;
    const ATK_INCREASE = 15;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        patk: patk + ATK_INCREASE,
      },
      MATK: {
        ...character.MATK,
        smatk: smatk + ATK_INCREASE,
      },
      buffs: [...character.buffs, "attackStance"],
    };
  },
  shieldShooting: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "shieldShooting"] };
  },
  grandJudgment: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "grandJudgment"] };
  },
  holyShield: (character: Character) => {
    const {
      modifiers: { skillProperty }
    } = character;
    const MODIFIER_INCREASE = 15;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        skillProperty: skillProperty + (character.weapon.element === 'Holy' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "holyShield"],
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
  cloaking: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "cloaking"] };
  },
  potentVenom: (character: Character) => {
    const { traitBypass } = character;
    const MODIFIER_INCREASE = 30;
    return {
      ...character,
      traitBypass: traitBypass +  MODIFIER_INCREASE,
      buffs: [...character.buffs, "potentVenom"],
    };
  },
  shadowExceed: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "shadowExceed"] };
  },
  autoShadowSpell: (character: Character) => {
    const {  MATK: { buffMATK } } = character;
    const MATK_INCREASE = 50;
    return {
      ...character,
      MATK: {
        ...character.MATK,
        buffMATK: buffMATK + MATK_INCREASE
      },
      buffs: [...character.buffs, "autoShadowSpell"],
    };
  },
  abyssDagger: (character: Character) => {
    return {
      ...character,
      buffs: [...character.buffs, "abyssDagger"],
    };
  },
  abyssSlayer: (character: Character) => {
    const { ATK: { patk }, MATK: { smatk } } = character;
    const MODIFIER_INCREASE = 30;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        patk: patk + MODIFIER_INCREASE
      },
      MATK: {
        ...character.MATK,
        smatk: smatk + MODIFIER_INCREASE
      },
      buffs: [...character.buffs, "abyssSlayer"],
    };
  },
  // Merchant
  loudExclamation: (character: Character) => {
    const {
      ATK: { weaponBuffATK },
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
        weaponBuffATK: weaponBuffATK + ATK_INCREASE,
      },
      buffs: [...character.buffs, "loudExclamation"],
    };
  },
  overThrust: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "overThrust"] };
  },
  maximumOverThrust: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "maximumOverThrust"] };
  },
  powerMaximize: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "powerMaximize"] };
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
      ATK: { weaponBuffATK },
    } = character;
    const ATK_INCREASE = 450;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        weaponBuffATK: weaponBuffATK + ATK_INCREASE,
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
  researchReport: (character: Character, monster: Monster) => {
    return { ...character, buffs: [...character.buffs, "researchReport"] };
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
  intenseTelekinesis: (character: Character) => {
    const {
      modifiers: { dmg }
    } = character;
    const MODIFIER_INCREASE = 200;
  
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        dmg: dmg + (character.weapon.element === 'Ghost' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "intenseTelekinesis"],
    };
  },
  climax: (character: Character) => {
    return {
      ...character,
      buffs: [...character.buffs, "climax"],
    };
  },
  seismicPower: (character: Character) => {
    const {
      modifiers: { skillProperty }
    } = character;
    const MODIFIER_INCREASE = 5;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        skillProperty: skillProperty + (character.weapon.element === 'Earth' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "seismicPower"],
    };
  },
  frostWeapon: (character: Character) => {
    const {
      modifiers: { skillProperty }
    } = character;
    const MODIFIER_INCREASE = 5;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        skillProperty: skillProperty + (character.weapon.element === 'Water' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "frostWeapon"],
    };
  },
  lightningLoader: (character: Character) => {
    const {
      modifiers: { skillProperty }
    } = character;
    const MODIFIER_INCREASE = 5;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        skillProperty: skillProperty + (character.weapon.element === 'Wind' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "lightningLoader"],
    };
  },
  flameLauncher: (character: Character) => {
    const {
      modifiers: { skillProperty }
    } = character;
    const MODIFIER_INCREASE = 5;
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        skillProperty: skillProperty + (character.weapon.element === 'Fire' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "flameLauncher"],
    };
  },
  deluge: (character: Character) => {
    const {
      modifiers: { dmg }
    } = character;
    const MODIFIER_INCREASE = 20;
  
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        dmg: dmg + (character.weapon.element === 'Water' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "deluge"],
    };
  },
  violentGale: (character: Character) => {
    const {
      modifiers: { dmg }
    } = character;
    const MODIFIER_INCREASE = 20;
  
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        dmg: dmg + (character.weapon.element === 'Wind' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "violentGale"],
    };
  },
  volcano: (character: Character) => {
    const {
      ATK: { weaponBuffATK },
      MATK: { buffMATK },
      modifiers: { dmg }
    } = character;
    const MODIFIER_INCREASE = 20;
    const ATK_INCREASE = 30;
  
    return {
      ...character,
      ATK: {
        ...character.ATK,
        weaponBuffATK: weaponBuffATK + ATK_INCREASE
      },
      MATK: {
        ...character.MATK,
        buffMATK: buffMATK + ATK_INCREASE
      },
      modifiers: {
        ...character.modifiers,
        dmg: dmg + (character.weapon.element === 'Fire' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "volcano"],
    };
  },
  earthInsigniaLv2: (character: Character) => {
    const {
      modifiers: { class: classATK }
    } = character;
    const CLASS_ATK_INCREASE = 10;
  
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        class: classATK + CLASS_ATK_INCREASE,
      },
      buffs: [...character.buffs, "earthInsigniaLv2"],
    };
  },
  earthInsigniaLv3: (character: Character) => {
    const {
      modifiers: { dmg }
    } = character;
    const MODIFIER_INCREASE = 25;
  
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        dmg: dmg + (character.weapon.element === 'Earth' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "earthInsigniaLv3"],
    };
  },
  waterInsigniaLv2: (character: Character) => {
    const {
      modifiers: { class: classATK }
    } = character;
    const CLASS_ATK_INCREASE = 10;
  
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        class: classATK + CLASS_ATK_INCREASE,
      },
      buffs: [...character.buffs, "waterInsigniaLv2"],
    };
  },
  waterInsigniaLv3: (character: Character) => {
    const {
      modifiers: { dmg }
    } = character;
    const MODIFIER_INCREASE = 25;
  
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        dmg: dmg + (character.weapon.element === 'Water' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "waterInsigniaLv3"],
    };
  },
  windInsigniaLv2: (character: Character) => {
    const {
      modifiers: { class: classATK }
    } = character;
    const CLASS_ATK_INCREASE = 10;
  
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        class: classATK + CLASS_ATK_INCREASE,
      },
      buffs: [...character.buffs, "windInsigniaLv2"],
    };
  },
  windInsigniaLv3: (character: Character) => {
    const {
      modifiers: { dmg }
    } = character;
    const MODIFIER_INCREASE = 25;
  
    return {
      ...character,
      modifiers: {
        ...character.modifiers,
        dmg: dmg + (character.weapon.element === 'Wind' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "windInsigniaLv3"],
    };
  },
  fireInsigniaLv2: (character: Character) => {
    const {
      ATK: { weaponBuffATK },
      modifiers: { class: classATK }
    } = character;
    const ATK_INCREASE = 50;
    const CLASS_ATK_INCREASE = 10;
  
    return {
      ...character,
      ATK: {
        ...character.ATK,
        weaponBuffATK: weaponBuffATK + ATK_INCREASE,
      },
      modifiers: {
        ...character.modifiers,
        class: classATK + CLASS_ATK_INCREASE,
      },
      buffs: [...character.buffs, "fireInsigniaLv2"],
    };
  },
  fireInsigniaLv3: (character: Character) => {
    const {
      MATK: { buffMATK },
      modifiers: { dmg }
    } = character;
    const MATK_INCREASE = 50;
    const MODIFIER_INCREASE = 25;
  
    return {
      ...character,
      MATK: {
        ...character.MATK,
        buffMATK: buffMATK + MATK_INCREASE,
      },
      modifiers: {
        ...character.modifiers,
        dmg: dmg + (character.weapon.element === 'Fire' ? MODIFIER_INCREASE : 0),
      },
      buffs: [...character.buffs, "fireInsigniaLv3"],
    };
  },
  striking: (character: Character) => {
    const {
      ATK: { weaponBuffATK },
    } = character;
    const ATK_INCREASE = 100;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        weaponBuffATK: weaponBuffATK + ATK_INCREASE,
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
      ATK: { weaponBuffATK },
      MATK: { buffMATK },
    } = character;
    const ATK_INCREASE = 100;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        weaponBuffATK: weaponBuffATK + ATK_INCREASE,
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
  risingDragon: (character: Character) => {
    const {
      ATK: { masteryATK },
      hp: { percent: percentHP },
      sp: { percent: percentSP },
    } = character;
    const ATK_PER_SPHERE = 3;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        masteryATK: masteryATK + ATK_PER_SPHERE * 10,
      },
      hp: {
        ...character.hp,
        percent: percentHP + 10,
      },
      sp: {
        ...character.sp,
        percent: percentSP + 10,
      },
      buffs: [...character.buffs, "risingDragon"],
    };
  },
  gentleTouchRevitalize: (character: Character) => {
    const {
      hp: { percent: percentHP },
      modifiers: { skill }
    } = character;
    const SKILL_MODIFIER = 30;
    return {
      ...character,
      hp: {
        ...character.hp,
        percent: percentHP + 10,
      },
      modifiers: {
        ...character.modifiers,
        skill: skill + (['TIGER_CANNON', 'TIGER_CANNON_COMBO'].includes(character.skill) ? SKILL_MODIFIER : 0),
      },
      buffs: [...character.buffs, "gentleTouchRevitalize"],
    };
  },
  firmFaith: (character: Character) => {
    const {
      hp: { percent }
    } = character;
    const HP_INCREASE = 10;
    return {
      ...character,
      hp: {
        ...character.hp,
        percent: percent + HP_INCREASE
      },
      buffs: [...character.buffs, "firmFaith"],
    };
  },
  powerfulFaith: (character: Character) => {
    const {
      ATK: { weaponBuffATK, patk },
    } = character;
    const ATK_INCREASE = 30;
    const PATK_INCREASE = 15;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        weaponBuffATK: weaponBuffATK + ATK_INCREASE,
        patk: patk + PATK_INCREASE
      },
      buffs: [...character.buffs, "powerfulFaith"],
    };
  },
  // Ninja
  fireCharm: (character: Character, monster: Monster, isMATK: boolean) => {
    const { modifiers } = character;
    const INCREASED_PROPERTY_DAMAGE = 30;
    return {
      ...character,
      modifiers: {
        ...modifiers,
        targetProperty:
          monster.element === ELEMENTS[2] && !isMATK
            ? modifiers.targetProperty + INCREASED_PROPERTY_DAMAGE
            : modifiers.targetProperty,
      },
      buffs: [...character.buffs, "fireCharm"],
    };
  },
  iceCharm: (character: Character, monster: Monster, isMATK: boolean) => {
    const { modifiers } = character;
    const INCREASED_PROPERTY_DAMAGE = 30;
    return {
      ...character,
      modifiers: {
        ...modifiers,
        targetProperty:
          monster.element === ELEMENTS[3] && !isMATK
            ? modifiers.targetProperty + INCREASED_PROPERTY_DAMAGE
            : modifiers.targetProperty,
      },
      buffs: [...character.buffs, "iceCharm"],
    };
  },
  windCharm: (character: Character, monster: Monster, isMATK: boolean) => {
    const { modifiers } = character;
    const INCREASED_PROPERTY_DAMAGE = 30;
    return {
      ...character,
      modifiers: {
        ...modifiers,
        targetProperty:
          monster.element === ELEMENTS[1] && !isMATK
            ? modifiers.targetProperty + INCREASED_PROPERTY_DAMAGE
            : modifiers.targetProperty,
      },
      buffs: [...character.buffs, "windCharm"],
    };
  },
  earthCharm: (character: Character, monster: Monster, isMATK: boolean) => {
    const { modifiers } = character;
    const INCREASED_PROPERTY_DAMAGE = 30;
    // Also increases totalWeaponATk by 15% per charm (150% total)
    return {
      ...character,
      modifiers: {
        ...modifiers,
        targetProperty:
          monster.element === ELEMENTS[4] && !isMATK
            ? modifiers.targetProperty + INCREASED_PROPERTY_DAMAGE
            : modifiers.targetProperty,
      },
      buffs: [...character.buffs, "earthCharm"],
    };
  },
  shadowWarrior: (character: Character) => {
    return { ...character, buffs: [...character.buffs, "shadowWarrior"] };
  },
  sixteenthNight: (character: Character) => {
    const {
      MATK: { buffMATK },
    } = character;
    const MATK_INCREASE = 125;
    return {
      ...character,
      MATK: {
        ...character.MATK,
        buffMATK: buffMATK + MATK_INCREASE,
      },
      buffs: [...character.buffs, "sixteenthNight"],
    };
  },
  distorcedCrescent: (character: Character) => {
    const {
      MATK: { buffMATK },
    } = character;
    const MATK_INCREASE = (Math.floor(character.baseLevel / 3) * 2 + 200);
    return {
      ...character,
      MATK: {
        ...character.MATK,
        buffMATK: buffMATK + MATK_INCREASE,
      },
      buffs: [...character.buffs, "distorcedCrescent"],
    };
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
    const { ATK: { weaponBuffATK } } = character;
    const ATK_INCREASE = 150;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        weaponBuffATK: weaponBuffATK + ATK_INCREASE,
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
      ATK: { weaponBuffATK },
    } = character;
    const ATK_INCREASE = 50;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        weaponBuffATK: weaponBuffATK + ATK_INCREASE,
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
      ATK: { weaponBuffATK },
      MATK: { buffMATK },
    } = character;
    const ATK_INCREASE = 100;
    const MATK_INCREASE = 100;
    return {
      ...character,
      ATK: {
        ...character.ATK,
        weaponBuffATK: weaponBuffATK + ATK_INCREASE,
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
  buffs: Buffs,
  isMATK: boolean,
) {
  let buffedCharacter = deepCopy(character) as Character;

  Object.keys(BUFF_EFFECTS).forEach((key) => {
    if (!buffs[key as keyof Buffs]?.active) return;
    const effect = BUFF_EFFECTS[key as keyof Buffs];
    buffedCharacter = effect(buffedCharacter, monster, isMATK);
  });

  return buffedCharacter;
}
