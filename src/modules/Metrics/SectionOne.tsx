import React, { useEffect, useState } from "react";
import TextFlicker from "../../components/TextFlicker";

const MetricsSectionOne: React.FC = () => {
  const [holdAbstraction, setHoldAbstraction] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setHoldAbstraction(false);
    }, 16000);
  }, []);

  return (
    <p>
      Weather is{" "}
      <TextFlicker
        textSamples={["always everywhere", "in every place", "endlessly", "at all times"]}
        sequence={[
          { duration: 4000, minFlicker: 90, maxFlicker: 100 },
          { duration: 8000, minFlicker: 1000, maxFlicker: 2200 },
          { duration: 9000, minFlicker: 90, maxFlicker: 100 },
          { duration: 16000, minFlicker: 1000, maxFlicker: 2200 },
          { duration: 11000, minFlicker: 350, maxFlicker: 350 },
          { duration: 7000, minFlicker: 1000, maxFlicker: 2200 },
        ]}
      />{" "}
      a chaotic singularity upon which we{" "}
      <TextFlicker
        textSamples={[
          "project",
          "desire",
          "wish",
          "think",
          "hope",
          "control",
          "fear",
          "know",
          "change",
          "blame",
          "predict",
          "design",
          "govern",
          "read",
        ]}
        sequence={[
          { duration: 4000, minFlicker: 90, maxFlicker: 100 },
          { duration: 8000, minFlicker: 1000, maxFlicker: 2200 },
          { duration: 14000, minFlicker: 90, maxFlicker: 100 },
          { duration: 11000, minFlicker: 1000, maxFlicker: 2200 },
          { duration: 4000, minFlicker: 90, maxFlicker: 100 },
          { duration: 7000, minFlicker: 350, maxFlicker: 350 },
          { duration: 7000, minFlicker: 1000, maxFlicker: 2200 },
        ]}
      />{" "}
      order, expectation,{" "}
      {holdAbstraction ? (
        "abstraction"
      ) : (
        <TextFlicker
          textSamples={[
            "dreams",
            "imagination",
            "the future",
            "science",
            "religion",
            "God",
            "ourselves",
          ]}
          sequence={[
            { duration: 19000, minFlicker: 1000, maxFlicker: 2200 },
            { duration: 8000, minFlicker: 90, maxFlicker: 100 },
            { duration: 7000, minFlicker: 350, maxFlicker: 350 },
            { duration: 7000, minFlicker: 1000, maxFlicker: 2200 },
          ]}
        />
      )}
      .
    </p>
  );
};

export default MetricsSectionOne;
