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
import PullToContinue from "./components/PullToContinue";
import Outro from "./modules/Outro";

const Title = () => (
  <>
    <div className="hero">
      <h1>Firewood, Corn, Weaving</h1>
    </div>
  </>
);

function App() {
  const [moduleIndex, setModuleIndex] = useState(0);
  const [preambleComplete, setPreambleComplete] = useState(false);

  function advanceModule(): void {
    setModuleIndex((prevIndex: number) => {
      if (prevIndex === modules.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  }

  const modules = [
    <>
      <Title />
      <PullToContinue onContinue={advanceModule} />
    </>,
    <>
      <Preamble onComplete={() => setPreambleComplete(true)} />
      {preambleComplete && <PullToContinue onContinue={advanceModule} videoNext />}
    </>,
    <FullscreenVideo videoId="01-Witz" onComplete={advanceModule} />,
    <>
      <Intro />
      <PullToContinue onContinue={advanceModule} videoNext />
    </>,
    <FullscreenVideo videoId="02-Firewood-01" onComplete={advanceModule} />,
    <Language onComplete={advanceModule} />,
    <FullscreenVideo videoId="05-Corn-01" onComplete={advanceModule} />,
    <Metrics onComplete={advanceModule} />,
    <FullscreenVideo videoId="06-Weaving-full" onComplete={advanceModule} />,
    <Breath onComplete={advanceModule} />,
    <Outro />,
  ];

  return (
    <AppContextProvider>
      <div className="App" id="scrollable">
        {modules[moduleIndex]}
        <BrowserWarning />
      </div>
    </AppContextProvider>
  );
}

export default App;
