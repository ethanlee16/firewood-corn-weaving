import React from "react";
import SimpleRevealByTyping from "../../components/SimpleRevealByTyping";
import "./SectionThree.css";

const MetricsSectionThree: React.FC = () => {
  return (
    <div className="metrics-section-three">
      <SimpleRevealByTyping
        options={{
          strings: [
            `Mam Mayan Notebook. Week 4. October 2, 2020.

Margin Notes

I learned to ask^1000

“what is the weather?”

today in Mam. Except, the question was^1000

<i> Atm q’ij b’ix mo jb’al? </i>

which is literally “Is it sunny or raining?” There are many weather words – cold – but no word for the weather. It is not that Mam speakers don’t have expectations for the weather. <i>Kresm</i> and <i>ky’ajb’alan</i> are terms for the dry and wet seasons<sup>1</sup>, and they plant maize in accordance with their expectations. It is just that the relevant expectations and abstractions for the atmospheric conditions they experience are different than in English or Spanish. 

I’ll probably understand this better as I grow more proficient. 

Question: Without a term for “weather”, what is the concept of “climate” in Mam? Does it include the earth, the mountains and volcanoes, their fields, their maize, the birds, the trees, their homes, their spirituality? Is it like a cosmovision?

Sidenote: Is my idea of climate like a cosmovision<sup>2</sup>?`,
          ],
          typeSpeed: 10,
          showCursor: false,
        }}
      />
    </div>
  );
};
export default MetricsSectionThree;
