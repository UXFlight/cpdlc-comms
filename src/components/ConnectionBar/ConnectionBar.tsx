"use client";
import { useContext } from "react";
import Time from "../Time/Time";
import { UserContext } from "../../context/UserContext";

export default function ConnectionBar() {
  const { connectionState, username } = useContext(UserContext);

  return (
    <footer
      className={`h-[24px] flex justify-between items-center px-4 w-full
        ${connectionState ? "bg-green" : "bg-nav-bar"}`}
    >
      <div className="flex items-center gap-2">
        <img
          src={connectionState ? "/connected.svg" : "/disconnected.svg"}
          alt={connectionState ? "Connected" : "Not Connected"}
          className="w-4 h-4"
        />
        <p className="text-white-100 text-[12px] uppercase">
          {connectionState ? `Connected to ${username}` : "Not Connected"}
        </p>
      </div>
      <div>
        <div className="text-white-100 text-[12px] uppercase">
          <Time />
        </div>
      </div>
    </footer>
  );
}
