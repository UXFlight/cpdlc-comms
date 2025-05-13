import React from "react";
import NavButton from "./NavButton";

export default function NavContainer({ pages, onClick }) {
  return (
    <nav className="hidden md:flex flex-1 justify-center gap-2">
      {pages.map((page, i) => (
        <NavButton
        key={page.page}
        icon={page.icon}
        label={page.page}
        active={page.active}
        onClick={() => onClick(page)}
        />
      ))}
    </nav>
  );
}
