import { useEffect, useState } from "react";
import ReportsContainer from "@/components/Tabs/Reports/ReportsContainer";
import ReportsInput from "./ReportsInput";
import { SectionProps } from "@/interface/props/Reports";

const facilityOptions = [
  "CENTER",
  "APPROACH",
  "TOWER",
  "FINAL",
  "GROUND CONTROL",
  "CLEARANCE DELIVERY",
  "DEPARTURE",
  "CONTROL",
  "RADIO",
];

export default function Monitoring({ disabled, onSend, cancelSign }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [facility, setFacility] = useState("");
  const [designation, setDesignation] = useState("");
  const [vhf, setVhf] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
      handleClear();
    }
  }, [cancelSign]);

  const handleClear = () => {
    setFacility("");
    setDesignation("");
    setName("");
    setVhf("");
  };

  const handleSend = () => {
    onSend();
    handleClear();
  };

  return (
    <ReportsContainer
      label="Monitoring"
      isOpen={isOpen}
      setIsOpen={(v) => !disabled && setIsOpen(v)}
      onClear={handleClear}
      onSend={handleSend}
      disabled={disabled}
      showSendButton
    >
      <div className={`${isOpen ? "space-y-4 p-4" : "hidden"}`}>
        <div className="space-y-3 text-white">
          <ReportsInput
            label="FACILITY DESIGNATION"
            value={designation}
            onChange={(val) => setDesignation(val.toUpperCase())}
            placeholder="e.g., CYUL"
          />

          <ReportsInput
            label="FACILITY NAME"
            value={name}
            onChange={(val) => setName(val.toUpperCase())}
            placeholder="e.g., YUL"
          />

          <ReportsInput
            label="VHF"
            value={vhf}
            onChange={setVhf}
            placeholder="e.g., 118.900"
          />

          <div className="flex flex-row items-center gap-4">
            <label className="w-[180px] text-sm text-right">FACILITY</label>
            <select
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              className="bg-black text-white border border-white/20 px-2 py-1 rounded-md w-full"
            >
              <option value="">Select...</option>
              {facilityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </ReportsContainer>
  );
}
