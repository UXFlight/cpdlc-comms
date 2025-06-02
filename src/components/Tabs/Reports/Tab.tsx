import PositionReport from "./PositionReport";

export default function ReportsTab() {
  return (
    <div className="flex flex-col h-full p-4 gap-4 text-white">
      <div className="flex flex-row items-center justify-between">
        <h1>reports</h1>
      </div>
      <div className="flex flex-col gap-2">
        <PositionReport />
      </div>
    </div>
  );
}
