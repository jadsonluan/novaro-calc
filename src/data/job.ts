export const INITIAL_JOBS: string[] = [
  "Swordsman",
  "Merchant",
  "Thief",
  "Mage",
  "Acolyte",
  "Archer",
  "Ninja",
  "Gunslinger",
  "Taekwon",
  "Novice",
  "Doram",
];

export type Job =
  | "Dragon Knight"
  | "Imperial Guard"
  | "Meister"
  | "Biolo"
  | "Shadow Cross"
  | "Abyss Chaser"
  | "Archmage"
  | "Elemental Master"
  | "Cardinal"
  | "Inquisitor"
  | "Wind Hawk"
  | "Troubadour / Trouvere"
  | "Shinkiro / Shiranui"
  | "Night Watch"
  | "Sky Emperor"
  | "Soul Ascetic"
  | "Spirit Handler"
  | "Hyper Novice";

export interface BaseStat {
  baseHP: number;
  baseSP: number;
}

const TRANS_JOBS: Job[] = [
  "Dragon Knight",
  "Imperial Guard",
  "Meister",
  "Biolo",
  "Shadow Cross",
  "Abyss Chaser",
  "Archmage",
  "Elemental Master",
  "Cardinal",
  "Inquisitor",
  "Wind Hawk",
  "Troubadour / Trouvere",
  "Shinkiro / Shiranui",
  "Night Watch",
  "Sky Emperor",
  "Soul Ascetic",
  "Spirit Handler",
  "Hyper Novice",
];

export const JOBS: Record<Job, BaseStat & { initialJob: string }> = {
  "Dragon Knight": {
    baseHP: 46850,
    baseSP: 1490,
    initialJob: "Swordsman",
  },
  "Imperial Guard": {
    baseHP: 45730,
    baseSP: 1920,
    initialJob: "Swordsman",
  },
  Meister: {
    baseHP: 44975,
    baseSP: 1920,
    initialJob: "Merchant",
  },
  Biolo: {
    baseHP: 40850,
    baseSP: 2785,
    initialJob: "Merchant",
  },
  "Shadow Cross": {
    baseHP: 43450,
    baseSP: 1495,
    initialJob: "Thief",
  },
  "Abyss Chaser": {
    baseHP: 39670,
    baseSP: 1340,
    initialJob: "Thief",
  },
  Archmage: {
    baseHP: 39509,
    baseSP: 2590,
    initialJob: "Mage",
  },
  "Elemental Master": {
    baseHP: 37185,
    baseSP: 2590,
    initialJob: "Mage",
  },
  "Wind Hawk": {
    baseHP: 40410,
    baseSP: 1475,
    initialJob: "Archer",
  },
  "Troubadour / Trouvere": {
    baseHP: 40405,
    baseSP: 1558,
    initialJob: "Archer",
  },
  Cardinal: {
    baseHP: 39985,
    baseSP: 2540,
    initialJob: "Acolyte",
  },
  Inquisitor: {
    baseHP: 41335,
    baseSP: 1340,
    initialJob: "Acolyte",
  },
  "Night Watch": {
    baseHP: 35715,
    baseSP: 2131,
    initialJob: "Gunslinger",
  },
  "Shinkiro / Shiranui": {
    baseHP: 37340,
    baseSP: 2031,
    initialJob: "Ninja",
  },
  "Soul Ascetic": {
    baseHP: 37260,
    baseSP: 3579,
    initialJob: "Taekwon",
  },
  "Sky Emperor": {
    baseHP: 37746,
    baseSP: 2001,
    initialJob: "Taekwon",
  },
  "Hyper Novice": {
    baseHP: 31317,
    baseSP: 1878,
    initialJob: "Novice",
  },
  "Spirit Handler": {
    baseHP: 35944,
    baseSP: 2382,
    initialJob: "Doram",
  },
};

export function getJobsName() {
  return Object.getOwnPropertyNames(JOBS);
}

export function getBaseStat(job: Job) {
  return JOBS[job] ?? { baseHP: 1, baseSP: 1 };
}

export function isTrans(job: Job) {
  return TRANS_JOBS.includes(job);
}
