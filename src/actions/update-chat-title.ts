"use server";

import { auth } from "@/auth";
import prismaClient from "@/prisma/prisma";

export const updateChatTitle = async ({
  chatId,
  title,
}: {
  chatId: string;
  title: string;
}) => {
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
      title,
    },
  });

  return chat;
};
