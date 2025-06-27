import { useEffect } from "react";
import Message from "./Message";
import { Log } from "../../../interface/Logs";

type Props = {
  messages: Log[];
};

export default function MessageContainer({ messages }: Props) {
  const noMessages = !messages || messages.length === 0;

  return (
    <div className="flex flex-col items-center justify-start h-full">
      {noMessages ? (
        <div className="text-center text-white/70 flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center">
            <div className="w-4 h-4 bg-white/40 rounded-full animate-ping" />
          </div>
          <h2 className="text-2xl font-bold tracking-wide uppercase text-white">
            No New Messages
          </h2>
          <p className="text-base text-white/40 max-w-md">
            All communications are up to date. You’ll be notified when a new message arrives.
          </p>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-4">
          {messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))}
        </div>
      )}
    </div>
  );
}
