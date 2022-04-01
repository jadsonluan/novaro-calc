import { Character } from "../../data/input";
import { useBuild } from "../../hooks/useBuild";
import "./index.css";

interface BuildInputProps {
  label: string;
  getValue: (character: Character) => number;
  updateValue: (value: number) => (prevState: Character) => Character;
}

const BuildInput = (props: BuildInputProps) => {
  const { label, getValue, updateValue } = props;
  const { character: character1, setCharacter: setCharacter1 } = useBuild(1);
  const { character: character2, setCharacter: setCharacter2 } = useBuild(2);

  return (
    <div className="build-input">
      <b>{label}</b>
      <input
        type="text"
        defaultValue={getValue(character1)}
        onBlur={(event) => {
          let value = Number(event.target.value);
          if (!Number.isNaN(value)) setCharacter1(updateValue(value));
        }}
      />
      <input
        type="text"
        defaultValue={getValue(character2)}
        onBlur={(event) => {
          const value = Number(event.target.value);
          if (!Number.isNaN(value)) setCharacter2(updateValue(value));
        }}
      />
    </div>
  );
};

export default BuildInput;
