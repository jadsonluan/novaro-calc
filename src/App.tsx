import "./App.css";
import MainPage from "./components/MainPage";
import { character, emptyMonster } from "./data/input";
import { BuildProvider } from "./hooks/useBuild";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>NovaRO Calc: ATK</h1>
      </header>
      <BuildProvider
        initialBuild1={{ character, monster: emptyMonster }}
        initialBuild2={{ character, monster: emptyMonster }}
      >
        <MainPage />
      </BuildProvider>
    </div>
  );
}

export default App;
