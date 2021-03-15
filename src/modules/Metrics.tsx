import React from "react";
import PullToContinue from "../components/PullToContinue";
import useWraparoundIndex from "../useWraparoundIndex";

import "./Metrics.css";

import MetricsSectionOne from "./Metrics/SectionOne";
import MetricsSectionThree from "./Metrics/SectionThree";
import MetricsSectionTwo from "./Metrics/SectionTwo";

const Title = () => {
  return (
    <div className="hero">
      <h1>Metrics / Ajlab'l / Métrica</h1>
    </div>
  );
};

const measures = [<Title />, <MetricsSectionOne />, <MetricsSectionTwo />, <MetricsSectionThree />];

type Props = {
  onComplete: () => void;
};

const Metrics: React.FC<Props> = ({ onComplete }: Props) => {
  const [measure, incrementMeasure] = useWraparoundIndex(0, measures.length);

  return (
    <div className="metrics-container">
      <button
        onClick={onComplete}
        style={{ position: "fixed", top: 0, right: 0, opacity: 0 }}
      ></button>
      {measures[measure]}
      <PullToContinue
        onContinue={measure < measures.length - 1 ? incrementMeasure : onComplete}
        videoNext={measure >= measures.length - 2}
      />
    </div>
  );
};

export default Metrics;
