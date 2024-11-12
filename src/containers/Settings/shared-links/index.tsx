"use client";

import React from "react";
import { Trash2Icon, EyeIcon } from "lucide-react";
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
import { getSharedChats, deleteSharedChatById } from "@/actions/share-chat";
import { SharedChat } from "@/types/chat";
import { formatDate } from "@/lib/date";
import Spinner from "@/components/Spinner";

const SharedLinks = () => {
  const [loading, setLoading] = React.useState(false);
  const [sharedChats, setSharedChats] = React.useState<SharedChat[]>([]);
  const [spinnerLoading, setSpinnerLoading] = React.useState<{
    [key: string]: boolean;
  }>({});
  React.useEffect(() => {
    setLoading(true);
    getSharedChats()
      .then((data) => {
        setSharedChats(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteSharedChat = async (id: string) => {
    setSpinnerLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const deletedChat = await deleteSharedChatById(id);
      if (deletedChat) {
        setSharedChats((prev) => prev.filter((chat) => chat.id !== id));
        toast.success("Chat deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete chat");
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
                {sharedChats.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <span className="font-semibold text-sm text-gray-600">
                        No chat shared yet!
                      </span>
                    </TableCell>
                  </TableRow>
                )}
                {sharedChats.map((sharedChat) => {
                  return (
                    <TableRow className="bg-accent" key={sharedChat.id}>
                      <TableCell>
                        <div className="font-medium">
                          {sharedChat.chat.title}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {formatDate(sharedChat.createdAt)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="flex gap-x-2">
                          <a
                            href={`/chat/${sharedChat.chatId}`}
                            target="_blank"
                          >
                            <EyeIcon className="cursor-pointer" size={16} />
                          </a>
                          <span className="text-red-500 hover:text-red-600">
                            {spinnerLoading[sharedChat.id] ? (
                              <div className="h-[16px] w-[16px]">
                                {" "}
                                <Spinner
                                  height="15px"
                                  width="15px"
                                  borderColor="red"
                                  borderWidth="2px"
                                  borderBottomColor="white"
                                />
                              </div>
                            ) : (
                              <Trash2Icon
                                className="cursor-pointer"
                                size={16}
                                onClick={() => deleteSharedChat(sharedChat.id)}
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

export default SharedLinks;
