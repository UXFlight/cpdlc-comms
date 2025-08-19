// components/Tabs/Request/PreviewShell.tsx
import SendButton from "@/components/General/SendButton";
import React from "react";

export interface PreviewShellProps {
  isSending: boolean;
  isSent: boolean;
  sendingProgress: number;
  mainText: string;
  badges?: string[];
  onCancel: () => void;
  onSend: () => void;
  sendingLabel?: string; // ex: "Sending MAYDAY MAYDAY MAYDAY ..."
  childrenBelow?: React.ReactNode; // si tu veux injecter un extra
}

export default function PreviewShell({
  isSending,
  isSent,
  sendingProgress,
  mainText,
  badges = [],
  onCancel,
  onSend,
  sendingLabel = "Sending...",
  childrenBelow,
}: PreviewShellProps) {
  return (
    <div
      className="relative flex flex-col w-full p-4 gap-4 
                 border-[3px] border-[#539fda]
                 rounded-lg 
                 bg-gradient-to-b from-[#1e1e1e] to-[#1a1a1a] 
                 text-white shadow-sm overflow-hidden"
    >
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

      <div className="relative z-10 flex flex-col gap-4">
        <p className="text-white-500 font-noto text-base not-italic font-normal leading-none uppercase">
          Preview
        </p>

        {!isSending && !isSent && (
          <div>
            <div className="w-full px-4 py-3 rounded border-2 border-white-10 bg-medium-gray text-white-100 text-base">
              {mainText}
            </div>

            {badges.length > 0 && (
              <div className="flex flex-col gap-2 w-full px-4 py-3 mt-[-18px] rounded border-2 border-white-10 bg-medium-gray text-white/90 text-base">
                <ul className="flex flex-wrap gap-2">
                  {badges.map((msg, idx) => (
                    <li
                      key={idx}
                      className="bg-[#2c3832] text-green font-mono text-xs px-3 py-1 rounded shadow-sm shadow-black/20"
                    >
                      {msg}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {childrenBelow}
          </div>
        )}

        {isSending && (
          <div className="flex items-center justify-center h-[60px] w-full">
            <p className="text-white text-lg font-semibold uppercase tracking-wide text-center">
              {sendingLabel}
            </p>
          </div>
        )}

        {!isSent && !isSending && (
          <div className="flex w-full gap-4">
            <button
              className="flex-1 px-4 py-2 rounded bg-white-20 hover:bg-white-10 cursor-pointer text-white-80 font-semibold tracking-wide uppercase"
              onClick={onCancel}
            >
              Cancel
            </button>
            <SendButton onSend={onSend} />
          </div>
        )}

        {isSent && (
          <div className="flex items-center justify-center h-[60px] w-full">
            <p className="text-green text-lg font-semibold uppercase tracking-wide text-center">
              Message sent successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
