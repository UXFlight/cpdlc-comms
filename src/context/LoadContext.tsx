"use client";
import React, { createContext, useState } from "react";
import { LoadContextType, ProgressStep } from "@/interface/context/LoadContext";
import { useSocketListeners } from "@/hooks/useSocketListeners";

export const LoadContext = createContext<LoadContextType>({
  progressStep: null,
  setProgressStep: () => {},
});

export const LoadProvider = ({ children }: { children: React.ReactNode }) => {
  const [progressStep, setProgressStep] = useState<ProgressStep | null>(null);

  useSocketListeners([]);

  return (
    <LoadContext.Provider
      value={{
        progressStep,
        setProgressStep,
      }}
    >
      {children}
    </LoadContext.Provider>
  );
};
