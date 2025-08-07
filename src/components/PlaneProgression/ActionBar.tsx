"use client";
import { useContext } from "react";
import { FlightContext } from "@/context/FlightContext";
import { Play, Pause, ChevronsLeft, ChevronsRight } from "lucide-react";

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

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white/30 backdrop-blur-md border rounded-xl shadow-lg px-6 py-3 z-50 flex items-center space-x-4">
      <button
        onClick={onStepBack}
        className="p-2 rounded-full hover:bg-gray-200 transition"
        title="Step Back"
      >
        <ChevronsLeft className="w-6 h-6 text-blue-700" />
      </button>

      {isPlaying ? (
        <button
          onClick={onPause}
          className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
          title="Pause"
        >
          <Pause className="w-6 h-6 text-red-600" />
        </button>
      ) : (
        <button
          onClick={onPlay}
          className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition"
          title="Play"
        >
          <Play className="w-6 h-6 text-green-600" />
        </button>
      )}

      <button
        onClick={onStepForward}
        className="p-2 rounded-full hover:bg-gray-200 transition"
        title="Step Forward"
      >
        <ChevronsRight className="w-6 h-6 text-blue-700" />
      </button>
    </div>
  );
}
