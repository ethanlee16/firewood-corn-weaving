import React, { useEffect, useState } from "react";
import "./BrowserWarning.css";
enum WarningReason {
  NonMobileBrowser = "NonMobileBrowser",
  LandscapeMode = "LandscapeMode",
}

const WarningMessage: Record<WarningReason, React.ReactNode> = {
  [WarningReason.NonMobileBrowser]: (
    <>
      <p>Firewood, Corn, Weaving is best experienced on a mobile device.</p>
      <p>Please continue by visiting this on your phone.</p>
    </>
  ),
  [WarningReason.LandscapeMode]: (
    <>
      <p>
        Firewood, Corn, Weaving is intended to be viewed in portrait mode on your phone. Please
        rotate your device to the portrait orientation to continue.
      </p>
    </>
  ),
};

const BrowserWarning: React.FC = () => {
  const [orientation, setOrientation] = useState<string | undefined>();
  useEffect(() => {
    function orientationChangeHandler() {
      const newOrientation = (window.screen.orientation || {}).type;
      if (newOrientation) {
        setOrientation(newOrientation);
      } else {
        setOrientation(window.orientation === 0 ? "portrait" : "landscape");
      }
    }
    window.addEventListener("resize", orientationChangeHandler);
    return () => {
      window.removeEventListener("resize", orientationChangeHandler);
    };
  }, []);

  const WarningTests: Record<WarningReason, () => boolean> = {
    [WarningReason.NonMobileBrowser]: () => {
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        return false;
      }
      return true;
    },
    [WarningReason.LandscapeMode]: () => {
      if (orientation === undefined) {
        return window.orientation !== 0;
      }
      if (orientation.includes("landscape")) {
        return true;
      }
      return false;
    },
  };

  const firstFailingWarning = Object.entries(
    WarningTests
  ).find(([warningKey, test]: [string, () => boolean]) => test());
  if (!firstFailingWarning) {
    return null;
  }

  const [warningReason] = firstFailingWarning as [WarningReason, () => boolean];
  return <div className="browser-warning">{WarningMessage[warningReason]}</div>;
};

export default BrowserWarning;
