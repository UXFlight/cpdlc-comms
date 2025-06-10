// components/HiddenCharacterInput.tsx
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";

type Props = {
  value: string;
  length: number;
  disabled?: boolean;
  onChange: (value: string) => void;
  onEnter: (value: string) => void;
};

export default function CharacterInput({
  value,
  length,
  disabled = false,
  onChange,
  onEnter,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {isConnectionPossible} = useContext(UserContext);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    onChange(raw.slice(0, length));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter(inputRef.current?.value ?? "");
    }
  };

  useEffect(() => {
    if (isConnectionPossible) {
      inputRef.current.focus();
    } else {
      onChange("");
    }
  }, [isConnectionPossible])

  return (
  <div className="flex flex-col">
    <div
      onClick={() => inputRef.current?.focus()}
      className={`flex items-center gap-1 p-1 border border-[2px] rounded-md cursor-text mr-[155px] transition-all
        ${disabled ? "bg-[#2b2b2b] border-white/15 opacity-50 cursor-not-allowed" : "bg-[#1e1e1e] border-white-10"}
      `}
    >
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className={`w-4 text-lg font-mono text-center relative
            ${value[i] ? "text-white" : "text-white/40"}
            ${value[i] || disabled ? "border-b border-medium-gray" : "border-b border-[#1e1e1e]"}
          `}
        >
          {value[i] ?? (
            i === value.length && !disabled ? (
              <span className="text-white animate-blink absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                |
              </span>
            ) : (
              "_"
            )
          )}
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={value}
        disabled={disabled}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 w-0 h-0"
        autoFocus
      />
    </div>
  </div>
);
}
