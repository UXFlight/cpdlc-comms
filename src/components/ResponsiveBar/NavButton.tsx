import { GlobalContext } from "@/context/GlobalContext";
import { NavButtonProps } from "@/interface/props/ResponsiveBar";
import { useContext } from "react";

export default function NavButton({
  icon,
  label,
  id,
  active,
  onTabChange,
}: NavButtonProps) {
  const { connectionState } = useContext(GlobalContext);
  const isHome = id === "logon";

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
          className="w-full h-[73px] flex flex-col items-center justify-center"
        >
          <img
            src="/CPDLC.svg"
            alt="HOME"
            className="w-[52px] h-[52px] bg-gradient-to-l from-teal-600 to-teal-400 rounded-full"
          />
        </button>
      ) : (
        <button
          className={`w-[65px] h-[73px] flex flex-col items-center justify-center font-bold text-xs ${
            label === "print"
              ? "border border-green rounded-full px-1 py-1"
              : ""
          }`}
        >
          <img src={icon} alt={label} className="icon w-[28px] h-[28px]" />
          <h3>{label}</h3>
        </button>
      )}
    </div>
  );
}
