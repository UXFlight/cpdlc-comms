"use client";
import { useContext, useEffect, useState } from "react";
import { FlightContext } from "@/context/FlightContext";
import { GlobalContext } from "@/context/GlobalContext";
import { Play, Pause, ChevronsLeft, ChevronsRight } from "lucide-react";
import SelectDropdown from "@/components/General/SelectDropdown";
import { socketService } from "@/api/communications/socket/socketService";

export default function ActionBar({
  onPlay,
  onPause,
  onStepBack,
  onStepForward,
  isPlaying,
}: {
  onPlay: () => void;
  onPause: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  isPlaying: boolean;
}) {
  const { flightDetails } = useContext(FlightContext);
  const { connectionState } = useContext(GlobalContext);
  const [altitude, setAltitude] = useState(flightDetails.status.altitude);

  const speedOptions = ["SLOW", "MEDIUM", "FAST", "EXTREME"];
  const [selectedSpeed, setSelectedSpeed] = useState("MEDIUM");

useEffect(() => {
    setAltitude(flightDetails.status.altitude);
}, [flightDetails.status]);

const isDisabled = !connectionState || altitude === 0;

  const buttonBase =
    "p-2 rounded-full transition disabled:opacity-40";
  const iconBase = "w-6 h-6";

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white/30 backdrop-blur-md border rounded-xl shadow-lg px-6 py-4 z-50 flex flex-col items-center space-y-3">
      <div className="flex items-center space-x-4">
        <button
          disabled={isDisabled}
          onClick={onStepBack}
          className={`${buttonBase} ${isDisabled ? "" : "hover:bg-gray-200"}`}
          title="Step Back"
        >
          <ChevronsLeft className={`${iconBase} text-blue-700`} />
        </button>

        {isPlaying ? (
          <button
            disabled={isDisabled}
            onClick={onPause}
            className={`${buttonBase} bg-red-100 ${isDisabled ? "" : "hover:bg-red-200"}`}
            title="Pause"
          >
            <Pause className={`${iconBase} text-red-600`} />
          </button>
        ) : (
          <button
            disabled={isDisabled}
            onClick={onPlay}
            className={`${buttonBase} bg-green-100 ${isDisabled ? "" : "hover:bg-green-200"}`}
            title="Play"
          >
            <Play className={`${iconBase} text-green-600`} />
          </button>
        )}

        <button
          disabled={isDisabled}
          onClick={onStepForward}
          className={`${buttonBase} ${isDisabled ? "" : "hover:bg-gray-200"}`}
          title="Step Forward"
        >
          <ChevronsRight className={`${iconBase} text-blue-700`} />
        </button>
      </div>

      <div className="flex items-center space-x-2 w-50">
        <span className="text-end text-sm font-medium text-black">Simulation speed:</span>
        <SelectDropdown
          options={speedOptions}
          value={selectedSpeed}
          onChange={(value) => {
            setSelectedSpeed(value);
            socketService.send("routine_set_speed", { speed: value });
          }}
          defaultValue="MEDIUM"
          style="text-black"
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}
