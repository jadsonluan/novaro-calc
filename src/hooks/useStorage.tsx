import { useCallback, useEffect, useState } from "react";
import { BuildInfo } from "../data/input";
import { useBuild } from "./useBuild";

interface BuildData {
  build1: BuildInfo;
  build2: BuildInfo;
}

const NOVARO_CALC_PREFIX = "novaro-calc-";

const useStorage = () => {
  const { build1, build2 } = useBuild();
  const [builds, setBuilds] = useState<string[]>([]);

  const updateBuilds = useCallback(() => {
    const result: string[] = [];
    let key: string | null;

    for (let i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
      if (!key || !key.includes(NOVARO_CALC_PREFIX)) continue;
      result.push(key.split(NOVARO_CALC_PREFIX)[1]);
    }

    setBuilds(result.sort());
  }, [setBuilds]);

  useEffect(() => {
    updateBuilds();
  }, [updateBuilds]);

  const load = useCallback(
    (key: string) => {
      const rawData = localStorage.getItem(`${NOVARO_CALC_PREFIX}${key}`);

      if (!rawData) return;

      const data: BuildData = JSON.parse(rawData);

      build1.setCharacter(data.build1.character);
      build1.setMonster(data.build1.monster);
      build2.setCharacter(data.build2.character);
      build2.setMonster(data.build2.monster);
    },
    [build1, build2]
  );

  const save = useCallback(
    (key: string) => {
      const data = { build1, build2 };
      const parsedData = JSON.stringify(data);
      localStorage.setItem(`${NOVARO_CALC_PREFIX}${key}`, parsedData);
      updateBuilds();
    },
    [updateBuilds, build1, build2]
  );

  const remove = useCallback(
    (key: string) => {
      localStorage.removeItem(`${NOVARO_CALC_PREFIX}${key}`);
      updateBuilds();
    },
    [updateBuilds]
  );

  return { builds, load, save, remove };
};

export default useStorage;
