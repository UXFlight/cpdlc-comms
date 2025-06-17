import FmsHeader from "./FmsHeader";
import FmsTableHeader from "./FmsTableHeader";
import FmsRow from "./FmsRow";

type RouteFix = {
  fix: string;
  heading: string;
  distance: string;
  altitude: string;
  mach: string;
  duration: string;
  fuel: string;
};

type Props = {
  route: RouteFix[];
};

export default function FmsTable({ route }: Props) {
  const noRoute = route.length === 0;

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
          route.map((fix, i) => (
            <FmsRow key={`${fix.fix}-${i}`} fix={fix} />
          ))
        )}
      </div>
    </div>
  );
}
