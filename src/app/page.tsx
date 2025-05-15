"use client";
import { JSX, useState } from 'react';

// Import all tab components
import LogonTab from '../components/Tabs/Logon/Tab';
import LogsTab from '../components/Tabs/Logs/Tab';
import RequestTab from '../components/Tabs/Request/Tab';
import ReportsTab from '../components/Tabs/Reports/Tab';
import EmergencyTab from '../components/Tabs/Emergency/Tab';
import SettingsTab from '../components/Tabs/Settings/Tab';
import PrintTab from "../components/Tabs/Print/Tab";

const TAB_COMPONENTS: Record<string, JSX.Element> = {
  login: <LogonTab />,
  logs: <LogsTab />,
  request: <RequestTab />,
  reports: <ReportsTab />,
  emergency: <EmergencyTab />,
  settings: <SettingsTab />,
  print: <PrintTab />,
};

export default function CpdlcMainView() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div>
      {/*<TabsBar activeTab={activeTab} onTabChange={setActiveTab} /> in progress*/}
    </div>
  );
}
