import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

export default function FmsHeader() {
  const { flightDetails } = useContext(GlobalContext);
  return (
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-xl font-semibold">FMS</h2>
      {flightDetails.flightInfo.flightId && (
        <button className="text-xs px-2 py-1 border border-white text-white hover:bg-white hover:text-black">
          {flightDetails.flightInfo.flightId}
        </button>
      )}
    </div>
  );
}
