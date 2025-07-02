import CharacterInput from "@/components/General/CharacterInput";
import { BlockDataProps } from "@/interface/props/Request";

export default function BlockData({
  label,
  from,
  setFrom,
  to,
  setTo,
  isOpen,
  disabled,
}: BlockDataProps) {
  return (
    <div className="flex flex-row items-center gap-6">
      <p className="text-white/80 text-[16px] uppercase">{label}</p>
      <div className="flex items-center gap-5">
        <CharacterInput
          value={from}
          onChange={setFrom}
          length={5}
          disabled={!isOpen || disabled}
        />
        <span className="text-[14px] text-white/40">to</span>
        <CharacterInput
          value={to}
          onChange={setTo}
          length={5}
          disabled={from.length !== 5 || disabled}
        />
      </div>
    </div>
  );
}
