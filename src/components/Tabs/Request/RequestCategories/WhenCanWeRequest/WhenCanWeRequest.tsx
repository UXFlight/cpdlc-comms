import { useState } from "react";
import CustomRadio from "../../../../General/CustomRadio";
import RequestContainer from "../../RequestContainer";

export function WhenCanWeRequest({ onClick, disabled = false }: { onClick: () => void; disabled?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <RequestContainer
      requestType="WHEN CAN WE"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      showSendButton={false}
      disabled={disabled}
      onSend={() => {
        onClick();
        setIsOpen(false);
      }}
    >
      <div className={`flex flex-col gap-4 mt-3 ${!isOpen ? "hidden" : ""}`}>
        <CustomRadio
          label="Change Altitude"
          value="change_altitude"
          selected={selectedOption || ""}
          onChange={setSelectedOption}
        />
        <CustomRadio
          label="Climb/Descend to Altitude"
          value="climb_descend"
          selected={selectedOption || ""}
          onChange={setSelectedOption}
        />
        <CustomRadio
          label="Speed or range of speed"
          value="speed_range"
          selected={selectedOption || ""}
          onChange={setSelectedOption}
        />
        <CustomRadio
          label="Back on Route"
          value="back_on_route"
          selected={selectedOption || ""}
          onChange={setSelectedOption}
        />
      </div>
    </RequestContainer>
  );
}