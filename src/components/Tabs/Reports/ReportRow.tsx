import { ReportRowProps } from "@/interface/props/Reports";

export default function ReportRow({
  label,
  value,
  select = false,
  options = [],
}: ReportRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-white/70 w-[120px]">{label}</span>
      {select && (
        <select className="bg-[#2b2b2c] text-white text-sm px-2 py-1 rounded border border-white/10">
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      )}
      <span className="text-white text-right w-[60px]">{value}</span>
    </div>
  );
}
