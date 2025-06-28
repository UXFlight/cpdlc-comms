import { FlightDetails } from "@/interface/FlightDetails.js";

export const DEFAULT_FLIGHT_DETAILS: FlightDetails = {
  dataAuthority: { current: "", next: "" },
  flightInfo: { flightId: "", departureAirport: "", arrivalAirport: "" },
  status: {
    altitude: null,
    position: { lat: null, lon: null },
    remaining_fuel: null,
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
      ATN_AVAILABILITY: ""
    }
  },
  route: [
    {
      fix: "",
      heading: "",
      distance: "",
      altitude: "",
      mach: "",
      duration: "",
      fuel: "",
    }
  ]
};