import { useState, useRef, useContext } from "react";
import users from "../../../data/users.json";
import { UserContext } from "../../../context/UserContext";

type Props = {
  length?: number;
};

export default function Logon({ length = 4 }: Props) {
  const { connectionState, setConnectionState, username, setUsername } =
    useContext(UserContext);
  const inputRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setUsername(raw.slice(0, length));
  };

  const validValue = () => {
    return username.length === length;
  };

  function validateEntry(input: string) {
    if (input.length !== length) {
      return false;
    }
    const result = users.some(
      (user) => user.username.toUpperCase().replace(/[^A-Z0-9]/g, "") === input,
    );
    if (result) {
      setUsername(input.toUpperCase().replace(/[^A-Z0-9]/g, ""));
      setTimeout(() => {
        setConnectionState(true);
      }, 1000);
    }
    return result;
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      validateEntry(inputRef.current.value);
    }
  };

  return (
    <div className="container flex items-center justify-between">
      <h2>Logon to</h2>
      <div>
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex items-center gap-2 p-2 border border-[2px] border-white-10 rounded-md bg-[#1e1e1e] cursor-text mr-[155px]"
        >
          {Array.from({ length }).map((_, i) => (
            <div
              key={i}
              className="w-4 text-white text-lg font-mono border-b border-medium-gray text-center"
            >
              {username[i] ?? "_"}
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={username}
            onChange={handleChange}
            onKeyDown={handleEnter}
            className="absolute opacity-0 w-0 h-0"
            autoFocus
          />
        </div>
      </div>
      {!connectionState && (
        <button
          disabled={!validValue()}
          onClick={() => {
            validateEntry(inputRef.current.value)
              ? setConnectionState(true)
              : setConnectionState(false);
          }}
          className={`flex items-center justify-center gap-2 px-4 py-2 w-[149px] h-[48px] ${validValue() ? "bg-dark-blue hover:bg-dark-blue/70 cursor-pointer" : "bg-white-50"} text-white text-sm font-semibold rounded-md`}
        >
          <img src="/send.svg" alt="Send Icon" className="w-[20px] h-[20px]" />
          <span className="text-white-80 text-[14px] leading-[18px] whitespace-nowrap font-bold text-center">
            SEND LOGON
          </span>
        </button>
      )}
      {connectionState && (
        <button
          disabled
          className="flex items-center justify-center gap-2 px-4 py-2 w-[149px] h-[48px] bg-green text-white text-sm font-semibold rounded-md"
        >
          <span className="text-white-80 text-[16px] leading-[18px] whitespace-nowrap font-bold text-center tracking-wide uppercase">
            Connected
          </span>
        </button>
      )}
    </div>
  );
}
