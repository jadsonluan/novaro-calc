import { evaluate } from "mathjs";
import { Character, Monster } from "../../data/input";
import { Build, useBuild } from "../../hooks/useBuild";
import "./index.css";

export interface BuildInputProps<T extends Character | Monster> {
  label: string;
  getValue: (target: T) => number;
  updateValue: (value: number) => (prevState: T) => T;
  target: (build: Build) => T;
  setTarget: (build: Build) => (target: T | ((prevState: T) => T)) => void;
  min?: number;
  max?: number;
}
interface InputProps<T extends Character | Monster>
  extends Omit<BuildInputProps<T>, "label"> {
  build: Build;
}

interface BuildMonsterInputProps<T extends Monster>
  extends Omit<BuildInputProps<T>, "target" | "setTarget"> {}
interface BuildCharacterInputProps<T extends Character>
  extends Omit<BuildInputProps<T>, "target" | "setTarget"> {}

function Input<T extends Character | Monster>({ getValue, updateValue, target, setTarget, build, min = 0, max }: InputProps<T>) {
  const obj = target(build);
  const update = setTarget(build);

  return (
    <div className="input">
      <input
        type="text"
        key={getValue(obj)}
        defaultValue={getValue(obj)}
        onBlur={(event) => {
          let parsedValue;
          try {
            parsedValue = evaluate(event.target.value);
            parsedValue = Number(parsedValue);

            if (min !== undefined) {
              parsedValue = Math.max(parsedValue, min);
            }

            if (max !== undefined) {
              parsedValue = Math.min(parsedValue, max);
            }

            if (!Number.isNaN(parsedValue)) {
              update(updateValue(parsedValue));
              event.currentTarget.value = `${parsedValue}`;
            } else {
              if (event.target.value === "") event.currentTarget.value = `${min}`;
            }
          } catch (error) {
            event.currentTarget.value = `${getValue(obj)}`;
          }
        }}
      />
    </div>
  );
}

function BuildInput<T extends Character | Monster>(props: BuildInputProps<T>) {
  const { label } = props;
  const { build1, build2 } = useBuild();

  return (
    <div className="build-input">
      <span>{label}</span>
      <Input build={build1} {...props} />
      <Input build={build2} {...props} />
    </div>
  );
}

export const BuildCharacterInput = (
  props: BuildCharacterInputProps<Character>
) => {
  return (
    <BuildInput
      {...props}
      target={(build: Build) => build.character}
      setTarget={(build: Build) => build.setCharacter}
    />
  );
};

export const BuildMonsterInput = (props: BuildMonsterInputProps<Monster>) => {
  return (
    <BuildInput
      {...props}
      target={(build: Build) => build.monster}
      setTarget={(build: Build) => build.setMonster}
    />
  );
};