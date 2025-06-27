import { CustomCheckboxProps } from "@/interface/props/General";
import { useState } from "react";

export default function CustomCheckbox({ label, checked = false, onChange }: CustomCheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange?.(newState);
  };

  return (
    <label
      className="flex items-center gap-2 cursor-pointer select-none"
      onClick={handleToggle}
    >
      <div
        className={`w-4 h-4 rounded border transition 
          ${isChecked ? "bg-dark-blue border-2 border-white" : "bg-transparent border-white/30"}`}
      />
      <span className="text-white/80 text-sm font-open text-[14px] leading-[18px]">
        {label}
      </span>
    </label>
  );
}
