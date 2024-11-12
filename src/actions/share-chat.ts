"use server";

import { auth } from "@/auth";
import prismaClient from "@/prisma/prisma";

export const createSharedChat = async ({ chatId }: { chatId: string }) => {
  const session = await auth();
  const userId = session?.user?.id!;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // check if the chat is already shared and if yes, return the existing shared chat

  const existingSharedChat = await prismaClient.sharedChat.findFirst({
    where: {
      userId,
      chatId,
    },
  });

  if (existingSharedChat) {
    return existingSharedChat;
  }

  // otherwise, create a new shared chat
  const sharedChat = await prismaClient.sharedChat.create({
    data: {
      userId,
      chatId,
    },
  });

  return sharedChat;
};

// public method, does not require authentication
export const getSharedChatById = async (id: string) => {
  const sharedChats = await prismaClient.sharedChat.findMany({
    where: {
      id,
    },
    include: {
      chat: {
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      },
    },
  });

  return sharedChats;
};

export const getSharedChatByChatId = async (chatId: string) => {
  const session = await auth();
  const userId = session?.user?.id!;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const sharedChat = await prismaClient.sharedChat.findFirst({
    where: {
      userId,
      chatId
    },
  });

  return sharedChat;
};

export const getSharedChats = async () => {
  const session = await auth();
  const userId = session?.user?.id!;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const sharedChats = await prismaClient.sharedChat.findMany({
    where: {
      userId,
    },
    include: {
      chat: {
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      },
    },
  });

  return sharedChats;
};

export const deleteSharedChatById = async (id: string) => {
  const session = await auth();
  const userId = session?.user?.id!;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const sharedChat = await prismaClient.sharedChat.delete({
    where: {
      id,
      userId,
    },
  });

  return sharedChat;
};
