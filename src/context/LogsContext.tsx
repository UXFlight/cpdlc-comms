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
  handleResponse: () => {},
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
      callback: (data: Log) => {
        const logIndex = logs.findIndex((log) => log.id === data.id);
        if (logIndex === -1) {
          const new_logs = [data, ...logs];
          setLogs(new_logs);
          return;
        }
        logs[logIndex] = data;
        setLogs(logs);
      },
    },
    // {
    //   event: "status_changed",
    //   callback: (log: Log) => {
    //     addLog(log);
    //   },
    // },
    {
      event: "status_changed",
      callback: (data: Log) => {
        const logIndex = logs.findIndex((log) => log.id === data.id);
        logs[logIndex] = data;
        setLogs(logs);
      },
    },
    {
      event: "scenario_log_add",
      callback: (data) => {
        socketService.send("add_log", data);
      },
    },
    {
      event: "add_response",
      callback: (data) => {
        const logIndex = logs.findIndex((log) => log.id === data.logId);
        if (logIndex !== -1) {
          logs[logIndex].acceptable_responses.push(data.response);
          setLogs([...logs]);
        }
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

  const addLog = (log: Log, threadId = null) => {
    if (threadId) {
    }
    setLogs((prev) => [log, ...prev]);
  };

  // const replaceLog = (log: Log) => {
  //   logs.find((logs) => logs.id === log.id)

  const handleResponse = (
    logId: string,
    response: { ref: string; text: string },
  ) => {
    // Emit the change
    if (response.ref === "loaded") {
      socketService.send("fms_loaded", { logId: logId });
    } else {
      socketService.send("pilot_response", {
        thread_id: logId,
        log_entry: response,
      });
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
        handleResponse,
        clearLogs,
        setFilterBy,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
};
