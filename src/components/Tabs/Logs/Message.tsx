import { useContext } from "react";
import { LogsContext } from "@/context/LogsContext";
import { GlobalContext } from "@/context/GlobalContext";
import { MessageProps } from "@/interface/props/Logs";

export default function Message({ message }: MessageProps) {
  const { setCurrentLog, changeStatus } = useContext(LogsContext);
  const { username } = useContext(GlobalContext);

  const handleClick = () => {
    setCurrentLog(message);
    if (message.status === "new") {
      changeStatus(message.id, "open");
    }
  };

  const getStatusClass = () => {
    switch (message.status) {
      case "open":
        return "status-open";
      case "accepted":
        return "status-accepted";
      case "rejected":
        return "status-rejected";
      case "time out":
        return "status-timeout";
      default:
        return "status-new";
    }
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
              <div className={`message-status ${getStatusClass()}`}>
                {message.status.toUpperCase()}
              </div>
            </div>

            <div className={textAlign}>
              <div className="message-content">{message.element}</div>
              <div className="message-timestamp">{message.timeStamp}</div>
            </div>

            <div className={directionLine}></div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-white/40">An error occurred</p>
        </div>
      )}
    </>
  );
}
