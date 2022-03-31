import { getJobInfo } from "./jobs.js";

export function getHP(character) {
  const { hp: hpInfo, stats } = character;
  const { vit } = stats;
  const { baseHP } = getJobInfo(character.job);

  let finalHP = baseHP * ((1 + vit / 100) * 1.25) + hpInfo.flat;
  finalHP = finalHP * (1 + hpInfo.percent / 100);

  return Math.floor(finalHP) - 1;
}
