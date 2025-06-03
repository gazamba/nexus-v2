"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { UserForm } from "./user-form";
import { useState } from "react";

export function AddUserDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add New User</Button>
      </DialogTrigger>
      <DialogContent>
        <UserForm
          onSubmit={async () => {
            setOpen(false);
          }}
          onCancel={async () => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
