import React from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SharedLinks from "@/containers/Settings/shared-links";
import SharedLinksButton from "@/containers/Settings/shared-links/SharedLinksButton";
import DeleteAccount from "@/containers/Settings/delete-account";

const DataControlTab = () => {
  return (
    <div className="flex flex-col space-y-2">
      {/* Shared links */}
      <div className="flex items-center justify-between w-full">
        <Label htmlFor="functional" className="flex flex-col space-y-1">
          <span className="font-normal text-sm">Shared links</span>
        </Label>
        <SharedLinksButton>
          <SharedLinks />
        </SharedLinksButton>
      </div>

      <Separator />

      {/* Delete account */}
      <div className="flex items-center justify-between w-full">
        <Label htmlFor="functional" className="flex flex-col space-y-1">
          <span className="font-normal text-sm">Delete Account</span>
        </Label>
        <DeleteAccount />
      </div>
    </div>
  );
};

export default DataControlTab;
