"use client";
import { useContext, useEffect, useState } from "react";
import { FlightContext } from "@/context/FlightContext";
import { GlobalContext } from "@/context/GlobalContext";
import { Play, Pause, ChevronsLeft, ChevronsRight } from "lucide-react";
import SelectDropdown from "@/components/General/SelectDropdown";
import { socketService } from "@/api/communications/socket/socketService";
import { useSocketListeners } from "@/hooks/useSocketListeners";

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

  useSocketListeners([
    {
      event: "flight_paused",
      callback: () => {
        onPause();
      },
    },
    {
      event: "flight_playing",
      callback: () => {
        onPlay();
      },
    },
  ]);

  const isDisabled = !connectionState || altitude === 0;
  const disconnectedTitle = "Must be connected";

  const buttonBase =
    "p-2 rounded-full border transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed";
  const iconBase = "w-6 h-6";

  return (
    <div className="fixed top-22 left-1/2 transform -translate-x-1/2 bg-black text-white backdrop-blur-md rounded-b-xl rounded-t-none shadow-lg px-3 py-4 z-50 flex flex-col items-center space-y-3">
      <div className="flex items-center space-x-4">
        <button
          disabled={isDisabled}
          onClick={onStepBack}
          className={`${buttonBase} bg-sky-500/20 border-sky-300/40 ${
            isDisabled ? "" : "hover:bg-sky-400/30"
          }`}
          title={!connectionState ? disconnectedTitle : "Step Back"}
        >
          <ChevronsLeft className={`${iconBase} text-sky-100`} />
        </button>

        {isPlaying ? (
          <button
            disabled={isDisabled}
            onClick={onPause}
            className={`${buttonBase} bg-rose-500/25 border-rose-300/40 ${
              isDisabled ? "" : "hover:bg-rose-500/35"
            }`}
            title={!connectionState ? disconnectedTitle : "Pause"}
          >
            <Pause className={`${iconBase} text-rose-100`} />
          </button>
        ) : (
          <button
            disabled={isDisabled}
            onClick={onPlay}
            className={`${buttonBase} bg-emerald-500/25 border-emerald-300/40 ${
              isDisabled ? "" : "hover:bg-emerald-500/35"
            }`}
            title={!connectionState ? disconnectedTitle : "Play"}
          >
            <Play className={`${iconBase} text-emerald-100`} />
          </button>
        )}

        <button
          disabled={isDisabled}
          onClick={onStepForward}
          className={`${buttonBase} bg-sky-500/20 border-sky-300/40 ${
            isDisabled ? "" : "hover:bg-sky-400/30"
          }`}
          title={!connectionState ? disconnectedTitle : "Step Forward"}
        >
          <ChevronsRight className={`${iconBase} text-sky-100`} />
        </button>
      </div>

      <div className="flex items-center space-x-3 w-52 [&_button]:font-semibold [&_button]:!text-white [&_li_span]:font-semibold [&_ul]:!bg-zinc-900 [&_ul]:!border-white/30">
        <span className="text-end text-sm font-semibold tracking-wide text-white/90">
          Speed:
        </span>
        <SelectDropdown
          options={speedOptions}
          value={selectedSpeed}
          onChange={(value) => {
            setSelectedSpeed(value);
            socketService.send("routine_set_speed", { speed: value });
          }}
          defaultValue="MEDIUM"
          style="!text-white font-semibold tracking-wide !bg-zinc-900/90 !border-white/30 !px-3 !py-2"
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}
