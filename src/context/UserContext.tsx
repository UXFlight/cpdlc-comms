"use client";
import React, { createContext, useContext, useState } from 'react';

// structure du contexte
type UserContextType = {
    connectionState: boolean;
    setConnectionState: React.Dispatch<React.SetStateAction<boolean>>;
};

// Initialise le contexte avec une valeur par défaut appropriée
export const UserContext = createContext<UserContextType>({
  connectionState: null,
  setConnectionState: () => {},
});

// Create a provider component
export const UserProvider = ({ children }) => { //provider = sert a injecter des vals dans le contexte
  const [connectionState, setConnectionState] = useState(null);

  return (
    <UserContext.Provider value={{ connectionState, setConnectionState }}>
      {children}
    </UserContext.Provider>
  );
};