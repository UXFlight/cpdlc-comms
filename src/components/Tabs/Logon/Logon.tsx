import { useState, useRef, useContext, use } from "react";
import users from "../../../data/users.json";
import { UserContext } from "../../../context/UserContext";
import CharacterInput from "../../General/CharacterInput";
import { socketService } from "../../../api/communications/socket/socketService";

type Props = {
  length?: number;
  flightDetails?: any;
};

export default function Logon({ length = 4, flightDetails }: Props) {
  const { connectionState, setConnectionState, isConnectionPossible, username, setUsername } = useContext(UserContext);

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
        setConnectionState(true);
        socketService.send("sucessfull_connection", input);
        return result;
    }
  }

  return (
    <div className="container flex items-center justify-between">
      <h2 className={`${!isConnectionPossible ? "text-white/40" : "text-white"}`}>Logon to</h2>
      <div>
        <CharacterInput
          value={username}
          length={length}
          disabled={!isConnectionPossible}
          onChange={(val) => setUsername(val)}
          onEnter={(val) => validateEntry(val)}
        />
      </div>
      {!connectionState && (
        <button
          disabled={!validValue() && !isConnectionPossible}
          onClick={() => {
            validateEntry(username)
              ? setConnectionState(true)
              : setConnectionState(false);
          }}
          className={`flex items-center justify-center gap-2 px-4 py-2 w-[149px] h-[48px] ${validValue() ? "bg-dark-blue hover:bg-dark-blue/70 cursor-pointer" : "bg-white-10"} text-white text-sm font-semibold rounded-md`}
        >
          <img src="/send.svg" alt="Send Icon" className="w-[20px] h-[20px]" />
          <span className="text-white-80 text-[14px] leading-[18px] whitespace-nowrap font-bold text-center">
            SEND LOGON
          </span>
        </button>
      )}
      {(connectionState && isConnectionPossible) && (
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
