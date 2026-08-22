import { http } from "@/api/communications/http/httpClient";

type SupportedCodesResponse = {
  codes: string[];
};

export const SupportedCodesService = {
  getAll: () => http.get<SupportedCodesResponse>("supported-codes"),
};
