type Props = {
  children: React.ReactNode;
  label: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function ReportsContainer({
  children,
  label,
  isOpen,
  setIsOpen,
}: Props) {
  return (
    <div className="flex flex-col gap-4 bg-[#1e1e1e] p-4 rounded-md border border-white/10 text-white text-sm">
      <div
        className="h-[22px] w-full flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-white font-[500] text-[16px] leading-none font-noto uppercase">
          {label}
        </p>
        <img
          src="/arrow-down.svg"
          alt="arrow"
          className={`w-6 h-6 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {children}
      <div className={`flex flex-col gap-4 ${isOpen ? "" : "hidden"}`}>
        <div className="flex justify-between mt-1 gap-2">
          {["CLEAR", "SET", "SEND", "CANCEL"].map((label) => (
            <button
              key={label}
              className="flex-1 py-2 rounded border border-white/20 bg-[#2b2b2c] text-white/80 hover:bg-white/10 transition text-sm"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
