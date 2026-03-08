import React from "react";
import NavButton from "@/components/ResponsiveBar/NavButton";
import { TABS } from "@/constants/Tabs/NavBar";
import { NavContainerProps } from "@/interface/props/ResponsiveBar";

export default function NavContainer({
  onTabChange,
  activeTab,
}: NavContainerProps) {
  return (
    <nav className="flex w-full justify-between">
      {TABS.map((page) => (
        <NavButton
          key={page.page}
          icon={page.icon}
          id={page.id}
          label={page.page}
          active={activeTab === page.id}
          onTabChange={onTabChange}
        />
      ))}
    </nav>
  );
}
