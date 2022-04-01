import { Character } from "../../data/input";
import { useBuild } from "../../hooks/useBuild";
import "./index.css";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  label: string;
  getValue: (character: Character) => string;
  updateValue: (value: string) => (prevState: Character) => Character;
}

const Select = (props: SelectProps) => {
  const { build1, build2 } = useBuild();

  const { options, label, getValue, updateValue } = props;

  return (
    <div className="select">
      <div>{label}</div>
      <select
        value={getValue(build1.character)}
        onChange={(event) => {
          build1.setCharacter(updateValue(event.currentTarget.value));
        }}
      >
        {options.map((option, i) => {
          return (
            <option
              key={i}
              value={option.value}
              selected={option.value === getValue(build1.character)}
            >
              {option.label}
            </option>
          );
        })}
      </select>
      <select
        value={getValue(build2.character)}
        onChange={(event) => {
          build2.setCharacter(updateValue(event.currentTarget.value));
        }}
      >
        {options.map((option, i) => {
          return (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};;

export default Select;
