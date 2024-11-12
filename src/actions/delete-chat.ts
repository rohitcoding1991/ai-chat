"use server";

import { auth } from "@/auth";
import prismaClient from "@/prisma/prisma";

export const deleteChatCascade = async ({ chatId }: { chatId: string }) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const chat = await prismaClient.chat.delete({
    where: {
      id: chatId,
    },
    include: {
      messages: true,
    },
  });

  return chat;
};

export const deleteAllChats = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const deletedAllChats = await prismaClient.chat.deleteMany({});

  return deletedAllChats;
};
