import { Character, Monster } from "../../data/input";
import { Build, useBuild } from "../../hooks/useBuild";
import "./index.css";

export interface Option {
  value: string;
  label: string;
}

interface BuildMonsterSelectProps<T extends Monster>
  extends Omit<BuildSelectProps<T>, "target" | "setTarget"> {}
interface BuildSelectCharacterProps<T extends Character>
  extends Omit<BuildSelectProps<T>, "target" | "setTarget"> {}

export interface BuildSelectProps<T extends Character | Monster> {
  options: Option[];
  label: string;
  getValue: (target: T) => string | number;
  updateValue: (value: string) => (prevState: T) => T;
  target: (build: Build) => T;
  setTarget: (build: Build) => (target: T | ((prevState: T) => T)) => void;
}

interface SelectProps<T extends Character | Monster>
  extends Omit<BuildSelectProps<T>, "label"> {
  build: Build;
}

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

function Select<T extends Character | Monster>(props: SelectProps<T>) {
  const { getValue, updateValue, target, setTarget, options, build } = props;

  const obj: T = target(build);
  const update = setTarget(build);

  return (
    <select
      value={getValue(obj)}
      onChange={(event) => {
        update(updateValue(event.currentTarget.value));
      }}
    >
      {options.map((option, i) => {
        return (
          <option
            key={i}
            value={option.value}
            selected={option.value === getValue(obj)}
          >
            {capitalize(option.label)}
          </option>
        );
      })}
    </select>
  );
}

function BuildSelect<T extends Character | Monster>(
  props: BuildSelectProps<T>
) {
  const { build1, build2 } = useBuild();
  const { label } = props;

  return (
    <div className="select">
      <div>{label}</div>
      <Select {...props} build={build1} />
      <Select {...props} build={build2} />
    </div>
  );
}

export function BuildMonsterSelect(props: BuildMonsterSelectProps<Monster>) {
  return (
    <BuildSelect<Monster>
      {...props}
      target={(build: Build) => build.monster}
      setTarget={(build: Build) => build.setMonster}
    />
  );
}

export function BuildCharacterSelect(
  props: BuildSelectCharacterProps<Character>
) {
  return (
    <BuildSelect<Character>
      {...props}
      target={(build: Build) => build.character}
      setTarget={(build: Build) => build.setCharacter}
    />
  );
}
