"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  User,
  UserSEWithAssignedClients,
  UserUpdate,
} from "../types/user-types";
import { UserDialog } from "./user-dialog";

interface UserTableRowProps {
  user: User | UserSEWithAssignedClients;
}

export default function UserTableActions({ user }: UserTableRowProps) {
  const handleEditSubmit = async (data: UserUpdate) => {
    // TODO: Implement actual user update logic here
    console.log("Updating user:", user.id, data);
  };

  const handleDelete = (user: User | UserSEWithAssignedClients) => {
    console.log("delete", user);
  };

  return (
    <>
      <UserDialog
        mode="edit"
        user={user}
        trigger={
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Edit className="w-4 h-4" />
          </Button>
        }
        onSubmit={handleEditSubmit}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleDelete(user)}
        className="w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </>
  );
}
