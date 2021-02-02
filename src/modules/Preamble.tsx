import React, { useState } from "react";

const Preamble: React.FC = () => {
  const [grantedLocation, setGrantedLocation] = useState(false);
  const [grantedCamera, setGrantedCamera] = useState(false);

  function promptForGeolocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setGrantedLocation(true);
      },
      (error: GeolocationPositionError) => {}
    );
  }

  async function promptForCamera(): Promise<void> {
    await navigator.mediaDevices.getUserMedia({ video: true });
    setGrantedCamera(true);
  }

  return (
    <div>
      <p>
        <em>Firewood, Corn, Weaving</em> is a 20 minute experience for your smartphone web browser,
        made up of short films and text pieces. Make yourself comfortable, with space to watch,
        listen, read, and reflect.
      </p>
      <p>
        <em>Weather Life</em> requires temporary access to your phone’s location data and camera as
        part of the experience. Please give access to these features when prompted. This information
        is not stored in any form.
      </p>
      <button onClick={promptForGeolocation} disabled={grantedLocation}>
        {grantedLocation ? "✅ Allowed access to location" : "Allow access to location"}
      </button>
      <button onClick={promptForCamera} disabled={grantedCamera}>
        {grantedCamera ? "✅ Allowed access to camera" : "Allow access to camera"}
      </button>
    </div>
  );
};

export default Preamble;
