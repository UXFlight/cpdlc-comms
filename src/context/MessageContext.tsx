"use client";
import React, { createContext, useContext, useState } from "react";

// structure du contexte
type MesageContextType = {
  currentMessage: string | null;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

// Initialise le contexte avec une valeur par défaut appropriée
export const MessageContext = createContext<MesageContextType>({
  currentMessage: null,
  setCurrentMessage: () => {},
});

// Create a provider component
export const MessageProvider = ({ children }) => {
  //provider = sert a injecter des vals dans le contexte
  const [currentMessage, setCurrentMessage] = useState(null);

  return (
    <MessageContext.Provider value={{ currentMessage, setCurrentMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
