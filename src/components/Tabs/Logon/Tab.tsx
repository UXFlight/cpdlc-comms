import AtcConnection from "./AtcConnection";
import Logon from "./Logon";

export default function LogonTab() {
  return (
    <div className="flex flex-col h-full p-4 gap-4 text-white">
      <div className="flex flex-row items-center justify-between">
        <h1>logon</h1>
        <div className="relative w-[130.962px] h-[36px]">
        <div className="absolute inset-0 flex items-center gap-2 bg-white-10 text-white px-3 py-2 rounded pointer-events-none">
          <img src="/fans-button.svg" alt="icon" className="w-[23.548px] h-[20px]" />
          <span className="scroll-btn">FANS 1/A</span>
        </div>
        <select
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          defaultValue="1"
        >
          <option className="scroll-btn" value="1">FANS 1/A</option>
          <option className="scroll-btn" value="2">FANS 2/B</option>
          <option className="scroll-btn" value="3">FANS 3/C</option>
          <option className="scroll-btn" value="4">LINK 2000+</option>
        </select>
      </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded w-full">
          <AtcConnection />
        </div>
        <div className="flex flex-col gap-4">
          <Logon />
        </div>
      </div>
    </div>
  );
}
