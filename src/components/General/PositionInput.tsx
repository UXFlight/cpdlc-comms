import { PositionInputProps } from "@/interface/props/General";

export default function PositionInput({
  disabled,
  selected,
  onToggle,
  value,
  onChange,
}: PositionInputProps) {
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
        <span className="text-[14px] text-white-80">Position</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
              .toUpperCase()
              .replace(/[^A-Z0-9]/g, "")
              .slice(0, 6),
          )
        }
        placeholder="ABC123"
        disabled={disabled || !selected}
        className={`w-[110px] px-2 py-1 rounded border text-center text-sm tracking-widest shadow-sm ${
          selected
            ? "bg-medium-gray border-white/30 text-white"
            : "bg-[#1a1a1a] border-white/10 text-white/40"
        }`}
      />
    </>
  );
}
