import { type JSX } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { DialogDescription } from "@radix-ui/react-dialog";

interface FormDialogProps<TData extends FieldValues> {
  open: boolean;
  setOpen: (open: boolean) => void;
  buttonText: string;
  title: string;
  description: string;
  dialogForm: JSX.Element;
  submitForm: UseFormReturn<TData, any, TData>;
  submitText?: string;
  submitFn: SubmitHandler<TData>;
}

export function FormDialog<TData extends FieldValues>({
  open,
  setOpen,
  buttonText,
  title,
  description,
  dialogForm,
  submitForm,
  submitText,
  submitFn,
}: FormDialogProps<TData>) {
  const { handleSubmit } = submitForm;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitFn)}>
          <div className="grid gap-2">{dialogForm}</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{submitText ?? "Save changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
