import { useContext, useEffect, useState } from "react";
import {
  RequestCategory,
  type RequestDisplay,
} from "../../../interfaces/Request";
import { VerticalOptionsArray } from "../../../constants/messages";
import VerticalOption from "./VerticalOption";
import { RequestContext } from "../../../context/RequestContext";

const requestExemple: RequestDisplay = {
  Category: RequestCategory.VERTICAL,
};

export default function VerticalRequests() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedExtra, setSelectedExtra] = useState<"time" | "position" | null>(null);
  const [isOpen, setIsOpen] = useState(false); 
  const {request, setRequest, resetRequest} = useContext(RequestContext);
  

  const handleClick = () => {
    setIsOpen(!isOpen);
    if(!isOpen) {
      setSelectedTemplate(null);
      setSelectedExtra(null);
    }
  }

  // const selectTemplate = (template) => {
  //   selectedTemplate === template ? setSelectedTemplate(null) : setSelectedTemplate(template);
  // }

  return (
    <div className="container flex flex-col items-start py-4 px-[15.5px] overflow-x-hidden">
      <div
        className="h-[30px] w-full flex items-center justify-between cursor-pointer"
        onClick={() => handleClick()}
      >
        <p className="text-white font-normal text-[17px] leading-none font-noto uppercase">
          {requestExemple.Category}
        </p>
        <img
          src="/arrow-down.svg"
          alt="arrow"
          className={`w-6 h-6 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* SECTION TO ALWAYS SHOW "REQUEST" */}
      <div className="flex items-center gap-3 mt-3">
        <div className="flex flex-row items-center gap-1.5">
          <p className={`text-white/80 font-open ${isOpen ? "text-[16px]":"text-[14px]"} font-normal leading-[18px] uppercase min-w-[60px]`}>
            request
          </p>
          <p className={`w-400 text-white/80 font-open text-[14px] font-normal leading-[18px] uppercase ${isOpen ? "hidden" : ""}`}>to climb, descend, or change flight level</p>
        </div>
        {/* SECTION COLLAPSIBLE */}
        <div className="flex flex-row w-full">
        <div
          className={`flex flex-col items-start gap-2 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            isOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          {VerticalOptionsArray.map((message, index) => (
            <VerticalOption
              key={index}
              message={message}
              isActive={selectedTemplate === message.content}
              onSelect={() => setSelectedTemplate(message.content)}
            />
          ))}
        </div>
        {isOpen &&
        (selectedTemplate === "CLIMB TO [level]" || selectedTemplate === "DESCENT TO [level]") && (
      <div className="flex flex-col gap-2 pl-4 pt-2">
        {/* TIME */}
        <label className="flex items-center gap-2 text-white/80 text-sm">
          <input
            type="checkbox"
            checked={selectedExtra === "time"}
            onChange={() => setSelectedExtra(selectedExtra === "time" ? null : "time")}
            className="w-4 h-4 rounded border border-white/20 bg-[#2B2B2C] checked:bg-white checked:border-white shadow-sm shadow-black/30 cursor-pointer"
          />
          <span>Time</span>
        </label>
        <input
          type="time"
          disabled={selectedExtra !== "time"}
          className={`w-[110px] px-2 py-1 rounded border text-center text-sm tracking-widest shadow-sm ${
            selectedExtra === "time"
              ? "bg-medium-gray border-white/30 text-white"
              : "bg-[#1a1a1a] border-white/10 text-white/40"
          }`}
        />

        {/* POSITION */}
        <label className="flex items-center gap-2 text-white/80 text-sm">
          <input
            type="checkbox"
            checked={selectedExtra === "position"}
            onChange={() => setSelectedExtra(selectedExtra === "position" ? null : "position")}
            className="w-4 h-4 rounded border border-white/20 bg-[#2B2B2C] checked:bg-white checked:border-white shadow-sm shadow-black/30 cursor-pointer"
          />
          <span>Position</span>
        </label>
        <input
          type="text"
          placeholder="ABC123"
          disabled={selectedExtra !== "position"}
          className={`w-[110px] px-2 py-1 rounded border text-center text-sm tracking-widest shadow-sm ${
            selectedExtra === "position"
              ? "bg-medium-gray border-white/30 text-white"
              : "bg-[#1a1a1a] border-white/10 text-white/40"
          }`}
        />
        </div>
        )}
        </div>
      </div>
    </div>
  );
}