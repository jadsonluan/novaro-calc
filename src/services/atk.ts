import { Character, Monster, Size, Stats, Weapon } from "../data/input";
import WeaponType, { WEAPON_PENALTIES } from "../data/weapon";
import { getPropertyModifier } from "../data/element";
import { getSkill } from "../data/skills";

export type DmgRange = "MIN" | "MAX";

const DEX_WEAPONS: WeaponType[] = ["Whip", "Instrument", "Bow", "Gun"];

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

  return Math.floor(
    (baseLevel / 4 + mainStatBonus + luk / 3 + bonusStatusATK) *
      propertyModifier
  );
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
    overUpgradeATK = 1;
    variance *= -1;
  } else {
    overUpgradeATK = getMaxOverUpgradeBonus(weapon);
  }

  const totalWeaponATK =
    weapon.atk + variance + statBonus + refineATK + overUpgradeATK;

  return applyCardModifiers(
    Math.floor(totalWeaponATK * sizePenalty),
    character,
    monster
  );
}

function getExtraATK(character: Character, monster: Monster) {
  const { equipATK, consumableATK, ammoATK, pseudoBuffATK } = character;
  return applyCardModifiers(
    equipATK + consumableATK + ammoATK + pseudoBuffATK,
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
  const {
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
    monster.elementLevel
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

function getATK(range: DmgRange, character: Character, monster: Monster) {
  const { masteryATK, buffATK } = character;

  const sizePenalty = getSizePenalty(character.weapon.type, monster.size);
  const wATK = getWeaponATK(range, character, sizePenalty, monster);
  const statusATK = getStatusATK(character);

  const extraATK = getExtraATK(character, monster);

  return statusATK * 2 + wATK + extraATK + masteryATK + buffATK;
}

function getSoftDEF(monster: Monster) {
  return Math.floor((monster.baseLevel + monster.VIT) / 2);
}

function getHardDEF(monster: Monster, bypass: number) {
  const { hardDEF, hardDEFDebuff } = monster;
  const finalHardDef = (hardDEF - hardDEFDebuff) * (1 - bypass / 100);
  return (finalHardDef + 4000) / (4000 + finalHardDef * 10);
}

export function getFinalDamage(
  range: DmgRange,
  character: Character,
  monster: Monster
) {
  const { modifiers: mods } = character;
  let skill = getSkill(character.skill);

  const formula = skill.formula(character, monster);

  const rangeMod = skill.isMelee ? mods.melee : mods.ranged;
  const atk = getATK(range, character, monster);
  const hardDEF = getHardDEF(monster, character.bypass);
  const softDEF = getSoftDEF(monster);

  return Math.floor(
    Math.floor(
      Math.floor(
        Math.floor(
          Math.floor(
            Math.floor(
              (atk * formula.percent + formula.bonus) * (1 + mods.skill / 100)
            ) *
              (1 + rangeMod / 100)
          ) *
            (1 + mods.dmg / 100)
        ) * hardDEF
      ) - softDEF
    ) *
      (1 + mods.finalDmg / 100)
  );
}
