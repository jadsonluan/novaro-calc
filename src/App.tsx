import "./App.css";
import MainPage from "./components/MainPage";
import { character } from "./data/input";
import { BuildProvider } from "./hooks/useBuild";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>NovaRO Calc: ATK</h1>
      </header>
      <BuildProvider initialValue1={character} initialValue2={character}>
        <MainPage />
      </BuildProvider>
    </div>
  );
}

export default App;
