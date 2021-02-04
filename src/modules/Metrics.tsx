import React from "react";
import PullToContinue from "../components/PullToContinue";
import useWraparoundIndex from "../useWraparoundIndex";

import "./Metrics.css";

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
    <div className="metrics-container">
      {measures[measure]}
      <PullToContinue onContinue={incrementMeasure} />
    </div>
  );
};

export default Metrics;
