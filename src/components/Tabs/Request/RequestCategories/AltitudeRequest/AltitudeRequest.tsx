import { use, useContext, useEffect, useState } from "react";
import { RequestContext } from "@/context/RequestContext";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import AdditionalMessages from "@/components/Tabs/Request/AdditionalMessages";
import StepAtInput from "@/components/General/StepAtInput";
import { resolveMessageRef } from "@/utils/messageIdentification";
import { RequestProps } from "@/interface/props/Request";
import { ADDITIONAL_MESSAGES, RequestCategory } from "@/constants/tabs/Request";
import BlockData from "@/components/Tabs/Request/BlockData";
import { InputContext } from "@/context/InputContext";
import { FlightContext } from "@/context/FlightContext";

export default function AltitudeRequest({
  onSend,
  onOpen,
  disabled = false,
  cancelSign,
}: RequestProps) {
  const { request, setRequest } = useContext(RequestContext);
  const { setTargetInput } = useContext(InputContext);
  const {flightDetails} = useContext(FlightContext);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [positionSelected, setPositionSelected] = useState(false);
  const [position, setPosition] = useState("");

  const [timeSelected, setTimeSelected] = useState(false);
  const [time, setTime] = useState({ hh: "", mm: "" });

  const [extras, setExtras] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleExtra = (val: string) => {
    setExtras((prev) =>
      prev.includes(val) ? prev.filter((m) => m !== val) : [...prev, val],
    );
  };

  useEffect(() => {
    if (isOpen) {
      handleToggle();
    }
  }, [cancelSign]);

  const handleToggle = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    onOpen(nextOpen);
    if (!nextOpen) {
      setFrom("");
      setTo("");
      setPosition("");
      setPositionSelected(false);
      setTime({ hh: "", mm: "" });
      setTimeSelected(false);
      setExtras([]);
      setTargetInput("");
    } else {
      setTargetInput("block-data-from");
    }
  };

  const handleSend = () => {
    if (!from) return;

    const args = to ? [from, to] : [from];

    const newRequest = {
      ...request,
      arguments: args,
      ...(positionSelected && position ? { positionSelected: position } : {}),
      ...(timeSelected && time.hh && time.mm
        ? { timeSelected: { hh: time.hh, mm: time.mm } }
        : {}),
    };

    const ref = resolveMessageRef(RequestCategory.ALTITUDE, newRequest, flightDetails);

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
        <BlockData
          label="Altitude (or block altitude)"
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          isOpen={isOpen}
          disabled={disabled}
        />

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

          <div>
            <AdditionalMessages
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
