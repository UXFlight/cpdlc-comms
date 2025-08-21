import { useContext, useEffect, useState } from "react";
import ReportsContainer from "@/components/Tabs/Reports/ReportsContainer";
import { SectionProps } from "@/interface/props/Reports";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { ADSCContract, ReportContext } from "@/context/ContractContext";

export default function AdsContract({
  isOpen,
  setIsOpen,
  disabled,
  onSend,
  cancelSign,
}: SectionProps) {
  const { adscContracts, setAdscContracts, adsEmergency, adsEnabled } =
    useContext(ReportContext);
  const [tempAdscEnable, setTempAdscEnable] = useState(true);
  const [tempAdscEmergency, setTempAdscEmergency] = useState("OFF");

  useEffect(() => {
    if (!cancelSign) return;
    if (isOpen) setIsOpen(false);
    setTempAdscEmergency(adsEmergency);
    setTempAdscEnable(adsEnabled);
  }, [cancelSign]);

  useEffect(() => {
    setTempAdscEmergency(adsEmergency);
    setTempAdscEnable(adsEnabled);
  }, []);

  useSocketListeners([
    {
      event: "adsc_countdown",
      callback: (data: ADSCContract[]) => {
        setAdscContracts(data);
      },
    },
  ]);

  const handleSend = () => {
    let message;
    let event;
    if (tempAdscEnable != adsEnabled) {
      message = `Are you sure you want to ${tempAdscEnable ? "enable" : "disable"} ADS-C?`;
      event = `ads_c_${tempAdscEnable ? "enabled" : "disabled"}`;
    } else if (tempAdscEmergency != adsEmergency) {
      message = `Are you sure you want to ${tempAdscEmergency === "ON" ? "enable" : "disable"} ADS-C Emergency?`;
      event = `ads_c_emergency_${tempAdscEmergency === "ON" ? "on" : "off"}`;
    }
    const payload = {
      message,
      event,
    };
    onSend(payload);
  };

  const handleClear = () => {
    setTempAdscEnable(adsEnabled);
    setTempAdscEmergency(adsEmergency);
  };

  return (
    <ReportsContainer
      label="CPDLC ADS"
      isOpen={isOpen}
      onClear={handleClear}
      setIsOpen={(v) => !disabled && setIsOpen(v)}
      disabled={disabled}
      onSend={handleSend}
      disableSet={
        tempAdscEmergency === adsEmergency && tempAdscEnable === adsEnabled
      }
    >
      <div className="flex flex-col gap-4 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative border border-3 border-white/20 rounded-md px-4 pt-5 pb-3">
            <div className="absolute -top-3 left-4 bg-[#1e1e1e] px-2 text-sm font-semibold text-white/70 tracking-wide">
              ADS-C
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-white/90">
                <input
                  type="radio"
                  checked={!tempAdscEnable}
                  onChange={() => setTempAdscEnable(false)}
                />
                <span>OFF</span>
              </label>
              <label className="flex items-center gap-2 text-white/90">
                <input
                  type="radio"
                  checked={tempAdscEnable}
                  onChange={() => setTempAdscEnable(true)}
                />
                <span>ON</span>
              </label>
            </div>
          </div>

          <div className="relative border border-3 border-white/20 rounded-md px-4 pt-5 pb-3">
            <div className="absolute -top-3 left-4 bg-[#1e1e1e] px-2 text-sm font-semibold text-white/70 tracking-wide">
              ADS-C EMER
            </div>
            <select
              value={tempAdscEmergency}
              onChange={(e) => setTempAdscEmergency(e.target.value)}
              className="bg-black text-white border border-white/20 px-3 py-2 rounded-md w-full"
            >
              <option value="OFF">OFF</option>
              <option value="ON">ON</option>
            </select>
          </div>
        </div>

        <div className="uppercase mt-4 pl-2 text-[16px] bg-white/15">
          ads contracts
        </div>
        <div className="text-sm">
          <div className="grid grid-cols-4 text-left font-normal text-[12px] text-white/60 border-b border-white/20">
            <div className="px-2">ATC CENTER</div>
            <div className="px-2">PERIOD</div>
            <div className="px-2">TIME TO NEXT</div>
            <div className="px-2">EVENT</div>
          </div>

          {adscContracts.map((c, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 text-left border-b border-white/10 py-2 text-white/90"
            >
              <div className="px-2">{c.center}</div>
              <div className="px-2">{c.period} SEC</div>
              <div className="px-2">{c.time_Next} SEC</div>
              <div className="px-2">{c.is_Active ? "YES" : "NO"}</div>
            </div>
          ))}
        </div>
      </div>
    </ReportsContainer>
  );
}
