import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

type Props = {
  icon: string;
  label: string;
  id: string;
  active: boolean;
  onTabChange: (tab: string) => void;
};

export default function NavButton({
  icon,
  label,
  id,
  active,
  onTabChange,
}: Props) {
  const { connectionState } = useContext(UserContext);

  return (
    <div
      className={`flex flex-row justify-center items-center w-[75px] hover:bg-white-10 transition-all duration-150 ${active ? "bg-white-10 border-b-4 border-green" : ""}`}
    >
      <button
        disabled={!connectionState}
        onClick={() => onTabChange(`${id}`)}
        className={`flex flex-col items-center px-2 py-1 w-28 font-bold text-xs
          ${label === "print" ? "border-1 border-solid border-green rounded-[100px] m-[9px]" : ""}`}
      >
        <img src={icon} alt={label} className="icon" />
        <h3 className="align-self-stretch">{label}</h3>
      </button>
    </div>
  );
}
