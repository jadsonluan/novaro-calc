import "./index.css";
import { Character } from "../../data/input";
import Select, { Option } from "../Select";
import WeaponType, { WEAPONS } from "../../data/weapon";
import { Job, JOBS } from "../../data/job";
import { ELEMENTS, Element } from "../../data/element";
import { Skill, SKILLS } from "../../data/skills";

const CharacterMisc = () => {
  const weaponOptions: Option[] = WEAPONS.map((weapon) => ({
    label: weapon,
    value: weapon,
  }));

  const jobOptions: Option[] = Object.keys(JOBS).map((job: string) => ({
    label: job,
    value: job,
  }));

  const elementOptions: Option[] = ELEMENTS.map((job: string) => ({
    label: job,
    value: job,
  }));

  const skillOptions: Option[] = Object.values(SKILLS).map((skill: Skill) => ({
    label: skill.name,
    value: skill.key,
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
          label="Element"
          options={elementOptions}
          getValue={(character: Character) =>
            character.weapon.element as string
          }
          updateValue={(value: string) => (prevState: Character) => {
            const { weapon } = prevState;
            return {
              ...prevState,
              weapon: {
                ...weapon,
                element: value as unknown as Element,
              },
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
        <Select
          label="Skill"
          options={skillOptions}
          getValue={(character: Character) => character.skill}
          updateValue={(value: string) => (prevState: Character) => {
            return {
              ...prevState,
              skill: value,
            };
          }}
        />
      </div>
    </div>
  );
};

export default CharacterMisc;