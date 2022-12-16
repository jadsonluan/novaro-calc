import "./App.css";
import About from "./components/About";
import BuildStorage from "./components/BuildStorage";
import ImportBS from "./components/ImportBS";
import MainPage from "./components/MainPage";
import { INITIAL_ATK_BUILD, INITIAL_MATK_BUILD } from "./data/input";
import { Build, useBuild } from "./hooks/useBuild";

const copy = (
  from: Omit<Build, "setCharacter" | "setMonster" | "setBuffs" | "setDebuffs">,
  to: Build
) => {
  to.setCharacter({ ...from.character });
  to.setMonster({ ...from.monster });
  to.setBuffs({ ...from.buffs });
  to.setDebuffs({ ...from.debuffs });
};

function App() {
  const { build1, build2 } = useBuild();
  const location = window.location.href;
  const isMATK = location.includes("matk");
  const INITIAL_BUILD = !isMATK ? INITIAL_ATK_BUILD : INITIAL_MATK_BUILD;

  return (
    <div className="app">
      <header className="header navbar">
        <div className="left-action">
          <div className="logo">
            <h1>NovaRO Calc: {isMATK ? 'MATK' : 'ATK'}</h1>
            <h6>Created by: Luan and Gabriel</h6>
          </div>
          <div className="actions">
            <ImportBS isMATK={isMATK} />
            <button onClick={() => copy(build1, build2)}>
              Build 1 {">"} Build 2
            </button>
            <button onClick={() => copy(build2, build1)}>
              Build 1 {"<"} Build 2
            </button>
            <BuildStorage isMATK={isMATK} />
            <button
              onClick={() => {
                copy(INITIAL_BUILD, build1);
                copy(INITIAL_BUILD, build2);
              }}
            >
              Clear
            </button>
            <About />
          </div>
        </div>
        <div className="links">
          <a href={!isMATK ? '/novaro-calc/matk' : '/novaro-calc'}>{!isMATK ? 'MATK' : 'ATK'} calc</a>
        </div>
      </header>
      <MainPage isMATK={isMATK} />
    </div>
  );
}

export default App;
