import React, { useState } from "react";

type Props = {
  requestType: string;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
  showSendButton?: boolean;
  onSend?: () => void;
  children: React.ReactNode;
};

export default function RequestContainer({
  requestType,
  isOpen,
  onToggle,
  disabled = false,
  showSendButton = false,
  onSend,
  children,
}: Props) {
  return (
    <div className="container flex flex-col items-start py-4 px-[15.5px] overflow-x-hidden relative">
      {/* Header */}
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

      {/* Content */}
      <div className="w-full">{children}</div>

      {/* Send Button */}
      {showSendButton && (
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
