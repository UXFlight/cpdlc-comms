"use client";
import { JSX, useContext, useEffect, useState } from "react";

import LogonTab from "@/components/Tabs/Logon/Tab";
import LogsTab from "@/components/Tabs/Logs/Tab";
import RequestTab from "@/components/Tabs/Request/Tab";
import ReportsTab from "@/components/Tabs/Reports/Tab";
import EmergencyTab from "@/components/Tabs/Emergency/Tab";
import SettingsTab from "@/components/Tabs/Settings/Tab";
import PrintTab from "@/components/Tabs/Print/Tab";
import FmsTable from "@/components/Fms/FmsTable";
import ResponsiveBar from "@/components/ResponsiveBar/ResponsiveBar";
import ConnectionBar from "@/components/ConnectionBar/ConnectionBar";
import { InputProvider } from "@/context/InputContext";
import { socketService } from "@/api/communications/socket/socketService";
import { LogsContext, LogsProvider } from "@/context/LogsContext";
import { FlightContext } from "@/context/FlightContext";
import ErrorPopup from "@/components/General/ErrorPopup";
import FlightStatusPanel from "@/components/FlightStatusPanel/FlightStatusPanel";
import RouteProgressBar from "@/components/PlaneProgression/RouteProgressBar";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { ReportProvider } from "@/context/ContractContext";

export default function CpdlcMainView() {
  const [activeTab, setActiveTab] = useState("logon");
  const { flightDetails } = useContext(FlightContext);
  const { logs, setLogs, clearLogs } = useContext(LogsContext);

  const TAB_COMPONENTS: Record<string, JSX.Element> = {
    logon: <LogonTab />,
    logs: <LogsTab />,
    request: <RequestTab />,
    reports: <ReportsTab />,
    emergency: <EmergencyTab />,
    settings: <SettingsTab />,
    print: <PrintTab />,
  };

  useEffect(() => {
    if (!socketService.isSocketAlive()) {
      socketService.connect();
    }
  }, []);

  useSocketListeners([{
    event: "removed_logs",
    callback: (data) => {
      clearLogs();
      setLogs(data);
    }
  }]);

  // useEffect(() => {
  //   console.log("Flight details updated:", flightDetails);
  // }, [flightDetails]);

  return (
    <div>
      <FlightStatusPanel />
      <RouteProgressBar />
      <div className="grid lg:grid-cols-2 grid-cols-1 h-screen gap-8 mt-6">
        <div className="flex justify-center items-center">
          <div className="w-[600px] h-[800px] relative bg-black overflow-hidden lg:block hidden">
            <FmsTable route={flightDetails.tempRoute || flightDetails.route} />
          </div>
        </div>
        <div className="flex justify-center items-center mx-auto">
          <div className="w-[600px] h-[800px] relative bg-black overflow-hidden grid grid-rows-[auto_1fr_auto]">
            {/* navbar */}
            <div className="select-none">
              <ResponsiveBar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* contenu de l'onglet */}
            <div className="h-full w-full overflow-auto">
              <ReportProvider>
              <InputProvider>
                {TAB_COMPONENTS[activeTab]}
              </InputProvider>
              </ReportProvider>
            </div>

            {/* footer en bas */}
            <div className="mt-2">
              <ConnectionBar />
            </div>
          </div>
          <ErrorPopup />
        </div>
      </div>
    </div>
  );
}
