import { useState } from "react";
import AtcConnection from "@/components/Tabs/Logon/AtcConnection";
import Logon from "@/components/Tabs/Logon/Logon";
import Connection from "@/components/Tabs/Logon/Connection";
import SelectDropdown from "@/components/General/SelectDropdown";

export default function LogonTab() {
  const [value, setValue] = useState("FANS 1/A");

  return (
    <div className="flex flex-col h-full p-4 gap-4 text-white">
      <div className="flex flex-row items-center justify-between">
        <h1>logon</h1>
        <SelectDropdown
          options={["FANS 1/A", "FANS 2/B", "FANS 3/C", "LINK 2000+"]}
          value={value}
          onChange={setValue}
          icon="/fans-button.svg"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded w-full">
          <AtcConnection />
        </div>
        <div className="flex flex-col gap-4">
          <Logon />
        </div>
        <div>
          <Connection />
        </div>
      </div>
    </div>
  );
}
