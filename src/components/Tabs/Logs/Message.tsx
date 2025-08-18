import { useContext, useMemo, useState } from "react";
import { LogsContext } from "@/context/LogsContext";
import { GlobalContext } from "@/context/GlobalContext";
import { MessageProps } from "@/interface/props/Logs";
import { getStatusClass } from "@/utils/getStatus";

type ThreadViewState = "closed" | "open";

export default function Message({ message }: MessageProps) {
  const { setCurrentLog } = useContext(LogsContext);
  const { username } = useContext(GlobalContext);
  const [showAdditional, setShowAdditional] = useState(false);
  const [threadView, setThreadView] = useState<ThreadViewState>("closed");

  // Build full column: parent + thread (main is always the last one)
  const thread = Array.isArray(message.communication_thread)
    ? message.communication_thread
    : [];
  const messagesInColumn = useMemo(
    () => (thread.length ? [message, ...thread] : [message]),
    [message, thread],
  );
  const mainMsg = messagesInColumn[messagesInColumn.length - 1];
  const prevMessages = messagesInColumn.slice(0, -1); // older (inactive) messages
  const hiddenCount = prevMessages.length;

  const isDownlinkMain = mainMsg.direction === "downlink"; // DM vs UM
  const containerClass = isDownlinkMain ? "message-downlink" : "message-uplink";
  const mainBubbleClass = isDownlinkMain
    ? "message-downlink-bubble"
    : "message-uplink-bubble";
  const mainTextAlign = isDownlinkMain ? "text-left" : "text-right";
  const directionLine = isDownlinkMain
    ? "direction-line-downlink"
    : "direction-line-uplink";
  const extraMessages = isDownlinkMain ? "extra-down" : "extra-up";

  const handleMainClick = () => {
    if (mainMsg.response_required) setCurrentLog(mainMsg);
  };

  // ✅ Plain thread item now shows FROM/TO + username + timestamp (no status)
  const renderPlainMsg = (msg: any) => {
    const isDownlink = msg.direction === "downlink";
    return (
      <div
        key={msg.id}
        className={`p-2 rounded-md bg-white/5 border border-white/10 ${
          isDownlink ? "self-end" : "self-start"
        } max-w-[85%]`}
      >
        <div className="text-[11px] text-white/60 flex items-center justify-between leading-none">
          <span className="truncate">
            {msg.direction === "uplink" ? "FROM" : "TO"} {username}
          </span>
          <span className="ml-2 shrink-0">{msg.timeStamp}</span>
        </div>
        <div className="text-white/80 text-sm font-medium mt-1">
          {msg.element}
        </div>
      </div>
    );
  };

  return (
    <div className={`message-container ${containerClass}`}>
      <div className="flex flex-col gap-2 w-full">
        {threadView === "closed" ? (
          <>
            {hiddenCount >= 1 && renderPlainMsg(prevMessages[0])}

            {hiddenCount > 1 && (
              <div className="w-full flex justify-center">
                <button
                  onClick={() => setThreadView("open")}
                  className="px-2 py-0.5 text-xs rounded-full bg-white/10 border border-white/15 text-white/80 hover:bg-white/15 transition"
                  aria-label="View all older messages"
                  title={`${hiddenCount - 1} more messages — View all`}
                >
                  {hiddenCount - 1} more ▾
                </button>
              </div>
            )}
            <div
              className={mainBubbleClass}
              onClick={handleMainClick}
              role={mainMsg.response_required ? "button" : undefined}
            >
              <div className="message-header flex items-center justify-between">
                {isDownlinkMain ? (
                  <>
                    <div
                      className={`message-status ${getStatusClass(mainMsg)}`}
                    >
                      {String(mainMsg.status).toUpperCase()}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="message-from">
                        {mainMsg.direction === "uplink" ? "FROM" : "TO"}
                      </span>
                      <span className="message-username">{username}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="message-from">
                        {mainMsg.direction === "uplink" ? "FROM" : "TO"}
                      </span>
                      <span className="message-username">{username}</span>
                    </div>
                    <div
                      className={`message-status ${getStatusClass(mainMsg)}`}
                    >
                      {String(mainMsg.status).toUpperCase()}
                    </div>
                  </>
                )}
              </div>

              <div className={mainTextAlign}>
                <div className="message-content">{mainMsg.element}</div>
                <div className="message-timestamp">{mainMsg.timeStamp}</div>
              </div>

              {Array.isArray(mainMsg.additional) &&
                mainMsg.additional.length > 0 && (
                  <div className={`mt-2 ${mainTextAlign}`}>
                    <div className={`flex items-center ${extraMessages}`}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAdditional((v) => !v);
                        }}
                        className="text-white/60 hover:text-white/80 transition-colors text-sm"
                        aria-label="Toggle additional information"
                      >
                        ⋯
                      </button>
                    </div>
                    {showAdditional && (
                      <div className="mt-1 text-sm text-white/70 border-t border-white/20 pt-2">
                        {mainMsg.additional.map((item: any, index: number) => (
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
          </>
        ) : (
          <>
            {prevMessages.length > 0 && (
              <div className="relative flex flex-col gap-2 w-full">
                {prevMessages.map(renderPlainMsg)}
              </div>
            )}

            <div className="w-full flex justify-center -mb-1">
              <button
                onClick={() => setThreadView("closed")}
                className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/15 text-white/80 hover:bg-white/15 transition"
                aria-label="Collapse older messages"
              >
                Hide ▴
              </button>
            </div>

            <div
              className={mainBubbleClass}
              onClick={handleMainClick}
              role={mainMsg.response_required ? "button" : undefined}
            >
              <div className="message-header flex items-center justify-between">
                {isDownlinkMain ? (
                  <>
                    <div
                      className={`message-status ${getStatusClass(mainMsg)}`}
                    >
                      {String(mainMsg.status).toUpperCase()}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="message-from">
                        {mainMsg.direction === "uplink" ? "FROM" : "TO"}
                      </span>
                      <span className="message-username">{username}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="message-from">
                        {mainMsg.direction === "uplink" ? "FROM" : "TO"}
                      </span>
                      <span className="message-username">{username}</span>
                    </div>
                    <div
                      className={`message-status ${getStatusClass(mainMsg)}`}
                    >
                      {String(mainMsg.status).toUpperCase()}
                    </div>
                  </>
                )}
              </div>

              <div className={mainTextAlign}>
                <div className="message-content">{mainMsg.element}</div>
                <div className="message-timestamp">{mainMsg.timeStamp}</div>
              </div>

              {Array.isArray(mainMsg.additional) &&
                mainMsg.additional.length > 0 && (
                  <div className={`mt-2 ${mainTextAlign}`}>
                    <div className={`flex items-center ${extraMessages}`}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAdditional((v) => !v);
                        }}
                        className="text-white/60 hover:text-white/80 transition-colors text-sm"
                        aria-label="Toggle additional information"
                      >
                        ⋯
                      </button>
                    </div>
                    {showAdditional && (
                      <div className="mt-1 text-sm text-white/70 border-t border-white/20 pt-2">
                        {mainMsg.additional.map((item: any, index: number) => (
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
          </>
        )}
      </div>
    </div>
  );
}
