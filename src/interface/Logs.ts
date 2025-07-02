export interface LogsArray {
  logs: Log[];
  filterBy: string;
}

export interface Log {
  id: string;
  ref: string;
  direction: string;
  status: string;
  timeStamp: string;
  element: string;
  intent?: string;
  position?: string;
  additional?: string[];
}
