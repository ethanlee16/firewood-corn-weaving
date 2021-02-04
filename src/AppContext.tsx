import React, { useReducer } from "react";

export type Action =
  | {
      type: "SET_CAMERA_STREAM";
      stream: MediaStream;
    }
  | {
      type: "SET_GEOLOCATION_POSITION";
      location: GeolocationPosition;
    };

type AppContextStore = {
  cameraStream?: MediaStream;
  location?: GeolocationPosition;
};

const initialState: AppContextStore = {};
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
        location: action.location,
      };
  }
};

export const AppContext = React.createContext<[AppContextStore, (action: Action) => void]>([
  initialState,
  () => {},
]);

const AppContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
