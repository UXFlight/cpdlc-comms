import { useContext, useState } from "react";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import AdditionalMessages from "@/components/Tabs/Request/AdditionalMessages";
import { RequestProps } from "@/interface/props/Request";
import {
  ADDITIONAL_MESSAGES,
  DIRECTIONS_OPTIONS,
  RequestCategory,
} from "@/constants/tabs/Request";
import StepAtInput from "@/components/General/StepAtInput";
import CharacterInput from "@/components/General/CharacterInput";
import { RequestContext } from "@/context/RequestContext";
import { resolveMessageRef } from "@/utils/messageIdentification";
import { InputContext } from "@/context/InputContext";
import SelectDropdown from "@/components/General/SelectDropdown";

export function OffsetRequest({ onSend, onOpen, disabled = false }: RequestProps) {
  const { request, setRequest } = useContext(RequestContext);
  const { setTargetInput } = useContext(InputContext);
  const [isOpen, setIsOpen] = useState(false);
  const [distance, setDistance] = useState("");
  const [direction, setDirection] = useState("");

  const [positionSelected, setPositionSelected] = useState(false);
  const [position, setPosition] = useState("");

  const [timeSelected, setTimeSelected] = useState(false);
  const [time, setTime] = useState({ hh: "", mm: "" });
  const [extras, setExtras] = useState<string[]>([]);

  const toggleExtra = (val: string) => {
    setExtras((prev) =>
      prev.includes(val) ? prev.filter((m) => m !== val) : [...prev, val],
    );
  };

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpen(newState)
    if (!newState) {
      setDirection("");
      setDistance("");
      setPosition("");
      setPositionSelected(false);
      setTime({ hh: "", mm: "" });
      setTimeSelected(false);
      setExtras([]);
    }

    setTargetInput("offset-distance");
  };

  const handleSend = () => {
    if (!distance || !direction) return;

    const newRequest = {
      ...request,
      arguments: [distance, direction],
      ...(positionSelected && position ? { positionSelected: position } : {}),
      ...(timeSelected && time.hh && time.mm
        ? { timeSelected: { hh: time.hh, mm: time.mm } }
        : {}),
    };

    const ref = resolveMessageRef(RequestCategory.OFFSET, newRequest);
    setRequest({ ...newRequest, messageRef: ref, additional: extras });
    onSend();
  };

  return (
    <RequestContainer
      requestType="OFFSET REQUEST"
      isOpen={isOpen}
      onToggle={handleToggle}
      disabled={disabled}
      showSendButton={!!(distance.length === 5 && direction.length === 5)}
      onSend={handleSend}
    >
      <div className={`flex flex-col gap-2 mt-3 ${isOpen ? "" : "hidden"}`}>
        <div className="flex flex-row gap-4 items-center text-white/80 text-[15px] uppercase">
          <span>Offset distance</span>
          <CharacterInput
            name="offset-distance"
            value={distance}
            length={5}
            disabled={disabled}
            onChange={setDistance}
          />
          <span>and direction</span>
          <SelectDropdown
            options={DIRECTIONS_OPTIONS}
            value={direction}
            onChange={setDirection}
          />
        </div>

        <StepAtInput
          disabled={disabled}
          positionSelected={positionSelected}
          onTogglePosition={() => {
            setPositionSelected(!positionSelected);
            if (!positionSelected) setTimeSelected(false);
          }}
          position={position}
          onChangePosition={setPosition}
          timeSelected={timeSelected}
          onToggleTime={() => {
            setTimeSelected(!timeSelected);
            if (!timeSelected) setPositionSelected(false);
          }}
          time={time}
          onChangeTime={(hh, mm) => setTime({ hh, mm })}
        />
        <AdditionalMessages
          extraMessages={ADDITIONAL_MESSAGES.offset_req}
          selected={extras}
          onChange={toggleExtra}
        />
      </div>
    </RequestContainer>
  );
}
