// lib/cpdlcService.ts

import { Log } from "../../interface/Logs";
import { http } from "../communications/http/httpClient";

type FormatMessageResponse = {
  status: string;
  message: string;
};

export const MessageService = {
  getFormattedMessage: (data) =>
    http.post<FormatMessageResponse>("formattedMessage", data),

  validateAtcLogon: (data) => http.post<boolean>("validateAtcLogon", data),

  filterLogsArray: (data) =>
    http.post<{ logs: Log[] }>("filterLogsArray", data),
};
