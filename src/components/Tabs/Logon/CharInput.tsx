import { useState, useRef } from "react";
import users from "../../../data/users.json"

export default function CharInput({ length = 4 }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const raw = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setValue(raw.slice(0, length));
  };

  function temporaryFunction(input: string) { 
    users.find((user) => user.username.toUpperCase().replace(/[^A-Z0-9]/g, "") === input);

  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      inputRef.current?.blur();
    }

  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex items-center gap-2 p-2 border border-[2px] border-white-10 rounded-md bg-[#1e1e1e] cursor-text mr-[155px]"
    >
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className="w-4 text-white text-lg font-mono border-b border-medium-gray text-center"
        >
          {value[i] ?? "_"}
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleEnter}
        className="absolute opacity-0 w-0 h-0"
        autoFocus
      />
    </div>
  );
}
