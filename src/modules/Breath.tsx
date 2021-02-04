import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../AppContext";
import FullscreenVideo from "../components/FullscreenVideo";
import useWraparoundIndex from "../useWraparoundIndex";
import "./Breath.css";

const Title = () => {
  return (
    <div className="hero">
      <h1>Breath / Xewb’j / Respiración</h1>
    </div>
  );
};

const VideoCallMeasure = ({ showCamera }: { showCamera?: boolean }) => {
  const [state] = useContext(AppContext);
  const cameraVideo = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const camera = cameraVideo.current;
    if (camera && state.cameraStream) {
      camera.srcObject = state.cameraStream;
      camera.onloadedmetadata = function () {
        camera && camera.play();
      };
    }
  }, [state.cameraStream]);

  return (
    <div className="video-call">
      <FullscreenVideo
        videoId="08-Weaving-Webcam-01"
        {...(showCamera ? { className: "video-shrunk" } : {})}
      />
      <video
        className="camera-view"
        ref={cameraVideo}
        style={{ opacity: showCamera ? 1 : 0 }}
        playsInline
        controls={false}
      />
      <div className={`video-call-overlay ${showCamera ? "video-call-overlay-show" : ""}`}>
        Climate change challenges the agrarian livelihoods of Mayans, just as it challenges those
        most dependent on the weather throughout the world. But the politics of climate change have
        been animated by ideas of apocalypse, disruption, and death where indigenous Americans have
        already survived the apocalypse, disruption, and death of colonization. The human response
        to climate change must be animated by something other than death. It must be reanimated
        through attention to the embodied experience of weather.
      </div>
    </div>
  );
};

const measures = [
  <Title />,
  <FullscreenVideo videoId="07-Corn-Male-Subtitle-03" hasSubtitles />,
  <p>
    Como colonizadores, nos estamos acostumbrados a tener explicaciones por todo en nuestro idioma.
    Pero yo creo que hay explicaciones que solo pueden ser entendido en su propia lengua en su
    propio lugar. Y estos conocimientos vinculados a sus propias lenguas y sus propios lugares son
    conocimientos, como nos muestran, que conlleve la sobrevivencia y florecimiento de humanidad y
    la tierra. Esperamos que la audiencia pueda aprender un poco de estos temas profundos.{" "}
  </p>,
  <FullscreenVideo videoId="07-Witz-POEM-03">
    Like breath,
    <br />
    Clothes are
    <br />
    <br />
    Intimate expressions
    <br />
    Of living in weather.
    <br />
    <br />
    Too close to my skin
    <br />
    To be temperature
    <br />
    <br />
    Weather is breath
    <br />
    Clothed in the wind
  </FullscreenVideo>,
  <>
    <p>
      Notemos en el video en la montaña el sonido de viento junto con los sonidos de su respiración,
      sus pasos, y la música distante del pueblo. Nos impresionó este video como simbólico de las
      relaciones poéticas, teológicas, y éticas entre la humanidad, la tierra, y el cielo.
    </p>
    <p className="accent">
      Breath is political. George Floyd’s words, “I can’t breathe,” have filled the lungs of black
      lives demanding life in the face of deadly white supremacy. Breath is an expression of life.
    </p>
    <p>
      El viento del cielo y la respiración del hombre y mujer son compartidos y vinculados. En la
      cultura occidental vivimos como esta relación no existe, como no importa la tierra por la
      sobrevivencia y florecimiento de las sociedades y culturas del mundo.{" "}
    </p>
    <p className="accent">
      The Mam Mayans also know the deadly restriction of white supremacy. In surviving 500 years of
      colonization they have fought for breath, to speak the language passed down by their mothers
      and to sow the maize passed down by their fathers. Sylvia’s everyday act of weaving is an
      expression of life.
    </p>
    <p>
      Con las ciencias sabemos que hemos perjudicado a la tierra, pero esta sabiduría es abstracta.
      No sabemos cómo cambiar nuestras vidas en concreto. En sus videos, vimos una relación con la
      tierra, el cielo, el viento, y la lluvia que está vinculado con un lugar específico, su tierra
      de Xjan Xwan. Queremos que los miembros de la audiencia reflejan en sus propias relaciones
      concretos con sus ambientes.
    </p>
  </>,
  <VideoCallMeasure />,
  <VideoCallMeasure showCamera />,
];

const Breath: React.FC = () => {
  const [measure, incrementMeasure] = useWraparoundIndex(0, measures.length);

  return (
    <div className="breath-container">
      {measures[measure]}
      <button onClick={incrementMeasure} style={{ position: "fixed", top: 0, right: 0 }}>
        Next measure (debug only)
      </button>
    </div>
  );
};

export default Breath;
