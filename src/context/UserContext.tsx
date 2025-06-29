"use client";
import React, { createContext, useState } from "react";
import type { FlightDetails } from "@/interface/FlightDetails";
import { DEFAULT_FLIGHT_DETAILS } from "@/constants/context/FlightDetails";
import { UserContextType } from "@/interface/UserContext";

export const UserContext = createContext<UserContextType>({
  connectionState: null,
  setConnectionState: () => {},
  isConnectionPossible: false,
  setIsConnectionPossible: () => {},
  username: "",
  setUsername: () => {},
  flightDetails: DEFAULT_FLIGHT_DETAILS,
  setFlightDetails: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [connectionState, setConnectionState] = useState<boolean|null>(null);
  const [isConnectionPossible, setIsConnectionPossible] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [flightDetails, setFlightDetails] = useState<FlightDetails>(
    DEFAULT_FLIGHT_DETAILS,
  );

  return (
    <UserContext.Provider
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
    </UserContext.Provider>
  );
};
