import LoginTab from './Logon/Tab';
import LogsTab from './Logs/Tab';
import RequestTab from './Request/Tab';
import ReportsTab from './Reports/Tab';
import EmergencyTab from './Emergency/Tab';
import SettingsTab from './Settings/Tab';
import PrintTab from './Print/Tab';
import { JSX } from 'react';

export const TAB_COMPONENTS: Record<string, JSX.Element> = {
  login: <LoginTab />,
  logs: <LogsTab />,
  request: <RequestTab />,
  reports: <ReportsTab />,
  emergency: <EmergencyTab />,
  settings: <SettingsTab />,
  print: <PrintTab />,
};
