"use client";
import React, { createContext, useState } from "react";

// structure du contexte
type InputContextType = {
  targetInput: boolean; 
  setTargetInput: React.Dispatch<React.SetStateAction<boolean>>;
};

// Initialise le contexte avec une valeur par défaut appropriée
export const InputContext = createContext<InputContextType>({
  targetInput: false,
  setTargetInput: () => {},
});

// Create a provider component
export const InputProvider = ({ children }) => {
  //provider = sert a injecter des vals dans le contexte
  const [targetInput, setTargetInput] = useState(false);

  return (
    <InputContext.Provider value={{ targetInput, setTargetInput }}>
      {children}
    </InputContext.Provider>
  );
};
