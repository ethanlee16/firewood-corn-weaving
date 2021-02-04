import React, { useCallback, useEffect, useRef, useState } from "react";
import shuffle from "../shuffle";

type TimeWindow = {
  minFlicker: number;
  maxFlicker: number;
  duration: number;
};
type Props = {
  textSamples: React.ReactNode[];

  sequence: TimeWindow[];
};

const TextFlicker: React.FC<Props> = ({ textSamples, sequence }: Props) => {
  const [index, setIndex] = useState(0);
  const [textSampleIndex, setTextSampleIndex] = useState(0);

  const currentReplacementTimeout = useRef<NodeJS.Timeout | null>(null);
  const randomizedTextSamples = useRef(shuffle(textSamples));

  const timeWindow = sequence[index];

  const replaceTextContinuously = useCallback(() => {
    const nextDuration =
      Math.random() * (timeWindow.maxFlicker - timeWindow.minFlicker) + timeWindow.minFlicker;

    currentReplacementTimeout.current = setTimeout(() => {
      setTextSampleIndex((index: number) => {
        if (index === textSamples.length - 1) {
          randomizedTextSamples.current = shuffle(textSamples);
          return 0;
        }
        return index + 1;
      });
      replaceTextContinuously();
    }, nextDuration);
  }, [textSamples, timeWindow]);

  // Rotate through text samples
  useEffect(() => {
    replaceTextContinuously();
    return () => {
      if (currentReplacementTimeout.current) {
        clearTimeout(currentReplacementTimeout.current);
      }
    };
  }, [replaceTextContinuously]);

  // Rotate through TimeWindows
  useEffect(() => {
    const expiresAt = setTimeout(() => {
      setIndex((index: number) => {
        if (index === sequence.length - 1) {
          return 0;
        }
        return index + 1;
      });
    }, timeWindow.duration);

    return () => {
      clearTimeout(expiresAt);
    };
  }, [sequence.length, timeWindow]);

  return <>{randomizedTextSamples.current[textSampleIndex]}</>;
};

export default TextFlicker;
