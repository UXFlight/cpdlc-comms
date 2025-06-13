import PositionInput from "./PositionInput";
import TimeInput from "./TimeInput";

type Props = {
  disabled?: boolean;
  positionSelected: boolean;
  onTogglePosition: () => void;
  position: string;
  onChangePosition: (val: string) => void;
  timeSelected: boolean;
  onToggleTime: () => void;
  time: { hh: string; mm: string };
  onChangeTime: (hh: string, mm: string) => void;
};

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
}: Props) {
    
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
