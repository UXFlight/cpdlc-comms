import React from "react";

type Props = {
  icon: string;
  label: string;
  id: string;
  active: boolean;
  onTabChange: (tab: string) => void;
};

export default function NavButton({
  icon,
  label,
  id,
  active,
  onTabChange,
}: Props) {
  return (
    <div className="flex flex-row justify-center items-center w-[75px]">
      <button
        onClick={() => onTabChange(`${id}`)}
        className={`flex flex-col items-center px-2 py-1 w-28 font-bold text-xs ${
          active
            ? "border-[#1cccc4] bg-[#3b9673] text-white"
            : "text-white/80 hover:bg-[#3b9673]"
        }
          ${label === "print" ? "border-1 border-solid border-green rounded-[100px] m-[9px]" : ""}`}
      >
        <img src={icon} alt={label} className="icon" />
        <h3 className="align-self-stretch">{label}</h3>
      </button>
    </div>
  );
}
