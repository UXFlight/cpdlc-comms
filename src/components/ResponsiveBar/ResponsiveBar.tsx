"use client";
import React from "react";
import NavContainer from "@/components/ResponsiveBar/NavContainer";
import { ResponsiveBarProps } from "@/interface/props/ResponsiveBar";

export default function ResponsiveBar({
  activeTab,
  onTabChange,
}: ResponsiveBarProps) {
  return (
    <header className="bg-nav-bar h-auto flex align-center w-full items-center">
      <NavContainer onTabChange={onTabChange} activeTab={activeTab} />
    </header>
  );
}
