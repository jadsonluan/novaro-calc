import {
  BuildInfo,
  Character,
  Monster,
  Weapon,
} from "../data/input";
import { getPropertyModifier } from "../data/element";
import { getSkill } from "../data/matkSkills";
import { applyBuffs } from "../data/buffs";
import { applyDebuff } from "../data/debuff";
export type DmgRange = "MIN" | "MAX";

function getStatusMATK(character: Character) {
  const { stats, baseLevel } = character;
  const { int, dex, luk } = stats;


  const baseStatusMATK = Math.floor(Math.floor(baseLevel / 4) + int + Math.floor(int / 2) + Math.floor(dex / 5) + Math.floor(luk / 3));
  return baseStatusMATK;
}

function getRefineBonus(weapon: Weapon) {
  const { refine, level } = weapon;
  const matkPerRefine = [2, 3, 5, 7];

  const AtkPerHighUpgrade = [3, 6, 9, 12];
  const overRefine = Math.max(0, refine - 15);
  const highUpgradeBonus = overRefine * AtkPerHighUpgrade[level - 1];
  return refine * matkPerRefine[level - 1] + highUpgradeBonus;
}

function getMaxOverUpgradeBonus(weapon: Weapon) {
  const { level, refine } = weapon;
  const safetyLimit = [7, 6, 5, 4];
  const maxAtkPerOverUpgrade = [3, 5, 8, 14];
  const overRefine = Math.max(0, refine - safetyLimit[level - 1]);
  return overRefine * maxAtkPerOverUpgrade[level - 1];
}

function getWeaponMATK(
  range: DmgRange,
  character: Character
) {
  const { weapon, shadowWeaponRefine } = character;

  const refineMATK = getRefineBonus(weapon) + shadowWeaponRefine;

  let variance = (0.1 * weapon.level) * (weapon.matk + refineMATK);
  let overUpgradeMATK;

  if (range === "MIN") {
    overUpgradeMATK = 0;
    variance *= character.buffs.includes('recognizedSpell') ? 0 :-1;
  } else {
    overUpgradeMATK = Math.max(1, getMaxOverUpgradeBonus(weapon));
  }

  overUpgradeMATK = weapon.type === "Bare Hand" ? 0 : overUpgradeMATK;

  let totalWeaponMATK = weapon.matk + variance + refineMATK + overUpgradeMATK;

  let increasedTotalWeaponMATK = 0;

  totalWeaponMATK += increasedTotalWeaponMATK;

  return Math.floor(totalWeaponMATK);
}

function getExtraMATK(character: Character, monster: Monster) {
  let { MATK: { equipMATK, consumableMATK, pseudoBuffMATK } } = character;

  let increasedEquipMATK = 0;

  equipMATK += increasedEquipMATK

  let extraMATK = equipMATK + consumableMATK + pseudoBuffMATK;

  return Math.floor(extraMATK);
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
    skillProperty,
  } = character.modifiers;

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
  finalModifiers *= 1 + (targetClass - 100) / 100;
  finalModifiers *= 1 + skillProperty / 100;
  finalModifiers *= 1 + monsterType / 100;
  finalModifiers *= property;

  finalModifiers /= 1000;

  return Math.floor(atk * finalModifiers);
}

function applyModifier(damage: number, mod: number) {
  return Math.floor(damage * (1 + mod / 100));
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

function getMDEF(monster: Monster, bypass: number) {
  const hardMDEF = getHardMDEF(monster, bypass);
  const softMDEF = getSoftMDEF(monster);

  return { hardMDEF, softMDEF };
}

export function getFinalMATKDamage(range: DmgRange, build: BuildInfo) {
  const { character: rawCharacter, monster: rawMonster, buffs, debuffs } = build;
  const buffedCharacter = applyBuffs(rawCharacter, rawMonster, buffs);
  const { character, monster } = applyDebuff(buffedCharacter, rawMonster, debuffs);

  const skill = getSkill(character.skill);
  const { modifiers: mods } = character;
  const formula = skill.formula(character, monster, build.buffs);

  let matk = getMATK(range, character, monster);
  matk = applyCardModifiers(matk, character, monster);

  const { hardMDEF, softMDEF } = getMDEF(
    monster,
    character.bypass,
  );

  let finalDmg = Math.floor(matk * (formula.percent / 100));
  finalDmg = applyModifier(finalDmg, mods.skill);
  finalDmg = Math.floor(finalDmg * hardMDEF) - softMDEF;
  finalDmg = applyModifier(finalDmg, mods.finalDmg);
  finalDmg = applyModifier(finalDmg, mods.custom);
  finalDmg = applyModifier(finalDmg, monster.finalModifier);
  return {
    damage: finalDmg,
    modifiedCharacter: character,
  };
}
