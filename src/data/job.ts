export type Job =
  | "Archbishop"
  | "Guillotine Cross"
  | "Kagerou"
  | "Ministrel"
  | "Oboro"
  | "Ranger"
  | "Royal Guard"
  | "Rune Knight"
  | "Shadow Chaser"
  | "Sorcerer"
  | "Soul Reaper"
  | "Star Emperor"
  | "Summoner"
  | "Super Novice"
  | "Sura"
  | "Wanderer"
  | "Warlock";

export interface BaseStat {
  baseHP: number;
  baseSP: number;
}

export const JOBS: Record<Job, BaseStat> = {
  Archbishop: {
    baseHP: 16855,
    baseSP: 1832,
  },
  "Guillotine Cross": {
    baseHP: 22810,
    baseSP: 985,
  },
  Kagerou: {
    baseHP: 22810,
    baseSP: 985,
  },
  Ministrel: {
    baseHP: 22810,
    baseSP: 985,
  },
  Oboro: {
    baseHP: 22810,
    baseSP: 985,
  },
  Ranger: {
    baseHP: 22810,
    baseSP: 985,
  },
  "Royal Guard": {
    baseHP: 22810,
    baseSP: 985,
  },
  "Rune Knight": {
    baseHP: 22810,
    baseSP: 985,
  },
  "Shadow Chaser": {
    baseHP: 22810,
    baseSP: 985,
  },
  Sorcerer: {
    baseHP: 22810,
    baseSP: 985,
  },
  "Soul Reaper": {
    baseHP: 22810,
    baseSP: 985,
  },
  "Star Emperor": {
    baseHP: 22810,
    baseSP: 985,
  },
  Summoner: {
    baseHP: 22810,
    baseSP: 985,
  },
  "Super Novice": {
    baseHP: 22810,
    baseSP: 985,
  },
  Sura: {
    baseHP: 22810,
    baseSP: 985,
  },
  Wanderer: {
    baseHP: 22810,
    baseSP: 985,
  },
  Warlock: {
    baseHP: 22810,
    baseSP: 985,
  },
};

export function getBaseStat(job: Job) {
  return JOBS[job] ?? { baseHP: 1, baseSP: 1 };
}
