import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as MonoLogo } from "../../assets/mono-logo-white.svg";
import { AiOutlineClose } from "react-icons/ai";
import { SideBarProps } from "./SideBar";

export interface MobileSideBarProps {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileSideBar: React.FC<SideBarProps & MobileSideBarProps> = ({
  navLinks,
  setShowNav,
  showNav,
}) => {
  return (
    <>
      <button
        onClick={() => setShowNav(!showNav)}
        className={`${
          showNav ? "block" : "hidden"
        } fixed lg:hidden h-screen block bg-black/10 w-screen `}
      />
      <aside
        className={`lg:hidden fixed duration-100 left-0 top-0 flex bg-black ${
          showNav ? "scale-x-100" : "w-0 scale-x-0"
        } py-14 origin-left pl-14 w-full max-w-[280px] space-y-7 flex-col h-screen`}
      >
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
        <button
          onClick={() => setShowNav(false)}
          className="absolute top-0 -right-10"
        >
          <AiOutlineClose className="text-black w-6 h-6" />
        </button>
      </aside>
    </>
  );
};
