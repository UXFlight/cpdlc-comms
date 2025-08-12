"use client";
import { useContext, useEffect, useState } from "react";
import { FlightContext } from "@/context/FlightContext";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { FlightStatus } from "@/interface/FlightDetails";
import ActionBar from "./ActionBar";
import { socketService } from "@/api/communications/socket/socketService";
import { GlobalContext } from "@/context/GlobalContext";
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function RouteProgressBar() {
  const { flightDetails, setFlightDetails } = useContext(FlightContext);
  const { connectionState } = useContext(GlobalContext);
  const waypoints = flightDetails.route || [];
  const [distances, setDistances] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [currentFixIndex, setCurrentFixIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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
        setFlightDetails((prev) => ({
          ...prev,
          status: { ...data },
        }));
        const distanceCovered = data.fix_distance;
        const segmentDist = distances[currentFixIndex] || 0;
        const computedProgress = distanceCovered / segmentDist;
        setProgress(computedProgress);
      },
    },
    {
      event: "waypoint_change",
      callback: (data: { flight: FlightStatus; currentFixIndex: number }) => {
        setFlightDetails((prev) => ({
          ...prev,
          status: { ...data.flight },
        }));
        console.log(
          "Waypoint change data:",
          data,
          "+",
          distances[data.currentFixIndex],
        );
        setCurrentFixIndex(data.currentFixIndex);
        const dist = distances[currentFixIndex] ?? 0;
        const ratio = dist / totalDistance;
        setProgress(ratio);
      },
    },
    {
      event: "plane_arrival",
      callback: (data: FlightStatus) => {
        setFlightDetails((prev) => ({
          ...prev,
          status: { ...data },
        }));
        setCurrentFixIndex(distances.length - 1);
        const dist = distances[currentFixIndex] ?? 0;
        const ratio = dist / totalDistance;
        setProgress(ratio);
      },
    },
  ]);

  useEffect(() => {
    if (connectionState === true) {
      setIsPlaying(true);
    }
  }, [connectionState]);

  const handlePlay = () => {
    setIsPlaying(true);
    socketService.send("routine_play", {
      flight_id: flightDetails.flightInfo.flightId,
    });
  };

  const handlePause = () => {
    setIsPlaying(false);
    socketService.send("routine_pause", {
      flight_id: flightDetails.flightInfo.flightId,
    });
  };

  const handleStepBack = () => {
    socketService.send("routine_step_back", {
      flight_id: flightDetails.flightInfo.flightId,
    });
  };

  const handleStepForward = () => {
    socketService.send("routine_step_forward", {
      flight_id: flightDetails.flightInfo.flightId,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 mt-1">
      <ActionBar
        onPlay={handlePlay}
        onPause={handlePause}
        onStepBack={handleStepBack}
        onStepForward={handleStepForward}
        isPlaying={isPlaying}
      />
      <div className="flex items-center justify-between max-w-[1000px] mx-auto relative px-4 py-3 bg-white/30 rounded-b-md shadow-md">
        <div className="flex flex-1 justify-between items-center px- relative z-10">
          {waypoints.map((wp, i) => {
            const dist = distances[i] ?? 0;
            const ratio = dist / totalDistance;
            const computedWidth = ratio * 100;

            return (
              <div
                key={i}
                className="relative flex flex-col items-start"
                style={{ flexBasis: `${computedWidth}%` }}
              >
                {i === currentFixIndex && (
                  <div
                    className="absolute -top-3 min-h-[50px] min-w-[50px] transition-all duration-300 z-10"
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
                      className="z-100"
                    />
                  </div>
                )}

                <div
                  className={` w-4 h-4 rounded-full border-2 transition-all duration-300 z-1 ${
                    i <= currentFixIndex
                      ? "bg-blue-500 border-blue-700"
                      : "bg-white border-gray-400"
                  }`}
                />

                <span className="text-xs text-black mt-1 font-bold whitespace-nowrap pr-[4px]">
                  {typeof wp === "object" && wp !== null && "fix" in wp
                    ? (wp as any).fix
                    : wp}
                </span>

                {i < waypoints.length - 1 &&
                  ((
                    <div
                      className="absolute top-6/24 translate-y-[-1px] left-0 h-[2px] border-t border-dashed border-black"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) as any)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
