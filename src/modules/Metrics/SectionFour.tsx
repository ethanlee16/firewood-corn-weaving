import React from "react";
import SimpleRevealByTyping from "../../components/SimpleRevealByTyping";
import "./SectionThree.css";

const MetricsSectionFour: React.FC = () => {
  return (
    <div className="metrics-section-three">
      <SimpleRevealByTyping
        options={{
          strings: [
            `<sup>1</sup>Do all people divide and name portions of the year?^1000

Certainly in places far from the equator a language that could not name dramatic shifts in the weather and length of the day would leave much of experienced reality undescribed. Languages notice the patterned contrasts between hot and cold, light and dark, verdant growth and deciduous decay. But what of locations where these contrasts do not occur, at the equator? Even in the equator language is attentive to contrasts between wet and dry, however small. Sillitoe (1994) demonstrates that the Wola of the Papua New Guinea Southern Highlands name the part of year in which the weather does not vary day to day ebenjip and the part of the year in which wet and dry days vary bulhenjip. But what of seasonless places? Orlove (2003) reports that in northern Sulawesi, the island of Halmahera, Indonesia, and a portion of the Andes, no contrasts exist between dry and wet times of year. 

Nonetheless, languages still name seasons in these seasonless places. They pay attention to the position of the sun in the sky, the behavior of flora and fauna, shifts in windspeed and direction, and other cyclical phenomena. No place is without seasons, and no language has failed in the task of dividing and naming cyclical portions of the year.

<sup>2</sup>Cosmovision^1000

La cosmovisión es un concepto complicado y problemático en las ciencias sociales. En teoría, se puede usar este concepto para analizar cualquier pueblo, cultura, sociedad, o colectividad en el mundo. En la práctica, solamente fue utilizado para describir los pueblos indígenas. Siguiendo el lógico de colonización y la supremacía blanca, el escrito sobre la “cosmovisión maya” retrata los maya como un gente romantizada en el pasado, quienes maneras de vida no tienen parte del mundo contemporáneo. Escritores criollos han usado el concepto de cosmovisión para ocluir la violencia de colonización y para justificar la persistente marginalización de los maya hoy. 

Sin embargo, pienso que el concepto de cosmovisión puede ser rescatando, con cuidadoso trabajo que presta atención a la historia real de los maya. La cosmovisión es una visión del mundo holística. Incluye ambos los elementos discursivos y materiales del mundo. La cosmovisión sobre el clima no solo es la lluvia, el calor, y la humedad pero también las ideas y creencias sobre la lluvia, el calor, y la humedad. Y no solo esto, sino también como el clima y las ideas sobre el clima se conectan con la tierra, los volcanes, las montañas y valles, y la vida campesina. ¿Cómo podemos aprender el cambio climático sin este enfoque holístico?`,
          ],
          typeSpeed: 1,
          showCursor: false,
        }}
      />
    </div>
  );
};
export default MetricsSectionFour;
