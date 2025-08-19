import { ReportContext } from "@/context/ContractContext";
import { useContext } from "react";

export default function OptionBar() {
  const { emergencyData, setEmergencyData } = useContext(ReportContext);

  const handleRequest = (requestType: string) => {
    if (requestType === "set") {
      console.log("Emergency data submitted:");
      console.log(emergencyData);
    }

    if (requestType === "clear") {
      console.log("Clear clicked");
    }
  };

  return (
    <div className="flex justify-center items-center gap-[33px] w-full overflow-x-hidden px-[15.5px]">
      <div
        className="emergency-options bg-white-10"
        onClick={() => handleRequest("clear")}
      >
        clear
      </div>
      <div
        className="emergency-options bg-white-10"
        onClick={() => handleRequest("set")}
      >
        set
      </div>
    </div>
  );
}
