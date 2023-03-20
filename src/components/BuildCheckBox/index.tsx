import { Buffs } from "../../data/buffs";
import { Character } from "../../data/character";
import { Debuffs } from "../../data/debuff";
import { Monster } from "../../data/monster";
import { Build, useBuild } from "../../hooks/useBuild";
import "./index.css";

export interface BuildCheckBoxProps<T extends Character | Monster | Buffs | Debuffs> {
  label: string;
  iconURL?: string;
  noIcon?: boolean;
  oneBuild?: boolean;
  getValue: (target: T) => boolean;
  updateValue: (value: boolean) => (prevState: T) => T;
  target: (build: Build) => T;
  setTarget: (build: Build) => (target: T | ((prevState: T) => T)) => void;
  tooltip?: string;
}

interface CheckBoxProps<T extends Character | Monster | Buffs | Debuffs>
  extends Omit<BuildCheckBoxProps<T>, "label"> {
  build: Build;
}

interface BuildCharacterCheckBoxProps<T extends Character>
  extends Omit<BuildCheckBoxProps<T>, "target" | "setTarget"> {}
interface BuildMonsterCheckBoxProps<T extends Monster>
  extends Omit<BuildCheckBoxProps<T>, "target" | "setTarget"> {}
interface BuildBuffCheckBoxProps<T extends Buffs>
  extends Omit<BuildCheckBoxProps<T>, "target" | "setTarget"> {}
  interface BuildDebuffCheckBoxProps<T extends Debuffs>
  extends Omit<BuildCheckBoxProps<T>, "target" | "setTarget"> {}

function CheckBox<T extends Character | Monster | Buffs | Debuffs>(
  props: CheckBoxProps<T>
) {
  const { getValue, updateValue, target, setTarget, build } = props;

  const obj: T = target(build);
  const update = setTarget(build);

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        checked={getValue(obj)}
        onChange={(event) => {
          update(updateValue(event.target.checked));
        }}
      />
    </div>
  );
}

function BuildCheckBox<T extends Character | Monster | Buffs | Debuffs>(
  props: BuildCheckBoxProps<T>
) {
  const { label, iconURL, noIcon, oneBuild } = props;

  const { build1, build2 } = useBuild();

  return (
    <div className="checkbox-container">
      {iconURL ? (
        <img src={iconURL} alt="Buff or Debuff Icon" />
      ) : noIcon ? null : <span className="material-symbols-outlined">close</span>}
      <label title={props.tooltip}>{label}</label>
      <CheckBox {...props} build={build1} />
      {!oneBuild && <CheckBox {...props} build={build2} />}
    </div>
  );
}

export const BuildCharacterCheckBox = (
  props: BuildCharacterCheckBoxProps<Character>
) => {
  return (
    <BuildCheckBox<Character>
      {...props}
      target={(build: Build) => build.character}
      setTarget={(build: Build) => build.setCharacter}
    />
  );
};

export const BuildMonsterCheckBox = (
  props: BuildMonsterCheckBoxProps<Monster>
) => {
  return (
    <BuildCheckBox<Monster>
      {...props}
      target={(build: Build) => build.monster}
      setTarget={(build: Build) => build.setMonster}
    />
  );
};

export const BuildBuffCheckBox = (props: BuildBuffCheckBoxProps<Buffs>) => {
  return (
    <BuildCheckBox<Buffs>
      {...props}
      target={(build: Build) => build.buffs}
      setTarget={(build: Build) => build.setBuffs}
    />
  );
};

export const BuildDebuffCheckBox = (props: BuildDebuffCheckBoxProps<Debuffs>) => {
  return (
    <BuildCheckBox<Debuffs>
      {...props}
      target={(build: Build) => build.debuffs}
      setTarget={(build: Build) => build.setDebuffs}
    />
  );
};