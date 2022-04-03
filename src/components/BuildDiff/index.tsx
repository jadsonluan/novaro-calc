import "./index.css";

export interface BuildDiffItem {
  label: string;
  value1: number;
  value2: number;
}

interface BuildDiffProps {
  label: string;
  items: BuildDiffItem[];
}

const getDiffClass = (value: number) => {
  if (value > 0) return "positive-diff";
  else if (value < 0) return "negative-diff";
  else return "";
};

const BuildDiff = (props: BuildDiffProps) => {
  const { label, items } = props;

  return (
    <div className="build-diff">
      <div className="header">
        <span>{label}</span>
        <span>Build 1</span>
        <span>Build 2</span>
        <span>Diff</span>
      </div>
      <div className="build-diff-body">
        {items.map((item: BuildDiffItem, i: number) => {
          const { label: description, value1, value2 } = item;
          const diff = ((value2 - value1) / value1) * 100;
          return (
            <div>
              <div>{description}</div>
              <div>{value1.toLocaleString()}</div>
              <div>{value2.toLocaleString()}</div>
              <div className={getDiffClass(diff)}>{diff.toFixed(2)}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuildDiff;
