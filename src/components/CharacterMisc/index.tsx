import "./index.css";
import { Character } from "../../data/input";
import { BuildCharacterSelect, Option } from "../Select";
import WeaponType, { WEAPONS } from "../../data/weapon";
import { getJobsName, INITIAL_JOBS, Job, JOBS } from "../../data/job";
import { ELEMENTS, Element } from "../../data/element";
import { Skill, SKILLS } from "../../data/skills";
import { BuildCharacterCheckBox } from "../BuildCheckBox";

const CharacterMisc = () => {
  const weaponOptions: Option[] = WEAPONS.map((weapon) => ({
    label: weapon,
    value: weapon,
  }));

  const jobOptions: Option[] = Object.keys(JOBS).map((job: string) => ({
    label: job,
    value: job,
    group: JOBS[job as Job].initialJob,
  }));

  const elementOptions: Option[] = ELEMENTS.map((job: string) => ({
    label: job,
    value: job,
  }));

  const skillOptions: Option[] = Object.values(SKILLS).map((skill: Skill) => ({
    label: skill.label,
    value: skill.key,
    group: skill.job
  }));

  return (
    <div className="character-misc">
      <div className="header">
        <b>Misc</b>
        <b>Build 1</b>
        <b>Build 2</b>
      </div>
      <div className="build-content">
        <BuildCharacterSelect
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
        <BuildCharacterSelect
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
        <BuildCharacterSelect
          label="Class"
          options={jobOptions}
          groups={INITIAL_JOBS}
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
        <BuildCharacterSelect
          label="Skill"
          options={skillOptions}
          groups={["All", ...getJobsName()]}
          getValue={(character: Character) => character.skill}
          updateValue={(value: string) => (prevState: Character) => {
            return {
              ...prevState,
              skill: value,
            };
          }}
        />
        <BuildCharacterCheckBox
          label="Critical?"
          getValue={(character: Character) => character.crit}
          updateValue={(value: boolean) => (prevState: Character) => ({
            ...prevState,
            crit: value,
          })}
        />
        <BuildCharacterCheckBox
          label="No Penalty?"
          getValue={(character: Character) => character.ignorePenalty}
          updateValue={(value: boolean) => (prevState: Character) => ({
            ...prevState,
            ignorePenalty: value,
          })}
        />
      </div>
    </div>
  );
};

export default CharacterMisc;
