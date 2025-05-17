"use client"
import React from "react";
import NavContainer from "./NavContainer";
import {TABS} from "../../constants/NavBarConst";
import { useRouter } from 'next/navigation';

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function ResponsiveBar({ activeTab, onTabChange }: Props) {
  const router = useRouter();
  
  const handleClick = (clickedPage) => {
    /*const updatedPages = PAGES.map((page) => ({
      ...page,
      active: page.page === clickedPage.page
    }));*/
    router.push(`/?tab=${clickedPage.path.toLowerCase().replace(/\s/g, "")}`);
  };

  return (
    <header>
      <div className="bg-nav-bar h-[80.32px] flex align-center w-full items-center">
        <div className="p-[10px]">
          <img
            src="/CPDLC.svg"
            className="w-[48px] h-[48px] bg-gradient-to-l from-teal-600 to-teal-400 rounded-[48px]"
            alt="HOME"
          />
        </div>
      <NavContainer
        pages={TABS}
        onClick={handleClick}
      />
      </div>
    </header>
  );
}

