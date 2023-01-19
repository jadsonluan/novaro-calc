import "./index.css";
import { BuildDebuffCheckBox } from "../BuildCheckBox";
import { capitalize } from "../BuildBuffsAndDebuffs";
import { Debuffs } from "../../data/debuff";
import { INITIAL_JOBS } from "../../data/job";
import { Fragment } from "react";

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
      {["All", ...INITIAL_JOBS].map((job, i) => {
          const groupOptions = debuffs.filter(
            (debuff) => emptyDebuffs[debuff as keyof Debuffs]?.job === job
          );

          return groupOptions.length > 0 && (
            <Fragment key={job}>
              <b>{job}</b>
              <div className="debuff-options">
              {groupOptions.map((debuff) => (
                <BuildDebuffCheckBox
                  key={debuff}
                  label={emptyDebuffs[debuff as keyof Debuffs]?.label || capitalize(debuff)}
                  iconURL={emptyDebuffs[debuff as keyof Debuffs]?.iconURL}
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
            </Fragment>
          )
        })}
      </div>
    </div>
  );
};

export default BuildDebuffs;
