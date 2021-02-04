import React, { useCallback, useEffect, useRef, useState } from "react";
import FullscreenVideo from "../components/FullscreenVideo";
import shuffle from "../shuffle";
import useWraparoundIndex from "../useWraparoundIndex";
import "./Language.css";

const Title = () => {
  return (
    <div className="hero">
      <h1>Language / Yol / Idioma</h1>
    </div>
  );
};

/**
 * TODO: Make main text section consistent scroll
 * TODO: Make hidden text different visual style
 */
const HiddenTextOne = () => {
  const [textState, setTextState] = useState<"hidden" | "main">("hidden");
  const [scrolling, setScrolling] = useState(false);
  const introTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    introTimer.current = setTimeout(() => {
      setTextState("main");
    }, 4000);

    return () => {
      introTimer.current && clearTimeout(introTimer.current);
    };
  }, []);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;
    if (scrolling) {
      setTextState("hidden");
      scrollTimeout = setTimeout(() => {
        if (scrolling) {
          setScrolling(false);
        }
      }, 500);
    } else {
      setTextState("main");
    }

    return () => {
      scrollTimeout && clearTimeout(scrollTimeout);
    };
  }, [scrolling]);

  return (
    <div
      className="hidden-text-one-container"
      onTouchStart={() => {
        setTextState("main");
        introTimer.current && clearTimeout(introTimer.current);
      }}
      onTouchMove={() => {
        setScrolling(true);
      }}
      onTouchEnd={() => {
        setScrolling(false);
      }}
    >
      {textState === "hidden" ? (
        <>
          <p>
            <b>Osbaldo</b>: My friends! Today I’ll show the work that men do here in San Juan
            Atitan. Today, I’ll show you how to get firewood. First, I take rope, my bag, and a
            machete. Today I’m going to a place called “Tzaq txa’m”. It belongs to the town. I’m
            taking my machete and ax. The ax is to cut down the big trees. I’m going now and I’ll
            come back later on. 
          </p>
          <p>
            Hello, I’m back. I went to pick up the firewoods at the town’s forest. I went to Tzaq
            Txa’m, I was able to find some and here they are. I’m very happy to find dry firewood.
            I’m a little tired, but it’s part of the job here. We know that I cannot carry more than
            what I have here. For those who have horses, they can bring more using the horses. Now
            that I have brought this, I want to take a break. After the break, I’ll chop the wood.
            It’s raining and I think I’ll chop it now. I’ll start chopping it now, so it’s ready for
            the fire. It’s going to be used to cook tortillas, make <em>chuj</em>.
          </p>
          <p>
            Now I’m going to chop it after my break. I’ll take the ropes first. I need to pull out
            my ax from it. It’s part of the tradition men must carry their axes together with the
            wood while carrying. This video is about showing you about the firewood. I’m going to
            wrap my rope, so it’s ready for the next trip. 
          </p>
          <p>
            Right now, I’m going to chop my wood. This big piece of wood right here, I used it to
            chop the rest of the wood. Let me put my machete here. Let’s chop some wood, shall we?
            They look ready to make fire like these ones. Here’s a big one. I usually use another
            one that goes under the big one. This makes it very easy to chop the wood. After I chop
            the wood, I stack them together. Sometimes they are not dry, so I stack them and hope
            they dry out. Making fire is part of daily life and we know that making fire with wood
            is another way to survive. We don’t use a stove, but only wood. As I mentioned before,
            this wood is used to make tortillas to set fire inside the <em>chuj</em>. No gas is used
            in any of these. So this is the work we as men do here. 
          </p>
          <p>
            Today, you’ve seen that I went and brought wood. I chopped them and I’m going to pile
            them together. If the wood is not dry, we usually put them to the sun. After the wood is
            dry enough, from there women should take care of the rest. She would use the wood to
            make tortillas or cook corn or Chuj. Here, you want to wonder what type of tree is this
            one. Well, this one is q’antze. There are oak trees which are the best. Also, there is
            pine as well, these are the types of trees here. Above all, this is the work that men do
            here in Xjan Xwan. Thank you for watching.
          </p>
          <p>
            <b>Ana</b>: Hello my friends, I’d like to show you how we make tortillas in San Juan
            Atitan Guatemala. First, I need to make fire and I use <em>ocote</em> (Montezuma pine).
            It’s getting dark and I want to make some fire. My friends are coming and I need to make
            tortillas. Come inside my kitchen. Let’s make fire. I’ll make fire under my comal. This
            is how we make fire here. I need more wood.  I went yesterday to pick up the wood in the
            forest. Before I make tortillas, I must make fire. Let’s clean the comal and put away
            the lighter. Today, I’ll be making tortillas and this is hydrated lime. We use hydrated
            lime everytime to make tortillas or otherwise the comal won’t work. This is my cooking
            pot with my corn . This is my sink right here.
          </p>
        </>
      ) : (
        <>
          <p>Correo a la gente de Xjan Xwan</p>
          <p>
            Silvia, Osbaldo, Hermenegildo, Ana, Javier, Elizandro, Mario, y todos los estimados
            señores y señoras de Xjan Xwan,
          </p>
          <p>
            Jun q’olb’elb’il te kyiy! Wiy nb’i Christian. Tb’i wuk’li no’k tb’i te Brandon. Naj qini
            max Boston, Massachusetts, tuj t-tanm meẍ. Xna’tzal qini tuj Yale. Nchin xnaq’tzani ti’j
            qyol. Waji tu’n tel nni’yi ti’j qa tnam, xjal, tx’otx’, b’ix yol tuj Xjan Xwan. Naj
            Brandon max Alemania. Echl Brandon. Chjonte kyiy tu’n ma tzaj t-txolb’ani tyol b’ix
            tchwinqlali. Por ahora, voy a escribirles en español, como un idioma compartiendo entre
            nosotros dos, anqué en el futuro espero que podemos conversar en su propio idioma Mam.
          </p>
          <p>
            Personalmente, como estudiante e investigador tengo interés en como los seres humanos se
            relacionan con el clima en sus prácticas cotidianas, y especialmente tengo interés en
            los conocimientos ambientales que la gente indígena, como ustedes, usa para vivir con el
            clima. En el futuro quisiera aprender más, y quisiera visitar Xjan Xwan este verano que
            viene si es posible. Estoy en el proceso de aprender mejor su lengua, Mam.
          </p>
          <p>
            Esperamos que les guste este proyecto de arte digital. Estamos agradecidos que ustedes
            nos confiaron con los videos que nos enviaron. En sus videos vimos una impresionante
            belleza y dignidad en su manera de vivir que queremos compartir con el mundo. Tratemos
            de presentar sus videos estructurados con textos en una manera que la audiencia refleja
            en temas profundas de la vida, la sobrevivencia, el medio ambiente, y el clima en ambos
            Xjan Xwan y su propio lugar.
          </p>
        </>
      )}
    </div>
  );
};

/**
 * TODO: Subtitle format, or centered.
 */
const StandaloneQuote = ({ children }: React.PropsWithChildren<{}>) => {
  return <p>{children}</p>;
};

const probabilisticRanges = [
  {
    probability: 0.35,
    min: 10,
    max: 100,
  },
  {
    probability: 0.45,
    min: 700,
    max: 1200,
  },
  {
    probability: 0.2,
    min: 2000,
    max: 3000,
  },
];

function pickRangeAtWeightedRandom(): typeof probabilisticRanges[number] {
  let sum = 0;
  const i = Math.random();
  for (let range of probabilisticRanges) {
    sum += range.probability;
    if (i <= sum) {
      return range;
    }
  }
  throw new Error("Unexpected weightedRandom error. Weights may not add to 1.");
}

const quotes = [
  <p>
    Silvia: Women do a lot of things at home. Many women make a living while weaving. They weave
    every day and make other beautiful textiles. Every day they come up with new ideas, it’s one way
    to survive in San Juan Atitán.
  </p>,
  <p>
    Javier: It has stopped raining because it was raining a lot. Thank God we got a lot of rain. So,
    this is my cornfield, this is my work and I’m very happy about it. Today, I’ll be picking corn.
  </p>,
  <p>
    Ana: It’s almost dark and I need to make my tortillas. It’s cold and I need to go to sleep, and
    it’s raining a lot. I mostly use my hands to make tortillas. Sometimes the wood is not dry
    enough, so it’s hard to make the fire because the wood is always wet during the rainy season. I
    got the wood from the forest up in the hills.
  </p>,
  <p>
    Osbaldo: Now that I have brought this, I want to take a break. After the break, I’ll chop the
    wood. It’s raining and I think I’ll chop it now. I’ll start chopping it now, so it’s ready for
    the fire. Making fire is part of daily life and we know that making fire with wood is another
    way to survive.
  </p>,
];
const shuffleQuotes = () => {
  let result = shuffle(quotes);
  while (result[quotes.length - 1] === quotes[quotes.length - 1]) {
    result = shuffle(quotes);
  }
  return result;
};

const HiddenTextTwo = () => {
  const [textState, setTextState] = useState<"hidden" | "main">("main");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotesOrdered, setQuotesOrdered] = useState(shuffleQuotes());
  const flickerTimer = useRef<NodeJS.Timeout | null>(null);

  const toggleTextState = useCallback((prevTextState: "hidden" | "main") => {
    if (prevTextState === "hidden") {
      return "main";
    } else {
      setQuoteIndex((prevIndex: number) => {
        if (prevIndex === quotes.length - 1) {
          setQuotesOrdered(shuffleQuotes());
          return 0;
        }
        return prevIndex + 1;
      });
      return "hidden";
    }
  }, []);

  const flicker = useCallback(() => {
    const range = pickRangeAtWeightedRandom();
    const { min, max } = range;
    const nextSwitch = Math.random() * (max - min) + min;
    setTextState(toggleTextState);
    flickerTimer.current = setTimeout(() => {
      flicker();
    }, nextSwitch);
  }, [toggleTextState]);

  useEffect(() => {
    flicker();
    return () => {
      flickerTimer.current && clearTimeout(flickerTimer.current);
    };
  }, [flicker]);

  return textState === "main" ? (
    <p>
      Aunque nunca podemos traducir la esencia entera de sus videos a inglés o en español, como
      lenguas del colonizador, queríamos destacar unos momentos significados a la audiencia
      occidental. En los textos que viene en español, voy a explicar un poco do nuestras
      motivaciones en la presentación artística de sus videos.
    </p>
  ) : (
    quotesOrdered[quoteIndex]
  );
};

const measures = [
  <Title />,
  <HiddenTextOne />,
  <StandaloneQuote>
    “Now that I have brought this, I want to take a break. After the break, I’ll chop the wood. It’s
    raining and I think I’ll chop it now. I’ll start chopping it now, so it’s ready for the fire.
    Making fire is part of daily life and we know that making fire with wood is another way to
    survive.”
  </StandaloneQuote>,
  <HiddenTextTwo />,
  <FullscreenVideo videoId="03-Weaving-Subtitle-03" hasSubtitles />,
  <StandaloneQuote>
    Encontremos un hermoso ritmo en como ustedes alternaban entre mostrar con acciones y explicar
    con palabras. Aunque no podíamos entender (por ahora) todas sus palabras sin la ayuda de Mintz
    and Silvia, entendíamos la importancia de estas tareas diarias – cortando leña, cosechando maíz
    y frijol, preparando tortillas, y tejiendo ropa. Yo pude ver que estas cosas no solo son una
    manera de sobrevivir en Xjan Xwan, pero también son una fuente de orgullo para ustedes. Sus
    conocimientos y habilidades son, como dijo Silvia, transmitido a través de generaciones como su
    lengua Mam. Me destacé mucho esta relación entre sus palabras y sus acciones, como algo muy
    bella en sus videos.
  </StandaloneQuote>,
  <FullscreenVideo videoId="firewood">
    "It’s almost dark and I need to make my tortillas. It’s cold and I need to go to sleep, and it’s
    raining a lot. I mostly use my hands to make tortillas. Sometimes the wood is not dry enough, so
    it’s hard to make the fire because the wood is always wet during the rainy season. I got the
    wood from the forest up in the hills."
  </FullscreenVideo>,
  <StandaloneQuote>
    Por eso, no queríamos simplemente traducir todas sus palabras a inglés o español. Algo perdería
    en la traducción. Ustedes han luchado contra siglos de colonización por mantener estas palabras,
    y queríamos tratar sus palabras con respeto. Entonces decidimos solo traducir unas oraciones por
    dar un poco de contexto, un poco de significado a la audiencia. Pensemos que la audiencia puede
    entender mucho de sus videos, o incluso más, con la experiencia incomoda de no entender todas
    las palabras y la necesidad resultante de dar atención a lo que si puede entender. Como
    colonizadores, nos estamos acostumbrados a tener explicaciones por todo en nuestro idioma. Pero
    yo creo que hay explicaciones que solo pueden ser entendido en su propia lengua en su propio
    lugar. Y estos conocimientos vinculados a sus propias lenguas y sus propios lugares son
    conocimientos, como nos muestran, que conlleve la sobrevivencia y florecimiento de humanidad y
    la tierra. Esperamos que la audiencia pueda aprender un poco de estos temas profundos.{" "}
  </StandaloneQuote>,
];

const Language: React.FC = () => {
  const [measureIndex, incrementMeasure] = useWraparoundIndex(0, measures.length);
  return (
    <div className="language-container">
      {measures[measureIndex]}
      <button onClick={incrementMeasure} style={{ position: "fixed", top: 0, right: 0 }}>
        Next measure (debug only)
      </button>
    </div>
  );
};

export default Language;
