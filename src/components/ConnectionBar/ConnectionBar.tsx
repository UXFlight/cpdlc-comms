"use client";
import { useContext } from "react";
import Time from "@/components/Time/Time";
import { GlobalContext } from "@/context/GlobalContext";

export default function ConnectionBar() {
  const { connectionState, username } = useContext(GlobalContext);

  return (
    <footer
      className={`h-[30px] flex justify-between items-center px-4 w-full
        ${connectionState ? "bg-green" : "bg-nav-bar"}`}
    >
      <div className="flex items-center gap-2">
        <img
          src={connectionState ? "/connected.svg" : "/disconnected.svg"}
          alt={connectionState ? "Connected" : "Not Connected"}
          className="w-5 h-5"
        />
        <p className="text-white-80 text-[16px] uppercase">
          Connected to{" "}
          <span className="font-bold tracking-wider text-white">
            {connectionState ? username : ""}
          </span>
        </p>
      </div>
      <div>
        <div className="text-white-100 text-[16px] uppercase">
          <Time />
        </div>
      </div>
    </footer>
  );
}
