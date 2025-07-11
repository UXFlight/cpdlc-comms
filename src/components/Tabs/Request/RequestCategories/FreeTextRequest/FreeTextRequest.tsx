import { useContext, useEffect, useState } from "react";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import { RequestContext } from "@/context/RequestContext";
import { RequestProps } from "@/interface/props/Request";

export function FreeTextRequest({
  onSend,
  onOpen,
  disabled = false,
  cancelSign,
}: RequestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const { setRequest } = useContext(RequestContext);

  const handleSend = () => {
    setRequest({
      messageRef: "DM67",
      arguments: [text],
    });
    onSend();
    console.log("Free Text Request sent:", { value: text });
  };

  useEffect(() => {
    if (isOpen) {
      handleToggle();
    }
  }, [cancelSign]);

  const handleToggle = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    onOpen(nextOpen);
    if (!nextOpen) {
      setText("");
    } else {
      //setTargetInput("block-data-from");
    }
  };

  return (
    <RequestContainer
      requestType="ADD FREE TEXT MESSAGE"
      isOpen={isOpen}
      onToggle={handleToggle}
      showSendButton={text.length > 0}
      disabled={disabled}
      onSend={handleSend}
    >
      <div className={`flex flex-col gap-4 mt-3 ${!isOpen ? "hidden" : ""}`}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your message here..."
          className="min-h-[80px] p-2 mb-10 bg-white/5 text-white rounded resize-none"
        />
      </div>
    </RequestContainer>
  );
}
