import { useState } from "react";
import "./index.css";
import "./App.css";
import FullscreenVideo from "./FullscreenVideo";

function App() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setPlaying(true)}>Start</button>
        {playing && <FullscreenVideo videoId="witz" />}
        <p>Weather Bodies</p>
      </header>
    </div>
  );
}

export default App;
