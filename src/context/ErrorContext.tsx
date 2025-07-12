"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface ErrorMessage {
  id: number;
  message: string;
}

interface ErrorContextType {
  currentError: ErrorMessage | null;
  errors: ErrorMessage[];
  throwError: (message: string) => void;
  clearCurrentError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

let errorId = 0;

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const [currentError, setCurrentError] = useState<ErrorMessage | null>(null);

  const throwError = (message: string) => {
    const newError = { id: ++errorId, message };
    setErrors((prev) => [...prev, newError]);
    setCurrentError(newError);
  };

  const clearCurrentError = () => {
    setCurrentError(null);
  };

  return (
    <ErrorContext.Provider value={{ currentError, errors, throwError, clearCurrentError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
