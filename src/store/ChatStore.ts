import { deleteAllChats, deleteChatCascade } from "@/actions/delete-chat";
import { getChats } from "@/actions/get-chats";
import {
  archiveChat as archiveChatAction,
  archivedAllChats,
  unArchiveChat,
} from "@/actions/archive-chat";
import { Chat } from "@prisma/client";
import { create } from "zustand";

export type ChatState = {
  chats: Chat[];
};

export type ChatActions = {
  fetchChats: () => void;
  archiveChat: (chatId: string) => Promise<Chat>;
  unarchiveChat: (chatId: string) => Promise<Chat>;
  archivedAllChat: () => void;
  deleteAllChat: () => void;
  deleteChat: (chatId: string) => Promise<Chat>;
  resetChats: () => void;
  moveChatToIndex: (
    chatId: string,
    targetIndex: number,
    updatedChat: Chat
  ) => void;
};

export const useChatStore = create<ChatState & ChatActions>()((set) => ({
  chats: [],
  fetchChats: async () => {
    try {
      const chats = await getChats();

      set({ chats });
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  },
  moveChatToIndex: (chatId: string, targetIndex: number, updatedChat: Chat) => {
    set((state) => {
      const chats = [...state.chats];
      const chatIndex = chats.findIndex((chat) => chat.id === chatId);

      if (chatIndex !== -1 && targetIndex !== -1) {
        const targetChat = state.chats[targetIndex];
        chats[chatIndex] = targetChat;
        chats[targetIndex] = updatedChat;
      }

      return { chats };
    });
  },
  archiveChat: async (chatId: string) => {
    try {
      const archivedChat = await archiveChatAction({ chatId });
      set((state) => {
        const chats = state.chats.map((chat) =>
          chat.id === chatId ? { ...chat, archived: true } : chat
        );
        return { chats };
      });
      return archivedChat;
    } catch (error) {
      console.error("Error archiving chat:", error);
      throw error;
    }
  },
  unarchiveChat: async (chatId: string) => {
    try {
      const archivedChat = await unArchiveChat({ chatId });
      set((state) => {
        const chats = state.chats.map((chat) =>
          chat.id === chatId ? { ...chat, archived: false } : chat
        );
        return { chats };
      });
      return archivedChat;
    } catch (error) {
      console.error("Error unarchiving chat:", error);
      throw error;
    }
  },
  archivedAllChat: async () => {
    try {
      const archivedChat = await archivedAllChats();

      // set((state) => {
      //   const chats = state.chats.map((chat) => ({
      //     ...chat,
      //     archived: true,
      //   }));
      //   console.log(chats, "Updated chats after archiving all chats");
      //   return { chats };
      // });
      set({ chats: [] });

      return archivedChat;
    } catch (error) {
      console.error("Error archiving all chats:", error);
      throw error;
    }
  },
  deleteChat: async (chatId: string) => {
    try {
      const deletedChat = await deleteChatCascade({ chatId });

      set((state) => {
        const chats = state.chats.filter((chat) => chat.id !== chatId);
        return { chats };
      });
      return deletedChat;
    } catch (error) {
      console.error("Error deleting chat:", error);
      throw error;
    }
  },
  deleteAllChat: async () => {
    try {
      const deletedAllChat = await deleteAllChats();

      set({ chats: [] });

      return deletedAllChat;
    } catch (error) {
      console.error("Error deleting all chats:", error);
      throw error;
    }
  },
  resetChats: () => set({ chats: [] }),
}));
