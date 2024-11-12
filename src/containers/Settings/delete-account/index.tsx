"use client";

import React from "react";

import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import ConfirmDelete from "@/components/ConfirmDelete";
import { deleteAccount } from "@/actions/account";
import { ROOT } from "@/routes";

const DeleteAccount = () => {
  const [open, setOpen] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      const deleted = await deleteAccount();
      if (deleted) {
        setDeleteLoading(false);
        toast.success("Account deleted successfully!");
        setTimeout(() => {
          signOut({
            redirect: true,
            callbackUrl: ROOT,
          });
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setDeleteLoading(false);
      toast.error("Failed to delete account!");
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className="flex flex-row items-center space-x-2"
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>

      <ConfirmDelete
        title="Delete Account"
        subtitle="Are you sure you want to delete your account? All your data will be lost. However, you can always create a new account."
        open={open}
        onClose={() => setOpen(false)}
        onDelete={handleDeleteAccount}
        loading={deleteLoading}
      />
    </>
  );
};

export default DeleteAccount;
