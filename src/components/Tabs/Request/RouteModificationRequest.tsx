import { useContext, useState } from "react";
import { RequestContext } from "../../../context/RequestContext";
import SelectDropdown from "../../SelectDropdown";
import { RequestCategory } from "../../../interfaces/Request";
import RequestContainer from "./RequestContainer";

const requestTypes = [
  "Request Direct to Position",
  "Weather Deviation to Position",
  "Heading",
  "Ground Track",
];

const weatherOptions = ["Left", "Right", "Avoid"];
const directOptions = ["Waypoint A", "Waypoint B", "Fix XYZ"];

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

function CustomRadio({ label, value, selected, onChange }: {
  label: string;
  value: string;
  selected: string;
  onChange: (val: string) => void;
}) {
  const isChecked = value === selected;
  return (
    <div
      className="flex items-center gap-2 cursor-pointer select-none"
      onClick={() => onChange(value)}
    >
      <span
        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-150 ${
          isChecked ? "border-white" : "border-white/10"
        }`}
      >
        {isChecked && <div className="w-2 h-2 bg-dark-blue rounded-full" />}
      </span>
      <span className="text-white/80 text-sm">{label}</span>
    </div>
  );
}

export default function RouteModificationRequest({ onClick, disabled = false }: Props) {
  const { request, setRequest } = useContext(RequestContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [heading, setHeading] = useState("");
  const [track, setTrack] = useState("");
  const [direct, setDirect] = useState("");
  const [weather, setWeather] = useState("");
  const [additionalChecked, setAdditionalChecked] = useState(false);

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
        additionalChecked ? "Due to aircraft performance" : ""
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
        <p className={`w-400 text-white/80 font-open text-[14px] font-normal leading-[18px] uppercase mt-3 ${isOpen ? "hidden" : "block"}`}>
          To request heading, track, direct-to or weather deviation
        </p>
      </div>

      <div className={`flex items-center gap-3 mt-3 ${isOpen ? "" : "hidden"}`}>
        <div className="space-y-3 mt-3 w-full">
          <div className="flex items-center justify-between">
            <CustomRadio
              label="Request Direct to Position"
              value="Request Direct to Position"
              selected={selectedType}
              onChange={setSelectedType}
            />
            <SelectDropdown
              options={directOptions}
              value={direct}
              onChange={setDirect}
            />
          </div>

          <div className="flex items-center justify-between">
            <CustomRadio
              label="Weather Deviation to Position"
              value="Weather Deviation to Position"
              selected={selectedType}
              onChange={setSelectedType}
            />
            <SelectDropdown
              options={weatherOptions}
              value={weather}
              onChange={setWeather}
            />
          </div>

          <div className="flex items-center justify-between">
            <CustomRadio
              label="Heading"
              value="Heading"
              selected={selectedType}
              onChange={setSelectedType}
            />
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value.toUpperCase())}
              placeholder="FL450"
              className="bg-medium-gray border border-white-30 text-white rounded px-3 py-1 w-[100px] text-sm tracking-widest text-center"
            />
          </div>

          <div className="flex items-center justify-between">
            <CustomRadio
              label="Ground Track"
              value="Ground Track"
              selected={selectedType}
              onChange={setSelectedType}
            />
            <input
              type="text"
              value={track}
              onChange={(e) => setTrack(e.target.value.toUpperCase())}
              placeholder="FL450"
              className="bg-medium-gray border border-white-30 text-white rounded px-3 py-1 w-[100px] text-sm tracking-widest text-center"
            />
          </div>

          <div className="flex flex-col text-white/80 text-sm">
            <p className="mb-1">Additional Message:</p>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={additionalChecked}
                onChange={() => setAdditionalChecked(!additionalChecked)}
                className="w-4 h-4 rounded border border-white/10 bg-[#2B2B2C] checked:bg-white checked:border-white shadow-sm shadow-black/30 cursor-pointer"
              />
              <span className="text-white font-semibold">
                Due to aircraft performance
              </span>
            </label>
          </div>
        </div>
      </div>
    </RequestContainer>
  );
}
