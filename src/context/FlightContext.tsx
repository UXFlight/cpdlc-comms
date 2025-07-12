"use client";
import React, { createContext, useState } from "react";
import type { FlightDetails } from "@/interface/FlightDetails";
import { DEFAULT_FLIGHT_DETAILS } from "@/constants/context/FlightDetails";
import { FlightContextType } from "@/interface/context/FlightContext";

export const FlightContext = createContext<FlightContextType>({
  flightDetails: DEFAULT_FLIGHT_DETAILS,
  setFlightDetails: () => {},
});

export const FlightProvider = ({ children }: { children: React.ReactNode }) => {
  const [flightDetails, setFlightDetails] = useState<FlightDetails>(
    DEFAULT_FLIGHT_DETAILS,
  );

  return (
    <FlightContext.Provider
      value={{
        flightDetails,
        setFlightDetails,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};
