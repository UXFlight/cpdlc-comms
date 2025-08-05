import Message from "@/components/Tabs/Logs/Message";
import { MessageContainerProps } from "@/interface/props/Logs";

export default function MessageContainer({ messages }: MessageContainerProps) {
  const noMessages = !messages || messages.length === 0;

  return (
    <div className="message-wrapper">
      {noMessages ? (
        <div className="message-empty-wrapper">
          <div className="message-empty-content">
            <div className="message-empty-icon">
              <div className="message-empty-ping" />
            </div>
            <h2 className="message-empty-title">No New Messages</h2>
            <p className="message-empty-subtitle">
              All communications are up to date. You&apos;ll be notified when a new
              message arrives.
            </p>
          </div>
        </div>
      ) : (
        <div className="message-scroll-area">
          <div className="message-scroll-inner">
            {messages.map((msg) => {
              return (
                <div key={msg.id}>
                  <Message message={msg} />
                </div>
              );
            })}
          </div>

          <div className="message-footer">
            <div className="message-footer-meta">
              <div className="message-dot-group">
                <div className="message-dot bg-green/60" />
                <span>Incoming Message</span>
              </div>
              <div className="message-divider" />
              <div className="message-dot-group">
                <div className="message-dot bg-dark-blue/60" />
                <span>Outgoing Message</span>
              </div>
              <div className="message-footer-count">
                {messages.length} message{messages.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
