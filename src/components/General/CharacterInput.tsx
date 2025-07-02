import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { InputContext } from "@/context/InputContext";
import { CharacterInputProps } from "@/interface/props/General";

export default function CharacterInput({
  name,
  value,
  length,
  style,
  disabled = false,
  onChange,
  onEnter,
}: CharacterInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isConnectionPossible } = useContext(GlobalContext);
  const { targetInput } = useContext(InputContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (value: string) => {
    const clean = value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, length);
    onChange(clean);
    if (onEnter) {
      onEnter(clean);
    }
  };

  useEffect(() => {
    if (isConnectionPossible) {
      inputRef.current?.focus();
    } else {
      handleChange("");
    }
  }, [isConnectionPossible]);

  useEffect(() => {
      if (targetInput === name && isConnectionPossible) {
      inputRef.current?.focus();
    }
  }, [targetInput, isConnectionPossible]);

  return (
    <div className={`flex w-[65px] ${style}`}>
      <div
        onClick={() => inputRef.current?.focus()}
        className={`flex items-center gap-[1px] p-[3px] border border-[2px] rounded-md cursor-text transition-all
          ${disabled ? "bg-[#2b2b2b] border-white/15 opacity-50 cursor-not-allowed" : "bg-[#1e1e1e] border-white-10"}
        `}
      >
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className={`w-3 text-base font-mono text-center relative
              ${value[i] ? "text-white" : "text-white/40"}
              ${value[i] || disabled ? "border-b border-medium-gray" : "border-b border-[#1e1e1e]"}
            `}
          >
            {value[i] ??
              (i === value.length && isFocused && !disabled ? (
                <span className="text-white animate-blink absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  |
                </span>
              ) : (
                "_"
              ))}
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute opacity-0 w-0 h-0"
          autoFocus={false}
        />
      </div>
    </div>
  );
}
