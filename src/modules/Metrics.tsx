import React from "react";
import useWraparoundIndex from "../useWraparoundIndex";

import MetricsSectionOne from "./Metrics/SectionOne";
import MetricsSectionTwo from "./Metrics/SectionTwo";

const Title = () => {
  return (
    <div className="hero">
      <h1>Metrics / Aija’b’l / Métrica</h1>
    </div>
  );
};

const measures = [<Title />, <MetricsSectionOne />, <MetricsSectionTwo />];

const Metrics: React.FC = () => {
  const [measure, incrementMeasure] = useWraparoundIndex(0, measures.length);

  return (
    <div>
      {measures[measure]}
      <button onClick={incrementMeasure} style={{ position: "fixed", top: 0, right: 0 }}>
        Next measure (debug only)
      </button>
    </div>
  );
};

export default Metrics;
