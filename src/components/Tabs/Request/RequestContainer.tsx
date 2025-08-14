import React, { useContext, useEffect } from "react";
import { RequestContext } from "@/context/RequestContext";
import { InputContext } from "@/context/InputContext";
import { RequestContainerProps } from "@/interface/props/Request";

export default function RequestContainer({
  requestType,
  isOpen,
  onToggle,
  disabled = false,
  showSendButton = false,
  onSend,
  children,
}: RequestContainerProps) {
  const { resetRequest } = useContext(RequestContext);
  const { setTargetInput } = useContext(InputContext);

  useEffect(() => {
    if (!isOpen) {
      resetRequest();
    } else {
      setTargetInput("");
    }
  }, [isOpen]);

  return (
    <div
      className={`container flex flex-col items-start py-2 px-[15.5px] overflow-x-hidden relative ${disabled ? "opacity-60 pointer-events-none" : ""}`}
    >
      <div
        className="h-[30px] w-full flex items-center justify-between cursor-pointer"
        onClick={!disabled ? onToggle : undefined}
      >
        <p className="text-white font-normal text-[17px] leading-none font-noto uppercase">
          {requestType}
        </p>
        <img
          src="/arrow-down.svg"
          alt="arrow"
          className={`w-6 h-6 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      <div className="w-full">{children}</div>

      {showSendButton && isOpen && (
        <button
          disabled={disabled}
          onClick={onSend}
          className="absolute bottom-2 right-2 mt-4 px-4 py-2 bg-dark-blue w-[125px] h-auto text-[12px] tracking-wider uppercase font-[550] text-white rounded cursor-pointer hover:bg-dark-blue-50 transition-colors shadow-sm shadow-black/30 disabled:opacity-50 disabled:hover:bg-dark-blue"
        >
          Preview
        </button>
      )}
    </div>
  );
}
