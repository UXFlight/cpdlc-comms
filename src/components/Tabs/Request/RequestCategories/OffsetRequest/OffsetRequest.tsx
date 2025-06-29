import { useState } from "react";
import RequestContainer from "../../RequestContainer";
import CustomRadio from "../../../../General/CustomRadio";
import ExtraCheckboxes from "../../AdditionalMessages";
import { ADDITIONAL_MESSAGES } from "../../../../../constants/additionalMessages";

type Props = {
  onSend: () => void;
  disabled?: boolean;
};

export function OffsetRequest({ onSend, disabled = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [offset, setOffset] = useState("FL350");
  const [step, setStep] = useState<"position" | "time" | null>(null);
  const [stepValue, setStepValue] = useState("FL450");
  const [extras, setExtras] = useState<string[]>([]);

  const toggleExtra = (val: string) => {
    setExtras((prev) =>
      prev.includes(val) ? prev.filter((m) => m !== val) : [...prev, val],
    );
  };

  return (
    <RequestContainer
      requestType="OFFSET REQUEST"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      showSendButton={false}
    >
      <div className={`flex flex-col gap-4 mt-3 ${isOpen ? "" : "hidden"}`}>
        <div className="flex items-center gap-4">
          <span className="text-white/80 text-sm min-w-[190px]">
            Offset distance and direction
          </span>
          <input
            type="text"
            value={offset}
            onChange={(e) => setOffset(e.target.value)}
            className="px-2 py-1 bg-white/10 rounded text-white text-center w-[100px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white/80 text-sm font-medium">Step at</p>
          <div className="flex gap-8">
            <CustomRadio
              label="Position"
              value="position"
              selected={step || ""}
              onChange={() => setStep("position")}
            />
            <CustomRadio
              label="Time"
              value="time"
              selected={step || ""}
              onChange={() => setStep("time")}
            />
            <input
              type="text"
              value={stepValue}
              onChange={(e) => setStepValue(e.target.value)}
              className="px-2 py-1 bg-white/10 rounded text-white text-center w-[100px] ml-4"
            />
          </div>
        </div>
        <ExtraCheckboxes
          extraMessages={ADDITIONAL_MESSAGES.offset_req}
          selected={extras}
          onChange={toggleExtra}
        />
      </div>
    </RequestContainer>
  );
}
