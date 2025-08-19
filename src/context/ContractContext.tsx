"use client";
import { DEFAULT_POSITION_REPORT } from "@/constants/context/DefaultReport";
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

export interface MonitoringReport {
  facility: string;
  facility_designation: string;
  facility_name: string;
  vhf: number;
}

export interface IndexReport {
  id: string;
  label: string;
  status: string;
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
  type: "NONE",
  reason: "NONE",
  divertTo: "NONE",
  descendAlt: "",
  offsetTo: "",
  soulsOnBoard: "",
  fuel: "",
  remarks: "",
};

export interface ReportContext {
  adscContracts: ADSCContract[];
  adsEmergency: string;
  adsEnabled: boolean;
  setAdscContracts: React.Dispatch<React.SetStateAction<ADSCContract[]>>;
  setAdsEmergency: React.Dispatch<React.SetStateAction<string>>;
  setAdsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  resetAdscState: () => void;
  positionReports: PositionReportPayload[];
  setPositionReports: React.Dispatch<
    React.SetStateAction<PositionReportPayload[]>
  >;
  indexReports: IndexReport[];
  setIndexReports: React.Dispatch<React.SetStateAction<IndexReport[]>>;
  monitoringReports: MonitoringReport[];
  setMonitoringReports: React.Dispatch<
    React.SetStateAction<MonitoringReport[]>
  >;
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
  positionReports: [],
  setPositionReports: () => {},
  indexReports: [],
  setIndexReports: () => {},
  monitoringReports: [],
  setMonitoringReports: () => {},
  emergencyData: { ...MOCK_EMERGENCY_DATA },
  setEmergencyData: () => {},
});

export const ReportProvider = ({ children }: { children: React.ReactNode }) => {
  const [adscContracts, setAdscContracts] = useState<ADSCContract[]>([]);
  const [adsEmergency, setAdsEmergency] = useState("OFF"); // Default to OFF or to ON ???
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [positionReports, setPositionReports] = useState<
    PositionReportPayload[]
  >([DEFAULT_POSITION_REPORT]);
  const [indexReports, setIndexReports] = useState<IndexReport[]>([]);
  const [monitoringReports, setMonitoringReports] = useState<
    MonitoringReport[]
  >([]);
  const [emergencyData, setEmergencyData] = useState<EmergencyData>({
    ...MOCK_EMERGENCY_DATA,
  });

  useSocketListeners([
    {
      event: "position_report",
      callback: (data: PositionReportPayload) => {
        setPositionReports((prev) => [data, ...prev]);
      },
    },
    {
      event: "index_report",
      callback: (data: IndexReport) => {
        setIndexReports((prev) => [data, ...prev]);
      },
    },
    {
      event: "monitoring_report",
      callback: (data: MonitoringReport) => {
        setMonitoringReports((prev) => [data, ...prev]);
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
        positionReports,
        setPositionReports,
        indexReports,
        setIndexReports,
        monitoringReports,
        setMonitoringReports,
        emergencyData,
        setEmergencyData,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
