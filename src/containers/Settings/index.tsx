"use client";

import React from "react";

import { cn } from "@/lib/utils";
import GeneralTab from "./tabs/General";
import DataControlTab from "./tabs/DataControl";
import SecurityTab from "./tabs/Security";

const Settings = () => {
  const [selectedTab, setSelectedTab] = React.useState("general");

  return (
    <div className="flex justify-start pb-2 gap-x-4 min-h-[200px]">
      <nav className="flex flex-col text-sm text-muted-foreground w-[120px] bg-gray-100 justify-start border border-gray-200 rounded-sm p-4 gap-y-6">
        <span
          className={cn(
            "cursor-pointer",
            selectedTab === "general" && "font-semibold text-primary"
          )}
          onClick={() => setSelectedTab("general")}
        >
          General
        </span>
        <span
          className={cn(
            "cursor-pointer",
            selectedTab === "data_control" && "font-semibold text-primary"
          )}
          onClick={() => setSelectedTab("data_control")}
        >
          Data Control
        </span>
        <span
          className={cn(
            "cursor-pointer",
            selectedTab === "security" && "font-semibold text-primary"
          )}
          onClick={() => setSelectedTab("security")}
        >
          Security
        </span>
      </nav>
      <div className="flex-1 flex-col spacing-y-6">
        {selectedTab === "general" && <GeneralTab />}
        {selectedTab === "data_control" && <DataControlTab />}
        {selectedTab === "security" && <SecurityTab />}
      </div>
    </div>
  );
};

export default Settings;
