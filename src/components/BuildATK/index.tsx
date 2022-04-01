import "./index.css";
import BuildInput from "../BuildInput";
import { Character } from "../../data/input";

const BuildATK = () => (
  <div className="build">
    <div className="build-header">
      <div>ATK and Modifiers</div>
      <b>Build 1</b>
      <b>Build 2</b>
    </div>
    <div className="build-content">
      <BuildInput
        label="Weapon LVL"
        getValue={(character: Character) => character.weapon.level}
        updateValue={(value: number) => (prev: Character) => {
          const { weapon } = prev;
          return { ...prev, weapon: { ...weapon, level: value } };
        }}
      />
      <BuildInput
        label="Weapon Base ATK"
        getValue={(character: Character) => character.weapon.atk}
        updateValue={(value: number) => (prev: Character) => {
          const { weapon } = prev;
          return { ...prev, weapon: { ...weapon, atk: value } };
        }}
      />
      <BuildInput
        label="Weapon Refine"
        getValue={(character: Character) => character.weapon.refine}
        updateValue={(value: number) => (prev: Character) => {
          const { weapon } = prev;
          return { ...prev, weapon: { ...weapon, refine: value } };
        }}
      />
      <BuildInput
        label="Shadow Weapon Refine"
        getValue={(character: Character) => character.shadowWeaponRefine}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          shadowWeaponRefine: value,
        })}
      />
      <BuildInput
        label="Ammo ATK"
        getValue={(character: Character) => character.ammoATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          ammoATK: value,
        })}
      />
      <BuildInput
        label="Pseudo Buff ATK"
        getValue={(character: Character) => character.pseudoBuffATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          pseudoBuffATK: value,
        })}
      />
      <BuildInput
        label="Bonus Status ATK"
        getValue={(character: Character) => character.bonusStatusATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          bonusStatusATK: value,
        })}
      />
      <BuildInput
        label="Mastery ATK"
        getValue={(character: Character) => character.masteryATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          masteryATK: value,
        })}
      />
      <BuildInput
        label="Buff ATK"
        getValue={(character: Character) => character.buffATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          buffATK: value,
        })}
      />
      <BuildInput
        label="Equip ATK"
        getValue={(character: Character) => character.equipATK}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          equipATK: value,
        })}
      />
      <BuildInput
        label="Bypass %"
        getValue={(character: Character) => character.bypass}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          bypass: value,
        })}
      />
      <BuildInput
        label="Race % Bonus"
        getValue={(character: Character) => character.modifiers.race}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, level: value } };
        }}
      />
      <BuildInput
        label="Size % Bonus"
        getValue={(character: Character) => character.modifiers.size}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, size: value } };
        }}
      />
      <BuildInput
        label="Class % Bonus"
        getValue={(character: Character) => character.modifiers.class}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, class: value } };
        }}
      />
      <BuildInput
        label="Skill % Bonus"
        getValue={(character: Character) => character.modifiers.skill}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, skil: value } };
        }}
      />
      <BuildInput
        label="Melee % Bonus"
        getValue={(character: Character) => character.modifiers.melee}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, melee: value } };
        }}
      />
      <BuildInput
        label="Ranged % Bonus"
        getValue={(character: Character) => character.modifiers.ranged}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, ranged: value } };
        }}
      />
      <BuildInput
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
      <BuildInput
        label="Monster Type % Bonus"
        getValue={(character: Character) => character.modifiers.monster}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, monster: value } };
        }}
      />
      <BuildInput
        label="Damage % Bonus"
        getValue={(character: Character) => character.modifiers.dmg}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, dmg: value } };
        }}
      />
      <BuildInput
        label="Final Dmg % Bonus"
        getValue={(character: Character) => character.modifiers.finalDmg}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, finalDmg: value } };
        }}
      />
    </div>
  </div>
);

export default BuildATK;
