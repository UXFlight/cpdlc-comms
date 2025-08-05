import { Log } from "@/interface/Logs";

export const DEFAULT_LOG: Log = {
  id: "",
  ref: "",
  direction: "",
  status: "",
  urgency: "",
  timeStamp: "",
  element: "",
  intent: "",
  position: "",
  additional: [],
  response_required: false,
  acceptable_responses: [],
  communication_thread: [],
};
