import { use, useContext, useEffect } from "react";
import ReportsContainer from "@/components/Tabs/Reports/ReportsContainer";
import ReportSection from "@/components/Tabs/Reports/PositionReport/ReportSection";
import { ReportRowProps, SectionProps } from "@/interface/props/Reports";
import { ReportContext } from "@/context/ContractContext";

export default function PositionReport({
  isOpen,
  setIsOpen,
  disabled,
  onSend,
  cancelSign,
}: SectionProps) {
  const {positionReports} = useContext(ReportContext);

  useEffect(() => {
    console.log("Position reports updated:", positionReports);
  }, [positionReports]);

  const reported_waypoint = ["FIX", "NONE", "NAVAID", "AIRPORT", "LAT/LON", "PLACE/BEARING/DIST"];

  const section1: ReportRowProps[] = [
    { label: "RPT WPT", value: positionReports[0].positioncurrent, select: true, options: reported_waypoint },
    { label: "RPT WPT UTC", value: positionReports[0].timeatpositioncurrent_sec ? `${positionReports[0].timeatpositioncurrent_sec} UTC` : "----"},
    { label: "RPT WPT ALT", value: positionReports[0].altitude_ft ? `${positionReports[0].altitude_ft} ft` : "----", select: true, options: reported_waypoint},
  ];

  const section2: ReportRowProps[] = [
    { label: "Next Fix", value: positionReports[0].fixnext ? `${positionReports[0].fixnext}` : "----", select: true, options: reported_waypoint },
    { label: "Next Fix UTC", value: positionReports[0].timeatafixnext_sec ? `${positionReports[0].timeatafixnext_sec} UTC` : "----" },
    { label: "Next Fix +1", value: positionReports[0].fixnextplusone ? `${positionReports[0].fixnextplusone}` : "----", select: true, options: reported_waypoint },
  ];

  const section3: ReportRowProps[] = [
    { label: "Cur Pos", value: positionReports[0].positioncurrent, select: true, options: reported_waypoint },
    { label: "Cur UTC", value: positionReports[0].timeatpositioncurrent_sec ? `${positionReports[0].timeatpositioncurrent_sec} UTC` : "----"},
    { label: "Cur ALT", value: positionReports[0].altitude_ft ? `${positionReports[0].altitude_ft} ft` : "----"},
    { label: "Winds ALOFT", value: `${positionReports[0].winds?.winddirection_deg}° ${positionReports[0].winds?.speed_kmh} km/h`},
    { label: "OFFSET", value: "----" },
    { label: "Dest UTC", value: positionReports[0].timeatedestination_sec || "----" },
    { label: "Temperature", value: positionReports[0].temperature_c ? `${positionReports[0].temperature_c} °C` : "----" },
    { label: "Speed", value: positionReports[0].speed_kmh ? `${positionReports[0].speed_kmh} km/h` : "----" },
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
