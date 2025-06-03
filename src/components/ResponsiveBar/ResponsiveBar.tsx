"use client";
import React from "react";
import NavContainer from "./NavContainer";

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function ResponsiveBar({ activeTab, onTabChange }: Props) {
  return (
    <header>
      <div className="bg-nav-bar h-auto flex align-center w-full items-center">
        <div className="p-[10px]">
          <img
            src="/CPDLC.svg"
            className="w-[48px] h-[48px] bg-gradient-to-l from-teal-600 to-teal-400 rounded-[48px]"
            alt="HOME"
          />
        </div>
        <NavContainer onTabChange={onTabChange} activeTab={activeTab} />
      </div>
    </header>
  );
}
