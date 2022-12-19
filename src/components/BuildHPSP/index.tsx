import "./index.css";
import { BuildCharacterInput } from "../BuildInput";
import { Character } from "../../data/character";

const BuildHPSP = () => (
  <div className="build-stats">
    <div className="build-header">
      <b>HP/SP</b>
      <b>Build 1</b>
      <b>Build 2</b>
    </div>
    <div className="build-content">
      <BuildCharacterInput
        label="HP %"
        getValue={(character: Character) => character.hp.percent}
        updateValue={(value: number) => (prev: Character) => {
          const { hp } = prev;
          return { ...prev, hp: { ...hp, percent: value } };
        }}
      />
      <BuildCharacterInput
        label="HP Flat"
        getValue={(character: Character) => character.hp.flat}
        updateValue={(value: number) => (prev: Character) => {
          const { hp } = prev;
          return { ...prev, hp: { ...hp, flat: value } };
        }}
      />
      <BuildCharacterInput
        label="SP %"
        getValue={(character: Character) => character.sp.percent}
        updateValue={(value: number) => (prev: Character) => {
          const { sp } = prev;
          return { ...prev, sp: { ...sp, percent: value } };
        }}
      />
      <BuildCharacterInput
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
