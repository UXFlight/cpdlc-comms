import { useContext } from "react";
import { LoadContext } from "@/context/LoadContext";

export const STEPS = ["loaded", "executed", "responded", "sent"];

export default function ProgressSteps() {
  const { progressStep } = useContext(LoadContext);

  const currentStepIndex = progressStep
    ? STEPS.findIndex((s) => s.toLowerCase() === progressStep.toLowerCase())
    : -1;

  return (
    <div className="flex items-center justify-between w-full my-4">
      {STEPS.map((step, i) => (
        <div key={i} className="flex flex-col items-center flex-1 relative">
          <div
            className={`w-5 h-5 rounded-full z-10 ${
              i <= currentStepIndex ? "bg-green" : "bg-white/20"
            }`}
          />
          <span className="text-xs text-white mt-1 uppercase">{step}</span>

          {i < STEPS.length - 1 && (
            <div className="absolute top-2 left-1/2 right-[-50%] h-[2px] bg-white/20 z-0" />
          )}
        </div>
      ))}
    </div>
  );
}
