import { useContext, useEffect, useState } from "react";
import { Log} from "../../../interface/Logs";
import SendButton from "../../General/SendButton";
import { socketService } from "../../../api/communications/socket/socketService";
import { LogsContext } from "../../../context/LogsContext";
import ProgressSteps from "./ProgressSteps";

export default function OptionBar({ message }: { message: Log }) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [action, setAction] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState(false);
  const {changeStatus} = useContext(LogsContext);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const handleRequest = () => {
      setConfirmAction(true);
      setShowProgress(true);
    };

    socketService.listen("message_loadable", handleRequest);

    return () => {
      socketService.off("message_loadable", handleRequest);
    };
  }, []);

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
        changeStatus(message.id, "accepted");
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
    <div>
      {action === "load" && showProgress &&
      <ProgressSteps />
      }
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
              onClick={() => {
                setAction(item);
                if (item !== "load") {
                  setShowProgress(false);
                  setConfirmAction(true);
                } else {
                  socketService.send("load_message", { logId: message.id });
                }
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {action && confirmAction && (
          <>
            <SendButton
              onSend={() => {
                setIsSending(true);
                handleRequest();
                addMessageLog();
                socketService.send("fms_loaded", { logId: message.id })
              }}
            />
          </>
        )}
      </div>
    </div>
    </div>
  );
}
// import { useContext, useState } from "react";
// import { Log } from "../../../interfaces/Logs";
// import SendButton from "../../General/SendButton";
// import { socketService } from "../../../api/communications/socket/socketService";
// import { LogsContext } from "../../../context/LogsContext";
// import ProgressSteps from "./ProgressSteps";

// export default function OptionBar({ message }: { message: Log }) {
//   const [isSending, setIsSending] = useState(false);
//   const [isSent, setIsSent] = useState(false);
//   const [action, setAction] = useState<string | null>(null);
//   const [showProgress, setShowProgress] = useState(false);
//   const { changeStatus } = useContext(LogsContext);

//   const handleRequest = (type: string) => {
//     switch (type) {
//       case "standby":
//         changeStatus(message.id, "standby");
//         break;
//       case "accept":
//         changeStatus(message.id, "accepted");
//         break;
//       case "reject":
//         changeStatus(message.id, "rejected");
//         break;
//       case "load":
//         changeStatus(message.id, "loaded");
//         setShowProgress(true);
//         break;
//       default:
//         console.error("Unknown action:", type);
//     }
//   };

//   const addMessageLog = () => {
//     setTimeout(() => {
//       setIsSending(false);
//       setIsSent(true);
//     }, 2000);
//   };

//   return (
//     <div className="flex justify-center w-full overflow-x-hidden">
//       <div className="flex flex-col items-center justify-center w-full h-auto bg-nav-bar border border-[2px] border-white-10 rounded-md py-[16px] px-[15.5px] gap-2">
//         {/* Options */}
//         <div className="flex flex-row gap-[31px] border border-[2px] border-white-10 rounded-md items-center justify-around w-[538px] h-[74px] py-[16px] px-[15.5px] bg-nav-bar">
//           {["load", "standby", "reject", "accept"].map((item) => (
//             <div
//               key={item}
//               className={`logs-options bg-white-10 px-4 py-2 rounded cursor-pointer ${
//                 action === item
//                   ? "border-2 border-dark-blue"
//                   : "border border-transparent"
//               }`}
//               onClick={() => {
//                 setAction(item);
//                 if (item !== "accept") {
//                   handleRequest(item);
//                 }
//               }}
//             >
//               {item.toUpperCase()}
//             </div>
//           ))}
//         </div>

//         {/* Barre de progression pour LOAD */}
//         {action === "load" && showProgress && <ProgressSteps />}

//         {/* Bouton SEND uniquement pour ACCEPT */}
//         {action === "accept" && (
//           <SendButton
//             onSend={() => {
//               setIsSending(true);
//               handleRequest("accept");
//               addMessageLog();
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
