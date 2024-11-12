import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/ChatStore";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const ArchivedButton = () => {
  const router = useRouter();
  const fetchChats = useChatStore((state) => state.fetchChats);
  const archivedAllChat = useChatStore((state) => state.archivedAllChat);

  const [loading, setLoading] = React.useState(false);
  const handleArchivedAllChats = async () => {
    try {
      setLoading(true);
      await archivedAllChat();
      setLoading(false);

      toast.success("All Chat archived successfully", {
        description:
          "Tip: you can view it in the archived chats under the settings",
      });
      router.replace("/chat");
      fetchChats();
    } catch (error) {
      console.error(error);
      toast.error("Failed to archived All chat");
    }
  };
  return (
    <>
      <Button
        variant="ghost"
        className="flex flex-row items-center space-x-2"
        onClick={handleArchivedAllChats}
        disabled={loading}
      >
        {loading && (
          <Spinner
            height="16px"
            width="16px"
            borderColor="black"
            borderWidth="3px"
            borderBottomColor="transparent"
          />
        )}
        <span>Archived All</span>
      </Button>
    </>
  );
};

export default ArchivedButton;
