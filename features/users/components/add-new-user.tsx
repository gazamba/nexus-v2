"use client";

import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { UserForm } from "./user-form";
import { UserWithPassword } from "../types/user-types";
import { createUserAction } from "../actions/user-actions";

export default function AddNewUser() {
  const handleCreateUser = (data: UserWithPassword) => {
    console.log(data);
    // createUserAction(data)
    // TODO: Check about action if use UserWithPassword or Form Data
  };

  return (
    <>
      <Modal
        title="Add New User"
        trigger={<Button>Add New User</Button>}
        buttonTextAction="Add User"
        formId="user-form"
      >
        <UserForm onSubmit={handleCreateUser} />
      </Modal>
    </>
  );
}
