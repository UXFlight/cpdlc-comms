import ReportSection from "./ReportSection";
import { type RowProps } from "./ReportRow";
import { useState } from "react";
import ReportsContainer from "./ReportsContainer";

export default function PositionReport() {
  const [isOpen, setIsOpen] = useState(false);

  const section1: RowProps[] = [
    { label: "RPT WPT", value: "XXXX", select: true, options: ["FIX"] },
    { label: "RPT WPT UTC", value: "15:41" },
    { label: "RPT WPT ALT", value: "8430", select: true, options: ["FIX"] },
  ];

  const section2: RowProps[] = [
    { label: "Next Fix", value: "XXXX", select: true, options: ["FIX"] },
    { label: "Next Fix UTC", value: "15:46" },
    { label: "Next Fix +1", value: "XXXX", select: true, options: ["FIX"] },
  ];

  const section3: RowProps[] = [
    { label: "Cur Pos", value: "N4515.4", select: true, options: ["LAT/LON"] },
    { label: "Cur UTC", value: "15:43" },
    { label: "Cur ALT", value: "8000" },
    { label: "Winds ALOFT", value: "331/025 T/KT" },
    { label: "OFFSET", value: "----" },
    { label: "Dest UTC", value: "15:50" },
    { label: "Temperature", value: "+03 °C" },
    { label: "Speed", value: "250" },
  ];

  return (
    <ReportsContainer
      label="Position Report"
      isOpen={isOpen}
      setIsOpen={setIsOpen}>
    <div className={`${isOpen ? "" : "hidden"}`}>
      <ReportSection rows={section1} />
      <ReportSection rows={section2} />
      <ReportSection rows={section3} />
    </div>
    </ReportsContainer>
  );
}
