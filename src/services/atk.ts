import {
  BuildInfo,
} from "../data/input";
import WeaponType, { GRADES, Weapon, WEAPON_PENALTIES } from "../data/weapon";
import { ELEMENTS, getPropertyModifier } from "../data/element";
import { getSkill } from "../data/skills";
import { applyBuffs } from "../data/buffs";
import { applyDebuff } from "../data/debuff";
import { Character, Stats } from "../data/character";
import { Monster, Size } from "../data/monster";
export type DmgRange = "MIN" | "MAX";

const DEX_WEAPONS: WeaponType[] = ["Whip", "Instrument", "Bow", "Pistol", "Rifle", "Shotgun", "Gatling Gun", "Grenade Launcher"];

const BASE_CRITICAL_DAMAGE = 40;
const RES_REDUCTION_CAP = 625;
const KIHOP_BONUS = 85;

function isDexWeapon(weaponType: WeaponType) {
  return DEX_WEAPONS.includes(weaponType);
}

function getStatusATK(character: Character) {
  const { stats, traits, baseLevel, weapon, ATK: { bonusStatusATK } } = character;
  const { str, dex, luk } = stats;
  const { pow } = traits;

  // elemental advantage is always 1, unless using warm wind
  const propertyModifier = 1;

  const mainStatBonus = isDexWeapon(weapon.type)
    ? dex + str / 5
    : str + dex / 5;

  const baseStatusATK = Math.floor(
    (baseLevel / 4 + mainStatBonus + luk / 3 + bonusStatusATK + pow * 5) *
      propertyModifier
  );
  return baseStatusATK;
}

function getRefineBonus(weapon: Weapon) {
  const { refine, level, grade } = weapon;
  const atkPerGrade = [8, 8.8, 10.4, 12, 16];
  const atkPerRefine = [2, 3, 5, 7, atkPerGrade[GRADES.indexOf(grade)]];

  // ATK per refine > 15
  const AtkPerHighUpgrade = [3, 6, 9, 12, 0];
  const overRefine = Math.max(0, refine - 15);
  const highUpgradeBonus = overRefine * AtkPerHighUpgrade[level - 1];
  return Math.floor(refine * atkPerRefine[level - 1] + highUpgradeBonus);
}

function getMaxOverUpgradeBonus(weapon: Weapon) {
  const { level, refine } = weapon;
  const safetyLimit = [7, 6, 5, 4, 3];
  // ATK per refine > safetyLimit
  const maxAtkPerOverUpgrade = [3, 5, 8, 14, 0];
  const overRefine = Math.max(0, refine - safetyLimit[level - 1]);
  return overRefine * maxAtkPerOverUpgrade[level - 1];
}

function getStatBonus(weapon: Weapon, stats: Stats) {
  const { atk, type } = weapon;
  const { dex, str } = stats;
  return atk * (isDexWeapon(type) ? dex / 200 : str / 200);
}

function getWeaponATK(
  range: DmgRange,
  character: Character,
  sizePenalty: number,
  monster: Monster
) {
  const { weapon, stats, shadowWeaponRefine } = character;

  const statBonus = getStatBonus(weapon, stats);
  const refineATK = getRefineBonus(weapon) + shadowWeaponRefine;

  let variance = 0.05 * weapon.level * weapon.atk;
  let overUpgradeATK;

  if (range === "MIN") {
    overUpgradeATK = 0;
    variance *= -1;
  } else {
    overUpgradeATK = Math.max(1, getMaxOverUpgradeBonus(weapon));
  }

  overUpgradeATK = weapon.type === "Bare Hand" ? 0 : overUpgradeATK;

  let totalWeaponATK =
    weapon.atk + variance + statBonus + refineATK + overUpgradeATK;

  let increasedTotalWeaponATK = 0;

  if (character.buffs.includes('enchantDeadlyPoison')) {
    increasedTotalWeaponATK += getModifierIncrease(totalWeaponATK, 400);
  }

  if (character.buffs.includes('earthCharm')) {
    increasedTotalWeaponATK += getModifierIncrease(totalWeaponATK, 150);
  }

  if (character.buffs.includes('concentration')) {
    increasedTotalWeaponATK += getModifierIncrease(totalWeaponATK, 15);
  }

  totalWeaponATK += increasedTotalWeaponATK;

  return applyCardModifiers(
    Math.floor(totalWeaponATK * sizePenalty),
    character,
    monster
  );
}

function getExtraATK(character: Character, monster: Monster) {
  let { ATK: { equipATK, consumableATK, ammoATK, pseudoBuffATK }, stats } = character;

  let increasedEquipATK = 0;

  if (character.buffs.includes('concentration')) {
    increasedEquipATK += getModifierIncrease(equipATK, 15);
  }

  if (character.job === "Sky Emperor") {
    increasedEquipATK += getModifierIncrease(equipATK, KIHOP_BONUS);

    let OPPOSITION_BONUS = character.buffs.includes("opposition")
    ? (character.baseLevel +
        stats.dex +
        stats.luk +
        (monster.size === "large" || character.buffs.includes('miracle') ? stats.str : 0)) /
      3
    : 0;
    increasedEquipATK += getModifierIncrease(equipATK + increasedEquipATK, OPPOSITION_BONUS);
  }

  equipATK += increasedEquipATK

  let extraATK = applyCardModifiers(
    Math.floor(equipATK + consumableATK + ammoATK + pseudoBuffATK),
    character,
    monster
  );

  extraATK = applyModifier(extraATK, character.buffs.includes('enchantDeadlyPoison') ? 300 : 0);

  return extraATK;
}

function getSizePenalty(weaponType: WeaponType, monsterSize: Size) {
  const penalties = WEAPON_PENALTIES[weaponType] ?? {
    small: 1,
    medium: 1,
    large: 1,
  };
  return penalties[monsterSize];
}

function applyCardModifiers(
  atk: number,
  character: Character,
  monster: Monster
) {
  let {
    race,
    size,
    targetProperty,
    monster: monsterType,
    class: targetClass,
    advancedKatarMastery,
  } = character.modifiers;

  // substituir pelo calculo de elemento da arma VS elemento do monstro
  const property = getPropertyModifier(
    character.weapon.element,
    monster.element,
    Number(monster.elementLevel),
    monster.debuffs
  );

  let finalModifiers = 1000;
  finalModifiers *= 1 + race / 100;
  finalModifiers *= 1 + size / 100;
  finalModifiers *= 1 + targetProperty / 100;
  finalModifiers *= 1 + monsterType / 100;
  finalModifiers *= 1 + targetClass / 100;
  finalModifiers *= 1 + advancedKatarMastery / 100;
  finalModifiers *= property;
  finalModifiers /= 1000;

  return Math.floor(atk * finalModifiers);
}

function applyModifier(damage: number, mod: number) {
  return Math.floor(damage * (1 + mod / 100));
}

function getModifierIncrease(damage: number, mod: number) {
  return Math.floor(Math.floor(damage * (1 + mod / 100)) - damage);
}

function getATK(range: DmgRange, character: Character, monster: Monster) {
  let { ATK: { masteryATK, buffATK }, stats } = character;

  const sizePenalty = !character.ignorePenalty
    ? getSizePenalty(character.weapon.type, monster.size)
    : 1;
  let wATK = Math.max(0, getWeaponATK(range, character, sizePenalty, monster));

  let extraElementalATK = 0;
  if (character.buffs.includes("magnumBreak")) {
    // Fire property extra dmg
    extraElementalATK =
      getModifierIncrease(wATK, 20) *
      getPropertyModifier(
        ELEMENTS[3],
        monster.element,
        Number(monster.elementLevel),
        monster.debuffs
      );
  }
  wATK += extraElementalATK;

  let statusATK = getStatusATK(character);

  let OPPOSITION_BONUS = character.buffs.includes("opposition")
    ? (character.baseLevel +
        stats.dex +
        stats.luk +
        (monster.size === "large" || character.buffs.includes('miracle') ? stats.str : 0)) /
      3
    : 0;

  if (character.job === "Sky Emperor") {
    statusATK = applyModifier(
      statusATK,
      KIHOP_BONUS // Kihop lv 5
    );
  
    statusATK = applyModifier(
      statusATK,
      OPPOSITION_BONUS // Opposition
    );
  
    wATK = applyModifier(
      wATK,
      KIHOP_BONUS // Kihop lv 5
    );
  
    wATK = applyModifier(
      wATK,
      OPPOSITION_BONUS // Opposition
    );
  
    masteryATK = applyModifier(
      masteryATK,
      KIHOP_BONUS // Kihop lv 5
    );
  
    masteryATK = applyModifier(
      masteryATK,
      OPPOSITION_BONUS // Opposition
    );
  }

  const extraATK = getExtraATK(character, monster);

  return (
    statusATK * 2 +
    wATK +
    extraATK +
    masteryATK +
    buffATK
  );
}

function getSoftDEF(monster: Monster) {
  return Math.floor((monster.baseLevel + monster.VIT) / 2);
}

function getHardDEF(monster: Monster, bypass: number) {
  const { hardDEF, hardDEFDebuff } = monster;
  const finalHardDef = (hardDEF - hardDEFDebuff) * (1 - bypass / 100);
  return (finalHardDef + 4000) / (4000 + finalHardDef * 10);
}

function getRES(monster: Monster, traitBypass: number) {
  let { res } = monster;
  res -= res * traitBypass / 100;
  return res > RES_REDUCTION_CAP ? 0.5 : (res + 5000) / (5000 + res * 10);
}

function getDEF(character: Character, monster: Monster) {
  const { traitBypass, bypass, skill: skillName, weapon: { type: weaponType }} = character;

  const RES = getRES(monster, traitBypass);
  const hardDEF = getHardDEF(monster, bypass);
  const softDEF = getSoftDEF(monster);
  const skill = getSkill(skillName);

  // Bypass when using specific weapon
  if (['ONLY_ONE_BULLET'].includes(skill.key) && ['Pistol'].includes(weaponType)) {
    return { RES, hardDEF: 1, softDEF: softDEF + monster.hardDEF };
  }

  if (['THE_VIGILANTE_AT_NIGHT'].includes(skill.key) && ['Gatling Gun'].includes(weaponType)) {
    return { RES, hardDEF: 1, softDEF: softDEF + monster.hardDEF };
  }

  if (skill.hardAsSoftDef) {
    return { RES, hardDEF: 1, softDEF: softDEF + monster.hardDEF };
  }

  return { RES, hardDEF, softDEF };
}

function applyCritical(damage: number, character: Character) {
  let finalDamage = applyModifier(damage, BASE_CRITICAL_DAMAGE + character.ATK.crate);
  finalDamage = applyModifier(finalDamage, character.modifiers.critical / 2);
  return finalDamage;
}

export function getFinalATKDamage(range: DmgRange, build: BuildInfo) {
  const { character: rawCharacter, monster: rawMonster, buffs, debuffs } = build;
  const buffedCharacter = applyBuffs(rawCharacter, rawMonster, buffs);
  const { character, monster } = applyDebuff(buffedCharacter, rawMonster, debuffs);
  const skill = getSkill(character.skill);
  const { modifiers: mods } = character;
  const formula = skill.formula(character, monster, build.buffs);

  const rangeMod = skill.isMelee ? mods.melee : mods.ranged;
  const atk = getATK(character.crit ? "MAX" : range, character, monster);
  const { RES, hardDEF, softDEF } = getDEF(
    character,
    monster
  );

  let finalDmg = Math.floor(atk * (formula.percent / 100));
  finalDmg = applyModifier(finalDmg, mods.skill);
  finalDmg = applyModifier(finalDmg, mods.custom);
  finalDmg = applyModifier(finalDmg, rangeMod);
  finalDmg = applyModifier(finalDmg, mods.dmg);

  finalDmg = Math.floor(finalDmg * RES);
  finalDmg = Math.floor(finalDmg * hardDEF) - softDEF;
  
  finalDmg = applyModifier(finalDmg, mods.finalDmg);
  finalDmg = character.crit ? applyCritical(finalDmg, character) : finalDmg;
  finalDmg = Math.max(0, finalDmg) + Math.max(0, applyModifier(formula.bonus, mods.finalDmg))
  finalDmg = applyModifier(
    finalDmg,
    skill.isMelee ? monster.meleeModifier : monster.rangedModifier
  );

  finalDmg = applyModifier(finalDmg, character.ATK.patk);

  let monsterFinalPropertyModifier = monster.finalPropertyModifier;
  if (monster.debuffs.includes("violentQuake") && character.weapon.element === "Earth") {
    monsterFinalPropertyModifier += 100;
  } else if (monster.debuffs.includes("allBloom") && character.weapon.element === "Fire") {
    monsterFinalPropertyModifier += 100;
  } else if (monster.debuffs.includes("soulCurse") && character.weapon.element === "Shadow") {
    monsterFinalPropertyModifier = ((1 + monsterFinalPropertyModifier / 100) * (monster.type === 'normal' ? 2 : 1.2)) * 100;
  }

  finalDmg = applyModifier(finalDmg, monsterFinalPropertyModifier);
  finalDmg = applyModifier(finalDmg, monster.finalModifier);

  return {
    damage: Math.floor(finalDmg),
    modifiedCharacter: character,
  };
}
