export enum ActionType {
  Load = "load",
  Standby = "standby",
  Reject = "reject",
  Accept = "accept",
}

export const STEPS = ["Loaded", "Executed", "Responded", "Sent"];

export const DROPDOWN_OPTIONS = [
  "NEW",
  "OPEN",
  "ACCEPTED",
  "REJECTED",
  "STANDBY",
  "TIME OUT",
];

export const MESSAGE_STATE = {
  NEW: "new",
  OPEN: "open",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  TIMEOUT: "time out",
};
