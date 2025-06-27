import { RouteFix } from "@/interface/FlightDetails";

export interface FmsRowProps {
  fix: RouteFix;
  delay?: number;
};

export interface FmsTableProps {
   route: RouteFix[];
}
