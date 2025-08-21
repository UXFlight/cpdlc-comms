import { useContext, useEffect, useState } from "react";
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
  const { positionReport } = useContext(ReportContext);

  // --- AJOUTS: état "figé" + flash snapshot ---
  const [locked, setLocked] = useState(false);
  const [snap, setSnap] = useState(false);

  const reported_waypoint = [
    "FIX",
    "NONE",
    "NAVAID",
    "AIRPORT",
    "LAT/LON",
    "PLACE/BEARING/DIST",
  ];

  const section1: ReportRowProps[] = [
    {
      label: "RPT WPT",
      value: positionReport.positioncurrent,
      select: true,
      options: reported_waypoint,
    },
    {
      label: "RPT WPT UTC",
      value: positionReport.timeatpositioncurrent_sec
        ? `${positionReport.timeatpositioncurrent_sec} UTC`
        : "----",
    },
    {
      label: "RPT WPT ALT",
      value: positionReport.altitude_ft
        ? `${positionReport.altitude_ft} ft`
        : "----",
      select: true,
      options: reported_waypoint,
    },
  ];

  const section2: ReportRowProps[] = [
    {
      label: "Next Fix",
      value: positionReport.fixnext ? `${positionReport.fixnext}` : "----",
      select: true,
      options: reported_waypoint,
    },
    {
      label: "Next Fix UTC",
      value: positionReport.timeatafixnext_sec
        ? `${positionReport.timeatafixnext_sec} UTC`
        : "----",
    },
    {
      label: "Next Fix +1",
      value: positionReport.fixnextplusone
        ? `${positionReport.fixnextplusone}`
        : "----",
      select: true,
      options: reported_waypoint,
    },
  ];

  const section3: ReportRowProps[] = [
    {
      label: "Cur Pos",
      value: positionReport.positioncurrent,
      select: true,
      options: reported_waypoint,
    },
    {
      label: "Cur UTC",
      value: positionReport.timeatpositioncurrent_sec
        ? `${positionReport.timeatpositioncurrent_sec} UTC`
        : "----",
    },
    {
      label: "Cur ALT",
      value: positionReport.altitude_ft
        ? `${positionReport.altitude_ft} ft`
        : "----",
    },
    {
      label: "Winds ALOFT",
      value: `${positionReport.winds?.winddirection_deg}° ${positionReport.winds?.speed_kmh} km/h`,
    },
    { label: "OFFSET", value: "----" },
    {
      label: "Dest UTC",
      value: positionReport.timeatedestination_sec || "----",
    },
    {
      label: "Temperature",
      value: positionReport.temperature_c
        ? `${positionReport.temperature_c} °C`
        : "----",
    },
    {
      label: "Speed",
      value: positionReport.speed_kmh
        ? `${positionReport.speed_kmh} km/h`
        : "----",
    },
  ];

  useEffect(() => {
    if (isOpen) setIsOpen(false);
    // défige quand le preview est annulé/envoyé
    setLocked(false);
  }, [cancelSign]);

  // --- AJOUT: animation + freeze au clic SET ---
  const handleSend = () => {
    setSnap(true); // flash rapide
    setTimeout(() => {
      setSnap(false);
      setLocked(true); // fige la section
      onSend();
    }, 220);
  };

  return (
    <ReportsContainer
      label="Position Report"
      isOpen={isOpen}
      setIsOpen={(v) => !disabled && setIsOpen(v)}
      onSend={handleSend}
      onClear={() => {}}
      disabled={disabled || locked} // fige l’interaction
      disableSet={false}
    >
      <div className={`${isOpen ? "relative" : "hidden"}`}>
        {/* contenu figé visuellement quand locked */}
        <div
          className={`transition-all ${
            locked ? "grayscale opacity-80 pointer-events-none" : ""
          }`}
        >
          <ReportSection rows={section1} />
          <ReportSection rows={section2} />
          <ReportSection rows={section3} />
        </div>

        {/* badge snapshot */}
        {locked && (
          <div className="absolute top-2 right-2 bg-white/10 border border-white/20 rounded px-2 py-1 text-[11px] tracking-wide">
            FROZEN SNAPSHOT
          </div>
        )}

        {/* overlay flash */}
        {snap && (
          <div className="pointer-events-none absolute inset-0 bg-white/70 animate-pr-flash rounded-md" />
        )}

        {/* keyframes locales */}
        <style jsx>{`
          @keyframes pr-flash {
            0% {
              opacity: 0.85;
            }
            100% {
              opacity: 0;
            }
          }
          .animate-pr-flash {
            animation: pr-flash 220ms ease-out forwards;
          }
        `}</style>
      </div>
    </ReportsContainer>
  );
}
