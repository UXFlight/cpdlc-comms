import { useEffect, useState } from "react";
import ReportsContainer from "@/components/Tabs/Reports/ReportsContainer";
import { SectionProps } from "@/interface/props/Reports";

const mockContracts = [
  { center: "KUSA001", period: 304, timeNext: 283, event: true },
  { center: "CZEG001", period: 304, timeNext: 298, event: false },
];

export default function CpdlcAds({
  isOpen,
  setIsOpen,
  disabled,
  onSend,
  cancelSign,
}: SectionProps) {
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [adsEmer, setAdsEmer] = useState("OFF");

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [cancelSign]);

  const handleSend = () => {
    onSend();
  };

  const handleClear = () => {
    setAdsEnabled(true);
    setAdsEmer("OFF");
  };

  return (
    <ReportsContainer
      label="CPDLC ADS"
      isOpen={isOpen}
      onClear={handleClear}
      setIsOpen={(v) => !disabled && setIsOpen(v)}
      disabled={disabled}
      onSend={handleSend}
      showSendButton
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
                  checked={!adsEnabled}
                  onChange={() => setAdsEnabled(false)}
                />
                <span>OFF</span>
              </label>
              <label className="flex items-center gap-2 text-white/90">
                <input
                  type="radio"
                  checked={adsEnabled}
                  onChange={() => setAdsEnabled(true)}
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
              value={adsEmer}
              onChange={(e) => setAdsEmer(e.target.value)}
              className="bg-black text-white border border-white/20 px-3 py-2 rounded-md w-full"
            >
              <option value="OFF">OFF</option>
              <option value="ON">ON</option>
            </select>
          </div>
        </div>

        <div className="uppercase mt-4 text-[14px] bg-white/15">
          ads contracts
        </div>
        <div className="text-sm">
          <div className="grid grid-cols-4 text-left font-semibold text-white/90 border-b border-white/20 pb-2">
            <div className="px-2">ATC CENTER</div>
            <div className="px-2">PERIOD</div>
            <div className="px-2">TIME TO NEXT</div>
            <div className="px-2">EVENT</div>
          </div>

          {mockContracts.map((c, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 text-left border-b border-white/10 py-2 text-white/80"
            >
              <div className="px-2">{c.center}</div>
              <div className="px-2">{c.period} SEC</div>
              <div className="px-2">{c.timeNext} SEC</div>
              <div className="px-2">{c.event ? "YES" : "NO"}</div>
            </div>
          ))}
        </div>
      </div>
    </ReportsContainer>
  );
}
