import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { InputContext } from "../../context/InputContext";

type Props = {
  value: string;
  length: number;
  style?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onEnter?: (value: string) => void;
};

export default function CharacterInput({
  value,
  length,
  style,
  disabled = false,
  onChange,
  onEnter,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isConnectionPossible } = useContext(UserContext);
  const { targetInput } = useContext(InputContext);
  const [inputValues, setInputValues] = useState<string[]>([]);

  const handleChange = (value: string) => {
    const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, length);
    const characters = clean.split("");
    setInputValues(characters);
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
    inputRef.current?.focus();
  }, [targetInput]);

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
          onChange={(e) => handleChange(e.target.value)}
          className="absolute opacity-0 w-0 h-0"
          autoFocus
        />
      </div>
    </div>
  );
}
