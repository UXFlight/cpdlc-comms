export interface LoadContextType {
  progressStep: ProgressStep | null;
  setProgressStep: React.Dispatch<React.SetStateAction<ProgressStep | null>>;
}

export enum ProgressStep {
  LOAD = "loaded",
  EXECUTE = "executed",
  RESPONSE = "responded",
  SENT = "sent",
}
