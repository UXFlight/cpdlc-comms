"use client";
import { act, JSX, useContext, useEffect, useState } from "react";

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
import { UserContext } from "../context/UserContext";

export default function CpdlcMainView() {
  useEffect(() => {
    console.log(`${activeTab}`);
  });

  const [isLogonSuccessful, setIsLogonSuccessful] = useState<boolean | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("logon"); // default logon, swithc for easier dev 
  
  const TAB_COMPONENTS: Record<string, JSX.Element> = {
    logon: <LogonTab onLogonResult={setIsLogonSuccessful} />,
    logs: <LogsTab />,
    request: <RequestTab />,
    reports: <ReportsTab />,
    emergency: <EmergencyTab />,
    settings: <SettingsTab />,
    print: <PrintTab />,
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 h-screen gap-8">
      <div className="flex justify-center items-center">
        <div className="w-[600px] h-[800px] relative bg-black overflow-hidden lg:block hidden">
          <FmsTable />
        </div>
      </div>
      <div className="flex justify-center items-center mx-auto">
        <div className="w-[600px] h-[800px] relative bg-black overflow-hidden grid grid-rows-[auto_1fr_auto]">
          {/* navbar */}
          <div>
            <ResponsiveBar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* contenu de l'onglet */}
          <div className="overflow-auto mb-4">{TAB_COMPONENTS[activeTab]}</div>

          {/* footer en bas */}
          <div className="self-end">
            <ConnectionBar />
          </div>
        </div>
      </div>
    </div>
  );
}
