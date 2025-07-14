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
  requestChangeStatus: () => {},
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
    {
      event: "status_changed",
      callback: (data: Log) => {
        console.log("Status changed for log:", data);
        const logIndex = logs.findIndex((log) => log.id === data.id);
        logs[logIndex] = data;
        setLogs(logs);
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

  const requestChangeStatus = (logId: string, response: string) => {
    console.log("Changing status for log:", logId, "to", response);
    // Emit the change
    if (response === "loaded") {
      socketService.send("fms_loaded", { logId: logId });
    } else {
      socketService.send("change_status", { logId: logId, status: response });
    }
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
        requestChangeStatus,
        clearLogs,
        setFilterBy,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
};
