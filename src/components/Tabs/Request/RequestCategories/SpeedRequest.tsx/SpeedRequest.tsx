import { useState } from "react";
import RequestContainer from "../../RequestContainer";
import ExtraCheckboxes from "../../AdditionalMessages";
import { ADDITIONAL_MESSAGES } from "../../../../../constants/additionalMessages";


export function SpeedRequest({ onClick, disabled = false }: { onClick: () => void; disabled?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState({ from: "FL350", to: "FL450" });
  const [extras, setExtras] = useState<string[]>([]);

  const toggleExtra = (val: string) => {
    setExtras(prev => prev.includes(val) ? prev.filter(m => m !== val) : [...prev, val]);
  };

  return (
    <RequestContainer
      requestType="SPEED REQUEST"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      showSendButton={false}
    >
      <div className={`flex flex-col gap-4 mt-3  ${isOpen ? "" : "hidden"}`}>
        <div className="flex items-center gap-4">
          <span className="text-white/80 text-sm min-w-[190px]">Speed or range of speed</span>
          <input
            type="text"
            value={range.from}
            onChange={e => setRange({ ...range, from: e.target.value })}
            className="px-2 py-1 bg-white/10 rounded text-white text-center w-[90px]"
          />
          <span className="text-white/60">to</span>
          <input
            type="text"
            value={range.to}
            onChange={e => setRange({ ...range, to: e.target.value })}
            className="px-2 py-1 bg-white/10 rounded text-white text-center w-[90px]"
          />
        </div>
        <ExtraCheckboxes extraMessages={ADDITIONAL_MESSAGES.speed_req} selected={extras} onChange={toggleExtra} />
      </div>
    </RequestContainer>
  );
}
