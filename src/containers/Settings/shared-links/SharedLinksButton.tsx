"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import ControlledDialog from "@/components/ControlledDialog";
import { useSettingStore } from "@/store/SettingStore";

const SharedLinksButton = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useSettingStore((state) => state.sharedLinks);
  const openSharedLinks = useSettingStore((state) => state.openSharedLinks);
  const closeSharedLinks = useSettingStore((state) => state.closeSharedLinks);

  return (
    <>
      {/* Trigger */}
      <Button variant="outline" size="sm" onClick={openSharedLinks}>
        Manage
      </Button>

      <ControlledDialog
        size="md"
        title="Shared Links"
        open={isOpen}
        onClose={closeSharedLinks}
        footer={null}
      >
        {children}
      </ControlledDialog>
    </>
  );
};

export default SharedLinksButton;
