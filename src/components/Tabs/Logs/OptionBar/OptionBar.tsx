import { useContext, useState } from "react";
import { socketService } from "@/api/communications/socket/socketService";
import { LogsContext } from "@/context/LogsContext";
import ProgressSteps from "../ProgressSteps";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { MessageProps } from "@/interface/props/Logs";
import { useDelay } from "@/hooks/useDelay";
import { ActionType } from "@/constants/tabs/Logs";
import DynamicResponses from "./DynamicResponses";

export const LOADABLE_MESSAGE = "UM74";

export default function OptionBar({ message }: MessageProps) {
  const [action, setAction] = useState<ActionType | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [done, setDone] = useState(false);

  const { changeStatus, setCurrentLog } = useContext(LogsContext);
  const { delay } = useDelay();

  const isLoadable = message.element === LOADABLE_MESSAGE;

  useSocketListeners([
    {
      event: "message_loadable",
      callback: () => {
        if (action === "load") {
          startSending();
        }
      },
    },
  ]);

  const handleRequest = () => {
    if (!action) return;
    const statusMap: Record<ActionType, string> = {
      load: "accepted",
      standby: "standby",
      reject: "rejected",
      accept: "accepted",
    };
    changeStatus(message.id, statusMap[action]);
  };

  const handleConfirm = () => {
    startSending();
  };

  const startSending = async () => {
    setIsSending(true);
    setSendingProgress(0);

    const progressInterval = setInterval(() => {
      setSendingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    handleRequest();
    await delay(2000);
    socketService.send("fms_loaded", { logId: message.id });

    setTimeout(() => {
      setIsSending(false);
      setSendingProgress(0);
      setDone(true);
    }, 500);
  };

  const handleReset = () => {
    setAction(null);
    setIsSending(false);
    setSendingProgress(0);
    setDone(false);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border-2 border-white-20">
      {/* fond progressif */}
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

      <div className="relative z-10 bg-white/10 p-4 w-full flex flex-col gap-4 items-center">
        {action === "load" && isSending && <ProgressSteps />}

        {/* Étape de sélection */}
        {!action && !isSending && !done && (
          <div className="flex flex-row gap-6 border border-white-10 rounded-md items-center justify-around w-[538px] h-[74px] py-4 px-4 bg-nav-bar">
            {[
              ActionType.Load,
              ActionType.Standby,
              ActionType.Reject,
              ActionType.Accept,
            ].map((item) => (
              <div
                key={item}
                className={`logs-options bg-white-10 px-4 py-2 rounded cursor-pointer border ${
                  item === action
                    ? "border-2 border-dark-blue"
                    : "border-transparent"
                }`}
                onClick={() => {
                  if (item === "load" && !isLoadable) return;
                  setAction(item);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}

        {/* Étape de confirmation */}
        {action && !isSending && !done && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-white font-semibold text-lg text-center uppercase tracking-wide">
              Are you sure you want to{" "}
              <span className="capitalize text-light-blue font-semibold">
                {action}
              </span>{" "}
              the message{" "}
              <span className="text-green font-semibold">
                {message.element}
              </span>
              ?
            </p>
            <div className="flex gap-6">
              <button
                onClick={handleReset}
                className="w-10 h-10 rounded-full bg-white-10 text-white hover:bg-white-20 transition"
              >
                ✕
              </button>
              <button
                onClick={handleConfirm}
                className="w-10 h-10 rounded-full bg-white-10 text-white hover:bg-white-20 transition"
              >
                ✓
              </button>
            </div>
          </div>
        )}

        {isSending && (
          <div className="flex items-center justify-center h-[80px] w-full">
            <p className="text-white text-lg font-semibold uppercase tracking-wide text-center">
              Sending{" "}
              <span className="capitalize font-semibold text-light-blue">
                {action}
              </span>{" "}
              request for{" "}
              <span className="text-green font-semibold">
                {message.element}
              </span>
              ...
            </p>
          </div>
        )}

        {/* Envoi terminé */}
        {done && (
          <button
            onClick={() => setCurrentLog(null)}
            className="flex items-center gap-2 text-light-blue hover:text-light-blue/60 text-[20px] font-medium transition"
          >
            <img src="/arrow-back.svg" alt="Back arrow" className="w-5 h-5" />
            Message sent. Go back to message logs
          </button>
        )}
      </div>
    </div>
  );
}
