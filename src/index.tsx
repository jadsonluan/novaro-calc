import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { emptyCharacter, emptyMonster } from "./data/input";
import { BuildProvider } from "./hooks/useBuild";

ReactDOM.render(
  <React.StrictMode>
    <BuildProvider
      initialBuild1={{ character: emptyCharacter, monster: emptyMonster }}
      initialBuild2={{ character: emptyCharacter, monster: emptyMonster }}
    >
      <App />
    </BuildProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
