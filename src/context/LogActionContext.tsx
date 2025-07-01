"use client";
import { LogActionContextType, LogActionState } from "@/interface/context/LogActionContext";
import React, { createContext, useState } from "react";

export const LogActionContext = createContext<LogActionContextType>({
  action: "",
  setAction: () => {},
  state: undefined,
  setState: () => {},
  confirmed: false,
  setConfirmed: () => {},
  cancelledAction: false,
  setCancelledAction: () => {},
  rejet: false,
  setRejet: () => {},
});

export const LogActionProvider = ({ children }: { children: React.ReactNode }) => {
  const [action, setAction] = useState<string>("");
  const [state, setState] = useState<LogActionState | undefined>(undefined);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [cancelledAction, setCancelledAction] = useState<boolean>(false);
  const [rejet, setRejet] = useState<boolean>(false);

  return (
    <LogActionContext.Provider
      value={{
        action,
        setAction,
        state,
        setState,
        confirmed,
        setConfirmed,
        cancelledAction,
        setCancelledAction,
        rejet,
        setRejet,
      }}
    >
      {children}
    </LogActionContext.Provider>
  );
};
