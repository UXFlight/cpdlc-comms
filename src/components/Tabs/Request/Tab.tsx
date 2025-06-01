import { RequestProvider } from "../../../context/RequestContext";
import VerticalRequests from "./VerticalRequest";

export default function RequestTab() {
  return (
    <RequestProvider>
    <div className="flex flex-col h-full p-4 gap-4 text-white">
      <div className="flex flex-row items-center justify-between">
        <h1>request</h1>
      </div>
      <div className="flex flex-col gap-4">
        <VerticalRequests />
      </div>
    </div>
    </RequestProvider>
  );
}
