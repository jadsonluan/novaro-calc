import "./index.css";
import BuildInput from "../BuildInput";
import { Character } from "../../data/input";

const BuildHPSP = () => (
  <div className="build-stats">
    <div className="build-header">
      <div>HP/SP</div>
      <b>Build 1</b>
      <b>Build 2</b>
    </div>
    <div className="build-content">
      <BuildInput
        label="HP %"
        getValue={(character: Character) => character.hp.percent}
        updateValue={(value: number) => (prev: Character) => {
          const { hp } = prev;
          return { ...prev, hp: { ...hp, percent: value } };
        }}
      />
      <BuildInput
        label="HP Flat"
        getValue={(character: Character) => character.hp.flat}
        updateValue={(value: number) => (prev: Character) => {
          const { hp } = prev;
          return { ...prev, hp: { ...hp, flat: value } };
        }}
      />
      <BuildInput
        label="SP %"
        getValue={(character: Character) => character.sp.percent}
        updateValue={(value: number) => (prev: Character) => {
          const { sp } = prev;
          return { ...prev, sp: { ...sp, percent: value } };
        }}
      />
      <BuildInput
        label="SP Flat"
        getValue={(character: Character) => character.sp.flat}
        updateValue={(value: number) => (prev: Character) => {
          const { sp } = prev;
          return { ...prev, sp: { ...sp, flat: value } };
        }}
      />
    </div>
  </div>
);

export default BuildHPSP;
