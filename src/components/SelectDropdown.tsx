import { useState, useRef, useEffect } from "react";

type Props = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: string;
};

export default function SelectDropdown({
  options,
  value,
  onChange,
  icon,
}: Props) {
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
          className="w-full min-w-[150px] flex items-center justify-between bg-zinc-800 text-white px-4 py-2 text-sm rounded-md border border-zinc-700 hover:bg-zinc-700 transition"
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
          <ul className="absolute z-10 w-full min-w-[150px] mt-1 bg-zinc-800 border border-zinc-700 rounded-md shadow-md overflow-y-auto overflow-x-hidden max-h-40">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="flex justify-center px-4 py-2 hover:bg-zinc-700 cursor-pointer text-sm text-white border-t border-b border-zinc-700 first:border-t-0 last:border-b-0"
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
