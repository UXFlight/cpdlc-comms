import { useContext, useEffect, useState } from "react";
import { socketService } from "@/api/communications/socket/socketService";
import { LogsContext } from "@/context/LogsContext";
import { LoadContext } from "@/context/LoadContext";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import { useDelay } from "@/hooks/useDelay";
import { ActionType } from "@/constants/tabs/Logs";
import { MessageProps } from "@/interface/props/Logs";
import { AcceptableResponse } from "@/interface/Logs";
import { ProgressStep } from "@/interface/context/LoadContext";
import DynamicResponses from "./DynamicResponses";
import ProgressSteps from "../ProgressSteps";
import YesNoOptions from "./YesNoOptions";

export default function OptionBar({ message }: MessageProps) {
  const { currentLog, handleResponse, setCurrentLog } = useContext(LogsContext);
  const { progressStep, setProgressStep } = useContext(LoadContext);
  const { delay } = useDelay();

  const [action, setAction] = useState<ActionType | null>(null);
  const [currentResponse, setCurrentResponse] =
    useState<AcceptableResponse | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [isLoadable, setIsLoadable] = useState(false);

  useEffect(() => {
    if(progressStep === ProgressStep.REJECTED) {
      setAction(ActionType.Reject);
    }
  }, [progressStep]);

  useSocketListeners([
    {
      event: "message_loadable",
      callback: (data) => {
        setIsLoadable(data);
        if (action === ActionType.Load) startSending();
      },
    },
  ]);

  useEffect(() => {
    if (progressStep === ProgressStep.EXECUTE) {
      resetStates();
    }
  }, [progressStep]);

  const resetStates = () => {
    setAction(null);
    setIsSending(false);
    setSendingProgress(0);
    setDone(false);
    setCurrentResponse(null);
  };

  const handleRequest = () => {
    if (!action && !currentResponse) return;
    if (action) {
      const statusMap: Record<ActionType, { ref: string; text: string }> = {
        load: { ref: "loaded", text: "Loaded" },
        standby: { ref: "DM2", text: "STANDBY" },
        reject: { ref: "DM1", text: "UNABLE" },
        accept: { ref: "DM0", text: "WILCO" },
      };
      handleResponse(message.id, statusMap[action]);
    }
    if (currentResponse) {
      handleResponse(message.id, currentResponse);
    }
  };

  const startSending = async () => {
    setIsSending(true);
    setSendingProgress(0);

    const interval = setInterval(() => {
      setSendingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    handleRequest();
    await delay(2000);

    if (progressStep === ProgressStep.EXECUTE) {
      setProgressStep(ProgressStep.SENT);
    }

    if (action === ActionType.Load) {
      socketService.send("fms_loaded", { logId: message.id });
    }
    setTimeout(() => {
      setIsSending(false);
      setSendingProgress(0);
      setDone(true);
    }, 500);
  };

  const handleConfirm = () => {
    if (progressStep === ProgressStep.EXECUTE) {
      setProgressStep(ProgressStep.RESPONSE);
    }
    startSending();
  };

  const handleActionClick = (item: ActionType, isDisabled: boolean) => {
    if (isDisabled) return;
    setAction(item);
    if (item === ActionType.Load) {
      socketService.send("load_fms", { logId: message.id });
    }
  };

  const renderSendingOverlay = () =>
    isSending && (
      <div
        className="absolute top-0 left-0 h-full z-0 transition-all duration-200 ease-linear"
        style={{
          width: `${sendingProgress}%`,
          background:
            "linear-gradient(90deg, rgba(83,159,218,0.15) 0%, rgba(59,150,115,0.15) 100%)",
        }}
      />
    );

  const renderConfirmationStep = () => {
    const target = currentResponse?.text || action;
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-white text-lg font-semibold uppercase tracking-wide text-center">
          {currentResponse
            ? `Do you want to send "${currentResponse.text}"?`
            : `Are you sure you want to ${action} the message "${message.element}"?`}
        </p>
        <YesNoOptions onConfirm={handleConfirm} onCancel={resetStates} />
      </div>
    );
  };

  const renderActionButtons = () => (
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
            onClick={() => handleActionClick(item, isDisabled)}
            className={`logs-options px-4 py-2 rounded-lg transition duration-200 ease-in-out transform text-sm font-semibold text-white bg-white-10 border
              ${isSelected ? "border-dark-blue shadow-lg" : "border-white/20 shadow-md"}
              ${isDisabled ? "opacity-50" : "cursor-pointer hover:shadow-xl hover:-translate-y-0.5 hover:border-white"}
            `}
          >
            {item}
          </div>
        );
      })}
    </div>
  );

  const renderSendingMessage = () => (
    <div className="flex items-center justify-center h-[80px] w-full">
      <p className="text-white text-lg font-semibold uppercase tracking-wide text-center">
        Sending{" "}
        <span className="capitalize font-semibold text-light-blue">
          {currentResponse?.text || action}
        </span>{" "}
        for <span className="text-green font-semibold">{message.element}</span>
        ...
      </p>
    </div>
  );

  const renderSentConfirmation = () => (
    <button
      onClick={() => setCurrentLog(null)}
      className="flex items-center gap-2 text-light-blue hover:text-light-blue/60 text-[20px] font-medium transition"
    >
      <img src="/arrow-back.svg" alt="Back arrow" className="w-5 h-5" />
      Message sent. Go back to message logs
    </button>
  );

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

        {currentLog?.acceptable_responses &&
          currentLog.acceptable_responses.length > 0 && (
            <DynamicResponses
              responses={currentLog.acceptable_responses}
              onSelect={setCurrentResponse}
            />
          )}
      </div>

      <div className="relative w-full rounded-xl overflow-hidden border-2 border-white-20">
        {renderSendingOverlay()}

        <div className="relative z-10 bg-white/10 p-4 w-full flex flex-col gap-4 items-center">
          {(progressStep !== null && progressStep !== ProgressStep.REJECTED) && <ProgressSteps />}

          {!isSending && !done && (currentResponse || action !== null)
            ? renderConfirmationStep()
            : !isSending && !done && renderActionButtons()}

          {isSending && renderSendingMessage()}

          {done && renderSentConfirmation()}
        </div>
      </div>
    </div>
  );
}
