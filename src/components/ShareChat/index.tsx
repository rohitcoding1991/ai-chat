"use client";

import React, { useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ControlledDialog from "@/components/ControlledDialog";
import { createSharedChat, getSharedChatByChatId } from "@/actions/share-chat";
import { copyToClipboard } from "@/lib/clipboard";

const ShareChat = ({
  id,
  open,
  setOpen,
}: {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [shareLink, setShareLink] = useState<string>("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (open && id) {
      setLoading(true);
      getSharedChatByChatId(id)
        .then((response) =>
          {
            if(response?.id) {
              setShareLink(
                `${window.location.origin}/share/${response?.id ?? ""}`
              );
            }
          }
        )
        .finally(() => setLoading(false));
    }
  }, [id, open]);

  const onClose = () => {
    setOpen(false);
  };
  const onCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (shareLink) {
      copyToClipboard(shareLink);
      toast.success("Link copied to clipboard!");
    }
    return;
  };

  const onCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const buttonName = e.currentTarget.name;

    try {
      const sharedChatResponse = await createSharedChat({
        chatId: id,
      });

      if (sharedChatResponse) {
        const link = `${window.location.origin}/share/${sharedChatResponse.id}`;
        setShareLink(link);

        if (buttonName === "createLink") {
          toast.success("Share link created successfully", {
            action: {
              label: "View Link",
              actionButtonStyle: {
                color: "white",
                backgroundColor: "green",
              },
              onClick: () => {
                window.open(link, "_blank");
              },
            },
          });
        } else if (buttonName === "update") {
          // Update link functionality, if needed
        }
      } else {
        toast.error("Error sharing chat");
      }
    } catch (error) {
      console.error("Error creating sharable link", error);
      toast.error("Error creating sharable link");
    }
  };

  return (
    <ControlledDialog
      open={open}
      onClose={onClose}
      title="Share public link to chat"
      footer={null}
    >
      <div className="flex flex-col gap-y-2">
        <span>
          Your name and any messages you add after sharing stay private.
        </span>
        <div className="flex gap-2 py-3">
          <Input
            disabled
            value={shareLink}
            placeholder={`${window.location.origin}/share/xxxx`}
          />
          {loading ? (
            <Button disabled>Loading...</Button>
          ) : (
            <>
              {!shareLink ? (
                <Button name="update" onClick={onCreate}>
                  Create Link
                </Button>
              ) : (
                <Button name="copyLink" onClick={onCopy}>
                  Copy Link
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </ControlledDialog>
  );
};

export default ShareChat;
