import "./App.css";
import BuildStorage from "./components/BuildStorage";
import ImportBS from "./components/ImportBS";
import MainPage from "./components/MainPage";
import { INITIAL_BUILD } from "./data/input";
import { Build, useBuild } from "./hooks/useBuild";

const copy = (
  from: Omit<Build, "setCharacter" | "setMonster" | "setBuffs">,
  to: Build
) => {
  to.setCharacter({ ...from.character });
  to.setMonster({ ...from.monster });
  to.setBuffs({ ...from.buffs });
};

function App() {
  const { build1, build2 } = useBuild();

  return (
    <div className="app">
      <header className="header">
        <h1>NovaRO Calc: ATK</h1>
        <div className="actions">
          <ImportBS />
          <button onClick={() => copy(build1, build2)}>
            Build 1 {">"} Build 2
          </button>
          <button onClick={() => copy(build2, build1)}>
            Build 1 {"<"} Build 2
          </button>
          <BuildStorage />
          <button
            onClick={() => {
              copy(INITIAL_BUILD, build1);
              copy(INITIAL_BUILD, build2);
            }}
          >
            Clear
          </button>
        </div>
      </header>
      <MainPage />
    </div>
  );
}

export default App;
