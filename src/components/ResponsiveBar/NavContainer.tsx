import React from "react";
import NavButton from "./NavButton";
import { TABS } from "../../constants/NavBarConst";

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function NavContainer({ onTabChange, activeTab }: Props) {
  return (
    <nav className="flex flex-nowrap justify-between">
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
