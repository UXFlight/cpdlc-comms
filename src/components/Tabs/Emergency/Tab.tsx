import { useContext, useEffect, useState } from "react";
import MessagePreview from "../Request/RequestMessagePreview";
import BuildTable from "./BuildTable";
import EmergencyForm from "./EmergencyForm";
import {
  EmergencyData,
  MOCK_EMERGENCY_DATA,
  ReportContext,
} from "@/context/ContractContext";
import { socketService } from "@/api/communications/socket/socketService";
import { RequestContext } from "@/context/RequestContext";
import ReportMessagePreview from "../../General/ReportMessagePreview";

export default function EmergencyTab() {
  const { emergencyData, setEmergencyData } = useContext(ReportContext);
  const { resetRequest, setRequest } = useContext(RequestContext);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const normalizeFuel = (fuel: string) => {
    const [rawH = "", rawM = ""] = fuel.split(":");
    const h = rawH.trim().padStart(2, "0").slice(-2);
    const m = rawM.trim().padStart(2, "0").slice(-2);
    if (!rawH && !rawM) return "";
    if (!rawH) return `00:${m}`;
    if (!rawM) return `${h}:00`;
    return `${h}:${m}`;
  };

  const BUILD_RULES: Partial<
    Record<
      keyof EmergencyData,
      (v: string, all: EmergencyData) => string | null
    >
  > = {
    reason: (v) => `DUE TO ${v.toUpperCase()}`,
    divertTo: (v) => `DIVERT TO ${v.toUpperCase()}`,
    descendAlt: (v) => `DESCENDING TO ${v}`,
    offsetTo: (v) => `OFFSET TO ${v}`,
    soulsOnBoard: (v) => `SOULS ON BOARD ${v}`,
    fuel: (v) => {
      const norm = normalizeFuel(v);
      return norm ? `FUEL ${norm}` : null;
    },
    remarks: (v) => `REMARKS: ${v}`,
  };

  const buildAdditional = (data: EmergencyData): string[] =>
    (Object.keys(BUILD_RULES) as (keyof EmergencyData)[])
      .map((k) => {
        const raw = (data[k] ?? "").trim();
        if (!raw || raw.toUpperCase() === "NONE") return null;
        return BUILD_RULES[k]?.(raw, data) ?? null;
      })
      .filter((x): x is string => Boolean(x));
  const handleClear = () => {
    setEmergencyData(MOCK_EMERGENCY_DATA);
  };

  const handleSet = (data: EmergencyData) => {
    const additional = buildAdditional(emergencyData);

    const newRequest = {
      messageRef: emergencyData.type === "MAYDAY" ? "DM56" : "DM55",
      formattedMessage:
        emergencyData.type === "MAYDAY"
          ? "MAYDAY MAYDAY MAYDAY"
          : "PAN PAN PAN",
      additional,
    };
    setRequest(newRequest);

    setEmergencyData(data);
    setIsPreviewOpen(true);
  };

  const handlePreviewCancel = () => {
    setIsPreviewOpen(false);
    setEmergencyData(MOCK_EMERGENCY_DATA);
  };

  const handlePreviewSent = () => {
    setIsPreviewOpen(false);
    setEmergencyData(MOCK_EMERGENCY_DATA);
    resetRequest();
  };

  return (
    <div className="flex flex-col h-full px-4 pt-4 pb-2 gap-4 text-white relative">
      <div className="flex flex-row items-center justify-between">
        <h1>emergency</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center rounded w-full">
          <EmergencyForm handleClear={handleClear} handleSet={handleSet} />
        </div>
        <div className="flex flex-col gap-4"></div>
      </div>
      {isPreviewOpen && (
        <div className="absolute bottom-0 left-0 w-full px-2 z-50">
          <div className="bg-[#1e1e1e]/95 backdrop-blur-sm shadow-[0_-10px_10000px_rgba(43,43,43,1)] rounded-t-md border-t border-white/10">
            <ReportMessagePreview
              onCancel={handlePreviewCancel}
              onSent={handlePreviewSent}
              kind="emergency"
              reportData={{}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
