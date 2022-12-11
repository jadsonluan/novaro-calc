import "./index.css";
import { BuildCharacterInput } from "../BuildInput";
import { Character } from "../../data/input";

const BuildStats = () => (
  <div className="build-stats">
    <div className="header">
      <b>Stats</b>
      <b>Build 1</b>
      <b>Build 2</b>
    </div>
    <div className="build-content">
      <div className="build-basic-stats">
        <BuildCharacterInput
          label="Base Level"
          getValue={(character: Character) => character.baseLevel}
          updateValue={(value: number) => (prev: Character) => ({
            ...prev,
            baseLevel: value,
          })}
          min={1}
          max={200}
        />
        <BuildCharacterInput
          label="STR"
          getValue={(character: Character) => character.stats.str}
          updateValue={(value: number) => (prev: Character) => {
            const { stats } = prev;
            return { ...prev, stats: { ...stats, str: value } };
          }}
        />
        <BuildCharacterInput
          label="AGI"
          getValue={(character: Character) => character.stats.agi}
          updateValue={(value: number) => (prev: Character) => {
            const { stats } = prev;
            return { ...prev, stats: { ...stats, agi: value } };
          }}
        />
        <BuildCharacterInput
          label="VIT"
          getValue={(character: Character) => character.stats.vit}
          updateValue={(value: number) => (prev: Character) => {
            const { stats } = prev;
            return { ...prev, stats: { ...stats, vit: value } };
          }}
        />
        <BuildCharacterInput
          label="INT"
          getValue={(character: Character) => character.stats.int}
          updateValue={(value: number) => (prev: Character) => {
            const { stats } = prev;
            return { ...prev, stats: { ...stats, int: value } };
          }}
        />
        <BuildCharacterInput
          label="DEX"
          getValue={(character: Character) => character.stats.dex}
          updateValue={(value: number) => (prev: Character) => {
            const { stats } = prev;
            return { ...prev, stats: { ...stats, dex: value } };
          }}
        />
        <BuildCharacterInput
          label="LUK"
          getValue={(character: Character) => character.stats.luk}
          updateValue={(value: number) => (prev: Character) => {
            const { stats } = prev;
            return { ...prev, stats: { ...stats, luk: value } };
          }}
        />
      </div>
      <div className="build-traits">
        <BuildCharacterInput
          label="POW"
          getValue={(character: Character) => character.traits.pow}
          updateValue={(value: number) => (prev: Character) => {
            const { traits } = prev;
            return { ...prev, traits: { ...traits, pow: value } };
          }}
        />
        <BuildCharacterInput
          label="STA"
          getValue={(character: Character) => character.traits.sta}
          updateValue={(value: number) => (prev: Character) => {
            const { traits } = prev;
            return { ...prev, traits: { ...traits, sta: value } };
          }}
        />
        <BuildCharacterInput
          label="WIS"
          getValue={(character: Character) => character.traits.wis}
          updateValue={(value: number) => (prev: Character) => {
            const { traits } = prev;
            return { ...prev, traits: { ...traits, wis: value } };
          }}
        />
        <BuildCharacterInput
          label="SPL"
          getValue={(character: Character) => character.traits.spl}
          updateValue={(value: number) => (prev: Character) => {
            const { traits } = prev;
            return { ...prev, traits: { ...traits, spl: value } };
          }}
        />
        <BuildCharacterInput
          label="CON"
          getValue={(character: Character) => character.traits.con}
          updateValue={(value: number) => (prev: Character) => {
            const { traits } = prev;
            return { ...prev, traits: { ...traits, con: value } };
          }}
        />
        <BuildCharacterInput
          label="CRT"
          getValue={(character: Character) => character.traits.crt}
          updateValue={(value: number) => (prev: Character) => {
            const { traits } = prev;
            return { ...prev, traits: { ...traits, crt: value } };
          }}
        />
      </div>
      <div className="build-hp-sp">
        <BuildCharacterInput
          label="HP %"
          getValue={(character: Character) => character.hp.percent}
          updateValue={(value: number) => (prev: Character) => {
            const { hp } = prev;
            return { ...prev, hp: { ...hp, percent: value } };
          }}
          min={Number.MIN_SAFE_INTEGER}
        />
        <BuildCharacterInput
          label="HP Flat"
          getValue={(character: Character) => character.hp.flat}
          updateValue={(value: number) => (prev: Character) => {
            const { hp } = prev;
            return { ...prev, hp: { ...hp, flat: value } };
          }}
          min={Number.MIN_SAFE_INTEGER}
        />
        <BuildCharacterInput
          label="SP %"
          getValue={(character: Character) => character.sp.percent}
          updateValue={(value: number) => (prev: Character) => {
            const { sp } = prev;
            return { ...prev, sp: { ...sp, percent: value } };
          }}
          min={Number.MIN_SAFE_INTEGER}
        />
        <BuildCharacterInput
          label="SP Flat"
          getValue={(character: Character) => character.sp.flat}
          updateValue={(value: number) => (prev: Character) => {
            const { sp } = prev;
            return { ...prev, sp: { ...sp, flat: value } };
          }}
          min={Number.MIN_SAFE_INTEGER}
        />
      </div>
    </div>
  </div>
);

export default BuildStats;
