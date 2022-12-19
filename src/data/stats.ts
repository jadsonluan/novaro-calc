import { getBaseStat, is4thJob } from "../data/job";
import { Character } from "./character";

export function getHP(character: Character) {
  const { hp: hpInfo, stats } = character;
  const { vit } = stats;
  const { baseHP } = getBaseStat(character.job);

  const transBonus = is4thJob(character.job) ? 1 : 1.25;

  let finalHP = baseHP * ((1 + vit / 100) * transBonus) + hpInfo.flat;
  finalHP = finalHP * (1 + hpInfo.percent / 100);

  return Math.floor(finalHP);
}

export function getSP(character: Character) {
  const { sp: spInfo, stats } = character;
  const { int } = stats;
  const { baseSP } = getBaseStat(character.job);

  const transBonus = is4thJob(character.job) ? 1 : 1.25;

  let finalSP = baseSP * ((1 + int / 100) * transBonus) + spInfo.flat;
  finalSP = finalSP * (1 + spInfo.percent / 100);

  return Math.floor(finalSP);
}
