import React, { useState } from "react";
import "./index.css";
import "./App.css";
import BrowserWarning from "./components/BrowserWarning";
import Metrics from "./modules/Metrics";
import Preamble from "./modules/Preamble";

import FullscreenVideo from "./components/FullscreenVideo";
import Intro from "./modules/Intro";
import Language from "./modules/Language";
import Breath from "./modules/Breath";
import AppContextProvider from "./AppContext";

const Title = () => (
  <div className="hero">
    <h1>Firewood, Corn, Weaving</h1>
  </div>
);

const modules = [
  <Title />,
  <Preamble />,
  <FullscreenVideo videoId="01-Witz" />,
  <Intro />,
  <FullscreenVideo videoId="02-Firewood-01" />,
  <Language />,
  <FullscreenVideo videoId="05-Corn-01" />,
  <Metrics />,
  <FullscreenVideo videoId="weaving" />,
  <Breath />,
];

function App() {
  const [moduleIndex, setModuleIndex] = useState(0);

  return (
    <AppContextProvider>
      <div className="App">
        {modules[moduleIndex]}
        <BrowserWarning />
        <button
          className="next-btn"
          onClick={() => {
            setModuleIndex((prevIndex: number) => {
              if (prevIndex === modules.length - 1) {
                return 0;
              }
              return prevIndex + 1;
            });
          }}
        >
          Next
        </button>
      </div>
    </AppContextProvider>
  );
}

export default App;
