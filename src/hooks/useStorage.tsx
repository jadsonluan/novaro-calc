import { useCallback, useEffect, useState } from "react";
import { BuildInfo } from "../data/input";
import { useBuild } from "./useBuild";

interface BuildData {
  build1: BuildInfo;
  build2: BuildInfo;
}

const useStorage = () => {
  const { build1, build2 } = useBuild();
  const [builds, setBuilds] = useState<string[]>([]);

  const updateBuilds = useCallback(() => {
    const result: string[] = [];
    let key: string | null;

    for (let i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
      if (!key) continue;
      result.push(key);
    }

    setBuilds(result.sort());
  }, [setBuilds]);

  useEffect(() => {
    updateBuilds();
  }, [updateBuilds]);

  const load = useCallback(
    (key: string) => {
      const rawData = localStorage.getItem(key);

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
      localStorage.setItem(key, parsedData);
      updateBuilds();
    },
    [updateBuilds, build1, build2]
  );

  const remove = useCallback(
    (key: string) => {
      localStorage.removeItem(key);
      updateBuilds();
    },
    [updateBuilds]
  );

  return { builds, load, save, remove };
};

export default useStorage;
