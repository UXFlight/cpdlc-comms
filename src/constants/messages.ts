import { MessageState } from "../interface/MessageState";
import { CPDLCRequestOption } from "../interface/Request";

export const UplinkMessages = [
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
    intent: "Free text message (e.g., coordination or fallback communication).",
  },
  /*{
    id: "UM160",
    element: "NEXT DATA AUTHORITY [facility designation]",
    intent: "Notification of the next data authority.",
  },
  {
    id: "UM137",
    element: "CONFIRM ASSIGNED ROUTE",
    intent: "Instruction to confirm the currently assigned route.",
  },
  {
    id: "UM20",
    element: "CLIMB TO [level] or CLIMB TO AND MAINTAIN [altitude]",
    intent: "Instruction to initiate climb and maintain specified altitude.",
  },
  {
    id: "UM123",
    element: "SQUAWK [code]",
    intent: "Instruction to set a specific transponder code.",
  },
  {
    id: "UM74",
    element: "PROCEED DIRECT TO [position]",
    intent: "Instruction to proceed directly to specified waypoint.",
  },
  {
    id: "UM148",
    element: "WHEN CAN YOU ACCEPT [level]",
    intent: "Negotiation request for earliest acceptable time/position for a level.",
  },
  {
    id: "UM3",
    element: "ROGER",
    intent: "Indicates that ATC has received and understood the message.",
  },*/
];

export const DownlinkMessages = [
  {
    id: "DM0",
    element: "WILCO",
    intent: "The instruction is understood and will be complied with.",
  },
  {
    id: "DM3",
    element: "ROGER",
    intent: "Message received and understood.",
  },
  {
    id: "DM40",
    element: "ASSIGNED ROUTE [route clearance]",
    intent: "Read-back of the assigned route.",
  },
  {
    id: "DM9",
    element: "REQUEST CLIMB TO [level]",
    intent: "Request to climb to the specified level.",
  },
  {
    id: "DM67",
    element: "[free text]",
    intent: "Free text, often used to complete or clarify another message.",
  },
  {
    id: "DM63",
    element: "NOT CURRENT DATA AUTHORITY",
    intent: "System denial from non-authoritative ATC unit.",
  },
  {
    id: "DM48",
    element: "POSITION REPORT [position report]",
    intent: "Current position report of the aircraft.",
  },
  {
    id: "DM6",
    element: "REQUEST [level]",
    intent: "Request to fly at the specified level.",
  },
  {
    id: "DM34",
    element: "PRESENT SPEED [speed]",
    intent: "Notification of the present speed.",
  },
  {
    id: "DM22",
    element: "REQUEST DIRECT TO [position]",
    intent: "Request to proceed direct to a specified waypoint.",
  },
];

export const verticalRequestOptions: CPDLCRequestOption[] = [
  {
    label: "Request to fly at specified level",
    template: "REQUEST [level]",
    dataLinkSystems: ["FANS 1/A", "ATN B1", "FANS 1/A - ATN B1"],
  },
  {
    label: "Request block level",
    template: "REQUEST BLOCK [level] TO [level]",
    dataLinkSystems: ["FANS 1/A"],
  },
  {
    label: "Request cruise climb",
    template: "REQUEST CRUISE CLIMB TO [level]",
    note: "Avoid use due to potential misinterpretation",
    dataLinkSystems: ["FANS 1/A"],
  },
  {
    label: "Request climb to level",
    template: "REQUEST CLIMB TO [level]",
    dataLinkSystems: ["FANS 1/A", "ATN B1", "FANS 1/A - ATN B1"],
  },
  {
    label: "Request descent to level",
    template: "REQUEST DESCENT TO [level]",
    dataLinkSystems: ["FANS 1/A", "ATN B1", "FANS 1/A - ATN B1"],
  },
  {
    label: "Request climb at position",
    template: "AT [position] REQUEST CLIMB TO [level]",
    dataLinkSystems: ["FANS 1/A"],
  },
  {
    label: "Request descent at position",
    template: "AT [position] REQUEST DESCENT TO [level]",
    dataLinkSystems: ["FANS 1/A"],
  },
  {
    label: "Request climb at time",
    template: "AT [time] REQUEST CLIMB TO [level]",
    dataLinkSystems: ["FANS 1/A"],
  },
  {
    label: "Request descent at time",
    template: "AT [time] REQUEST DESCENT TO [level]",
    dataLinkSystems: ["FANS 1/A"],
  },
  {
    label: "Request VMC descent",
    template: "REQUEST VMC DESCENT",
    note: "Avoid use due to potential misinterpretation",
    dataLinkSystems: ["FANS 1/A"],
  },
];

export const VerticalOptionsArray = [
  { ref: "DM7", content: "BLOCK [level] TO [level]", nbOfInputs: 2 },
  { ref: "DM8", content: "CRUISE CLIMB TO [level]", nbOfInputs: 1 },
  { ref: null, content: "CLIMB TO [level]", nbOfInputs: 1 },
  { ref: null, content: "DESCENT TO [level]", nbOfInputs: 1 },
  { ref: "DM69", content: "VMC DESCENT", nbOfInputs: 0 },
];
