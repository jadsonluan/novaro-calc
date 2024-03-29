import React from "react";
import "./index.css";
import { BuildCharacterInput } from "../BuildInput";
import { Character } from "../../data/character";

function getRefinePatkSmatk(
  previousTrait: number,
  previousRefine: number,
  newRefine: number
) {
  const refineDifference = newRefine - previousRefine;
  const patkDifference = refineDifference * 2;
  const newValue = previousTrait + patkDifference;

  return newValue;
}

const BuildContainer = ({ isMatk, children }: { isMatk: boolean, children: React.ReactChild[] }) => (
  <div className="build">
    <div className="header">
      <b style={{ marginLeft: '-0.5rem' }}>{isMatk ? 'MATK' : 'ATK'} and Modifiers</b>
      <b>Build 1</b>
      <b>Build 2</b>
    </div>
    <div className="build-content">{children}</div>
  </div>
);

export const BuildATK = () => {
  return (
    <BuildContainer isMatk={false}>
      <p className="separator-label">Weapon</p>
      <div className="box">
        <BuildCharacterInput
          label="Weapon LVL"
          tooltip="Your weapon level, goes up to 5. Your P.Atk will be automatically increased if using a level 5 weapon"
          getValue={(character: Character) => character.weapon.level}
          updateValue={(value: number) => (prev: Character) => {
            const { weapon } = prev;
            let newPatk = 0;

            if (prev.weapon.level === 5 && value !== 5) {
              newPatk = getRefinePatkSmatk(prev.ATK.patk, prev.weapon.refine, 0);
            } else if (prev.weapon.level !== 5 && value === 5) {
              newPatk = getRefinePatkSmatk(prev.ATK.patk, 0, prev.weapon.refine);
            }

            return { ...prev, weapon: { ...weapon, level: value }, ATK: { ...prev.ATK, patk: newPatk } };
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
          tooltip="Your weapon refine, goes up to 20. When using a level 5 weapon your P.Atk will be increased/decreased by your weapon refine"
          getValue={(character: Character) => character.weapon.refine}
          updateValue={(value: number) => (prev: Character) => {
            const { weapon } = prev;
            const newPatk = getRefinePatkSmatk(prev.ATK.patk, prev.weapon.refine, value);

            return {
              ...prev,
              weapon: { ...weapon, refine: value },
              ATK: {
                ...prev.ATK,
                patk: weapon.level === 5 ? newPatk : prev.ATK.patk,
              },
            };
          }}
          min={0}
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
      </div>
      <p className="separator-label">ATK</p>
      <div className="box">
        <BuildCharacterInput
          label="Ammo ATK"
          tooltip="Attack from your Arrow, Kunai, Cannon Ball"
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
          label="Weapon Buff ATK"
          tooltip="Most buffs that increases ATK goes here"
          getValue={(character: Character) => character.ATK.weaponBuffATK}
          updateValue={(value: number) => (prev: Character) => ({
            ...prev,
            ATK: {
              ...prev.ATK,
              weaponBuffATK: value,
            },
          })}
        />
        <BuildCharacterInput
          label="Mastery ATK"
          tooltip="Your character passives"
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
          tooltip="Come from Equipments and Cards"
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
          tooltip="This can't be calculated using @bs and stats only, you need to manually input it (look the value at your status window ingame)"
          getValue={(character: Character) => character.ATK.patk}
          updateValue={(value: number) => (prev: Character) => ({
            ...prev,
            ATK: {
              ...prev.ATK,
              patk: value,
            },
          })}
        />
      </div>
      <p className="separator-label">Resistances Bypass</p>
      <div className="box">
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
      </div>
      <p className="separator-label">Modifiers</p>
      <div className="box">
        <BuildCharacterInput
          label="ATK %"
          tooltip="ATK % from Equipments. This is not in the @battlestats, you have to manually add it."
          getValue={(character: Character) => character.ATK.atkPercent}
          updateValue={(value: number) => (prev: Character) => {
            const { ATK } = prev;
            return {
              ...prev,
              ATK: { ...ATK, atkPercent: value },
            };
          }}
        />
        <BuildCharacterInput
          label="Monster Property %"
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
          label="Race %"
          getValue={(character: Character) => character.modifiers.race}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, race: value } };
          }}
        />
        <BuildCharacterInput
          label="Size %"
          getValue={(character: Character) => character.modifiers.size}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, size: value } };
          }}
        />
        <BuildCharacterInput
          label="Monster Class %"
          tooltip="Class % bonuses against normal or boss monsters"
          getValue={(character: Character) => character.modifiers.class}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, class: value } };
          }}
        />
        <BuildCharacterInput
          label="Skill %"
          getValue={(character: Character) => character.modifiers.skill}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, skill: value } };
          }}
        />
        <BuildCharacterInput
          label="Melee %"
          tooltip="Short Attack Rate %"
          getValue={(character: Character) => character.modifiers.melee}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, melee: value } };
          }}
        />
        <BuildCharacterInput
          label="Ranged %"
          tooltip="Ranged Attack Rate %"
          getValue={(character: Character) => character.modifiers.ranged}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, ranged: value } };
          }}
        />
      </div>
      <p className="separator-label">Critical</p>
      <div className="box">
      <BuildCharacterInput
        label="Critical Damage %"
        tooltip="The number after the 'Critical Damage 40%' in the @bs"
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
      </div>
      {/* <BuildCharacterInput
        label="Monster Type %"
        tooltip="Things like 'Damage against Kobold monsters'"
        getValue={(character: Character) => character.modifiers.monster}
        updateValue={(value: number) => (prev: Character) => {
          const { modifiers } = prev;
          return { ...prev, modifiers: { ...modifiers, monster: value } };
        }}
      /> */}
      <p className="separator-label">Class Specific</p>
      <div className="box">
        <BuildCharacterInput
          label="Current HP"
          tooltip="Affects the bonus damage of Gates of Hell"
          getValue={(character: Character) => character.hp.current}
          updateValue={(value: number) => (prev: Character) => {
            const { hp } = prev;
            return { ...prev, hp: { ...hp, current: value } };
          }}
          min={0}
        />
        
        <BuildCharacterInput
          label="Current SP"
          tooltip="Affects the bonus damage of Gates of Hell"
          getValue={(character: Character) => character.sp.current}
          updateValue={(value: number) => (prev: Character) => {
            const { sp } = prev;
            return { ...prev, sp: { ...sp, current: value } };
          }}
          min={0}
        />
        <BuildCharacterInput
          label="Shield Weight"
          tooltip="Affects some Imperial Guard skills"
          getValue={(character: Character) => character.shield.weight}
          updateValue={(value: number) => (prev: Character) => {
            const { shield } = prev;
            return { ...prev, shield: { ...shield, weight: value } };
          }}
        />
        <BuildCharacterInput
          label="Shield Refine"
          tooltip="Affects some Imperial Guard skills"
          getValue={(character: Character) => character.shield.refine}
          updateValue={(value: number) => (prev: Character) => {
            const { shield } = prev;
            return { ...prev, shield: { ...shield, refine: value } };
          }}
        />
        <BuildCharacterInput
          label="Weapon %"
          tooltip="Advanced Katar Mastery % goes here"
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
      </div>
      <p className="separator-label">Final Damage</p>
      <div className="box">
        <BuildCharacterInput
          label="Damage %"
          tooltip="Added before DEF/RES calculations"
          getValue={(character: Character) => character.modifiers.dmg}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, dmg: value } };
          }}
        />
        <BuildCharacterInput
          label="Final Damage %"
          tooltip="Added after DEF/RES calculations"
          getValue={(character: Character) => character.modifiers.finalDmg}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, finalDmg: value } };
          }}
        />
        <BuildCharacterInput
          label="Custom Damage %"
          tooltip="Custom final damage modifier"
          getValue={(character: Character) => character.modifiers.custom}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, custom: value } };
          }}
        />
      </div>
    </BuildContainer>
  );
};

export const BuildMATK = () => {
  return (
    <BuildContainer isMatk>
      <p className="separator-label">Weapon</p>
      <div className="box">
        <BuildCharacterInput
          label="Weapon LVL"
          tooltip="Your weapon level, goes up to 5. Your S.Matk will be automatically increased if using a level 5 weapon"
          getValue={(character: Character) => character.weapon.level}
          updateValue={(value: number) => (prev: Character) => {
            const { weapon } = prev;
            let newSmatk = 0;

            if (prev.weapon.level === 5 && value !== 5) {
              newSmatk = getRefinePatkSmatk(prev.MATK.smatk, prev.weapon.refine, 0);
            } else if (prev.weapon.level !== 5 && value === 5) {
              newSmatk = getRefinePatkSmatk(prev.MATK.smatk, 0, prev.weapon.refine);
            }

            return { ...prev, weapon: { ...weapon, level: value }, MATK: { ...prev.MATK, smatk: newSmatk } };
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
          tooltip="Your weapon refine, goes up to 20. When using a level 5 weapon your S.Matk will be increased/decreased by your weapon refine"
          getValue={(character: Character) => character.weapon.refine}
          updateValue={(value: number) => (prev: Character) => {
            const { weapon } = prev;
            const newSmatk = getRefinePatkSmatk(prev.MATK.smatk, prev.weapon.refine, value);

            return {
              ...prev,
              weapon: { ...weapon, refine: value },
              MATK: {
                ...prev.MATK,
                smatk: weapon.level === 5 ? newSmatk : prev.MATK.smatk,
              },
            };
          }}
          min={0}
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
      </div>
      <p className="separator-label">MATK</p>
      <div className="box">
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
          tooltip="Come from Equipments and Cards"
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
          tooltip="This can't be calculated using @bs and stats only, you need to manually input it (look the value at your status window ingame)"
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
          tooltip="Any MATK adjustments"
          getValue={(character: Character) => character.MATK.pseudoBuffMATK}
          updateValue={(value: number) => (prev: Character) => ({
            ...prev,
            MATK: {
              ...prev.MATK,
              pseudoBuffMATK: value,
            },
          })}
        />
      </div>
      <p className="separator-label">Resistances Bypass</p>
      <div className="box">
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
      </div>
      <p className="separator-label">Modifiers</p>
      <div className="box">
        <BuildCharacterInput
          label="Magic Element %"
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
          label="Monster Property %"
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
          label="Race %"
          getValue={(character: Character) => character.modifiers.race}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, race: value } };
          }}
        />
        <BuildCharacterInput
          label="Size %"
          getValue={(character: Character) => character.modifiers.size}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, size: value } };
          }}
        />
        <BuildCharacterInput
          label="Skill %"
          getValue={(character: Character) => character.modifiers.skill}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, skill: value } };
          }}
        />
        <BuildCharacterInput
          label="Monster Type %"
          tooltip="Magical Class % against Normal/Boss monsters"
          getValue={(character: Character) => character.modifiers.monster}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, monster: value } };
          }}
        />
      </div>
      <p className="separator-label">Final Damage</p>
      <div className="box">
        <BuildCharacterInput
          label="Final Damage %"
          tooltip="Added after MDEF/RES calculations"
          getValue={(character: Character) => character.modifiers.finalDmg}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, finalDmg: value } };
          }}
        />
        <BuildCharacterInput
          label="Custom Damage %"
          tooltip="Custom final damage modifier"
          getValue={(character: Character) => character.modifiers.custom}
          updateValue={(value: number) => (prev: Character) => {
            const { modifiers } = prev;
            return { ...prev, modifiers: { ...modifiers, custom: value } };
          }}
        />
      </div>
    </BuildContainer>
  );
};
