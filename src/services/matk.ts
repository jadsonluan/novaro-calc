import {
  BuildInfo,
} from "../data/input";
import { getPropertyModifier } from "../data/element";
import { getSkill } from "../data/matkSkills";
import { applyBuffs } from "../data/buffs";
import { applyDebuff } from "../data/debuff";
import { Character } from "../data/character";
import { Monster } from "../data/monster";
import { GRADES, Weapon } from "../data/weapon";
export type DmgRange = "MIN" | "MAX";

const MRES_REDUCTION_CAP = 625;

export function getEquipMATK (character: Character, totalMATK: number) {
  const matkPercentMultiplier = (character.MATK.matkPercent - 100);

  let statusMATK = getStatusMATK(character);
  statusMATK = Math.round(applyModifier(statusMATK, matkPercentMultiplier));

  let nonStatusMATK = totalMATK - statusMATK;
  nonStatusMATK = Math.round(nonStatusMATK / (1 + matkPercentMultiplier / 100));
  nonStatusMATK -= character.weapon.matk + getRefineBonus(character.weapon);
  nonStatusMATK -= character.shadowWeaponRefine;

  return Math.max(0, nonStatusMATK);
}

function getStatusMATK(character: Character) {
  const { stats, traits, baseLevel, MATK: { bonusStatusMATK = 0 } } = character;
  const { int, dex, luk } = stats;
  const { spl } = traits;


  let baseStatusMATK = Math.floor(
    Math.floor(
      Math.floor(baseLevel / 4) +
      int +
      Math.floor(int / 2) +
      Math.floor(dex / 5) +
      Math.floor(luk / 3) +
      spl * 5
    ) + bonusStatusMATK
  );
  baseStatusMATK = applyModifier(baseStatusMATK, character.MATK.smatk);

  return baseStatusMATK;
}

function getRefineBonus(weapon: Weapon) {
  const { refine, level, grade } = weapon;
  const matkPerGrade = [8, 8.8, 10.4, 12, 16];
  const matkPerRefine = [2, 3, 5, 7, matkPerGrade[GRADES.indexOf(grade)]];

  const AtkPerHighUpgrade = [3, 6, 9, 12, 0];
  const overRefine = Math.max(0, refine - 15);
  const highUpgradeBonus = overRefine * AtkPerHighUpgrade[level - 1];
  return Math.floor(refine * matkPerRefine[level - 1] + highUpgradeBonus);
}

function getMaxOverUpgradeBonus(weapon: Weapon) {
  const { level, refine } = weapon;
  const safetyLimit = [7, 6, 5, 4, 3];
  const maxAtkPerOverUpgrade = [3, 5, 8, 14, 0];
  const overRefine = Math.max(0, refine - safetyLimit[level - 1]);
  return overRefine * maxAtkPerOverUpgrade[level - 1];
}

function getWeaponMATK(
  range: DmgRange,
  character: Character
) {
  const { weapon, shadowWeaponRefine } = character;

  const refineMATK = getRefineBonus(weapon) + shadowWeaponRefine;

  let variance = Math.floor((0.1 * weapon.level) * (weapon.matk + refineMATK));
  let overUpgradeMATK;

  if (range === "MIN") {
    overUpgradeMATK = 0;
    variance *= character.buffs.includes('recognizedSpell') ? 1 : -1;
  } else {
    overUpgradeMATK = Math.max(1, getMaxOverUpgradeBonus(weapon));
  }

  overUpgradeMATK = weapon.type === "Bare Hand" ? 0 : overUpgradeMATK;

  let totalWeaponMATK = weapon.matk + variance + refineMATK + overUpgradeMATK;

  let increasedTotalWeaponMATK = 0;

  totalWeaponMATK += increasedTotalWeaponMATK;

  totalWeaponMATK = applyModifier(totalWeaponMATK, character.MATK.smatk);

  return Math.floor(totalWeaponMATK);
}

function getExtraMATK(character: Character, monster: Monster) {
  let { MATK: { equipMATK, consumableMATK, pseudoBuffMATK } } = character;

  let increasedEquipMATK = 0;

  equipMATK += increasedEquipMATK

  let extraMATK = equipMATK + consumableMATK + pseudoBuffMATK;

  extraMATK = applyModifier(extraMATK, character.MATK.smatk);

  return Math.floor(extraMATK);
}

function applyModifiers(
  matk: number,
  character: Character,
  monster: Monster
) {
  let {
    race,
    size,
    targetProperty,
    monster: monsterType,
    skillProperty,
  } = character.modifiers;

  const property = getPropertyModifier(
    character.weapon.element,
    monster.element,
    Number(monster.elementLevel),
    monster.debuffs
  );

  let result = matk;
  result = applyModifier(result, race);
  result = applyModifier(result, size);
  result = applyModifier(result, targetProperty);
  result = applyModifier(result, character.MATK.matkPercent - 100);
  result = applyModifier(result, skillProperty);
  result = applyModifier(result, monsterType);
  result = Math.floor(result * property);

  return result;
}

function applyModifier(damage: number, mod: number) {
  return Math.floor(damage * (1 + mod / 100));
}

function getModifierIncrease(damage: number, mod: number) {
  return Math.floor(Math.floor(damage * (1 + mod / 100)) - damage);
}

function getMATK(range: DmgRange, character: Character, monster: Monster) {
  const { MATK: { buffMATK } } = character;

  let wMATK = Math.max(0, getWeaponMATK(range, character));

  const statusMATK = getStatusMATK(character);

  const extraMATK = getExtraMATK(character, monster);

  return Math.floor(statusMATK + wMATK + extraMATK + buffMATK);
}

function getSoftMDEF(monster: Monster) {
  return Math.floor(monster.baseLevel / 4) + Math.floor(monster.VIT / 10) + Math.floor(monster.INT / 5);
}

function getHardMDEF(monster: Monster, bypass: number) {
  const { hardMDEF, hardMDEFDebuff } = monster;
  const finalHardMdef = (hardMDEF - hardMDEFDebuff) * (1 - bypass / 100);
  return (finalHardMdef + 1000) / (1000 + finalHardMdef * 10);
}

function getMRES(monster: Monster, traitBypass: number) {
  let { mres } = monster;
  mres -= mres * traitBypass / 100;
  return mres > MRES_REDUCTION_CAP ? 0.5 : (mres + 5000) / (5000 + mres * 10);
}

function getMDEF(monster: Monster, bypass: number, traitBypass: number,) {
  const MRES = getMRES(monster, traitBypass);
  const hardMDEF = getHardMDEF(monster, bypass);
  const softMDEF = getSoftMDEF(monster);

  return { MRES, hardMDEF, softMDEF };
}

export function getFinalMATKDamage(range: DmgRange, build: BuildInfo) {
  const { character: rawCharacter, monster: rawMonster, buffs, debuffs } = build;
  const buffedCharacter = applyBuffs(rawCharacter, rawMonster, buffs, true);
  const { character, monster } = applyDebuff(buffedCharacter, rawMonster, debuffs);

  const skill = getSkill(character.skill);
  const { modifiers: mods } = character;
  const formula = skill.formula(character, monster, build.buffs);

  let matk = getMATK(range, character, monster);
  matk = applyModifiers(matk, character, monster);

  const { MRES, hardMDEF, softMDEF } = getMDEF(
    monster,
    character.bypass,
    character.traitBypass,
  );

  let finalDmg = Math.floor((matk * formula.percent) / 100);
  finalDmg = applyModifier(finalDmg, mods.skill);

  finalDmg = Math.floor(finalDmg * MRES);
  finalDmg = Math.floor(finalDmg * hardMDEF) - softMDEF;

  finalDmg = applyModifier(finalDmg, mods.dmg);
  finalDmg = applyModifier(finalDmg, mods.finalDmg);
  finalDmg = applyModifier(finalDmg, mods.custom);

  finalDmg = applyModifier(finalDmg, monster.finalPropertyModifier);
  finalDmg = applyModifier(finalDmg, monster.finalModifier);

  finalDmg = Math.floor(finalDmg * monster.damageMultiplier);

  return {
    damage: Math.floor(finalDmg) + (range === "MIN" ? Math.floor(getModifierIncrease(finalDmg, 0.2)) : Math.floor(getModifierIncrease(finalDmg, -0.2))),
    modifiedCharacter: character,
  };
}
