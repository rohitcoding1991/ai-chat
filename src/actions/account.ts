"use server";

import { auth } from "@/auth";
import prismaClient from "@/prisma/prisma";

export const deleteAccount = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  await prismaClient.user.delete({
    where: {
      id: userId,
    },
  });

  return true;
};
