"use client";
import React, { createContext, useState } from "react";
import type { GlobalContextType } from "@/interface/context/GlobalContext";

export const GlobalContext = createContext<GlobalContextType>({
  connectionState: null,
  setConnectionState: () => {},
  isConnectionPossible: false,
  setIsConnectionPossible: () => {},
  username: "",
  setUsername: () => {},
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [connectionState, setConnectionState] = useState<boolean | null>(null);
  const [isConnectionPossible, setIsConnectionPossible] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  return (
    <GlobalContext.Provider
      value={{
        connectionState,
        setConnectionState,
        isConnectionPossible,
        setIsConnectionPossible,
        username,
        setUsername,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
