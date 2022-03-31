const JOBS = {
  SURA: {
    baseHP: 22810,
    baseSP: 985,
  },
};

export function getJobInfo(job) {
  return JOBS[job] ?? { baseHP: 1, baseSP: 1 };
}
