import React from "react";

import { getChats } from "@/actions/get-chats";
import Chats from "./Chats";

const ChatHistory = async () => {
  const chats = await getChats();

  return (
    <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <Chats chats={chats} />
      </nav>
    </div>
  );
};

export default ChatHistory;
