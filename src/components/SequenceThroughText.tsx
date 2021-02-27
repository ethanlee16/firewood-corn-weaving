import React, { useEffect, useRef, useState } from "react";

type Props = React.PropsWithChildren<
  | {
      duration: number;
    }
  | { durations: number[] }
>;

const SequenceThroughText: React.FC<Props> = ({ children, ...props }: Props) => {
  const [current, setCurrent] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function tick() {
      setCurrent((prev: number) => {
        if (prev === React.Children.toArray(children).length - 1) {
          return prev;
        } else {
          return prev + 1;
        }
      });
    }

    if ("duration" in props) {
      timer.current = setInterval(tick, props.duration);
    } else {
      timer.current = setTimeout(tick, props.durations[current]);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        clearInterval(timer.current);
      }
    };
  }, [children, current, props]);

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
