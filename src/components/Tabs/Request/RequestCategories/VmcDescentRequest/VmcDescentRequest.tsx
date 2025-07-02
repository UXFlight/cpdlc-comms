import { useContext, useState } from "react";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import { RequestContext } from "@/context/RequestContext";

export function VmcDescentRequest({
  onSend,
  disabled = false,
}: {
  onSend: () => void;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const {setRequest} = useContext(RequestContext);

  const handleSend = () => {
    setRequest({messageRef: "DM69"});
    onSend();
  };

  return (
    <RequestContainer
      requestType="REQUEST VMC DESCENT"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
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
