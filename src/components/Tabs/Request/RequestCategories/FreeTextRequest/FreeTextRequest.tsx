import { useContext, useState } from "react";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import { RequestContext } from "@/context/RequestContext";
import { RequestProps } from "@/interface/props/Request";

export function FreeTextRequest({
  onSend,
  disabled = false,
}: RequestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const { setRequest } = useContext(RequestContext);

  const handleSend = () => {
    setRequest({
      arguments: [text],
      messageRef: "FREE_TEXT",
    });
    setIsOpen(false);
    onSend();
  };

  return (
    <RequestContainer
      requestType="ADD FREE TEXT MESSAGE"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      showSendButton={false}
      disabled={disabled}
      onSend={handleSend}
    >
      <div className={`flex flex-col gap-4 mt-3 ${!isOpen ? "hidden" : ""}`}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your message here..."
          className="min-h-[120px] p-2 bg-white/5 text-white rounded resize-none"
        />
      </div>
    </RequestContainer>
  );
}
