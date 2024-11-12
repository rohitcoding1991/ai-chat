import { Button } from "@/components/ui/button";
import ControlledDialog from "@/components/ControlledDialog";
import Spinner from "@/components/Spinner";

const ConfirmDelete = ({
  open,
  onClose,
  onDelete,
  title,
  subtitle,
  loading,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  onDelete: () => void;
  title: string;
  subtitle?: string;
  loading?: boolean;
}) => {
  return (
    <ControlledDialog
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <Button
          variant="destructive"
          className="flex flex-row items-center space-x-2"
          onClick={onDelete}
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
          <span>Delete</span>
        </Button>
      }
    >
      {subtitle}
    </ControlledDialog>
  );
};

ConfirmDelete.defaultProps = {
  subtitle:
    "Are you sure you want to delete this item? This action cannot be undone.",
};

export default ConfirmDelete;
