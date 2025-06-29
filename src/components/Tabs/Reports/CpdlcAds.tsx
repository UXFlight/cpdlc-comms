import { useState } from "react";
import ReportsContainer from "@/components/Tabs/Reports/ReportsContainer";

export default function CpdlcAds() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ReportsContainer label="CPLDC Ads" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={`${isOpen ? "" : "hidden"}`}>
        <p>...</p>
      </div>
    </ReportsContainer>
  );
}
