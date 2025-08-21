// components/Tabs/Reports/ReportsInput.tsx
import { ReportsInputProps } from "@/interface/props/Reports";
import React from "react";

type Props = ReportsInputProps & { required?: boolean; error?: string };

export default function ReportsInput({
  label,
  value,
  onChange,
  placeholder = "",
  className = "",
  inputType = "text",
  maxLength,
  required = false,
  error,
}: Props) {
  const emptyRequired = required && !String(value).trim();
  const showError = (error && error.trim().length > 0) || emptyRequired;
  const errorText =
    error && error.trim().length > 0 ? error : emptyRequired ? "Required" : "";

  return (
    <div className="flex flex-row items-start gap-4">
      <label className="w-[180px] text-sm text-right pt-[6px]">
        {label}
        {required && <span className="text-green-400 ml-1">*</span>}
      </label>
      <div className="w-full">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-required={required}
          aria-invalid={showError ? true : undefined}
          className={`bg-black text-white border px-2 py-1 rounded-md w-full ${
            showError ? "border-green-400" : "border-white/20"
          } ${className}`}
        />
        {showError && (
          <div className="text-xs text-green-400 mt-1">{errorText}</div>
        )}
      </div>
    </div>
  );
}
