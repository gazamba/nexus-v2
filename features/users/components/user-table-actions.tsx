"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  UserSEWithAssignedClientsType,
  UserWithPasswordType,
} from "../types/user-types";
import { UserForm } from "./user-form";
import { useState } from "react";
import { UserFormData } from "../schemas/user-schema";
import ModalConfirmation from "@/components/ui/modal-confirmation";
import Modal from "@/components/ui/modal";

interface UserTableRowProps {
  user: UserWithPasswordType | UserSEWithAssignedClientsType;
}

export default function UserTableActions({ user }: UserTableRowProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEditSubmit = async (data: UserFormData) => {
    console.log("Updating user:", data);
    // TODO: Implement actual user update logic here
    setEditModalOpen(false);
  };

  const handleDelete = async (userId: string) => {
    console.log("deleting", userId);
    // TODO: Implement actual user delete logic here
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Edit User"
        trigger={
          <Button variant="ghost" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        }
        open={editModalOpen}
        setOpen={setEditModalOpen}
      >
        <UserForm
          user={user}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditModalOpen(false)}
        />
      </Modal>
      <ModalConfirmation
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
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onAction={() => handleDelete(user.id!)}
      >
        <p>Are you sure you want to delete this user?</p>
      </ModalConfirmation>
    </>
  );
}
