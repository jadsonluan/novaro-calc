import { createContext, useContext, useState } from "react";
import { character as initial, Character } from "../data/input";

interface ContextProps {
  build1: {
    character: Character;
    setCharacter: (
      character: Character | ((prevState: Character) => Character)
    ) => void;
  };
  build2: {
    character: Character;
    setCharacter: (
      character: Character | ((prevState: Character) => Character)
    ) => void;
  };
}

const BuildContext = createContext<ContextProps>({
  build1: {
    character: initial,
    setCharacter: (
      _character: Character | ((prevState: Character) => Character)
    ) => {},
  },
  build2: {
    character: initial,
    setCharacter: (
      _character: Character | ((prevState: Character) => Character)
    ) => {},
  },
});

interface BuildProviderProps {
  initialValue1: Character;
  initialValue2: Character;
}

export const BuildProvider: React.FC<BuildProviderProps> = (props) => {
  const { children, initialValue1, initialValue2 } = props;
  const [character1, setCharacter1] = useState(initialValue1);
  const [character2, setCharacter2] = useState(initialValue2);

  return (
    <BuildContext.Provider
      value={{
        build1: { character: character1, setCharacter: setCharacter1 },
        build2: { character: character2, setCharacter: setCharacter2 },
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = (id: 1 | 2) => {
  const value = useContext(BuildContext);

  if (value === null)
    throw new Error("useBuild can only be used within BuildProvider");

  if (id === 1) return value.build1;
  return value.build2;
};
