import React from "react";

import Sidebar from "@/components/Sidebar";
import { UserNav } from "@/components/Header/UserNav";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="hidden md:block min-w-[256px] max-w-[256px]">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-end h-[64px] items-center px-4 fixed top-0 right-0">
          <UserNav />
        </div>
        <div className="flex-1 mt-[64px]">{children}</div>
      </div>
    </div>
  );
};

export default PrivateLayout;
