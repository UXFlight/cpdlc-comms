import { FmsRowProps } from "@/interface/props/Fms";

export default function FmsRow({ fix, delay = 0 }: FmsRowProps) {
  return (
    <div
      className="grid grid-cols-5 gap-2 border-b border-white/10 py-1 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div>{fix.fix}</div>
      <div>{fix.altitude}</div>
      <div>{fix.heading}</div>
      <div>{fix.distance}</div>
      <div>{fix.duration}</div>
    </div>
  );
}
