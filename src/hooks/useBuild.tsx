import { createContext, useContext, useState } from "react";
import {
  character as initialCharacter,
  emptyMonster as initialMonster,
  Character,
  Monster,
} from "../data/input";

export interface Build {
  character: Character;
  setCharacter: (
    character: Character | ((prevState: Character) => Character)
  ) => void;
  monster: Monster;
  setMonster: (monster: Monster | ((prevState: Monster) => Monster)) => void;
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
};

const BuildContext = createContext<ContextProps>({
  build1: initialBuild,
  build2: initialBuild,
});

interface BuildProviderProps {
  initialBuild1: { character: Character; monster: Monster };
  initialBuild2: { character: Character; monster: Monster };
}

export const BuildProvider: React.FC<BuildProviderProps> = (props) => {
  const { children, initialBuild1, initialBuild2 } = props;

  const [character1, setCharacter1] = useState(initialBuild1.character);
  const [character2, setCharacter2] = useState(initialBuild2.character);

  const [monster1, setMonster1] = useState(initialBuild1.monster);
  const [monster2, setMonster2] = useState(initialBuild2.monster);

  return (
    <BuildContext.Provider
      value={{
        build1: {
          character: character1,
          setCharacter: setCharacter1,
          monster: monster1,
          setMonster: setMonster1,
        },
        build2: {
          character: character2,
          setCharacter: setCharacter2,
          monster: monster2,
          setMonster: setMonster2,
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
