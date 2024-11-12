import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const ControlledDialog = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = "xs",
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn("p-0", {
          "max-w-lg": size === "xs",
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md",
          "max-w-screen-lg": size === "lg",
          "max-w-screen-xl": size === "xl",
        })}
      >
        <DialogHeader>
          <DialogTitle className="px-4 pt-4 pb-2">{title}</DialogTitle>

          <Separator />

          <DialogDescription className="px-4 py-2">
            {children}
          </DialogDescription>
        </DialogHeader>

        {footer && (
          <>
            <Separator />

            <DialogFooter className="px-4 py-2">{footer}</DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ControlledDialog;
