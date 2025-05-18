import { useEffect } from "react";

export default function LogsTab() {
  return (
    <div className="flex flex-col h-full p-4 gap-4 text-white">
      <div className="flex flex-row items-center justify-between">
        <h1>message log</h1>
        <div className="relative w-[130.962px] h-[36px]">
        <div className="absolute inset-0 flex items-center gap-2 bg-white-10 text-white px-3 py-2 rounded pointer-events-none">
          <img src="/filterBy.svg" alt="icon" className="w-[23.548px] h-[20px]" />
          <span className="scroll-btn">FILTER BY</span>
        </div>
        <select
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          defaultValue="1"
        >
          <option className="scroll-btn bg-middle-gray" value="1">NEW</option>
          <option className="scroll-btn" value="2">OPENED</option>
          <option className="scroll-btn" value="3">ACCEPTED</option>
          <option className="scroll-btn" value="4">REJECTED</option>
          <option className="scroll-btn" value="4">STANDBY</option>
          <option className="scroll-btn" value="4">TIME OUT</option>
        </select>
      </div>
      </div>
    </div>
  );
}
