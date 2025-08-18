export interface LogsArray {
  logs: Log[];
  filterBy: string;
}

export interface Log {
  id: string;
  ref: string;
  direction: string;
  status: string;
  urgency: string;
  timeStamp: string;
  element: string;
  intent?: string;
  position?: string;
  additional?: string[];
  response_required: boolean;
  acceptable_responses: AcceptableResponse[];
  communication_thread: Log[];
  ended: boolean;
}


export interface AcceptableResponse {
  ref: string;
  text: string;
}
