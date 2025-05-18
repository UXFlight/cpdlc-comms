import React, { useState } from "react";
import CharInput from "./CharInput";

export default function Logon() {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  return (
    <div className="container flex items-center justify-between">
        <h2>Logon to</h2>
        <div>
          <CharInput length={4} onResult={setIsValid} />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 w-[149px] h-[48px] bg-dark-blue text-white text-sm font-semibold rounded-md hover:bg-dark-blue/70 cursor-pointer transition">
        <img src="/send.svg" alt="Send Icon" className="w-[20px] h-[20px]" />
        <span className="text-white-80 text-[14px] leading-[18px] whitespace-nowrap font-bold text-center">
          SEND LOGON
        </span>
        </button>
        <div>
        {isValid == true && (
          <div className="container flex items-center justify-between">login ok</div>
        )}
        {isValid == false && (
          <div className="container flex items-center justify-between">login pas ok</div>
        )}
        </div>
    </div>

  );
}
