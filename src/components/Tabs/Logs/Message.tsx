import { useContext, useState } from "react";
import { LogsContext } from "@/context/LogsContext";
import { GlobalContext } from "@/context/GlobalContext";
import { MessageProps } from "@/interface/props/Logs";
import { getStatusClass } from "@/utils/getStatus";

export default function Message({ message }: MessageProps) {
  const { setCurrentLog } = useContext(LogsContext);
  const { username } = useContext(GlobalContext);
  const [showAdditional, setShowAdditional] = useState(false);

  const handleClick = () => {
    if (message.response_required) {
      setCurrentLog(message);
    }
    // if (message.status === "new") {
    //   changeStatus(message.id, "opened");
    // }
  };

  const handleToggleAdditional = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAdditional(!showAdditional);
  };

  const isDownlink = message.direction === "downlink";
  const containerClass = isDownlink ? "message-downlink" : "message-uplink";
  const bubbleClass = isDownlink
    ? "message-downlink-bubble"
    : "message-uplink-bubble";
  const directionLine = isDownlink
    ? "direction-line-downlink"
    : "direction-line-uplink";
  const textAlign = isDownlink ? "text-left" : "text-right";
  const extraMessages = isDownlink ? "extra-down" : "extra-up";

  return (
    <>
      {message ? (
        <div className={`message-container ${containerClass}`}>
          <div className={`${bubbleClass}`} onClick={handleClick}>
            <div className={`message-header ${textAlign}`}>
              <div className="flex items-center gap-2">
                <span className="message-from">
                  {message.direction === "uplink" ? "FROM" : "TO"}
                </span>
                <span className="message-username">{username}</span>
              </div>
              <div className={`message-status ${getStatusClass(message)}`}>
                {message.status.toUpperCase()}
              </div>
            </div>

            <div className={textAlign}>
              <div className="message-content">{message.element}</div>
              <div className="message-timestamp">{message.timeStamp}</div>
            </div>

            {message.additional && message.additional.length > 0 && (
              <div className={`mt-2 ${textAlign}`}>
                <div className={`flex items-center ${extraMessages}`}>
                  <button
                    onClick={handleToggleAdditional}
                    className="text-white/60 hover:text-white/80 transition-colors text-sm"
                    aria-label="Toggle additional information"
                  >
                    ⋯
                  </button>
                </div>
                {showAdditional && (
                  <div className="mt-1 text-sm text-white/70 border-t border-white/20 pt-2">
                    {message.additional.map((item, index) => (
                      <div key={index} className="mb-1">
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className={directionLine}></div>
          </div>
          {message.communication_thread &&
            message.communication_thread.length > 0 && (
              <div className="mt-2 flex flex-col gap-2 pl-4 border-l border-white/10">
                {message.communication_thread.map((reply) => (
                  <div
                    key={reply.id}
                    className={`p-2 rounded-md bg-white/5 border border-white/10 ${isDownlink ? "self-end" : "self-start"} max-w-[85%]`}
                  >
                    <div className="text-xs text-white/60 flex justify-between">
                      <span>
                        {reply.direction === "uplink" ? "FROM" : "TO"}{" "}
                        {username}
                      </span>
                      <span>{reply.status.toUpperCase()}</span>
                    </div>
                    <div className="text-white/80 text-sm font-medium mt-1">
                      {reply.element}
                    </div>
                    <div className="text-white/40 text-xs mt-1">
                      {reply.timeStamp}
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-white/40">An error occurred</p>
        </div>
      )}
    </>
  );
}
