"use client";

import ShareChat from "@/components/ShareChat";
import { ShareIcon } from "lucide-react";
import React from "react";
import { useChatStore } from "@/store/ChatStore";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const ShareBtn = () => {
  const [openShareChat, setOpenShareChat] = React.useState(false);
  const chatsFromStore = useChatStore((state) => state.chats);
  const params = useParams();
  const chatId = (params?.slug ?? "") as string;

  if (!chatId) return null;

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpenShareChat(true)}
      >
        <ShareIcon />
      </Button>
      {openShareChat &&
        chatsFromStore.map((chat) => {
          if (chat.id === chatId) {
            return (
              <ShareChat
                key={chat.id}
                id={chat.id}
                open={openShareChat}
                setOpen={setOpenShareChat}
              />
            );
          }
        })}
    </>
  );
};

export default ShareBtn;
