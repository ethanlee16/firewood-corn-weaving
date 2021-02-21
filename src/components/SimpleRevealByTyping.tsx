import React, { useEffect, useRef } from "react";
import Typed, { TypedOptions } from "typed.js";

type Props = {
  options: TypedOptions;
};

const SimpleRevealByTyping: React.FC<Props> = ({ options }: Props) => {
  const revealParagraph = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    if (revealParagraph.current) {
      const typed = new Typed(
        // @ts-ignore
        revealParagraph.current,
        options
      );
      return () => {
        typed.destroy();
      };
    }
  }, [options]);

  return <p ref={revealParagraph} style={{ whiteSpace: "pre-line" }}></p>;
};

export default SimpleRevealByTyping;
