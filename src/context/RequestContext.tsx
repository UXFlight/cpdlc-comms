// context/RequestContext.tsx
"use client";
import React, { createContext, useState } from "react";
import type { Request } from "@/interface/Request";
import { DEFAULT_REQUEST } from "@/constants/context/DefaultRequest";
import { RequestContextType } from "@/interface/context/RequestContext";
import { RequestCategory } from "@/constants/tabs/Request";

export const RequestContext = createContext<RequestContextType>({
  request: DEFAULT_REQUEST,
  activeRequest: null,
  setActiveRequest: () => {},
  preview: false,
  setPreview: () => {},
  setRequest: () => {},
  resetRequest: () => {},
});

export const RequestProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [request, setRequestState] = useState<Request>(DEFAULT_REQUEST);
  const [preview, setPreview] = useState<boolean>(false);
  const [activeRequest, setActiveRequest] = useState<RequestCategory | null>(
    null,
  );

  const setRequest = (data: Partial<Request>) => {
    setRequestState((prev) => ({ ...prev, ...data }));
  };

  const resetRequest = () => {
    setRequestState(DEFAULT_REQUEST);
  };

  return (
    <RequestContext.Provider
      value={{
        request,
        activeRequest,
        setActiveRequest,
        preview,
        setPreview,
        setRequest,
        resetRequest,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
