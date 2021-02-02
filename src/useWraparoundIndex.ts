import { useState } from "react";

function useWraparoundIndex(initialValue: number, nonInclusiveMax: number): [number, () => void] {
  const [index, setIndex] = useState(initialValue);
  return [
    index,
    () => {
      setIndex((prevIndex: number) => {
        if (prevIndex === nonInclusiveMax - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    },
  ];
}

export default useWraparoundIndex;
