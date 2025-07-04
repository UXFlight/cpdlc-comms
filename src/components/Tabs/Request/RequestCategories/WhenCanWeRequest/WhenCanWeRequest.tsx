import { useContext, useState } from "react";
import CustomRadio from "@/components/General/CustomRadio";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import { RequestProps } from "@/interface/props/Request";
import SelectDropdown from "@/components/General/SelectDropdown";
import {
  CLIMB_DESCEND_OPTIONS,
  LEVEL_ALTITUDE_OPTIONS,
} from "@/constants/tabs/Request";
import CharacterInput from "@/components/General/CharacterInput";
import BlockData from "../../BlockData";
import { RequestContext } from "@/context/RequestContext";
import { InputContext } from "@/context/InputContext";

export function WhenCanWeRequest({ onSend, onOpen, disabled = false }: RequestProps) {
  const {request, setRequest} = useContext(RequestContext);
    const { setTargetInput } = useContext(InputContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [level, setLevel] = useState<string>("");
  const [climbDescend, setClimbDescend] = useState<string>("CLIMB/DESCENT");
  const [climbDescendLevel, setClimbDescendLevel] = useState<string>("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSend = () => {
    let args: string[] = [];
    switch (selectedOption) {
      case "change_altitude":
        args = [level];
        break;
      case "climb_descend":
        args = [climbDescendLevel];
        break;
      case "speed_range":
        args = to ? [from, to] : [from];
        break;
      case "back_on_route":
        args = [];
        break;
      default:
        return;
    }
    setRequest({ arguments: args});
    onSend();
  };

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpen(newState);
    if (!newState) {
      setSelectedOption("");
      setLevel("");
      setClimbDescend("CLIMB/DESCENT");
      setClimbDescendLevel("");
      setFrom("");
      setTo("");
    }
  };

  return (
    <RequestContainer
      requestType="WHEN CAN WE EXPECT"
      isOpen={isOpen}
      onToggle={handleToggle}
      showSendButton={selectedOption !== null && selectedOption !== ""}
      disabled={disabled}
      onSend={handleSend}
    >
      <div className={`flex flex-col gap-2 mt-1 ${!isOpen ? "hidden" : ""}`}>
        <div className="request-element">
          <CustomRadio
            value="change_altitude"
            selected={selectedOption || ""}
            onChange={setSelectedOption}
            label={
              <div className="inner-request-element mr-25">
                <p className="whitespace-nowrap uppercase">Change Altitude/Level</p>
                <SelectDropdown
                  options={LEVEL_ALTITUDE_OPTIONS}
                  value={level}
                  onChange={(value) => {
                    setLevel(value);
                    value === "LOWER" ? setRequest({messageRef:"DM52"}) : setRequest({messageRef:"DM53"});
                  }}
                />
              </div>
            }
          />
        </div>
        <div className="request-element">
          <CustomRadio
            value="climb_descend"
            selected={selectedOption || ""}
            onChange={setSelectedOption}
            label={
              <div className="flex flex-row items-center justify-start w-full h-[35px] gap-4.5">
                <SelectDropdown
                  options={CLIMB_DESCEND_OPTIONS}
                  defaultValue="CLIMB/DESCENT"
                  value={climbDescend}
                  onChange={(value) => {
                    setClimbDescend(value);
                    setTargetInput("climb_descend");
                    value === "CLIMB" ? setRequest({messageRef:"DM87"}) : setRequest({messageRef:"DM88"});
                  }}
                />
                <p className="whitespace-nowrap uppercase text-white/80 font-open text-[16px]">
                  to Altitude
                </p>
                <CharacterInput
                  name="climb_descend"
                  value={climbDescendLevel}
                  length={5}
                  style="mr-[62px]"
                  disabled={disabled || selectedOption !== "climb_descend"}
                  onChange={setClimbDescendLevel}
                />
              </div>
            }
          />
        </div>
        <div className="request-element">
          <CustomRadio
            value="speed_range"
            selected={selectedOption || ""}
            onChange={(value)=> {
              setSelectedOption(value);
              setTargetInput("block-data-from");
            }}
            label={
              <BlockData
                label="Speed or range of speed"
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                isOpen={isOpen}
                disabled={disabled}
              />
            }
          />
        </div>
        <CustomRadio
          value="back_on_route"
          selected={selectedOption || ""}
          onChange={(value)=> {
            setSelectedOption(value);
            setRequest({messageRef:"DM51"});
          }}
          label={
            <p className="uppercase">Back on Route</p>
          }
        />
      </div>
    </RequestContainer>
  );
}
