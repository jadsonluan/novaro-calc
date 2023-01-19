import "./index.css";
import { useState } from "react";
import BuildBuffs from "../BuildBuffs";
import BuildDebuffs from "../BuildDebuffs";
import { emptyATKBuffs, emptyMATKBuffs } from "../../data/buffs";
import { emptyATKDebuffs, emptyMATKDebuffs } from "../../data/debuff";

export const capitalize = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, function (str) {
      return str.toUpperCase();
    })
    .trim();
};

type BuffOrDebuff = "buff" | "debuff";

const BuildBuffsAndDebuffs = ({ isMATK }: { isMATK: boolean }) => {
  const [selectedTab, setSelectedTab] = useState<BuffOrDebuff>("buff");
  return (
    <div className="build-buffs-and-debuffs">
      <div className="header">
        <button
          className={`tab ${selectedTab === "buff" ? "active" : "inactive"}`}
          onClick={() => setSelectedTab("buff")}
        >
          Buffs
        </button>
        <button
          className={`tab ${selectedTab === "debuff" ? "active" : "inactive"}`}
          onClick={() => setSelectedTab("debuff")}
        >
          Debuffs
        </button>
      </div>
      <div className="build-content">
        {selectedTab === "buff" ? (
          <BuildBuffs emptyBuffs={!isMATK ? emptyATKBuffs : emptyMATKBuffs} />
        ) : (
          <BuildDebuffs
            emptyDebuffs={!isMATK ? emptyATKDebuffs : emptyMATKDebuffs}
          />
        )}
      </div>
    </div>
  );
};

export default BuildBuffsAndDebuffs;
