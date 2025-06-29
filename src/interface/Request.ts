export type Request = {
  messageRef: string | null;
  arguments: string[] | null;
  formattedMessage?: string;
  timeSelected?: { hh: string; mm: string } | null;
  positionSelected?: string;
  additional?: string[];
};

export interface RequestContextType {
  request: Request;
  setRequest: (data: Partial<Request>) => void;
  resetRequest: () => void;
};