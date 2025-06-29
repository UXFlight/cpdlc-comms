import { useState } from "react";
import CustomRadio from "@/components/General/CustomRadio";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import { RequestProps } from "@/interface/props/Request";

export function ClearanceRequest({
  onSend,
  disabled = false,
}: RequestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <RequestContainer
      requestType="CLEARANCE REQUEST"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      showSendButton={false}
      disabled={disabled}
      onSend={() => {
        onSend();
        setIsOpen(false);
      }}
    >
      <div className={`flex flex-col gap-4 mt-3 ${!isOpen ? "hidden" : ""}`}>
        <CustomRadio
          label="Clearance"
          value="clearance"
          selected={selectedOption || ""}
          onChange={setSelectedOption}
        />
        <CustomRadio
          label="Flight Plan"
          value="flight_plan"
          selected={selectedOption || ""}
          onChange={setSelectedOption}
        />
        <CustomRadio
          label="Procedure type"
          value="procedure_type"
          selected={selectedOption || ""}
          onChange={setSelectedOption}
        />
      </div>
    </RequestContainer>
  );
}
