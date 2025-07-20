import { useEffect, useState } from "react";
import ReportsContainer from "@/components/Tabs/Reports/ReportsContainer";
import ReportSection from "@/components/Tabs/Reports/PositionReport/ReportSection";
import { ReportRowProps, SectionProps } from "@/interface/props/Reports";

export default function PositionReport({ isOpen, setIsOpen, disabled, onSend, cancelSign }: SectionProps) {

  const section1: ReportRowProps[] = [
    { label: "RPT WPT", value: "XXXX", select: true, options: ["FIX"] },
    { label: "RPT WPT UTC", value: "15:41" },
    { label: "RPT WPT ALT", value: "8430", select: true, options: ["FIX"] },
  ];

  const section2: ReportRowProps[] = [
    { label: "Next Fix", value: "XXXX", select: true, options: ["FIX"] },
    { label: "Next Fix UTC", value: "15:46" },
    { label: "Next Fix +1", value: "XXXX", select: true, options: ["FIX"] },
  ];

  const section3: ReportRowProps[] = [
    { label: "Cur Pos", value: "N4515.4", select: true, options: ["LAT/LON"] },
    { label: "Cur UTC", value: "15:43" },
    { label: "Cur ALT", value: "8000" },
    { label: "Winds ALOFT", value: "331/025 T/KT" },
    { label: "OFFSET", value: "----" },
    { label: "Dest UTC", value: "15:50" },
    { label: "Temperature", value: "+03 °C" },
    { label: "Speed", value: "250" },
  ];

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [cancelSign]);

  const handleSend = () => {
    onSend();
  };

  return (
    <ReportsContainer
      label="Position Report"
      isOpen={isOpen}
      setIsOpen={(v) => !disabled && setIsOpen(v)}
      onSend={handleSend}
      onClear={() => {}}
      disabled={disabled}
      showSendButton
    >
      <div className={`${isOpen ? "" : "hidden"}`}>
        <ReportSection rows={section1} />
        <ReportSection rows={section2} />
        <ReportSection rows={section3} />
      </div>
    </ReportsContainer>
  );
}
