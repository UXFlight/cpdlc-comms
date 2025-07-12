import { use, useContext, useEffect, useState } from "react";
import { RequestContext } from "@/context/RequestContext";
import SendButton from "@/components/General/SendButton";
import { MessageService } from "@/api/services/messageService";
import { socketService } from "@/api/communications/socket/socketService";
import { GlobalContext } from "@/context/GlobalContext";
import { useDelay } from "@/hooks/useDelay";
import { MessagePreviewProps } from "@/interface/props/Request";
import { FlightContext } from "@/context/FlightContext";

export default function MessagePreview({ onCancel }: MessagePreviewProps) {
  const { request, setRequest, resetRequest } = useContext(RequestContext);
  const { flightDetails } = useContext(FlightContext);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { delay } = useDelay();

  useEffect(() => {
    if (isSending) {
      simulateDelay();
    }
  }, [isSending]);

  useEffect(() => {
    console.log("Fetching formatted message for request:", request);
    MessageService.getFormattedMessage(request)
      .then((res) => {
        console.log("Formatted message:", res.message);
        setRequest({ formattedMessage: res.message });
      })
      .catch((error) => {
        console.error("Error fetching formatted message:", error);
      });
  }, []);

  const simulateDelay = async () => {
    await delay(2000);
    setIsSent(true);
    setIsSending(false);
  };

  const addMessageLog = () => {
    socketService.send("add_log", {
      flight_id: flightDetails.flightInfo.flightId,
      request: request,
    });
  };

  useEffect(() => {
    console.log("Sending message:", request);
    0;
  }, [request]);

  const handleCancel = () => {
    onCancel();
    setIsSending(false);
    setIsSent(false);
    resetRequest();
  };

  return (
    <div
      className="flex flex-col w-full p-4 gap-4 
                 border-[3px] border-[#539fda]
                 rounded-lg 
                 bg-gradient-to-b from-[#1e1e1e] to-[#1a1a1a] 
                 text-white shadow-sm"
    >
      <p className="text-white-500 font-noto text-base not-italic font-normal leading-none uppercase">
        Preview
      </p>

      <div className="w-full px-4 py-3 rounded border-2 border-white-10 bg-medium-gray text-white-100 text-base">
        {request.formattedMessage}
      </div>
      {request.additional && request.additional.length > 0 && (
        <div className="flex flex-col gap-2 w-full px-4 py-3 mt-[-18px] rounded border-2 border-white-10 bg-medium-gray text-white/90 text-base">
          <ul className="flex flex-wrap gap-2">
            {request.additional.map((msg, idx) => (
              <li
                key={idx}
                className="bg-[#2c3832] text-green font-mono text-xs px-3 py-1 rounded shadow-sm shadow-black/20"
              >
                {msg}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex w-full gap-4">
        <button
          className={`flex-1 px-4 py-2 rounded bg-white-20 ${isSent ? "" : "hover:bg-white-10 cursor-pointer"}  text-white-80 font-semibold tracking-wide uppercase`}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <SendButton
          onSend={() => {
            setIsSending(true);
            addMessageLog();
          }}
        />
      </div>
    </div>
  );
}
