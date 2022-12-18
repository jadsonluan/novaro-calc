import "./index.css";
import { BuildDebuffCheckBox } from "../BuildCheckBox";
import { capitalize } from "../BuildBuffsAndDebuffs";
import { Debuffs } from "../../data/debuff";
import { INITIAL_JOBS } from "../../data/job";

const BuildDebuffs = ({ emptyDebuffs }: { emptyDebuffs: Debuffs }) => {
  const debuffs = Object.getOwnPropertyNames(emptyDebuffs);
  return (
    <div className="build-debuffs">
      <div className="inside-header">
        <b>Name</b>
        <b>Build 1</b>
        <b>Build 2</b>
      </div>
      <div className="build-content">
      {INITIAL_JOBS.map((job, i) => {
          const groupOptions = debuffs.filter(
            (debuff) => emptyDebuffs[debuff as keyof Debuffs]?.job === job
          );

          return groupOptions.length > 0 && (
            <>
              <b>{job}</b>
              <div className="debuff-options">
              {groupOptions.map((debuff) => (
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
            </>
          )
        })}
      </div>
    </div>
  );
};

export default BuildDebuffs;
