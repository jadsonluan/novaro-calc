import "./index.css";
import { BuildCharacterSelect, Option } from "../Select";
import WeaponType, { GRADES, Grade, WEAPONS } from "../../data/weapon";
import { getJobsName, INITIAL_JOBS, Job, JOBS } from "../../data/job";
import { ELEMENTS, Element } from "../../data/element";
import { Skill, SKILLS } from "../../data/skills";
import { MATK_SKILLS } from "../../data/matkSkills";
import { BuildCharacterCheckBox } from "../BuildCheckBox";
import React from "react";
import { Character } from "../../data/character";

const weaponOptions: Option[] = WEAPONS.map((weapon) => ({
  label: weapon,
  value: weapon,
}));

const jobOptions: Option[] = Object.keys(JOBS).map((job: string) => ({
  label: job,
  value: job,
  group: JOBS[job as Job].initialJob,
}));

const elementOptions: Option[] = ELEMENTS.map((element: string) => ({
  label: element,
  value: element,
}));

const gradeOptions: Option[] = GRADES.map((grade: string) => ({
  label: grade,
  value: grade,
}));

const CharacterMisc = ({ children }: { children: React.ReactChild[] }) => {
  return (
    <div className="character-misc">
      <div className="header">
        <b>Misc</b>
        <b>Build 1</b>
        <b>Build 2</b>
      </div>
      <div className="build-content">
        {children}
      </div>
    </div>
  )
}

export const CharacterMiscATK = () => {
  const skillOptions: Option[] = Object.values(SKILLS).map((skill: Skill) => ({
    label: skill.label,
    value: skill.key,
    group: skill.job
  }));

  return (
    <CharacterMisc>
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
          label="Grade"
          options={gradeOptions}
          getValue={(character: Character) =>
            character.weapon.grade as string
          }
          updateValue={(value: string) => (prevState: Character) => {
            const { weapon } = prevState;
            return {
              ...prevState,
              weapon: {
                ...weapon,
                grade: value as unknown as Grade,
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
          noIcon
          getValue={(character: Character) => character.crit}
          updateValue={(value: boolean) => (prevState: Character) => ({
            ...prevState,
            crit: value,
          })}
        />
        <BuildCharacterCheckBox
          label="No Penalty?"
          tooltip="No size penalty"
          noIcon
          getValue={(character: Character) => character.ignorePenalty}
          updateValue={(value: boolean) => (prevState: Character) => ({
            ...prevState,
            ignorePenalty: value,
          })}
        />
    </CharacterMisc>
  );
};

export const CharacterMiscMATK = () => {
  const skillOptions: Option[] = Object.values(MATK_SKILLS).map((skill: Skill) => ({
    label: skill.label,
    value: skill.key,
    group: skill.job
  }));

  return (
    <CharacterMisc>
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
          label="Grade"
          options={gradeOptions}
          getValue={(character: Character) =>
            character.weapon.grade as string
          }
          updateValue={(value: string) => (prevState: Character) => {
            const { weapon } = prevState;
            return {
              ...prevState,
              weapon: {
                ...weapon,
                grade: value as unknown as Grade,
              },
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
    </CharacterMisc>
  );
};