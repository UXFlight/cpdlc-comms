export enum RequestCategory {
  VERTICAL = "Vertical Requests",
  LATERAL = "Lateral Requests",
  SPEED = "Speed Requests",
  DESTINATION = "Destination Requests",
  CLEARANCE = "Clearance Requests",
  MISC = "Miscellaneous Requests",
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

  /*| "REQUEST [level]"
  | "REQUEST BLOCK [level] TO [level]"
  | "REQUEST CRUISE CLIMB TO [level]"
  | "REQUEST CLIMB TO [level]"
  | "REQUEST DESCENT TO [level]"
  | "AT [position] REQUEST CLIMB TO [level]"
  | "AT [position] REQUEST DESCENT TO [level]"
  | "AT [time] REQUEST CLIMB TO [level]"
  | "AT [time] REQUEST DESCENT TO [level]"
  | "REQUEST VMC DESCENT";*/

export interface CPDLCRequestOption {
  label: string;
  template: VerticalRequestType;
  note?: string;
  dataLinkSystems: string[];
}

export interface RequestDisplay {
  Category: RequestCategory;
  //template: VerticalRequestType,
  //timeStamp: Date,
}
