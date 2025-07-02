import { useContext, useState } from "react";
import { RequestContext } from "@/context/RequestContext";
import { InputContext } from "@/context/InputContext";
import { RequestProps } from "@/interface/props/Request";
import CharacterInput from "@/components/General/CharacterInput";
import CustomRadio from "@/components/General/CustomRadio";
import SelectDropdown from "@/components/General/SelectDropdown";
import RequestContainer from "@/components/Tabs/Request/RequestContainer";
import AdditionalMessages from "@/components/Tabs/Request/AdditionalMessages";
import { ADDITIONAL_MESSAGES, RequestCategory } from "@/constants/tabs/Request";

const directOptions = ["Waypoint A", "Waypoint B", "Fix XYZ"];
const weatherOptions = ["Left", "Right", "Avoid"];

export default function RouteModificationRequest({
  onSend,
  disabled = false,
}: RequestProps) {
  const { setTargetInput } = useContext(InputContext);
  const { request, setRequest } = useContext(RequestContext);
  const [selectedType, setSelectedType] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [direct, setDirect] = useState("Select type");
  const [weather, setWeather] = useState("Select type");
  const [heading, setHeading] = useState("");
  const [track, setTrack] = useState("");
  const [extras, setExtras] = useState<string[]>([]);

  const toggleExtra = (val: string) => {
    setExtras((prev) =>
      prev.includes(val) ? prev.filter((m) => m !== val) : [...prev, val],
    );
  };

  const resetAllInputs = () => {
    setSelectedType("");
    setHeading("");
    setTrack("");
    setDirect("");
    setWeather("");
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      resetAllInputs();
    }
  };

  const handleSend = () => {
    const value = (() => {
      switch (selectedType) {
        case "Request Direct to Position":
          return direct;
        case "Weather Deviation to Position":
          return weather;
        case "Heading":
          return heading;
        case "Ground Track":
          return track;
        default:
          return "";
      }
    })();

    if (!value || !request.messageRef) return;

    const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    setRequest({
      arguments: [clean],
    });
    console.log("Request sent:", {
      value: clean,
      messageRef: request.messageRef,
    });

    onSend();
  };

  const setDm = (value: string) => {
    setRequest({
      messageRef: value.toLocaleUpperCase(),
    });
  };

  return (
    <RequestContainer
      requestType={RequestCategory.ROUTE_MODIFICATION}
      isOpen={isOpen}
      onToggle={handleToggle}
      disabled={disabled}
      showSendButton={!!request.messageRef}
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
              onChange={(value) => {
                setSelectedType(value);
                setDm("dm22");
              }}
              label={
                <div className="inner-request-element">
                  <p className="whitespace-nowrap">
                    Request Direct to Position
                  </p>
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
              onChange={(value) => {
                setSelectedType(value);
                setDm("dm26");
              }}
              label={
                <div className="inner-request-element">
                  <p className="whitespace-nowrap">
                    Weather Deviation to Position
                  </p>
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
                setTargetInput("heading");
              }}
              label={
                <div className="inner-request-element">
                  <p className="whitespace-nowrap">Heading</p>
                  <CharacterInput
                    name="heading"
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
                setTargetInput("ground-track");
              }}
              label={
                <div className="inner-request-element">
                  <p className="whitespace-nowrap">Ground Track</p>
                  <CharacterInput
                    name="ground-track"
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
          <AdditionalMessages
            extraMessages={ADDITIONAL_MESSAGES.route_modification_req}
            selected={extras}
            onChange={toggleExtra}
          />
        </div>
      </div>
    </RequestContainer>
  );
}
