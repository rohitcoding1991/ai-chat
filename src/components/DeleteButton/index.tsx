import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useChatStore } from "@/store/ChatStore";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const DeleteButton = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const fetchChats = useChatStore((state) => state.fetchChats);
  const deleteAllChat = useChatStore((state) => state.deleteAllChat);

  const handleDeleteAllChats = async () => {
    try {
      setLoading(true);
      await deleteAllChat();
      setLoading(false);
      toast.success("All Chat deleted successfully");
      router.replace("/chat");
      fetchChats();
    } catch (error) {
      toast.error("Failed to delete All chat");
    }
  };
  return (
    <>
      <Button
        variant="destructive"
        className="flex flex-row items-center space-x-2"
        onClick={handleDeleteAllChats}
        disabled={loading}
      >
        {loading && (
          <Spinner
            height="16px"
            width="16px"
            borderColor="white"
            borderWidth="3px"
            borderBottomColor="transparent"
          />
        )}
        <span>Delete All</span>
      </Button>
    </>
  );
};

export default DeleteButton;
