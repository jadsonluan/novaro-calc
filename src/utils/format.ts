import { Element } from "../data/element";
import { MonsterType, Race, Size } from "../data/input";
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

function getPropertyBonus(
  sections: Record<string, string[]>,
  element: Element
) {
  const section = sections["Elemental Bonuses"];
  if (!section) return 0;

  let searchedElement = element === "Shadow" ? "Dark" : element;

  return getBonusFromSection(section, searchedElement);
}

function getRaceBonus(sections: Record<string, string[]>, race: Race) {
  const section = sections["Race Bonuses"];
  if (!section) return 0;

  return getBonusFromSection(section, race as string);
}

function getSizeBonus(sections: Record<string, string[]>, size: Size) {
  const section = sections["Size Bonuses"];
  if (!section) return 0;

  let searchedSize = size.toLowerCase();
  searchedSize = searchedSize === "large" ? "big" : searchedSize;

  return getBonusFromSection(section, searchedSize as string);
}

function getMonsterTypeBonus(
  sections: Record<string, string[]>,
  target: MonsterType
) {
  const section = sections["Class Bonuses"];
  return getBonusFromSection(section, target as string);
}

function getBypass(
  sections: Record<string, string[]>,
  race: Race,
  monsterType: MonsterType
) {
  const raceBypass = getBonusFromSection(
    sections["Ignored Race Defense"],
    race as string
  );

  const classBypass = getBonusFromSection(
    sections["Ignored Class Defense"],
    monsterType as string
  );

  return classBypass + raceBypass;
}

function getSkillBonus(sections: Record<string, string[]>, skillKey: string) {
  const section = sections["Skill bonuses"];
  const skill = SKILLS[skillKey].name;
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
  monsterInfo: MonsterInput
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
  const { baseATK, weaponLVL } = getWeaponInfo(sections);
  const propertyBonus = getPropertyBonus(sections, monsterInfo.element);
  const raceBonus = getRaceBonus(sections, monsterInfo.race);
  const monsterTypeBonus = getMonsterTypeBonus(
    sections,
    monsterInfo.monsterType
  );
  const sizeBonus = getSizeBonus(sections, monsterInfo.size);
  const bypass = getBypass(sections, monsterInfo.race, monsterInfo.monsterType);
  const skillBonus = getSkillBonus(sections, skill);
  const { melee, ranged } = getRangeBonuses(sections);
  const critical = getCriticalDamageBonuses(sections);
  const { hp, sp } = getHPSP(sections);

  return {
    equipATK,
    baseATK,
    weaponLVL,
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
