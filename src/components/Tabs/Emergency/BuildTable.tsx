import { useState } from "react";
import Input from "@/components/Tabs/Emergency/Input";
import OptionBar from "@/components/Tabs/Emergency/OptionBar";
import SelectDropdown from "@/components/General/SelectDropdown";

export default function BuildTable() {
  const [emergency, setEmergency] = useState("MAYDAY");
  const [reason, setReason] = useState("NONE");
  const [divertTo, setDivertTo] = useState("NONE");

  return (
    <div className="container flex  flex-col gap-[10px] items-start w-[568px] h-auto px-[15.5px] py-[16px]">
      <div className="emergency-div">
        <p className="emergency-text">Emergency Type</p>
        <div>
          <SelectDropdown
            options={["MAYDAY", "PANPAN", "NONE"]}
            value={emergency}
            onChange={setEmergency}
          />
        </div>
      </div>
      <div className="emergency-div">
        <p className="emergency-text">Reason</p>
        <div>
          <SelectDropdown
            options={[
              "WEATHER",
              "MEDICAL",
              "EMERGENCY",
              "CABIN PRESS",
              "ENGINE LOSS",
              "LOW FUEL",
            ]}
            value={reason}
            onChange={setReason}
          />
        </div>
      </div>
      <div className="emergency-div">
        <p className="emergency-text">Divert to</p>
        <div>
          <SelectDropdown
            options={["MAYDAY", "PANPAN", "NONE"]}
            value={divertTo}
            onChange={setDivertTo}
          />
        </div>
      </div>
      <div className="emergency-div">
        <p className="emergency-text">Descend to ALT</p>
        {/*slide options*/}
      </div>
      <div className="emergency-div">
        <p className="emergency-text">Offset to</p>
        {/*slide options*/}
      </div>
      <div className="emergency-div">
        <p className="emergency-text">Souls/Fuel (HH:MM)</p>
        {/*slide options*/}
      </div>
      <div className="emergency-div">
        <p className="emergency-text">Remarks</p>
        {/*slide options*/}
      </div>
      <div className="w-full h-auto">
        <Input />
      </div>
      <div className="w-full h-auto">
        <OptionBar />
      </div>
    </div>
  );
}
