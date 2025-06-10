import { useState } from "react";
import RequestContainer from "../../RequestContainer";

export function VmcDescentRequest({ onClick, disabled = false }: { onClick: () => void; disabled?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RequestContainer
      requestType="REQUEST VMC DESCENT"
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
        <span className="text-white/80 text-sm">Request VMC Descent</span>
      </div>
    </RequestContainer>
  );
}
