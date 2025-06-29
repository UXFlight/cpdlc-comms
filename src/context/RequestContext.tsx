// context/RequestContext.tsx
"use client";
import React, { createContext, useState } from "react";
import type { Request, RequestContextType } from "@/interface/Request";
import { DEFAULT_REQUEST } from "@/constants/context/DefaultRequest";

export const RequestContext = createContext<RequestContextType>({
  request: DEFAULT_REQUEST,
  setRequest: () => {},
  resetRequest: () => {},
});

export const RequestProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [request, setRequestState] = useState<Request>(DEFAULT_REQUEST);

  const setRequest = (data: Partial<Request>) => {
    setRequestState((prev) => ({ ...prev, ...data }));
  };

  const resetRequest = () => {
    setRequestState(DEFAULT_REQUEST);
  };

  return (
    <RequestContext.Provider value={{ request, setRequest, resetRequest }}>
      {children}
    </RequestContext.Provider>
  );
};
