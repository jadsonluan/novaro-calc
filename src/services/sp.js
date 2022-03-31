import { getJobInfo } from "./jobs.js";

export function getSP(character) {
  const { sp: spInfo, stats } = character;
  const { int } = stats;
  const { baseSP } = getJobInfo(character.job);

  let finalSP = baseSP * ((1 + int / 100) * 1.25) + spInfo.flat;
  finalSP = finalSP * (1 + spInfo.percent / 100);

  return Math.floor(finalSP) - 1;
}
