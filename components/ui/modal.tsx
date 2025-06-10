"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./button";

interface ModalProps {
  title: string;
  trigger: React.ReactNode;
  onCancel?: () => void;
  onSubmit?: () => void;
  buttonTextAction?: string;
  footer?: React.ReactNode;
  formId?: string;
}

export default function Modal({
  title,
  onCancel,
  onSubmit,
  trigger,
  buttonTextAction = "Submit",
  footer,
  children,
  formId,
}: ModalProps & { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit?.();
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
          {footer ? (
            footer
          ) : (
            <DialogFooter>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button form={formId} type="submit" onClick={handleSubmit}>
                {buttonTextAction}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
