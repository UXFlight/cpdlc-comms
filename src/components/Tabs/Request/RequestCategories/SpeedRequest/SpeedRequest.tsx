import { useContext, useState } from "react";
import AdditionalMessages from "@/components/Tabs/Request/AdditionalMessages";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import { RequestProps } from "@/interface/props/Request";
import { ADDITIONAL_MESSAGES, RequestCategory } from "@/constants/tabs/Request";
import BlockData from "@/components/Tabs/Request/BlockData";
import { RequestContext } from "@/context/RequestContext";
import { resolveMessageRef } from "@/utils/messageIdentification";

export function SpeedRequest({ onSend, disabled = false }: RequestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const { request, setRequest } = useContext(RequestContext);

  const toggleExtra = (val: string) => {
    setExtras((prev) =>
      prev.includes(val) ? prev.filter((m) => m !== val) : [...prev, val],
    );
  };

  const handleSend = () => {
    if (!from) return;
    const args = to ? [from, to] : [from];
    const newRequest = { ...request, arguments: args };
    const ref = resolveMessageRef(RequestCategory.SPEED, newRequest);
    setRequest({ ...newRequest, messageRef: ref, additional: extras });
    onSend();
  };

  return (
    <RequestContainer
      requestType="SPEED REQUEST"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      showSendButton={!!(from.length === 5)}
      onSend={handleSend}
      disabled={disabled}
    >
      <div className={`flex flex-col gap-4 mt-3  ${isOpen ? "" : "hidden"}`}>
        <BlockData
          label="Speed or range of speed"
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          isOpen={isOpen}
          disabled={disabled}
        />
        <AdditionalMessages
          extraMessages={ADDITIONAL_MESSAGES.speed_req}
          selected={extras}
          onChange={toggleExtra}
        />
      </div>
    </RequestContainer>
  );
}
