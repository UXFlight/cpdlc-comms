"use client";
import React, { createContext, useState } from "react";
import type { FlightDetails } from "@/interface/FlightDetails";
import { DEFAULT_FLIGHT_DETAILS } from "@/constants/context/FlightDetails";
import type { GlobalContextType } from "@/interface/context/GlobalContext";

export const GlobalContext = createContext<GlobalContextType>({
  connectionState: null,
  setConnectionState: () => {},
  isConnectionPossible: false,
  setIsConnectionPossible: () => {},
  username: "",
  setUsername: () => {},
  flightDetails: DEFAULT_FLIGHT_DETAILS,
  setFlightDetails: () => {},
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [connectionState, setConnectionState] = useState<boolean | null>(null);
  const [isConnectionPossible, setIsConnectionPossible] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [flightDetails, setFlightDetails] = useState<FlightDetails>(
    DEFAULT_FLIGHT_DETAILS,
  );

  return (
    <GlobalContext.Provider
      value={{
        connectionState,
        setConnectionState,
        isConnectionPossible,
        setIsConnectionPossible,
        username,
        setUsername,
        flightDetails,
        setFlightDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
