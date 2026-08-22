import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { InputContext } from "@/context/InputContext";
import { CharacterInputProps } from "@/interface/props/General";

export default function CharacterInput({
  name,
  value,
  length,
  style = "w-[65px]",
  disabled = false,
  onChange,
  onEnter,
  options = [],
}: CharacterInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isConnectionPossible } = useContext(GlobalContext);
  const { targetInput } = useContext(InputContext);
  const [isFocused, setIsFocused] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleChange = useCallback(
    (nextValue: string) => {
      const clean = nextValue
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, length);
      onChange(clean);
      if (onEnter) {
        onEnter(clean);
      }
    },
    [length, onChange, onEnter],
  );

  useEffect(() => {
    if (isConnectionPossible) {
      inputRef.current?.focus();
    } else {
      handleChange("");
    }
  }, [isConnectionPossible, handleChange]);

  useEffect(() => {
    if (targetInput === name && isConnectionPossible) inputRef.current?.focus();
  }, [targetInput, name, isConnectionPossible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const focusInput = () => {
    if (disabled) return;
    inputRef.current?.focus();
    setIsOptionsOpen(options.length > 0);
  };

  return (
    <div ref={containerRef} className={`relative flex ${style}`}>
      <div
        onClick={focusInput}
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
          onKeyDown={(event) => {
            if (event.key === "Escape") setIsOptionsOpen(false);
          }}
          className="absolute opacity-0 w-0 h-0"
          autoFocus={false}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOptionsOpen}
          aria-controls={
            options.length > 0 ? "character-input-options" : undefined
          }
        />
      </div>

      {isOptionsOpen && (
        <div
          id="character-input-options"
          className="absolute left-0 top-full z-20 mt-2 w-fit overflow-hidden rounded-md border border-white/15 bg-[#1e1e1e] shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
        >
          <ul className="max-h-36 overflow-y-auto p-1" role="listbox">
            {options.map((option) => (
              <li key={option} role="option" aria-selected={value === option}>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleChange(option);
                    setIsOptionsOpen(false);
                  }}
                  className={`w-full rounded px-3 py-2 text-left font-mono text-sm tracking-[0.18em] transition-colors ${
                    value === option
                      ? "bg-dark-blue text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
