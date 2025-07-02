"use client";
import React, { createContext, useState } from "react";

type InputContextType = {
  targetInput: string;
  setTargetInput: React.Dispatch<React.SetStateAction<string>>;
};

export const InputContext = createContext<InputContextType>({
  targetInput: "",
  setTargetInput: () => {},
});

export const InputProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [targetInput, setTargetInput] = useState("");

  return (
    <InputContext.Provider value={{ targetInput, setTargetInput }}>
      {children}
    </InputContext.Provider>
  );
};
