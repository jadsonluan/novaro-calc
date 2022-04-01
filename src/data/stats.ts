import { getBaseStat } from "../data/job";
import { Character } from "./input";

export function getHP(character: Character) {
  const { hp: hpInfo, stats } = character;
  const { vit } = stats;
  const { baseHP } = getBaseStat(character.job);

  let finalHP = baseHP * ((1 + vit / 100) * 1.25) + hpInfo.flat;
  finalHP = finalHP * (1 + hpInfo.percent / 100);

  return Math.floor(finalHP) - 1;
}

export function getSP(character: Character) {
  const { sp: spInfo, stats } = character;
  const { int } = stats;
  const { baseSP } = getBaseStat(character.job);

  let finalSP = baseSP * ((1 + int / 100) * 1.25) + spInfo.flat;
  finalSP = finalSP * (1 + spInfo.percent / 100);

  return Math.floor(finalSP) - 1;
}
