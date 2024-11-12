"use server";

import { auth } from "@/auth";
import prismaClient from "@/prisma/prisma";

export const archiveChat = async ({ chatId }: { chatId: string }) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const chat = await prismaClient.chat.update({
    where: {
      id: chatId,
    },
    data: {
      archived: true,
    },
  });

  return chat;
};

export const archivedAllChats = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const chat = await prismaClient.chat.updateMany({
    data: {
      archived: true,
    },
  });

  return chat;
};
export const getArchivedChats = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const chats = await prismaClient.chat.findMany({
    where: {
      userId,
      archived: true,
    },
    include: {
      messages: true,
    },
  });

  return chats;
};

export const unArchiveChat = async ({ chatId }: { chatId: string }) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const chat = await prismaClient.chat.update({
    where: {
      id: chatId,
    },
    data: {
      archived: false,
    },
  });

  return chat;
};
