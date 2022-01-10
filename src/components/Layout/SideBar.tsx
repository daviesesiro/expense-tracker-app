import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as MonoLogo } from "../../assets/mono-logo-white.svg";

export interface SideBarProps {
  navLinks: {
    enabled: boolean;
    links: {
      text: string;
      to: string;
    }[];
  };
}

export const SideBar: React.FC<SideBarProps> = ({ navLinks }) => {
  return (
    <aside className="hidden lg:flex bg-black w-full py-14 pl-14 max-w-[280px] space-y-7 flex-col h-screen">
      <div className="">
        <MonoLogo className="mb-12" />
      </div>

      {navLinks.links.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.to}
          className={({ isActive }) =>
            `${isActive ? "text-white" : "text-white/50"} text-[22px] ${
              !navLinks.enabled ? "pointer-events-none" : ""
            }`
          }
        >
          {link.text}
        </NavLink>
      ))}
    </aside>
  );
};
