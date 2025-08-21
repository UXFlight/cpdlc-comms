"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import type { Log } from "@/interface/Logs";
import { socketService } from "@/api/communications/socket/socketService";
import { MessageService } from "@/api/services/messageService";
import { LogsContextType } from "@/interface/context/LogContext";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { ReportContext } from "./ContractContext";
import { maybeArmFromLog } from "@/utils/reportIndex";

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
  const { resetAdscState, setIndexReports } = useContext(ReportContext);

  const isIndexReport = (log: Log) => {
    const res = maybeArmFromLog(log);
    if (!res) return;
    setIndexReports((prev) => {
      if (prev.some((r) => r.id === log.id || r.id === res.id)) return prev;
      return [{ ...res, id: log.id }, ...prev];
    });
    socketService.send("add_index_report", res);
  };

  useSocketListeners([
    {
      event: "log_added",
      callback: (data: Log) => {
        setLogs((prev) => {
          const idx = prev.findIndex((l) => l.id === data.id);
          if (idx === -1) return [data, ...prev];
          const copy = [...prev];
          copy.splice(idx, 1);
          copy.unshift(data); // parent mis à jour en tête
          return copy;
        });
        isIndexReport(data);
      },
    },
    {
      event: "status_changed",
      callback: (data: Log) => {
        setLogs((prev) => {
          const idx = prev.findIndex((l) => l.id === data.id);
          if (idx === -1) return prev;
          const copy = [...prev];
          copy[idx] = data; // pas de mutation in-place
          return copy;
        });
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
        setLogs((prev) => {
          const idx = prev.findIndex((l) => l.id === data.logId);
          if (idx === -1) return prev;
          const copy = [...prev];
          const target = copy[idx];
          copy[idx] = {
            ...target,
            acceptable_responses: [
              ...(target.acceptable_responses ?? []),
              data.response,
            ],
          };
          return copy;
        });
      },
    },
    {
      event: "thread_ending",
      callback: (logId: string) => {
        setLogs((prev) => {
          const idx = prev.findIndex((l) => l.id === logId);
          if (idx === -1) return prev;
          const copy = [...prev];
          copy[idx] = { ...copy[idx], ended: true };
          return copy;
        });
      },
    },
  ]);

  const particularMsgHandler = (ref: string) => {
    console.log("Particular log reference:", ref);
    if (ref === "DM67ab") {
      console.log("JE RENTRE DANS LE IFFFFF");
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
