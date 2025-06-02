import { useState } from "react";

export default function PositionReport() {
  return (
    <div className="flex flex-col gap-4 bg-[#1e1e1e] p-4 rounded-md border border-white/10 text-white text-sm">
      <p className="uppercase text-white font-semibold text-sm">
        Position Report
      </p>

      {/* Section 1 */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
        <ReportRow label="RPT WPT" value="XXXX" select options={["FIX"]} />
        <ReportRow label="RPT WPT UTC" value="15:41" />
        <ReportRow label="RPT WPT ALT" value="8430" select options={["FIX"]} />
      </div>

      {/* Section 2 */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
        <ReportRow label="Next Fix" value="XXXX" select options={["FIX"]} />
        <ReportRow label="Next Fix UTC" value="15:46" />
        <ReportRow label="Next Fix +1" value="XXXX" select options={["FIX"]} />
      </div>

      {/* Section 3 */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
        <ReportRow
          label="Cur Pos"
          value="N4515.4"
          select
          options={["LAT/LON"]}
        />
        <ReportRow label="Cur UTC" value="15:43" />
        <ReportRow label="Cur ALT" value="8000" />
        <ReportRow label="Winds ALOFT" value="331/025 T/KT" />
        <ReportRow label="OFFSET" value="----" />
        <ReportRow label="Dest UTC" value="15:50" />
        <ReportRow label="Temperature" value="+03 °C" />
        <ReportRow label="Speed" value="250" />
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-4 gap-2 pt-2 border-t border-white/10">
        {["CLEAR", "SET", "SEND", "CANCEL"].map((label) => (
          <button
            key={label}
            className="flex-1 py-2 rounded border border-white/20 bg-[#2b2b2c] text-white/80 hover:bg-white/10 transition text-sm"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

type RowProps = {
  label: string;
  value: string;
  select?: boolean;
  options?: string[];
};

function ReportRow({ label, value, select = false, options = [] }: RowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-white/70 w-[120px]">{label}</span>
      {select && (
        <select className="bg-[#2b2b2c] text-white text-sm px-2 py-1 rounded border border-white/10">
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      )}
      <span className="text-white text-right w-[60px]">{value}</span>
    </div>
  );
}
