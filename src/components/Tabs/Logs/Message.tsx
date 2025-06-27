import { useContext, useEffect, useState } from "react";
import { LogsContext } from "../../../context/LogsContext";
import { Log } from "../../../interface/Logs";
import { UserContext } from "../../../context/UserContext";
import { socketService } from "../../../api/communications/socket/socketService";

type Props = {
  message: Log;
};
export default function Message({ message }: Props) {
  const { currentLog, setCurrentLog, changeStatus } = useContext(LogsContext);
  const { username } = useContext(UserContext)

  useEffect(() => {
    console.log("Updated currentMessage:", currentLog);
  }, [currentLog]);

  const handleClick = () => {
    setCurrentLog(message);
    if( message.status === "new") {
      changeStatus(message.id, "opened");
    }
  };

  const colorState = () => {
    switch (message.status) {
      case "opened":
        return "text-white-80";
      case "accepted":
        return "text-green";
      case "rejected":
        return "text-white-40";
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
      if (message.direction === "downlink") {
        return "/white-down-arrow.svg";
      } else {
        return "/arrow-up-bold-box.svg";
      }
    } else if (message.status === "accepted") {
      if (message.direction === "downlink") {
        return "/green-down-arrow.svg";
      } else {
        return "/arrow-up-bold-box.svg";
      }
    } else if (message.status === "rejected") {
      if (message.direction === "downlink") {
        return "/down-rejected.svg";   
      }
    } else {
      if (message.direction === "downlink")  {
        return "/white-down-arrow.svg";
      } else {
        return "/arrow-up-bold-box.svg";
      }
    }
  };

  const handleFromTo = () => {
    return (message.direction === "downlink") ? "To" : "From";  
  }

  return (
    <>
    {message ? (
    <div
      className={`flex justify-center items-center cursor-pointer`}
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
              {handleFromTo()}
            </span>{" "}
            {/*source a voir selon le format de la reception*/}
            <span className="ml-1 font-medium tetx-[14px]">{username}</span>
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
            {message.timeStamp}
          </div>
        </div>
      </div>
    </div>
    ) : (
    <div className="flex items-center justify-center w-full h-full">
      <p className="text-white-40">An error occurred</p>
    </div>
    )}
    </>
  );
}
