import { useCallback, useEffect, useState } from "react";
import _ from 'lodash';
import { BuildInfo, INITIAL_ATK_BUILD, INITIAL_MATK_BUILD } from "../data/input";
import { useBuild } from "./useBuild";
import { deepCopyNestedObject } from "../utils/helperFunctions";

interface BuildData {
  build1: BuildInfo;
  build2: BuildInfo;
}

const atkMatkPrefix = (isMATK: boolean) => `${isMATK ? "novaro-matk-calc-" : "novaro-atk-calc-"}`;

const useStorage = (isMATK: boolean) => {
  const INITIAL_BUILD = !isMATK ? INITIAL_ATK_BUILD : INITIAL_MATK_BUILD;
  const { build1, build2 } = useBuild();
  const [builds, setBuilds] = useState<string[]>([]);

  const updateBuilds = useCallback(() => {
    const result: string[] = [];
    let key: string | null;

    for (let i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
      if (!key || !key.includes(atkMatkPrefix(isMATK)) || key.includes('crnt')) continue;
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

      build1.setName(data.build1.name || '');
      build1.setCharacter(_.merge(deepCopyNestedObject(INITIAL_BUILD.character), deepCopyNestedObject(data.build1.character)));
      build1.setMonster(_.merge(deepCopyNestedObject(INITIAL_BUILD.monster), deepCopyNestedObject(data.build1.monster)));
      build1.setBuffs(_.merge(deepCopyNestedObject(INITIAL_BUILD.buffs), deepCopyNestedObject(data.build1.buffs)));
      build1.setDebuffs(_.merge(deepCopyNestedObject(INITIAL_BUILD.debuffs), deepCopyNestedObject(data.build1.debuffs)));

      build2.setName(data.build2.name || '');
      build2.setCharacter(_.merge(deepCopyNestedObject(INITIAL_BUILD.character), deepCopyNestedObject(data.build2.character)));
      build2.setMonster(_.merge(deepCopyNestedObject(INITIAL_BUILD.monster), deepCopyNestedObject(data.build2.monster)));
      build2.setBuffs(_.merge(deepCopyNestedObject(INITIAL_BUILD.buffs), deepCopyNestedObject(data.build2.buffs)));
      build2.setDebuffs(_.merge(deepCopyNestedObject(INITIAL_BUILD.debuffs), deepCopyNestedObject(data.build2.debuffs)));
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
