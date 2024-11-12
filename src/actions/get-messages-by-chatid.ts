"use server";

import { auth } from "@/auth";
import prismaClient from "@/prisma/prisma";
import { Role } from "@/types/ai";

export const getMessagesByChatId = async ({
  chatId,
  skipAuth = false,
}: {
  chatId?: string;
  skipAuth?: boolean;
}) => {
  const session = await auth();
  const userId = session?.user?.id!;

  if (!skipAuth && !userId) {
    throw new Error("User not authenticated");
  }

  // find if chat with chatId exits
  const chat = await prismaClient.chat.findFirst({
    where: {
      id: chatId,
    },
  });

  if (!chat) {
    throw new Error(`Chat with chat id ${chatId} not found!`);
  }

  const messages = await prismaClient.message.findMany({
    where: {
      chatId: chatId,
    },
  });

  return messages.map((msg) => ({
    ...msg,
    role: msg.role as Role,
  }));
};
