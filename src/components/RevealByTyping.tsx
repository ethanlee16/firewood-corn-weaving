import React, { useEffect, useRef, useState } from "react";

type Props = {
  content: string;
};

const DURATION_PER_CHAR = 30;
const SENTENCE_DELAY = 500;

const RevealByTyping: React.FC<Props> = ({ content }: Props) => {
  const [index, setIndex] = useState(0);
  const [fragment, setFragment] = useState<React.ReactNode[]>([]);
  const inDynamicSegment = useRef(false);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const nextChar = content[index];
      if (nextChar === "}" && inDynamicSegment.current) {
        inDynamicSegment.current = false;
        setIndex(bounded((prevIndex: number) => prevIndex + 1));
      } else if (inDynamicSegment.current) {
        setIndex(bounded((prevIndex: number) => prevIndex + 1));
        setFragment((prevFrag: React.ReactNode[]) => {
          // @ts-ignore
          // Object.defineProperty(prevFrag[prevFrag.length - 1], "isDymamic", {
          //   value: true,
          //   writable: true,
          // });
          // @ts-ignore
          // prevFrag[prevFrag.length - 1].isTyping = true;
          // prevFrag[prevFrag.length - 1] = [prevFrag[prevFrag.length - 1], nextChar];
          return [...prevFrag.slice(0, prevFrag.length - 1), prevFrag[prevFrag.length - 1]];
        });
      } else if (nextChar === "@") {
        inDynamicSegment.current = true;
        setIndex(bounded((prevIndex: number) => prevIndex + 1));
      } else {
        setFragment((prevFrag: React.ReactNode[]) => [...prevFrag, nextChar]);
        setIndex(bounded((prevIndex: number) => prevIndex + 1));
      }
    }, DURATION_PER_CHAR);

    function bounded(wrapped: (value: number) => number): (value: number) => number {
      return (prevIndex: number) => {
        if (prevIndex === content.length - 1) {
          clearInterval(typingInterval);
          return prevIndex;
        }
        return wrapped(prevIndex);
      };
    }
    return () => {
      clearInterval(typingInterval);
    };
  }, [content, index]);

  return <>{fragment}</>;
};

export default RevealByTyping;
