import React from "react";
import "./index.css";
import { BuildCharacterInput } from "../BuildInput";
import { Character } from "../../data/character";

const BuildContainer = ({ isMatk, children }: { isMatk: boolean, children: React.ReactChild[] }) => (
  <div className="build">
    <div className="header">
      <b>{isMatk ? 'MATK' : 'ATK'} and Modifiers</b>
      <b>Build 1</b>
      <b>Build 2</b>
    </div>
    <div className="build-content">{children}</div>
  </div>
);

export const BuildATK = () => {
  return (
    <BuildContainer isMatk={false}>
      <BuildCharacterInput
        label="Weapon LVL"
        getValue={(character: Character) => character.weapon.level}
        updateValue={(value: number) => (prev: Character) => {
          const { weapon } = prev;
          return { ...prev, weapon: { ...weapon, level: value } };
        }}
        defaultValue={1}
        min={1}
        max={5}
      />
      <BuildCharacterInput
        label="Weapon Base ATK"
        getValue={(character: Character) => character.weapon.atk}
        updateValue={(value: number) => (prev: Character) => {
          const { weapon } = prev;
          return { ...prev, weapon: { ...weapon, atk: value } };
        }}
      />
      <BuildCharacterInput
        label="Weapon Refine"
        getValue={(character: Character) => character.weapon.refine}
        updateValue={(value: number) => (prev: Character) => {
          const { weapon } = prev;
          return { ...prev, weapon: { ...weapon, refine: value } };
        }}
        max={20}
      />
      <BuildCharacterInput
        label="Shadow Weapon Refine"
        getValue={(character: Character) => character.shadowWeaponRefine}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          shadowWeaponRefine: value,
        })}
        max={10}
      />
      <BuildCharacterInput
        label="Ammo ATK"
        getValue={(character: Character) => character.ATK.ammoATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          ATK: {
            ...prev.ATK,
            ammoATK: value,
          },
        })}
      />
      <BuildCharacterInput
        label="Pseudo Buff ATK"
        getValue={(character: Character) => character.ATK.pseudoBuffATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          ATK: {
            ...prev.ATK,
            pseudoBuffATK: value,
          },
        })}
      />
      <BuildCharacterInput
        label="Mastery ATK"
        getValue={(character: Character) => character.ATK.masteryATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          ATK: {
            ...prev.ATK,
            masteryATK: value,
          },
        })}
      />
      <BuildCharacterInput
        label="Equip ATK"
        getValue={(character: Character) => character.ATK.equipATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          ATK: {
            ...prev.ATK,
            equipATK: value,
          },
        })}
      />
      <BuildCharacterInput
        label="P.Atk"
        getValue={(character: Character) => character.ATK.patk}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          ATK: {
            ...prev.ATK,
            patk: value,
          },
        })}
      />
      <BuildCharacterInput
        label="Bypass %"
        getValue={(character: Character) => character.bypass}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          bypass: value,
        })}
        max={100}
      />
      <BuildCharacterInput
        label="Res Bypass %"
        getValue={(character: Character) => character.traitBypass}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          traitBypass: value,
        })}
        max={100}
      />
      <BuildCharacterInput
        label="Monster Property % Bonus"
        getValue={(character: Character) => character.modifiers.targetProperty}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return {
            ...prev,
            modifiers: { ...modifiers, targetProperty: value },
          };
        }}
      />
      <BuildCharacterInput
        label="Race % Bonus"
        getValue={(character: Character) => character.modifiers.race}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, race: value } };
        }}
      />
      <BuildCharacterInput
        label="Size % Bonus"
        getValue={(character: Character) => character.modifiers.size}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, size: value } };
        }}
      />
      <BuildCharacterInput
        label="Class % Bonus"
        getValue={(character: Character) => character.modifiers.class}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, class: value } };
        }}
      />
      <BuildCharacterInput
        label="Skill % Bonus"
        getValue={(character: Character) => character.modifiers.skill}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, skill: value } };
        }}
      />
      <BuildCharacterInput
        label="Melee % Bonus"
        getValue={(character: Character) => character.modifiers.melee}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, melee: value } };
        }}
      />
      <BuildCharacterInput
        label="Ranged % Bonus"
        getValue={(character: Character) => character.modifiers.ranged}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, ranged: value } };
        }}
      />
      <BuildCharacterInput
        label="Critical Damage % Bonus"
        getValue={(character: Character) => character.modifiers.critical}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, critical: value } };
        }}
      />
      <BuildCharacterInput
        label="C.Rate"
        getValue={(character: Character) => character.ATK.crate}
        updateValue={(value: number) => (prev: Character) => {
          const { ATK } = prev;
          return { ...prev, ATK: { ...ATK, crate: value } };
        }}
      />
      <BuildCharacterInput
        label="Monster Type % Bonus"
        getValue={(character: Character) => character.modifiers.monster}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, monster: value } };
        }}
      />
      <BuildCharacterInput
        label="Weapon % Bonus"
        getValue={(character: Character) =>
          character.modifiers.advancedKatarMastery
        }
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return {
            ...prev,
            modifiers: { ...modifiers, advancedKatarMastery: value },
          };
        }}
      />
      <BuildCharacterInput
        label="Damage % Bonus"
        getValue={(character: Character) => character.modifiers.dmg}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, dmg: value } };
        }}
      />
      <BuildCharacterInput
        label="Final Damage % Bonus"
        getValue={(character: Character) => character.modifiers.finalDmg}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, finalDmg: value } };
        }}
      />
      <BuildCharacterInput
        label="Custom Damage % Bonus"
        getValue={(character: Character) => character.modifiers.custom}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, custom: value } };
        }}
      />
    </BuildContainer>
  );
};

export const BuildMATK = () => {
  return (
    <BuildContainer isMatk>
      <BuildCharacterInput
        label="Weapon LVL"
        getValue={(character: Character) => character.weapon.level}
        updateValue={(value: number) => (prev: Character) => {
          const { weapon } = prev;
          return { ...prev, weapon: { ...weapon, level: value } };
        }}
        defaultValue={1}
        min={1}
        max={5}
      />
      <BuildCharacterInput
        label="Weapon Base MATK"
        getValue={(character: Character) => character.weapon.matk}
        updateValue={(value: number) => (prev: Character) => {
          const { weapon } = prev;
          return { ...prev, weapon: { ...weapon, matk: value } };
        }}
      />
      <BuildCharacterInput
        label="Weapon Refine"
        getValue={(character: Character) => character.weapon.refine}
        updateValue={(value: number) => (prev: Character) => {
          const { weapon } = prev;
          return { ...prev, weapon: { ...weapon, refine: value } };
        }}
        max={20}
      />
      <BuildCharacterInput
        label="Shadow Weapon Refine"
        getValue={(character: Character) => character.shadowWeaponRefine}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          shadowWeaponRefine: value,
        })}
        max={10}
      />
      <BuildCharacterInput
        label="MATK %"
        getValue={(character: Character) => character.MATK.matkPercent}
        updateValue={(value: number) => (prev: Character) => {
          const { MATK } = prev;
          return { ...prev, MATK: { ...MATK, matkPercent: value } };
        }}
        defaultValue={100}
        min={100}
      />
      <BuildCharacterInput
        label="Equip MATK"
        getValue={(character: Character) => character.MATK.equipMATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          MATK: {
            ...prev.MATK,
            equipMATK: value,
          },
        })}
      />
      <BuildCharacterInput
        label="S.Matk"
        getValue={(character: Character) => character.MATK.smatk}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          MATK: {
            ...prev.MATK,
            smatk: value,
          },
        })}
      />
      <BuildCharacterInput
        label="Custom MATK"
        getValue={(character: Character) => character.MATK.pseudoBuffMATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          MATK: {
            ...prev.MATK,
            pseudoBuffMATK: value,
          },
        })}
      />
      <BuildCharacterInput
        label="Bypass %"
        getValue={(character: Character) => character.bypass}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          bypass: value,
        })}
        max={100}
      />
      <BuildCharacterInput
        label="Mres Bypass %"
        getValue={(character: Character) => character.traitBypass}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          traitBypass: value,
        })}
        max={100}
      />
      <BuildCharacterInput
        label="Magic Element % Bonus"
        getValue={(character: Character) => character.modifiers.skillProperty}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return {
            ...prev,
            modifiers: { ...modifiers, skillProperty: value },
          };
        }}
      />
      <BuildCharacterInput
        label="Monster Property % Bonus"
        getValue={(character: Character) => character.modifiers.targetProperty}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return {
            ...prev,
            modifiers: { ...modifiers, targetProperty: value },
          };
        }}
      />
      <BuildCharacterInput
        label="Race % Bonus"
        getValue={(character: Character) => character.modifiers.race}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, race: value } };
        }}
      />
      <BuildCharacterInput
        label="Size % Bonus"
        getValue={(character: Character) => character.modifiers.size}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, size: value } };
        }}
      />
      <BuildCharacterInput
        label="Skill % Bonus"
        getValue={(character: Character) => character.modifiers.skill}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, skill: value } };
        }}
      />
      <BuildCharacterInput
        label="Monster Type % Bonus"
        getValue={(character: Character) => character.modifiers.monster}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, monster: value } };
        }}
      />
      <BuildCharacterInput
        label="Final Damage % Bonus"
        getValue={(character: Character) => character.modifiers.finalDmg}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, finalDmg: value } };
        }}
      />
      <BuildCharacterInput
        label="Custom Damage % Bonus"
        getValue={(character: Character) => character.modifiers.custom}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, custom: value } };
        }}
      />
    </BuildContainer>
  );
};
