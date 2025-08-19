// components/Tabs/Request/ReportMessagePreview.tsx
import { useContext, useState } from "react";
import { RequestContext } from "@/context/RequestContext";
import { ReportContext } from "@/context/ContractContext";
import { FlightContext } from "@/context/FlightContext";
import { socketService } from "@/api/communications/socket/socketService";
import { useDelay } from "@/hooks/useDelay";
import PreviewShell from "@/components/General/PreviewShell";

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

    switch (kind) {
      case "cpdlc":
        console.log("je suis au bon endroit");
        socketService.send(reportData.event);
        if (reportData.message.includes("Emergency")) {
          reportData.message.includes("enable")
            ? setAdsEmergency("ON")
            : setAdsEmergency("OFF");
        } else {
          reportData.message.includes("enable")
            ? setAdsEnabled(true)
            : setAdsEnabled(false);
        }
        break;

      case "emergency":
        socketService.send("emergency_report", {
          request,
          emergencyData,
        });
        break;

      case "index":
      case "monitoring":
      case "position":
        // TODO: envoi spécifique à implémenter si besoin
        break;

      default:
        break;
    }

    simulateDelay();
  };

  const mainText =
    kind === "emergency"
      ? request.formattedMessage || "" // si tu la renseignes côté tab
      : reportData?.message || "";

  const badges = request.additional || [];

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
