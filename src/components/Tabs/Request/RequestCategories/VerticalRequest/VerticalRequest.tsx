import { useContext, useState } from "react";
import { VerticalOptionsArray } from "../../../../../constants/messages";
import VerticalOption from "./VerticalOption";
import { RequestContext } from "../../../../../context/RequestContext";
import { RequestCategory } from "../../../../../interfaces/Request";
import RequestContainer from "./../../RequestContainer";
import PositionInput from "./PositionInput";
import TimeInput from "./TimeInput";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export default function VerticalRequests({ onClick, disabled = false }: Props) {
  const [selectedMessage, setSelectedMessage] = useState<{
    ref: string;
    content: string;
    nbOfInputs: number;
  } | null>(null);
  const [selectedExtra, setSelectedExtra] = useState<
    "time" | "position" | null
  >(null);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { request, setRequest } = useContext(RequestContext);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSelectedMessage(null);
      setSelectedExtra(null);
    }
  };

  const handleSelectMessage = (message) => {
    if (selectedMessage !== message) {
      setInputValues([]);
    }
    setSelectedMessage(message);
  };

  const defineMessageRef = (message) => {
    if (!message) return;

    const base = message.content.includes("CLIMB TO")
      ? "CLIMB"
      : message.content.includes("DESCENT TO")
        ? "DESCENT"
        : null;

    if (!base) return;

    const key = `${base}_${selectedExtra || "default"}`;

    const refMap: Record<string, string> = {
      CLIMB_default: "DM9",
      DESCENT_default: "DM10",
      CLIMB_time: "DM13",
      DESCENT_time: "DM14",
      CLIMB_position: "DM11",
      DESCENT_position: "DM12",
    };

    const messageRef = refMap[key];
    if (!messageRef) return;

    setRequest({
      arguments: inputValues,
      messageRef,
      timeStamp: new Date(),
    });
  };

  return (
    <RequestContainer
      requestType={RequestCategory.VERTICAL}
      isOpen={isOpen}
      onToggle={handleClick}
      disabled={disabled}
      showSendButton={
        !!(selectedMessage && selectedMessage.nbOfInputs === inputValues.length)
      }
      onSend={() => {
        onClick();
        defineMessageRef(selectedMessage);
      }}
    >
      <div className="flex items-center gap-3 mt-3">
        <div className="flex flex-row items-center gap-1.5">
          <p
            className={`text-white/80 font-open ${isOpen ? "text-[16px]" : "text-[14px]"} font-normal leading-[18px] uppercase min-w-[60px]`}
          >
            request
          </p>
          <p
            className={`w-400 text-white/80 font-open text-[14px] font-normal leading-[18px] uppercase ${isOpen ? "hidden" : ""}`}
          >
            to climb, descend, or change flight level
          </p>
        </div>

        <div className="flex flex-row w-full">
          <div
            className={`flex flex-col items-start gap-2 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              isOpen ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            {VerticalOptionsArray.map((message, index) => (
              <VerticalOption
                key={index}
                message={message}
                isActive={selectedMessage?.content === message.content}
                disabled={disabled}
                onSelect={() => handleSelectMessage(message)}
                onUpdateArguments={setInputValues}
              />
            ))}
          </div>

          <div className="flex flex-col relative ml-[20px] w-[175px]">
            {isOpen &&
              selectedMessage &&
              (selectedMessage.content.includes("CLIMB TO") ||
                selectedMessage.content.includes("DESCENT TO")) && (
                <div className="flex flex-col gap-2 pl-4 pt-2">
                  <TimeInput
                    disabled={disabled}
                    selected={selectedExtra === "time"}
                    onToggle={() =>
                      setSelectedExtra(selectedExtra === "time" ? null : "time")
                    }
                    hh={request.timeSelected?.hh || ""}
                    mm={request.timeSelected?.mm || ""}
                    onChange={(hh, mm) =>
                      setRequest({ timeSelected: { hh, mm } })
                    }
                  />
                  <PositionInput
                    disabled={disabled}
                    selected={selectedExtra === "position"}
                    onToggle={() =>
                      setSelectedExtra(
                        selectedExtra === "position" ? null : "position",
                      )
                    }
                    value={request.positionSelected || ""}
                    onChange={(value) =>
                      setRequest({ positionSelected: value })
                    }
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </RequestContainer>
  );
}
