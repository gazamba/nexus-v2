"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";

interface ModalConfirmationProps {
  title: string;
  trigger: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  onAction: () => void;
}

export default function ModalConfirmation({
  title,
  open,
  setOpen,
  onAction,
  trigger,
  children,
}: ModalConfirmationProps & { children?: React.ReactNode }) {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={onAction}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
