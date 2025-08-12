import { PositionReportPayload } from "@/context/ContractContext";

export const DEFAULT_POSITION_REPORT: PositionReportPayload = {
  altitude_ft: 0,
  distance_km: 0,

  positioncurrent: "",
  fixnext: null,
  fixnextplusone: null,

  remainingfuel_kg: null,
  temperature_c: null,

  winds: { winddirection_deg: 0, speed_kmh: 0 },

  turbulence: "NONE",
  icing: null,

  speed_kmh: null,
  speedground_kmh: null,

  verticalchange: null,
  trackangle_deg: null,
  trueheading_deg: null,

  timeatpositioncurrent_sec: 0,
  timeatafixnext_sec: null,
  timeatedestination_sec: null,

  supplementaryinformation: null,

  reportedwaypointposition: null,
  reportedwaypointtime_sec: null,
  reportedwaypointaltitude_ft: null,
};
