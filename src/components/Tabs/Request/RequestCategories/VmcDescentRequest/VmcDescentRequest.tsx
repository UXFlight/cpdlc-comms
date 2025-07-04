import { useContext, useState } from "react";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import { RequestContext } from "@/context/RequestContext";
import { RequestProps } from "@/interface/props/Request";

export function VmcDescentRequest({
  onSend,
  onOpen,
  disabled = false,
}:
  RequestProps
) {
  const [isOpen, setIsOpen] = useState(false);
  const {setRequest} = useContext(RequestContext);

  const handleSend = () => {
    setRequest({messageRef: "DM69"});
    onSend();
  };

   const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpen(newState)
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
      showSendButton={true}
      disabled={disabled}
      onSend={handleSend}
    >
      <div className={`flex flex-col gap-4 mt-3 ${!isOpen ? "hidden" : ""}`}>
        <span className="text-white/80 text-[16px] uppercase">Request VMC Descent</span>
      </div>
    </RequestContainer>
  );
}
