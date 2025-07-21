export interface FlightStatus {
  altitude: number | null;
  position: {
    lat: number | null;
    lon: number | null;
  };
  remaining_fuel: number | null;
  current_distance: number;
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
  heading: string;
  distance: string;
  altitude: string;
  mach: string;
  duration: string;
  fuel: string;
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
