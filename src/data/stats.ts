import { isTrans } from "../data/job";
import { Character } from "./character";

export function getHP(character: Character) {
  const { hp: hpInfo, stats } = character;
  const { vit } = stats;

  const transBonus = isTrans(character.job) ? 1.25 : 1;

  let finalHP = Math.floor(hpInfo.base * ((1 + vit / 100) * transBonus) + hpInfo.flat);
  finalHP = finalHP * (1 + hpInfo.percent / 100);

  return Math.floor(finalHP);
}

export function getSP(character: Character) {
  const { sp: spInfo, stats } = character;
  const { int } = stats;

  const transBonus = isTrans(character.job) ? 1.25 : 1;

  let finalSP = Math.floor(spInfo.base * ((1 + int / 100) * transBonus) + spInfo.flat);
  finalSP = finalSP * (1 + spInfo.percent / 100);

  return Math.floor(finalSP);
}
