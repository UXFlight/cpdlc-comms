import FmsHeader from "@/components/Fms/FmsHeader";
import FmsTableHeader from "@/components/Fms/FmsTableHeader";
import FmsRow from "@/components/Fms/FmsRow";
import {FmsTableProps} from "@/interface/props/Fms";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { socketService } from "@/api/communications/socket/socketService";
import { RouteFix } from "@/interface/FlightDetails";


export default function FmsTable({ route }: FmsTableProps) {
  const noRoute = route.length === 0;
  const { setFlightDetails } = useContext(UserContext);

  useEffect(() => {
    const handleRequest = (route: RouteFix[]) => {
      setFlightDetails((prevDetails) => ({
        ...prevDetails,
        route: route || [],
      }));
    }
    socketService.listen("route_loaded", handleRequest);

    return () => {
      socketService.off("route_loaded", handleRequest);
    };
  }, []);

  return (
    <div className="bg-black text-white font-mono w-full h-full flex flex-col p-4">
      <FmsHeader />
      <FmsTableHeader />

      <div className="flex-1 overflow-y-auto mt-1 text-sm text-white/90">
        {noRoute ? (
          <div className="text-center text-white/50 mt-10 text-base italic">
            No flight plan available. Please Logon...
          </div>
        ) : (
          route.map((fix: RouteFix, i:number) => (
            <FmsRow key={`${fix.fix}-${i}`} fix={fix} delay={i * 0.07} />
          ))
        )}
      </div>
    </div>
  );
}
