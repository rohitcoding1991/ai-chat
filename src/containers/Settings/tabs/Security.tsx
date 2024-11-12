"use client";

import React from "react";

import { signOut } from "next-auth/react";
import { ROOT } from "@/routes";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SecurityTab = () => {
  return (
    <div className="flex flex-col space-y-2">
      {/* Logout all devices */}
      <div className="flex items-center justify-between w-full">
        <Label htmlFor="functional" className="flex flex-col space-y-1">
          <span className="font-normal text-sm">Log out</span>
        </Label>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            signOut({
              callbackUrl: ROOT,
              redirect: true,
            })
          }
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SecurityTab;
