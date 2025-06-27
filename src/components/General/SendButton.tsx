import { SendButtonProps } from "@/interface/props/General";
import { useState, useEffect } from "react";

export default function SendButton({ onSend }: SendButtonProps) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (isSending) {
      const timeout = setTimeout(() => {
        setIsSent(true);
        setIsSending(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isSending]);

  if (isSent) {
    return (
      <button
        disabled
        className="flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded bg-green text-white font-semibold tracking-wide w-full uppercase"
      >
        <span className="uppercase">Sent</span>
        <img src="/check.svg" alt="Check Icon" className="w-6 h-6" />
      </button>
    );
  }

  if (isSending) {
    return (
      <button
        disabled
        className="flex-1 px-4 py-2 rounded bg-gray-400 text-white font-semibold tracking-wide relative w-full uppercase"
      >
        Sending
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        setIsSending(true);
        onSend();
      }}
      className="flex-1 px-4 py-2 rounded bg-dark-blue text-white-80 font-semibold tracking-wide hover:bg-dark-blue-50 w-full transition-colors uppercase"
    >
      Send
    </button>
  );
}
