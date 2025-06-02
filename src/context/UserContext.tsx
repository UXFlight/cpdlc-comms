"use client";
import React, { createContext, useContext, useState } from "react";

// structure du contexte
type UserContextType = {
  connectionState: boolean;
  setConnectionState: React.Dispatch<React.SetStateAction<boolean>>;
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
};

// Initialise le contexte avec une valeur par défaut appropriée
export const UserContext = createContext<UserContextType>({
  connectionState: null,
  setConnectionState: () => {},
  username: "",
  setUsername: () => {},
});

// Create a provider component
export const UserProvider = ({ children }) => {
  //provider = sert a injecter des vals dans le contexte
  const [connectionState, setConnectionState] = useState(null);
  const [username, setUsername] = useState<string>("");

  return (
    <UserContext.Provider value={{ connectionState, setConnectionState, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
