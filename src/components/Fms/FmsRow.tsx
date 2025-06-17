type Props = {
  fix: {
    fix: string;
    heading: string;
    distance: string;
    altitude: string;
    mach: string;
    duration: string;
    fuel: string;
  };
};

export default function FmsRow({ fix }: Props) {
  return (
    <div className="grid grid-cols-5 gap-2 border-b border-white/10 py-1">
      <div>{fix.fix}</div>
      <div>{fix.altitude}</div>
      <div>{fix.heading}</div>
      <div>{fix.distance}</div>
      <div>{fix.duration}</div>
    </div>
  );
}
