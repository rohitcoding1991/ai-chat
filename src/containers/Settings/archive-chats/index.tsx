"use client";

import React from "react";
import { Trash2Icon, ArchiveRestoreIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { getArchivedChats } from "@/actions/archive-chat";
import { ArchiveChat } from "@/types/chat";
import { formatDate } from "@/lib/date";
import { useChatStore } from "@/store/ChatStore";
import Spinner from "@/components/Spinner";

const ArchiveChats = () => {
  const unArchiveChat = useChatStore((state) => state.unarchiveChat);

  const [loading, setLoading] = React.useState(false);
  const [archiveChats, setArchiveChats] = React.useState<ArchiveChat[]>([]);
  const [spinnerTrue, setSpinnerTrue] = React.useState<string | null>(null);
  const deleteChat = useChatStore((state) => state.deleteChat);
  const fetchChats = useChatStore((state) => state.fetchChats);
  const [spinnerLoading, setSpinnerLoading] = React.useState<{
    [key: string]: boolean;
  }>({});

  React.useEffect(() => {
    setLoading(true);
    getArchivedChats()
      .then((data) => {
        setArchiveChats(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteSharedChat = async (id: string) => {
    try {
      setSpinnerTrue(id);
      const deletedChat = await deleteChat(id);
      if (deletedChat) {
        setArchiveChats((prev) => prev.filter((chat) => chat.id !== id));
        toast.success("Chat deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete chat");
    } finally {
      setSpinnerTrue(null);
    }
  };

  const handleRestoreChat = async (id: string) => {
    setSpinnerLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const unArchived = await unArchiveChat(id);

      if (unArchived) {
        setArchiveChats((prev) => prev.filter((chat) => chat.id !== id));
        toast.success("Chat unarchived successfully");
        fetchChats();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to unarchive chat");
    } finally {
      setSpinnerLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <>
      <Card x-chunk="A table of recent orders showing the following columns: Customer, Type, Status, Date, and Amount.">
        <CardContent className="p-0">
          {loading ? (
            <p className="min-h-[100px] flex items-center justify-center">
              Loading...
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden sm:table-cell">Name</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Date Shared
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {archiveChats.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <span className="font-semibold text-sm text-gray-600">
                        No chat shared yet!
                      </span>
                    </TableCell>
                  </TableRow>
                )}
                {archiveChats.map((archiveChat) => {
                  return (
                    <TableRow className="bg-accent" key={archiveChat.id}>
                      <TableCell>
                        <div className="font-medium">{archiveChat.title}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {formatDate(archiveChat.createdAt)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="flex gap-x-2">
                          <span>
                            {spinnerLoading[archiveChat.id] ? (
                              <div className="h-[16px] w-[16px]">
                                <Spinner
                                  height="15px"
                                  width="15px"
                                  borderWidth="2px"
                                  borderColor="black"
                                  borderBottomColor="white"
                                />
                              </div>
                            ) : (
                              <ArchiveRestoreIcon
                                onClick={() =>
                                  handleRestoreChat(archiveChat.id)
                                }
                                className="cursor-pointer"
                                size={16}
                              />
                            )}
                          </span>
                          <span className="text-red-500 hover:text-red-600">
                            {spinnerTrue === archiveChat.id ? (
                              <div className="h-[16px] w-[16px]">
                                <Spinner
                                  width="15px"
                                  height="15px"
                                  borderWidth="2px"
                                  borderBottomColor="red"
                                  borderColor="white"
                                />
                              </div>
                            ) : (
                              <Trash2Icon
                                className="cursor-pointer"
                                size={16}
                                onClick={() => deleteSharedChat(archiveChat.id)}
                              />
                            )}
                          </span>
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ArchiveChats;
