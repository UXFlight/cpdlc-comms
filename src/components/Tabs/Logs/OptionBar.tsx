import { useContext, useState } from "react";
import { Log} from "../../../interfaces/Logs";
import SendButton from "../../General/SendButton";
import { socketService } from "../../../api/communications/socket/socketService";
import { LogsContext } from "../../../context/LogsContext";

export default function OptionBar({ message }: { message: Log }) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [action, setAction] = useState<string | null>(null);
  const {changeStatus} = useContext(LogsContext);

  const handleRequest = () => {
    switch (action) {
      case "standby":
        changeStatus(message.id, "standby");
        break;
      case "accept":
        changeStatus(message.id, "accepted");
        break;
      case "reject":
        changeStatus(message.id, "rejected");
        break;
      case "load":
        message.status = "loaded";
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
                action === item
                  ? "border-2 border-dark-blue"
                  : "border border-transparent"
              }`}
              onClick={() => setAction(item)}
            >
              {item}
            </div>
          ))}
        </div>

        {action === "accept" && (
          <>
            <SendButton
              onSend={() => {
                setIsSending(true);
                handleRequest();
                addMessageLog();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
