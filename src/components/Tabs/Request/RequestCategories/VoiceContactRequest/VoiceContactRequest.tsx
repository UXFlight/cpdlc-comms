import { useContext, useState } from "react";
import RequestContainer from "../../RequestContainer";
import { RequestContext } from "../../../../../context/RequestContext";

export function VoiceContactRequest({
  onSend,
  disabled = false,
}: {
  onSend: () => void;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [atFrequency, setAtFrequency] = useState(true);
  const [frequency, setFrequency] = useState("120 Hz");
  const { setRequest } = useContext(RequestContext);

  const handleSend = () => {
    setRequest({
      arguments: ["voice_contact", atFrequency ? frequency : ""],
      messageRef: "VOICE_CONTACT",
      timeStamp: new Date(),
    });
    setIsOpen(false);
    onSend();
  };

  return (
    <RequestContainer
      requestType="REQUEST VOICE CONTACT"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      showSendButton={false}
      disabled={disabled}
      onSend={handleSend}
    >
      <div className={`flex flex-col gap-4 mt-3 ${!isOpen ? "hidden" : ""}`}>
        <span className="text-white/80 text-sm">Request voice contact</span>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none text-white/80 text-sm">
            <input
              type="checkbox"
              checked={atFrequency}
              onChange={() => setAtFrequency(!atFrequency)}
            />
            <span className="font-semibold">At frequency</span>
          </label>
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="px-2 py-1 bg-white/10 rounded text-white text-center w-[100px]"
            disabled={!atFrequency}
          />
        </div>
      </div>
    </RequestContainer>
  );
}
