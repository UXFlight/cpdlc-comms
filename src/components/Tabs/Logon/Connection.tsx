import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { socketService } from "../../../api/communications/socket/socketService";

export default function Connection() {
  const { connectionState, isConnectionPossible, username, flightDetails, setFlightDetails   } = useContext(UserContext);

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
        status: { ...data.status },
      };
      setFlightDetails(newDetails);
    };

    socketService.listen("flight_details", handleFlightDetails);
    return () => {
      socketService.off("flight_details", handleFlightDetails);
    };
  }, []);

  return (
    <div className={`${(connectionState && isConnectionPossible) ? "container" : "" } flex items-center justify-between`}>
      <div className="w-full">
        {connectionState === null ? (
          <div className="flex flex-col items-center justify-center py-6 text-white/70 gap-2 animate-pulse">
            <div className="w-6 h-6 border-4 border-white/20 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white/40 rounded-full animate-ping" />
            </div>
            <p className="text-sm font-medium tracking-wide uppercase">
              En attente de connexion
            </p>
            <p className="text-xs text-white/40">
              Initialisation du datalink...
            </p>
          </div>
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
          <div className="flex flex-col items-center justify-center py-8 text-yellow-200 bg-[#2b2b2b]/50 rounded-lg gap-2 border border-yellow-300/20">
            <p className="text-sm font-bold tracking-wide uppercase">
              Connexion non établie
            </p>
            <p className="text-xs text-yellow-100">
              ATC {username} n’est disponible pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
