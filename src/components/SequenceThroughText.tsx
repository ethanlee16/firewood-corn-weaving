import React, { useEffect, useRef, useState } from "react";

type Props = React.PropsWithChildren<
  | {
      duration: number;
    }
  | { durations: number[] }
>;

const SequenceThroughText: React.FC<Props> = ({ children, ...props }: Props) => {
  const [current, setCurrent] = useState(0);
  const duration = "duration" in props ? props.duration : props.durations[current];
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timer.current = setTimeout(function tick() {
      setCurrent((prev: number) => {
        const duration = "duration" in props ? props.duration : props.durations[prev + 1];
        if (prev === React.Children.toArray(children).length - 1) {
          return prev;
        } else {
          timer.current = setTimeout(tick, duration);
          return prev + 1;
        }
      });
    }, duration);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [children, duration, props]);

  return (
    <>
      {React.Children.map(children, (child: any, index: number) => {
        if (index !== current) {
          return null;
        }
        return child;
      })}
    </>
  );
};

export default SequenceThroughText;
