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

export default function RouteModificationRequest(onClick, disabled = false) {
  const { request, setRequest } = useContext(RequestContext);
  const [selectedType, setSelectedType] = useState<string>("");
  const [heading, setHeading] = useState("");
  const [track, setTrack] = useState("");
  const [direct, setDirect] = useState("");
  const [weather, setWeather] = useState("");
  const [additionalChecked, setAdditionalChecked] = useState(false);

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
  };

  return (
    <div className="w-full p-4 rounded-md bg-[#1e1e1e] text-white space-y-3 border border-white/10">
      {/* <RequestContainer
        requestType={RequestCategory.ROUTE_MODIFICATION}
        disabled={disabled}
        onClick={handleClick}
      />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-white/80 text-sm">
            <input
              type="radio"
              name="route-option"
              checked={selectedType === "Request Direct to Position"}
              onChange={() => setSelectedType("Request Direct to Position")}
            />
            Request Direct to Position
          </label>
          <SelectDropdown
            options={directOptions}
            value={direct}
            onChange={setDirect}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-white/80 text-sm">
            <input
              type="radio"
              name="route-option"
              checked={selectedType === "Weather Deviation to Position"}
              onChange={() => setSelectedType("Weather Deviation to Position")}
            />
            Weather Deviation to Position
          </label>
          <SelectDropdown
            options={weatherOptions}
            value={weather}
            onChange={setWeather}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-white/80 text-sm">
            <input
              type="radio"
              name="route-option"
              checked={selectedType === "Heading"}
              onChange={() => setSelectedType("Heading")}
            />
            Heading
          </label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value.toUpperCase())}
            placeholder="FL450"
            className="bg-medium-gray border border-white-30 text-white rounded px-3 py-1 w-[100px] text-sm tracking-widest text-center"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-white/80 text-sm">
            <input
              type="radio"
              name="route-option"
              checked={selectedType === "Ground Track"}
              onChange={() => setSelectedType("Ground Track")}
            />
            Ground Track
          </label>
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

        <div className="flex justify-end">
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-dark-blue text-white rounded font-semibold text-sm hover:bg-dark-blue/70 transition-colors shadow-sm shadow-black/30"
          >
            SEND MESSAGE
          </button>
        </div>
      </div> */}
    </div>
  );
}
