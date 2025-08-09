import { GlobalContext } from "@/context/GlobalContext";
import { LogsContext } from "@/context/LogsContext";
import { NavButtonProps } from "@/interface/props/ResponsiveBar";
import { useContext, useEffect, useRef, useState } from "react";

export default function NavButton({
  icon,
  label,
  id,
  active,
  onTabChange,
}: NavButtonProps) {
  const { connectionState } = useContext(GlobalContext);
  const { logs } = useContext(LogsContext);
  const isHome = id === "logon";

  const isLogsTab = id === "logs";
  const [unread, setUnread] = useState(0);
  const prevLenRef = useRef<number>(logs?.length ?? 0);

  useEffect(() => {
    if (!isLogsTab) return;
    const currentLen = logs?.length ?? 0;
    const prevLen = prevLenRef.current;

    if (currentLen > prevLen && !active) {
      setUnread((u) => u + (currentLen - prevLen));
    }
    prevLenRef.current = currentLen;
  }, [logs?.length, active, isLogsTab]);

  useEffect(() => {
    if (isLogsTab && active) {
      setUnread(0);
      prevLenRef.current = logs?.length ?? 0;
    }
  }, [active, isLogsTab, logs?.length]);

  return (
    <div
      onClick={() => {
        if (connectionState) onTabChange(id);
      }}
      className={`button-base ${connectionState ? "btn-3d" : ""} ${
        active
          ? "bg-white-10 border-b-4 border-green"
          : "border-b-4 border-transparent"
      }`}
    >
      {isHome ? (
        <button
          onClick={() => onTabChange(id)}
          className="w-full h-[73px] flex flex-col items-center justify-center relative"
        >
          <img
            src="/CPDLC.svg"
            alt="HOME"
            className="w-[52px] h-[52px] bg-gradient-to-l from-teal-600 to-teal-400 rounded-full"
          />
        </button>
      ) : (
        <button
          className={`relative w-[65px] h-[73px] flex flex-col items-center justify-center font-bold text-xs ${
            label === "print" ? "border border-green rounded-full px-1 py-1" : ""
          }`}
        >
          <img src={icon} alt={label} className="icon w-[28px] h-[28px]" />
          <h3>{label}</h3>

          {isLogsTab && unread > 0 && (
            <span
              className="
                absolute -top-0.5 -right-0.5
                min-w-[18px] h-[18px] px-1
                rounded-full bg-green text-white
                text-[10px] leading-[18px] text-center
                shadow-md
              "
              aria-label={`${unread} nouveaux logs`}
              title={`${unread} nouveaux logs`}
            >
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
