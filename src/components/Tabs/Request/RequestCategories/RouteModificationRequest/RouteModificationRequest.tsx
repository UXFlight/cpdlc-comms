import { use, useContext, useEffect, useState } from "react";
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
  const { request, setRequest } = useContext(RequestContext);
  const [selectedType, setSelectedType] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [direct, setDirect] = useState("Select type");
  const [weather, setWeather] = useState("Select type");
  const [heading, setHeading] = useState("");
  const [track, setTrack] = useState("");
  const [additionalChecked, setAdditionalChecked] = useState(false);
  const [extras, setExtras] = useState<string[]>([]);

  const toggleExtra = (val: string) => {
    setExtras(prev => prev.includes(val) ? prev.filter(m => m !== val) : [...prev, val]);
  };

  const resetAllInputs = () => {
      setSelectedType("");
      setHeading("");
      setTrack("");
      setDirect("");
      setWeather("");
      setAdditionalChecked(false);
  }

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      resetAllInputs();
    }
  };

  const handleSend = () => {
    const value = (() => {
      switch (selectedType) {
        case "Request Direct to Position": return direct;
        case "Weather Deviation to Position": return weather;
        case "Heading": return heading;
        case "Ground Track": return track;
        default: return "";
      }
    })();

    if (!value || !request.messageRef) return;

    const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    setRequest({
      arguments: [clean],
      timeStamp: new Date(),
    });
    console.log("Request sent:", {
      value: clean,
      messageRef: request.messageRef,
    });

    onClick();
  };

  /*const addNewInput = (value: string) => {
    const newArray = [...request.arguments];
    newArray.push(value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
    return newArray;
  }*/

  const setDm = (value: string) => {
    setRequest({
      messageRef: value.toLocaleUpperCase(),
    })
  }

  return (
    <RequestContainer
      requestType={RequestCategory.ROUTE_MODIFICATION}
      isOpen={isOpen}
      onToggle={handleToggle}
      disabled={disabled}
      showSendButton={!!(request.messageRef)}
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
          <div className="request-element">
            <CustomRadio
              value="Request Direct to Position"
              selected={selectedType} // dm22
              onChange={(value)=> {
                setSelectedType(value);
                setDm("dm22");
              }}
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
          <div className="request-element">
            <CustomRadio
              value="Weather Deviation to Position"
              selected={selectedType} // dm26
               onChange={(value)=> {
                setSelectedType(value)
                setDm("dm26");
              }}
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
          <div className="request-element">
            <CustomRadio
              value="Heading"
              selected={selectedType}
              onChange={(value) => {
                setSelectedType(value);
                setDm("dm70");
                setTargetInput((prev) => !prev);
              }}
              label={
                <div className="inner-request-element">
                  <p className="whitespace-nowrap">Heading</p>
                  <CharacterInput
                    value={heading}
                    length={5}
                    style="mr-[83px]"
                    disabled={disabled || selectedType !== "Heading"}
                    onChange={setHeading}
                  />
                </div>
              }
            />
          </div>
          <div className="request-element">
            <CustomRadio
              value="Ground Track"
              selected={selectedType}
              onChange={(value) => {
                setSelectedType(value);
                setDm("dm71");
                setTargetInput((prev) => !prev);
              }}
              label={
                <div className="inner-request-element">
                  <p className="whitespace-nowrap">Ground Track</p>
                  <CharacterInput
                    value={track}
                    length={5}
                    style="mr-[83px]"
                    disabled={disabled || selectedType !== "Ground Track"}
                    onChange={setTrack}
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
