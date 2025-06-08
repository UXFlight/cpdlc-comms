import CpdlcAds from "./CpdlcAds";
import Monitoring from "./Monitoring";
import PositionReport from "./PositionReport";
import ReportIndex from "./ReportIndex";

export default function ReportsTab() {
  return (
    <div className="flex flex-col h-full px-4 pt-4 pb-2 gap-4 text-white">
      <div className="flex flex-row items-center justify-between">
        <h1>reports</h1>
      </div>

      {/* Scrollable area */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-120px)] pr-1">
        <CpdlcAds />
        <ReportIndex />
        <Monitoring />
        <PositionReport />
      </div>
    </div>
  );
}
