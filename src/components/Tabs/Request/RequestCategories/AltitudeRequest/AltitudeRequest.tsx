import { useContext, useState } from "react";
import { RequestContext } from "../../../../../context/RequestContext";
import { RequestCategory } from "../../../../../interfaces/Request";
import RequestContainer from "../../RequestContainer";
import ExtraCheckboxes from "../../AdditionalMessages";
import { ADDITIONAL_MESSAGES } from "../../../../../constants/additionalMessages";
import CharacterInput from "../../../../General/CharacterInput";
import StepAtInput from "../../../../General/StepAtInput";

export default function AltitudeRequest({
  onSend,
  disabled = false,
}: {
  onSend: () => void;
  disabled?: boolean;
}) {
  const { setRequest } = useContext(RequestContext);

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
    if (!from || !to) return;

    const args = [from, to];

    if (positionSelected && position) {
      args.push(position);
    }

    if (timeSelected && time.hh && time.mm) {
      args.push(`${time.hh}:${time.mm}`);
    }

    const cleanArgs = [...args, ...extras].map((val) =>
      val.toUpperCase().replace(/[^A-Z0-9:]/g, "")
    );

    setRequest({
      arguments: cleanArgs,
      messageRef: "DM12",
      timeStamp: new Date(),
    });

    onSend();
  };

  return (
    <RequestContainer
      requestType={RequestCategory.ALTITUDE}
      isOpen={isOpen}
      onToggle={handleToggle}
      disabled={disabled}
      showSendButton={!!from || !!to}
      onSend={handleSend}
    >
      <div className="flex flex-col gap-4 mt-2">

        {/* Altitude range */}
        <div className="flex flex-row items-center gap-6">
          <p className="text-white/80 text-[16px] uppercase">Altitude (or block altitude)</p>
          <div className="flex items-center gap-5">
            <CharacterInput
              value={from}
              onChange={setFrom}
              length={5}
              disabled={disabled}
            />
            <span className="text-[12px] text-white/40">to</span>
            <CharacterInput
              value={to}
              onChange={setTo}
              length={5}
              disabled={disabled}
            />
          </div>
        </div>

        {/* Step at */}
        <StepAtInput
          disabled={disabled}
          positionSelected={positionSelected}
          onTogglePosition={() => {
            setPositionSelected(!positionSelected);
            if (!positionSelected) setTimeSelected(false); // désactiver Time
          }}
          position={position}
          onChangePosition={setPosition}
          timeSelected={timeSelected}
          onToggleTime={() => {
            setTimeSelected(!timeSelected);
            if (!timeSelected) setPositionSelected(false); // désactiver Position
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
    </RequestContainer>
  );
}
