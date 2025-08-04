"use client";
import { use, useContext, useEffect, useState } from "react";
import { FlightContext } from "@/context/FlightContext";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { FlightStatus } from "@/interface/FlightDetails";

export default function RouteProgressBar() {
  const { flightDetails } = useContext(FlightContext);
  const departure = flightDetails.flightInfo?.departureAirport || "DEP";
  const arrival = flightDetails.flightInfo?.arrivalAirport || "ARR";
  const waypoints = [departure, ...(flightDetails.route || []), arrival];
  const [distances, setDistances] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [currentFixIndex, setCurrentFixIndex] = useState(0);
  const [dynamicPlaneLeft, setDynamicPlaneLeft] = useState("0%");

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log("Waypoints:", distances);
  }, [distances]);

  useSocketListeners([
    {
      event: "routine_load",
      callback: (data) => {
        setTotalDistance(data.total_distance);
        setDistances(data.distances);
        setProgress(0);
      },
    },
    {
      event: "plane_partial_progress",
      callback: (data: FlightStatus) => {
        flightDetails.status = data;
        const distanceCovered = data.fix_distance;
        const segmentDist = distances[currentFixIndex] || 0;
        const computedProgress = distanceCovered / segmentDist;
        console.log("Partial progress data:", computedProgress);
        setProgress(computedProgress);
      },
    },
    {
      event: "waypoint_change",
      callback: (data: { flight: FlightStatus; currentFixIndex: number }) => {
        flightDetails.status = data.flight;
        console.log("Waypoint change data:", data);
        setCurrentFixIndex(data.currentFixIndex);
        const dist = distances[currentFixIndex + 1] ?? 0;
        const ratio = dist / totalDistance;
        setProgress(ratio);
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

  //const dynamicPlaneLeft = `${progress * 100}%`;

  return (
    <div className="fixed top-0 left-0 w-full z-50 mt-1">
      <div className="flex items-center justify-between max-w-[1000px] mx-auto relative px-4 bg-white/30 rounded-b-md shadow-md">
        <div className="flex flex-1 justify-between items-center px- relative z-10">
          {waypoints.map((wp, i) => {
            const dist = distances[i + 1] ?? 0;
            const ratio = dist / totalDistance;
            const computedWidth = ratio * 100;

            return (
              <div
                key={i}
                className="relative flex flex-col items-start"
                style={{ flexBasis: `${computedWidth}%` }}
              >
                {/* Avion seulement dans le segment actif */}
                {i === currentFixIndex && (
                  <div
                    className="relative transition-all duration-300"
                    style={{
                      left: `${progress * 100}%`,
                      transform: "translateX(-50%)",
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

                {/* Point */}
                <div
                  className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    i <= currentFixIndex
                      ? "bg-blue-500 border-blue-700"
                      : "bg-white border-gray-400"
                  }`}
                />

                {/* Label */}
                <span className="text-xs text-black mt-1 font-bold whitespace-nowrap">
                  {typeof wp === "object" && wp !== null && "fix" in wp
                    ? (wp as any).fix
                    : wp}
                </span>

                {/* Ligne pointillée (sauf dernier) */}
                {i < waypoints.length - 1 && (
                  <div
                    className="absolute top-8/24 translate-y-[-1px] left-0 h-[2px] border-t border-dashed border-black z-0"
                    style={{
                      width: "100%",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
