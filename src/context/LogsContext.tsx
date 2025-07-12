// context/LogsContext.tsx
"use client";
import React, { createContext, useState, useEffect } from "react";
import type { Log } from "@/interface/Logs";
import { socketService } from "@/api/communications/socket/socketService";
import { MessageService } from "@/api/services/messageService";
import { LogsContextType } from "@/interface/context/LogContext";
import { useSocketListeners } from "@/hooks/useSocketListeners";

export const LogsContext = createContext<LogsContextType>({
  logs: [],
  setLogs: () => {},
  filterBy: "",
  setFilter: () => {},
  currentLog: null,
  setCurrentLog: () => {},
  addLog: () => {},
  changeStatus: () => {},
  clearLogs: () => {},
  setFilterBy: () => {},
});

export const LogsProvider = ({ children }: { children: React.ReactNode }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filterBy, setFilter] = useState<string>("");
  const [currentLog, setCurrentLog] = useState<Log | null>(null);

  useSocketListeners([
    {
      event: "log_added",
      callback: (log: Log) => {
        console.log("New log received:", log);
        addLog(log);
      },
    },
    {
      event: "status_changed",
      callback: (log: Log) => {
        addLog(log);
      },
    },
  ]);

  useEffect(() => {
    if (!filterBy) return;

    MessageService.filterLogsArray(logs)
      .then((res) => {
        setLogs(res.logs);
      })
      .catch((error) => {
        console.error("Error fetching filtered message:", error);
      });
  }, [filterBy]);

  const addLog = (log: Log) => {
    setLogs((prev) => [log, ...prev]);
  };

  // const replaceLog = (log: Log) => {
  //   logs.find((logs) => logs.id === log.id)

  const changeStatus = (logId: string, newState: string) => {
    // setLogs((prevLogs) =>
    //   prevLogs.map((log) =>
    //     log.id === logId ? { ...log, status: newState } : log,
    //   ),
    // );
    console.log("Changing status for log:", logId, "to", newState);
    // Emit the change
    socketService.send("change_status", { logId: logId, status: newState });
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const setFilterBy = (filter: string) => {
    setFilter(filter);
  };

  return (
    <LogsContext.Provider
      value={{
        logs,
        setLogs,
        filterBy,
        setFilter,
        currentLog,
        setCurrentLog,
        addLog,
        changeStatus,
        clearLogs,
        setFilterBy,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
};
