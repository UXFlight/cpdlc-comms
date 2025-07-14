"use client";
import { useContext, useState } from "react";
import { FlightContext } from "@/context/FlightContext";
import { BsAirplaneEngines } from "react-icons/bs";

export default function FlightStatusPanel() {
  const { flightDetails } = useContext(FlightContext);
  const [isOpen, setIsOpen] = useState(false);
  const status = flightDetails.status;

  return (
    <>
      {/* Wrapper: icône + panel */}
      <div className="fixed bottom-6 left-4 z-50 flex flex-col items-start gap-2">
        {/* Panel visible si ouvert */}
        {isOpen && (
          <div className="bg-medium-gray border border-white/10 rounded-lg shadow-xl p-4 w-[250px] animate-fade-in-up">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-white/70 text-sm font-semibold uppercase">
                Flight Status
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 text-white text-sm bg-white/10 rounded-full hover:bg-white/20 transition"
                title="Close"
              >
                ×
              </button>
            </div>
            <div className="text-white text-xs space-y-1">
              <p>Altitude: {status.altitude ?? "N/A"} ft</p>
              <p>Speed: {status.speed ?? "N/A"} kt</p>
              <p>Fuel: {status.remaining_fuel ?? "N/A"} kg</p>
              <p>Temp: {status.temperature ?? "N/A"} °C</p>
              <p>
                Wind:{" "}
                {typeof status.wind === "object"
                  ? `${status.wind?.direction ?? "?"}° @ ${status.wind?.speed ?? "?"} kt`
                  : (status.wind ?? "N/A")}
              </p>
              <p>Turbulence: {status.turbulence ?? "N/A"}</p>
              <p>Icing: {status.icing ?? "N/A"}</p>
              <p>Lat: {status.position.lat ?? "—"}</p>
              <p>Lon: {status.position.lon ?? "—"}</p>
            </div>
          </div>
        )}

        <button
          className="w-10 h-10 rounded-full bg-[#2b2b2b] text-white shadow-xl flex items-center justify-center hover:bg-[#3a3a3a] transition"
          onClick={() => setIsOpen(!isOpen)}
          title="Flight Status"
        >
          <BsAirplaneEngines className="text-xl text-white" />
        </button>
      </div>
    </>
  );
}
