import { useBuild } from "../../hooks/useBuild";
import { getFinalDamage } from "../../services/atk";
import BuildATK from "../BuildATK";
import BuildStats from "../BuildStats";
import CharacterMisc from "../CharacterMisc";
import "./index.css";

const getDiffClass = (value: number) => {
  if (value > 0) return "positive-diff";
  else if (value < 0) return "negative-diff";
  else return "";
};

const MainPage = () => {
  const { build1, build2 } = useBuild();

  const minDamage1 = getFinalDamage("MIN", build1.character, build1.monster);
  const maxDamage1 = getFinalDamage("MAX", build1.character, build1.monster);

  const minDamage2 = getFinalDamage("MIN", build2.character, build2.monster);
  const maxDamage2 = getFinalDamage("MAX", build2.character, build2.monster);

  const minDiff = ((minDamage2 - minDamage1) / minDamage1) * 100;
  const maxDiff = ((maxDamage2 - maxDamage1) / maxDamage1) * 100;

  return (
    <div className="main">
      <BuildATK />

      <div className="second-col">
        <div className="damages">
          <div>
            <b>X</b>
            <b>Minimum Damage</b>
            <b>Maximum Damage</b>
          </div>
          <div>
            <b>Build 1</b>
            <div>{minDamage1.toLocaleString()}</div>
            <div>{maxDamage1.toLocaleString()}</div>
          </div>
          <div>
            <b>Build 2</b>
            <div>{minDamage2.toLocaleString()}</div>
            <div>{maxDamage2.toLocaleString()}</div>
          </div>
          <div>
            <b>Diff</b>
            <div className={getDiffClass(minDiff)}>{minDiff.toFixed(2)}%</div>

            <div className={getDiffClass(maxDiff)}>{maxDiff.toFixed(2)}%</div>
          </div>
        </div>
        <BuildStats />
        <CharacterMisc />
      </div>
      <div className="third-row">
        <CharacterMisc />
      </div>
    </div>
  );
};

export default MainPage;
