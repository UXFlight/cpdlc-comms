import { AdditionalMessagesProps } from "@/interface/props/Request";
import CustomCheckbox from "@/components/General/CustomCheckbox";

export default function AdditionalMessages({
  extraMessages,
  selected,
  onChange,
}: AdditionalMessagesProps) {
  return (
    <div className="mt-2">
      <p className="text-white/60 font-open text-[14px] font-normal leading-[18px] tracking-wider mb-2">
        Additional Message:
      </p>
      <div className="flex flex-col gap-2">
        {extraMessages.map((msg) => (
          <CustomCheckbox
            key={msg}
            label={msg}
            checked={selected.includes(msg)}
            onChange={() => onChange(msg)}
          />
        ))}
      </div>
    </div>
  );
}
