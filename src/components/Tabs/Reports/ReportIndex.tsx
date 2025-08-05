import { useEffect, useState } from "react";
import ReportsContainer from "@/components/Tabs/Reports/ReportsContainer";
import { SectionProps } from "@/interface/props/Reports";
import { useSocketListeners } from "@/hooks/useSocketListeners";

interface ReportEntry {
  id: number;
  label: string;
  status: "ARMED" | "DISARMED" | "OPEN" | "SENT";
}

const mockReportList: ReportEntry[] = [
  { id: 1, label: "PASSING POSITION", status: "ARMED" },
  { id: 2, label: "REPORT PASSING YQM", status: "DISARMED" },
  { id: 3, label: "REPORT ARMED", status: "OPEN" },
];

export default function ReportIndex({
  isOpen,
  setIsOpen,
  disabled,
  onSend,
  cancelSign,
}: SectionProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [reports, setReports] = useState<ReportEntry[]>(mockReportList);

  useSocketListeners([
    {
      event: "report_index_update",
      callback: (data: ReportEntry[]) => {
        setReports(data);
      },
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
      setSelectedId(null);
    }
  }, [cancelSign]);

  // const handleDisarm = () => {
  //   if (selectedId === null) return;

  //   setReports((prev) =>
  //     prev.map((r) =>
  //       r.id === selectedId && r.status === "ARMED"
  //         ? { ...r, status: "DISARMED" }
  //         : r,
  //     ),
  //   );
  // };

  const handleSend = () => {
    if (selectedId === null) return;

    const message = reports.find((r) => r.id === selectedId);
    if (!message) return;

    console.log("Sending report:", message.label);
    onSend();
  };

  const handleClear = () => {
    setSelectedId(null);
    setReports(mockReportList);
  };

  return (
    <ReportsContainer
      label="REPORT INDEX"
      isOpen={isOpen}
      setIsOpen={(v) => !disabled && setIsOpen(v)}
      onSend={handleSend}
      onClear={handleClear}
      disabled={disabled}
      showSendButton
    >
      <div className="flex flex-col gap-2 text-white text-sm">
        {reports.map((entry) => (
          <div
            key={entry.id}
            onClick={() => setSelectedId(entry.id)}
            className={`flex justify-between items-center px-4 py-2 rounded-md cursor-pointer border border-white/10
              ${
                selectedId === entry.id
                  ? "bg-white/10 border-white/30"
                  : "bg-transparent hover:bg-white/5"
              }`}
          >
            <span>{entry.label}</span>
            <span
              className={`${
                entry.status === "ARMED"
                  ? "text-green"
                  : entry.status === "OPEN"
                    ? "text-light-blue"
                    : "text-white/50"
              } font-semibold`}
            >
              {entry.status}
            </span>
          </div>
        ))}
      </div>
    </ReportsContainer>
  );
}
