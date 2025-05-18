"use client";
import { act, JSX, useEffect, useState } from "react";

// Import all tab components
import LogonTab from "../components/Tabs/Logon/Tab";
import LogsTab from "../components/Tabs/Logs/Tab";
import RequestTab from "../components/Tabs/Request/Tab";
import ReportsTab from "../components/Tabs/Reports/Tab";
import EmergencyTab from "../components/Tabs/Emergency/Tab";
import SettingsTab from "../components/Tabs/Settings/Tab";
import PrintTab from "../components/Tabs/Print/Tab";
import FmsTable from "../components/Fms/FmsTable";
import ResponsiveBar from "../components/ResponsiveBar/ResponsiveBar";
import ConnectionBar from "../components/ConnectionBar/ConnectionBar";

const TAB_COMPONENTS: Record<string, JSX.Element> = {
  logon: <LogonTab />,
  logs: <LogsTab />,
  request: <RequestTab />,
  reports: <ReportsTab />,
  emergency: <EmergencyTab />,
  settings: <SettingsTab />,
  print: <PrintTab />,
};

export default function CpdlcMainView() {
  useEffect(() => {
    console.log(`${activeTab}`);
  });

  const [activeTab, setActiveTab] = useState("logon");

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 h-screen gap-8">
      <div className="flex justify-center items-center">
        <div className="w-[600px] h-[800px] relative bg-black overflow-hidden lg:block hidden">
          <FmsTable />
        </div>
      </div>
      <div className="flex justify-center items-center mx-auto">
        <div className="w-[600px] h-[800px] relative bg-black overflow-hidden grid grid-rows-[auto_1fr_auto]">
          {/* Ligne 1 : navbar */}
          <div>
            <ResponsiveBar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Ligne 2 : contenu de l'onglet → occupe toute la hauteur restante */}
          <div className="overflow-auto">{TAB_COMPONENTS[activeTab]}</div>

          {/* Ligne 3 : footer en bas */}
          <div className="self-end">
            <ConnectionBar />
          </div>
        </div>
      </div>
    </div>
  );
}
