import { useState } from "react";
import {
  RequestCategory,
  type RequestDisplay,
} from "../../../interfaces/Request";
import { VerticalOptionsArray } from "../../../constants/messages";
import VerticalOption from "./VerticalOption";

const requestExemple: RequestDisplay = {
  Category: RequestCategory.VERTICAL,
};

export default function VerticalRequests() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false); 

  return (
    <div className="container flex flex-col items-start py-[16px] px-[15.5px]">
      <div className="h-[30px] w-auto flex items-center justify-start gap-[300px]" onClick={() => setIsOpen(!isOpen)}>
        <p className="text-white font-normal text-[17px] leading-none font-noto uppercase">
          {requestExemple.Category}
        </p>
         <img
            src="/arrow-down.svg"
            alt="arrow"
            className={`w-6 h-6 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
      </div>
     <div
        className={`w-full overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            isOpen ? "max-h-[1000px]" : "max-h-[94px]"
        }`}
        >
        <div className="flex flex-row gap-3 items-center w-full">
            <p className="text-white/80 font-open text-base font-normal leading-[18px] uppercase">
            request
            </p>
            <div className="flex flex-col items-start justify-start gap-2">
            {VerticalOptionsArray.map((template, index) => (
                <VerticalOption
                key={index}
                requestTemplate={template}
                isActive={selectedTemplate === template}
                onSelect={() => setSelectedTemplate(template)}
                />
            ))}
            </div>
        </div>
        </div>
    </div>
  );
}
