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
        let value = Number(event.target.value);
        if (!Number.isNaN(value)) build.setCharacter(updateValue(value));
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
