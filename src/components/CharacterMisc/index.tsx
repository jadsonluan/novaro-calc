import "./index.css";
import { Character } from "../../data/input";
import Select, { Option } from "../Select";
import WeaponType, { WEAPONS } from "../../data/weapon";
import { Job, JOBS } from "../../data/job";

const CharacterMisc = () => {
  const weaponOptions: Option[] = WEAPONS.map((weapon) => ({
    label: weapon,
    value: weapon,
  }));

  const jobOptions: Option[] = Object.keys(JOBS).map((job: string) => ({
    label: job,
    value: job,
  }));

  return (
    <div className="character-misc">
      <div className="build-header">
        <div>Misc</div>
        <b>Build 1</b>
        <b>Build 2</b>
      </div>
      <div className="build-content">
        <Select
          label="Weapon"
          options={weaponOptions}
          getValue={(character: Character) => character.weapon.type as string}
          updateValue={(value: string) => (prevState: Character) => {
            const { weapon } = prevState;
            return {
              ...prevState,
              weapon: { ...weapon, type: value as WeaponType },
            };
          }}
        />
        <Select
          label="Class"
          options={jobOptions}
          getValue={(character: Character) => character.job}
          updateValue={(value: string) => (prevState: Character) => {
            const { hp, sp } = prevState;
            const { baseHP, baseSP } = JOBS[value as Job];
            return {
              ...prevState,
              hp: { ...hp, base: baseHP },
              sp: { ...sp, base: baseSP },
              job: value as Job,
            };
          }}
        />
        {/* <Select label="Weapon" options={weaponOptions} />
        <Select label="Element" options={weaponOptions} />
        <Select label="Skill" options={weaponOptions} /> */}
      </div>
    </div>
  );
};

export default CharacterMisc;
