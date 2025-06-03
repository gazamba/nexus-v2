"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { User, UserSEWithAssignedClients } from "../types/user-types";

interface UserTableRowProps {
  user: User | UserSEWithAssignedClients;
}

export default function UserTableActions({ user }: UserTableRowProps) {
  const handleEdit = (user: User | UserSEWithAssignedClients) => {
    console.log("edit", user);
  };

  const handleDelete = (user: User | UserSEWithAssignedClients) => {
    console.log("delete", user);
  };
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleEdit(user)}
        className="w-8 h-8"
      >
        <Edit className="w-4 h-4" />
      </Button>
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
