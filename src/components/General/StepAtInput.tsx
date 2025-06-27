import { SendAtInputProps } from "@/interface/props/General";
import PositionInput from "@/components/General/PositionInput";
import TimeInput from "@/components/General/TimeInput";

export default function StepAtInput({
  disabled = false,
  positionSelected,
  onTogglePosition,
  position,
  onChangePosition,
  timeSelected,
  onToggleTime,
  time,
  onChangeTime,
}: SendAtInputProps) {
    
  return (
    <div className="flex flex-row gap-6 mt-2">
      <p className="text-white/80 text-[16px] w-[264.865px] pl-[185px] uppercase">
        Step at
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <PositionInput
            disabled={disabled}
            selected={positionSelected}
            onToggle={onTogglePosition}
            value={position}
            onChange={onChangePosition}
          />
        </div>

        <div className="flex items-center gap-2">
          <TimeInput
            disabled={disabled}
            selected={timeSelected}
            onToggle={onToggleTime}
            hh={time.hh}
            mm={time.mm}
            onChange={onChangeTime}
          />
        </div>
      </div>
    </div>
  );
}
