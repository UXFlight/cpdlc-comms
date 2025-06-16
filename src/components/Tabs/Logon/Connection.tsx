import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { socketService } from "../../../api/communications/socket/socketService";
import { FlightDetails } from "../../../interfaces/FlightDetails";
import { defaultFlightDetails } from "../../../constants/flightDetails";

export default function Connection() {
  const { connectionState, isConnectionPossible, username } = useContext(UserContext);
  const [flightDetails, setFlightDetails] = useState<FlightDetails>(defaultFlightDetails);

  useEffect(() => {
  const handleFlightDetails = (data) => {
    const newDetails = {
      dataAuthority: {
        current: data.CDA,
        next: data.NDA,
      },
      flightInfo: {
        flightId: data.flight_id,
        departureAirport: data.departure,
        arrivalAirport: data.arrival,
      },
      status: {...data.status},
    };

    setFlightDetails(newDetails);
  }
  socketService.listen("flight_details", handleFlightDetails);

  return () => {
    socketService.off("flight_details", handleFlightDetails);  
  }
  }, []);

  return (
    <div className="container flex items-center justify-between">
      <div className="w-full">
        {connectionState === null ? (
          <div className="text-white/50">En attente de connexion...</div>
        ) : connectionState && isConnectionPossible ? (
          <div className="space-y-4">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <div className="text-center flex-1">
                <div className="logon-titles">Current Data Authority</div>
                <div className="logon-flight-details">
                  {username}
                </div>
              </div>
              <div className="text-center flex-1">
                <div className="logon-titles">Next Data Authority</div>
                <div className="logon-flight-details">
                  {flightDetails.dataAuthority.next}
                </div>
              </div>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-2">
              <div className="text-center flex-1">
                <div className="logon-titles">Flight ID</div>
                <div className="logon-flight-details">
                  {flightDetails.flightInfo.flightId}
                </div>
              </div>
              <div className="text-center flex-1">
                <div className="logon-titles">Departure Airport</div>
                <div className="logon-flight-details">
                  {flightDetails.flightInfo.departureAirport}
                </div>
              </div>
              <div className="text-center flex-1">
                <div className="logon-titles">Arrival Airport</div>
                <div className="logon-flight-details">
                  {flightDetails.flightInfo.arrivalAirport}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {flightDetails.status?.connections &&
                Object.entries(flightDetails.status.connections).map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-white-80">
                      {label.replaceAll("_", " ")}
                    </span>
                    <span className="px-2 py-[2px] bg-[#2c3832] text-green font-mono text-xs rounded">
                      {String(value)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-red font-semibold">
            Échec de la connexion
          </div>
        )}
      </div>
    </div>
  );
}
