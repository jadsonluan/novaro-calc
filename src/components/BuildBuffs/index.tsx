import "./index.css";
import { Buffs, emptyBuffs } from "../../data/input";
import { BuildBuffCheckBox } from "../BuildCheckBox";

const capitalize = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, function (str) {
      return str.toUpperCase();
    })
    .trim();
};

const BuildBuffs = () => {
  return (
    <div className="build-buffs">
      <div className="header">
        <b>Buffs</b>
        <b>Build 1</b>
        <b>Build 2</b>
      </div>
      <div className="build-content">
        {Object.getOwnPropertyNames(emptyBuffs).map((buff) => (
          <BuildBuffCheckBox 
            key={buff}
            label={capitalize(buff)}
            getValue={(buffs: Buffs) => buffs[buff as keyof Buffs].active}
            updateValue={(value: boolean) => (prevState: Buffs) => ({
              ...prevState,
              [buff]: {
                ...prevState[buff as keyof Buffs],
                active: value,
              },
            })}
            tooltip={emptyBuffs[buff as keyof Buffs].tooltip}
          />
        ))}
      </div>
    </div>
  );
};

export default BuildBuffs;
