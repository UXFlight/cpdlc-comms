import { useEffect, useState } from "react";

const steps = ["Loaded", "Executed", "Responded", "Sent"];

export default function ProgressSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between w-full my-4">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center flex-1 relative">
          <div
            className={`w-5 h-5 rounded-full z-10 ${
              i <= currentStep ? "bg-green" : "bg-white/20"
            }`}
          />
          <span className="text-xs text-white mt-1">{step}</span>
          {i < steps.length - 1 && (
            <div className="absolute top-2 left-1/2 right-[-50%] h-[2px] bg-white/20 z-0" />
          )}
        </div>
      ))}
    </div>
  );
}
