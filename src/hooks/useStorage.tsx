import { useCallback, useEffect, useState } from "react";
import { BuildInfo, INITIAL_ATK_BUILD, INITIAL_MATK_BUILD } from "../data/input";
import { useBuild } from "./useBuild";

interface BuildData {
  build1: BuildInfo;
  build2: BuildInfo;
}

const NOVARO_CALC_PREFIX = "novaro-calc-";
const atkMatkPrefix = (isMATK: boolean) => `${NOVARO_CALC_PREFIX}${isMATK ? "matk-" : ""}`;

const useStorage = (isMATK: boolean) => {
  const INITIAL_BUILD = !isMATK ? INITIAL_ATK_BUILD : INITIAL_MATK_BUILD;
  const { build1, build2 } = useBuild();
  const [builds, setBuilds] = useState<string[]>([]);

  const updateBuilds = useCallback(() => {
    const result: string[] = [];
    let key: string | null;

    for (let i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
      if (!key || !key.includes(atkMatkPrefix(isMATK))) continue;
      result.push(key.split(atkMatkPrefix(isMATK))[1]);
    }

    setBuilds(result.sort());
  }, [isMATK]);

  useEffect(() => {
    updateBuilds();
  }, [updateBuilds]);

  const load = useCallback(
    (key: string) => {
      const rawData = localStorage.getItem(`${atkMatkPrefix(isMATK)}${key}`);

      if (!rawData) return;

      const data: BuildData = JSON.parse(rawData);

      build1.setCharacter({...INITIAL_BUILD.character, ...data.build1.character});
      build1.setMonster({...INITIAL_BUILD.monster, ...data.build1.monster});
      build2.setCharacter({...INITIAL_BUILD.character, ...data.build2.character});
      build2.setMonster({...INITIAL_BUILD.monster, ...data.build2.monster});
    },
    [INITIAL_BUILD, build1, build2, isMATK]
  );

  const save = useCallback(
    (key: string) => {
      const data = { build1, build2 };
      const parsedData = JSON.stringify(data);
      localStorage.setItem(`${atkMatkPrefix(isMATK)}${key}`, parsedData);
      updateBuilds();
    },
    [updateBuilds, build1, build2, isMATK]
  );

  const remove = useCallback(
    (key: string) => {
      localStorage.removeItem(`${atkMatkPrefix(isMATK)}${key}`);
      updateBuilds();
    },
    [updateBuilds, isMATK]
  );

  return { builds, load, save, remove };
};

export default useStorage;
