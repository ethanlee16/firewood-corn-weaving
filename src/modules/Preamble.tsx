import React, { useContext, useEffect, useState } from "react";
import { Capacitor, GeolocationPosition, Plugins } from "@capacitor/core";
import { AppContext } from "../AppContext";

import "./Preamble.css";

type Props = {
  revisiting?: boolean;
  onComplete: (status: "complete" | "skippable") => void;
};

const Preamble: React.FC<Props> = ({ revisiting, onComplete }: Props) => {
  const [, dispatch] = useContext(AppContext);
  const [grantedLocation, setGrantedLocation] = useState(false);
  const [grantedCamera, setGrantedCamera] = useState(false);
  const [locationError, setLocationError] = useState<string | undefined>();
  const [cameraError, setCameraError] = useState<string | undefined>();

  useEffect(() => {
    if (grantedCamera && grantedLocation) {
      onComplete("complete");
    } else if (locationError || cameraError) {
      onComplete("skippable");
    }
  }, [grantedCamera, grantedLocation, cameraError, locationError, onComplete]);

  async function promptForGeolocation(): Promise<void> {
    try {
      let position: GeolocationPosition | undefined;
      if (Capacitor.isPluginAvailable("Geolocation")) {
        position = await Plugins.Geolocation.getCurrentPosition();
      } else if ("geolocation" in navigator) {
        position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position: globalThis.GeolocationPosition) => {
              resolve(position as GeolocationPosition);
            },
            (error: GeolocationPositionError) => reject(error)
          );
        });
      }
      if (position) {
        setGrantedLocation(true);
        dispatch({ type: "SET_GEOLOCATION_POSITION", location: position });
      } else {
        throw new Error("Could not find a way to get your location on this device.");
      }
    } catch (err) {
      setLocationError(err.message);
    }
  }

  async function promptForCamera(): Promise<void> {
    let stream: MediaStream | undefined;
    try {
      if (Capacitor.isPluginAvailable("Camera") && Plugins.Camera.requestPermissions) {
        await Plugins.Camera.requestPermissions();
        dispatch({ type: "GRANTED_CAMERA_STREAM" });
        setGrantedCamera(true);
      } else if (typeof navigator !== "undefined") {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        dispatch({ type: "SET_CAMERA_STREAM", stream });
        setGrantedCamera(true);
      } else {
        throw new Error("Could not find a way to access the camera on this device.");
      }
    } catch (err) {
      setCameraError(err.message);
    }
  }

  return (
    <div className="preamble-container">
      <div className="preamble-instruction">
        {revisiting ? (
          <p>
            <em>Firewood, Corn, Weaving</em> requires temporary permission to your phone's location
            data and camera again to continue from where you left off. This information is not
            stored in any form.
          </p>
        ) : (
          <>
            <p>
              <em>Firewood, Corn, Weaving</em> is a 30 minute experience for your smartphone web
              browser, made up of short films and text pieces. Make yourself comfortable, with space
              to watch, listen, read, and reflect.
            </p>
            <p>
              To return to specific portions of the piece, rotate your phone to landscape for a
              navigation menu.
            </p>
            <p>
              <em>Firewood, Corn, Weaving</em> requires temporary access to your phone’s location
              data and camera as part of the experience. Please give access to these features when
              prompted. This information is not stored in any form.
            </p>
          </>
        )}
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
      {locationError && <p className="permissions-error">{locationError}</p>}
      <button onClick={promptForCamera} disabled={grantedCamera}>
        {grantedCamera ? "Allowed access to camera" : "Allow access to camera"}
      </button>
      {cameraError && <p className="permissions-error">{cameraError}</p>}
    </div>
  );
};

export default Preamble;
