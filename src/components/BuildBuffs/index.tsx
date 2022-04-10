import "./index.css";
import { Buffs } from "../../data/input";
import { BuildBuffCheckBox } from "../BuildCheckBox";

const BuildBuffs = () => {
  return (
    <div className="build-buffs">
      <div className="header">
        <b>Buffs</b>
        <b>Build 1</b>
        <b>Build 2</b>
      </div>
      <div className="build-content">
        <BuildBuffCheckBox
          label="Spirit Sphere 15x"
          getValue={(buffs: Buffs) => buffs.allSpheres}
          updateValue={(value: boolean) => (prevState: Buffs) => ({
            ...prevState,
            allSpheres: value,
          })}
        />
      </div>
    </div>
  );
};

export default BuildBuffs;
