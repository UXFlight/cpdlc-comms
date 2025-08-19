import InputField from "@/components/General/EmergencyInputField";
import SelectDropdown from "@/components/General/SelectDropdown";
import { useContext, useEffect, useState } from "react";
import OptionBar from "./OptionBar";
import { ReportContext } from "@/context/ContractContext";

const emergencyTypes = ["MAYDAY", "PAN", "NONE"];
const emergencyReasons = [
  "NONE",
  "WEATHER",
  "MEDICAL",
  "EMERGENCY",
  "CABIN PRESS",
  "ENGINE LOSS",
  "LOW FUEL",
];
const divertOptions = ["NONE", "CYUL", "CYOW", "CYYZ", "CYQB"];

export default function EmergencyForm() {
  const { emergencyData, setEmergencyData } = useContext(ReportContext);

  useEffect(() => {
    console.log(emergencyData);
  }, [emergencyData]);

  const update = (field: keyof typeof emergencyData, value: string) => {
    setEmergencyData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full py-6 container">
      {/* Emergency Type */}
      <div className="flex items-center gap-30">
        <label className="text-end text-white/80 text-[14px] uppercase min-w-[160px]">
          Emergency Type
        </label>
        <div className="w-[180px]">
          <SelectDropdown
            value={emergencyData.type}
            onChange={(val) => update("type", val)}
            options={emergencyTypes}
            defaultValue="NONE"
            style="text-sm py-1 px-2 bg-black/20"
          />
        </div>
      </div>

      {/* Reason */}
      <div className="flex items-center gap-30">
        <label className="text-end text-white/80 text-[14px] uppercase min-w-[160px]">
          Reason
        </label>
        <div className="w-[180px]">
          <SelectDropdown
            value={emergencyData.reason}
            onChange={(val) => update("reason", val)}
            options={emergencyReasons}
            defaultValue="NONE"
            style="text-sm py-1 px-2 bg-black/20"
          />
        </div>
      </div>

      {/* Divert to */}
      <div className="flex items-center gap-30">
        <label className="text-end text-white/80 text-[14px] uppercase min-w-[160px]">
          Divert to
        </label>
        <div className="w-[180px]">
          <SelectDropdown
            value={emergencyData.divertTo}
            onChange={(val) => update("divertTo", val)}
            options={divertOptions}
            defaultValue="NONE"
            style="text-sm py-1 px-2 bg-black/20"
          />
        </div>
      </div>

      {/* Descend to ALT */}
      <div className="flex items-center gap-30">
        <label className="text-end text-white/80 text-[14px] uppercase min-w-[160px]">
          Descend to ALT
        </label>
        <div className="w-[180px]">
          <InputField
            value={emergencyData.descendAlt}
            onChange={(val) => update("descendAlt", val)}
            placeholder="----"
            label=""
            style="bg-black/20"
          />
        </div>
      </div>

      {/* Offset to */}
      <div className="flex items-center gap-30">
        <label className="text-end text-white/80 text-[14px] uppercase min-w-[160px]">
          Offset to
        </label>
        <div className="w-[180px]">
          <InputField
            value={emergencyData.offsetTo}
            onChange={(val) => update("offsetTo", val)}
            placeholder="----"
            label=""
            style="bg-black/20"
          />
        </div>
      </div>

      {/* Souls / Fuel */}
      <div className="flex items-center gap-30">
        <label className="text-end text-white/80 text-[14px] uppercase min-w-[160px]">
          Souls / Fuel (HH:MM)
        </label>
        <div className="w-[180px] flex gap-2 items-center">
          {/* Souls */}
          <div className="w-[60px]">
            <InputField
              value={emergencyData.soulsOnBoard}
              onChange={(val) => update("soulsOnBoard", val)}
              placeholder="____"
              type="number"
              label=""
              style="bg-black/20"
            />
          </div>

          {/* Separator */}
          <span className="text-white/70">/</span>

          {/* Fuel HH:MM */}
          <div className="flex items-center gap-1">
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              placeholder="HH"
              value={emergencyData.fuel.split(":")[0] || ""}
              onChange={(e) => {
                const mm = emergencyData.fuel.split(":")[1] || "";
                update("fuel", `${e.target.value}:${mm}`);
              }}
              className="w-[35px] px-2 py-1 rounded border text-center text-sm tracking-widest bg-black/20 border-white/20 text-white"
            />
            <span className="text-white/70">:</span>
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              placeholder="MM"
              value={emergencyData.fuel.split(":")[1] || ""}
              onChange={(e) => {
                const hh = emergencyData.fuel.split(":")[0] || "";
                update("fuel", `${hh}:${e.target.value}`);
              }}
              className="w-[35px] px-2 py-1 rounded border text-center text-sm tracking-widest bg-black/20 border-white/20 text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label className="text-white/80 text-[14px] uppercase">Remarks</label>
        <textarea
          className="w-full bg-black/20 border border-white/10 rounded-md text-white p-2 text-sm resize-none min-h-[100px]"
          placeholder="Write your message here"
          value={emergencyData.remarks}
          onChange={(e) => update("remarks", e.target.value)}
        />
      </div>

      <OptionBar />
    </div>
  );
}
