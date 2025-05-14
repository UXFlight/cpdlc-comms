import React from "react";
import NavButton from "./NavButton";

export default function NavContainer({ pages, onClick }) {
  return (
    <nav className="flex flex-nowrap justify-between">
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
