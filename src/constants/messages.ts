export const UplinkMessages = {
  UM120: {
    ref: "UM 120",
    element: "MONITOR CYOB 123.8MHz",
    intent:
      "Instruction that the ATS unit is to be monitored on the specified frequency.",
  },
  UM117: {
    ref: "UM 117",
    element: "CONTACT [unit name] [frequency]",
    intent:
      "Instruction that the ATS unit is to be contacted on the specified frequency.",
  },
  UM169: {
    ref: "UM 169",
    element: "[free text]",
    intent: "Free text message (e.g., coordination or fallback communication).",
  },
  UM160: {
    ref: "UM 160",
    element: "NEXT DATA AUTHORITY [facility designation]",
    intent: "Notification of the next data authority.",
  },
  UM137: {
    ref: "UM 137",
    element: "CONFIRM ASSIGNED ROUTE",
    intent: "Instruction to confirm the currently assigned route.",
  },
  UM20: {
    ref: "UM 20",
    element: "CLIMB TO [level] or CLIMB TO AND MAINTAIN [altitude]",
    intent: "Instruction to initiate climb and maintain specified altitude.",
  },
  UM123: {
    ref: "UM 123",
    element: "SQUAWK [code]",
    intent: "Instruction to set a specific transponder code.",
  },
  UM74: {
    ref: "UM 74",
    element: "PROCEED DIRECT TO [position]",
    intent: "Instruction to proceed directly to specified waypoint.",
  },
  UM148: {
    ref: "UM 148",
    element: "WHEN CAN YOU ACCEPT [level]",
    intent:
      "Negotiation request for earliest acceptable time/position for a level.",
  },
  UM3: {
    ref: "UM 3",
    element: "ROGER",
    intent: "Indicates that ATC has received and understood the message.",
  },
};

export const DownlinkMessages = {
  DM0: {
    ref: "DM 0",
    element: "WILCO",
    intent: "The instruction is understood and will be complied with.",
  },
  DM3: {
    ref: "DM 3",
    element: "ROGER",
    intent: "Message received and understood.",
  },
  DM40: {
    ref: "DM 40",
    element: "ASSIGNED ROUTE [route clearance]",
    intent: "Read-back of the assigned route.",
  },
  DM9: {
    ref: "DM 9",
    element: "REQUEST CLIMB TO [level]",
    intent: "Request to climb to the specified level.",
  },
  DM67: {
    ref: "DM 67",
    element: "[free text]",
    intent: "Free text, often used to complete or clarify another message.",
  },
  DM63: {
    ref: "DM 63",
    element: "NOT CURRENT DATA AUTHORITY",
    intent: "System denial from non-authoritative ATC unit.",
  },
  DM48: {
    ref: "DM 48",
    element: "POSITION REPORT [position report]",
    intent: "Current position report of the aircraft.",
  },
  DM6: {
    ref: "DM 6",
    element: "REQUEST [level]",
    intent: "Request to fly at the specified level.",
  },
  DM34: {
    ref: "DM 34",
    element: "PRESENT SPEED [speed]",
    intent: "Notification of the present speed.",
  },
  DM22: {
    ref: "DM 22",
    element: "REQUEST DIRECT TO [position]",
    intent: "Request to proceed direct to a specified waypoint.",
  },
};
