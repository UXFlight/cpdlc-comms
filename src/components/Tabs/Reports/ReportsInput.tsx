import { ReportsInputProps } from "@/interface/props/Reports";
import React from "react";

export default function ReportsInput({
  label,
  value,
  onChange,
  placeholder = "",
  className = "",
  inputType = "text",
  maxLength,
}: ReportsInputProps) {
  return (
    <div className="flex flex-row items-center gap-4">
      <label className="w-[180px] text-sm text-right">{label}</label>
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`bg-black text-white border border-white/20 px-2 py-1 rounded-md w-full ${className}`}
      />
    </div>
  );
}
