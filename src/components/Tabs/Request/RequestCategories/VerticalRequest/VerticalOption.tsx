import { useContext, useState } from "react";
import { RequestContext } from "../../../../../context/RequestContext";
import CustomRadio from "../../../../General/CustomRadio";

type Props = {
  message: { ref: string; content: string; nbOfInputs: number };
  isActive: boolean;
  disabled?: boolean;
  onSelect: () => void;
  onUpdateArguments: (args: string[]) => void;
};

export default function VerticalOption({
  message,
  isActive,
  disabled,
  onSelect,
  onUpdateArguments,
}: Props) {
  const [inputValues, setInputValues] = useState<string[]>([]);
  const { setRequest } = useContext(RequestContext);
  const parts = message.content.split(/\[level\]/g);
  const levelCount = message.content.match(/\[level\]/g)?.length || 0;

  if (inputValues.length !== levelCount) {
    setInputValues(Array(levelCount).fill(""));
  }

  const handleChange = (index: number, value: string) => {
    console.log("handleChange", index, value);
    const newValues = [...inputValues];
    newValues[index] = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
    setInputValues(newValues);
    onUpdateArguments(newValues);
    identifyRef(newValues);
  };

  const identifyRef = (values: string[] = inputValues) => {
    if (!message.ref) return;
    setRequest({
      arguments: values,
      messageRef: message.ref,
      timeStamp: new Date(),
    });
  };

  return (
  <div onClick={!disabled ? onSelect : undefined}>
  <CustomRadio
  value={message.ref}
  selected={isActive ? message.ref : ""}
  onChange={() => {
    if (!isActive) onSelect();
  }}
  label={
    <div className="flex flex-wrap items-center gap-1">
      {parts.map((text, i) => (
        <span key={i} className="flex items-center gap-1">
          {text}
          {i < levelCount &&
            (isActive ? (
              <input
                disabled={disabled}
                type="text"
                value={inputValues[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-[60px] px-1 py-1 bg-medium-gray rounded border border-white/30 text-white text-center uppercase text-sm tracking-widest"
                placeholder="FLxxx"
              />
            ) : (
              <span className="italic text-white/40">LEVEL</span>
            ))}
        </span>
      ))}
    </div>
  }
/>

    </div>
  );
}
