import { Element } from "../data/element";
import { MATK_SKILLS } from "../data/matkSkills";
import { Race, Size, MonsterType } from "../data/monster";
import { SKILLS } from "../data/skills";

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

interface MonsterInput {
  element: Element;
  race: Race;
  size: Size;
  monsterType: MonsterType;
}

function getLineDigits(line: string) {
  return line.match(/\d+/g);
}

function getValueFromLine(index: number, line: string) {
  const values = getLineDigits(line);
  const value = values ? values[index] : 0;
  return Number(value) ?? 0;
}

function getEquipATK(sections: Record<string, string[]>) {
  const EQUIP_ATK_INDEX = 1;
  const ATK_VALUES_LINE_INDEX = 2;
  const section = sections["Battle Stats"];
  const line = section[ATK_VALUES_LINE_INDEX];

  return getValueFromLine(EQUIP_ATK_INDEX, line);
}

function getMATKpercent(sections: Record<string, string[]>) {
  const section = sections["Battle Stats"];
  const line = section[1];

  return Number(getLineDigits(line));
}

function getWeaponInfo(sections: Record<string, string[]>) {
  const BASE_ATK_LINE_INDEX = 0;
  const WEAPON_LVL_LINE_INDEX = 1;
  const section = sections["Right-Hand Weapon"];

  const baseAtkLine = section[BASE_ATK_LINE_INDEX];
  const baseATK = getValueFromLine(BASE_ATK_LINE_INDEX, baseAtkLine);

  const weaponLvlLine = section[WEAPON_LVL_LINE_INDEX];
  const weaponLVL = getValueFromLine(WEAPON_LVL_LINE_INDEX, weaponLvlLine);

  return { baseATK, weaponLVL };
}

function getBonusFromSection(
  section: string[],
  target: string,
  delim: string = " +"
) {
  if (!section) return 0;

  let search = target.toLowerCase();

  const bonuses: Record<string, number> = {};
  section.forEach((line) => {
    const [key, value] = line.trim().split(delim);
    bonuses[key.toLowerCase()] = value ? Number(value.slice(0, -1)) : 0;
  });

  return bonuses[search] ?? 0;
}

function getElementBonuses(
  sections: Record<string, string[]>,
  element: Element
) {
  const section = sections["Magic Elemental Bonuses"];
  if (!section) return 0;

  let searchedElement = element === "Shadow" ? "Dark" : element;

  return getBonusFromSection(section, searchedElement);
}

function getPropertyBonus(
  sections: Record<string, string[]>,
  element: Element,
  isMATK: boolean
) {
  const section = !isMATK ? sections["Elemental Bonuses"] : sections["Magic Bonuses Against Monster Element"];
  if (!section) return 0;

  let searchedElement = element === "Shadow" ? "Dark" : element;

  return getBonusFromSection(section, searchedElement);
}

function getRaceBonus(sections: Record<string, string[]>, race: Race, isMatk: boolean) {
  const section = !isMatk ? sections["Race Bonuses"] : sections["Magic Race Bonuses"];
  if (!section) return 0;

  return getBonusFromSection(section, race as string);
}

function getSizeBonus(sections: Record<string, string[]>, size: Size, isMatk: boolean) {
  const section = !isMatk ? sections["Size Bonuses"] : sections["Magic Size Bonuses"];
  if (!section) return 0;

  let searchedSize = size.toLowerCase();
  searchedSize = searchedSize === "large" ? "big" : searchedSize;

  return getBonusFromSection(section, searchedSize as string);
}

function getMonsterTypeBonus(
  sections: Record<string, string[]>,
  target: MonsterType,
  isMatk: boolean
) {
  const section = !isMatk ? sections["Class Bonuses"] : sections["Magic Class Bonuses"];
  return getBonusFromSection(section, target as string);
}

function getBypass(
  sections: Record<string, string[]>,
  race: Race,
  monsterType: MonsterType,
  isMATK: boolean
) {
  const raceBypass = getBonusFromSection(
    !isMATK ? sections["Ignored Race Defense"] : sections["Ignored Race Magic Defense"],
    race as string
  );

  const classBypass = getBonusFromSection(
    !isMATK ? sections["Ignored Class Defense"] : sections["Ignored Class Magic Defense"],
    monsterType as string
  );

  return classBypass + raceBypass;
}

function getSkillBonus(sections: Record<string, string[]>, skillKey: string, isMATK: boolean) {
  const skills = !isMATK ? SKILLS : MATK_SKILLS;
  const section = sections["Skill bonuses"];
  const skill = skills[skillKey].name;
  return getBonusFromSection(section, skill, " : +");
}

function getRangeBonuses(sections: Record<string, string[]>) {
  const section = sections["Others"];

  let melee = 0;
  let ranged = 0;
  let _key, value;
  section.forEach((line) => {
    if (line.includes("Short Attack Rate")) {
      [_key, value] = line.trim().split(" +");
      melee = Number(value.slice(0, -1));
    } else if (line.includes("Ranged Attack Rate")) {
      [_key, value] = line.trim().split(" +");
      ranged = Number(value.slice(0, -1));
    }
  });

  return { melee: melee ?? 0, ranged: ranged ?? 0 };
}

function getCriticalDamageBonuses(sections: Record<string, string[]>) {
  const section = sections["Critical Stats"];
  if (!section) return 0;

  return getBonusFromSection(section, "Critical Damage 40%", " + ");
}

function getHPSP(sections: Record<string, string[]>) {
  const section = sections["HP and SP bonuses"];

  const fixedHPLine = section[1];
  const fixedHP = getValueFromLine(1, fixedHPLine);

  const hpMultLine = section[2];
  const hpMult = getValueFromLine(1, hpMultLine) - 100;

  const fixedSPLine = section[4];
  const fixedSP = getValueFromLine(1, fixedSPLine);

  const spMultLine = section[5];
  const spMult = getValueFromLine(1, spMultLine) - 100;

  return {
    hp: { flat: fixedHP, percent: hpMult },
    sp: { flat: fixedSP, percent: spMult },
  };
}

export function formatBattleStats(
  battleStats: string,
  skill: string,
  monsterInfo: MonsterInput,
  isMATK: boolean
) {
  let response = battleStats.replaceAll(/\[.+]: /g, "");
  const sections: Record<string, string[]> = {};
  let currentSection: string;
  const lines = response.split("\n");
  const regex = new RegExp("^\\S.+:", "gm");

  lines.forEach((line) => {
    if (regex.test(line)) {
      currentSection = line.slice(0, line.length - 1);
      sections[currentSection] = [];
    } else {
      sections[currentSection].push(line);
    }
  });

  const equipATK = getEquipATK(sections);
  const MATKpercent = getMATKpercent(sections);
  const { baseATK, weaponLVL } = getWeaponInfo(sections);
  const elementBonuses = getElementBonuses(sections, monsterInfo.element);
  const propertyBonus = getPropertyBonus(sections, monsterInfo.element, isMATK);
  const raceBonus = getRaceBonus(sections, monsterInfo.race, isMATK);
  const monsterTypeBonus = getMonsterTypeBonus(
    sections,
    monsterInfo.monsterType,
    isMATK
  );
  const sizeBonus = getSizeBonus(sections, monsterInfo.size, isMATK);
  const bypass = getBypass(sections, monsterInfo.race, monsterInfo.monsterType, isMATK);
  const skillBonus = getSkillBonus(sections, skill, isMATK);
  const { melee, ranged } = getRangeBonuses(sections);
  const critical = getCriticalDamageBonuses(sections);
  const { hp, sp } = getHPSP(sections);

  return {
    equipATK,
    MATKpercent,
    baseATK,
    weaponLVL,
    elementBonuses,
    propertyBonus,
    raceBonus,
    sizeBonus,
    monsterTypeBonus,
    bypass,
    skillBonus,
    melee,
    ranged,
    critical,
    hp,
    sp,
  };
}
