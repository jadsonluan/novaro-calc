import {
  BuildInfo,
  Character,
  Monster,
  Size,
  Stats,
  Weapon,
} from "../data/input";
import WeaponType, { WEAPON_PENALTIES } from "../data/weapon";
import { ELEMENTS, getPropertyModifier } from "../data/element";
import { getSkill } from "../data/skills";
import { applyBuffs } from "../data/buffs";
export type DmgRange = "MIN" | "MAX";

const DEX_WEAPONS: WeaponType[] = ["Whip", "Instrument", "Bow", "Gun"];

const BASE_CRITICAL_DAMAGE = 40;

function isDexWeapon(weaponType: WeaponType) {
  return DEX_WEAPONS.includes(weaponType);
}

function getStatusATK(character: Character) {
  const { stats, baseLevel, weapon, bonusStatusATK } = character;
  const { str, dex, luk } = stats;

  // vantagem elemental. sempre neutro a não ser que use warm wind
  const propertyModifier = 1;

  const mainStatBonus = isDexWeapon(weapon.type)
    ? dex + str / 5
    : str + dex / 5;

  const baseStatusATK = Math.floor(
    (baseLevel / 4 + mainStatBonus + luk / 3 + bonusStatusATK) *
      propertyModifier
  );
  return baseStatusATK;
}

function getRefineBonus(weapon: Weapon) {
  const { refine, level } = weapon;
  const atkPerRefine = [2, 3, 5, 7];

  // ATK per refine > 15
  const AtkPerHighUpgrade = [3, 6, 9, 12];
  const overRefine = Math.max(0, refine - 15);
  const highUpgradeBonus = overRefine * AtkPerHighUpgrade[level - 1];
  return refine * atkPerRefine[level - 1] + highUpgradeBonus;
}

function getMaxOverUpgradeBonus(weapon: Weapon) {
  const { level, refine } = weapon;
  const safetyLimit = [7, 6, 5, 4];
  // ATK per refine > safetyLimit
  const maxAtkPerOverUpgrade = [3, 5, 8, 14];
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

  totalWeaponATK = character.buffs.includes('earthCharm') ? totalWeaponATK * 2.5 : totalWeaponATK;

  return applyCardModifiers(
    Math.floor(totalWeaponATK * sizePenalty),
    character,
    monster
  );
}

function getExtraATK(character: Character, monster: Monster) {
  const { equipATK, consumableATK, ammoATK, pseudoBuffATK } = character;

  const finalEquipATK = applyModifier(
    equipATK,
    character.job === "Star Emperor" ? 85 : 0
  );

  return applyCardModifiers(
    finalEquipATK + consumableATK + ammoATK + pseudoBuffATK,
    character,
    monster
  );
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
    Number(monster.elementLevel)
  );

  targetProperty = character.buffs.includes('earthCharm') && monster.element === ELEMENTS[4] ? targetProperty + 30 : targetProperty

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

function getATK(range: DmgRange, character: Character, monster: Monster) {
  const { masteryATK, buffATK } = character;

  const sizePenalty = !character.ignorePenalty ? getSizePenalty(character.weapon.type, monster.size) : 1;
  const wATK = Math.max(
    0,
    getWeaponATK(range, character, sizePenalty, monster)
  );

  const _statusATK = getStatusATK(character);

  const statusATK = applyModifier(
    _statusATK,
    character.job === "Star Emperor" ? 85 : 0
  );

  const extraATK = getExtraATK(character, monster);

  return (
    statusATK * 2 +
    applyModifier(wATK, character.job === "Star Emperor" ? 85 : 0) +
    extraATK +
    applyModifier(masteryATK, character.job === "Star Emperor" ? 85 : 0) +
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

function getDEF(monster: Monster, bypass: number, skill: string) {
  const hardDEF = getHardDEF(monster, bypass);
  const softDEF = getSoftDEF(monster);

  if (skill === "CART_CANNON") {
    return { hardDEF: 1, softDEF: softDEF + hardDEF };
  }

  return { hardDEF, softDEF };
}

function applyCritical(damage: number, character: Character) {
  let finalDamage = applyModifier(damage, BASE_CRITICAL_DAMAGE);
  finalDamage = applyModifier(finalDamage, character.modifiers.critical / 2);
  return finalDamage;
}

export function getFinalDamage(range: DmgRange, build: BuildInfo) {
  const { character: rawCharacter, monster, buffs } = build;
  const character = applyBuffs(rawCharacter, buffs);
  const skill = getSkill(character.skill);
  const { modifiers: mods } = character;
  const formula = skill.formula(character, monster, build.buffs);

  const rangeMod = skill.isMelee ? mods.melee : mods.ranged;
  const atk = getATK(character.crit ? "MAX" : range, character, monster);
  const { hardDEF, softDEF } = getDEF(
    monster,
    character.bypass,
    character.skill
  );

  let finalDmg = Math.floor(atk * (formula.percent / 100));
  finalDmg = applyModifier(finalDmg, mods.skill);
  finalDmg = applyModifier(finalDmg, mods.custom);
  finalDmg = applyModifier(finalDmg, rangeMod);
  finalDmg = applyModifier(finalDmg, mods.dmg);
  finalDmg = Math.floor(finalDmg * hardDEF) - softDEF;
  finalDmg = applyModifier(finalDmg, mods.finalDmg);
  finalDmg = character.crit ? applyCritical(finalDmg, character) : finalDmg;
  return (
    Math.max(0, finalDmg) +
    Math.max(0, applyModifier(formula.bonus, mods.finalDmg))
  );
}
