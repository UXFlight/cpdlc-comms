export default function OptionBar({
  onClear,
  onSet,
}: {
  onClear?: () => void;
  onSet?: () => void;
}) {
  return (
    <div className="flex justify-center items-center gap-[33px] w-full overflow-x-hidden px-[15.5px]">
      <div className="emergency-options bg-white-10" onClick={onClear}>
        clear
      </div>
      <div className="emergency-options bg-white-10" onClick={onSet}>
        set
      </div>
    </div>
  );
}
