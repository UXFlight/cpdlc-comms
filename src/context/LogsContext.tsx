// context/LogsContext.tsx
"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import type { Log } from "@/interface/Logs";
import { socketService } from "@/api/communications/socket/socketService";
import { MessageService } from "@/api/services/messageService";
import { LogsContextType } from "@/interface/context/LogContext";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { log } from "console";
import { ReportContext } from "./ContractContext";

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
  const { resetAdscState } = useContext(ReportContext);

  useSocketListeners([
    {
      event: "log_added",
      callback: (data: Log) => {
        const logIndex = logs.findIndex((log) => log.id === data.id);

        if (logIndex === -1) {
          setLogs([data, ...logs]);
          return;
        }
        const updatedLogs = [...logs];
        updatedLogs.splice(logIndex, 1);
        updatedLogs.unshift(data);
        setLogs(updatedLogs);
      }
    },
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
    {
      event: "thread_ending",
      callback: (data) => {
        const logIndex = logs.findIndex((log) => log.id === data);
        console.log("Thread ending for log:", logs[logIndex]);
        if (logIndex !== -1) {
          logs[logIndex].ended = true;
          setLogs([...logs]);
        }
      },
    },
  ]);

  const particularMsgHandler = (ref: string) => {
    console.log("Particular log reference:", ref);
    if (ref === "DM67ab") {
      console.log("JE RENTRE DANS LE IFFFFF")
      resetAdscState();
    }
  };

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
      particularMsgHandler(response.ref);
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
