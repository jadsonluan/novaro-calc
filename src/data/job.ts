export type Job =
  | "Archbishop"
  | "Genetic"
  | "Guillotine Cross"
  | "Inquisitor"
  | "Kagerou"
  | "Mechanic"
  | "Ministrel"
  | "Oboro"
  | "Ranger"
  | "Rebellion"
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

const FOURTH_JOBS: Job[] = ["Inquisitor"];

// TODO: Adicionar baseHP/SP de: Doram, SA, Oboro/Kagerou, Shadow Chaser
export const JOBS: Record<Job, BaseStat> = {
  Archbishop: {
    baseHP: 16855,
    baseSP: 1985,
  },
  Genetic: {
    baseHP: 21325,
    baseSP: 1985,
  },
  "Guillotine Cross": {
    baseHP: 25175,
    baseSP: 1140,
  },
  Inquisitor: {
    baseHP: 41335,
    baseSP: 1340,
  },
  Kagerou: {
    baseHP: 22810,
    baseSP: 985,
  },
  Mechanic: {
    baseHP: 21130,
    baseSP: 1203,
  },
  Ministrel: {
    baseHP: 21130,
    baseSP: 1203,
  },
  Oboro: {
    baseHP: 22810,
    baseSP: 985,
  },
  Ranger: {
    baseHP: 22135,
    baseSP: 1120,
  },
  Rebellion: {
    baseHP: 24329,
    baseSP: 1379,
  },
  "Royal Guard": {
    baseHP: 26205,
    baseSP: 1526,
  },
  "Rune Knight": {
    baseHP: 27325,
    baseSP: 1185,
  },
  "Shadow Chaser": {
    baseHP: 22810,
    baseSP: 985,
  },
  Sorcerer: {
    baseHP: 19660,
    baseSP: 1985,
  },
  "Soul Reaper": {
    baseHP: 15183,
    baseSP: 811,
  },
  "Star Emperor": {
    baseHP: 26355,
    baseSP: 1422,
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
    baseHP: 21130,
    baseSP: 1203,
  },
  Warlock: {
    baseHP: 20166,
    baseSP: 1985,
  },
};

export function getJobsName() {
  return Object.getOwnPropertyNames(JOBS)
}

export function getBaseStat(job: Job) {
  return JOBS[job] ?? { baseHP: 1, baseSP: 1 };
}

export function is4thJob(job: Job) {
  return FOURTH_JOBS.includes(job);
}