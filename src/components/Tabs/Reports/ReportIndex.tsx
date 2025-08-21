import { useContext, useEffect, useState } from "react";
import ReportsContainer from "@/components/Tabs/Reports/ReportsContainer";
import { SectionProps } from "@/interface/props/Reports";
import { ReportContext } from "@/context/ContractContext";
import SelectDropdown from "@/components/General/SelectDropdown";

const STATUS_OPTIONS = ["ARMED", "DISARMED"] as const;
type Status = (typeof STATUS_OPTIONS)[number];

export default function ReportIndex({
  isOpen,
  setIsOpen,
  disabled,
  onSend,
  cancelSign,
}: SectionProps) {
  const { indexReports, setIndexReports } = useContext(ReportContext);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!cancelSign) return;
    setSelectedId(null);
  }, [cancelSign]);

  const selected = indexReports.find((r) => r.id === selectedId);

  const handleStatusChange = (id: string, newStatus: Status) => {
    setIndexReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );
  };

  const handleSet = () => {
    const current = indexReports.find((r) => r.id === selectedId);
    if (!current) return;

    const payload = {
      label: current.label,
      event: "report_index_send",
      badges: [current.status],
      data: { selected: current },
      message: current.result?.text ?? null,
    };
    onSend(payload);
  };

  const disableSet = !selected || selected.status !== "DISARMED";

  const statusRing = (s: string) =>
    s === "ARMED" ? "ring-1 ring-emerald-500/40" : "ring-1 ring-amber-500/40";

  return (
    <ReportsContainer
      label="REPORT INDEX"
      isOpen={isOpen}
      setIsOpen={(v) => !disabled && setIsOpen(v)}
      onClear={() => {
        setIndexReports([]);
        setSelectedId(null);
      }}
      onSend={handleSet}
      disabled={disabled}
      disableSet={disableSet}
    >
      <div className="flex flex-col gap-2 text-white">
        <div className="grid grid-cols-3 text-left font-normal text-[12px] text-white/60 border-b border-white/20">
          <div className="px-2">REPORT</div>
          <div className="px-2">STATUS</div>
          <div className="px-2">ACTIONS</div>
        </div>

        {indexReports.length === 0 && (
          <div className="text-white/60 text-sm px-2 py-3">
            No armed reports.
          </div>
        )}

        {indexReports.map((r) => {
          const isSelected = selectedId === r.id;
          const status = (r.status || "").toUpperCase();
          const isStatusEditable = status === "ARMED" || status === "DISARMED"; // OPEN/SENT non modifiables

          return (
            <div
              key={r.id}
              className={`grid grid-cols-3 items-center text-left border-b border-white/10 py-2 text-white/90 cursor-pointer transition
                ${isSelected ? "bg-white/5 border-l-2 border-emerald-400/60" : "hover:bg-white/5"}`}
              onClick={() => setSelectedId(r.id)}
            >
              <div className="px-2 truncate">{r.label}</div>

              <div
                className="px-2 max-w-[220px]"
                onClick={(e) => e.stopPropagation()}
              >
                {isStatusEditable ? (
                  <SelectDropdown
                    options={STATUS_OPTIONS as unknown as string[]}
                    value={status}
                    onChange={(val) => handleStatusChange(r.id, val as Status)}
                    style={`text-xs ${statusRing(status)}`}
                  />
                ) : (
                  <span
                    className={`px-2 py-1 rounded text-[11px] inline-block ${
                      status === "OPEN"
                        ? "bg-sky-700/30 border border-sky-500/40"
                        : status === "SENT"
                          ? "bg-zinc-700/30 border border-zinc-500/40"
                          : "bg-white/10 border border-white/20"
                    }`}
                  >
                    {status}
                  </span>
                )}
              </div>

              <div className="px-2">
                {isSelected ? (
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-700/30 border border-emerald-500/40">
                    SELECTED
                  </span>
                ) : (
                  <span className="text-white/40 text-[11px]">—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ReportsContainer>
  );
}
