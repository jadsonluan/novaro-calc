import { BuildInfo } from "../../data/input";
import { getHP, getSP } from "../../data/stats";
import { Build, useBuild } from "../../hooks/useBuild";
import { getFinalDamage } from "../../services/atk";
import BuildATK from "../BuildATK";
import BuildBuffs from "../BuildBuffs";
import BuildDiff, { BuildDiffItem } from "../BuildDiff";
import BuildStats from "../BuildStats";
import CharacterMisc from "../CharacterMisc";
import MonsterInfo from "../MonsterInfo";
import "./index.css";

const getBuildInfo = ({ character, monster, buffs }: Build) => ({
  character,
  monster,
  buffs,
});

const MainPage = () => {
  const { build1, build2 } = useBuild();

  const buildInfo1: BuildInfo = getBuildInfo(build1);
  const buildInfo2: BuildInfo = getBuildInfo(build2);

  const minDamage1 = getFinalDamage("MIN", buildInfo1);
  const maxDamage1 = getFinalDamage("MAX", buildInfo1);

  const minDamage2 = getFinalDamage("MIN", buildInfo2);
  const maxDamage2 = getFinalDamage("MAX", buildInfo2);

  const dmgItems: BuildDiffItem[] = [
    { label: "Min.", value1: minDamage1.damage, value2: minDamage2.damage },
    { label: "Max.", value1: maxDamage1.damage, value2: maxDamage2.damage },
  ];

  const maxHP1 = getHP(maxDamage1.modifiedCharacter);
  const maxHP2 = getHP(maxDamage2.modifiedCharacter);

  const maxSP1 = getSP(maxDamage1.modifiedCharacter);
  const maxSP2 = getSP(maxDamage2.modifiedCharacter);

  const statItems: BuildDiffItem[] = [
    { label: "Max. HP", value1: maxHP1, value2: maxHP2 },
    { label: "Max. SP", value1: maxSP1, value2: maxSP2 },
  ];

  return (
    <div className="main">
      <div className="first-col">
        <BuildDiff label="Damage" items={dmgItems} />
        <BuildATK />
      </div>

      <div className="second-col">
        <BuildDiff label="Stat" items={statItems} />
        <BuildStats />
        <CharacterMisc />
      </div>
      <div className="third-col">
        <MonsterInfo />
        <BuildBuffs />
      </div>
    </div>
  );
};

export default MainPage;
