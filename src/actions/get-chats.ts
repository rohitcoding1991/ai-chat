"use server";

import { auth } from "@/auth";
import prismaClient from "@/prisma/prisma";

export const getChats = async (
  { archiveChat }: { archiveChat?: boolean } = {
    archiveChat: false,
  }
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const chats = await prismaClient.chat.findMany({
    where: {
      userId,
      archived: archiveChat,
    },
    // for sorting the chats by the latest updated
    orderBy: {
      updatedAt: "desc",
    },
    // include: {
    //   messages: {
    //     orderBy: {
    //       createdAt: "asc",
    //     },
    //   },
    // },
  });

  return chats;
};
