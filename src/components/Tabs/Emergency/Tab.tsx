import BuildTable from "./BuildTable";

export default function EmergencyTab() {
  return (
    <div className="flex flex-col h-full p-4 gap-4 text-white">
      <div className="flex flex-row items-center justify-between">
        <h1>emergency</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center rounded w-full">
          <BuildTable />
        </div>
        <div className="flex flex-col gap-4"></div>
      </div>
    </div>
  );
}
