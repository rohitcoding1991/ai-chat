"use client";

import React from "react";
import { useSettingStore } from "@/store/SettingStore";
import ControlledDialog from "@/components/ControlledDialog";

const SettingsModal = ({ children }: { children: React.ReactNode }) => {
  const open = useSettingStore((state) => state.open);
  const closeSettings = useSettingStore((state) => state.closeSettings);

  return (
    open && (
      <ControlledDialog
        title="Settings"
        open={open}
        onClose={closeSettings}
        footer={null}
      >
        {children}
      </ControlledDialog>
    )
  );
};

export default SettingsModal;
