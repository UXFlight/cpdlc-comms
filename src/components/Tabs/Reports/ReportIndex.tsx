import { useState } from "react";
import ReportsContainer from "@/components/Tabs/Reports/ReportsContainer";

export default function ReportIndex() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ReportsContainer
      label="Report Index"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className={`${isOpen ? "" : "hidden"}`}>
        <p>je sais pas quoi mettre</p>
      </div>
    </ReportsContainer>
  );
}
