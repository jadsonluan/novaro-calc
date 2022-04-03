import "./index.css";
import {
  ElementLevel,
  Monster,
  MonsterType,
  MONSTER_TYPES,
  Size,
  SIZES,
} from "../../data/input";
import { BuildMonsterSelect, Option } from "../Select";
import { ELEMENTS, Element } from "../../data/element";
import { BuildMonsterInput } from "../BuildInput";

const MonsterInfo = () => {
  const sizeOptions: Option[] = SIZES.map((item: string) => ({
    label: item,
    value: item,
  }));

  const monsterTypeOptions: Option[] = MONSTER_TYPES.map((item: string) => ({
    label: item,
    value: item,
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
        <div>
          <BuildMonsterInput
            label="DEF"
            getValue={(monster: Monster) => monster.hardDEF}
            updateValue={(value: number) => (prev: Monster) => ({
              ...prev,
              hardDEF: value,
            })}
          />

          <BuildMonsterInput
            label="LVL"
            getValue={(monster: Monster) => monster.baseLevel}
            updateValue={(value: number) => (prev: Monster) => ({
              ...prev,
              baseLevel: value,
            })}
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
  );
};

export default MonsterInfo;
