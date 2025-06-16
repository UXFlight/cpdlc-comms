// lib/cpdlcService.ts

import { http } from "../../communications/http/httpClient";


type FormatMessageResponse = {
  status: string;
  message: string;
};

export const MessageService = {
  getFormattedMessage: (data) => http.post<FormatMessageResponse>('formattedMessage', data),

  validateAtcLogon: (data) => http.post<boolean>('validateAtcLogon', data),
 
};
