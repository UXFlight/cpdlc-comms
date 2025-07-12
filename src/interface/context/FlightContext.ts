import { FlightDetails } from "@/interface/FlightDetails";

export interface FlightContextType {
  flightDetails: FlightDetails;
  setFlightDetails: React.Dispatch<React.SetStateAction<FlightDetails>>;
}
