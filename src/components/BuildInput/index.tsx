import { evaluate } from "mathjs";
import { Character } from "../../data/input";
import { Build, useBuild } from "../../hooks/useBuild";
import "./index.css";

interface BuildInputProps {
  label: string;
  getValue: (character: Character) => number;
  updateValue: (value: number) => (prevState: Character) => Character;
}

interface InputProps {
  getValue: (character: Character) => number;
  updateValue: (value: number) => (prevState: Character) => Character;
  build: Build;
}

const Input = (props: InputProps) => {
  const { getValue, updateValue, build } = props;

  return (
    <input
      type="text"
      defaultValue={getValue(build.character)}
      onBlur={(event) => {
        let parsedValue;
        try {
          parsedValue = evaluate(event.target.value);
          parsedValue = Number(parsedValue);
          if (!Number.isNaN(parsedValue)) {
            build.setCharacter(updateValue(parsedValue));
            event.currentTarget.value = parsedValue + "";
          } else {
            event.currentTarget.value = getValue(build.character) + "";
          }
        } catch (error) {
          event.currentTarget.value = getValue(build.character) + "";
        }
      }}
    />
  );
};

const BuildInput = (props: BuildInputProps) => {
  const { label, getValue, updateValue } = props;
  const { build1, build2 } = useBuild();

  return (
    <div className="build-input">
      <b>{label}</b>
      <Input build={build1} getValue={getValue} updateValue={updateValue} />
      <Input build={build2} getValue={getValue} updateValue={updateValue} />
    </div>
  );
};

export default BuildInput;
