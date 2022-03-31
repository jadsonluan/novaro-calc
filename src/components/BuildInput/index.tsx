import "./index.css";

interface BuildInputProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BuildInput = (props: BuildInputProps) => {
  const { label, value, onChange } = props;
  return (
    <div className="input">
      <label>{label}</label>
      <input type="text" value={value} onChange={onChange}></input>
    </div>
  );
};
