"use server";

import { auth } from "@/auth";
import prismaClient from "@/prisma/prisma";
import { Role } from "@/types/ai";
import { Message } from "ai/react";

export const createChat = async ({
  chatId,
  title,
  messages,
}: {
  chatId: string;
  title: string;
  messages: Message[];
}) => {
  const session = await auth();
  const userId = session?.user?.id!;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  let chat;
  if (!chatId) {
    // Only create a new chat if chatId is not provided
    chat = await prismaClient.chat.create({
      data: {
        userId,
        title,
      },
    });
  } else {
    // Get the chat if chatId is provided
    chat = await prismaClient.chat.findUnique({
      where: {
        id: chatId,
      },
    });
  }

  if (!chat) {
    throw new Error("Chat not found");
  }

  // Add a message to the newly created chat
  const msgs = await prismaClient.message.createManyAndReturn({
    data: messages.map((message) => ({
      chatId: chat.id,
      userId,
      role: message.role,
      content: message.content,
    })),
  });

  return {
    chat,
    message: msgs.map((msg) => ({
      ...msg,
      role: msg.role as Role,
    })),
  };
};
