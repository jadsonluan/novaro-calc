import "./index.css";
import BuildInput from "../BuildInput";
import { Character } from "../../data/input";

const BuildStats = () => (
  <div className="build-stats">
    <div className="build-header">
      <div>Stats</div>
      <b>Build 1</b>
      <b>Build 2</b>
    </div>
    <div className="build-content">
      <BuildInput
        label="Base Level"
        getValue={(character: Character) => character.baseLevel}
        updateValue={(value: number) => (prev: Character) => ({
          ...prev,
          baseLevel: value,
        })}
      />
      <BuildInput
        label="STR"
        getValue={(character: Character) => character.stats.str}
        updateValue={(value: number) => (prev: Character) => {
          const { stats } = prev;
          return { ...prev, stats: { ...stats, str: value } };
        }}
      />
      <BuildInput
        label="AGI"
        getValue={(character: Character) => character.stats.agi}
        updateValue={(value: number) => (prev: Character) => {
          const { stats } = prev;
          return { ...prev, stats: { ...stats, agi: value } };
        }}
      />
      <BuildInput
        label="VIT"
        getValue={(character: Character) => character.stats.vit}
        updateValue={(value: number) => (prev: Character) => {
          const { stats } = prev;
          return { ...prev, stats: { ...stats, vit: value } };
        }}
      />
      <BuildInput
        label="INT"
        getValue={(character: Character) => character.stats.int}
        updateValue={(value: number) => (prev: Character) => {
          const { stats } = prev;
          return { ...prev, stats: { ...stats, int: value } };
        }}
      />
      <BuildInput
        label="DEX"
        getValue={(character: Character) => character.stats.dex}
        updateValue={(value: number) => (prev: Character) => {
          const { stats } = prev;
          return { ...prev, stats: { ...stats, dex: value } };
        }}
      />
      <BuildInput
        label="LUK"
        getValue={(character: Character) => character.stats.luk}
        updateValue={(value: number) => (prev: Character) => {
          const { stats } = prev;
          return { ...prev, stats: { ...stats, luk: value } };
        }}
      />
      <BuildInput
        label="HP %"
        getValue={(character: Character) => character.hp.percent}
        updateValue={(value: number) => (prev: Character) => {
          const { hp } = prev;
          return { ...prev, hp: { ...hp, percent: value } };
        }}
      />
      <BuildInput
        label="HP Flat"
        getValue={(character: Character) => character.hp.flat}
        updateValue={(value: number) => (prev: Character) => {
          const { hp } = prev;
          return { ...prev, hp: { ...hp, flat: value } };
        }}
      />
      <BuildInput
        label="SP %"
        getValue={(character: Character) => character.sp.percent}
        updateValue={(value: number) => (prev: Character) => {
          const { sp } = prev;
          return { ...prev, sp: { ...sp, percent: value } };
        }}
      />
      <BuildInput
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
