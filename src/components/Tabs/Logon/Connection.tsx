import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { LogsContext } from "@/context/LogsContext";
import { useSocketListeners } from "@/hooks/useSocketListeners";

export default function Connection() {
  const { connectionState, isConnectionPossible, username, flightDetails, setFlightDetails } = useContext(UserContext);
  const {setLogs} = useContext(LogsContext);

  useSocketListeners([
    {
      event: "flight_details",
      callback: (data) => {
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
          route: data.route || [],
        };
        setFlightDetails(newDetails);
      },
    },
    {
      event: "load_logs",
      callback: (data) => {
        setLogs(data);
      },
    },
  ]);


  return (
    <div className={`${(connectionState && isConnectionPossible) ? "container" : "" } flex items-center justify-between`}>
      <div className="w-full">
        {connectionState === null ? (
          <> 
          </>
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
