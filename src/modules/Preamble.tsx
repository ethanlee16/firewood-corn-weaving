import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

import "./Preamble.css";

type Props = {
  onComplete: () => void;
};

const Preamble: React.FC<Props> = ({ onComplete }: Props) => {
  const [, dispatch] = useContext(AppContext);
  const [grantedLocation, setGrantedLocation] = useState(false);
  const [grantedCamera, setGrantedCamera] = useState(false);

  useEffect(() => {
    if (grantedCamera && grantedLocation) {
      onComplete();
    }
  }, [grantedCamera, grantedLocation, onComplete]);

  function promptForGeolocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setGrantedLocation(true);
        dispatch({ type: "SET_GEOLOCATION_POSITION", location: position });
      },
      (error: GeolocationPositionError) => {}
    );
  }

  async function promptForCamera(): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    dispatch({ type: "SET_CAMERA_STREAM", stream });
    setGrantedCamera(true);
  }

  return (
    <div className="preamble-container">
      <div className="preamble-instruction">
        <p>
          <em>Firewood, Corn, Weaving</em> is a 20 minute experience for your smartphone web
          browser, made up of short films and text pieces. Make yourself comfortable, with space to
          watch, listen, read, and reflect.
        </p>
        <p>
          <em>Firewood, Corn, Weaving</em> requires temporary access to your phone’s location data
          and camera as part of the experience. Please give access to these features when prompted.
          This information is not stored in any form.
        </p>
        <div
          className="preamble-instruction preamble-instruction-hidden"
          style={{ left: "20%", top: "-40%" }}
        >
          <p>
            <em>Firewood, Corn, Weaving</em> es una experiencia de 20 minutos para el navegador web
            de su smartphone, formado de videos cortos y textos. Póngase cómodo, con espacio para
            ver, escuchar, leer, y reflejar.
          </p>
          <p>
            <em>Firewood, Corn, Weaving</em> requiere acceso temporario a los datos de lugar y
            cámara de su celular como parte de le experiencia. Por favor permita acceso a estas
            funciones cuando pedido. Esta información no será almacenada en ningún forma.
          </p>
        </div>
        <div
          className="preamble-instruction preamble-instruction-hidden"
          style={{ left: "-20%", top: "100%" }}
        >
          <p>
            Si', axi'n, chemj, junk'al qke'yb'l tuj jun yob'l tu'n kyqe'yni, ch'in ju'n ne ke'yb'l
            b'ix tu' qa yol. Cheb' b'anchanx tib'i, tu'n tb'ini, tke'yni, b'ix tsch'ini.{" "}
          </p>
          <p>
            Si', axi'n, chemj, ntzaj tqan ti txilen aj qojb'il b'ix tu jun yolb'l taj ob'ant jun
            ke'yb'l. B'anchami xtalb'l tu'n t-tzaj tq'oni amb'l a'j t-xi qan. Ajun qa yol b'ix ti'ch
            jil a'j t-tzaj q'on me'n txi k'ut.
          </p>
        </div>
      </div>
      <button onClick={promptForGeolocation} disabled={grantedLocation}>
        {grantedLocation ? "Allowed access to location" : "Allow access to location"}
      </button>
      <button onClick={promptForCamera} disabled={grantedCamera}>
        {grantedCamera ? "Allowed access to camera" : "Allow access to camera"}
      </button>
    </div>
  );
};

export default Preamble;
