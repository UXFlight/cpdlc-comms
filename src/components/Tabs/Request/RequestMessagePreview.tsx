// components/Tabs/Request/RequestMessagePreview.tsx
import { useContext, useEffect, useState } from "react";
import { RequestContext } from "@/context/RequestContext";
import { socketService } from "@/api/communications/socket/socketService";
import { MessageService } from "@/api/services/messageService";
import { useDelay } from "@/hooks/useDelay";
import PreviewShell from "@/components/General/PreviewShell";

export default function RequestMessagePreview({
  onCancel,
  onSent,
}: {
  onCancel: () => void;
  onSent: () => void;
}) {
  const { request, setRequest, resetRequest } = useContext(RequestContext);
  const [isSending, setIsSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const { delay } = useDelay();

  // fetch/normalize formattedMessage for requests
  useEffect(() => {
    if (!request?.formattedMessage) {
      MessageService.getFormattedMessage(request)
        .then((res) => setRequest({ formattedMessage: res.message }))
        .catch((e) => console.error("Error fetching formatted message:", e));
    }
  }, []); // eslint-disable-line

  const addMessageLog = () => {
    socketService.send("add_log", {
      log_entry: request,
      thread_id: "",
    });
  };

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
    onSent();
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
    <PreviewShell
      isSending={isSending}
      isSent={isSent}
      sendingProgress={sendingProgress}
      mainText={request.formattedMessage || ""}
      badges={request.additional || []}
      onCancel={handleCancel}
      onSend={handleSend}
      sendingLabel={`Sending ${request.formattedMessage || "message"} ...`}
    />
  );
}
