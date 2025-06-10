"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  User,
  UserSEWithAssignedClients,
  UserUpdate,
} from "../types/user-types";
import Modal from "@/components/ui/modal";
import { UserForm } from "./user-form";

interface UserTableRowProps {
  user: User | UserSEWithAssignedClients;
}

export default function UserTableActions({ user }: UserTableRowProps) {
  const handleEditSubmit = async (data: UserUpdate) => {
    console.log("Updating user:", user.id, data);
    // TODO: Implement actual user update logic here
  };

  const handleDelete = (userId: string) => {
    console.log("deleting", userId);
    // TODO: Implement actual user delete logic here
  };

  return (
    <>
      <Modal
        title="Edit User"
        onSubmit={() => handleEditSubmit(user)}
        buttonTextAction="Update User"
        trigger={
          <Button variant="ghost" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        }
      >
        <UserForm user={user} />
      </Modal>
      <Modal
        title="Confirm Delete"
        trigger={
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        }
        onSubmit={() => handleDelete(user.id)}
        buttonTextAction="Delete"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </>
  );
}
