import React, { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { startingSetUp } from "@/utils/startingSetUp";
import { FlightContext } from "@/context/FlightContext";

export default function AtcConnection() {
  const { isConnectionPossible, setIsConnectionPossible } =
    useContext(GlobalContext);
  const { setFlightDetails } = useContext(FlightContext);

  useSocketListeners([
    { event: "connect", callback: () => setIsConnectionPossible(true) },
    {
      event: "connected",
      callback: (flightData) => setFlightDetails(startingSetUp(flightData)),
    },
    { event: "disconnect", callback: () => setIsConnectionPossible(false) },
  ]);

  return (
    <div className="container flex flex-col items-start">
      <h2>Connection</h2>
      <div className="flex items-center justify-between w-full">
        <p className="secondary-text pt-[10px]">ATC Data Link</p>
        <label className="relative inline-block w-[110px] h-[31px] cursor-pointer">
          <input
            readOnly
            type="checkbox"
            className="sr-only peer"
            checked={isConnectionPossible}
          />
          <div className="absolute inset-0 bg-gray-300 peer-checked:bg-green rounded-md transition-colors duration-300"></div>
          <div
            className="absolute left-1 top-1 w-[65px] h-[24px] bg-light-gray text-white-80 text-[10px] font-semibold flex items-center justify-center rounded-md
      transition-all duration-300 peer-checked:translate-x-[37px]"
          >
            {isConnectionPossible ? "AVAILABLE" : "NONE"}
          </div>
        </label>
      </div>

      <div className="loader"></div>
    </div>
  );
}
