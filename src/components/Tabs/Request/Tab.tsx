import { useState } from "react";
import { RequestProvider } from "../../../context/RequestContext";
import MessagePreview from "./MessagePreview";
import VerticalRequests from "./RequestCategories/VerticalRequest/VerticalRequest";
import RouteModificationRequest from "./RequestCategories/RouteModificationRequest/RouteModificationRequest";
import { OffsetRequest } from "./RequestCategories/OffsetRequest/OffsetRequest";
import { SpeedRequest } from "./RequestCategories/SpeedRequest.tsx/SpeedRequest";
import { WhenCanWeRequest } from "./RequestCategories/WhenCanWeRequest/WhenCanWeRequest";
import { ClearanceRequest } from "./RequestCategories/ClearanceRequest/ClearanceRequest";
import { VmcDescentRequest } from "./RequestCategories/VmcDescentRequest/VmcDescentRequest";
import { VoiceContactRequest } from "./RequestCategories/VoiceContactRequest/VoiceContactRequest";
import { FreeTextRequest } from "./RequestCategories/FreeTextRequest/FreeTextRequest";

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
        <div className="flex flex-col gap-4 disable">
          <RouteModificationRequest
            disabled={preview}
            onClick={() => setPreview(true)}
          />
        </div>
        <div className="flex flex-col gap-4 disable">
          <OffsetRequest
            disabled={preview}
            onClick={() => setPreview(true)}
          />
        </div>
        <div className="flex flex-col gap-4 disable">
          <SpeedRequest/>
        </div>
        <div className="flex flex-col gap-4 disable">
          <WhenCanWeRequest
            disabled={preview}
            onClick={() => setPreview(true)}
        />
        </div>
        <div className="flex flex-col gap-4 disable">
          <ClearanceRequest
            disabled={preview}
            onClick={() => setPreview(true)}
        />
        </div>
        <div className="flex flex-col gap-4 disable">
        <VmcDescentRequest
            disabled={preview}
            onClick={() => setPreview(true)}
        />
        </div>
        <div className="flex flex-col gap-4 disable">
        <VoiceContactRequest
            disabled={preview}
            onClick={() => setPreview(true)}
        />
        </div>
        <div className="flex flex-col gap-4 disable">
        <FreeTextRequest
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
