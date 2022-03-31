import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { character as initial, Character } from "../data/input";

const initialValue: Character = {
  baseLevel: 0,
  job: "",
  skill: "basic_attack",
  stats: {
    str: 0,
    agi: 0,
    vit: 0,
    int: 0,
    dex: 0,
    luk: 0,
  },
  hp: {
    base: 1,
    flat: 0,
    percent: 0,
  },
  sp: {
    base: 1,
    flat: 0,
    percent: 0,
  },
  weapon: {
    atk: 0,
    element: "neutral",
    level: 1,
    refine: 0,
    type: "without",
  },
  modifiers: {
    advancedKatarMastery: 0,
    class: 0,
    dmg: 0,
    finalDmg: 0,
    melee: 0,
    monster: 0,
    race: 0,
    size: 0,
    skill: 0,
    targetProperty: 0,
  },
  shadowWeaponRefine: 0,
  equipATK: 0,
  consumableATK: 0,
  bonusStatusATK: 0,
  ammoATK: 0,
  pseudoBuffATK: 0,
  masteryATK: 0,
  buffATK: 0,
  bypass: 0,
};

const BuildContext = createContext({
  character: initial,
  updateCharacter: (_key: string, _value: number) => {},
});

interface BuildProviderProps {
  initialValue: Character;
}

export const BuildProvider: React.FC<BuildProviderProps> = (props) => {
  const { children, initialValue } = props;
  const [character, setCharacter] = useState(initialValue);

  const updateCharacter = useCallback(
    (key: string, value: number) => {
      if (!Number.isNaN(value)) {
        setCharacter((prevState) => ({ ...prevState, [key]: value }));
      }
    },
    [setCharacter]
  );

  return (
    <BuildContext.Provider value={{ character, updateCharacter }}>
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
