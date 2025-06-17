import { useContext, useEffect, useState } from "react";
import { LogsContext } from "../../../context/LogsContext";
import { Log } from "../../../interfaces/Logs";

type Props = {
  message: Log;
};
export default function Message({ message }: Props) {
  const { currentLog, setCurrentLog } = useContext(LogsContext);

  function getFormattedTime() {
    const now = new Date();

    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      //hour12: false,
      timeZone: "America/New_York",
    });
  }

  const [time] = useState(getFormattedTime());
  useEffect(() => {
    console.log("Updated currentMessage:", currentLog);
  }, [currentLog]);

  const handleClick = () => {
    //eventuellement devient un reducer
    setCurrentLog(message.id);
    if (message.status === "new") {
      message.status = "opened";
    }
  };

  const colorState = () => {
    switch (message.status) {
      case "opened":
        return "text-white-80";
      case "accepted":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      case "time out":
        return "text-gray-500";
      default:
        return "text-light-blue";
    }
  };

  const messageType = () => {
    if (message.status === "new") {
      return "/up-arrow.svg";
    } else if (message.status === "opened") {
      if (message.ref.includes("DM")) {
        return "/white-down-arrow.svg";
      } else {
        return "/arrow-up-bold-box.svg";
      }
    } else if (message.status === "accepted") {
      if (message.ref.includes("DM")) {
        return "/green-down-arrow.svg";
      } else {
        return "/arrow-up-bold-box.svg";
      }
    } else {
      if (message.ref.includes("DM")) {
        return "/white-down-arrow.svg";
      } else {
        return "/arrow-up-bold-box.svg";
      }
    }
  };

  return (
    <div
      className={`flex justify-center items-center ${message.status === "new" ? "cursor-pointer" : ""}`}
      onClick={() => handleClick()}
    >
      <img
        src={messageType()}
        alt="arrow"
        className="w-[22px] h-[22px] mb-[30px]"
      ></img>
      <div className="container flex flex-col items-start w-[516px] h-[87px] p-[8px]">
        <div className="flex items-center w-full h-auto justify-between align-baseline">
          <div>
            <span className="uppercase text-white-40 font-medium tetx-[14px]">
              from
            </span>{" "}
            {/*source a voir selon le format de la reception*/}
            <span className="ml-1 font-medium tetx-[14px]">CYUL</span>
          </div>
          <div className="h-[17px] bg-white-10 rounded flex items-center justify-center">
            <span
              className={`uppercase text-[14px] ${colorState()} font-semibold`}
            >
              {message.status}
            </span>
          </div>
        </div>
        <div className="-mt-1 flex items-center w-full h-auto justify-between align-baseline">
          <span
            className={`font-semibold text-[16px] not-italic leading-norm ${colorState()} self-stretch tracking-wider`}
          >
            {message.element}
          </span>
          <div className="text-white-40 text-right font-medium text-[15px] not-italic leading-normal font-sans flex-shrink-0">
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}
