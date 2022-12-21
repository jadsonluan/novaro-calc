export const INITIAL_JOBS: string[] = [
  'Swordsman',
  'Merchant',
  'Thief',
  'Mage',
  'Acolyte',
  'Archer',
  'Ninja',
  'Gunslinger',
  'Taekwon',
  'Novice',
  'Doram',
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

const FOURTH_JOBS: Job[] = ["Inquisitor"];

// TODO: Adicionar baseHP/SP de: Doram, SA, Oboro/Kagerou, Shadow Chaser
export const JOBS: Record<Job, BaseStat & { initialJob: string }> = {
  "Dragon Knight": {
    baseHP: 27325,
    baseSP: 1185,
    initialJob: "Swordsman",
  },
  "Imperial Guard": {
    baseHP: 26205,
    baseSP: 1526,
    initialJob: "Swordsman",
  },
  Meister: {
    baseHP: 21130,
    baseSP: 1203,
    initialJob: "Merchant",
  },
  Biolo: {
    baseHP: 21325,
    baseSP: 1985,
    initialJob: "Merchant",
  },
  "Shadow Cross": {
    baseHP: 25175,
    baseSP: 1140,
    initialJob: "Thief",
  },
  "Abyss Chaser": {
    baseHP: 22810,
    baseSP: 985,
    initialJob: "Thief",
  },
  Archmage: {
    baseHP: 20166,
    baseSP: 1985,
    initialJob: "Mage",
  },
  "Elemental Master": {
    baseHP: 19660,
    baseSP: 1985,
    initialJob: "Mage",
  },
  "Wind Hawk": {
    baseHP: 22135,
    baseSP: 1120,
    initialJob: "Archer",
  },
  "Troubadour / Trouvere": {
    baseHP: 40405,
    baseSP: 1558,
    initialJob: "Archer",
  },
  Cardinal: {
    baseHP: 16855,
    baseSP: 1985,
    initialJob: "Acolyte",
  },
  Inquisitor: {
    baseHP: 41335,
    baseSP: 1340,
    initialJob: "Acolyte",
  },
  "Night Watch": {
    baseHP: 24329,
    baseSP: 1379,
    initialJob: "Gunslinger",
  },
  "Shinkiro / Shiranui": {
    baseHP: 22810,
    baseSP: 985,
    initialJob: "Ninja",
  },
  "Soul Ascetic": {
    baseHP: 15183,
    baseSP: 811,
    initialJob: "Taekwon",
  },
  "Sky Emperor": {
    baseHP: 26355,
    baseSP: 1422,
    initialJob: "Taekwon",
  },
  "Hyper Novice": {
    baseHP: 22810,
    baseSP: 985,
    initialJob: "Novice",
  },
  "Spirit Handler": {
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