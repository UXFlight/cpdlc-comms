import { useState } from "react";
import { Logs } from "../../../interfaces/MessageState";
import SendButton from "../../General/SendButton";

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
                option === item
                  ? "border-2 border-dark-blue"
                  : "border border-transparent"
              }`}
              onClick={() => handleRequest(item)}
            >
              {item}
            </div>
          ))}
        </div>

        {option === "accept" && (
          <>
            <SendButton
              onSend={() => {
                setIsSending(true);
                addMessageLog();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
