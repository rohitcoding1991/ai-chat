import { create } from "zustand";

export type SettingState = {
  open: boolean;
  sharedLinks: boolean;
  archiveChats: boolean;
};

export type SettingActions = {
  // Settings
  openSettings: () => void;
  closeSettings: () => void;
  toggleSettings: () => void;

  // Shared links
  openSharedLinks: () => void;
  closeSharedLinks: () => void;
  toggleSharedLinks: () => void;

  // Archive chats
  openArchiveChats: () => void;
  closeArchiveChats: () => void;
  toggleArchiveChats: () => void;
};

export const useSettingStore = create<SettingState & SettingActions>()(
  (set) => ({
    open: false,
    openSettings: () => set({ open: true }),
    closeSettings: () => set({ open: false }),
    toggleSettings: () => set((state) => ({ open: !state.open })),

    sharedLinks: false,
    openSharedLinks: () => set({ sharedLinks: true }),
    closeSharedLinks: () => set({ sharedLinks: false }),
    toggleSharedLinks: () =>
      set((state) => ({ sharedLinks: !state.sharedLinks })),

    archiveChats: false,
    openArchiveChats: () => set({ archiveChats: true }),
    closeArchiveChats: () => set({ archiveChats: false }),
    toggleArchiveChats: () =>
      set((state) => ({ archiveChats: !state.archiveChats })),
  })
);
