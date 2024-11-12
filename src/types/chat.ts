import { Chat, Message } from "@prisma/client";

export type EditChatItem = {
  id: string;
  title: string;
};

export type SharedChat = {
  chat: Chat & {
    messages: Message[];
  };
  chatId: string;
  createdAt: Date;
  id: string;
  updatedAt: Date;
  userId: string;
};

export type ArchiveChat = {
  archived: boolean;
  createdAt: Date;
  id: string;
  messages: Message[];
  title: string;
  updatedAt: Date;
  userId: string;
};
