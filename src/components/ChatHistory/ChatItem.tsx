import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  EllipsisIcon,
  Trash2Icon,
  PencilIcon,
  ShareIcon,
  ArchiveIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Chat } from "@prisma/client";
import { EditChatItem } from "@/types/chat";
import ConfirmDelete from "@/components/ConfirmDelete";
import { updateChatTitle } from "@/actions/update-chat-title";
import { useChatStore } from "@/store/ChatStore";
import { archiveChat } from "@/actions/archive-chat";
import ShareChat from "@/components/ShareChat";

const ChatItem = ({ chat, selected }: { chat: Chat; selected: boolean }) => {
  const router = useRouter();
  const moveChatToIndex = useChatStore((state) => state.moveChatToIndex);
  const deleteChat = useChatStore((state) => state.deleteChat);

  const [hover, setHover] = React.useState(false);
  const [editChat, setEditChat] = React.useState<EditChatItem>({
    id: "",
    title: "",
  });

  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const [openShareChat, setOpenShareChat] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const fetchChats = useChatStore((state) => state.fetchChats);

  React.useEffect(() => {
    setIsClient(true); // This ensures the code only runs on the client
  }, []);

  const handleDeleteChat = async () => {
    try {
      setLoading(true);
      const deletedChat = await deleteChat(chat.id);
      setLoading(false);
      setOpenConfirmDelete(false);
      toast.success(`Chat #${deletedChat.id} deleted successfully`);
      router.replace("/chat");
      fetchChats();
    } catch (error) {
      toast.error("Error deleting chat");
    }
  };

  const handleEditChat = async () => {
    // If chat title is empty or same as the current title, do nothing
    if (editChat.title === "" || editChat.title === chat.title) {
      setEditChat({ id: "", title: "" });
      return;
    }
    try {
      const updatedChat = await updateChatTitle({
        chatId: editChat.id,
        title: editChat.title,
      });
      if (updatedChat) {
        toast.success(`Chat #${updatedChat.id} updated successfully`);
        setEditChat({ id: "", title: "" });
        moveChatToIndex(editChat.id, 0, updatedChat);
      }
    } catch (error) {
      toast.error("Error updating chat");
    }
  };

  const handleArchiveChat = async () => {
    try {
      await archiveChat({ chatId: chat.id });

      toast.success(`Chat #${chat.id} archived successfully`, {
        description:
          "Tip: you can view it in the archived chats under the settings",
      });
      router.replace("/chat");
      fetchChats();
    } catch (error) {
      toast.error("Error archiving chat");
    }
  };

  if (editChat.id) {
    return (
      <Input
        value={editChat.title}
        onChange={(e) => setEditChat({ ...editChat, title: e.target.value })}
        onBlur={() => handleEditChat()}
        autoFocus
        onKeyUp={(event) => {
          // detect enter key press
          if (event.key === "Enter") {
            handleEditChat();
          }
        }}
      />
    );
  }

  return (
    <>
      <Link
        key={chat.id}
        href={`/chat/${chat.id}`}
        className={cn(
          selected && "bg-slate-200",
          buttonVariants({ variant: "ghost", size: "sm" }),
          true &&
            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
          "justify-start"
        )}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-center justify-between w-full">
          <p className="truncate max-w-[190px]">{chat.title}</p>

          {isClient && (
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger>
                {(hover || dropdownOpen || selected) && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 border-none bg-transparent text-gray-500 hover:text-gray-950"
                  >
                    <EllipsisIcon size={14} />
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="flex items-center gap-x-3 hover:cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpenShareChat(true);
                  }}
                >
                  <ShareIcon size={16} />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-x-3 hover:cursor-pointer"
                  onClick={() => {
                    setEditChat({ id: chat.id, title: chat.title });
                  }}
                >
                  <PencilIcon size={16} />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-x-3 hover:cursor-pointer"
                  onClick={handleArchiveChat}
                >
                  <ArchiveIcon size={16} />
                  <span>Archive</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-x-3 text-red-500 hover:cursor-pointer"
                  onClick={() => setOpenConfirmDelete(true)}
                >
                  <Trash2Icon size={16} />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </Link>
      {openConfirmDelete && (
        <ConfirmDelete
          open={openConfirmDelete}
          onClose={() => setOpenConfirmDelete(false)}
          title="Delete Chat?"
          onDelete={handleDeleteChat}
          loading={loading}
        />
      )}

      {openShareChat && (
        <ShareChat
          id={chat.id}
          open={openShareChat}
          setOpen={setOpenShareChat}
        />
      )}
    </>
  );
};

export default ChatItem;
