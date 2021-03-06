import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { INITIAL_BUILD } from "./data/input";
import { BuildProvider } from "./hooks/useBuild";

ReactDOM.render(
  <React.StrictMode>
    <BuildProvider initialBuild1={INITIAL_BUILD} initialBuild2={INITIAL_BUILD}>
      <App />
    </BuildProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
