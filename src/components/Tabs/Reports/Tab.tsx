import CpdlcAds from "@/components/Tabs/Reports/AdsContract";
import Monitoring from "@/components/Tabs/Reports/Monitoring";
import PositionReport from "@/components/Tabs/Reports/PositionReport/PositionReport";
import ReportIndex from "@/components/Tabs/Reports/ReportIndex";
import MessagePreview from "@/components/Tabs/Request/RequestMessagePreview";
import { useEffect, useState } from "react";
import ReportMessagePreview from "../../General/ReportMessagePreview";

export default function ReportsTab() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const [reportData, setReportData] = useState<any>(null);
  const [cancelSignal, setCancelSignal] = useState(0);

  const handlePreviewCancel = () => {
    setIsPreviewOpen(false);
    setActiveReport(null);
    setReportData(null);
    setCancelSignal((prev) => prev + 1);
  };

  useEffect(() => {
    console.log(`active report`, activeReport);
  }, [activeReport]);

  const handlePreviewSent = () => {
    setIsPreviewOpen(false);
    setActiveReport(null);
    setCancelSignal((prev) => prev + 1);
    setReportData(null);
  };

  return (
    <div className="flex flex-col h-full px-4 pt-4 pb-2 gap-4 text-white relative">
      <div className="flex flex-row items-center justify-between">
        <h1>reports</h1>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-120px)] pr-1">
        <CpdlcAds
          isOpen={activeReport === "cpdlc"}
          setIsOpen={(v) => setActiveReport(v ? "cpdlc" : null)}
          disabled={!!activeReport && activeReport !== "cpdlc"}
          onSend={(payload) => {
            setIsPreviewOpen(true);
            setActiveReport("cpdlc");
            setReportData(payload);
          }}
          cancelSign={cancelSignal}
        />

        <ReportIndex
          isOpen={activeReport === "index"}
          setIsOpen={(v) => setActiveReport(v ? "index" : null)}
          disabled={!!activeReport && activeReport !== "index"}
          onSend={() => {
            setIsPreviewOpen(true);
            setActiveReport("index");
          }}
          cancelSign={cancelSignal}
        />

        <Monitoring
          isOpen={activeReport === "monitoring"}
          setIsOpen={(v) => setActiveReport(v ? "monitoring" : null)}
          disabled={!!activeReport && activeReport !== "monitoring"}
          onSend={() => {
            setIsPreviewOpen(true);
            setActiveReport("monitoring");
          }}
          cancelSign={cancelSignal}
        />

        <PositionReport
          isOpen={activeReport === "position"}
          setIsOpen={(v) => setActiveReport(v ? "position" : null)}
          disabled={!!activeReport && activeReport !== "position"}
          onSend={() => {
            setIsPreviewOpen(true);
            setActiveReport("position");
          }}
          cancelSign={cancelSignal}
        />
      </div>

      {isPreviewOpen && (
        <div className="absolute bottom-0 left-0 w-full px-2 z-50">
          <div className="bg-[#1e1e1e]/95 backdrop-blur-sm shadow-[0_-10px_10000px_rgba(43,43,43,1)] rounded-t-md border-t border-white/10">
            <ReportMessagePreview
              onCancel={handlePreviewCancel}
              onSent={handlePreviewSent}
              kind={activeReport}
              reportData={reportData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
