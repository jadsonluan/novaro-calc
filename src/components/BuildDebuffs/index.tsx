import "./index.css";
import { Debuffs } from "../../data/input";
import { BuildDebuffCheckBox } from "../BuildCheckBox";
import { capitalize } from "../BuildBuffsAndDebuffs";

const BuildDebuffs = ({ emptyDebuffs }: { emptyDebuffs: Debuffs }) => {
  return (
    <div className="build-debuffs">
      <div className="inside-header">
        <b>Name</b>
        <b>Build 1</b>
        <b>Build 2</b>
      </div>
      <div className="build-content">
        {Object.getOwnPropertyNames(emptyDebuffs).map((debuff) => (
          <BuildDebuffCheckBox 
            key={debuff}
            label={capitalize(debuff)}
            getValue={(debuffs: Debuffs) => debuffs[debuff as keyof Debuffs]?.active || false}
            updateValue={(value: boolean) => (prevState: Debuffs) => ({
              ...prevState,
              [debuff]: {
                ...prevState[debuff as keyof Debuffs],
                active: value,
              },
            })}
            tooltip={emptyDebuffs[debuff as keyof Debuffs]?.tooltip}
          />
        ))}
      </div>
    </div>
  );
};

export default BuildDebuffs;
