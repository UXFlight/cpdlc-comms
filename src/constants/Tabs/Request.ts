export const ADDITIONAL_MESSAGES = {
  altitude_req: [
    "Due to weather",
    "Due to aircraft performance",
    "At pilot discretion",
    "Cruise climb",
    "Maintain separation / VMC",
  ],
  offset_req: [
    "Due to weather",
    "Due to aircraft performance",
    "At pilot discretion",
    "Due to traffic",
  ],
  speed_req: ["Due to weather", "Due to aircraft performance"],
  route_modification_req: ["Due to aircraft performance"],
  response_additional: ["Due to weather", "Due to aircraft performance"],
  voice_contact_req: ["At frequency"],
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

export const DIRECTIONS_OPTIONS = ["LEFT", "RIGHT", "AVOID"];
export const LEVEL_ALTITUDE_OPTIONS = ["LOWER", "HIGHER"];
export const CLIMB_DESCEND_OPTIONS = ["CLIMB", "DESCEND"];
