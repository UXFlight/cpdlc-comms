// types/Request.ts
export type RequestState = {
  messageRef: string | null;
  arguments: string[] | null;
  formattedMessage?: string;
  timeSelected?: { hh: string; mm: string } | null;
  positionSelected?: string;
  additional?: string[];
};

export enum RequestCategory {
  ALTITUDE = "Altitude Requests",
  ROUTE_MODIFICATION = "Route Modification Requests",
  OFFSET = "Offset Requests",
  VOICE = "Voice Contact Requests",
  SPEED = "Speed Requests",
  NEGOTIATION = "Negotiation Requests",
  CLEARANCE = "Clearance Requests",
  VMC = "VMC Request",
}

export type VerticalRequestType =
  | "REQUEST [level]"
  | "REQUEST BLOCK [level] TO [level]"
  | "REQUEST CRUISE CLIMB TO [level]"
  | "REQUEST CLIMB TO [level]"
  | "REQUEST DESCENT TO [level]"
  | "AT [position] REQUEST CLIMB TO [level]"
  | "AT [position] REQUEST DESCENT TO [level]"
  | "AT [time] REQUEST CLIMB TO [level]"
  | "AT [time] REQUEST DESCENT TO [level]"
  | "REQUEST VMC DESCENT";

export interface CPDLCRequestOption {
  label: string;
  template: VerticalRequestType;
  note?: string;
  dataLinkSystems: string[];
}
