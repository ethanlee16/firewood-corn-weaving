import React, { useCallback, useEffect, useRef, useState } from "react";
import "./PullToContinue.css";

type Props = {
  onContinue: () => void;
};

const THRESHOLD = 100;

const PullToContinue: React.FC<Props> = ({ onContinue }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const background = useRef<HTMLDivElement>(null);
  const [thresholdReached, setThresholdReached] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchCurrentY, setTouchCurrentY] = useState(0);

  const pullStart = useCallback(function pullStart(event: TouchEvent) {
    const scrollContainer = document.querySelector("#scrollable")!;
    const scrolledToEnd =
      scrollContainer.scrollHeight - scrollContainer.scrollTop === scrollContainer.clientHeight;
    if (typeof event.targetTouches !== "undefined" && scrolledToEnd) {
      const touch = event.targetTouches[0];
      setTouchStartY(touch.screenY);
    }
  }, []);

  const pull = useCallback(
    function pull(event: TouchEvent) {
      if (typeof event.changedTouches !== "undefined") {
        const touch = event.changedTouches[0];
        setTouchCurrentY(touch.screenY);
        const change = touchStartY > touchCurrentY ? Math.abs(touchCurrentY - touchStartY) : 0;
        const changePercent = change / THRESHOLD;
        if (container.current && background.current) {
          container.current.style.opacity = `${changePercent * 0.5 + 0.5}`;
        }
        if (change > THRESHOLD) {
          setThresholdReached(true);
        } else {
          setThresholdReached(false);
        }
      }
    },
    [touchCurrentY, touchStartY]
  );

  const pullEnd = useCallback(
    function pullEnd(event: TouchEvent) {
      if (thresholdReached) {
        onContinue();
      } else {
        if (container.current) {
          container.current.style.opacity = "0.5";
        }
      }
      setTimeout(() => {
        setThresholdReached(false);
        setTouchStartY(0);
      }, 0);
    },
    [onContinue, thresholdReached]
  );

  useEffect(() => {
    document.addEventListener("touchstart", pullStart);
    document.addEventListener("touchmove", pull);
    document.addEventListener("touchend", pullEnd);

    return () => {
      document.removeEventListener("touchstart", pullStart);
      document.removeEventListener("touchmove", pull);
      document.removeEventListener("touchend", pullEnd);
    };
  }, [pullStart, pull, pullEnd]);

  return (
    <div className="pull-to-continue-container" ref={container}>
      {thresholdReached ? "Release to continue" : "Scroll to continue"}
      <div className="pull-background" ref={background}></div>
    </div>
  );
};

export default PullToContinue;
