// Hyderation component for the ChatHistory component
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Chat } from "@prisma/client";
import { useChatStore } from "@/store/ChatStore";
import ChatItem from "./ChatItem";

const Chats = ({ chats }: { chats: Chat[] }) => {
  const chatsFromStore = useChatStore((state) => state.chats);
  // const fetchChats = useChatStore((state) => state.fetchChats);
  const params = useParams();
  const chatId = (params?.slug ?? "") as string;

  // React.useEffect(() => {
  //   if (!chatsFromStore.length) {
  //     fetchChats();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // chatFromStore will be refetched when the url changes by - src\components\Chat\ChatInput.tsx:190
  const renderCharts = chatsFromStore.length ? chatsFromStore : chats;

  if (renderCharts.length === 0) {
    return (
      <p className="text-center text-base text-gray-600">No chats found</p>
    );
  }

  return renderCharts.map((chat) => (
    <ChatItem key={chat.id} chat={chat} selected={chat.id === chatId} />
  ));
};

export default Chats;
