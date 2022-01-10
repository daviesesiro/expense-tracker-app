import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { SideBar } from "./SideBar";
import { MobileSideBar } from "./MobileSideBar";

export const Layout: React.FC = () => {
  const [showNav, setShowNav] = useState(false);
  const auth = useAuth();

  const navLinks = {
    enabled: (auth.user?.accounts || 0) > 0,
    links: [
      { text: "Dashboard", to: "/" },
      { text: "Accounts", to: "/accounts" },
      { text: "Transactions", to: "/transactions" },
      { text: "Settings", to: "/settings" },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full flex items-center lg:hidden p-4 py-3 bg-gray-100">
        <button className="inline-block" onClick={() => setShowNav(true)}>
          <AiOutlineMenu className="w-6 z-20 h-6" />
        </button>
      </div>
      <SideBar navLinks={navLinks} />
      <MobileSideBar
        showNav={showNav}
        setShowNav={setShowNav}
        navLinks={navLinks}
      />
      <main className="w-full max-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
