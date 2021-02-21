import React, { useEffect, useState } from "react";

type Props = React.PropsWithChildren<{
  duration: number;
}>;

const SequenceThroughText: React.FC<Props> = ({ children, duration }: Props) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev: number) => {
        if (prev === React.Children.toArray(children).length - 1) {
          clearInterval(interval);
          return prev;
        } else {
          return prev + 1;
        }
      });
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [children, duration]);

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
