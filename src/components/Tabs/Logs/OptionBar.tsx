import { useContext, useState } from "react";
import SendButton from "@/components/General/SendButton";
import { socketService } from "@/api/communications/socket/socketService";
import { LogsContext } from "@/context/LogsContext";
import ProgressSteps from "./ProgressSteps";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { MessageProps } from "@/interface/props/Logs";
import { useDelay } from "@/hooks/useDelay";
import { ActionType } from "@/constants/Tabs/Logs";

export default function OptionBar({ message }: MessageProps) {
  const [action, setAction] = useState<ActionType | null>(null);
  const [confirmAction, setConfirmAction] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const { changeStatus } = useContext(LogsContext);
  const { delay } = useDelay();

  useSocketListeners([
    {
      event: "message_loadable",
      callback: () => {
        setConfirmAction(true);
        setShowProgress(true);
      }
    }
  ]);

  const handleRequest = () => {
    switch (action) {
      case "standby":
        changeStatus(message.id, "standby");
        break;
      case "accept":
        changeStatus(message.id, "accepted");
        break;
      case "reject":
        changeStatus(message.id, "rejected");
        break;
      case "load":
        changeStatus(message.id, "accepted");
        break;
      default:
        console.error("Unknown action:", action);
    }
  };

  const handleSend = async () => {
    handleRequest();
    await delay(2000);
    socketService.send("fms_loaded", { logId: message.id });
  };

  return (
    <div>
      {action === "load" && showProgress && <ProgressSteps />}
      
      <div className="flex justify-center w-full overflow-x-hidden">
        <div className="flex flex-col items-center justify-center w-full h-auto bg-nav-bar border border-[2px] border-white-10 rounded-md py-[16px] px-[15.5px] gap-2">
          
          <div className="flex flex-row gap-[31px] border border-[2px] border-white-10 rounded-md items-center justify-around w-[538px] h-[74px] py-[16px] px-[15.5px] bg-nav-bar">
            {[ActionType.Load, ActionType.Standby, ActionType.Reject, ActionType.Accept].map((item) => (
              <div
                key={item}
                className={`logs-options bg-white-10 px-4 py-2 rounded cursor-pointer ${
                  action === item
                    ? "border-2 border-dark-blue"
                    : "border border-transparent"
                }`}
                onClick={() => {
                  const selected = item as ActionType;
                  setAction(selected);

                  if (selected !== "load") {
                    setShowProgress(false);
                    setConfirmAction(true);
                  } else {
                    socketService.send("load_message", { logId: message.id });
                  }
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {action && confirmAction && (
            <SendButton onSend={handleSend} />
          )}
        </div>
      </div>
    </div>
  );
}
