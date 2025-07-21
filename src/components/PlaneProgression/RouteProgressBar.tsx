"use client";
import { useContext, useEffect, useState } from "react";
import { FlightContext } from "@/context/FlightContext";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { FlightStatus } from "@/interface/FlightDetails";

export default function RouteProgressBar() {
  const { flightDetails } = useContext(FlightContext);
  const waypoints = flightDetails.route || [];
  const departure = flightDetails.flightInfo?.departureAirport || "DEP";
  const arrival = flightDetails.flightInfo?.arrivalAirport || "ARR";
  const [distances, setDistances] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);

  const [progress, setProgress] = useState(0);
  const totalDuration = 300; // durée totale simulée

 useSocketListeners([
  {
    event: "routine_load",
    callback: (data) => {
      setTotalDistance(data.total_distance);
      setDistances(data.distances);
    },
  },
  {
    event: "plane_partial_progress",
    callback: (data: FlightStatus) => {
      flightDetails.status = data;
      const distanceCovered = data.current_distance;
      const computedProgress = Math.min(distanceCovered / totalDistance, 1);
      setProgress(computedProgress);
    },
  },
  {
    event: "waypoint_change",
    callback: (data: { flight: FlightStatus; waypoint: string }) => {
      flightDetails.status = data.flight;

      const index = waypoints.findIndex((w) => w.fix === data.waypoint);
      if (index !== -1) {
        const coveredDistance = distances
          .slice(0, index + 1)
          .reduce((acc, d) => acc + d, 0);
        const computedProgress = Math.min(coveredDistance / totalDistance, 1);
        setProgress(computedProgress);
      }
    },
  },
  {
    event: "plane_arrival",
    callback: (data: FlightStatus) => {
      flightDetails.status = data;
      const distanceCovered = data.current_distance;
      const computedProgress = Math.min(distanceCovered / totalDistance, 1);
      setProgress(computedProgress);
    },
  },
]);


  const totalWaypoints = waypoints.length;
  //const currentFixIndex = Math.floor(progress * (totalWaypoints - 1));

  // Calcul dynamique pour garder l’avion visible jusqu’à la fin
  const dynamicPlaneLeft = `${progress * 100}%`;
  const finalPlaneLeft = `${(totalWaypoints / (totalWaypoints + 1)) * 100}%`;

  const currentFixIndex = (() => {
  let sum = 0;
  for (let i = 0; i < distances.length; i++) {
    sum += distances[i];
    if (sum >= totalDistance * progress) {
      return i;
    }
  }
  return distances.length - 1;
})();


  return (
    <div className="fixed top-0 left-0 w-full z-50 mt-1">
      <div className="flex items-center justify-between max-w-[1000px] mx-auto relative px-4 pt-4 pb-2 bg-white/30 rounded-b-md shadow-md">
        <div className="absolute top-11/24 translate-y-[-1px] left-[60px] right-[60px] h-[2px] border-t border-dashed border-black z-0" />

        <div className="flex flex-1 justify-between items-center px-4 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-black border-2 border-green-900" />
            <span className="text-xs text-black mt-1 font-bold">
              {departure}
            </span>
          </div>

          {waypoints.map((wp, i) => {
            const dist = distances[i] ?? 0;
            const ratio = dist / totalDistance;
            const minPercent = 5;
            const computedWidth = Math.max(ratio * 100, minPercent);

            return (
              <div
                key={i}
                className="flex flex-col items-center"
                style={{ flexBasis: `${computedWidth}%`, minWidth: "60px" }}
              >
                <div
  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
    i <= currentFixIndex
      ? "bg-blue-500 border-blue-700"
      : "bg-white border-gray-400"
  }`}
/>

                <span className="text-xs text-black mt-1 font-bold whitespace-nowrap">
                  {wp.fix}
                </span>
              </div>
            );
            
          })}

          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-black border-2 border-red-900" />
            <span className="text-xs text-black mt-1 font-bold">{arrival}</span>
          </div>

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
