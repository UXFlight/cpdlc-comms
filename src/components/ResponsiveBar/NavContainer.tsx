import React from "react";
import NavButton from "./NavButton";
import { TABS } from "../../constants/NavBarConst";

type Props = {
  pages: typeof TABS;
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function NavContainer({ pages, onTabChange, activeTab }: Props) {
  return (
    <nav className="flex flex-nowrap justify-between">
      {pages.map((page) => (
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
