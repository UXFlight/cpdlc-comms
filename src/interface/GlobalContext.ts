import { FlightDetails } from "@/interface/FlightDetails";

export interface GlobalContextType {
  connectionState: boolean | null;
  setConnectionState: React.Dispatch<React.SetStateAction<boolean | null>>;
  isConnectionPossible: boolean;
  setIsConnectionPossible: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  flightDetails: FlightDetails;
  setFlightDetails: React.Dispatch<React.SetStateAction<FlightDetails>>;
}
