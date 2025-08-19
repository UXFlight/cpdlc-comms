import FmsHeader from "@/components/Fms/FmsHeader";
import FmsTableHeader from "@/components/Fms/FmsTableHeader";
import FmsRow from "@/components/Fms/FmsRow";
import { FmsTableProps } from "@/interface/props/Fms";
import { useContext, useEffect, useState } from "react";
import { RouteFix } from "@/interface/FlightDetails";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { FlightContext } from "@/context/FlightContext";
import { socketService } from "@/api/communications/socket/socketService";
import { LoadContext } from "@/context/LoadContext";
import { ProgressStep } from "@/interface/context/LoadContext";

export default function FmsTable({ route }: FmsTableProps) {
  const noRoute = route.length === 0;
  const { flightDetails, setFlightDetails } = useContext(FlightContext);
  const { setProgressStep } = useContext(LoadContext);
  const [currentFixIndex, setCurrentFixIndex] = useState(0);

  useEffect(() => {
    setCurrentFixIndex(flightDetails.currentFixIndex);
  }, [flightDetails.currentFixIndex]);

  useSocketListeners([
    {
      event: "new_route",
      callback: (route: RouteFix[]) => {
        setFlightDetails((prevDetails) => ({
          ...prevDetails,
          tempRoute: route || null,
        }));
        setProgressStep(ProgressStep.LOAD);
      },
    },
    {
      event: "route_loaded",
      callback: (route: RouteFix[]) => {
        setFlightDetails((prevDetails) => ({
          ...prevDetails,
          route: route || [],
          tempRoute: null,
        }));
        setProgressStep(ProgressStep.EXECUTE);
      },
    },
  ]);

  const handleExecuteRoute = () => {
    socketService.send("execute_route", { new_route: flightDetails.tempRoute });
  };

  const handleRejectRoute = () => {
    socketService.send("cancel_execute_route");
    setFlightDetails((prev) => ({
      ...prev,
      tempRoute: null,
    }));
    setProgressStep(ProgressStep.REJECTED);
  };

  return (
    <div className="bg-black bg-opacity-50 text-white font-mono w-full h-full flex flex-col p-4">
      <FmsHeader />
      <FmsTableHeader />

      <div className="flex-1 overflow-y-auto mt-1 text-sm text-white/90">
        {noRoute ? (
          <div className="text-center text-white/50 mt-10 text-base italic">
            No flight plan available. Please Logon...
          </div>
        ) : (
          route.map((fix: RouteFix, i: number) => {
            if (i <= currentFixIndex) return null;
            return (
              <FmsRow key={`${fix.fix}-${i}`} fix={fix} delay={i * 0.07} />
            );
          })
        )}
      </div>
      {flightDetails.tempRoute && (
        <div className="mt-4 p-4 border border-white/20 bg-white/5 rounded-lg text-sm text-white flex flex-col gap-2 shadow-md">
          <div className="font-semibold text-white">
            A new route has been received. Do you want to execute it?
          </div>
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleExecuteRoute}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md transition"
            >
              Execute
            </button>
            <button
              onClick={handleRejectRoute}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
