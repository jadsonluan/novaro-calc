import "./index.css";
import { Buffs } from "../../data/buffs";
import { BuildBuffCheckBox } from "../BuildCheckBox";
import { capitalize } from "../BuildBuffsAndDebuffs";
import { INITIAL_JOBS } from "../../data/job";
import React, { Fragment } from "react";

const BuildBuffs = ({ emptyBuffs }: { emptyBuffs: Buffs }) => {
  const buffs = Object.getOwnPropertyNames(emptyBuffs);
  return (
    <div className="build-buffs">
      <div className="inside-header">
        <b>Name</b>
        <b>Build 1</b>
        <b>Build 2</b>
      </div>
      <div className="build-content">
        {INITIAL_JOBS.map((job, i) => {
          const groupOptions = buffs.filter(
            (buff) => emptyBuffs[buff as keyof Buffs]?.job === job
          );

          return groupOptions.length > 0 && (
            <Fragment key={job}>
              <b>{job}</b>
              <div className="buff-options">
              {groupOptions.map((buff) => (
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
            </Fragment>
          )
        })}
      </div>
    </div>
  );
};

export default BuildBuffs;
