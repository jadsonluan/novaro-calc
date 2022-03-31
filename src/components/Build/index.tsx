import "./index.css";
import { character as initialCharacter, monster } from "../../data/input";
import { BuildProvider, useBuild } from "../../hooks/useBuild";
import { getFinalDamage } from "../../services/atk";
import { BuildInput } from "../BuildInput";

const InternalBuild = () => {
  const { character, updateCharacter } = useBuild();

  const minDamage = getFinalDamage("min", character, monster);
  const maxDamage = getFinalDamage("max", character, monster);

  return (
    <div className="build">
      <div>
        <BuildInput
          label="Base Level"
          value={character.baseLevel}
          onChange={(event) =>
            updateCharacter("baseLevel", Number(event.target.value))
          }
        />
        <BuildInput
          label="STR"
          value={character.stats.str}
          onChange={(event) =>
            updateCharacter("str", Number(event.target.value))
          }
        />
        <BuildInput
          label="AGI"
          value={character.stats.agi}
          onChange={(event) =>
            updateCharacter("agi", Number(event.target.value))
          }
        />
        <BuildInput
          label="VIT"
          value={character.stats.vit}
          onChange={(event) =>
            updateCharacter("vit", Number(event.target.value))
          }
        />
        <BuildInput
          label="INT"
          value={character.stats.int}
          onChange={(event) =>
            updateCharacter("int", Number(event.target.value))
          }
        />
        <BuildInput
          label="DEX"
          value={character.stats.agi}
          onChange={(event) =>
            updateCharacter("dex", Number(event.target.value))
          }
        />
        <BuildInput
          label="LUK"
          value={character.stats.luk}
          onChange={(event) =>
            updateCharacter("luk", Number(event.target.value))
          }
        />
      </div>
      <div className="damages">
        <div>
          <b>Minimum Damage:</b> {minDamage.toLocaleString()}
        </div>
        <div>
          <b>Maximum Damage:</b> {maxDamage.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

const Build = () => {
  return (
    <BuildProvider initialValue={initialCharacter}>
      <InternalBuild />
    </BuildProvider>
  );
};

export default Build;
