import React from "react";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ArchiveChatButton from "@/containers/Settings/archive-chats/ArchiveChatButton";
import ArchiveChats from "@/containers/Settings/archive-chats";
import DeleteButton from "@/components/DeleteButton";
import ArchivedButton from "@/components/ArchivedAll";

const GeneralTab = () => {
  return (
    <div className="flex flex-col space-y-2">
      {/* Archived Chats */}
      <div className="flex items-center justify-between w-full">
        <Label htmlFor="functional" className="flex flex-col space-y-1">
          <span className="font-normal text-sm">Archived chats</span>
        </Label>
        <ArchiveChatButton>
          <ArchiveChats />
        </ArchiveChatButton>
      </div>

      <Separator />

      {/* Archived all chats */}
      <div className="flex items-center justify-between w-full">
        <Label htmlFor="functional" className="flex flex-col space-y-1">
          <span className="font-normal text-sm">Archive all chats</span>
        </Label>
        <ArchivedButton />
      </div>

      <Separator />

      {/* Delete all chats */}
      <div className="flex items-center justify-between w-full">
        <Label htmlFor="functional" className="flex flex-col space-y-1">
          <span className="font-normal text-sm">Delete all chats</span>
        </Label>
        <DeleteButton />
      </div>
    </div>
  );
};

export default GeneralTab;
