import { useContext, useEffect, useState } from "react";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import { RequestContext } from "@/context/RequestContext";
import AdditionalMessages from "../../AdditionalMessages";
import { ADDITIONAL_MESSAGES } from "@/constants/tabs/Request";
import { RequestProps } from "@/interface/props/Request";
import CharacterInput from "@/components/General/CharacterInput";

export function VoiceContactRequest({
  onSend,
  onOpen,
  disabled = false,
  cancelSign,
}: RequestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [frequency, setFrequency] = useState<string>("");
  const { setRequest } = useContext(RequestContext);

  const handleSend = () => {
    const args = frequency ? [frequency] : [];
    const ref = args.length > 0 ? "DM21" : "DM20";
    setRequest({
      messageRef: ref,
      arguments: args,
    });
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
      setFrequency("");
    }
    //setTargetInput("offset-distance");
  };

  return (
    <RequestContainer
      requestType="REQUEST VOICE CONTACT"
      isOpen={isOpen}
      onToggle={handleToggle}
      showSendButton={isOpen}
      disabled={disabled}
      onSend={handleSend}
    >
      <div>
        <div className={`flex flex-row gap-1.5 ${isOpen ? "pb-8" : ""}`}>
          <span className="flex items-center h-[35px] text-white/80 text-[16px] uppercase">
            Request voice contact
          </span>
          <div
            className={`flex flex-row items-center gap-1 ${frequency.length > 0 ? "" : "text-white/30"}`}
          >
            <p className="uppercase text-[16px]">At frequency :</p>
            <CharacterInput
              name="voice-contact-frequency"
              value={frequency}
              onChange={setFrequency}
              style="w-[48px]"
              length={3}
              disabled={!isOpen || disabled}
            />
          </div>
        </div>
      </div>
      <div></div>
    </RequestContainer>
  );
}
