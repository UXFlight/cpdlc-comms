import MessageContainer from "./MessageContainer";
import { MessageContext } from "../../../context/MessageContext";
import { useContext, useState } from "react";
import MessageDisplayTab from "./MessageDisplayTab";
import OptionBar from "./OptionBar";
import SelectDropdown from "../../General/SelectDropdown";
import { LogsArray } from "../../../constants/logs";

export default function LogsTab() {
  const { currentMessage, setCurrentMessage } = useContext(MessageContext);
  const [value, setValue] = useState("FILTER BY");

  const findMessageById = (id) => {
    return LogsArray.find((msg) => msg.id === id);
  };

  return (
    <div className="flex flex-col h-full">
      {!currentMessage && (
        <div className="flex flex-col h-full px-4 pt-4 gap-4 text-white">
          <div className="flex flex-row items-center justify-between">
            <h1>message log</h1>
            <SelectDropdown
              options={[
                "NEW",
                "OPENED",
                "ACCEPTED",
                "REJECTED",
                "STANDBY",
                "TIME OUT",
              ]}
              value={value}
              onChange={setValue}
              icon="/fans-button.svg"
            />
          </div>
          <div className="flex-grow overflow-y-auto">
            <MessageContainer messages={LogsArray} />
          </div>
        </div>
      )}
      {currentMessage && (
        <div className="flex flex-col h-full px-4 pt-4 gap-4 text-white">
          <div className="flex flex-row items-center justify-between">
            <div
              onClick={() => setCurrentMessage(null)}
              className="flex gap-0 text-white rounded cursor-pointer justify-center items-center"
            >
              <img
                src="/arrow-back.svg"
                alt="icon"
                className="w-auto h-[25px]"
              />
              <h1>message log</h1>
            </div>
          </div>
          <div className="flex flex-col h-full gap-4">
            <div className="rounded w-full">
              <MessageDisplayTab message={findMessageById(currentMessage)} />
            </div>
            <div className="mt-auto mb-4">
              <OptionBar message={findMessageById(currentMessage)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* <div className="relative w-[130.962px] h-[36px]">
<div className="absolute inset-0 flex items-center gap-2 bg-white-10 text-white px-3 py-2 rounded pointer-events-none">
<img
  src="/filterBy.svg"
  alt="icon"
  className="w-[23.548px] h-[20px]"
/>
<span className="scroll-btn">FILTER BY</span>
</div>
<select
className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
defaultValue="1"
>
<option className="scroll-btn bg-middle-gray" value="1">
  NEW
</option>
<option className="scroll-btn" value="2">
  OPENED
</option>
<option className="scroll-btn" value="3">
  ACCEPTED
</option>
<option className="scroll-btn" value="4">
  REJECTED
</option>
<option className="scroll-btn" value="4">
  STANDBY
</option>
<option className="scroll-btn" value="4">
  TIME OUT
</option>
</select>
</div> */
}
