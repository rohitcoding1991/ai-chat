import React from "react";
import { Message } from "@prisma/client";
import ChatLine from "@/components/Chat/ChatLine";

import { getSharedChatById } from "@/actions/share-chat";
import { formatDate } from "@/lib/date";
import { Role } from "@/types/ai";

const SharePage = async ({ params: { id } }: { params: { id: string } }) => {
  if (!id) {
    throw new Error("Chat is not required in parameters");
  }

  const sharedChats = await getSharedChatById(id);

  return (
    <>
      {sharedChats[0] ? (
        <div className="px-4 md:px-0 sm:mx-[50px] md:mx-[100px] lg:mx-[200px] xl:md:mx-[250px] 3xl:mx-[300px] 4xl:mx-[400px]">
          <div className="flex flex-col justify-between items-center">
            <div className="mx-auto flex flex-1 gap-3 text-base w-full">
              <div className="border-b border-gray-100 pb-4 pt-3 sm:mb-2 sm:pb-6 sm:pt-8 w-full text-center">
                <h1 className="text-3xl font-semibold leading-tight text-token-text-primary sm:text-4xl">
                  {sharedChats[0]?.chat.title}
                </h1>

                <div className="pt-3 text-base text-gray-400 sm:pt-4">
                  {formatDate(sharedChats[0]?.chat.updatedAt)}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-10 pr-4 pb-8 px-2 pt-4">
              {sharedChats[0]?.chat.messages.map((hist: Message, i) => (
                <ChatLine
                  key={hist.id + i}
                  id={hist.id + i}
                  role={hist.role as Role}
                  content={hist.content}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[80vh] justify-center items-center ">
          <div>
            <h1 className="text-2xl">Chat is not found for this id {id}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default SharePage;
