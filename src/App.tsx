import { ChangeEvent, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import BuildStorage from "./components/BuildStorage";
import ImportBS from "./components/ImportBS";
import MainPage from "./components/MainPage";
import { INITIAL_ATK_BUILD, INITIAL_MATK_BUILD } from "./data/input";
import { Build, useBuild } from "./hooks/useBuild";
import useStorage from "./hooks/useStorage";
import Simulator from "./simulator";
import SimulatorFooter from "./simulator/footer";
import SimulatorNavbar from "./simulator/navbar";

const copy = (
  from: Omit<Build, "setName" | "setCharacter" | "setMonster" | "setBuffs" | "setDebuffs">,
  to: Build
) => {
  to.setName(from.name);
  to.setCharacter({ ...from.character });
  to.setMonster({ ...from.monster });
  to.setBuffs({ ...from.buffs });
  to.setDebuffs({ ...from.debuffs });
};

function App() {
  const { build1, build2 } = useBuild();
  const location = useLocation()
  const isMATK = location.pathname.includes('/matk');
  const INITIAL_BUILD = !isMATK ? INITIAL_ATK_BUILD : INITIAL_MATK_BUILD;
  const stringfiedInitialBuilds = JSON.stringify(INITIAL_BUILD)
  
  const { save, load } = useStorage(isMATK);

  window.onload = () => {
    load('crnt');
  }

  useEffect(() => {
    const build1WithoutFunctions = {
      name: build1.name,
      character: build1.character,
      monster: build1.monster,
      buffs: build1.buffs,
      debuffs: build1.debuffs,
    };
    const build2WithoutFunctions = {
      name: build2.name,
      character: build2.character,
      monster: build2.monster,
      buffs: build2.buffs,
      debuffs: build2.debuffs,
    };;

    if (JSON.stringify(build1WithoutFunctions) !== stringfiedInitialBuilds || JSON.stringify(build2WithoutFunctions) !== stringfiedInitialBuilds) {
      save('crnt')
    }
  }, [build1, build2, stringfiedInitialBuilds, save]);

  return (
    <div className="app">
      <SimulatorNavbar />
      <Simulator />
      <SimulatorFooter />
    </div>
  );
}

export default App;
