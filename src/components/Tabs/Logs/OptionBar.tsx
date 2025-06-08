import { useState } from "react";
import { Logs } from "../../../interfaces/MessageState";

export default function OptionBar({ message }: { message: Logs }) {
  const [option, setOption] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleRequest = (action: string) => {
    setOption(action);
    switch (action) {
      case "standby":
        message.state = "standby";
        console.log("Standby action triggered");
        break;
      case "accept":
        message.state = "accepted";
        console.log("Accept action triggered");
        break;
      case "reject":
        message.state = "rejected";
        console.log("Reject action triggered");
        break;
      case "load":
        message.state = "loaded";
        console.log("Load action triggered");
        break;
      default:
        console.error("Unknown action:", action);
    }
  };

  const addMessageLog = () => {
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 2000); // simulate send delay
  };

  return (
    <div className="flex justify-center w-full overflow-x-hidden">
      <div className="flex flex-col items-center justify-center w-full h-auto bg-nav-bar border border-[2px] border-white-10 rounded-md py-[16px] px-[15.5px] gap-2">
        <div className="flex flex-row gap-[31px] border border-[2px] border-white-10 rounded-md items-center justify-around w-[538px] h-[74px] py-[16px] px-[15.5px] bg-nav-bar">
          {["load", "standby", "reject", "accept"].map((item) => (
            <div
              key={item}
              className={`logs-options bg-white-10 px-4 py-2 rounded cursor-pointer ${
                option === item ? "border-2 border-dark-blue" : "border border-transparent"
              }`}
              onClick={() => handleRequest(item)}
            >
              {item}
            </div>
          ))}
        </div>

        {option === "accept" && (
          <>
            {!isSending && !isSent && (
              <button
                onClick={() => {
                  setIsSending(true);
                  addMessageLog();
                }}
                className="flex-1 px-4 py-2 rounded bg-dark-blue text-white-80 font-semibold tracking-wide hover:bg-dark-blue/80 transition-colors w-full uppercase"
              >
                Send
              </button>
            )}
            {isSending && !isSent && (
              <button
                disabled
                className="flex-1 px-4 py-2 rounded bg-gray-400 text-white font-semibold tracking-wide relative uppercase w-full"
              >
                Sending
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              </button>
            )}
            {isSent && (
              <button
                disabled
                className="flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded bg-green text-white font-semibold tracking-wide w-full"
              >
                <span className="uppercase">Sent</span>
                <img src="/check.svg" alt="Check Icon" className="w-6 h-6" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
