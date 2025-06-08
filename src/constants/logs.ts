import { Logs, MessageState } from "../interfaces/MessageState";

export const LogsArray: Logs[] = [
  {
    id: "123",
    ref: "UM120",
    state: MessageState.NEW,
    element: "MONITOR CYOB 123.8MHz",
    intent:
      "Instruction that the ATS unit is to be monitored on the specified frequency.",
  },
  {
    id: "456",
    ref: "UM117",
    state: MessageState.NEW,
    element: "CONTACT [unit name] [frequency]",
    intent:
      "Instruction that the ATS unit is to be contacted on the specified frequency.",
  },
  {
    id: "789",
    ref: "UM169",
    state: MessageState.NEW,
    element: "[free text]",
  },
];
