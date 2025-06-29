import ReportRow from "@/components/Tabs/Reports/ReportRow";
import { ReportSectionProps } from "@/interface/props/Reports";

export default function ReportSection({ title, rows }: ReportSectionProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-white/10 pb-4 pt-4">
      {title && (
        <p className="text-white/80 text-xs uppercase font-semibold">{title}</p>
      )}
      {rows.map((row, index) => (
        <ReportRow key={index} {...row} />
      ))}
    </div>
  );
}
