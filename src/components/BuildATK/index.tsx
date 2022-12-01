import "./index.css";
import { BuildCharacterInput } from "../BuildInput";
import { Character } from "../../data/input";

const BuildATK = () => (
  <div className="build">
    <div className="header">
      <b>ATK and Modifiers</b>
      <b>Build 1</b>
      <b>Build 2</b>
    </div>
    <div className="build-content">
      <BuildCharacterInput
        label="Weapon LVL"
        getValue={(character: Character) => character.weapon.level}
        updateValue={(value: number) => (prev: Character) => {
          const { weapon } = prev;
          return { ...prev, weapon: { ...weapon, level: value } };
        }}
        defaultValue={1}
        min={1}
        max={4}
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
          }
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
          }
        })}
      />
      <BuildCharacterInput
        label="Bonus Status ATK"
        getValue={(character: Character) => character.ATK.bonusStatusATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          ATK: {
            ...prev.ATK,
            bonusStatusATK: value,
          }
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
          }
        })}
      />
      <BuildCharacterInput
        label="Buff ATK"
        getValue={(character: Character) => character.ATK.buffATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          ATK: {
            ...prev.ATK,
            buffATK: value,
          }
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
          }
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
        label="Element % Bonus"
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
        label="Monster Type % Bonus"
        getValue={(character: Character) => character.modifiers.monster}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, monster: value } };
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
        label="Critical Damage % Bonus"
        getValue={(character: Character) => character.modifiers.critical}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, critical: value } };
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
    </div>
  </div>
);

export default BuildATK;
