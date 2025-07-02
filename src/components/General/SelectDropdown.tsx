import { SelectDropdownProps } from "@/interface/props/General";
import { useState, useRef, useEffect } from "react";

export default function SelectDropdown({
  options,
  value,
  onChange,
  icon,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="flex items-center justify-between gap-4 py-1"
    >
      <div className="relative w-full">
        <button
          className="w-full min-w-[100px] flex items-center justify-between bg-[#1e1e1e] text-white p-[5px] border border-[2px] border-white-10 rounded-md cursor-text transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            {icon && (
              <img src={icon} alt="icon" className="w-[20px] h-[20px]" />
            )}
            <span>{value}</span>
          </div>
          <img
            src="/arrow-down.svg"
            alt="arrow"
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <ul className="absolute z-10 w-full min-w-[100px] mt-1 bg-[#1e1e1e] p-[5px] border border-[2px] border-white-10 rounded-md cursor-text overflow-y-auto overflow-x-hidden max-h-40">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="flex justify-center px-4 py-2 hover:bg-zinc-800 cursor-pointer text-sm text-white border-t border-b border-zinc-700 first:border-t-0 last:border-b-0"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
