import { createContext, useContext, useState } from "react";
import {
  emptyCharacter as initialCharacter,
  emptyMonster as initialMonster,
  emptyBuffs as initialBuffs,
  emptyDebuffs as initialDebuffs,
  Character,
  Monster,
  Buffs,
  Debuffs,
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

interface BuildProviderProps {
  initialBuild1: { character: Character; monster: Monster, buffs: Buffs, debuffs: Debuffs };
  initialBuild2: { character: Character; monster: Monster, buffs: Buffs, debuffs: Debuffs };
}

export const BuildProvider: React.FC<BuildProviderProps> = (props) => {
  const { children, initialBuild1, initialBuild2 } = props;

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
