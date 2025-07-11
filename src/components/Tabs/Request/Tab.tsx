import { useState } from "react";
import { RequestProvider } from "@/context/RequestContext";
import MessagePreview from "@/components/Tabs/Request/MessagePreview";
import RouteModificationRequest from "@/components/Tabs/Request/RequestCategories/RouteModificationRequest/RouteModificationRequest";
import { OffsetRequest } from "@/components/Tabs/Request/RequestCategories/OffsetRequest/OffsetRequest";
import { SpeedRequest } from "@/components/Tabs/Request/RequestCategories/SpeedRequest/SpeedRequest";
import { WhenCanWeRequest } from "@/components/Tabs/Request/RequestCategories/WhenCanWeRequest/WhenCanWeRequest";
import { ClearanceRequest } from "@/components/Tabs/Request/RequestCategories/ClearanceRequest/ClearanceRequest";
import { VmcDescentRequest } from "@/components/Tabs/Request/RequestCategories/VmcDescentRequest/VmcDescentRequest";
import { VoiceContactRequest } from "@/components/Tabs/Request/RequestCategories/VoiceContactRequest/VoiceContactRequest";
import { FreeTextRequest } from "@/components/Tabs/Request/RequestCategories/FreeTextRequest/FreeTextRequest";
import AltitudeRequest from "@/components/Tabs/Request/RequestCategories/AltitudeRequest/AltitudeRequest";

export default function RequestTab() {
  const [preview, setPreview] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [cancelSignal, setCancelSignal] = useState<number>(0);

  const categories = [
    { key: "altitude", Component: AltitudeRequest },
    { key: "speed", Component: SpeedRequest },
    { key: "offset", Component: OffsetRequest },
    { key: "route", Component: RouteModificationRequest },
    { key: "when", Component: WhenCanWeRequest },
    { key: "clearance", Component: ClearanceRequest },
    { key: "vmc", Component: VmcDescentRequest },
    { key: "voice", Component: VoiceContactRequest },
    { key: "free", Component: FreeTextRequest },
  ];

  const handleOnCancel = () => {
    setPreview(false);
    setCategory(null);
    setCancelSignal((prev) => prev + 1);
  };

  return (
    <RequestProvider>
      <div
        className={`flex flex-col h-full px-4 pt-4 gap-4 text-white relative ${
          preview ? "overflow-y-hidden" : ""
        }`}
      >
        <div className="flex flex-row items-center justify-between">
          <h1>request</h1>
        </div>

        <div className="flex flex-col gap-4">
          {categories.map(({ key, Component }) => {
            if (category === null || category === key) {
              return (
                <Component
                  key={key}
                  disabled={preview}
                  onSend={() => setPreview(true)}
                  onOpen={(isOpen: boolean) => setCategory(isOpen ? key : null)}
                  cancelSign={cancelSignal}
                />
              );
            }
            return null;
          })}
        </div>

        {preview && (
          <div className="absolute bottom-0 left-0 w-full px-2 z-50">
            <div className="bg-[#1e1e1e]/95 backdrop-blur-sm shadow-[0_-10px_10000px_rgba(43,43,43,1)] rounded-t-md border-t border-white/10">
              <MessagePreview onCancel={handleOnCancel} />
            </div>
          </div>
        )}
      </div>
    </RequestProvider>
  );
}
