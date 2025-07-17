import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface DeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  buttonText: string;
  dataName: string;
  deleteFn: () => void;
}
export function DeleteDialog({
  open,
  setOpen,
  buttonText,
  dataName,
  deleteFn,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>You are deleting {dataName}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={deleteFn}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
