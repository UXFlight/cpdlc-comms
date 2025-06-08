// components/TimeInput.tsx
import { Dispatch, SetStateAction } from "react";

interface Props {
  disabled: boolean;
  selected: boolean;
  onToggle: () => void;
  hh: string;
  mm: string;
  onChange: (hh: string, mm: string) => void;
}

export default function TimeInput({
  disabled,
  selected,
  onToggle,
  hh,
  mm,
  onChange,
}: Props) {
  return (
    <>
      <label className="flex items-center gap-2 text-white/80 text-sm">
        <input
          type="checkbox"
          disabled={disabled}
          checked={selected}
          onChange={onToggle}
          className="w-4 h-4 rounded border border-white/20 bg-[#2B2B2C] checked:bg-white checked:border-white shadow-sm shadow-black/30 cursor-pointer"
        />
        <span>Time</span>
      </label>
      <div className="flex items-center gap-1">
        <input
          type="text"
          inputMode="numeric"
          maxLength={2}
          placeholder="HH"
          pattern="^([0-1][0-9]|2[0-3])"
          value={hh}
          onChange={(e) => onChange(e.target.value, mm)}
          disabled={disabled || !selected}
          className={`w-[45px] px-2 py-1 rounded border text-center text-sm tracking-widest shadow-sm ${
            selected
              ? "bg-medium-gray border-white/30 text-white"
              : "bg-[#1a1a1a] border-white/10 text-white/40"
          }`}
        />
        <span className="text-white/70">:</span>
        <input
          type="text"
          inputMode="numeric"
          maxLength={2}
          placeholder="MM"
          pattern="^([0-5][0-9])"
          value={mm}
          onChange={(e) => onChange(hh, e.target.value)}
          disabled={disabled || !selected}
          className={`w-[45px] px-2 py-1 rounded border text-center text-sm tracking-widest shadow-sm ${
            selected
              ? "bg-medium-gray border-white/30 text-white"
              : "bg-[#1a1a1a] border-white/10 text-white/40"
          }`}
        />
      </div>
    </>
  );
}
