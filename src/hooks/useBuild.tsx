import { createContext, useContext, useState } from "react";
import { Character, emptyCharacter as initialCharacter } from "../data/character";
import { Monster, emptyMonster as initialMonster } from "../data/monster";
import { Buffs, emptyATKBuffs as initialBuffs } from "../data/buffs";
import { Debuffs, emptyATKDebuffs as initialDebuffs } from "../data/debuff";
import {
  INITIAL_ATK_BUILD,
  INITIAL_MATK_BUILD,
} from "../data/input";

export interface Build {
  character: Character;
  setCharacter: (
    character: Character | ((prevState: Character) => Character)
  ) => void;
  monster: Monster;
  setMonster: (monster: Monster | ((prevState: Monster) => Monster)) => void;
  buffs: Buffs;
  setBuffs: (buffs: Buffs | ((prevState: Buffs) => Buffs)) => void;
  debuffs: Debuffs;
  setDebuffs: (debuffs: Debuffs | ((prevState: Debuffs) => Debuffs)) => void;
}
interface ContextProps {
  build1: Build;
  build2: Build;
}

const initialBuild = {
  character: initialCharacter,
  setCharacter: (
    _character: Character | ((prevState: Character) => Character)
  ) => {},
  monster: initialMonster,
  setMonster: (_monster: Monster | ((prevState: Monster) => Monster)) => {},
  buffs: initialBuffs,
  setBuffs: (_buffs: Buffs | ((prevState: Buffs) => Buffs)) => {},
  debuffs: initialDebuffs,
  setDebuffs: (_debuffs: Debuffs | ((prevState: Debuffs) => Debuffs)) => {},
};

const BuildContext = createContext<ContextProps>({
  build1: initialBuild,
  build2: initialBuild,
});

export const BuildProvider: React.FC = (props) => {
  const location = window.location.href;
  const isMATK = location.includes("matk");
  const INITIAL_BUILD = !isMATK ? INITIAL_ATK_BUILD : INITIAL_MATK_BUILD;
  const initialBuild1 = INITIAL_BUILD;
  const initialBuild2 = INITIAL_BUILD;

  const { children } = props;

  const [character1, setCharacter1] = useState(initialBuild1.character);
  const [character2, setCharacter2] = useState(initialBuild2.character);

  const [monster1, setMonster1] = useState(initialBuild1.monster);
  const [monster2, setMonster2] = useState(initialBuild2.monster);

  const [buffs1, setBuffs1] = useState<Buffs>(initialBuild1.buffs);
  const [buffs2, setBuffs2] = useState<Buffs>(initialBuild2.buffs);

  const [debuffs1, setDebuffs1] = useState<Debuffs>(initialBuild1.debuffs);
  const [debuffs2, setDebuffs2] = useState<Debuffs>(initialBuild2.debuffs);

  return (
    <BuildContext.Provider
      value={{
        build1: {
          character: character1,
          setCharacter: setCharacter1,
          monster: monster1,
          setMonster: setMonster1,
          buffs: buffs1,
          setBuffs: setBuffs1,
          debuffs: debuffs1,
          setDebuffs: setDebuffs1,
        },
        build2: {
          character: character2,
          setCharacter: setCharacter2,
          monster: monster2,
          setMonster: setMonster2,
          buffs: buffs2,
          setBuffs: setBuffs2,
          debuffs: debuffs2,
          setDebuffs: setDebuffs2,
        },
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = () => {
  const value = useContext(BuildContext);

  if (value === null)
    throw new Error("useBuild can only be used within BuildProvider");

  return value;
};
