"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import ControlledDialog from "@/components/ControlledDialog";
import { useSettingStore } from "@/store/SettingStore";

const ArchiveChatButton = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useSettingStore((state) => state.archiveChats);
  const openArchiveChats = useSettingStore((state) => state.openArchiveChats);
  const closeArchiveChats = useSettingStore((state) => state.closeArchiveChats);

  return (
    <>
      {/* Trigger */}
      <Button variant="outline" size="sm" onClick={openArchiveChats}>
        Manage
      </Button>

      <ControlledDialog
        size="md"
        title="Archive Chats"
        open={isOpen}
        onClose={closeArchiveChats}
        footer={null}
      >
        {children}
      </ControlledDialog>
    </>
  );
};

export default ArchiveChatButton;
