import { Character, Monster } from "../../data/input";
import { Build, useBuild } from "../../hooks/useBuild";
import "./index.css";

export interface BuildCheckBoxProps<T extends Character | Monster> {
  label: string;
  getValue: (target: T) => boolean;
  updateValue: (value: boolean) => (prevState: T) => T;
  target: (build: Build) => T;
  setTarget: (build: Build) => (target: T | ((prevState: T) => T)) => void;
}

interface CheckBoxProps<T extends Character | Monster>
  extends Omit<BuildCheckBoxProps<T>, "label"> {
  build: Build;
}

interface BuildCharacterCheckBoxProps<T extends Character>
  extends Omit<BuildCheckBoxProps<T>, "target" | "setTarget"> {}
interface BuildMonsterCheckBoxProps<T extends Monster>
  extends Omit<BuildCheckBoxProps<T>, "target" | "setTarget"> {}

function CheckBox<T extends Character | Monster>(props: CheckBoxProps<T>) {
  const { getValue, updateValue, target, setTarget, build } = props;

  const obj: T = target(build);
  const update = setTarget(build);

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        defaultChecked={getValue(obj)}
        onChange={(event) => {
          update(updateValue(event.target.checked));
        }}
      />
    </div>
  );
}

function BuildCheckBox<T extends Character | Monster>(
  props: BuildCheckBoxProps<T>
) {
  const { label } = props;

  const { build1, build2 } = useBuild();

  return (
    <div className="checkbox-container">
      <label>{label}</label>
      <CheckBox {...props} build={build1} />
      <CheckBox {...props} build={build2} />
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
