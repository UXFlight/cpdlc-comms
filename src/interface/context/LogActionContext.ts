export interface LogActionContextType {
  action: string;
  setAction: (action: string) => void;
  state?: LogActionState | undefined;
  setState: (state: LogActionState | undefined) => void;
  confirmed?: boolean;
  setConfirmed?: (confirmed: boolean) => void;
  cancelledAction?: boolean;
  setCancelledAction?: (cancelled: boolean) => void;
  rejet?: boolean;
  setRejet?: (rejet: boolean) => void;
};

export enum LogActionState {
  LOADED = "loaded",
  EXECUTED = "executed",
  RESPONDED = "responded",
  SENT = "sent",
}