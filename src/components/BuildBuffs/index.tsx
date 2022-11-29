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
          label="Magnum Break"
          getValue={(buffs: Buffs) => buffs.magnumBreak}
          updateValue={(value: boolean) => (prevState: Buffs) => ({
            ...prevState,
            magnumBreak: value,
          })}
        />
        <BuildBuffCheckBox
          label="Shield Spell"
          getValue={(buffs: Buffs) => buffs.shieldSpell}
          updateValue={(value: boolean) => (prevState: Buffs) => ({
            ...prevState,
            shieldSpell: value,
          })}
        />
        <BuildBuffCheckBox
          label="Inspiration"
          getValue={(buffs: Buffs) => buffs.inspiration}
          updateValue={(value: boolean) => (prevState: Buffs) => ({
            ...prevState,
            inspiration: value,
          })}
        />
        <BuildBuffCheckBox
          label="Enchant Deadly Poison"
          getValue={(buffs: Buffs) => buffs.enchantDeadlyPoison}
          updateValue={(value: boolean) => (prevState: Buffs) => ({
            ...prevState,
            enchantDeadlyPoison: value,
          })}
        />
        <BuildBuffCheckBox
          label="Pyrexia"
          getValue={(buffs: Buffs) => buffs.pyrexia}
          updateValue={(value: boolean) => (prevState: Buffs) => ({
            ...prevState,
            pyrexia: value,
          })}
        />
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
