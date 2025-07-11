import { useContext, useEffect, useState } from "react";
import CustomRadio from "@/components/General/CustomRadio";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import { RequestProps } from "@/interface/props/Request";
import { InputContext } from "@/context/InputContext";

export function ClearanceRequest({
  onSend,
  onOpen,
  disabled = false,
  cancelSign,
}: RequestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setTargetInput } = useContext(InputContext);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleToggle = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    onOpen(nextOpen);
    if (!nextOpen) {
      console.log("Closing Clearance Request");
    } else {
      //setTargetInput("block-data-from");
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleToggle();
    }
  }, [cancelSign]);

  return (
    <RequestContainer
      requestType="CLEARANCE REQUEST"
      isOpen={isOpen}
      onToggle={handleToggle}
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
