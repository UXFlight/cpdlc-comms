"use client"
import React, { useState } from "react";
import NavContainer from "./NavContainer";
import {PAGES} from "../../constants/NavBarConst";
import { useRouter } from 'next/navigation';

export default function ResponsiveBar() {
  const router = useRouter();
  
  const handleClick = (clickedPage) => {
    /*const updatedPages = PAGES.map((page) => ({
      ...page,
      active: page.page === clickedPage.page
    }));*/
    router.push(`/${clickedPage.path.toLowerCase().replace(/\s/g, "")}`);
  };

  return (
    <header>
      <div className="bg-[linear-gradient(90deg,_#1cccc4_0%,#3b9673_100%)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col justify-center mr-3 w-12 shrink-0 h-12 items-center rounded-[48px]">
        <img
          src="/CPDLC.svg"
          className="w-6"
          alt="HOME"
        />
      </div>
      <NavContainer
        pages={PAGES}
        onClick={handleClick}
      />
    </header>
  );
}

