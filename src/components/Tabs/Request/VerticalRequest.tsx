import { useContext, useState } from "react";
import { VerticalOptionsArray } from "../../../constants/messages";
import VerticalOption from "./VerticalOption";
import { RequestContext } from "../../../context/RequestContext";
import { RequestCategory } from "../../../interfaces/Request";
import RequestContainer from "./RequestContainer";

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
                  {/* TIME */}
                  <label className="flex items-center gap-2 text-white/80 text-sm">
                    <input
                      disabled={disabled}
                      type="checkbox"
                      checked={selectedExtra === "time"}
                      onChange={() =>
                        setSelectedExtra(
                          selectedExtra === "time" ? null : "time",
                        )
                      }
                      className="w-4 h-4 rounded border border-white/20 bg-[#2B2B2C] checked:bg-white checked:border-white shadow-sm shadow-black/30 cursor-pointer"
                    />
                    <span>Time</span>
                  </label>

                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={2}
                      placeholder="HH"
                      pattern="^([0-1][0-9]|2[0-3])"
                      value={request.timeSelected?.hh || ""}
                      onChange={(e) =>
                        setRequest({
                          timeSelected: {
                            hh: e.target.value,
                            mm: request.timeSelected?.mm || "",
                          },
                        })
                      }
                      disabled={disabled || selectedExtra !== "time"}
                      className={`w-[45px] px-2 py-1 rounded border text-center text-sm tracking-widest shadow-sm ${
                        selectedExtra === "time"
                          ? "bg-medium-gray border-white/30 text-white"
                          : "bg-[#1a1a1a] border-white/10 text-white/40"
                      }`}
                    />
                    <span className="text-white/70">:</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={2}
                      placeholder="MM"
                      pattern="^([0-5][0-9])"
                      value={request.timeSelected?.mm || ""}
                      onChange={(e) =>
                        setRequest({
                          timeSelected: {
                            hh: request.timeSelected?.hh || "",
                            mm: e.target.value.replace(/\\D/g, "").slice(0, 2),
                          },
                        })
                      }
                      disabled={disabled || selectedExtra !== "time"}
                      className={`w-[45px] px-2 py-1 rounded border text-center text-sm tracking-widest shadow-sm ${
                        selectedExtra === "time"
                          ? "bg-medium-gray border-white/30 text-white"
                          : "bg-[#1a1a1a] border-white/10 text-white/40"
                      }`}
                    />
                  </div>

                  {/* POSITION */}
                  <label className="flex items-center gap-2 text-white/80 text-sm">
                    <input
                      disabled={disabled}
                      type="checkbox"
                      checked={selectedExtra === "position"}
                      onChange={() =>
                        setSelectedExtra(
                          selectedExtra === "position" ? null : "position",
                        )
                      }
                      className="w-4 h-4 rounded border border-white/20 bg-[#2B2B2C] checked:bg-white checked:border-white shadow-sm shadow-black/30 cursor-pointer"
                    />
                    <span>Position</span>
                  </label>
                  <input
                    type="text"
                    value={request.positionSelected || ""}
                    onChange={(e) =>
                      setRequest({
                        positionSelected: e.target.value
                          .toUpperCase()
                          .replace(/[^A-Z0-9]/g, "")
                          .slice(0, 6),
                      })
                    }
                    placeholder="ABC123"
                    disabled={disabled || selectedExtra !== "position"}
                    className={`w-[110px] px-2 py-1 rounded border text-center text-sm tracking-widest shadow-sm ${
                      selectedExtra === "position"
                        ? "bg-medium-gray border-white/30 text-white"
                        : "bg-[#1a1a1a] border-white/10 text-white/40"
                    }`}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </RequestContainer>
  );
}
