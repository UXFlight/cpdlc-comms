import { useContext, useEffect, useState } from "react";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import { RequestContext } from "@/context/RequestContext";
import { RequestProps } from "@/interface/props/Request";

export function VmcDescentRequest({
  onSend,
  onOpen,
  disabled = false,
  cancelSign,
}: RequestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setRequest } = useContext(RequestContext);

  const handleSend = () => {
    setRequest({ messageRef: "DM69" });
    onSend();
  };

  useEffect(() => {
    if (isOpen) {
      handleToggle();
    }
  }, [cancelSign]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpen(newState);
    if (!newState) {
      //a suivre;
    }
    //setTargetInput("offset-distance");
  };

  return (
    <RequestContainer
      requestType="REQUEST VMC DESCENT"
      isOpen={isOpen}
      onToggle={handleToggle}
      showSendButton={isOpen}
      disabled={disabled}
      onSend={handleSend}
    >
      <div
        className={`flex items-center text-white/80 text-[16px] h-[35px] uppercase ${isOpen ? "mb-4" : ""}`}
      >
        Request VMC Descent
      </div>
    </RequestContainer>
  );
}
