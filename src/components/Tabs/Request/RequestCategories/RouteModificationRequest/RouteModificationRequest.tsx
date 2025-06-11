import { useContext, useEffect, useState } from "react";
import { RequestContext } from "../../../../../context/RequestContext";
import SelectDropdown from "../../../../General/SelectDropdown";
import { RequestCategory } from "../../../../../interfaces/Request";
import RequestContainer from "../../RequestContainer";
import CustomRadio from "../../../../General/CustomRadio";
import CharacterInput from "../../../../General/CharacterInput";
import { InputContext } from "../../../../../context/InputContext";
import ExtraCheckboxes from "../../AdditionalMessages";
import { ADDITIONAL_MESSAGES } from "../../../../../constants/additionalMessages";

const directOptions = ["Waypoint A", "Waypoint B", "Fix XYZ"];
const weatherOptions = ["Left", "Right", "Avoid"];

export default function RouteModificationRequest({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  const { setTargetInput } = useContext(InputContext);
  const { setRequest } = useContext(RequestContext);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [heading, setHeading] = useState("");
  const [track, setTrack] = useState("");
  const [direct, setDirect] = useState("");
  const [weather, setWeather] = useState("");
  const [additionalChecked, setAdditionalChecked] = useState(false);
  const [extras, setExtras] = useState<string[]>([]);

  const toggleExtra = (val: string) => {
    setExtras(prev => prev.includes(val) ? prev.filter(m => m !== val) : [...prev, val]);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSelectedType("");
      setHeading("");
      setTrack("");
      setDirect("");
      setWeather("");
      setAdditionalChecked(false);
    }
  };

  const handleSend = () => {
    setRequest({
      arguments: [
        selectedType,
        direct,
        weather,
        heading,
        track,
        additionalChecked ? "Due to aircraft performance" : "",
      ].filter(Boolean),
      messageRef: "RM1",
      timeStamp: new Date(),
    });
    onClick();
  };

  return (
    <RequestContainer
      requestType={RequestCategory.ROUTE_MODIFICATION}
      isOpen={isOpen}
      onToggle={handleToggle}
      disabled={disabled}
      showSendButton={!!selectedType}
      onSend={handleSend}
    >
      <div className="flex items-center gap-3">
        <p
          className={`w-400 text-white/80 font-open text-[14px] font-normal leading-[18px] uppercase mt-3 ${
            isOpen ? "hidden" : "block"
          }`}
        >
          To request heading, track, direct-to or weather deviation
        </p>
      </div>

      <div className={`flex items-center gap-3 ${isOpen ? "" : "hidden"}`}>
        <div className="gap-1 mt-3 w-full">
          {/* Direct to */}
          <div className="request-element">
            <CustomRadio
              value="Request Direct to Position"
              selected={selectedType}
              onChange={setSelectedType}
              label={
                <div className="inner-request-element">
                  <p className="whitespace-nowrap">Request Direct to Position</p>
                  <SelectDropdown
                    options={directOptions}
                    value={direct}
                    onChange={setDirect}
                  />
                </div>
              }
            />
          </div>

          {/* Weather */}
          <div className="request-element">
            <CustomRadio
              value="Weather Deviation to Position"
              selected={selectedType}
              onChange={setSelectedType}
              label={
                <div className="inner-request-element">
                  <p className="whitespace-nowrap">Weather Deviation to Position</p>
                  <SelectDropdown
                    options={weatherOptions}
                    value={weather}
                    onChange={setWeather}
                  />
                </div>
              }
            />
          </div>

          {/* Heading */}
          <div className="request-element">
            <CustomRadio
              value="Heading"
              selected={selectedType}
              onChange={(value) => {
                setSelectedType(value);
                setTargetInput((prev) => !prev);
              }}
              label={
                <div className="inner-request-element">
                  <p className="whitespace-nowrap">Heading</p>
                  <CharacterInput
                    value={heading}
                    length={5}
                    disabled={disabled || selectedType !== "Heading"}
                    onChange={setHeading}
                    onEnter={() => {}}
                  />
                </div>
              }
            />
          </div>

          {/* Ground Track */}
          <div className="request-element">
            <CustomRadio
              value="Ground Track"
              selected={selectedType}
              onChange={(value) => {
                setSelectedType(value);
                setTargetInput((prev) => !prev);
              }}
              label={
                <div className="inner-request-element">
                  <p className="whitespace-nowrap">Ground Track</p>
                  <CharacterInput
                    value={track}
                    length={5}
                    disabled={disabled || selectedType !== "Ground Track"}
                    onChange={setTrack}
                    onEnter={() => {}}
                  />
                </div>
              }
            />
          </div>
          <ExtraCheckboxes extraMessages={ADDITIONAL_MESSAGES.route_modification_req} selected={extras} onChange={toggleExtra} />
        </div>
      </div>
    </RequestContainer>
  );
}
