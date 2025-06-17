// context/LogsContext.tsx
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import type { Log } from "../interfaces/Logs";
import { socketService } from "../api/communications/socket/socketService";
import { MessageService } from "../api/services/messageService/messageService";

type LogsContextType = {
    logs: Log[];
    filterBy: string;
    currentLog: string | null;
    setCurrentLog: React.Dispatch<React.SetStateAction<string | null>>;
    addLog: (log: Log) => void;
    clearLogs: () => void;
    setFilterBy: (filter: string) => void;
};

export const LogsContext = createContext<LogsContextType>({
  logs: [],
  filterBy: "",
  currentLog: null,
  setCurrentLog: () => {},
  addLog: () => {},
  clearLogs: () => {},
  setFilterBy: () => {},
});

export const LogsProvider = ({ children }: { children: React.ReactNode }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filterBy, setFilter] = useState<string>("");
  const [currentLog, setCurrentLog] = useState(null);

  useEffect(() => {
    const handleNewLog = (log: Log) => {
        addLog(log);
    };

    socketService.listen("new_log", handleNewLog);

    return () => {
        socketService.off("new_log", handleNewLog);
    };
  }, []);

  useEffect(() => {
    if (!filterBy) return;

    MessageService.filterLogsArray({ logs })
        .then((res) => {
            console.log("Filtered message received:", res.logs);
            setLogs(res.logs);
        })
        .catch((error) => {
            console.error("Error fetching filtered message:", error);
        });
    }, [filterBy]);

  const addLog = (log: Log) => {
    setLogs((prev) => [log, ...prev]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const setFilterBy = (filter: string) => {
    setFilter(filter);
  };

  return (
    <LogsContext.Provider value={{ logs, filterBy, currentLog, setCurrentLog, addLog, clearLogs, setFilterBy }}>
      {children}
    </LogsContext.Provider>
  );
};
