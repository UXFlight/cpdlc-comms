import { useState } from "react";
import { RequestProvider } from "../../../context/RequestContext";
import MessagePreview from "./MessagePreview";
import VerticalRequests from "./VerticalRequest";

export default function RequestTab() {
  const [preview, setPreview] = useState(false);
  return (
    <RequestProvider>
      <div className="flex flex-col h-full px-4 pt-4 gap-4 text-white">
        <div className="flex flex-row items-center justify-between">
          <h1>request</h1>
        </div>
        <div className="flex flex-col gap-4 disable">
          <VerticalRequests
            disabled={preview}
            onClick={() => setPreview(true)}
          />
        </div>
        {preview && (
          <div className="flex flex-col gap-4 mt-auto mb-2.5">
            <MessagePreview />
          </div>
        )}
      </div>
    </RequestProvider>
  );
}
