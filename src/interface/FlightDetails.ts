export interface FlightStatus {
  altitude: number | null;
  position: {
    lat: number | null;
    lon: number | null;
  };
  remaining_fuel: number | null;
  current_distance: number;
  fix_distance: number;
  total_time: number | null;
  temperature: number | null;
  wind: {
    direction: number | null;
    speed: number | null;
  } | null;
  turbulence: string | null;
  speed: number | null;
  icing: string | null;
  updated_at: string;
  connections: {
    CPDLC: string;
    COMMUNICATION: string;
    AFN_CONNECTING: string;
    ATN_AVAILABILITY: string;
  };
}

export interface FlightInfo {
  flightId: string;
  departureAirport: string;
  arrivalAirport: string;
}

export interface RouteFix {
  fix: string;
  altitude_ft: number;
  distance_km: number;
  duration_sec: number;
  elapsed_time_sec: number;
  fuel_kg: number;
  heading_deg: number;
  icing: "NONE" | "LIGHT" | "MODERATE" | "SEVERE" | "TRACE";
  speed_kmh: number;
  speed_samples_kmh: number[];
  temperature: number;
  total_distance: number;
  turbulence: "NONE" | "LIGHT" | "MODERATE" | "SEVERE";
  wind: {
    direction: number;
    speed: number;
  };
}

export interface FlightDetails {
  dataAuthority: {
    current: string;
    next: string;
  };
  flightInfo: FlightInfo;
  status: FlightStatus;
  tempRoute?: RouteFix[] | null;
  route: RouteFix[];
}
