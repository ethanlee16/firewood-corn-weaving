import React, { useEffect, useState } from "react";
import "./BrowserWarning.css";
enum WarningReason {
  NonMobileBrowser = "NonMobileBrowser",
  LandscapeMode = "LandscapeMode",
}

type LinkProps = React.PropsWithChildren<{
  active?: boolean;
  video?: boolean;
  onClick: () => void;
}>;

const Link: React.FC<LinkProps> = ({ active, children, video, onClick }: LinkProps) => {
  return (
    <div className="navigation-link" onClick={!active ? onClick : undefined}>
      {video && (
        <svg
          className="video-icon"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="13" height="13" stroke="white" />
          <path d="M4.5 4.40192L9 7L4.5 9.59808L4.5 4.40192Z" fill="white" stroke="white" />
        </svg>
      )}
      <p>{children}</p>
      {active ? (
        <div className="active-circle" />
      ) : (
        <svg
          className="arrow"
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 5H13M13 5L8.90741 1M13 5L8.90741 9" stroke="white" />
        </svg>
      )}
    </div>
  );
};

type Props = {
  currentModuleIndex: number;
  onSelectNavigationLink?: (index: number) => void;
};

const BrowserWarning: React.FC<Props> = ({ onSelectNavigationLink }: Props) => {
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
    window.addEventListener("orientationchange", orientationChangeHandler);
    return () => {
      window.removeEventListener("orientationchange", orientationChangeHandler);
    };
  }, []);

  const WarningMessage: Record<WarningReason, React.ReactNode> = {
    [WarningReason.NonMobileBrowser]: (
      <>
        <p>Firewood, Corn, Weaving is best experienced on a mobile device.</p>
        <p>Please continue by visiting this on your phone.</p>
      </>
    ),
    [WarningReason.LandscapeMode]: (
      <div className="navigation-menu">
        <h1>Firewood, Corn, Weaving</h1>
        <p className="return-message">Rotate back to portrait mode to return to the piece.</p>
        <div className="navigation-link-container">
          <div className="navigation-link-group">
            <Link onClick={() => onSelectNavigationLink?.(0)}>Beginning</Link>
          </div>
          <div className="navigation-link-group">
            <Link onClick={() => onSelectNavigationLink?.(3)}>Introduction</Link>
          </div>
          <div className="navigation-link-group" />
          <div className="navigation-link-group">
            <Link onClick={() => onSelectNavigationLink?.(4)} video>
              Firewood
            </Link>
            <Link onClick={() => onSelectNavigationLink?.(5)}>Language / Yol / Idioma</Link>
          </div>
          <div className="navigation-link-group">
            <Link onClick={() => onSelectNavigationLink?.(6)} video>
              Corn
            </Link>
            <Link onClick={() => onSelectNavigationLink?.(7)}>Metrics / Ajlab'l / Métrica</Link>
          </div>
          <div className="navigation-link-group">
            <Link onClick={() => onSelectNavigationLink?.(8)} video>
              Weaving
            </Link>
            <Link onClick={() => onSelectNavigationLink?.(9)}>Breath / Xewb’j / Respiración</Link>
          </div>
          <div className="navigation-link-group">
            <Link onClick={() => onSelectNavigationLink?.(10)}>Credits</Link>
          </div>
        </div>
      </div>
    ),
  };

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
