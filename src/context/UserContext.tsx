"use client";
import React, { createContext, useState } from "react";
import type { FlightDetails } from "@/interface/FlightDetails";
import { DEFAULT_FLIGHT_DETAILS } from "@/constants/context/FlightDetails";

// Structure du contexte
type UserContextType = {
  connectionState: boolean;
  setConnectionState: React.Dispatch<React.SetStateAction<boolean>>;
  isConnectionPossible: boolean;
  setIsConnectionPossible: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  flightDetails: FlightDetails;
  setFlightDetails: React.Dispatch<React.SetStateAction<FlightDetails>>;
};

// Valeur par défaut
export const UserContext = createContext<UserContextType>({
  connectionState: false,
  setConnectionState: () => {},
  isConnectionPossible: false,
  setIsConnectionPossible: () => {},
  username: "",
  setUsername: () => {},
  flightDetails: DEFAULT_FLIGHT_DETAILS,
  setFlightDetails: () => {},
});

// Provider
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [connectionState, setConnectionState] = useState<boolean>(false);
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
