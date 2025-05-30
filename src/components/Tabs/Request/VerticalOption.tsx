type Props = {
  requestTemplate: string;
  isActive: boolean;
  onSelect: () => void;
};

import { useState } from "react";

export default function VerticalOption({ requestTemplate, isActive, onSelect }: Props) {
  const [inputValues, setInputValues] = useState<string[]>([]);
  const parts = requestTemplate.split(/\[level\]/g);
  const levelCount = requestTemplate.match(/\[level\]/g)?.length || 0;

  if (inputValues.length !== levelCount) {
    setInputValues(Array(levelCount).fill(""));
  }

  const handleChange = (index: number, value: string) => {
    const newValues = [...inputValues];
    newValues[index] = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
    setInputValues(newValues);
  };

  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-1 flex-wrap px-3 py-1 rounded cursor-pointer transition
        ${isActive ? "bg-zinc-800 text-white" : "hover:bg-zinc-700 text-white/80"}`}
    >
      <input type="checkbox" checked={isActive} readOnly className="cursor-pointer" />
      {parts.map((text, i) => (
        <span key={i} className="flex items-center gap-1">
          {text}
          {i < levelCount &&
            (isActive ? (
              <input
                type="text"
                value={inputValues[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-[60px] px-1 py-1 bg-zinc-900 border border-zinc-700 text-white rounded text-center uppercase text-sm tracking-widest"
                placeholder="FLxxx"
              />
            ) : (
              <span className="italic text-white/40">LEVEL</span>
            ))}
        </span>
      ))}
    </div>
  );
}
