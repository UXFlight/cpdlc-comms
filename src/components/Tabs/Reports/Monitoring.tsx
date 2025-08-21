// components/Tabs/Reports/Monitoring.tsx
import { useContext, useEffect, useMemo, useState } from "react";
import ReportsContainer from "@/components/Tabs/Reports/ReportsContainer";
import ReportsInput from "./ReportsInput";
import { SectionProps } from "@/interface/props/Reports";

import {
  ReportContext,
  MonitoringData,
  MonitoringFacility,
  MOCK_MONITORING_DATA,
} from "@/context/ContractContext";

import {
  buildMonitoringMainText,
  buildMonitoringTokens,
  isVhfValid,
  normalizeVhf,
} from "@/utils/buildMonitoring";

const facilityOptions: MonitoringFacility[] = [
  "CENTER",
  "APPROACH",
  "TOWER",
  "FINAL",
  "GROUND CONTROL",
  "CLEARANCE DELIVERY",
  "DEPARTURE",
  "CONTROL",
  "RADIO",
];

export default function Monitoring({
  isOpen,
  setIsOpen,
  disabled,
  onSend,
  cancelSign,
}: SectionProps) {
  const { monitoringReport, setMonitoringReport } = useContext(ReportContext);

  const [facility, setFacility] = useState<MonitoringFacility | "">("");
  const [designation, setDesignation] = useState("");
  const [vhf, setVhf] = useState("");
  const [name, setName] = useState("");

  // reset sur cancel externe
  useEffect(() => {
    if (!cancelSign) return;
    if (isOpen) setIsOpen(false);
    handleClear();
  }, [cancelSign]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isOpen) {
      setFacility(monitoringReport.facility);
      setDesignation(monitoringReport.designation);
      setName(monitoringReport.name);
      setVhf(monitoringReport.vhf);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClear = () => {
    setFacility("");
    setDesignation("");
    setName("");
    setVhf("");
    setMonitoringReport(MOCK_MONITORING_DATA);
  };

  const current: MonitoringData = useMemo(
    () => ({
      facility,
      designation: designation.trim().toUpperCase(),
      name: name.trim().toUpperCase(),
      vhf: normalizeVhf(vhf),
      ref: "DM89",
    }),
    [facility, designation, name, vhf],
  );

  // Champs requis: facility, name, vhf (et vhf doit être valide)
  const vhfFilled = current.vhf.trim().length > 0;
  const nameFilled = current.name.trim().length > 0;

  const canSet = useMemo(() => {
    if (!current.facility) return false;
    if (!nameFilled) return false;
    if (!vhfFilled) return false;
    return isVhfValid(current.vhf);
  }, [current, nameFilled, vhfFilled]);

  const handleSend = () => {
    setMonitoringReport(current);

    const mainText = buildMonitoringMainText(current);
    const badges = buildMonitoringTokens(current);

    const payload = {
      ref: "DM89",
      message: mainText,
      badges,
      data: current,
    };
    onSend(payload);
  };

  return (
    <ReportsContainer
      label="Monitoring"
      isOpen={isOpen}
      setIsOpen={(v) => !disabled && setIsOpen(v)}
      onClear={handleClear}
      onSend={handleSend}
      disabled={disabled}
      disableSet={!canSet}
    >
      <div className={`${isOpen ? "space-y-4 p-4" : "hidden"}`}>
        <div className="space-y-3 text-white">
          <ReportsInput
            label="FACILITY DESIGNATION"
            value={designation}
            onChange={(val) => setDesignation(val.toUpperCase())}
            placeholder="e.g., CYUL"
          />

          <ReportsInput
            label="FACILITY NAME"
            value={name}
            onChange={(val) => setName(val.toUpperCase())}
            placeholder="e.g., YUL"
            required // <- requis
          />

          <ReportsInput
            label="VHF"
            value={vhf}
            onChange={setVhf}
            placeholder="e.g., 118.900"
            required // <- requis
            error={
              vhfFilled && !isVhfValid(vhf) ? "Format attendu 123.450" : ""
            }
          />

          <div className="flex flex-row items-center gap-4">
            <label className="w-[180px] text-sm text-right">FACILITY</label>
            <select
              value={facility}
              onChange={(e) =>
                setFacility(e.target.value as MonitoringFacility)
              }
              className="bg-black text-white border border-white/20 px-2 py-1 rounded-md w-full"
            >
              <option value="">Select...</option>
              {facilityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </ReportsContainer>
  );
}
