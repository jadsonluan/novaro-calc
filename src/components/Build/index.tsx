import React from "react";
import { character as initialCharacter, monster } from "../../data/input";
import { BuildProvider, useBuild } from "../../hooks/useBuild";
import { getFinalDamage } from "../../services/atk";

interface BuildInputProps {
  prop: string;
  label: string;
  value: number;
  // getValue: (character: Character) => number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BuildInput = (props: BuildInputProps) => {
  const { prop, label, value, onChange } = props;
  // const { character, updateCharacter } = useBuild();

  return (
    <div className="input">
      <label>{label}</label>
      <input type="text" value={value} onChange={onChange}></input>
    </div>
  );
};

const InternalBuild = () => {
  const { character, updateCharacter } = useBuild();

  const minDamage = getFinalDamage("min", character, monster);
  const maxDamage = getFinalDamage("max", character, monster);

  return (
    <div>
      <div>
        <BuildInput
          prop="baseLevel"
          label="Base Level"
          value={character.baseLevel}
          onChange={(event) =>
            updateCharacter("baseLevel", Number(event.target.value))
          }
        />
        <BuildInput
          prop="equipATK"
          label="Equip ATK"
          value={character.equipATK}
          onChange={(event) =>
            updateCharacter("equipATK", Number(event.target.value))
          }
        />
        <BuildInput
          prop="baseLevel"
          label="Base Level"
          value={character.baseLevel}
          onChange={(event) =>
            updateCharacter("baseLevel", Number(event.target.value))
          }
        />
      </div>
      <div>
        <b>Minimum Damage:</b> {minDamage.toLocaleString()}
      </div>
      <div>
        <b>Maximum Damage:</b> {maxDamage.toLocaleString()}
      </div>
    </div>
  );
};

const Build = () => {
  return (
    <BuildProvider initialValue={initialCharacter}>
      <InternalBuild />
    </BuildProvider>
  );
};

export default Build;
