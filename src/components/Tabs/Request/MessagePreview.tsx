import { useContext, useEffect, useState } from "react";
import { RequestContext } from "@/context/RequestContext";
import SendButton from "@/components/General/SendButton";
import { MessageService } from "@/api/services/messageService";
import { socketService } from "@/api/communications/socket/socketService";
import { useDelay } from "@/hooks/useDelay";
import { MessagePreviewProps } from "@/interface/props/Request";
import { FlightContext } from "@/context/FlightContext";

export default function MessagePreview({
  onCancel,
  onSent,
}: MessagePreviewProps) {
  const { request, setRequest, resetRequest } = useContext(RequestContext);
  const { flightDetails } = useContext(FlightContext);
  const [isSending, setIsSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const { delay } = useDelay();

  useEffect(() => {
    MessageService.getFormattedMessage(request)
      .then((res) => {
        setRequest({ formattedMessage: res.message });
      })
      .catch((error) => {
        console.error("Error fetching formatted message:", error);
      });
  }, []);

  const simulateDelay = async () => {
    const interval = setInterval(() => {
      setSendingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    await delay(1250);
    setIsSending(false);
    setIsSent(true);
    setSendingProgress(0);

    await delay(2000);
    if (onSent) onSent();
  };

  const addMessageLog = () => {
    socketService.send("add_log", {
      flight_id: flightDetails.flightInfo.flightId,
      request: request,
    });
  };

  const handleCancel = () => {
    onCancel();
    setIsSending(false);
    setIsSent(false);
    resetRequest();
  };

  const handleSend = async () => {
    setIsSending(true);
    addMessageLog();
    simulateDelay();
  };

  return (
    <div
      className="relative flex flex-col w-full p-4 gap-4 
                 border-[3px] border-[#539fda]
                 rounded-lg 
                 bg-gradient-to-b from-[#1e1e1e] to-[#1a1a1a] 
                 text-white shadow-sm overflow-hidden"
    >
      {isSending && (
        <div
          className="absolute top-0 left-0 h-full z-0 transition-all duration-200 ease-linear"
          style={{
            width: `${sendingProgress}%`,
            background:
              "linear-gradient(90deg, rgba(83,159,218,0.15) 0%, rgba(59,150,115,0.15) 100%)",
          }}
        />
      )}

      <div className="relative z-10 flex flex-col gap-4">
        <p className="text-white-500 font-noto text-base not-italic font-normal leading-none uppercase">
          Preview
        </p>
        {!isSending && !isSent && (
          <div>
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
          </div>
        )}
        {isSending && (
          <div className="flex items-center justify-center h-[60px] w-full">
            <p className="text-white text-lg font-semibold uppercase tracking-wide text-center">
              Sending {request.formattedMessage} ...
            </p>
          </div>
        )}{" "}
        {!isSent && !isSending && (
          <div className="flex w-full gap-4">
            <button
              className={`flex-1 px-4 py-2 rounded bg-white-20 hover:bg-white-10 cursor-pointer text-white-80 font-semibold tracking-wide uppercase`}
              onClick={handleCancel}
            >
              Cancel
            </button>

            <SendButton onSend={handleSend} />
          </div>
        )}
        {isSent && (
          <div className="flex items-center justify-center h-[60px] w-full">
            <p className="text-green text-lg font-semibold uppercase tracking-wide text-center">
              Message sent successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
