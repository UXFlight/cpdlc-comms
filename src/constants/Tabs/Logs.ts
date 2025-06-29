export enum ActionType {
  Load = "load",
  Standby = "standby",
  Reject = "reject",
  Accept = "accept",
}

export const STEPS = ["Loaded", "Executed", "Responded", "Sent"];

export const DROPDOWN_OPTIONS = [
  "NEW",
  "OPENED",
  "ACCEPTED",
  "REJECTED",
  "STANDBY",
  "TIME OUT",
];
