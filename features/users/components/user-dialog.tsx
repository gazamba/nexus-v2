"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "./user-form";
import { useState } from "react";
import type {
  User,
  UserInsert,
  UserUpdate,
  UserWithPassword,
} from "../types/user-types";

interface UserDialogProps {
  mode: "add" | "edit";
  user?: User;
  trigger: React.ReactNode;
  onSubmit?: (data: UserInsert | UserUpdate) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
}

export function UserDialog({
  mode,
  user,
  trigger,
  onSubmit,
  onCancel,
  loading,
  error,
}: UserDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: UserWithPassword) => {
    await onSubmit?.(data);
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogTitle>
          {mode === "add" ? "Add New User" : "Edit User"}
        </DialogTitle>
        <UserForm
          user={user}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
}
