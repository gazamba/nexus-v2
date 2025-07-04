"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  trigger: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Modal({
  title,
  open,
  setOpen,
  trigger,
  children,
}: ModalProps & { children?: React.ReactNode }) {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
