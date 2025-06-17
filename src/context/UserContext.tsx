"use client";
import React, { createContext, useContext, useState } from "react";
import type { FlightDetails } from "../interfaces/FlightDetails";
import { defaultFlightDetails } from "../constants/flightDetails";

// Structure du contexte
type UserContextType = {
  connectionState: boolean;
  setConnectionState: React.Dispatch<React.SetStateAction<boolean>>;
  isConnectionPossible: boolean;
  setIsConnectionPossible: React.Dispatch<React.SetStateAction<boolean>>;
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  flightDetails: FlightDetails;
  setFlightDetails: React.Dispatch<React.SetStateAction<FlightDetails>>;
};

// Valeur par défaut
export const UserContext = createContext<UserContextType>({
  connectionState: null,
  setConnectionState: () => {},
  isConnectionPossible: false,
  setIsConnectionPossible: () => {},
  username: "",
  setUsername: () => {},
  flightDetails: defaultFlightDetails,
  setFlightDetails: () => {},
});

// Provider
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [connectionState, setConnectionState] = useState<boolean>(null);
  const [isConnectionPossible, setIsConnectionPossible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [flightDetails, setFlightDetails] = useState<FlightDetails>(defaultFlightDetails);

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
