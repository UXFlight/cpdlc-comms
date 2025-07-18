import { useContext, useEffect, useState } from "react";
import { socketService } from "@/api/communications/socket/socketService";
import { LogsContext } from "@/context/LogsContext";
import ProgressSteps from "../ProgressSteps";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { MessageProps } from "@/interface/props/Logs";
import { useDelay } from "@/hooks/useDelay";
import { ActionType } from "@/constants/tabs/Logs";
import DynamicResponses from "./DynamicResponses";
import { LoadContext } from "@/context/LoadContext";
import { ProgressStep } from "@/interface/context/LoadContext";

//export const LOADABLE_MESSAGE = "UM74";

export default function OptionBar({ message }: MessageProps) {
  const { currentLog } = useContext(LogsContext);
  const [action, setAction] = useState<ActionType | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [isLoadable, setIsLoadable] = useState(false);

  const { requestChangeStatus, setCurrentLog } = useContext(LogsContext);
  const { progressStep, setProgressStep } = useContext(LoadContext);
  const { delay } = useDelay();

  useSocketListeners([
    {
      event: "message_loadable",
      callback: (data) => {
        setIsLoadable(data);
        if (action === ActionType.Load) {
          //revoir
          startSending();
        }
      },
    },
  ]);

  useEffect(() => {
    if (progressStep === ProgressStep.EXECUTE) {
      setAction(null);
      setIsLoadable(false);
    }
  }, [progressStep]);

  const handleRequest = () => {
    if (!action) return;
    const statusMap: Record<ActionType, string> = {
      load: "loaded",
      standby: "DM2",
      reject: "DM1",
      accept: "DM0",
    };
    requestChangeStatus(message.id, statusMap[action]);
  };

  const handleConfirm = () => {
    startSending();
    setProgressStep(ProgressStep.RESPONSE);
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
      setProgressStep(ProgressStep.SENT);
    }, 500);
  };

  const handleReset = () => {
    setAction(null);
    setIsSending(false);
    setSendingProgress(0);
    setDone(false);
  };

  const handleAction = (isDisabled: boolean, action: ActionType) => {
    if (isDisabled) return;
    if (action === ActionType.Load) {
      setAction(action);
      socketService.send("load_fms", { logId: message.id });
      return;
    } else {
      setAction(action);
    }
  };

  return (
    <div>
      <div className="h-full">
        <div className="flex items-center justify-center py-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="px-4 text-white/40 text-xs uppercase tracking-wider">
            Actions Available
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        {currentLog && currentLog.acceptable_responses.length > 0 && (
          <DynamicResponses responses={currentLog.acceptable_responses} />
        )}
      </div>
      <div className="relative w-full rounded-xl overflow-hidden border-2 border-white-20">
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
          {progressStep !== null && <ProgressSteps />}

          {(!action || action === ActionType.Load) && !isSending && !done && (
            <div className="flex flex-row gap-6 border border-white-10 rounded-md items-center justify-around w-[538px] h-[74px] py-4 px-4 bg-nav-bar">
              {[
                ActionType.Load,
                ActionType.Standby,
                ActionType.Reject,
                ActionType.Accept,
              ].map((item) => {
                const isDisabled = item === ActionType.Load && !isLoadable;
                const isSelected = item === action;

                return (
                  <div
                    key={item}
                    className={`
            logs-options
            px-4 py-2 rounded-lg
            transition duration-200 ease-in-out transform
            text-sm font-semibold text-white
            bg-white-10 border
            ${isSelected ? "border-dark-blue shadow-lg" : "border-white/20 shadow-md"}
            ${
              isDisabled
                ? "opacity-50"
                : "cursor-pointer hover:shadow-xl hover:-translate-y-0.5 hover:border-white"
            }
          `}
                    onClick={() => {
                      handleAction(isDisabled, item);
                      //setAction(item);
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          )}

          {action !== ActionType.Load &&
            action !== null &&
            !isSending &&
            !done && (
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
    </div>
  );
}
