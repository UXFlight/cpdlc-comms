import { useState } from "react";
import ReportsContainer from "./ReportsContainer";

export default function Monitoring() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ReportsContainer label="Monitoring" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={`${isOpen ? "" : "hidden"}`}>
        <p>je sais pas quoi mettre</p>
      </div>
    </ReportsContainer>
  );
}
