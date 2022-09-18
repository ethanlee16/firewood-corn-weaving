import React, { useEffect, useRef, useState } from "react";
import FullscreenVideo from "../components/FullscreenVideo";
import PullToContinue from "../components/PullToContinue";
import SequenceThroughText from "../components/SequenceThroughText";
import useWraparoundIndex from "../useWraparoundIndex";
import "./Language.css";

const Title = () => {
  return (
    <div className="hero">
      <h1>Language / Yol / Idioma</h1>
    </div>
  );
};

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  durationPerChar?: number;
};
const Marquee = ({
  children,
  className,
  position = "top",
  delay = 0,
  durationPerChar = 30,
}: MarqueeProps) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  useEffect(() => {
    const startAnimation = setTimeout(() => {
      setAnimationStarted(true);
    }, delay + 200);

    return () => {
      clearTimeout(startAnimation);
    };
  }, [delay]);

  return (
    <div
      className={`marquee marquee-${position} ${animationStarted ? "marquee-animating" : ""} ${
        className ? className : ""
      }`}
    >
      {typeof children === "string" ? (
        <p
          style={{
            transitionDuration: `${(children.length * durationPerChar) / 1000}s`,
            transitionDelay: `${delay / 1000}s`,
          }}
        >
          {children}
        </p>
      ) : (
        children
      )}
    </div>
  );
};

/**
 * TODO: Make main text section consistent scroll
 * TODO: Make hidden text different visual style
 */
const HiddenTextOne = () => {
  const mainTextContainer = useRef<HTMLDivElement | null>(null);

  return (
    <div className="language-main-text-one" ref={mainTextContainer}>
      <Marquee position="top">
        Osbaldo: My friends! Today I’ll show the work that men do here in San Juan Atitan. Today,
        I’ll show you how to get firewood. First, I take rope, my bag, and a machete. Today I’m
        going to a place called “Tzaq txa’m”. It belongs to the town. I’m taking my machete and ax.
        The ax is to cut down the big trees. I’m going now and I’ll come back later on. Hello, I’m
        back. I went to pick up the firewoods at the town’s forest. I went to Tzaq Txa’m, I was able
        to find some and here they are. I’m very happy to find dry firewood. I’m a little tired, but
        it’s part of the job here. We know that I cannot carry more than what I have here. For those
        who have horses, they can bring more using the horses. Now that I have brought this, I want
        to take a break. After the break, I’ll chop the wood. It’s raining and I think I’ll chop it
        now. I’ll start chopping it now, so it’s ready for the fire. It’s going to be used to cook
        tortillas, make chuj. Now I’m going to chop it after my break. I’ll take the ropes first. I
        need to pull out my ax from it. It’s part of the tradition men must carry their axes
        together with the wood while carrying. This video is about showing you about the firwood.
        I’m going to wrap my rope, so it’s ready for the next trip. Right now, I’m going to chop my
        wood. This big piece of wood right here, I used it to chop the rest of the wood. Let me put
        my machete here. Let’s chop some wood, shall we? They look ready to make fire like these
        ones. Here’s a big one. I usually use another one that goes under the big one. This makes it
        very easy to chop the wood. After I chop the wood, I stack them together. Sometimes they are
        not dry, so I stack them and hope they dry out.
      </Marquee>
      <Marquee position="bottom" delay={2000}>
        Making fire is part of daily life and we know that making fire with wood is another way to
        survive. We don’t use a stove, but only wood. As I mentioned before, this wood is used to
        make tortillas to set fire inside the chuj. No gas is used in any of these. So this is the
        work we as men do here. Today, you’ve seen that I went and brought wood. I chopped them and
        I’m going to pile them together. If the wood is not dry, we usually put them to the sun.
        After the wood is dry enough, from there women should take care of the rest. She would use
        the wood to make tortillas or cook corn or chuj. Here, you want to wonder what type of tree
        is this one. Well, this one is q’antze. There are oak trees which are the best. Also, there
        is pine as well, these are the types of trees here. Above all, this is the work that men do
        here in Xjan Xwan. Thank you for watching. Ana: Hello my friends, I’d like to show you how
        we make tortillas in San Juan Atitan Guatemala. First, I need to make fire and I use ocote
        (Montezuma pine). It’s getting dark and I want to make some fire. My friends are coming and
        I need to make tortillas. Come inside my kitchen. Let’s make fire. I’ll make fire under my
        comal. This is how we make fire here. I need more wood. I went yesterday to pick up the wood
        in the forest. Before I make tortillas, I must make fire. Let’s clean the comal and put away
        the lighter. Today, I’ll be making tortillas and this is hydrated lime. We use hydrated lime
        everytime to make tortillas or otherwise the comal won’t work. This is my cooking pot with
        my corn. This is my sink right here.
      </Marquee>
      <p>Correo a la gente de Xjan Xwan</p>
      <p>
        Silvia, Osbaldo, Hermenegildo, Ana, Javier, Elizandro, Mario, y todos los estimados señores
        y señoras de Xjan Xwan,
      </p>
      <p>
        Jun q’olb’elb’il te kyiy! Wiy nb’i Christian. Tb’i wuk’li no’k tb’i te Brandon. Naj qini max
        Boston, Massachusetts, tuj t-tanm mexh. Xna’tzal qini tuj Yale. Nchin xnaq’tzani ti’j qyol.
        Waji tu’n tel nni’yi ti’j qa tnam, xjal, tx’otx’, b’ix yol tuj Xjan Xwan. Naj Brandon max
        Alemania. Echl Brandon. Chjonte kyiy tu’n ma tzaj t-txolb’ani tyol b’ix tchwinqlali. Por
        ahora, voy a escribirles en español, como un idioma compartiendo entre nosotros dos, anqué
        en el futuro espero que podemos conversar en su propio idioma Mam.
      </p>
      <p>
        Personalmente, como estudiante e investigador tengo interés en como los seres humanos se
        relacionan con el clima en sus prácticas cotidianas, así como en los conocimientos
        ambientales que usan para convivir con el clima. En el futuro quisiera aprender más, y aún
        visitar Xjan Xwan este verano si es posible. Estoy en el proceso de aprender mejor su
        lengua, Mam.
      </p>
      <p>
        Esperamos que les guste este proyecto de arte digital. Estamos agradecidos de que ustedes
        nos hayan confiado los videos que nos enviaron. En sus videos vemos una impresionante
        belleza y dignidad en su manera de vivir, que queremos compartir con el mundo. Así, tratamos
        de presentar sus videos estructurados con textos en una manera que refleje los temas
        profundos de la vida, la sobrevivencia, el medio ambiente, y el clima tanto en Xjan Xwan
        como en su propio lugar.
      </p>
    </div>
  );
};

type StandaloneQuoteProps = React.PropsWithChildren<{
  className?: string;
  spanish?: boolean;
  subtitle?: boolean;
  style?: React.CSSProperties;
}>;
export const StandaloneQuote = ({
  className,
  children,
  spanish,
  subtitle,
  style,
}: StandaloneQuoteProps) => {
  return (
    <div
      className={`language-quote-container ${spanish ? "language-quote-container-spanish" : ""} ${
        subtitle ? "language-quote-container-subtitle" : ""
      } ${className ? className : ""}`}
      style={style}
    >
      <p className="language-quote">{children}</p>
    </div>
  );
};

const quotes = [
  "Silvia: Women do a lot of things at home. Many women make a living while weaving. They weave every day and make other beautiful textiles. Every day they come up with new ideas, it’s one way to survive in San Juan Atitán.",
  "Javier: It has stopped raining because it was raining a lot. Thank God we got a lot of rain. So, this is my cornfield, this is my work and I’m very happy about it. Today, I’ll be picking corn.",
  "Ana: It’s almost dark and I need to make my tortillas. It’s cold and I need to go to sleep, and it’s raining a lot. I mostly use my hands to make tortillas. Sometimes the wood is not dry enough, so it’s hard to make the fire because the wood is always wet during the rainy season. I got the wood from the forest up in the hills.",
  "Osbaldo: Now that I have brought this, I want to take a break. After the break, I’ll chop the wood. It’s raining and I think I’ll chop it now. I’ll start chopping it now, so it’s ready for the fire. Making fire is part of daily life and we know that making fire with wood is another way to survive.",
];

const positions = ["right", "left", "top", "bottom"] as const;

const HiddenTextTwo = () => {
  return (
    <StandaloneQuote spanish className="language-quote-container-marquee-spaced">
      <p>
        Al hablar lenguas colonizantes, no quisimos traducir sus videos al inglés o español, pero
        quisimos destacar momentos significativos de su experiencia, comunicándolos a una audencia
        occidental. En los textos en español voy a explicar un poco nuestras motivaciones hacia la
        presentación artística de sus videos.
      </p>
      {quotes.map((quote: string, index: number) => (
        <Marquee
          key={index}
          position={positions[index]}
          delay={positions[index] === "right" || positions[index] === "left" ? 1000 : 0}
          durationPerChar={75}
        >
          {quote}
        </Marquee>
      ))}
    </StandaloneQuote>
  );
};

type Props = {
  onComplete: () => void;
};

const Language: React.FC<Props> = ({ onComplete }: Props) => {
  const measures = [
    <>
      <Title />
      <PullToContinue onContinue={incrementMeasure} />
    </>,
    <div className="language-measure-one">
      <HiddenTextOne />
      <PullToContinue onContinue={incrementMeasure} videoNext />
    </div>,
    <>
      <StandaloneQuote subtitle style={{ minHeight: "90%" }}>
        <SequenceThroughText durations={[8000, 9000, 5000, 12000, 3000, 5000, 0]}>
          <>Now that I have brought this, I want to take a break.</>
          <>After the break, I’ll chop the wood.</>
          <>It’s raining and I think I’ll chop it now.</>
          <>I’ll start chopping it now, so it’s ready for the fire.</>
          <>Making fire is part of daily life</>
          <>and we know that making fire with wood</>
          <>is another way to survive.</>
        </SequenceThroughText>
      </StandaloneQuote>
      <audio src="https://d2ltbdn9dvbo00.cloudfront.net/shortquoteAUDIOONLY.m4a" hidden autoPlay />
      <PullToContinue onContinue={incrementMeasure} />
    </>,
    <div className="language-measure-three">
      <HiddenTextTwo />
      <PullToContinue onContinue={incrementMeasure} videoNext />
    </div>,
    <FullscreenVideo videoId="03-Weaving-Subtitle-03" hasSubtitles onComplete={incrementMeasure} />,
    <>
      <StandaloneQuote spanish>
        En sus videos encontramos un hermoso ritmo en como ustedes alternan entre mostrar con
        acciones y explicar con palabras. Aunque no podemos entender (por ahora) todas sus palabras
        sin la ayuda de Mintz y Silvia, entendemos la importancia de estas tareas diarias – cortar
        leña, cosechar maíz y frijol, preparar tortillas, y tejer ropa. Podemos ver que estas tareas
        no solo son una manera de sobrevivir en Xjan Xwan, sino también son una fuente de orgullo
        para ustedes. Sus conocimientos y habilidades son, como dijo Silvia, transmitidos a través
        de generaciones, así como su lengua Mam. En sus videos se destaca bellamente esta relación
        entre sus palabras y sus acciones.
        <PullToContinue onContinue={incrementMeasure} videoNext />
      </StandaloneQuote>
    </>,
    <FullscreenVideo
      videoId="04-Corn-Woman-Subtitle-03"
      hasSubtitles
      onComplete={incrementMeasure}
    />,
    <>
      <StandaloneQuote spanish>
        Por eso, no quisimos simplemente traducir todas sus palabras al inglés o español. De
        hacerlo, algo se hubiera perdido. Ustedes han luchado contra siglos de colonización por
        mantener estas palabras, y quisimos tratarlas con respeto. Entonces decidimos solo traducir
        algunas oraciones para dar un poco de contexto y significado a la audiencia. Creemos que la
        audiencia puede entender mucho directamente de sus videos, o incluso mas, a pesar de la
        incomodidad de no entender todas las palabras, y la necesidad resultante de poner atención a
        lo que si se puede entender.
        <PullToContinue onContinue={onComplete} videoNext />
      </StandaloneQuote>
    </>,
  ];
  const [measureIndex, _incrementMeasure] = useWraparoundIndex(0, measures.length);

  function incrementMeasure(): void {
    _incrementMeasure();
  }

  return measures[measureIndex];
};

export default Language;
