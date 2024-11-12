import React from "react";

import Link from "next/link";
import CreateIcon from "@/icons/svg/create.svg";
import SidebarIcon from "@/icons/svg/sidebar.svg";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChatHistory from "@/components/ChatHistory";

const Sidebar = () => {
  return (
    <div className="border-r-2 border-gray-100 h-screen">
      {/* Header */}
      <div className="min-h-[64px] flex justify-between items-center w-full px-2 py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <SidebarIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Close Sidebar</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/chat">
                <Button variant="outline" size="icon">
                  <CreateIcon />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <span>New Chat</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ChatHistory />
    </div>
  );
};

export default Sidebar;
