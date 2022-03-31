import { getHP } from "./hp.js";
import { getSP } from "./sp.js";

// return [dmgAtk%, bonusFlatDmg]
export function getSkillFormula(character, monster) {
  const { skill, baseLevel, stats } = character;
  const { agi } = stats;

  let baseDamage;

  switch (skill) {
    case "TRIPLE_ATTACK":
      return [2.4, 0];
    case "SKY_NET_BLOW":
      baseDamage = 1000;
      return [((baseDamage + agi) * (baseLevel / 100)) / 100, 0];
    case "TIGER_CANNON_COMBO":
      baseDamage = (0.3 * getHP(character) + 0.15 * getSP(character)) / 2;
      return [
        (baseDamage * (baseLevel / 100)) / 100,
        5000 + monster.baseLevel * 40,
      ];
    default:
      return [1, 0];
  }
}

export function isMeleeSkill(skill) {
  switch (skill) {
    case "TRIPLE_ATTACK":
      return true;
    case "SKY_NET_BLOW":
      return true;
    case "TIGER_CANNON_COMBO":
      return true;
    default:
      return true;
  }
}
