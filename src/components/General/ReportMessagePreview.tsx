// components/Tabs/Request/ReportMessagePreview.tsx
import { useContext, useState } from "react";
import { RequestContext } from "@/context/RequestContext";
import { ReportContext } from "@/context/ContractContext";
import { socketService } from "@/api/communications/socket/socketService";
import { useDelay } from "@/hooks/useDelay";
import PreviewShell from "@/components/General/PreviewShell";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ReportMessagePreview({
  onCancel,
  onSent,
  kind,
  reportData,
}: {
  onCancel: () => void;
  onSent: () => void;
  kind: string | null;
  reportData: any;
}) {
  const { request } = useContext(RequestContext);
  const { emergencyData, setAdsEmergency, setAdsEnabled } =
    useContext(ReportContext);
  const { delay } = useDelay();

  const [isSending, setIsSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [isSent, setIsSent] = useState(false);

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
  };

  const handleSend = async () => {
    setIsSending(true);

    const requestSnap = { ...request };
    const emergencySnap = { ...emergencyData };
    const payloadSnap = reportData ? { ...reportData } : null;

    switch (kind) {
      case "cpdlc": {
        socketService.send(payloadSnap?.event);
        if (payloadSnap?.message?.includes("Emergency")) {
          setAdsEmergency(
            payloadSnap.message.includes("enable") ? "ON" : "OFF",
          );
        } else {
          setAdsEnabled(Boolean(payloadSnap?.message?.includes("enable")));
        }
        break;
      }

      case "emergency": {
        socketService.send("emergency_report", {
          request: requestSnap,
          emergencyData: emergencySnap,
        });
        break;
      }

      case "monitoring": {
        socketService.send("monitoring_report", payloadSnap);
        break;
      }

      case "index": {
        socketService.send("index_report", payloadSnap);
      }
      case "position":
        socketService.send("position_report", payloadSnap);
        break;

      default:
        break;
    }

    simulateDelay();
  };

  const mainText =
    kind === "emergency"
      ? request.formattedMessage || ""
      : reportData?.message || "";

  const badges = reportData?.badges ?? (request.additional || []);

  return (
    <PreviewShell
      isSending={isSending}
      isSent={isSent}
      sendingProgress={sendingProgress}
      mainText={mainText}
      badges={badges}
      onCancel={handleCancel}
      onSend={handleSend}
      sendingLabel={`Sending ${mainText || kind} ...`}
    />
  );
}
