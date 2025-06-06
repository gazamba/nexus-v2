"use client";

import { Button } from "@/components/ui/button";
import { UserDialog } from "./user-dialog";
import { UserWithPassword } from "../types/user-types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function AddUser() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: UserWithPassword) => {
    setLoading(true);

    try {
      // TODO: Replace with your actual server action
      // const result = await createUserAction(data);
      // if (!result.success) {
      //   setError(result.message || "Failed to create user");
      //   return;
      // }

      console.log("Creating user:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      toast({
        title: "Failed to create user",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserDialog
      mode="add"
      trigger={<Button>Add New User</Button>}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
}
