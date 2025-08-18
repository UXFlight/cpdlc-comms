import { Log } from "@/interface/Logs";

export interface LogsContextType {
  logs: Log[];
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>;
  filterBy: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  currentLog: Log | null;
  setCurrentLog: React.Dispatch<React.SetStateAction<Log | null>>;
  addLog: (log: Log) => void;
  handleResponse: (
    logId: string,
    response: { ref: string; text: string },
  ) => void;
  clearLogs: () => void;
  setFilterBy: (filter: string) => void;
}
