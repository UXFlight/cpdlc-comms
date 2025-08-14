import { FlightDetails } from "@/interface/FlightDetails.js";

export const DEFAULT_FLIGHT_DETAILS: FlightDetails = {
  dataAuthority: { current: "", next: "" },
  flightInfo: { flightId: "", departureAirport: "", arrivalAirport: "" },
  status: {
    altitude: null,
    position: { lat: null, lon: null },
    remaining_fuel: null,
    current_distance: 0,
    fix_distance: 0,
    temperature: null,
    wind: null,
    turbulence: null,
    speed: null,
    icing: null,
    updated_at: "",
    connections: {
      CPDLC: "",
      COMMUNICATION: "",
      AFN_CONNECTING: "",
      ATN_AVAILABILITY: "",
    },
    total_time: null,
  },
  route: [
    {
      fix: "",
      altitude_ft: 0,
      distance_km: 0,
      duration_sec: 0,
      elapsed_time_sec: 0,
      fuel_kg: 0,
      heading_deg: 0,
      icing: "NONE",
      speed_kmh: 0,
      speed_samples_kmh: [],
      temperature: 0,
      total_distance: 0,
      turbulence: "NONE",
      wind: {
        direction: 0,
        speed: 0,
      },
    },
  ],
  tempRoute: null,
  currentFixIndex: 0,
};
