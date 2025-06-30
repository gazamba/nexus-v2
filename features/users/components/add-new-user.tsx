"use client";

import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { UserForm } from "./user-form";
import { UserFormData } from "../schemas/user-schema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createUserAction } from "../actions/user-actions";

export default function AddNewUser() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateUser = async (data: UserFormData) => {
    setLoading(true);
    const result = await createUserAction(data);
    setLoading(false);

    toast({
      title: result.success ? "User created" : "Failed to create user!",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });

    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Add New User"
        trigger={<Button>Add New User</Button>}
        buttonTextAction="Add User"
        formId="user-form"
        loading={loading}
        open={open}
        setOpen={setOpen}
      >
        <UserForm loading={loading} onSubmit={handleCreateUser} />
      </Modal>
    </>
  );
}
