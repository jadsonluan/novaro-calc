import "./index.css";
import { BuildCharacterInput } from "../BuildInput";
import { Character } from "../../data/input";

const BuildStats = () => (
  <div className="build-stats">
    <div className="build-header">
      <b>Stats</b>
      <b>Build 1</b>
      <b>Build 2</b>
    </div>
    <div className="build-content">
      <BuildCharacterInput
        label="Base Level"
        getValue={(character: Character) => character.baseLevel}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          baseLevel: value,
        })}
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
      <BuildCharacterInput
        label="HP %"
        getValue={(character: Character) => character.hp.percent}
        updateValue={(value: number) => (prev: Character) => {
          const { hp } = prev;
          return { ...prev, hp: { ...hp, percent: value } };
        }}
      />
      <BuildCharacterInput
        label="HP Flat"
        getValue={(character: Character) => character.hp.flat}
        updateValue={(value: number) => (prev: Character) => {
          const { hp } = prev;
          return { ...prev, hp: { ...hp, flat: value } };
        }}
      />
      <BuildCharacterInput
        label="SP %"
        getValue={(character: Character) => character.sp.percent}
        updateValue={(value: number) => (prev: Character) => {
          const { sp } = prev;
          return { ...prev, sp: { ...sp, percent: value } };
        }}
      />
      <BuildCharacterInput
        label="SP Flat"
        getValue={(character: Character) => character.sp.flat}
        updateValue={(value: number) => (prev: Character) => {
          const { sp } = prev;
          return { ...prev, sp: { ...sp, flat: value } };
        }}
      />
    </div>
  </div>
);

export default BuildStats;
