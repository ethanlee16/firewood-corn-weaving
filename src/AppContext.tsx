import React, { useEffect, useReducer } from "react";
import { GeolocationPosition } from "@capacitor/core";
import { mockCurrentWeather } from "./mockWeather";

export type Action =
  | {
      type: "SET_CAMERA_STREAM";
      stream: MediaStream;
    }
  | {
      type: "SET_GEOLOCATION_POSITION";
      location: GeolocationPosition;
    }
  | {
      type: "SET_WEATHER_INFO";
      info: Required<AppContextStore>["weatherInfo"];
    }
  | {
      type: "GRANTED_CAMERA_STREAM";
    };

type AppContextStore = {
  cameraStream?: MediaStream;
  grantedCameraFromCapacitor?: boolean;
  location: {
    accurateLocation: boolean;
    position: GeolocationPosition;
  };
  weatherInfo?: {
    loadedFromAccurateLocation: boolean;
    temperature: number;
    description: string;
    chanceOfRain: number;
    averageRainfall: number;
    regionName: string;
    currentMonth: string;
    humidity: number;
    dewPoint: number;
    pressureIndex: number;
    visibilityDistance: number;
    windSpeed: number;
    windDirection: string;
  };
};

const initialState: AppContextStore = {
  location: {
    accurateLocation: false,
    position: {
      coords: {
        // Default: Boston
        accuracy: 50,
        latitude: 42.372557,
        longitude: -71.1223617,
      },
      timestamp: Date.now(),
    },
  },
};
const reducer = (state: AppContextStore, action: Action): AppContextStore => {
  switch (action.type) {
    case "SET_CAMERA_STREAM":
      return {
        ...state,
        cameraStream: action.stream,
      };
    case "SET_GEOLOCATION_POSITION":
      return {
        ...state,
        location: { accurateLocation: true, position: action.location },
      };
    case "SET_WEATHER_INFO":
      return {
        ...state,
        weatherInfo: action.info,
      };
    case "GRANTED_CAMERA_STREAM":
      return {
        ...state,
        grantedCameraFromCapacitor: true,
      };
  }
};

const currentMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
][new Date().getMonth()];

export const AppContext = React.createContext<[AppContextStore, (action: Action) => void]>([
  initialState,
  () => {},
]);

const AppContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.location && (!state.weatherInfo || !state.weatherInfo.loadedFromAccurateLocation)) {
      fetch("https://ethanlee16.api.stdlib.com/weather-bodies@dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: state.location.position.coords.latitude,
          long: state.location.position.coords.longitude,
        }),
      })
        .then((response) => response.json())
        .then((weather: any) => {
          // const weather = mockCurrentWeather;
          dispatch({
            type: "SET_WEATHER_INFO",
            info: {
              loadedFromAccurateLocation: state.location.accurateLocation,
              temperature: Math.round(weather.forecast.currently.temperature),
              chanceOfRain: weather.forecast.currently.precipProbability * 100,
              description: weather.forecast.currently.summary.toLowerCase(),
              dewPoint: Math.round(weather.forecast.currently.dewPoint),
              windSpeed: weather.forecast.currently.windSpeed,
              humidity: weather.forecast.currently.humidity * 100,
              pressureIndex: Math.round(weather.forecast.currently.pressure / 33.864),
              visibilityDistance: Math.round(weather.forecast.currently.visibility / 1.609),
              currentMonth,
              windDirection: getCardinal(weather.forecast.currently.windBearing),
              regionName: weather.location.data?.[0]?.locality,
              averageRainfall: Math.floor(Math.random() * 20),
            },
          });
        })
        .catch(() => {
          dispatch({
            type: "SET_WEATHER_INFO",
            info: {
              loadedFromAccurateLocation: false,
              temperature: 70,
              chanceOfRain: 0,
              description: "clear",
              dewPoint: 45,
              windSpeed: 5,
              humidity: 30,
              pressureIndex: 30,
              visibilityDistance: 5,
              currentMonth,
              windDirection: "northwest",
              regionName: "your city",
              averageRainfall: Math.floor(Math.random() * 20),
            },
          });
        });
    }
  }, [state.location, state.weatherInfo]);

  return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};

export function getCardinal(angle: number): string {
  /**
   * Customize by changing the number of directions you have
   * We have 8
   */
  const degreePerDirection = 360 / 8;

  /**
   * Offset the angle by half of the degrees per direction
   * Example: in 4 direction system North (320-45) becomes (0-90)
   */
  const offsetAngle = angle + degreePerDirection / 2;

  return offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection
    ? "north"
    : offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection
    ? "northeast"
    : offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection
    ? "east"
    : offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection
    ? "southeast"
    : offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection
    ? "south"
    : offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection
    ? "southwest"
    : offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection
    ? "west"
    : "northwest";
}

export default AppContextProvider;
