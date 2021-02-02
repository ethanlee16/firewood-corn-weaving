import React from "react";
import RevealByTyping from "../../components/RevealByTyping";
import "./SectionTwo.css";

const p1 = {
  content: `Perhaps you checked the weather this morning. @{45} degrees and rainy. There’s a @{30}% chance of rain tomorrow. It normally rains @{3} inches in Boston during January. That’s less than before. Or is it more than before? But it is warmer than you remember other Januarys, you are fairly certain of that. It is, after all, warmer everywhere. But is it rainier or drier?`,
  elements: [],
};

const MetricsSectionTwo: React.FC = () => {
  return (
    <p>
      <RevealByTyping content={p1.content} />
    </p>
  );
};
export default MetricsSectionTwo;
