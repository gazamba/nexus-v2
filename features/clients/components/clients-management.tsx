"use client";

import React, { useState } from "react";
import { ClientsTable } from "./clients-table";
import { ClientFormData, ClientType } from "../types/client-types";
import Modal from "@/components/ui/modal";
import ClientForm from "./client-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  createClientAction,
  updateClientAction,
} from "../actions/client-actions";

export default function ClientsManagement({
  clients,
}: {
  clients: ClientType[];
}) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddClient = async (clientData: ClientFormData) => {
    setAddLoading(true);
    // const {success, message, errors} = await createClientAction(clientData)

    setTimeout(() => {
      console.log("Adding client:", clientData);
      setAddLoading(false);
      setAddModalOpen(false);
      toast({
        title: "Success",
        description: "Client added successfully!",
      });
    }, 2000);
  };

  const handleEditClient = async (
    clientData: ClientFormData,
    clientId?: string
  ) => {
    setEditLoading(true);
    if (clientId) {
      await updateClientAction(clientId, clientData);
    }
    // TODO: Add logic to edit a client
    setTimeout(() => {
      console.log("Editing client:", clientData);
      setEditLoading(false);
      setEditModalOpen(false);
      toast({
        title: "Success",
        description: "Client updated successfully!",
      });
    }, 1000);
  };

  if (error) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    });
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Modal
          title="Add New Client"
          trigger={<Button>Add New Client</Button>}
          open={addModalOpen}
          setOpen={setAddModalOpen}
        >
          <ClientForm
            onSubmit={handleAddClient}
            loading={addLoading}
            onCancel={() => setAddModalOpen(false)}
          />
        </Modal>
      </div>

      <ClientsTable
        clients={clients}
        open={editModalOpen}
        setOpen={setEditModalOpen}
        loading={editLoading}
        onSubmit={handleEditClient}
        onCancel={() => setEditModalOpen(false)}
      />
    </>
  );
}
