import "./index.css";
import { Buffs } from "../../data/input";
import { BuildBuffCheckBox } from "../BuildCheckBox";
import { capitalize } from "../BuildBuffsAndDebuffs";

const BuildBuffs = ({ emptyBuffs }: { emptyBuffs: Buffs }) => {
  return (
    <div className="build-buffs">
      <div className="inside-header">
        <b>Name</b>
        <b>Build 1</b>
        <b>Build 2</b>
      </div>
      <div className="build-content">
        {Object.getOwnPropertyNames(emptyBuffs).map((buff) => (
          <BuildBuffCheckBox 
            key={buff}
            label={capitalize(buff)}
            getValue={(buffs: Buffs) => buffs[buff as keyof Buffs]?.active || false}
            updateValue={(value: boolean) => (prevState: Buffs) => ({
              ...prevState,
              [buff]: {
                ...prevState[buff as keyof Buffs],
                active: value,
              },
            })}
            tooltip={emptyBuffs[buff as keyof Buffs]?.tooltip}
          />
        ))}
      </div>
    </div>
  );
};

export default BuildBuffs;
