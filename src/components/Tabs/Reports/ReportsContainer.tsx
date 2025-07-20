import { ReportsContainerProps } from "@/interface/props/Reports";

export default function ReportsContainer({
  children,
  label,
  isOpen,
  setIsOpen,
  onSend,
  onClear,
  disabled = false,
  showSendButton = true,
}: ReportsContainerProps) {
  return (
    <div
      className={`flex flex-col bg-[#1e1e1e] p-4 rounded-md border border-white/10 text-white text-sm transition-opacity ${
        disabled ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className="h-[22px] w-full flex items-center justify-between cursor-pointer"
        onClick={() => {
          if (!disabled) setIsOpen(!isOpen);
        }}
      >
        <p className="text-white font-[500] text-[16px] leading-none font-noto uppercase">
          {label}
        </p>
        <img
          src="/arrow-down.svg"
          alt="arrow"
          className={`w-6 h-6 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <div className={`${isOpen ? "pt-4 flex flex-col gap-4" : "hidden"}`}>
        {children}

        <div className="flex justify-between">
          {onClear && (
            <button
              onClick={onClear}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-white"
            >
              CLEAR
            </button>
          )}
          {showSendButton && (
            <button
              onClick={onSend}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-white ml-auto"
            >
              SET
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
