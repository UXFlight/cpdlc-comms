import React, { useContext, useState } from "react";
import flightDetails from "../../../data/flightDetails.json";
import { UserContext } from "../../../context/UserContext";

export default function Connection() {
  const { connectionState } = useContext(UserContext);
  
  if (connectionState === null) {
    return null;
  }

  return (
    <div className="container flex items-center justify-between">
      <div className="w-full">
        {connectionState ? (
          <div className="space-y-4">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <div className="text-center flex-1">
                <div className="logon-titles">Current Data Authority</div>
                <div className="logon-flight-details">
                  {flightDetails.dataAuthority.current}
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
              {Object.entries(flightDetails.status).map(([label, value]) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-white-80">
                    {label.replaceAll("_", " ")}
                  </span>
                  <span className="px-2 py-[2px] bg-[#2c3832] text-green font-mono text-xs rounded">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-red-500 font-semibold">
            Échec de la connexion
          </div>
        )}
      </div>
    </div>
  );
}
