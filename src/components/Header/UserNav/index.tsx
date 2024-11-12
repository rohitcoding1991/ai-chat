import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signOut } from "@/auth";
import { ROOT } from "@/routes";
import { getInitials } from "@/utils/strings";
import SettingsMenuItem from "@/containers/Settings/SettingsMenuItem";
import ShareBtn from "../UserNavShareBtn";

export async function UserNav() {
  const session = await auth();

  return (
    <div className="flex gap-4">
      <ShareBtn />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full mt-1"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={session?.user?.image ?? ""}
                alt={session?.user.name ?? "Profile"}
              />
              <AvatarFallback>{getInitials(session?.user.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session?.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <SettingsMenuItem />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex-1">
            <form
              className="flex-1 cursor-pointer"
              action={async (event) => {
                "use server";
                await signOut({
                  redirectTo: ROOT,
                  redirect: true,
                });
              }}
            >
              <button type="submit" className="flex w-full">
                Log out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
