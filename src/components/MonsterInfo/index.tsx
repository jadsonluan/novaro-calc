import "./index.css";
import { BuildMonsterSelect, Option } from "../Select";
import { ELEMENTS, Element } from "../../data/element";
import { BuildMonsterInput } from "../BuildInput";
import { Monster, SIZES, MONSTER_TYPES, MonsterType, Size, ElementLevel, Race, RACES } from "../../data/monster";
import { MonsterTemplate, monsterTemplates } from "../../data/monstersTemplate";

const MonsterInfoATK = () => {
  return (
    <>
      <p className="separator-label">Level & Stats</p>
      <div className="box">
        <BuildMonsterInput
          label="LVL"
          getValue={(monster: Monster) => monster.baseLevel}
          updateValue={(value: number) => (prev: Monster) => ({
            ...prev,
            baseLevel: value,
          })}
          min={1}
        />
        <BuildMonsterInput
          label="VIT"
          getValue={(monster: Monster) => monster.VIT}
          updateValue={(value: number) => (prev: Monster) => ({
            ...prev,
            VIT: value,
          })}
        />
      </div>

      <p className="separator-label">Resistances</p>
      <div className="box">
        <BuildMonsterInput
          label="DEF"
          getValue={(monster: Monster) => monster.hardDEF}
          updateValue={(value: number) => (prev: Monster) => ({
            ...prev,
            hardDEF: value,
          })}
        />
        <BuildMonsterInput
          label="RES"
          getValue={(monster: Monster) => monster.res}
          updateValue={(value: number) => (prev: Monster) => ({
            ...prev,
            res: value,
          })}
        />
        <BuildMonsterInput
          label="Multiplier"
          tooltip="Damage reduction multiplier applied to the monster. Between 0.01 (1%) and 1 (100%). Example: the damage against a green aura MVP will be multiplied by 0.1 (10%)."
          getValue={(monster: Monster) => monster.damageMultiplier}
          updateValue={(value: number) => (prev: Monster) => ({
            ...prev,
            damageMultiplier: value,
          })}
          min={0.01}
          max={1}
        />
      </div>
    </>
  );
};

const MonsterInfoMATK = () => {
  return (
    <>
      <p className="separator-label">Level & Stats</p>
      <div className="box">
        <BuildMonsterInput
          label="LVL"
          getValue={(monster: Monster) => monster.baseLevel}
          updateValue={(value: number) => (prev: Monster) => ({
            ...prev,
            baseLevel: value,
          })}
          min={1}
        />
        <BuildMonsterInput
          label="VIT"
          getValue={(monster: Monster) => monster.VIT}
          updateValue={(value: number) => (prev: Monster) => ({
            ...prev,
            VIT: value,
          })}
        />
        <BuildMonsterInput
          label="INT"
          getValue={(monster: Monster) => monster.INT}
          updateValue={(value: number) => (prev: Monster) => ({
            ...prev,
            INT: value,
          })}
        />
      </div>

      <p className="separator-label">Resistances</p>
      <div className="box">
        <BuildMonsterInput
          label="MDEF"
          getValue={(monster: Monster) => monster.hardMDEF}
          updateValue={(value: number) => (prev: Monster) => ({
            ...prev,
            hardMDEF: value,
          })}
        />
        <BuildMonsterInput
          label="MRES"
          getValue={(monster: Monster) => monster.mres}
          updateValue={(value: number) => (prev: Monster) => ({
            ...prev,
            mres: value,
          })}
        />
        <BuildMonsterInput
          label="Multiplier"
          tooltip="Damage reduction multiplier applied to the monster. Between 0.01 (1%) and 1 (100%). Example: the damage against a green aura MVP will be multiplied by 0.1 (10%)."
          getValue={(monster: Monster) => monster.damageMultiplier}
          updateValue={(value: number) => (prev: Monster) => ({
            ...prev,
            damageMultiplier: value,
          })}
          min={0.01}
          max={1}
        />
      </div>
    </>
  );
};

const MonsterInfo = ({ isMATK }: { isMATK: boolean }) => {
  const monsterTemplatesOptions: Option[] = monsterTemplates.map(
    (monster: MonsterTemplate) => ({
      label: monster.name,
      value: monster.name,
    })
  );

  const sizeOptions: Option[] = SIZES.map((item: string) => ({
    label: item,
    value: item,
  }));

  const monsterTypeOptions: Option[] = MONSTER_TYPES.map((item: string) => ({
    label: item,
    value: item,
  }));

  const raceOptions: Option[] = RACES.map((race: string) => ({
    label: race,
    value: race,
  }));

  const elementOptions: Option[] = ELEMENTS.map((element: string) => ({
    label: element,
    value: element,
  }));

  const elementLvlOptions: Option[] = ["1", "2", "3", "4"].map(
    (item: string) => ({
      label: item,
      value: item,
    })
  );

  return (
    <div className="monster-info">
      <div className="header">
        <b style={{ marginLeft: '-0.5rem' }}>Monster</b>
        <b>Build 1</b>
        <b>Build 2</b>
      </div>
      <div className="build-content">
        <p className="separator-label">Template</p>
        <div className="box">
          <BuildMonsterSelect
            label="Monster"
            options={monsterTemplatesOptions}
            getValue={(monster: Monster) => monster.name as string}
            updateValue={(value: string) => (prevState: Monster) => {
              return {
                ...prevState,
                ...monsterTemplates.find(
                  (monster: MonsterTemplate) => monster.name === value
                ) as unknown as Monster,
              };
            }}
          />
        </div>

        <div>{!isMATK ? <MonsterInfoATK /> : <MonsterInfoMATK />}</div>

        <p className="separator-label">Info</p>
        <div className="box">
          <BuildMonsterSelect
            label="Type"
            options={monsterTypeOptions}
            getValue={(monster: Monster) => monster.type as string}
            updateValue={(value: string) => (prevState: Monster) => {
              return {
                ...prevState,
                type: value as unknown as MonsterType,
              };
            }}
          />
          <BuildMonsterSelect
            label="Size"
            options={sizeOptions}
            getValue={(monster: Monster) => monster.size as string}
            updateValue={(value: string) => (prevState: Monster) => {
              return {
                ...prevState,
                size: value as unknown as Size,
              };
            }}
          />
          <BuildMonsterSelect
            label="Race"
            options={raceOptions}
            getValue={(monster: Monster) => monster.race as string}
            updateValue={(value: string) => (prevState: Monster) => {
              return {
                ...prevState,
                race: value as unknown as Race,
              };
            }}
          />
          <BuildMonsterSelect
            label="Element"
            options={elementOptions}
            getValue={(monster: Monster) => monster.element as string}
            updateValue={(value: string) => (prevState: Monster) => {
              return {
                ...prevState,
                element: value as unknown as Element,
              };
            }}
          />

          <BuildMonsterSelect
            label="Element LVL"
            options={elementLvlOptions}
            getValue={(monster: Monster) => monster.elementLevel as string}
            updateValue={(value: string) => (prevState: Monster) => {
              return {
                ...prevState,
                elementLevel: value as unknown as ElementLevel,
              };
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MonsterInfo;
