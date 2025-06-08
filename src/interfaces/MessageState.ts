export const MessageState = {
  NEW: "new",
  OPENED: "opened",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  TIMEOUT: "time out",
};

export type Logs = {
  id: string;
  ref: string;
  state: string; 
  element: string;
  intent?: string;   
}