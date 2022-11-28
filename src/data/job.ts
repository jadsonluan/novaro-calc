export const INITIAL_JOBS: string[] = [
  'Swordsman',
  'Merchant',
  'Thief',
  'Mage',
  'Priest',
  'Archer',
  'Ninja',
  'Gunslinger',
  'Taekwon',
  'Novice',
  'Doram',
];

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
  | "Super Novice EX"
  | "Sura"
  | "Wanderer"
  | "Warlock";

export interface BaseStat {
  baseHP: number;
  baseSP: number;
}

const FOURTH_JOBS: Job[] = ["Inquisitor"];

// TODO: Adicionar baseHP/SP de: Doram, SA, Oboro/Kagerou, Shadow Chaser
export const JOBS: Record<Job, BaseStat & { initialJob: string }> = {
  "Rune Knight": {
    baseHP: 27325,
    baseSP: 1185,
    initialJob: "Swordsman",
  },
  "Royal Guard": {
    baseHP: 26205,
    baseSP: 1526,
    initialJob: "Swordsman",
  },
  Mechanic: {
    baseHP: 21130,
    baseSP: 1203,
    initialJob: "Merchant",
  },
  Genetic: {
    baseHP: 21325,
    baseSP: 1985,
    initialJob: "Merchant",
  },
  "Guillotine Cross": {
    baseHP: 25175,
    baseSP: 1140,
    initialJob: "Thief",
  },
  "Shadow Chaser": {
    baseHP: 22810,
    baseSP: 985,
    initialJob: "Thief",
  },
  Warlock: {
    baseHP: 20166,
    baseSP: 1985,
    initialJob: "Mage",
  },
  Sorcerer: {
    baseHP: 19660,
    baseSP: 1985,
    initialJob: "Mage",
  },
  Ranger: {
    baseHP: 22135,
    baseSP: 1120,
    initialJob: "Archer",
  },
  Ministrel: {
    baseHP: 21130,
    baseSP: 1203,
    initialJob: "Archer",
  },
  Wanderer: {
    baseHP: 21130,
    baseSP: 1203,
    initialJob: "Archer",
  },
  Archbishop: {
    baseHP: 16855,
    baseSP: 1985,
    initialJob: "Priest",
  },
  Sura: {
    baseHP: 22810,
    baseSP: 985,
    initialJob: "Priest",
  },
  Inquisitor: {
    baseHP: 41335,
    baseSP: 1340,
    initialJob: "Priest",
  },
  Rebellion: {
    baseHP: 24329,
    baseSP: 1379,
    initialJob: "Gunslinger",
  },
  Kagerou: {
    baseHP: 22810,
    baseSP: 985,
    initialJob: "Ninja",
  },
  Oboro: {
    baseHP: 22810,
    baseSP: 985,
    initialJob: "Ninja",
  },
  "Soul Reaper": {
    baseHP: 15183,
    baseSP: 811,
    initialJob: "Taekwon",
  },
  "Star Emperor": {
    baseHP: 26355,
    baseSP: 1422,
    initialJob: "Taekwon",
  },
  "Super Novice EX": {
    baseHP: 22810,
    baseSP: 985,
    initialJob: "Novice",
  },
  Summoner: {
    baseHP: 22810,
    baseSP: 985,
    initialJob: "Doram",
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