"use client";
import { useContext, useEffect, useState } from "react";
import { FlightContext } from "@/context/FlightContext";
import { useSocketListeners } from "@/hooks/useSocketListeners";

export default function RouteProgressBar() {
  const { flightDetails } = useContext(FlightContext);
  const waypoints = flightDetails.route || [];
  const departure = flightDetails.flightInfo?.departureAirport || "DEP";
  const arrival = flightDetails.flightInfo?.arrivalAirport || "ARR";

  const [progress, setProgress] = useState(0);
  const totalDuration = 300; // durée totale simulée

  useSocketListeners([
    {
        event: "plane_partial_progress",
        callback: (data: { progress: number }) => {
            setProgress(data.progress);
        },
    },
  ]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         const next = prev + 1 / totalDuration;
//         return next > 1 ? 1 : next;
//       });
//     }, 100);
//     return () => clearInterval(interval);
//   }, []);

  const totalWaypoints = waypoints.length;
  const currentFixIndex = Math.floor(progress * (totalWaypoints - 1));

  // Calcul dynamique pour garder l’avion visible jusqu’à la fin
  const dynamicPlaneLeft = `${progress * 100}%`;
  const finalPlaneLeft = `${(totalWaypoints / (totalWaypoints + 1)) * 100}%`;

  return (
    <div className="fixed top-0 left-0 w-full z-50 mt-1">
      <div className="flex items-center justify-between max-w-[1000px] mx-auto relative px-4 pt-4 pb-2 bg-white/30 rounded-b-md shadow-md">
        <div className="flex flex-1 justify-between items-center px-4 relative">
        {/* Point de départ */}
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-black border-2 border-green-900" />
          <span className="text-xs text-black mt-1 font-bold">{departure}</span>
        </div>

        {/* Waypoints */}
          {waypoints.map((wp, i) => (
            <div key={i} className="flex flex-col items-center flex-1 relative">
              <div
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 z-0 ${
                  i <= currentFixIndex ? "bg-blue-500 border-blue-700" : "bg-white border-gray-400"
                }`}
              />
              <span className="text-xs text-black mt-1 font-bold">{wp.fix}</span>

              {i < waypoints.length - 1 && (
                <div className="absolute top-2 left-1/2 ml-2 right-[-50%] h-[2px] border-t border-dashed border-black" />
              )}
            </div>
          ))}

        

        {/* Point d’arrivée */}
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-black border-2 border-red-900" />
          <span className="text-xs text-black mt-1 font-bold">{arrival}</span>
        </div>
          {/* Avion */}
          {waypoints.length > 1 && (
            <div
              className="absolute -top-6 transition-all duration-200"
              style={{
                left: progress < 1 ? dynamicPlaneLeft : finalPlaneLeft,
                transform: "translateX(-50%) translateX(70%)",
              }}
            >
              <img
                src="/airplane.png"
                alt="airplane"
                width={50}
                height={50}
                className="z-100 mt-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
