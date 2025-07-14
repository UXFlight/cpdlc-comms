import { FlightContext } from "@/context/FlightContext";
import { PositionInputProps } from "@/interface/props/General";
import { useContext } from "react";
import SelectDropdown from "./SelectDropdown";

export default function PositionInput({
  disabled,
  selected,
  onToggle,
  value,
  onChange,
}: PositionInputProps) {
  const { flightDetails } = useContext(FlightContext);
  const routeFix = flightDetails.route.map((position) => position.fix);

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

      <SelectDropdown
        disabled={disabled || !selected}
        value={value || "Select position"}
        onChange={onChange}
        options={routeFix}
      />
    </>
  );
}
