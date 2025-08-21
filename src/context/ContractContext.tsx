"use client";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import React, { createContext, useState } from "react";

export interface AdsCData {
  time: string;
  value: string;
}

export interface ADSCContract {
  id: string;
  center: string;
  period: string;
  time_Next: string;
  trigger: string;
  is_Active: boolean;
}

export type MonitoringFacility =
  | "CENTER"
  | "APPROACH"
  | "TOWER"
  | "FINAL"
  | "GROUND CONTROL"
  | "CLEARANCE DELIVERY"
  | "DEPARTURE"
  | "CONTROL"
  | "RADIO";

export type MonitoringData = {
  facility: MonitoringFacility | "";
  designation: string; // ex: CYUL
  name: string; // ex: YUL
  vhf: string; // ex: 118.900
  ref: string;
};

export const MOCK_MONITORING_DATA: MonitoringData = {
  facility: "CENTER",
  designation: "CYUL",
  name: "YUL",
  vhf: "118.900",
  ref: "DM89",
};
export interface IndexReport {
  ref: string;
  id: string;
  label: string;
  status: string;
  result?: { ref: string; text: string };
}

//position report
export type TimeSec = number; // secondes
export type AltitudeFt = number; // pieds
export type Degrees = number; // 0..360
export type SpeedKmH = number; // km/h
export type DistanceKm = number; // km
export type FuelKg = number; // kg

export type Turbulence = "NONE" | "LIGHT" | "MODERATE" | "SEVERE";
export type Icing = "TRACE" | "LIGHT" | "MODERATE" | "SEVERE";

export interface WindsPayload {
  winddirection_deg: Degrees;
  speed_kmh: SpeedKmH;
}

export interface PositionReportPayload {
  altitude_ft: AltitudeFt;
  distance_km: DistanceKm;

  positioncurrent: string; // ex: "PTD"
  fixnext?: string | null; // ex: "BOS"
  fixnextplusone?: string | null; // ex: "ART"

  remainingfuel_kg?: FuelKg | null; // ex: 11113
  temperature_c?: number | null; // ex: -50

  winds?: WindsPayload | null; // { winddirection_deg: 270, speed_kmh: 60 }
  turbulence?: Turbulence | null; // ex: "NONE"
  icing?: Icing | null; // ex: "LIGHT"

  speed_kmh?: SpeedKmH | null; // ex: 812.9
  speedground_kmh?: SpeedKmH | null; // ex: 752.9

  verticalchange?: null; // (null dans ton payload actuel)
  trackangle_deg?: Degrees | null; // ex: null
  trueheading_deg?: Degrees | null; // ex: 228

  timeatpositioncurrent_sec: TimeSec; // ex: 300
  timeatafixnext_sec?: TimeSec | null; // ex: 1361
  timeatedestination_sec?: string | null; // ex: "15:09:153:06:45"

  supplementaryinformation?: string | null;

  reportedwaypointposition?: string | null;
  reportedwaypointtime_sec?: TimeSec | null;
  reportedwaypointaltitude_ft?: AltitudeFt | null;
}

export interface EmergencyData {
  type: string;
  reason: string;
  divertTo: string;
  descendAlt: string;
  offsetTo: string;
  soulsOnBoard: string;
  fuel: string;
  remarks: string;
}

export const MOCK_EMERGENCY_DATA: EmergencyData = {
  type: "MAYDAY",
  reason: "WEATHER",
  divertTo: "NONE",
  descendAlt: "",
  offsetTo: "",
  soulsOnBoard: "",
  fuel: "",
  remarks: "",
};

export const DEFAULT_POSITION_REPORT: PositionReportPayload = {
  altitude_ft: 0,
  distance_km: 0, // distance parcourue totale depuis départ (mets ce que tu veux)
  positioncurrent: "---", // point courant
  fixnext: "---", // prochain point
  fixnextplusone: "---", // +1
  remainingfuel_kg: 0,
  temperature_c: 0,
  winds: { winddirection_deg: 0, speed_kmh: 0 },
  turbulence: "NONE",
  icing: "LIGHT",
  speed_kmh: 0,
  speedground_kmh: 0,
  verticalchange: null,
  trackangle_deg: null,
  trueheading_deg: 0,
  timeatpositioncurrent_sec: 0, // 5 min (exemple)
  timeatafixnext_sec: 0, // ~22 min 41 s (exemple)
  timeatedestination_sec: null, // mets un "HH:MM:SS" si tu en as un
  supplementaryinformation: "---",
  reportedwaypointposition: "---",
  reportedwaypointtime_sec: 0,
  reportedwaypointaltitude_ft: 0,
};

export interface ReportContext {
  adscContracts: ADSCContract[];
  adsEmergency: string;
  adsEnabled: boolean;
  setAdscContracts: React.Dispatch<React.SetStateAction<ADSCContract[]>>;
  setAdsEmergency: React.Dispatch<React.SetStateAction<string>>;
  setAdsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  resetAdscState: () => void;
  positionReport: PositionReportPayload;
  setPositionReport: React.Dispatch<
    React.SetStateAction<PositionReportPayload>
  >;
  indexReports: IndexReport[];
  setIndexReports: React.Dispatch<React.SetStateAction<IndexReport[]>>;
  monitoringReport: MonitoringData;
  setMonitoringReport: React.Dispatch<React.SetStateAction<MonitoringData>>;
  emergencyData: EmergencyData;
  setEmergencyData: React.Dispatch<React.SetStateAction<EmergencyData>>;
}

export const ReportContext = createContext<ReportContext>({
  adscContracts: [],
  adsEmergency: "OFF",
  adsEnabled: true,
  setAdscContracts: () => {},
  setAdsEmergency: () => {},
  setAdsEnabled: () => {},
  resetAdscState: () => {},
  positionReport: DEFAULT_POSITION_REPORT,
  setPositionReport: () => {},
  indexReports: [],
  setIndexReports: () => {},
  monitoringReport: MOCK_MONITORING_DATA,
  setMonitoringReport: () => {},
  emergencyData: { ...MOCK_EMERGENCY_DATA },
  setEmergencyData: () => {},
});

export const ReportProvider = ({ children }: { children: React.ReactNode }) => {
  const [adscContracts, setAdscContracts] = useState<ADSCContract[]>([]);
  const [adsEmergency, setAdsEmergency] = useState("OFF"); // Default to OFF or to ON ???
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [positionReport, setPositionReport] = useState<PositionReportPayload>(
    DEFAULT_POSITION_REPORT,
  );
  const [indexReports, setIndexReports] = useState<IndexReport[]>([]);
  const [monitoringReport, setMonitoringReport] =
    useState<MonitoringData>(MOCK_MONITORING_DATA);
  const [emergencyData, setEmergencyData] = useState<EmergencyData>({
    ...MOCK_EMERGENCY_DATA,
  });

  useSocketListeners([
    {
      event: "position_report",
      callback: (data: PositionReportPayload) => {
        setPositionReport(data);
      },
    },
    {
      event: "index_report_response",
      callback: (data: IndexReport) => {
        console.log("index report response", data);
        setIndexReports((prev) =>
          prev.map((r) =>
            r.id === data.id ? { ...r, result: data.result } : r,
          ),
        );
      },
    },
    {
      event: "monitoring_report",
      callback: (data: MonitoringData) => {
        setMonitoringReport(data);
      },
    },
    {
      event: "load_adsc_reports",
      callback: (data: ADSCContract[]) => {
        setAdscContracts(data);
      },
    },
  ]);

  const resetAdscState = () => {
    setAdsEmergency("OFF");
    setAdsEnabled(true);
  };

  return (
    <ReportContext.Provider
      value={{
        adscContracts,
        adsEmergency,
        adsEnabled,
        setAdscContracts,
        setAdsEmergency,
        setAdsEnabled,
        resetAdscState,
        positionReport,
        setPositionReport,
        indexReports,
        setIndexReports,
        monitoringReport,
        setMonitoringReport,
        emergencyData,
        setEmergencyData,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
