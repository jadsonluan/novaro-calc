import "./index.css";
import { BuildMonsterSelect, Option } from "../Select";
import { ELEMENTS, Element } from "../../data/element";
import { BuildMonsterInput } from "../BuildInput";
import { Monster, SIZES, MONSTER_TYPES, MonsterType, Size, ElementLevel, Race, RACES } from "../../data/monster";

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
      </div>
    </>
  );
};

const MonsterInfo = ({ isMATK }: { isMATK: boolean }) => {
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
        <b>Monster</b>
        <b>Build 1</b>
        <b>Build 2</b>
      </div>
      <div className="build-content">
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
