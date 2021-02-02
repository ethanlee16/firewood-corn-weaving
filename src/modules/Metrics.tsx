import React, { useState } from "react";

import MetricsSectionOne from "./Metrics/SectionOne";
import MetricsSectionTwo from "./Metrics/SectionTwo";

const sections = [<MetricsSectionOne />, <MetricsSectionTwo />];

const Metrics: React.FC = () => {
  const [section, setSection] = useState(0);

  return (
    <div>
      {sections[section]}
      <button
        onClick={() => {
          if (section !== sections.length - 1) {
            setSection(section + 1);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Metrics;
