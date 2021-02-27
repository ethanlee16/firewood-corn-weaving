import React, { useEffect, useRef, useState } from "react";
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
  const savedLastModule = useRef(new URL(window.location.href).searchParams.get("m"));
  const [moduleIndex, setModuleIndex] = useState<number>(savedLastModule.current ? 1 : 0);
  const [preambleStatus, setPreambleStatus] = useState<string | undefined>();

  useEffect(() => {
    if (moduleIndex > 1) {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("m", String(moduleIndex));
      window.history.replaceState({}, "Firewood, Corn, Weaving", nextUrl.toString());
    }
  }, [moduleIndex]);

  function advanceModule(): void {
    setModuleIndex((prevIndex: number) => {
      if (prevIndex === modules.length - 1) {
        return 0;
      }
      if (savedLastModule.current && prevIndex === 1) {
        const moveTo = savedLastModule.current;
        savedLastModule.current = null;
        return Number(moveTo);
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
      <Preamble
        onComplete={(status) => setPreambleStatus(status)}
        revisiting={savedLastModule.current !== null}
      />
      {preambleStatus && (
        <PullToContinue
          onContinue={advanceModule}
          videoNext
          verbText={preambleStatus === "skippable" ? "Skip" : "Continue"}
        />
      )}
    </>,
    <FullscreenVideo videoId="01-Witz" onComplete={advanceModule} />,
    <>
      <Intro />
      <PullToContinue onContinue={advanceModule} videoNext />
    </>,
    <FullscreenVideo videoId="02-Firewood-01" onComplete={advanceModule} hasSubtitles />,
    <Language onComplete={advanceModule} />,
    <FullscreenVideo videoId="05-Corn-01" onComplete={advanceModule} hasSubtitles />,
    <Metrics onComplete={advanceModule} />,
    <FullscreenVideo videoId="06-Weaving-full" onComplete={advanceModule} hasSubtitles />,
    <Breath onComplete={advanceModule} />,
    <Outro />,
  ];

  return (
    <AppContextProvider>
      <div className="App" id="scrollable">
        {modules[moduleIndex]}
        <BrowserWarning
          currentModuleIndex={moduleIndex}
          onSelectNavigationLink={(index: number) => setModuleIndex(index)}
        />
      </div>
    </AppContextProvider>
  );
}

export default App;
