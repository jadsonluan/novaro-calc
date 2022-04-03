import { getHP, getSP } from "../../data/stats";
import { useBuild } from "../../hooks/useBuild";
import { getFinalDamage } from "../../services/atk";
import BuildATK from "../BuildATK";
import BuildDiff, { BuildDiffItem } from "../BuildDiff";
import BuildStats from "../BuildStats";
import CharacterMisc from "../CharacterMisc";
import MonsterInfo from "../MonsterInfo";
import "./index.css";

const MainPage = () => {
  const { build1, build2 } = useBuild();

  const minDamage1 = getFinalDamage("MIN", build1.character, build1.monster);
  const maxDamage1 = getFinalDamage("MAX", build1.character, build1.monster);

  const minDamage2 = getFinalDamage("MIN", build2.character, build2.monster);
  const maxDamage2 = getFinalDamage("MAX", build2.character, build2.monster);

  const dmgItems: BuildDiffItem[] = [
    { label: "Minimum Damage", value1: minDamage1, value2: minDamage2 },
    { label: "Maximum Damage", value1: maxDamage1, value2: maxDamage2 },
  ];

  const maxHP1 = getHP(build1.character);
  const maxHP2 = getHP(build2.character);

  const maxSP1 = getSP(build1.character);
  const maxSP2 = getSP(build2.character);

  const statItems: BuildDiffItem[] = [
    { label: "Max. HP", value1: maxHP1, value2: maxHP2 },
    { label: "Max. SP", value1: maxSP1, value2: maxSP2 },
  ];

  return (
    <div className="main">
      <div className="first-col">
        <BuildDiff label="Stat" items={statItems} />
        <BuildATK />
      </div>

      <div className="second-col">
        <BuildDiff label="Range" items={dmgItems} />
        <BuildStats />
        <CharacterMisc />
      </div>
      <div className="third-row">
        <MonsterInfo />
      </div>
    </div>
  );
};

export default MainPage;
