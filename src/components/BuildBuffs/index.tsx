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
        <BuildBuffCheckBox
          label="True Sight"
          getValue={(buffs: Buffs) => buffs.trueSight}
          updateValue={(value: boolean) => (prevState: Buffs) => ({
            ...prevState,
            trueSight: value,
          })}
        />
        <BuildBuffCheckBox
          label="Fear Breeze"
          getValue={(buffs: Buffs) => buffs.fearBreeze}
          updateValue={(value: boolean) => (prevState: Buffs) => ({
            ...prevState,
            fearBreeze: value,
          })}
        />
        <BuildBuffCheckBox
          label="Unlimit"
          getValue={(buffs: Buffs) => buffs.unlimit}
          updateValue={(value: boolean) => (prevState: Buffs) => ({
            ...prevState,
            unlimit: value,
          })}
        />
        <BuildBuffCheckBox
          label="Shadow Warrior"
          getValue={(buffs: Buffs) => buffs.shadowWarrior}
          updateValue={(value: boolean) => (prevState: Buffs) => ({
            ...prevState,
            shadowWarrior: value,
          })}
        />
        <BuildBuffCheckBox
          label="Earth Charm"
          getValue={(buffs: Buffs) => buffs.earthCharm}
          updateValue={(value: boolean) => (prevState: Buffs) => ({
            ...prevState,
            earthCharm: value,
          })}
        />
      </div>
    </div>
  );
};

export default BuildBuffs;
