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
  return (
    <div className="bg-black text-white font-mono w-full h-full flex flex-col p-4">
      <FmsHeader />
      <FmsTableHeader />
      <div className="flex-1 overflow-y-auto mt-1 text-sm text-white/90">
        {route.map((fix, i) => (
          <FmsRow key={`${fix.fix}-${i}`} fix={fix} />
        ))}
      </div>
    </div>
  );
}
