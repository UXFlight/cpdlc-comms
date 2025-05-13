import React from "react";

export default function NavButton({ icon, label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      
      className={`flex flex-col items-center px-2 py-1 w-28 border font-bold text-xs ${
        active
          ? "border-[#1cccc4] bg-[#3b9673] text-white"
          : "text-white/80 hover:bg-[#3b9673]"
      }`}
    >
      <img src={icon} alt={label} className="w-6" />
      {label}
    </button>
  );
}
