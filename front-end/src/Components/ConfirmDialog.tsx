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

interface ConfirmDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  buttonText: string;
  dataName: string;
  mutateFn: () => void;
}
export function ConfirmDialog({
  open,
  setOpen,
  buttonText,
  dataName,
  mutateFn,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to {buttonText.toLowerCase()}?
          </DialogTitle>
          <DialogDescription>Confirm for {dataName}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={mutateFn}>{buttonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
