import FmsHeader from "@/components/Fms/FmsHeader";
import FmsTableHeader from "@/components/Fms/FmsTableHeader";
import FmsRow from "@/components/Fms/FmsRow";
import {FmsTableProps} from "@/interface/props/Fms";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { RouteFix } from "@/interface/FlightDetails";
import { useSocketListeners } from "@/hooks/useSocketListeners";


export default function FmsTable({ route }: FmsTableProps) {
  const noRoute = route.length === 0;
  const { setFlightDetails } = useContext(UserContext);

  useSocketListeners([
    {
      event: "route_loaded",
      callback: (route: RouteFix[]) => {
        setFlightDetails((prevDetails) => ({
          ...prevDetails,
          route: route || [],
        }));
      },
    },
  ]);

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
