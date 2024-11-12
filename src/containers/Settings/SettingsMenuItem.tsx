"use client";

import React from "react";

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { useSettingStore } from "@/store/SettingStore";

interface IProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsMenuItem = () => {
  const openSettings = useSettingStore((state) => state.openSettings);

  return (
    <>
      <DropdownMenuItem className="cursor-pointer" onClick={openSettings}>
        Settings
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
    </>
  );
};

export default SettingsMenuItem;
