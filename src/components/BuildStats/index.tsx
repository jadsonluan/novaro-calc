import "./index.css";
import BuildInput from "../BuildInput";
import { Character } from "../../data/input";

const BuildStats = () => (
  <div className="build-stats">
    <div className="build-header">
      <div></div>
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
    </div>
  </div>
);

export default BuildStats;
