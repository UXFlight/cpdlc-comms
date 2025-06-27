import { useContext, useState } from "react";
import { RequestContext } from "../../../../../context/RequestContext";
import { RequestCategory } from "../../../../../interface/Request";
import RequestContainer from "../../RequestContainer";
import ExtraCheckboxes from "../../AdditionalMessages";
import { ADDITIONAL_MESSAGES } from "../../../../../constants/additionalMessages";
import CharacterInput from "../../../../General/CharacterInput";
import StepAtInput from "../../../../General/StepAtInput";
import { resolve } from "path";
import { resolveMessageRef } from "../../../../../utils/MessageIdentification";
import { request } from "http";
import { socketService } from "../../../../../api/communications/socket/socketService";
import { UserContext } from "../../../../../context/UserContext";

export default function AltitudeRequest({
  onSend,
  disabled = false,
}: {
  onSend: () => void;
  disabled?: boolean;
}) {
  const { request, setRequest } = useContext(RequestContext);
  const {flightDetails} = useContext(UserContext);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [positionSelected, setPositionSelected] = useState(false);
  const [position, setPosition] = useState("");

  const [timeSelected, setTimeSelected] = useState(false);
  const [time, setTime] = useState({ hh: "", mm: "" });

  const [extras, setExtras] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleExtra = (val: string) => {
    setExtras(prev =>
      prev.includes(val) ? prev.filter((m) => m !== val) : [...prev, val]
    );
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setFrom("");
      setTo("");
      setPosition("");
      setPositionSelected(false);
      setTime({ hh: "", mm: "" });
      setTimeSelected(false);
      setExtras([]);
    }
  };

 const handleSend = () => {
  if (!from) return;

  const args = to ? [from, to] : [from];

  const newRequest = {
    ...request,
    arguments: args,
    ...(positionSelected && position ? { positionSelected: position } : {}),
    ...(timeSelected && time.hh && time.mm ? { timeSelected: { hh: time.hh, mm: time.mm } } : {})
  };

  const ref = resolveMessageRef(RequestCategory.ALTITUDE, newRequest);

  setRequest({ ...newRequest, messageRef: ref, additional: extras });

  onSend();
};

  return (
    <RequestContainer
      requestType={RequestCategory.ALTITUDE}
      isOpen={isOpen}
      onToggle={handleToggle}
      disabled={disabled}
      showSendButton={!!(from.length === 5)}
      onSend={handleSend}
    >
      <div className="flex flex-col gap-4 mt-2">

        <div className="flex flex-row items-center gap-6">
          <p className="text-white/80 text-[16px] uppercase">Altitude (or block altitude)</p>
          <div className="flex items-center gap-5">
            <CharacterInput
              value={from}
              onChange={setFrom}
              length={5}
              disabled={!isOpen || disabled}
            />
            <span className="text-[14px] text-white/40">to</span>
            <CharacterInput
              value={to}
              onChange={setTo}
              length={5}
              disabled={from.length !== 5 || disabled}
            />
          </div>
        </div>

        {/* Step at */}
        <div className={`${isOpen ? "" : "hidden"}`}>
          <StepAtInput
            disabled={disabled || (from !== "" && to !== "")} 
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


          {/* Additional messages */}
          <div>
            <ExtraCheckboxes
              extraMessages={ADDITIONAL_MESSAGES.altitude_req}
              selected={extras}
              onChange={toggleExtra}
            />
          </div>
        </div>
      </div>
    </RequestContainer>
  );
}
