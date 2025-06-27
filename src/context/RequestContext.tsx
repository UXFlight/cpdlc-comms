// context/RequestContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";
import type { RequestState } from "../interface/Request";

type RequestContextType = {
  request: RequestState;
  setRequest: (data: Partial<RequestState>) => void;
  resetRequest: () => void;
};

const defaultRequest: RequestState = {
  arguments: null,
  messageRef: null,
};

export const RequestContext = createContext<RequestContextType>({
  request: defaultRequest,
  setRequest: () => {},
  resetRequest: () => {},
});

export const RequestProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [request, setRequestState] = useState<RequestState>(defaultRequest);

  const setRequest = (data: Partial<RequestState>) => {
    setRequestState((prev) => ({ ...prev, ...data }));
  };

  const resetRequest = () => {
    setRequestState(defaultRequest);
  };

  return (
    <RequestContext.Provider value={{ request, setRequest, resetRequest }}>
      {children}
    </RequestContext.Provider>
  );
};
