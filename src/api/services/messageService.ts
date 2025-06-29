import { Log } from "@/interface/Logs";
import { http } from "@/api/communications/http/httpClient";
import { Request } from "@/interface/Request";

type FormatMessageResponse = {
  status: string;
  message: string;
};

export const MessageService = {
  getFormattedMessage: (data: Request) =>
    http.post<FormatMessageResponse>("formattedMessage", data),

  //validateAtcLogon: (data) => http.post<boolean>("validateAtcLogon", data),

  filterLogsArray: (data : Log[]) =>
    http.post<{ logs: Log[] }>("filterLogsArray", data),
};
